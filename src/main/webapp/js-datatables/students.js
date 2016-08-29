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
	function carregaLocalStorageStudents (objJson, destroy) {

		localStorage.setItem("students", JSON.stringify(objJson));

    	/* BASIC datatables*/

    	var responsiveHelper_students_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};

    	/* student list  */
        var student_table = $('#students_list').DataTable({
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
    		                "defaultContent": ''
    		            },
    		            { "data": "student",
    		            	"width": "15%"},
    		            { "data": "dates",
    		            	"width": "15%"},
    		            { "data": "status",
    		            	"width": "15%"},
    		            { "data": "institution",
    		            	"width": "10%"},
    		            { "data": "people",
    		            	"width": "10%"},
    		            { "data": "preferences",
    		            	"width": "15%"},
    		            { "data": "comments",
    		            	"width": "20%"},
    		            ],
            "responsive": true,
            "charset" : "UTF-8",
            "bDestroy": true,
            "iDisplayLength": 30,
            "order": [[2, 'asc']],
            "fnDrawCallback": function( oSettings ) {
    	       runAllCharts()
    	    }
    	
        });
        var objJson = JSON.parse(localStorage.getItem("students"));
        
        student_table.clear();
        
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
			    	specialDiet = String(specialDiet) + "<span class='label label-warning text-column'>" + value + " </span>";
			    });
            }else{
            	specialDiet = "<span class='label label-success text-column'>No food restrictions</span>"
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
		        "<span class='text-muted text-column'>" + student.trip.familyName + "</span><br>" +
    			"<span class='text-muted text-column'>" + student.familyContact.firstName +  " " + student.familyContact.lastName + "</span><br>" + 
    			"<small class='text-muted text-column'><i>Gender: " + student.familyContact.gender + "<i></small><br>" + 
    			"<small class='text-muted text-column'><i>Phone: " + student.familyContact.phoneNumber +  "<i></small><br>" + 
    			"<small class='text-muted text-column'><i>Cel Phone: " + student.familyContact.mobilePhoneNumber +  "<i></small><br>" + 
    			"<small class='text-muted text-column'><i>Email: " + student.familyContact.email +  "<i></small><br></a>";
		    };
	        var familyName = student.trip.familyName;
	        if (localStorage.usuarioPerfil == "caretaker" | localStorage.usuarioPerfil == "administrator"){
		        if (student.trip.status == "Available"){
		        	actions = "<li><a href='student.html?mail=" + student.mail + "&typePage=accommodation'>Looking for accommodation</a></li>" +
		        			  "<li data-process='changestatustocanceled' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Canceled</a></li>";
		        };
		        if (student.trip.status == "Allocated"){
		        	actions = "<li data-process='deallocateroom' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Deallocated room</a></li>" +
		        			  "<li data-process='manualconfirm' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Manual confirm</a></li>" +
		        			  "<li data-process='sendemailtofamilytoconfirm' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-emailFamily='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Send email to family to confirm</a></li>" +
		        			  "<li data-process='changestatustocanceled' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Canceled</a></li>";
		        };
		        if (student.trip.status == "Offered"){
		        	actions = "<li data-process='deallocateroom' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Deallocated room</a></li>" +
		        			  "<li data-process='manualconfirm' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Manual confirm</a></li>" +
		        			  "<li data-process='sendemailtofamilytoconfirm' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-emailFamily='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Send email to family to confirm</a></li>" +
		        			  "<li data-process='changestatustocanceled' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Canceled</a></li>";
		        };
		        if (student.trip.status == "Confirmed"){
		        	typePage = "change";
		        	actions = "<li data-process='deallocateroom' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Deallocated room</a></li>" +
		        			  "<li data-process='sendlettertostudent' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#letterToStudent'>Send confirmation letter</a></li>" +
		        			  "<li data-process='changestatustodocuments' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Change to documents ok</a></li>" +
		        			  "<li data-process='changestatustocanceled' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Canceled</a></li>";
		        };
		        if (student.trip.status == "Documents"){
		        	typePage = "change";
		        	actions = "<li data-process='deallocateroom' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Deallocated room</a></li>" +
	        				  "<li data-process='changestatustoinhouse' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Change to in house</a></li>" +
	        				  "<li data-process='changestatustocanceled' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Canceled</a></li>";
		        };
		        if (student.trip.status == "In house"){
		        	typePage = "change";
		        	actions = "<li data-process='deallocateroom' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Deallocated room</a></li>" +
		        			  "<li data-process='changestatustocheckout' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Change to check out</a></li>" +
		        			  "<li data-process='extendtrip' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Extend trip</a></li>" +
		        			  "<li data-process='changestatustocanceled' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Canceled</a></li>";
		        };
		        if (student.trip.status == "Checked out"){
		        	typePage = "change";
		        	actions = "<li data-process='sendemailtostudenttoevaluete' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-emailFamily='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Send student email to evaluete</a></li>" +
		        			  "<li data-process='evaluetereceived' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-emailFamily='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Evaluete received</a></li>" +
		        			  "<li data-process='newtrip' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-emailFamily='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Initiate a new trip</a></li>";
		        };
		        if (student.trip.status == "Canceled"){
		        	typePage = "change";
		        	actions = "<li data-process='recovercanceled' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#'>Recover canceled</a></li>";
		        };
	        };
		    var pickupCollor = "success";
	        if (student.trip.pickup == "Yes"){
	        	pickupCollor = "danger";
	        }
	        var dropoffCollor = "success";
	        if (student.trip.dropoff == "Yes"){
	        	dropoffCollor = "danger";
	        }
            student_table.row.add( {
    	    	"student": "<a href='student.html?mail=" + student.mail + "&typePage=change'>" +
    	    			"<span class='text-column'>" + student.firstName +  " " + student.lastName + "</span><br>" + 
    	    			"<small class='label text-column " + genderCollor + " '>" + student.gender + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'><i>" + student.nationality + "<i></small><br>" +
    	    			"<small class='text-muted text-column'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + age + "<i></small><br>",
                "dates":"<small class='hide'>" + converteAnoMesDia(student.trip.start) + "</small><small class='text-muted text-column'>In: " + separaDataMes(student.trip.start, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>Out: " + separaDataMes(student.trip.end, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>" + durationTrip + "</small><br>",
    	    	"status":"<small class='label text-column " + statusCollor + "'>" + student.trip.status + "</small>&nbsp;&nbsp;" +
    	    			"<small class='label-danger text-column'>" + " no $  " + "</small><br>" +
    	    			"<small class='text-muted text-column'>Visa: " + " No " + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'>Flight: " + student.trip.arrivalFlightNumber + "</small><br>" +
    	    			"<small class='text-muted text-column'>Pickup: </small><small class='text-" + pickupCollor + " text-column '>" + student.trip.pickup + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'>Dropoff: </small><small class='text-" + dropoffCollor + " text-column '>" + student.trip.dropoff + "</small>&nbsp;&nbsp;",
    	    	"institution":"<small class='text-muted text-column'>School: </small><small class='text-bold text-column'>" + student.school.sigla + "</small><br>" +
    	    				"<small class='text-muted text-column'>Agent: </small><small class='text-bold text-column'>" + student.agency.agencySigla + "</small><br>",
    	    	"people":"<small class='text-muted text-column'>Host: </small><small class='text-bold text-column'>" + student.trip.familyName + "</small><br>" +
    	    			"<small class='text-muted text-column'>Driver: " + "Available" + "</small><br>",
       	    	"preferences":"<small class='text-muted text-column'>" + student.trip.occupancy + "</small>&nbsp;&nbsp;" +
    	    				"<small class='text-muted text-column'>Pvt WC: " + student.trip.privateWashroom + "</small><br>" +
    	    				"<small class='text-muted text-column'>Dogs: " + student.trip.liveDogs + "</small>&nbsp;&nbsp;" +
    	    				"<small class='text-muted text-column'>Cats: " + student.trip.liveCats + "</small><br>" +
    	    				"<small class='text-muted text-column'>" + student.trip.mealPlan + "</small>&nbsp;&nbsp;" +
    	    				"<small class='text-muted text-column'>" + student.trip.specialDiet + "</small>",    	    				
       	    	"comments":"<small class='text-muted text-column'>" + student.trip.comments + "</small>",
                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
    			'<ul id="listStudent" class="dropdown-menu">' +
    				actions +
    			'</ul></div>'
    	    }).draw( false );
        });
        
    	// Add event listener for opening and closing details
        $('#students_list tbody').off('click');
        $('#students_list tbody').on('click', 'td.details-control', function () {
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
            	$("#listStudent li").off('click');
	    		$("#listStudent li").on('click',function(){
	    			if ($(this).attr('data-process') == "deallocateroom") {
	    				rest_obterFamily($(this).attr('data-idFamily'), deallocateRoom, semAcao, $(this).attr('data-emailStudent') );
	    				rest_obterStudent($(this).attr('data-emailStudent'), clearFamilyName, semAcao, "Available");
	    			};
	    			if ($(this).attr('data-process') == "changestatustocanceled") {
	    				if ($(this).attr('data-idFamily')){
	    					rest_obterFamily($(this).attr('data-idFamily'), deallocateRoom, semAcao, $(this).attr('data-emailStudent') );
	    				};
	    				rest_obterStudent($(this).attr('data-emailStudent'), clearFamilyName, semAcao, "Canceled");
	    			};
	    			if ($(this).attr('data-process') == "manualconfirm") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), manualConfirmFamily, semAcao);
	    			};
	    			if ($(this).attr('data-process') == "sendemailtofamilytoconfirm") {
	    				rest_obterFamily($(this).attr('data-idFamily'), sendEmailToFamilyToConfirm, semAcao, $(this).attr('data-emailStudent') );
	    			};
	    			if ($(this).attr('data-process') == "sendlettertostudent") {
	    			//	rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Documents");
	    			};
	    			if ($(this).attr('data-process') == "changestatustodocuments") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Documents");
	    			};
	    			if ($(this).attr('data-process') == "changestatustoinhouse") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "In house");
	    			};
	    			if ($(this).attr('data-process') == "changestatustocheckout") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Checked out");
	    			};
	    			if ($(this).attr('data-process') == "changestatustoinhouse") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "In house");
	    			};
	    			if ($(this).attr('data-process') == "recovercanceled") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Available");
	    			};
	    			if ($(this).attr('data-process') == "evaluetereceived") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Evaluete received");
	    			};
	    			if ($(this).attr('data-process') == "newtrip") {
	    				if ($(this).attr('data-idFamily')){
	    					rest_obterFamily($(this).attr('data-idFamily'), deallocateRoom, semAcao, $(this).attr('data-emailStudent') );
	    				};
	    				rest_obterStudent($(this).attr('data-emailStudent'), clearFamilyName, semAcao, "Available");
	    			};
	    		});
            }
        });
        
        // Apply the filter
        $("#students_list thead th input[type=text]").off( 'keyup change');
        $("#students_list thead th input[type=text]").on( 'keyup change', function () {
        	
        	student_table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
                
        } );
        /* end trip list */   
};



function deallocateRoom (objFamily, emailStudent) {

    $.each(objFamily.documento.rooms, function (i, room) {
    	var excluded = false;
        $.each(room.occupancySingleBed, function (w, occupancy) {
        	if (!excluded){
        		if (occupancy.emailStudent == emailStudent){
        			objFamily.documento.rooms[i].occupancySingleBed.splice(w, 1);
        			excluded = true;
        		};
        	};
        });            	
        $.each(room.occupancyCoupleBed, function (w, occupancy) {
        	if (!excluded){
	        	if (occupancy.emailStudent == emailStudent){
	        		objFamily.documento.rooms[i].occupancyCoupleBed.splice(w, 1);
	        		excluded = true;
	        	};
        	};
        });            	
    });

	rest_atualizaFamily(objFamily, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms deallocate", "Problems to update rooms, try again")
	
};

function clearFamilyName (objStudent, status) {

	objStudent.documento.trips[objStudent.documento.actualTrip].familyName = "";
	objStudent.documento.trips[objStudent.documento.actualTrip].status = status;
	delete objStudent.contact;
	delete objStudent.rooms;
	delete objStudent.family;

	rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Family name cleared", "Problems to update student, try again");
	
	// *** refresh students list
	$(window.document.location).attr('href','students.html');

};

function changeStatus (objStudent, status) {

	objStudent.documento.trips[objStudent.documento.actualTrip].status = status;
	delete objStudent.contact;
	delete objStudent.rooms;
	delete objStudent.family;

	rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Status changed", "Problems to update student, try again");
	
	// *** refresh students list
	$(window.document.location).attr('href','students.html');

};

function manualConfirmFamily (objStudent, emailStudent) {
	
	objStudent.documento.trips[objStudent.documento.actualTrip].status = "Confirmed";
	delete objStudent.contact;
	delete objStudent.rooms;
	delete objStudent.family;

	rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Status changed to confirm", "Problems to update student, try again");
	
	// *** refresh students list
	$(window.document.location).attr('href','students.html');
	
};

function sendEmailToFamilyToConfirm (objFamily, emailStudent) {

	//
	//  ** send email to offer a family
	//
	rest_sendEmailHtml(localStorage.hostNameEmail, localStorage.userNameEmail , localStorage.passwordEmail, "grenneglr@gmail.com", objFamily.documento.contact.email, "Offer accommodation", templateOffertoFamily(), emailEnviado, emailComProblemas );
	
};
	