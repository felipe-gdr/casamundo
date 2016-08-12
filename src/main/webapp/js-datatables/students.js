	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
     * 			adendo a lista student
     */

	/**
	 * 				obter os dados
	 */
	rest_obterStudentsAll(carregaLocalStorageStudents, semAcao, localStorage.usuarioCity);


    /* Formatting function for row details - modify as you need */
	function formatStudent ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
	};
	function carregaLocalStorageStudents (objJson) {

		localStorage.setItem("students", JSON.stringify(objJson));

    	/* BASIC datatables*/

    	var responsiveHelper_students_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};
         
    	/* student list  */
        var student_table = $('#students_list').DataTable({
        	//"bFilter": false,
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
    			if (!responsiveHelper_students_list) {
    				responsiveHelper_students_list = new ResponsiveDatatablesHelper($('#students_list'), breakpointDefinition);
    			}
    		},
    		"rowCallback" : function(nRow) {
    			responsiveHelper_students_list.createExpandIcon(nRow);
    		},
    		"drawCallback" : function(oSettings) {
    			responsiveHelper_students_list.respond();
    		},		
    		"columns": [
    		            {
    		                "class":          'details-control',
    		                "orderable":      false,
    		                "data":           null,
    		                "defaultContent": ''
    		            },
    		            { "data": "student" },
    		            { "data": "dates" },
    		            { "data": "status" },
    		            { "data": "institution" },
    		            { "data": "people" },
    		            { "data": "preferences" },
    		            { "data": "comments" },
    		            ],
            "responsive": true,
            "charset" : "UTF-8",
            "bDestroy": true,
            "iDisplayLength": 15,
            "order": [[3, 'desc']],
            "fnDrawCallback": function( oSettings ) {
    	       runAllCharts()
    	    }
    	
        });
        var objJson = JSON.parse(localStorage.getItem("students"));
        $.each(objJson, function (i, student) {
        	var age = calculaIdade(separaData(student.birthDay, "/"));
        	switch (student.trip.status) {
        	case "Available":
        		statusCollor = "label-avaliable"
                break;
            case "Confirmed":
            	statusCollor = "label-confirmed"
                break;
            case "Placement offered":
            	statusCollor = "label-placement-offered"
                break;
            case "Terminated":
            	statusCollor = "label-terminated"
                break;
            default: 
        		statusCollor = "label-avaliable"
            };	    
        	switch (student.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	    
            var daysTotal = calculaDias(separaConverteDataMes(student.trip.start, "/"), separaConverteDataMes(student.trip.end, "/"));
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
            var age = calculaIdade(separaConverteDataMes(student.birthDay, "/"));
        	switch (student.trip.status) {
        	case "available":
        		statusCollor = "label-available"
                break;
            case "Confirmed":
            	statusCollor = "label-confirmed"
                break;
            case "Placement offered":
            	statusCollor = "label-placement-offered"
                break;
            case "Terminated":
            	statusCollor = "label-terminated"
                break;
            default: 
        		statusCollor = "label-available"
            };	    

            switch (student.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	    

            switch (student.trip.status) {
        	case "Available":
        		statusCollor = "label-available"
                break;
            case "Confirmed":
            	statusCollor = "label-confirmed"
                break;
            case "Placement offered":
        		statusCollor = "label-placement-offered"
       			break;
            default: 
        		genderCollor = "label-primary"
            };	    
        	switch (student.trip.smoke) {
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
            if (student.trip.medical){
            	medicalCollor = "label-warning";
            	medicalText = student.trip.medical;
            }else{
            	medicalCollor = "label-success";
            	medicalText = "Don´t have medical concerns";
            };
        	occupancyCollor = "label-success";
        	occupancyText = "";
            if (student.trip.occupancy){
            	occupancyText = student.trip.occupancy;
	            if (student.trip.occupancy == "Single"){
	            	occupancyCollor = "label-success";
	            }else{
	            	occupancyCollor = "label-warning";
	            };
            };
            if (student.trip.liveDogs == "Yes"){
            	liveDogsCollor = "label-success";
            	liveDogsText = "Live with dogs";
            }else{
            	liveDogsCollor = "label-warning";
            	liveDogsText = "Don't live with dogs";
            };
            if (student.trip.liveCats == "Yes"){
            	liveCatsCollor = "label-success";
            	liveCatsText = "Live with cats";
            }else{
            	liveCatsCollor = "label-warning";
            	liveCatsText = "Don't live with cats";
            };
        	switch (student.gender) {
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
            if (student.trip.specialDiet[0]){
			    $.each(student.trip.specialDiet, function (i, value) {
			    	specialDiet = String(specialDiet) + "<span class='label label-warning'>" + value + " </span>";
			    });
            }else{
            	specialDiet = "<span class='label label-success'>No food restrictions</span>"
            };
		    
	        var actions = "";
	        var actualTrip = student.actualTrip;
	        var emailStudent = student.mail;
		    var accommodation = "Not yet acomodate";
	        var familyName = "";
	        var typePage = "accommodation";
		    if (student.trip.familyName) {
		        familyName = student.trip.familyName;	
		        accommodation =
		        "<span>" + student.trip.familyName + "</span><br>" +
    			"<span>" + student.familyContact.firstName +  " " + student.familyContact.lastName + "</span><br>" + 
    			"<small class='text-muted'><i>Gender: " + student.familyContact.gender + "<i></small><br>" + 
    			"<small class='text-muted'><i>Phone: " + student.familyContact.phoneNumber +  "<i></small><br>" + 
    			"<small class='text-muted'><i>Cel Phone: " + student.familyContact.mobilePhoneNumber +  "<i></small><br>" + 
    			"<small class='text-muted'><i>Email: " + student.familyContact.email +  "<i></small><br></a>";
		    };
	        var familyName = student.trip.familyName;
	        if (student.trip.status == "Available"){
	        	actions = "<li><a href='student.html?mail=" + student.mail + "&typePage=accommodation'>Looking for accommodation</a></li>";
	        };
	        if (student.trip.status == "Confirmed"){
	        	typePage = "change";
	        	actions = "<li data-process='sendlettertostudent' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#letterToStudent'>Send confirmation letter</a></li>";
	        };
	        if (student.trip.status == "DocsOk"){
	        	typePage = "change";
	        	actions = "<li data-process='studentinhouse' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#offerToFamily'>Student in house</a></li>" +
	        				"<li data-process='cancel' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#offerToFamily'>Cancel></li>"
	        };
	        if (student.trip.status == "InHouse"){
	        	typePage = "change";
	        	actions = "<li data-process='terminate' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#offerToFamily'>Terminated</a></li>" +
	        				"<li data-process='cancel' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#offerToFamily'>Cancel></li>"
	        };
	        var pickupCollor = "success";
	        if (student.trip.pickup == "Yes"){
	        	pickupCollor = "danger";
	        }
	        var drooffCollor = "success";
	        if (student.trip.dropoff == "Yes"){
	        	dropoffCollor = "danger";
	        }
            student_table.row.add( {
    	    	"student": "<a href='student.html?mail=" + student.mail + "&typePage=change'>" +
    	    			"<span>" + student.firstName +  " " + student.lastName + "</span><br>" + 
    	    			"<small class='label " + genderCollor + " '>" + student.gender + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted'><i>" + student.nationality + "<i></small><br>" +
    	    			"<small class='text-muted'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + age + "<i></small><br>",
                "dates":"<small class='hide'>" + converteAnoMesDia(student.trip.start) + "</small><small class='text-muted'>In: " + separaDataMes(student.trip.start, "-") + "</small><br>" +
                		"<small class='text-muted'>Out: " + separaDataMes(student.trip.end, "-") + "</small><br>" +
                		"<small class='text-muted'>" + durationTrip + "</small><br>",
    	    	"status":"<small class='label " + statusCollor + "'>" + student.trip.status + "</small>&nbsp;&nbsp;" +
    	    			"<small class='label-danger'>" + " no $  " + "</small><br>" +
    	    			"<small class='text-muted'>Visa:" + " No " + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted'>Flight:" + student.trip.arrivalFlightNumber + "</small><br>" +
    	    			"<small class='text-muted'>Pickup:</small><small class='text-" + pickupCollor + "'>" + student.trip.pickup + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted'>Dropoff:</small><small class='text-" + dropoffCollor + "'>" + student.trip.dropoff + "</small>&nbsp;&nbsp;",
    	    	"institution":"<small class='text-muted'>School: " + student.school.sigla + "</small><br>" +
    	    				"<small class='text-muted'>Agent: " + student.agency.agencySigla + "</small><br>",
    	    	"people":"<small class='text-muted'>Host: " + student.trip.familyName + "</small><br>" +
    	    			"<small class='text-muted'>Driver: " + "Available" + "</small><br>",
       	    	"preferences":"<small class='text-muted'>" + student.trip.occupancy + "</small>&nbsp;&nbsp;" +
    	    				"<small class='text-muted'>Pvt WC: " + student.trip.privateWashroom + "</small><br>" +
    	    				"<small class='text-muted'>Dogs: " + student.trip.liveDogs + "</small>&nbsp;&nbsp;" +
    	    				"<small class='text-muted'>Cats: " + student.trip.liveCats + "</small><br>" +
    	    				"<small class='text-muted'>Full board: " + student.trip.privateWashroom + "</small>&nbsp;&nbsp;" +
    	    				"<small class='text-muted'>" + student.trip.specialDiet + "</small>",
    	    				
       	    	"comments":"<small class='text-muted'>" + student.trip.comments + "</small>",
                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button><ul class="dropdown-menu"><li><a  data-toggle="modal" data-target="#accommodation">Change</a></li></ul></div>'
    	    }).draw( false );
        });
    	// Add event listener for opening and closing details
        $('#students_list tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = student_table.row( tr );
     
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( formatStudent(row.data()) ).show();
                tr.addClass('shown');
            }
        });
        
        // Apply the filter
        $("#students_list thead th input[type=text]").on( 'keyup change', function () {
        	
        	student_table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
                
        } );
        /* end trip list */   
};
	