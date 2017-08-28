

    /* Formatting function for row details - modify as you need */
	function formatStudent ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
		        '<td style="width:100px">Notes:</td>'+
		        '<td>'+d.notes+'</td>'+
		    '</tr>'+
	    '</table>';
	};
	function carregaAccommodationsStudents (objJson, origem) {

    	/* BASIC datatables*/

    	var responsiveHelper_accommodations_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};

    	/* student list  */
        var student_table = $('#accommodations_list').DataTable({
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
    			if (!responsiveHelper_accommodations_list) {
    				responsiveHelper_accommodations_list = new ResponsiveDatatablesHelper($('#accommodations_list'), breakpointDefinition);
    			}
    		},
    		"rowCallback" : function(nRow) {
    			responsiveHelper_accommodations_list.createExpandIcon(nRow);
    		},
    		"drawCallback" : function(oSettings) {
    			responsiveHelper_accommodations_list.respond();
    		},		
    		"columns": [
    		            { "data": "accommodation",
    		            	"width": "25%"},
    		            { "data": "dates",
    		            	"width": "20%"},
    		            { "data": "status",
    		            	"width": "15%"},
    		            { "data": "institution",
    		            	"width": "20%"},
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
        
        student_table.clear();
        
        if (objJson.accommodations){
	        $.each(objJson.accommodations, function (i, accommodation) {
	        	if (origem == "family"){
	        		objJson.documento = accommodation.documento;
	        	};
		        var actualTrip = accommodation.occupancy_all.actualTrip;
	            var statusCollor = statusCollorDef (objJson.documento.trips[actualTrip].status);
	            var age = calculaIdade(separaConverteDataMes(objJson.documento.birthDay, "/"));
	            var durationTrip = intervaloDatas(accommodation.occupancy_all.startOccupancy, accommodation.occupancy_all.endOccupancy);
	            var smokeCollor = smokeCollorDef (objJson.documento.trips[actualTrip].smoke);
	            var smokeText = smokeTextDef (objJson.documento.trips[actualTrip].smoke);
	            if (objJson.documento.trips[actualTrip].medical){
	            	medicalCollor = "label-warning";
	            	medicalText = objJson.documento.trips[actualTrip].medical;
	            }else{
	            	medicalCollor = "label-success";
	            	medicalText = "Don´t have medical concerns";
	            };
	        	occupancyCollor = "label-success";
	        	occupancyText = "";
	            if (objJson.documento.trips[actualTrip].occupancy){
	            	occupancyText = objJson.documento.trips[actualTrip].occupancy;
		            if (objJson.documento.trips[actualTrip].occupancy == "Single"){
		            	occupancyCollor = "label-success";
		            }else{
		            	occupancyCollor = "label-warning";
		            };
	            };
	            if (objJson.documento.trips[actualTrip].liveDogs == "Yes"){
	            	liveDogsCollor = "label-success";
	            	liveDogsText = "Live with dogs";
	            }else{
	            	liveDogsCollor = "label-warning";
	            	liveDogsText = "Don't live with dogs";
	            };
	            if (objJson.documento.trips[actualTrip].liveCats == "Yes"){
	            	liveCatsCollor = "label-success";
	            	liveCatsText = "Live with cats";
	            }else{
	            	liveCatsCollor = "label-warning";
	            	liveCatsText = "Don't live with cats";
	            };
	            var genderCollor = genderCollorDef (objJson.documento.gender);
	            var specialDiet = "";
	            if (objJson.documento.trips[actualTrip].specialDiet[0]){
				    $.each(objJson.documento.trips[actualTrip].specialDiet, function (i, value) {
				    	specialDiet = String(specialDiet) + "<span class='label label-warning text-column'>" + value + " </span>";
				    });
	            }else{
	            	specialDiet = "<span class='label label-success text-column'>No food restrictions</span>"
	            };
			    
		        var invoices = "";
		        var emailStudent = objJson.documento.mail;
		        var idStudent = objJson.documento._id;
		        var idFamily = "";
		        var familyName = "";
		        var typePage = "accommodation";
	        	invoices = "<li><a href='create-invoice.html?mail=" + objJson.documento.mail + "&typePage=create&actualTrip=" + actualTrip + "'>Create invoice</a></li>";
	        	var dadosStudent = " data-emailStudent='" + emailStudent + "' data-emailStudent='" + idStudent + "' data-actualTrip='" + actualTrip + "'";
	        	//
		        // *** checa status dos pagamentos
		        //
		        var payment = checkPayment(objJson.documento.invoices);
			    var paymentCollor = payment.collor;
		        var paymentText = payment.text;
	
	        	//
		        // *** checa status do pickup
		        //
		        var pickupCollor = "success";
		        if (objJson.documento.trips[actualTrip].pickup == "Yes"){
		        	pickupCollor = "danger";
		        };
		        var dropoffCollor = "success";
		        if (objJson.documento.trips[actualTrip].dropoff == "Yes"){
		        	dropoffCollor = "danger";
		        }
			    var accommodations = "";
			    if (origem == "student"){
				    if (accommodation.occupancy_all.local == "family"){
			        	var familyName = "";
			        	if (accommodation.occupancy_all.familyName){
			        		familyName = accommodation.occupancy_all.familyName;
			        	};
			        	accommodations = "<small class='text-muted text-column'>Host: </small><small class='text-bold text-column'>" + familyName + "</small><br>";
			        };
			        if (accommodation.occupancy_all.local == "dorms"){
			        	var dormName = "";
			        	if (accommodation.occupancy_all.dorm){
			        		dormName = accommodation.occupancy_all.dorm;
			        	};
			        	var unitName = "";
			        	if (accommodation.occupancy_all.unit){
			        		unitName = accommodation.occupancy_all.unit;
			        	};
			        	var roomName = "";
			        	if (accommodation.occupancy_all.room){
			        		roomName = accommodation.occupancy_all.room;
			        	};
			        	var bedName = "";
			        	if (accommodation.occupancy_all.bed){
			        		bedName = accommodation.occupancy_all.bed;
			        	};
			        	accommodations = 
			        					"<small class='text-muted text-column'>Dorm: </small><small class='text-bold text-column'>" + dormName + "</small><br>" +
			        					"<small class='text-muted text-column'>Unit: </small><small class='text-bold text-column'>" + unitName + "</small><br>" +
			        					"<small class='text-muted text-column'>Room: </small><small class='text-bold text-column'>" + roomName + "</small><br>" +
										"<small class='text-muted text-column'>Bed: </small><small class='text-bold text-column'>" + bedName + "</small><br>";
			        	
			        };
			    };
			    if (origem == "family"){
		        	accommodations = 
    	    			"<a href='student.html?mail=" + objJson.documento.mail + "&typePage=change&actualTrip=" + actualTrip + "'>" +
    	    			"<span class='text-column'>" + objJson.documento.firstName +  " " + objJson.documento.lastName + "</span><br>" + 
    	    			"<small class='label text-column " + genderCollor + " '>" + objJson.documento.gender + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'><i>" + objJson.documento.nationality + "<i></small><br>" +
    	    			"<small class='text-muted text-column'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + age + "<i></small><br>";
			    };
		        var notes = "";
		        if (objJson.documento.notes) {
				    $.each(objJson.documento.notes, function (i, note) {
				    	notes = notes + note.note + "<br>";
				    });	        	
		        };
		        var agencySigla = "";
		        if (objJson.documento.trips[actualTrip].agency){
		        	agencySigla = objJson.documento.trips[actualTrip].agency.sigla;
		        };
		        var schoolSigla = "";
		        if (objJson.documento.trips[actualTrip].school){
		        	schoolSigla = objJson.documento.trips[actualTrip].school.sigla;
		        };
		        var action = "";
	            student_table.row.add( {
	    	    	"accommodation": 
		    			accommodations,
	                "dates":
	                		"<small class='hide'>" + separaAnoMesDia(accommodation.occupancy_all.startOccupancy) + "</small>" +
	                		"<small class='hide'>" + converteAnoMesDia(accommodation.occupancy_all.startOccupancy) + "</small>" + 
	                		"<small class='text-muted text-column'>In: " + separaDataMes(accommodation.occupancy_all.startOccupancy, "-") + "</small><br>" +
	                		"<small class='text-muted text-column'>Out: " + separaDataMes(accommodation.occupancy_all.endOccupancy, "-") + "</small><br>" +
	                		"<small class='text-muted text-column'>" + durationTrip + "</small><br>",
	    	    	"status":
	    	    			"<small class='label text-column " + statusCollor + "'>" + objJson.documento.trips[actualTrip].status + "</small>&nbsp;&nbsp;" +
	    	    			"<small class='text-column label-" + paymentCollor + "'>" + paymentText + "</small><br>" +
	    	    			"<small class='text-muted text-column'>Visa: " + " No " + "</small>&nbsp;&nbsp;" +
	    	    			"<small class='text-muted text-column'>Flight: " + objJson.documento.trips[actualTrip].arrivalFlightNumber + "</small><br>" +
	    	    			"<small class='text-muted text-column'>Pickup: </small><small class='text-" + pickupCollor + " text-column '>" + objJson.documento.trips[actualTrip].pickup + "</small>&nbsp;&nbsp;" +
	    	    			"<small class='text-muted text-column'>Dropoff: </small><small class='text-" + dropoffCollor + " text-column '>" + objJson.documento.trips[actualTrip].dropoff + "</small>&nbsp;&nbsp;",
	    	    	"institution":"<small class='text-muted text-column'>School: </small><small class='text-bold text-column'>" + schoolSigla + "</small><br>" +
	    	    				"<small class='text-muted text-column'>Agent: </small><small class='text-bold text-column'>" + agencySigla + "</small><br>",
	       	    	"comments":"<small class='text-muted text-column'>" + objJson.documento.trips[actualTrip].comments + "</small>",
	       	    	"notes":"<small class='text-muted text-column'>" + notes + "</small>"
	    	    }).draw( false );
	        });
	
	    	// Add event listener for opening and closing details
	        $('#accommodations_list tbody').off('click');
	        $('#accommodations_list tbody').on('click', 'td.details-control', function () {
	        	var tr = $(this).closest('tr');
	        	var a = tr["0"]._DT_RowIndex;
	            var row = student_table.row(tr);
	     
	            if ( row.child.isShown() ) {
	                // This row is already open - close it
	                row.child.hide();
	                tr.removeClass('shown');
	            }
	            else {
	                // Open this row
	            	if (row){
	            		row.child( formatStudent(row.data()) ).show();
	            		tr.addClass('shown');
	            	};
	            }
	        });
        };
        
        // Apply the filter
        $("#accommodations_list thead th input[type=text]").off( 'keyup change');
        $("#accommodations_list thead th input[type=text]").on( 'keyup change', function () {
        	
        	student_table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
                
        });
        /* end trip list */   
};

function checkPayment(invoices){
	var payment =
		{
			collor : "info",
			text : "new $"
		};
	
	if (invoices){
		$.each(invoices, function (i, invoice) {
	    	
			switch (invoice.status) {
	    	case "unpaid":
	    		if (maiorDataHoje (invoice.dueDate)){
	    			payment.collor = "warning";
	    			payment.text = "unppaid $";
	    		}else{
	    			payment.collor = "danger";
	    			payment.text = "overdue $";    			
	    		};
	            break;
	        case "paid":
				payment.collor = "success";
				payment.text = "paid $";
	            break;
	        default: 
				payment.collor = "default";
				payment.text = "none $";
	        };	    		
		});
	};	
	return payment;
};
