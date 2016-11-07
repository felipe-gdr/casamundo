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
	function carregaLocalStoragePayments (objJson, destroy) {

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
        	switch (payment.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	
            var durationTrip = intervaloDatas(payment.student.trips[payment.student.actualTrip].start, payment.student.trips[payment.student.actualTrip].end);
            var age = calculaIdade(separaConverteDataMes(payment.student.birthDay, "/"));
        	switch (payment.status) {
        	case "new":
        		statusCollor = "label-available"
                break;
            default: 
        		statusCollor = "label-available"
            };	    

            switch (payment.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	    

        	switch (payment.student.trips[payment.student.actualTrip].smoke) {
        	case "Yes":
        		smokeCollor = "label-warning"
        		smokeText = "Smoke"
                break;
            case "No":
            	smokeCollor = "label-success"
            	smokeText = "Don't smoke"
                break;
            default: 
        		smokeCollor = "label-primary"
        		smokeText = ""
            };	 
            if (payment.student.trips[payment.student.actualTrip].medical){
            	medicalCollor = "label-warning";
            	medicalText = payment.student.trips[payment.student.actualTrip].medical;
            }else{
            	medicalCollor = "label-success";
            	medicalText = "Don´t have medical concerns";
            };
        	occupancyCollor = "label-success";
        	occupancyText = "";
            if (payment.student.trips[payment.student.actualTrip].occupancy){
            	occupancyText = payment.student.trips[payment.student.actualTrip].occupancy;
	            if (payment.student.trips[payment.student.actualTrip].occupancy == "Single"){
	            	occupancyCollor = "label-success";
	            }else{
	            	occupancyCollor = "label-warning";
	            };
            };
            if (payment.student.trips[payment.student.actualTrip].liveDogs == "Yes"){
            	liveDogsCollor = "label-success";
            	liveDogsText = "Live with dogs";
            }else{
            	liveDogsCollor = "label-warning";
            	liveDogsText = "Don't live with dogs";
            };
            if (payment.student.trips[payment.student.actualTrip].liveCats == "Yes"){
            	liveCatsCollor = "label-success";
            	liveCatsText = "Live with cats";
            }else{
            	liveCatsCollor = "label-warning";
            	liveCatsText = "Don't live with cats";
            };
        	switch (payment.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	    
            var specialDiet = "";
            if (payment.student.trips[payment.student.actualTrip].specialDiet[0]){
			    $.each(payment.student.trips[payment.student.actualTrip].specialDiet, function (i, value) {
			    	specialDiet = String(specialDiet) + "<span class='label label-warning text-column'>" + value + " </span>";
			    });
            }else{
            	specialDiet = "<span class='label label-success text-column'>No food restrictions</span>"
            };
		    
	        var actions = "";
	        var payments = "";
	        var actualTrip = payment.student.actualTrip;
	        var emailPayment = payment.student.mail;
		    var accommodation = "Not yet acomodate";
	        var familyName = "";
	        var typePage = "payments";
        	payments = "<li><a href='create-payment.html?mail=" + payment.student.mail + "&typePage=create'>Create payment</a></li>";
	        if (localStorage.usuarioPerfil == "caretaker" | localStorage.usuarioPerfil == "administrator"){
		        if (payment.status == "new"){
		        	actions = "<li><a href='create-payment.html?id=" + payment.student.mail + "&typePage=change&id=" + payment.id + "'>Change</a></li>";
		        };
	        };
		    var pickupCollor = "success";
	        if (payment.student.trips[payment.student.actualTrip].pickup == "Yes"){
	        	pickupCollor = "danger";
	        }
	        var dropoffCollor = "success";
	        if (payment.student.trips[payment.student.actualTrip].dropoff == "Yes"){
	        	dropoffCollor = "danger";
	        };
	        profit = payment.invoice.amount - payment.amount;
	        dateIncluded = "";
            payment_table.row.add( {
    	    	"vendor":
	    			"<a href='create-payments-vendors.html?mail=" + payment.student.mail + "&id=" + payment.id + "&typePage=change'>" +
	    				"<span class='text-column'>" + payment.vendorName + "</span><br>" +
	    				"<small class='text-muted text-column'>Rate: </small><small class='text-bold text-column'>" + "" + "</small><br>" +
    	    			"<small class='text-muted text-column'>Number: " + payment.number + "</small><br>" +
    	    			"<small class='text-muted text-column'>Amount: " + payment.amount + "</small><br>" +
    	    			"<small class='text-muted text-column'>Due date: " + separaDataMes(payment.dueDate,"-") + "</small><br>" +
	    				"<small class='text-muted text-column'>Authorized: </small><small class='text-bold text-column'>" + "" + "</small></a>",
    	    	"student": 
    	    			"<a href='student.html.html?id=" + payment.student.mail + "'&typePage=change></a>" +
    	    			"<span class='text-column'>" + payment.student.firstName +  " " + payment.student.lastName + "</span><br>" + 
    	    			"<small class='text-muted text-column'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + age + "<i></small><br>" +
    	    			"<small class='label text-column " + genderCollor + " '>" + payment.student.trips[payment.student.actualTrip].accommodation + "</small><br>" +
    	    			"<small class='text-muted text-column'><i>" + payment.student.trips[payment.student.actualTrip].occupancy + "<i></small><br>" +
    	    			"<small class='text-muted text-column'><i>" + payment.student.trips[payment.student.actualTrip].mealPlan + "<i></small><br>" +
    	    			"<span class='text-column'>Agent:" + payment.invoice.agencySigla + "</span><br>",
    	    	"additional":
    	    			"<small class='text-muted text-column'>Underage: " + " " + "</small><br>" +
	    				"<small class='text-muted text-column'>Pvt WC: " + payment.student.trips[payment.student.actualTrip].privateWashroom + "</small><br>" +
    	    			"<small class='text-muted text-column'>Pickup: </small><small class='text-" + pickupCollor + " text-column '>" + payment.student.trips[payment.student.actualTrip].pickup + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'>Dropoff: </small><small class='text-" + dropoffCollor + " text-column '>" + payment.student.trips[payment.student.actualTrip].dropoff + "</small><br>" +
    	    			"<small class='text-muted text-column'>Custodian: " + " " + "</small><br>" +
    	    			"<small class='text-muted text-column'>High season: " + " " + "</small><br>",
                "dates":"<small class='hide'>" + converteAnoMesDia(payment.student.trips[payment.student.actualTrip].start) + "</small><small class='text-muted text-column'>In: " + separaDataMes(payment.student.trips[payment.student.actualTrip].start, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>Out: " + separaDataMes(payment.student.trips[payment.student.actualTrip].end, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>" + durationTrip + "</small><br>",
       	    	"invoice":
    	    			"<small class='text-muted text-column'>Status: " + payment.invoice.status + "</small><br>" +
    	    			"<small class='text-muted text-column'>Nmber: " + payment.invoice.number + "</small><br>" +
    	    			"<small class='text-muted text-column'>Amount: " + payment.invoice.amount + "</small><br>" +
    	    			"<small class='text-muted text-column'>Due Date: " + separaDataMes(payment.invoice.dueDate, "-") + "</small><br>",
       	    	"detail":
       	    			"<small class='text-muted text-column'>Profit: " + profit + "</small><br>" +
    	    			"<small class='text-muted text-column'>Status: " + payment.status + "</small><br>" +
    	    			"<small class='text-muted text-column'>Date: " + dateIncluded + "</small><br>",
       	    	"comments":"<small class='text-muted text-column'>" + payment.student.trips[payment.student.actualTrip].comments + "</small>",
       	    	
                'actions': 
                	'<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
	    				'<ul id="listPayment" class="dropdown-menu">' +
	    					actions +
	    				'</ul>' +
	    			'</div>' 
    	    }).draw( false );
        });
        
    	// Add event listener for opening and closing details
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
	    			if ($(this).attr('data-process') == "a ver") {
	    				rest_obterPayment($(this).attr('data-id'), deallocateRoom, semAcao, $(this).attr('data-emailPayment') );
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



function deallocateRoom (objFamily, emailPayment) {

    $.each(objFamily.documento.rooms, function (i, room) {
    	var excluded = false;
        $.each(room.occupancySingleBed, function (w, occupancy) {
        	if (!excluded){
        		if (occupancy.emailPayment == emailPayment){
        			objFamily.documento.rooms[i].occupancySingleBed.splice(w, 1);
        			excluded = true;
        		};
        	};
        });            	
        $.each(room.occupancyCoupleBed, function (w, occupancy) {
        	if (!excluded){
	        	if (occupancy.emailPayment == emailPayment){
	        		objFamily.documento.rooms[i].occupancyCoupleBed.splice(w, 1);
	        		excluded = true;
	        	};
        	};
        });            	
    });

	rest_atualizaFamily(objFamily, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms deallocate", "Problems to update rooms, try again")
	
};

function clearFamilyName (objPayment, status) {

	objPayment.documento.trips[objPayment.documento.actualTrip].familyName = "";
	objPayment.documento.trips[objPayment.documento.actualTrip].status = status;
	delete objPayment.contact;
	delete objPayment.rooms;
	delete objPayment.family;

	rest_atualizaPayment(objPayment, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Family name cleared", "Problems to update payment, try again");
	
	// *** refresh payments list
	$(window.document.location).attr('href','payments.html');

};

function changeStatus (objPayment, status) {

	objPayment.documento.trips[objPayment.documento.actualTrip].status = status;
	delete objPayment.contact;
	delete objPayment.rooms;
	delete objPayment.family;

	rest_atualizaPayment(objPayment, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Status changed", "Problems to update payment, try again");
	
	// *** refresh payments list
	$(window.document.location).attr('href','payments.html');

};

function manualConfirmFamily (objPayment, emailPayment) {
	
	objPayment.documento.trips[objPayment.documento.actualTrip].status = "Confirmed";
	delete objPayment.contact;
	delete objPayment.rooms;
	delete objPayment.family;

	rest_atualizaPayment(objPayment, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Status changed to confirm", "Problems to update payment, try again");
	
	// *** refresh payments list
	$(window.document.location).attr('href','payments.html');
	
};

function sendEmailToFamilyToConfirm (objFamily, emailPayment) {

	//
	//  ** send email to offer a family
	//
	rest_sendEmailHtml(localStorage.hostNameEmail, localStorage.userNameEmail , localStorage.passwordEmail, "grenneglr@gmail.com", objFamily.documento.contact.email, "Offer accommodation", templateOffertoFamily(), emailEnviado, emailComProblemas );
	
};
	