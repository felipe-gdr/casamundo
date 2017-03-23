	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
     * 			adendo a lista invoice
     */

	/**
	 * 				obter os dados
	 */
	rest_obterInvoicesAll(carregaLocalStorageInvoices, semAcao, localStorage.usuarioCity);


    /* Formatting function for row details - modify as you need */
	function formatInvoice ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
	};
	function carregaLocalStorageInvoices (objJson, destroy) {

		localStorage.setItem("invoices", JSON.stringify(objJson));

    	/* BASIC datatables*/

    	var responsiveHelper_invoices_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};

    	/* invoice list  */
        var invoice_table = $('#invoices_list').DataTable({
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
    			if (!responsiveHelper_invoices_list) {
    				responsiveHelper_invoices_list = new ResponsiveDatatablesHelper($('#invoices_list'), breakpointDefinition);
    			}
    		},
    		"rowCallback" : function(nRow) {
    			responsiveHelper_invoices_list.createExpandIcon(nRow);
    		},
    		"drawCallback" : function(oSettings) {
    			responsiveHelper_invoices_list.respond();
    		},		
    		"columns": [
    		            {
    		                "class":          'details-control',
    		                "orderable":      false,
    		                "defaultContent": '',
        		            "width": "5%"
    		            },
    		            { "data": "student",
    		            	"width": "20%"},
    		            { "data": "additional",
    		            	"width": "15%"},
    		            { "data": "dates",
    		            	"width": "15%"},
    		            { "data": "invoice",
    		            	"width": "15%"},
    		            { "data": "customer",
    		            	"width": "10%"},
    		            { "data": "comments",
    		            	"width": "20%"},
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

        var objJson = JSON.parse(localStorage.getItem("invoices"));
        
        invoice_table.clear();
        
        $.each(objJson, function (i, invoice) {
        	var age = calculaIdade(separaData(invoice.student.birthDay, "/"));
            var genderCollor = genderCollorDef (invoice.gender);
            var durationTrip = intervaloDatas(invoice.trip.start, invoice.trip.end);
            var age = calculaIdade(separaConverteDataMes(invoice.student.birthDay, "/"));
            var overdue = "";
            if (!maiorDataHoje (invoice.dueDate)){
    			overdue = "<br><span class='text-black label-danger'>Overdue</span>";
    		};
			switch (invoice.status) {
	    	case "unpaid":
    			statusCollor = "warning";
    			statusText = "unppaid $";
	            break;
	        case "cash":
				statusCollor = "success";
				statusText = "cash $";
	            break;
	        case "bank":
				statusCollor = "success";
				statusText = "bank $";
	            break;
	        case "card":
				statusCollor = "success";
				statusText = "card $";
	            break;
	        default: 
				statusCollor = "default";
				statusText = "none $";
	        };	    		
	        var actions = "";
	        var invoices = "";
	        var actualTrip = invoice.actualTrip;
	        var emailInvoice = invoice.mail;
		    var accommodation = "Not yet acomodate";
	        var familyName = "";
	        var typePage = "accommodation";
        	invoices = "<li><a href='create-invoice.html?mail=" + invoice.mail + "&typePage=create'>Create invoice</a></li>";
        	var dadosInvoice = " data-idInvoice='" + invoice.id + "'";
	        if (localStorage.usuarioPerfil == "caretaker" | localStorage.usuarioPerfil == "administrator" | localStorage.usuarioPerfil == "tools"){
		        if (invoice.status == "unpaid"){
		        	actions = 
		        		"<li data-process='paidCash' " + dadosInvoice + " data-status='paid'><a href='#'>Cash</a></li>" +
		        		"<li data-process='paidBank' " + dadosInvoice + " data-status='paid'><a href='#'>Bank</a></li>" +
		        		"<li data-process='paidCard' " + dadosInvoice + " data-status='paid'><a href='#'>Card</a></li>";
		        };
		        if (invoice.status == "cash" || "bank" || "card"){
		        	actions = 
		        		"<li data-process='unpaid' " + dadosInvoice + " data-status='unpaid'><a href='#'>Unpaid</a></li>";
		        };
	        };
		    var pickupCollor = "success";
	        if (invoice.trip.pickup == "Yes"){
	        	pickupCollor = "danger";
	        }
	        var dropoffCollor = "success";
	        if (invoice.trip.dropoff == "Yes"){
	        	dropoffCollor = "danger";
	        };
	        var notes = "";
	        if (invoice.notes) {
			    $.each(invoice.notes, function (i, note) {
			    	notes = notes + note.note + "<br>";
			    });	        	
	        };
            invoice_table.row.add( {
    	    	"student": 
    	    			"<a href='create-invoice.html?id=" + invoice.student.mail + "&typePage=change&id=" + invoice.id + "'>" +
    	    			"<span class='text-column'>" + invoice.student.firstName +  " " + invoice.student.lastName + "</span><br>" + 
    	    			"<small class='label text-column " + genderCollor + " '>" + invoice.student.gender + "</small><br>" +
    	    			"<small class='text-muted text-column'><i>" + invoice.student.nationality + "<i></small><br>" +
    	    			"<small class='text-muted text-column'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + age + "<i></small><br>" +
    	    			"<span class='text-column'>" + invoice.destination + "</span><br>",
    	    	"additional":
    	    			"<small class='text-muted text-column'>Underage: " + " " + "</small><br>" +
	    				"<small class='text-muted text-column'>Pvt WC: " + invoice.trip.privateWashroom + "</small><br>" +
    	    			"<small class='text-muted text-column'>Pickup: </small><small class='text-" + pickupCollor + " text-column '>" + invoice.trip.pickup + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'>Dropoff: </small><small class='text-" + dropoffCollor + " text-column '>" + invoice.trip.dropoff + "</small><br>" +
    	    			"<small class='text-muted text-column'>Custodian: " + " " + "</small><br>" +
    	    			"<small class='text-muted text-column'>High season: " + " " + "</small><br>",
                "dates":
                		"<small class='hide'>" + converteAnoMesDia(invoice.trip.start) + "</small><small class='text-muted text-column'>In: " + separaDataMes(invoice.trip.start, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>Out: " + separaDataMes(invoice.trip.end, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>" + durationTrip + "</small><br>",
    	    	"invoice":
    	    			"<small class='text-column'><span class='text-muted'>Status: </span><span class='text-black label-" + statusCollor + "'>" + statusText + "</span>" + overdue + "</small><br>" +
    	    			"<small class='text-muted text-column'>Number: " + invoice.number + "</small><br>" +
    	    			"<small class='text-muted text-column'>Amount: " + invoice.amountNet + "</small><br>" +
    	    			"<small class='text-muted text-column'>Due date: " + separaDataMes(invoice.dueDate,"-") + "</small><br>",
    	    	"customer":
   	    				"<small class='text-muted text-column'>Agent: </small><small class='text-bold text-column'>" + invoice.agencySigla + "</small><br>",
       	    	"comments":"<small class='text-muted text-column'>" + notes + "</small>",
                'actions': 
                	'<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
	    				'<ul id="listInvoice" class="dropdown-menu">' +
	    					actions +
	    				'</ul>' +
	    			'</div>' 
    	    }).draw( false );
        });
        
    	// Add event listener for opening and closing details
        $('#invoices_list tbody').off('click');
        $('#invoices_list tbody').on('click', 'td.details-control', function () {
        	var tr = $(this).closest('tr');
        	var a = tr["0"]._DT_RowIndex;
            var row = invoice_table.row(tr);
     
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
            	if (row){
            		row.child( formatInvoice(row.data()) ).show();
            		tr.addClass('shown');
            	};
            	$("#listInvoice li").off('click');
	    		$("#listInvoice li").on('click',function(){
	    			if ($(this).attr('data-process') == "paid" | $(this).attr('data-process') == "unpaid") {
	    				var param  = 
	    				{
	    					idInvoice : $(this).attr('data-idInvoice'),
	    					status : $(this).attr('data-status')
	    				};	 
	    				localStorage.nextWindow = "invoices.html"
	    				rest_changeStatusInvoice(param, atualizacaoEfetuada, semAcao, "Invoice updated", "problems to update invoice, try again");
	    			};
	    		});
            };
        });

        // Apply the filter
        $("#invoices_list thead th input[type=text]").off( 'keyup change');
        $("#invoices_list thead th input[type=text]").on( 'keyup change', function () {
        	
        	invoice_table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
                
        } );
        /* end trip list */   
};
