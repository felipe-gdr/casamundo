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
        	switch (invoice.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	    
            var daysTotal = calculaDias(separaConverteDataMes(invoice.trip.start, "/"), separaConverteDataMes(invoice.trip.end, "/"));
            var weeks = Math.abs(Math.round(daysTotal / 7));
            var days = daysTotal % 7;
            var durationTrip = "";
            var litDay = " nights";
            if (days == 1){
            	litDay = " night";
            }
            var litWeek = " weeks ";
            if (weeks == 1){
            	litWeek = " week ";
            }
            if (weeks > 0){
            	durationTrip = weeks + litWeek;
            };
            if (days > 0){
                durationTrip = durationTrip + days + litDay;
            }else{
            	durationTrip = durationTrip;
            };
            var age = calculaIdade(separaConverteDataMes(invoice.student.birthDay, "/"));
        	switch (invoice.status) {
        	case "new":
        		statusCollor = "label-available"
                break;
            default: 
        		statusCollor = "label-available"
            };	    

            switch (invoice.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	    

        	switch (invoice.trip.smoke) {
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
            if (invoice.trip.medical){
            	medicalCollor = "label-warning";
            	medicalText = invoice.trip.medical;
            }else{
            	medicalCollor = "label-success";
            	medicalText = "Don´t have medical concerns";
            };
        	occupancyCollor = "label-success";
        	occupancyText = "";
            if (invoice.trip.occupancy){
            	occupancyText = invoice.trip.occupancy;
	            if (invoice.trip.occupancy == "Single"){
	            	occupancyCollor = "label-success";
	            }else{
	            	occupancyCollor = "label-warning";
	            };
            };
            if (invoice.trip.liveDogs == "Yes"){
            	liveDogsCollor = "label-success";
            	liveDogsText = "Live with dogs";
            }else{
            	liveDogsCollor = "label-warning";
            	liveDogsText = "Don't live with dogs";
            };
            if (invoice.trip.liveCats == "Yes"){
            	liveCatsCollor = "label-success";
            	liveCatsText = "Live with cats";
            }else{
            	liveCatsCollor = "label-warning";
            	liveCatsText = "Don't live with cats";
            };
        	switch (invoice.gender) {
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
            if (invoice.trip.specialDiet[0]){
			    $.each(invoice.trip.specialDiet, function (i, value) {
			    	specialDiet = String(specialDiet) + "<span class='label label-warning text-column'>" + value + " </span>";
			    });
            }else{
            	specialDiet = "<span class='label label-success text-column'>No food restrictions</span>"
            };
		    
	        var actions = "";
	        var invoices = "";
	        var actualTrip = invoice.actualTrip;
	        var emailInvoice = invoice.mail;
		    var accommodation = "Not yet acomodate";
	        var familyName = "";
	        var typePage = "accommodation";
        	invoices = "<li><a href='create-invoice.html?mail=" + invoice.mail + "&typePage=create'>Create invoice</a></li>";
	        if (localStorage.usuarioPerfil == "caretaker" | localStorage.usuarioPerfil == "administrator"){
		        if (invoice.status == "new"){
		        	actions = "<li><a href='create-invoice.html?id=" + invoice.student.mail + "&typePage=change&id=" + invoice.id + "'>Change</a></li>";
		        };
	        };
		    var pickupCollor = "success";
	        if (invoice.trip.pickup == "Yes"){
	        	pickupCollor = "danger";
	        }
	        var dropoffCollor = "success";
	        if (invoice.trip.dropoff == "Yes"){
	        	dropoffCollor = "danger";
	        }
            invoice_table.row.add( {
    	    	"student": 
    	    			"<a href='create-invoice.html?id=" + invoice.student.mail + "&typePage=change&id=" + invoice.id + "'>" +
    	    			"<span class='text-column'>" + invoice.student.firstName +  " " + invoice.student.lastName + "</span><br>" + 
    	    			"<small class='label text-column " + genderCollor + " '>" + invoice.student.gender + "</small><br>" +
    	    			"<small class='text-muted text-column'><i>" + invoice.student.nationality + "<i></small><br>" +
    	    			"<small class='text-muted text-column'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + age + "<i></small><br>",
    	    	"additional":
    	    			"<small class='text-muted text-column'>Underage: " + " " + "</small><br>" +
	    				"<small class='text-muted text-column'>Pvt WC: " + invoice.trip.privateWashroom + "</small><br>" +
    	    			"<small class='text-muted text-column'>Pickup: </small><small class='text-" + pickupCollor + " text-column '>" + invoice.trip.pickup + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'>Dropoff: </small><small class='text-" + dropoffCollor + " text-column '>" + invoice.trip.dropoff + "</small><br>" +
    	    			"<small class='text-muted text-column'>Custodian: " + " " + "</small><br>" +
    	    			"<small class='text-muted text-column'>High season: " + " " + "</small><br>",
                "dates":"<small class='hide'>" + converteAnoMesDia(invoice.trip.start) + "</small><small class='text-muted text-column'>In: " + separaDataMes(invoice.trip.start, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>Out: " + separaDataMes(invoice.trip.end, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>" + durationTrip + "</small><br>",
    	    	"invoice":
    	    			"<small class='label text-column " + statusCollor + "'>Status: " + invoice.status + "</small><br>" +
    	    			"<small class='text-muted text-column'>Number: " + invoice.number + "</small><br>" +
    	    			"<small class='text-muted text-column'>Amount: " + invoice.amountNet + "</small><br>" +
    	    			"<small class='text-muted text-column'>Due date: " + separaDataMes(invoice.dueDate,"-") + "</small><br>",
    	    	"customer":
   	    				"<small class='text-muted text-column'>Agent: </small><small class='text-bold text-column'>" + invoice.agencySigla + "</small><br>",
       	    	"comments":"<small class='text-muted text-column'>" + invoice.trip.comments + "</small>",
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
	    			if ($(this).attr('data-process') == "a ver") {
	    				rest_obterInvoice($(this).attr('data-id'), deallocateRoom, semAcao, $(this).attr('data-emailInvoice') );
	    			};
	    		});
            }
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



function deallocateRoom (objFamily, emailInvoice) {

    $.each(objFamily.documento.rooms, function (i, room) {
    	var excluded = false;
        $.each(room.occupancySingleBed, function (w, occupancy) {
        	if (!excluded){
        		if (occupancy.emailInvoice == emailInvoice){
        			objFamily.documento.rooms[i].occupancySingleBed.splice(w, 1);
        			excluded = true;
        		};
        	};
        });            	
        $.each(room.occupancyCoupleBed, function (w, occupancy) {
        	if (!excluded){
	        	if (occupancy.emailInvoice == emailInvoice){
	        		objFamily.documento.rooms[i].occupancyCoupleBed.splice(w, 1);
	        		excluded = true;
	        	};
        	};
        });            	
    });

	rest_atualizaFamily(objFamily, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms deallocate", "Problems to update rooms, try again")
	
};

function clearFamilyName (objInvoice, status) {

	objInvoice.documento.trips[objInvoice.documento.actualTrip].familyName = "";
	objInvoice.documento.trips[objInvoice.documento.actualTrip].status = status;
	delete objInvoice.contact;
	delete objInvoice.rooms;
	delete objInvoice.family;

	rest_atualizaInvoice(objInvoice, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Family name cleared", "Problems to update invoice, try again");
	
	// *** refresh invoices list
	$(window.document.location).attr('href','invoices.html');

};

function changeStatus (objInvoice, status) {

	objInvoice.documento.trips[objInvoice.documento.actualTrip].status = status;
	delete objInvoice.contact;
	delete objInvoice.rooms;
	delete objInvoice.family;

	rest_atualizaInvoice(objInvoice, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Status changed", "Problems to update invoice, try again");
	
	// *** refresh invoices list
	$(window.document.location).attr('href','invoices.html');

};

function manualConfirmFamily (objInvoice, emailInvoice) {
	
	objInvoice.documento.trips[objInvoice.documento.actualTrip].status = "Confirmed";
	delete objInvoice.contact;
	delete objInvoice.rooms;
	delete objInvoice.family;

	rest_atualizaInvoice(objInvoice, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Status changed to confirm", "Problems to update invoice, try again");
	
	// *** refresh invoices list
	$(window.document.location).attr('href','invoices.html');
	
};

function sendEmailToFamilyToConfirm (objFamily, emailInvoice) {

	//
	//  ** send email to offer a family
	//
	rest_sendEmailHtml(localStorage.hostNameEmail, localStorage.userNameEmail , localStorage.passwordEmail, "grenneglr@gmail.com", objFamily.documento.contact.email, "Offer accommodation", templateOffertoFamily(), emailEnviado, emailComProblemas );
	
};
	