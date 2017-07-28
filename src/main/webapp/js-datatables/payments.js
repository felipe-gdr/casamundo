	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
     * 			adendo a lista payment
     */

	/**
	 * 				obter os dados
	 */
	rest_obterPaymentsAll(carregaLocalStoragePayments, semAcao, localStorage.usuarioCity);


    /* Formatting function for row details - modify as you need */
	function formatPayment ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
	};
	function carregaLocalStoragePayments (objJson) {

		localStorage.setItem("payments", JSON.stringify(objJson));

    	/* BASIC datatables*/

    	var responsiveHelper_payments_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};

    	/* payment list  */
        var payment_table = $('#payments_list').DataTable({
        	"bFilter": false,
        	//"bInfo": false,
        	//"bLengthChange": true,
        	//"bAutoWidth": true,
        	//"bPaginate": false,
        	//"bStateSave": true // saves sort state using localStorage
    		"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
    				"t"+
    				"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
    		"preDrawCallback" : function() {
    			// Initialize the responsive datatables helper once.
    			if (!responsiveHelper_payments_list) {
    				responsiveHelper_payments_list = new ResponsiveDatatablesHelper($('#payments_list'), breakpointDefinition);
    			}
    		},
    		"rowCallback" : function(nRow) {
    			responsiveHelper_payments_list.createExpandIcon(nRow);
    		},
    		"drawCallback" : function(oSettings) {
    			responsiveHelper_payments_list.respond();
    		},		
    		"columns": [
    		            {
    		                "class":          'details-control',
    		                "orderable":      false,
    		                "defaultContent": '',
        		            "width": "3%"
    		            },
    		            { "data": "vendor",
    		            	"width": "20%"},
       		            { "data": "student",
       		            	"width": "15%"},
    		            { "data": "additional",
    		            	"width": "15%"},
    		            { "data": "dates",
    		            	"width": "12%"},
    		            { "data": "invoice",
    		            	"width": "15%"},
       		            { "data": "detail",
       		            	"width": "10%"},
    		            { "data": "comments",
    		            	"width": "10%"},
    		            ],
            "responsive": true,
            "charset" : "UTF-8",
            "bDestroy": true,
            "iDisplayLength": 30,
            "order": [[1, 'asc']],
            "fnDrawCallback": function( oSettings ) {
    	       runAllCharts()
    	    }
    	
        });

        var objJson = JSON.parse(localStorage.getItem("payments"));
        
        payment_table.clear();
        
        $.each(objJson, function (i, payment) {
        	var age = calculaIdade(separaData(payment.student.birthDay, "/"));
            var genderCollor = genderCollorDef (payment.gender);
            var actualTrip = payment.actualTrip;
            var durationTrip = intervaloDatas(payment.student.trips[actualTrip].start, payment.student.trips[actualTrip].end);
            var age = calculaIdade(separaConverteDataMes(payment.student.birthDay, "/"));
            var overdue = "";
            if (!maiorDataHoje (payment.dueDate)){
    			overdue = "<br><span class='text-black label-danger'>Overdue</span>";
    		};
			switch (payment.status) {
	    	case "unpaid":
    			statusCollor = "warning";
    			statusText = "unppaid $";
	            break;
	        case "paid":
				statusCollor = "success";
				statusText = "paid $";
	            break;
	        case "approved":
    			statusCollor = "primary";
    			statusText = "approved $";
	            break;
	        default: 
				statusCollor = "default";
				statusText = "none $";
	        };	    		
            var genderCollor = genderCollorDef (payment.gender);
            var smokeCollor = smokeCollorDef (payment.trip.smoke);
            var smokeText = smokeTextDef (payment.trip.smoke);
            if (payment.student.trips[actualTrip].medical){
            	medicalCollor = "label-warning";
            	medicalText = payment.student.trips[actualTrip].medical;
            }else{
            	medicalCollor = "label-success";
            	medicalText = "Don´t have medical concerns";
            };
        	occupancyCollor = "label-success";
        	occupancyText = "";
            if (payment.student.trips[actualTrip].occupancy){
            	occupancyText = payment.student.trips[actualTrip].occupancy;
	            if (payment.student.trips[actualTrip].occupancy == "Single"){
	            	occupancyCollor = "label-success";
	            }else{
	            	occupancyCollor = "label-warning";
	            };
            };
            if (payment.student.trips[actualTrip].liveDogs == "Yes"){
            	liveDogsCollor = "label-success";
            	liveDogsText = "Live with dogs";
            }else{
            	liveDogsCollor = "label-warning";
            	liveDogsText = "Don't live with dogs";
            };
            if (payment.student.trips[actualTrip].liveCats == "Yes"){
            	liveCatsCollor = "label-success";
            	liveCatsText = "Live with cats";
            }else{
            	liveCatsCollor = "label-warning";
            	liveCatsText = "Don't live with cats";
            };
            var genderCollor = genderCollorDef (payment.gender);
            var specialDiet = "";
            if (payment.student.trips[actualTrip].specialDiet[0]){
			    $.each(payment.student.trips[actualTrip].specialDiet, function (i, value) {
			    	specialDiet = String(specialDiet) + "<span class='label label-warning text-column'>" + value + " </span>";
			    });
            }else{
            	specialDiet = "<span class='label label-success text-column'>No food restrictions</span>"
            };
		    
	        var actions = "";
	        var payments = "";
	        var emailPayment = payment.student.mail;
		    var accommodation = "Not yet acomodate";
	        var familyName = "";
	        var typePage = "payments";
	        var balance = calcBalance (payment); 
	        	parseFloat(payment.amount)
        	var dadosPayment = " data-idPayment= '" + payment.id + "'" +
        					   " data-amount= '" + payment.amount + "'" +
        					   " data-balance= '" + balance + "'";
			var balanceDecimal = parseFloat(balance);
			var amountDecimal = parseFloat(payment.amount);
			var balanceCollor = "";
	        if (localStorage.usuarioPerfil == "caretaker" | localStorage.usuarioPerfil == "administrator" | localStorage.usuarioPerfil == "tools"){
		        if (payment.status == "unpaid"){
		        	actions = 
		        		"<li data-process='approved' " + dadosPayment + " data-status='approved'><a href='#'>Approved</a></li>";
		        };
		        if (payment.status == "approved"){
		        	actions = 
		        		'<li data-process="pay" ' + dadosPayment + '"><a data-toggle="modal" data-target="#paymentModal">Pay</a></li>';		        	
		        	if (balanceDecimal != amountDecimal){
		        		actions = actions +
	        			'<li data-process="unpay" ' + dadosPayment + '"><a data-toggle="modal" data-target="#installmentsModal">Unpay</a></li>';
		        		if (balanceDecimal != 0){
		        			balanceCollor = "label-warning";
		        		};
		        	};
	        		actions = actions +
        			'<li data-process="consult" ' + dadosPayment + '"><a data-toggle="modal" data-target="#installmentsModal">Consult</a></li>';
		        };
		        if (payment.status == "paid"){
		        	actions = 
	        			'<li data-process="unpay" ' + dadosPayment + '"><a data-toggle="modal" data-target="#installmentsModal">Unpay</a></li>' +
		        		'<li data-process="consult" ' + dadosPayment + '"><a data-toggle="modal" data-target="#installmentsModal">Consult</a></li>';
		        };
	        };
		    var pickupCollor = "success";
	        if (payment.student.trips[actualTrip].pickup == "Yes"){
	        	pickupCollor = "danger";
	        }
	        var dropoffCollor = "success";
	        if (payment.student.trips[actualTrip].dropoff == "Yes"){
	        	dropoffCollor = "danger";
	        };
	        profit = payment.invoice.amount - payment.amount;
	        dateIncluded = "";
	        var notes = "";
	        if (payment.notes) {
			    $.each(payment.notes, function (i, note) {
			    	notes = notes + note.note + "<br>";
			    });	        	
	        };
	        //
	        // monta installments
	        //
	        montaInstallmentDelete(payment.installments, payment.id);
	       	
            payment_table.row.add( {
    	    	"vendor":
	    			"<a href='create-payments-vendors.html?mail=" + payment.student.mail + "&id=" + payment.id + "&typePage=change'>" +
	    				"<span class='text-column'>" + payment.vendorName + "</span><br>" +
	    				"<small class='text-muted text-column'>Rate: </small><small class='text-bold text-column'>" + "" + "</small><br>" +
    	    			"<small class='text-muted text-column'>Number: " + payment.number + "</small><br>" +
    	    			"<small class='text-muted text-column'>Amount: " + amountDecimal.toFixed(2) + "</small><br>" +
    	    			"<small class='text-muted text-column " + balanceCollor + "'>Balance: " + balanceDecimal.toFixed(2) + "</small><br>" +
    	    			"<small class='text-muted text-column'>Due date: " + separaDataMes(payment.dueDate,"-") + "</small><br>" +
	    				"<small class='text-muted text-column'>Authorized: </small><small class='text-bold text-column'>" + "" + "</small></a><br>" +
    	    			"<small class='text-muted text-column'>" + payment.destination + "</small><br>",
    	    	"student": 
    	    			"<a href='student.html.html?id=" + payment.student.mail + "'&typePage=change></a>" +
    	    			"<span class='text-column'>" + payment.student.firstName +  " " + payment.student.lastName + "</span><br>" + 
    	    			"<small class='text-muted text-column'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + age + "<i></small><br>" +
    	    			"<small class='label text-column " + genderCollor + " '>" + payment.student.trips[actualTrip].accommodation + "</small><br>" +
    	    			"<small class='text-muted text-column'><i>" + payment.student.trips[actualTrip].occupancy + "<i></small><br>" +
    	    			"<small class='text-muted text-column'><i>" + payment.student.trips[actualTrip].mealPlan + "<i></small><br>" +
    	    			"<span class='text-column'>Agent:" + payment.invoice.agencySigla + "</span><br>",
    	    	"additional":
    	    			"<small class='text-muted text-column'>Underage: " + " " + "</small><br>" +
	    				"<small class='text-muted text-column'>Pvt WC: " + payment.student.trips[actualTrip].privateWashroom + "</small><br>" +
    	    			"<small class='text-muted text-column'>Pickup: </small><small class='text-" + pickupCollor + " text-column '>" + payment.student.trips[actualTrip].pickup + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'>Dropoff: </small><small class='text-" + dropoffCollor + " text-column '>" + payment.student.trips[actualTrip].dropoff + "</small><br>" +
    	    			"<small class='text-muted text-column'>Custodian: " + " " + "</small><br>" +
    	    			"<small class='text-muted text-column'>High season: " + " " + "</small><br>",
                "dates":"<small class='hide'>" + converteAnoMesDia(payment.student.trips[actualTrip].start) + "</small><small class='text-muted text-column'>In: " + separaDataMes(payment.student.trips[actualTrip].start, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>Out: " + separaDataMes(payment.student.trips[actualTrip].end, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>" + durationTrip + "</small><br>",
       	    	"invoice":
    	    			"<small class='text-muted text-column'>Status: " + payment.invoice.status + "</small><br>" +
    	    			"<small class='text-muted text-column'>Nmber: " + payment.invoice.number + "</small><br>" +
    	    			"<small class='text-muted text-column'>Amount: " + payment.invoice.amount + "</small><br>" +
    	    			"<small class='text-muted text-column'>Due Date: " + separaDataMes(payment.invoice.dueDate, "-") + "</small><br>",
       	    	"detail":
       	    			"<small class='text-muted text-column'>Profit: " + profit + "</small><br>" +
    	    			"<small class='text-column'><span class='text-muted'>Status: </span><span class='text-black label-" + statusCollor + "'>" + statusText + "</span>" + overdue + "</small><br>" +
    	    			"<small class='text-muted text-column'>Date: " + dateIncluded + "</small><br>",
       	    	"comments":"<small class='text-muted text-column'>" + notes + "</small>",
       	    	
                'actions': 
                	'<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
	    				'<ul id="listPayment" class="dropdown-menu">' +
	    					actions +
    				'</ul>' +
	    			'</div>' 
    	    }).draw( false );
        });
        //	
    	// Add event listener for opening and closing details
        //
        $('#payments_list tbody').off('click');
        $('#payments_list tbody').on('click', 'td.details-control', function () {
        	var tr = $(this).closest('tr');
        	var a = tr["0"]._DT_RowIndex;
            var row = payment_table.row(tr);
     
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
            	if (row){
            		row.child( formatPayment(row.data()) ).show();
            		tr.addClass('shown');
            	};
            	$("#listPayment li").off('click');
	    		$("#listPayment li").on('click',function(){
	    			if ($(this).attr('data-process') == "approved") {
	    				var param  = 
	    				{
	    					idPayment : $(this).attr('data-idPayment'),
	    					status : $(this).attr('data-status')
	    				};	 
	    				localStorage.nextWindow = "payments.html"
	    				rest_changeStatusPayment(param, atualizacaoEfetuada, semAcao, "Payment updated", "problems to update payment, try again");
	    			};
	    			if ($(this).attr('data-process') == "pay") {
	    				var balance = parseFloat($(this).attr('data-balance'));
    					$("#paymentId").val($(this).attr('data-idPayment'));
    					$("#paymentBalance").html(balance.toFixed(2));
	    			};
	    			$(".delItem").addClass("hide");
	    			if ($(this).attr('data-process') == "unpay") {
	    				$(".delItem").removeClass("hide");
	    			};
	    		});
            }
        });
        
        // Apply the filter
        $("#payments_list thead th input[type=text]").off( 'keyup change');
        $("#payments_list thead th input[type=text]").on( 'keyup change', function () {
        	
        	payment_table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
                
        } );
        /* end trip list */   
};
