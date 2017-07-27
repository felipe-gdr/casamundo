	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	if (parametrosDaUrl){
		localStorage.accommodation = parametrosDaUrl.split("=")[1];
	};
	
	$(".homestay").addClass("hide");
	$(".dorms").addClass("hide");
	
	if (localStorage.accommodation == "Homestay"){
		$(".homestay").removeClass("hide");	
	};

	if (localStorage.accommodation == "Dorms"){
		$(".dorms").removeClass("hide");	
	};

	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
     * 			adendo a lista student
     */

    console.log ("1 - " + new Date().getTime());

	/**
	 * 				obter os dados
	 */
	rest_obterStudentsAll(carregaLocalStorageStudents, semAcao, localStorage.usuarioCity, localStorage.accommodation , null, null);


    /* Formatting function for row details - modify as you need */
	function formatStudent ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
		        '<td style="width:100px">Notes:</td>'+
		        '<td>'+d.notes+'</td>'+
		    '</tr>'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
	};
	function carregaLocalStorageStudents (objJson, destroy) {

        console.log ("2 - " + new Date().getTime());

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
            "fnDrawCallback": function( oSettings ) {
    	       runAllCharts()
    	    }
    	
        });
//       console.log ("3 - " + new Date().getTime());

        var objJson = JSON.parse(localStorage.getItem("students"));
        
        student_table.clear();
        
        $.each(objJson, function (i, student) {
//	        console.log ("4 - " + new Date().getTime());
        	var age = calculaIdade(separaData(student.birthDay, "/"));
            var statusCollor = statusCollorDef (student.trip.status);
            var genderCollor = genderCollorDef (student.gender);
            var smokeCollor = smokeCollorDef (student.trip.smoke);
            var smokeText = smokeTextDef (student.trip.smoke);
            var durationTrip = intervaloDatas(student.trip.start, student.trip.end);
            var age = calculaIdade(separaConverteDataMes(student.birthDay, "/"));
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
            var specialDiet = "";
            if (student.trip.specialDiet[0]){
			    $.each(student.trip.specialDiet, function (i, value) {
			    	specialDiet = String(specialDiet) + "<span class='label label-warning text-column'>" + value + " </span>";
			    });
            }else{
            	specialDiet = "<span class='label label-success text-column'>No food restrictions</span>"
            };
		    
	        var actions = "";
	        var invoices = "";
	        var actualTrip = student.actualTrip;
	        var emailStudent = student.mail;
	        var idStudent = student._id;
	        var idFamily = "";
		    var accommodation = "Not yet acomodate";
	        var familyName = "";
	        var typePage = "accommodation";
		    if (student.trip.familyName) {
		        familyName = student.trip.familyName;
		        idFamily = student.trip.idFamily;
		        accommodation =
		        "<span class='text-muted text-column'>" + student.trip.familyName + "</span><br>" +
    			"<span class='text-muted text-column'>" + student.familyContact.firstName +  " " + student.familyContact.lastName + "</span><br>" + 
    			"<small class='text-muted text-column'><i>Gender: " + student.familyContact.gender + "<i></small><br>" + 
    			"<small class='text-muted text-column'><i>Phone: " + student.familyContact.phoneNumber +  "<i></small><br>" + 
    			"<small class='text-muted text-column'><i>Cel Phone: " + student.familyContact.mobilePhoneNumber +  "<i></small><br>" + 
    			"<small class='text-muted text-column'><i>Email: " + student.familyContact.email +  "<i></small><br></a>";
		    };
	        var familyName = student.trip.familyName;
        	invoices = "<li><a href='create-invoice.html?mail=" + student.mail + "&typePage=create&actualTrip=" + actualTrip + "'>Create invoice</a></li>";
        	var dadosStudent = " data-idFamily='" + idFamily + "' data-familyName='" + familyName + "' data-emailStudent='" + emailStudent + "' data-emailStudent='" + idStudent + "' data-actualTrip='" + actualTrip + "'";
	        if (localStorage.usuarioPerfil == "caretaker" | localStorage.usuarioPerfil == "administrator" | localStorage.usuarioPerfil == "tools"){
	        	if (localStorage.accommodation == "Homestay"){
		        	if (student.trip.status == "Available" | student.trip.status == "Partially allocated"){
			        	actions = 
			        		"<li><a href='accommodation.html?mail=" + student.mail + "&typePage=accommodation&actualTrip=" + actualTrip + "'>Looking for accommodation</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled'" + dadosStudent + "><a href='#'>Cancel</a></li>";
			        	if (student.trip.status == "Partially allocated"){
			        		actions = actions +	
			        		"<li data-process='deallocatebed' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Deallocated bed</a></li>";
			        	};
			        };
			        if (student.trip.status == "Allocated"){
			        	actions = 
			        		"<li data-process='manualconfirm'" + dadosStudent + "><a href='#'>Manual confirm</a></li>" +
			        		"<li data-process='sendemailtofamilytoconfirm'" + dadosStudent + "><a href='#'>Send email to family to confirm</a></li>" +
			        		"<li data-process='createConfirmationLetter'" + dadosStudent + "><a href='#'>Create confirmation letter</a></li>" +
			        		"<li data-process='deallocateroom'" + dadosStudent + "><a href='#'>Deallocated room</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled'" + dadosStudent + "><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "Offered"){
			        	actions = 
			        		"<li data-process='manualconfirm'" + dadosStudent + "><a href='#'>Manual confirm</a></li>" +
			        		"<li data-process='sendemailtofamilytoconfirm'" + dadosStudent + "><a href='#'>Send email to family to confirm</a></li>" +
			        		"<li data-process='deallocateroom'" + dadosStudent + "><a href='#'>Deallocated room</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled'" + dadosStudent + "><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "Confirmed"){
			        	typePage = "change";
			        	actions =
			        		"<li data-process='changestatustodocuments'" + dadosStudent + "><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#letterToStudent'>Send confirmation letter</a></li>" +
			        		"<li data-process='deallocateroom'" + dadosStudent + "><a href='#'>Deallocated room</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled'" + dadosStudent + "><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "Documents"){
			        	typePage = "change";
			        	actions = 
		        			"<li data-process='changestatustoinhouse'" + dadosStudent + "><a href='#'>Change to in house</a></li>" +
			        		"<li data-process='deallocateroom'" + dadosStudent + "><a href='#'>Deallocated room</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled'" + dadosStudent + "><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "In house"){
			        	typePage = "change";
			        	actions = 
			        		"<li data-process='changestatustocheckout'" + dadosStudent + "><a href='#'>Change to check out</a></li>" +
			        		"<li data-process='deallocateroom'" + dadosStudent + "><a href='#'>Deallocated room</a></li>" +
			        		"<li><a href='extend-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>Extend trip</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled'" + dadosStudent + "><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "Checked out"){
			        	typePage = "change";
			        	actions = 
			        		"<li data-process='sendemailtostudenttoevaluete'" + dadosStudent + "><a href='#'>Send student email to evaluete</a></li>" +
			        		"<li data-process='evaluetereceived'" + dadosStudent + "><a href='#'>Evaluete received</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>";
			        };
			        if (student.trip.status == "Canceled"){
			        	typePage = "change";
			        	actions = 
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='recovercanceled'" + dadosStudent + "><a href='#'>Recover canceled</a></li>";
			        };
	        	};
	        };
	        if (localStorage.usuarioPerfil == "caretaker" | localStorage.usuarioPerfil == "administrator" | localStorage.usuarioPerfil == "tools"){
	        	if (localStorage.accommodation == "Dorms"){
		        	if (student.trip.status == "Available" | student.trip.status == "Partially allocated"){
			        	actions = 
			        		"<li><a href='accommodation-dorms.html?mail=" + student.mail + "&typePage=accommodation-dorms&actualTrip=" + actualTrip + "'>Looking for a room</a></li>" +
			        		"<li data-process='changestatustocanceled' data-idroom='" + student.mail + "' " + dadosStudent + "><a href='#'>Cancel</a></li>";
			        	if (student.trip.status == "Partially allocated"){
			        		actions = actions +	
			        		"<li data-process='deallocatebed' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Deallocated bed</a></li>";
			        	};
			        	actions = actions +	
		        			"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>";
			        };
			        if (student.trip.status == "Allocated"){
			        	actions = 
			        		"<li data-process='confirmdorms' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Confirm</a></li>" +
			        		"<li><a href='accommodation-dorms.html?mail=" + student.mail + "&typePage=accommodation-dorms&actualTrip=" + actualTrip + "'>Move/Resize</a></li>" +
			        		"<li data-process='deallocatebed' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Deallocated bed</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='createConfirmationLetter'" + dadosStudent + "><a href='#'>Create confirmation letter</a></li>" +
			        		"<li data-process='changestatustocanceled' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "Confirmed"){
			        	actions = 
			        		"<li data-process='changestatustodocumentsdorms' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Send confirmation letter</a></li>" +
			        		"<li><a href='accommodation-dorms.html?mail=" + student.mail + "&typePage=accommodation-dorms&actualTrip=" + actualTrip + "'>Move/Resize</a></li>" +
			        		"<li data-process='deallocatebed' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Deallocated bed</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "Documents"){
			        	actions = 
			        		"<li data-process='changestatustoinhousedorms' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>In House</a></li>" +
			        		"<li><a href='accommodation-dorms.html?mail=" + student.mail + "&typePage=accommodation-dorms&actualTrip=" + actualTrip + "'>Move/Resize</a></li>" +
			        		"<li data-process='deallocatebed' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Deallocated bed</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "In house"){
			        	actions = 
			        		"<li data-process='changestatustocheckoutdorms' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Change to check out</a></li>" +
			        		"<li><a href='accommodation-dorms.html?mail=" + student.mail + "&typePage=accommodation-dorms&actualTrip=" + actualTrip + "'>Move/Resize</a></li>" +
			        		"<li><a href='extend-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>Extend trip</a></li>" +
			        		"<li data-process='deallocatebed' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Deallocated bed</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>" +
			        		"<li data-process='changestatustocanceled' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Cancel</a></li>";
			        };
			        if (student.trip.status == "Checked out"){
			        	actions = 
			        		"<li data-process='sendemailtostudenttoevaluetedorms' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Send student email to evaluete</a></li>" +
			        		"<li data-process='evaluetereceiveddorms' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Evaluete received</a></li>" +
			        		"<li><a href='new-trip.html?mail=" + student.mail + "&typePage=accommodation&newTrip=true'>New trip</a></li>";
			        };
			        if (student.trip.status == "Canceled"){
			        	actions = 
			        		"<li data-process='recovercanceleddorms' data-idStudent='" + student._id + "' data-emailStudent='" + emailStudent + "'  data-idRoom='" + student.trip.idRoom + "'  data-idBed='" + student.trip.idBed + "' data-actualTrip='" + actualTrip + "'><a href='#'>Recover canceled</a></li>";
			        };
	        	};
	        };
        	//
	        // *** checa status dos pagamentos
	        //
	        var payment = checkPayment(student.invoices);
		    var paymentCollor = payment.collor;
	        var paymentText = payment.text;

        	//
	        // *** checa status do pickup
	        //
	        var pickupCollor = "success";
	        if (student.trip.pickup == "Yes"){
	        	pickupCollor = "danger";
	        };
	        var dropoffCollor = "success";
	        if (student.trip.dropoff == "Yes"){
	        	dropoffCollor = "danger";
	        }
	        var accommadation = "";
	        if (student.trip.accommodation == "Homestay"){
	        	accommodation = "<small class='text-muted text-column'>Host: </small><small class='text-bold text-column'>" + student.trip.familyName + "</small><br>";
	        };
	        if (student.trip.accommodation == "Dorms"){
	        	var dormName = "";
	        	if (student.trip.dormName){
	        		dormName = student.trip.dormName;
	        	}
	        	var unitName = "";
	        	if (student.trip.unitName){
	        		unitName = student.trip.unitName;
	        	}
	        	var roomName = "";
	        	if (student.trip.roomName){
	        		roomName = student.trip.roomName;
	        	}
	        	accommodation = "<small class='text-muted text-column'>Dorm: </small><small class='text-bold text-column'>" + dormName + "</small><br>" +
	        					"<small class='text-muted text-column'>Unit: </small><small class='text-bold text-column'>" + unitName + "</small><br>" +
	        					"<small class='text-muted text-column'>Room: </small><small class='text-bold text-column'>" + roomName + "</small><br>";
	        	
	        };
	        var notes = "";
	        if (student.notes) {
			    $.each(student.notes, function (i, note) {
			    	notes = notes + note.note + "<br>";
			    });	        	
	        };
	        var guestName = "";
	        if (student.trip.occupancy != "Single") {
	        	if (student.trip.guestName) {
	        		guestName = "<small class='text-muted text-column label-warning'><i>" + student.trip.guestName + "<i></small><br>";
	        	};
	        };
            student_table.row.add( {
    	    	"student": 
    	    			"<a href='student.html?mail=" + student.mail + "&typePage=change&actualTrip=" + actualTrip + "'>" +
    	    			"<span class='text-column'>" + student.firstName +  " " + student.lastName + "</span><br>" + guestName +
    	    			"<small class='label text-column " + genderCollor + " '>" + student.gender + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'><i>" + student.nationality + "<i></small><br>" +
    	    			"<small class='text-muted text-column'><i>" + student.trip.destination + "<i></small><br>" +
    	    			"<small class='text-muted text-column'><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + age + "<i></small><br>",
                "dates":
                		"<small class='hide'>" + separaAnoMesDia(student.trip.start) + "</small>" +
                		"<small class='text-muted text-column'>In: " + separaDataMes(student.trip.start, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>Out: " + separaDataMes(student.trip.end, "-") + "</small><br>" +
                		"<small class='text-muted text-column'>" + durationTrip + "</small><br>",
    	    	"status":"<small class='label text-column " + statusCollor + "'>" + student.trip.status + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-column label-" + paymentCollor + "'>" + paymentText + "</small><br>" +
    	    			"<small class='text-muted text-column'>Visa: " + " No " + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'>Flight: " + student.trip.arrivalFlightNumber + "</small><br>" +
    	    			"<small class='text-muted text-column'>Pickup: </small><small class='text-" + pickupCollor + " text-column '>" + student.trip.pickup + "</small>&nbsp;&nbsp;" +
    	    			"<small class='text-muted text-column'>Dropoff: </small><small class='text-" + dropoffCollor + " text-column '>" + student.trip.dropoff + "</small>&nbsp;&nbsp;",
    	    	"institution":"<small class='text-muted text-column'>School: </small><small class='text-bold text-column'>" + student.school.sigla + "</small><br>" +
    	    				"<small class='text-muted text-column'>Agent: </small><small class='text-bold text-column'>" + student.agency.agencySigla + "</small><br>",
    	    	"people":
    	    			accommodation +
    	    			"<small class='text-muted text-column'>Driver: " + "Available" + "</small><br>",
       	    	"preferences":"<small class='text-muted text-column'>" + student.trip.occupancy + "</small>&nbsp;&nbsp;" + 
    	    				"<small class='text-muted text-column'>Pvt WC: " + student.trip.privateWashroom + "</small><br>" +
    	    				"<small class='text-muted text-column'>Dogs: " + student.trip.liveDogs + "</small>&nbsp;&nbsp;" +
    	    				"<small class='text-muted text-column'>Cats: " + student.trip.liveCats + "</small><br>" +
    	    				"<small class='text-muted text-column'>Meals: " + student.trip.mealPlan + "</small><br>" +
    	    				"<small class='text-muted text-column'>Diet: " + student.trip.specialDiet + "</small>",    	    				
       	    	"comments":"<small class='text-muted text-column'>" + student.trip.comments + "</small>",
       	    	"notes":"<small class='text-muted text-column'>" + notes + "</small>",
                'actions': 
                	'<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
	    				'<ul id="listStudent" class="dropdown-menu">' +
	    					actions +
	    				'</ul>' +
	    			'</div>&nbsp;&nbsp;&nbsp;&nbsp;' + 
                	'<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Invoice <span class="caret"></span></button>' +
	    				'<ul id="listStudent" class="dropdown-menu">' +
	    					invoices +
	    				'</ul>' +
	    			'</div>' 
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
	    				rest_obterFamily($(this).attr('data-familyName'), deallocateRoom, semAcao, $(this).attr('data-emailStudent') );
	    				rest_obterStudent($(this).attr('data-emailStudent'), clearAllocation, semAcao, "Available", $(this).attr('data-actualTrip') );
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');

	    			};
	    			if ($(this).attr('data-process') == "deallocatebed") {
	    				deallocateBed($(this).attr('data-idStudent'), $(this).attr('data-actualTrip'));
	    				rest_obterStudent($(this).attr('data-emailStudent'), clearAllocation, semAcao, "Available", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "changestatustocanceled") {
	    				if ($(this).attr('data-familyName')){
	    					rest_obterFamily($(this).attr('data-familyName'), deallocateRoom, semAcao, $(this).attr('data-emailStudent') );
	    				};
	    				rest_obterStudent($(this).attr('data-emailStudent'), clearAllocation, semAcao, "Canceled", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');
	    			};
	    			if ($(this).attr('data-process') == "changestatustocanceleddorms") {
	    				deallocateBed($(this).attr('data-idStudent'), $(this).attr('data-actualTrip'));
	    				rest_obterStudent($(this).attr('data-emailStudent'), clearAllocation, semAcao, "Available", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "manualconfirm") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), manualConfirmAllocation, semAcao, $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');
	    			};
	    			if ($(this).attr('data-process') == "confirmdorms") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), manualConfirmAllocation, semAcao, $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "sendemailtofamilytoconfirm") {
	    				rest_obterFamily($(this).attr('data-familyName'), sendEmailToFamilyToConfirm, semAcao, $(this).attr('data-emailStudent') );
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Offered", $(this).attr('data-actualTrip'));
	    			};
	    			if ($(this).attr('data-process') == "sendlettertostudent") {
	    			//	rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Documents");
	    			};
	    			if ($(this).attr('data-process') == "changestatustodocuments") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Documents", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');
	    			};
	    			if ($(this).attr('data-process') == "changestatustodocumentsdorms") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Documents", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "changestatustoinhouse") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "In house", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');
	    			};
	    			if ($(this).attr('data-process') == "changestatustoinhousedorms") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "In house", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "changestatustocheckout") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Checked out", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');
	    			};
	    			if ($(this).attr('data-process') == "changestatustocheckoutdorms") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Checked out", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "changestatustoinhouse") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "In house", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');
	    			};
	    			if ($(this).attr('data-process') == "changestatustoinhousedorms") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "In house", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "recovercanceled") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Available", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');
	    			};
	    			if ($(this).attr('data-process') == "recovercanceleddorms") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Available", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "evaluetereceived") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Evaluete received", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Homestay');
	    			};
	    			if ($(this).attr('data-process') == "evaluetereceiveddorms") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), changeStatus, semAcao, "Evaluete received", $(this).attr('data-actualTrip'));
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "newtrip") {
	    				if ($(this).attr('data-familyName')){
	    					rest_obterFamily($(this).attr('data-familyName'), deallocateRoom, semAcao, $(this).attr('data-emailStudent'), $(this).attr('data-actualTrip') );
	    				};
	    				rest_obterStudent($(this).attr('data-emailStudent'), clearAllocation, semAcao, "Available", $(this).attr('data-actualTrip'));
	    			};
	    			if ($(this).attr('data-process') == "createConfirmationLetter") {
	    				rest_obterStudent($(this).attr('data-emailStudent'), obterFamily, semAcao, $(this).attr('data-familyName'));
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

function obterFamily (objStudent, familyName){
	
	rest_obterFamily(familyName, createConfirmationLetter, semAcao, objStudent );
	
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
				payment.collor = "info";
				payment.text = "new $";
	        };	    		
		});
	};	
	return payment;
};

function deallocateRoom (objFamily, emailStudent) {

    $.each(objFamily.documento.rooms, function (i, room) {
    	var excluded = false;
    	if (room.occupancySingleBed){
	        $.each(room.occupancySingleBed, function (w, occupancy) {
	        	if (!excluded){
	        		if (occupancy.emailStudent == emailStudent){
	        			objFamily.documento.rooms[i].occupancySingleBed.splice(w, 1);
	        			excluded = true;
	        		};
	        	};
	        });
    	};
    	if (room.occupancyCoupleBed){
	        $.each(room.occupancyCoupleBed, function (w, occupancy) {
	        	if (!excluded){
		        	if (occupancy.emailStudent == emailStudent){
		        		objFamily.documento.rooms[i].occupancyCoupleBed.splice(w, 1);
		        		excluded = true;
		        	};
	        	};
	        });            	4
    	};
    });

	rest_atualizaFamily(objFamily, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms deallocate", "Problems to update rooms, try again");
	
};

function deallocateBed (idStudent, actualTrip) {

	rest_deallocateBed(idStudent, actualTrip, obterStudent, atualizacaoNaoEfetuada, "Bed deallocate", "Problems to update bed, try again", idStudent, actualTrip, clearAllocation, "Available");
	
};


function obterStudent (idStudent, actualTrip, nextFunction, var1, var2, var3, var4) {

	rest_obterStudent(null, nextFunction, atualizacaoNaoEfetuada, "Student status upate", "Problem to update student", var1, var2, actualTrip, idStudent, var3, var4);
	
};

function clearAllocation (objStudent, status, actualTrip) {

	if (actualTrip){
		objStudent.documento.trips[actualTrip].familyName = "";
		objStudent.documento.trips[actualTrip].idFamily = "";
		objStudent.documento.trips[actualTrip].idRoom = "";
		objStudent.documento.trips[actualTrip].idBed = "";
		objStudent.documento.trips[actualTrip].dormName = "";
		objStudent.documento.trips[actualTrip].unitName = "";
		objStudent.documento.trips[actualTrip].roomName = "";
		objStudent.documento.trips[actualTrip].bedName = "";
		objStudent.documento.trips[actualTrip].status = status;
		delete objStudent.contact;
		delete objStudent.rooms;
		delete objStudent.family;
		rest_atualizaStudent(objStudent, atualizaPayment, atualizacaoNaoEfetuada, "Allocation cleared", "Problems to update student, try again", objStudent._id, actualTrip);
	};	

};


function atualizaPayment(idStudent, actualTrip){
	
	rest_criaPayment(idStudent, actualTrip, atualizacaoEfetuada, semAcao, "Allocation cleared", "Problems to update rooms, try again")		

};

function changeStatus (objStudent, status, actualTrip) {

	if (actualTrip){
		objStudent.documento.trips[actualTrip].status = status;
		delete objStudent.contact;
		delete objStudent.rooms;
		delete objStudent.family;
		rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Status changed", "Problems to update student, try again");
	};
	
};

function manualConfirmAllocation (objStudent, actualTrip) {
	
	if (actualTrip){
		objStudent.documento.trips[actualTrip].status = "Confirmed";
		delete objStudent.contact;
		delete objStudent.rooms;
		delete objStudent.family;
		rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Status changed to confirm", "Problems to update student, try again");
	};
		
};

function sendEmailToFamilyToConfirm (objFamily, emailStudent) {

	//
	//  ** send email to offer a family
	//
	rest_sendEmailHtml(localStorage.hostNameEmail, localStorage.userNameEmail , localStorage.passwordEmail, "grenneglr@gmail.com", objFamily.documento.contact.email, "Offer accommodation", templateOffertoFamily(), emailEnviado, emailComProblemas );
	
};
	
function createConfirmationLetter(objFamily, objStudent){

	/**
	 * 
	 */
	var actualTrip = objStudent.documento.actualTrip;
	var splitRegex = /\r\n|\r|\n/g;
	jsPDF.API.textEx = function (text, x, y, hAlign, vAlign) {
	    var fontSize = this.internal.getFontSize() / this.internal.scaleFactor;

	    // As defined in jsPDF source code
	    var lineHeightProportion = 1.15;

	    var splittedText = null;
	    var lineCount = 1;
	    if (vAlign === 'middle' || vAlign === 'bottom' || hAlign === 'center' || hAlign === 'right') {
	        splittedText = typeof text === 'string' ? text.split(splitRegex) : text;

	        lineCount = splittedText.length || 1;
	    }

	    // Align the top
	    y += fontSize * (2 - lineHeightProportion);

	    if (vAlign === 'middle')
	        y -= (lineCount / 2) * fontSize;
	    else if (vAlign === 'bottom')
	        y -= lineCount * fontSize;

	    if (hAlign === 'center' || hAlign === 'right') {
	        var alignSize = fontSize;
	        if (hAlign === 'center')
	            alignSize *= 0.5;

	        if (lineCount > 1) {
	            for (var iLine = 0; iLine < splittedText.length; iLine++) {
	                this.text(splittedText[iLine], x - this.getStringUnitWidth(splittedText[iLine]) * alignSize, y);
	                y += fontSize;
	            }
	            return this;
	        }
	        x -= this.getStringUnitWidth(text) * alignSize;
	    }

	    this.text(text, x, y);
	    return this;
	};
	
	var doc = new jsPDF('p','mm','a4')
	var specialElementHandlers = {
	    '#editor': function (element, renderer) {
	        return true;
	    }
	};

	var img = new Image();
	img.addEventListener('load', function() {
	    doc.addImage(img, 'png', 170, 5, 20, 20);
	});
	img.src = 'img/logo/casatoronto.png';		

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(12);
	doc.setTextColor(0, 51, 102);
	doc.text(65, 30, 'Confirmation Letter');

	var hoje = new Date();
	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.textEx(hoje.getDate() + "-" + converteMesAlfa(hoje.getMonth()) + "-" + hoje.getFullYear(), 190, 30, 'right', 'middle');
	
	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(12);
	doc.setTextColor(0, 51, 102);
	doc.text(15, 40, 'Agency');

	doc.setLineWidth(0.5);
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 42, 90, 42);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 47, objStudent.documento.trips[actualTrip].agencyName);
	
	
	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(12);
	doc.setTextColor(0, 51, 102);
	doc.text(100, 40, 'School');

	doc.setLineWidth(0.5);
	doc.setDrawColor(238, 111, 26);
	doc.line(100, 42, 190, 42);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(100, 47, objStudent.documento.trips[actualTrip].schoolName);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(12);
	doc.setTextColor(0, 51, 102);
	doc.text(15, 55, 'Student');

	doc.setLineWidth(0.5);
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 57, 190, 57);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 62, objStudent.documento.firstName + " " + objStudent.documento.lastName);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 70, "Arrival date: " + separaDataMes(objStudent.documento.trips[actualTrip].start, "-"));

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(100, 70, "Departure date: " + separaDataMes(objStudent.documento.trips[actualTrip].end, "-"));

	var date = "";
	if (objStudent.documento.trips[actualTrip].arrivalDate){
		date = separaDataMes(objStudent.documento.trips[actualTrip].arrivalDate, "-")
	};
	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 75, "Airport pickup: " + date);

	date = "";
	if (objStudent.documento.trips[actualTrip].departureDate){
		date = separaDataMes(objStudent.documento.trips[actualTrip].departureDate, "-")
	};
	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(100, 75, "Airport drop off: " + date);

    var mealPlan ="";
    var comma = "";
    $.each(objStudent.documento.trips[actualTrip].mealPlan, function (i, meals) {
    	mealPlan = mealPlan + comma + meals;
    	comma = ", ";
    });

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 80, "Meal plan: " + mealPlan);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(12);
	doc.setTextColor(0, 51, 102);
	doc.text(15, 87, 'Family');

	doc.setLineWidth(0.5);
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 89, 190, 89);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 94, "Name: " + objStudent.documento.trips[actualTrip].familyName);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 102, "Contact: " + objFamily.documento.contact.firstName + " " + objFamily.documento.contact.lastName);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 107, "Address: " + objFamily.documento.address.street);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 112, "Phone: " + objFamily.documento.contact.phoneNumber);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 117, "Mobile: " + objFamily.documento.contact.mobilePhoneNumber);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 122, "Email: " + objFamily.documento.contact.email);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 127, "Main Intersection: " + objFamily.documento.address.mainIntersection);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 132, "Nearest Subway Station: " + objFamily.documento.address.nearestSubwayStation);

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 137, "Walkin/Bus Time: " + objFamily.documento.address.timeSubwayStation);

	var pets = "";
	if (objFamily.documento.haveDogs == "yes"){
		pets = "dogs";
	};
	if (objFamily.documento.haveCats == "yes"){
		if (pets == ""){
			pet = "cats"
		}else{
			pets = "dogs and cats";
		};
	};
	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 142, "Pets: " + pets);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(12);
	doc.setTextColor(0, 51, 102);
	doc.text(15, 149, 'Family members living in the house');

	doc.setLineWidth(0.5);
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 152, 190, 152);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(11);
	doc.setTextColor(0, 51, 102);
	doc.text(15, 157, 'Name');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(11);
	doc.setTextColor(0, 51, 102);
	doc.text(65, 157, 'Relationship');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(11);
	doc.setTextColor(0, 51, 102);
	doc.text(110, 157, 'Date of birth');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(11);
	doc.setTextColor(0, 51, 102);
	doc.text(150, 157, 'Occupation');

	doc.setLineWidth(0.5);
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 160, 190, 160);

	var hight = 165;
    $.each(objFamily.documento.familyMembers
		    , function (i, value) {

    	doc.setFont("helvetica");
    	doc.setFontType("normal");
    	doc.setFontSize(10);
    	doc.setTextColor(0, 51, 102);
    	doc.text(15, hight, value.name);

    	doc.setFont("helvetica");
    	doc.setFontType("normal");
    	doc.setFontSize(10);
    	doc.setTextColor(0, 51, 102);
    	doc.text(65, hight, value.relationship);

    	doc.setFont("helvetica");
    	doc.setFontType("normal");
    	doc.setFontSize(10);
    	doc.setTextColor(0, 51, 102);
    	doc.text(110, hight, value.birthDate);

    	doc.setFont("helvetica");
    	doc.setFontType("normal");
    	doc.setFontSize(10);
    	doc.setTextColor(0, 51, 102);
    	doc.text(150, hight, value.ocuppation);
    	
		hight = hight + 7;

    });
	
	var imgPhoto01 = new Image();
	imgPhoto01.addEventListener('load', function() {
	    doc.addImage(imgPhoto01, 'png', 15, hight, 40, 40);
	});
	imgPhoto01.src = "http://" + localStorage.urlServidor + ":8080/casamundo/rest/upload/images?image=" + objFamily.documento.fotos.photo01;		
	
	
	var imgPhoto02 = new Image();
	imgPhoto02.addEventListener('load', function() {
	    doc.addImage(imgPhoto02, 'png', 65, hight, 40, 40);
	});
	imgPhoto02.src = "http://" + localStorage.urlServidor + ":8080/casamundo/rest/upload/images?image=" + objFamily.documento.fotos.photo02;		
	
	
	var imgPhoto03 = new Image();
	imgPhoto03.addEventListener('load', function() {
	    doc.addImage(imgPhoto03, 'png', 115, hight, 40, 40);
	});
	imgPhoto03.src = "http://" + localStorage.urlServidor + ":8080/casamundo/rest/upload/images?image=" + objFamily.documento.fotos.photo03;		
	
	
	var imgPhoto04 = new Image();
	imgPhoto04.addEventListener('load', function() {
	    doc.addImage(imgPhoto04, 'png', 165, hight, 40, 40);
	});
	imgPhoto04.src = "http://" + localStorage.urlServidor + ":8080/casamundo/rest/upload/images?image=" + objFamily.documento.fotos.photo04;		

	doc.setLineWidth(1.0);
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 280, 190, 280);

	doc.fromHTML($('#conformation_letter-pdf').html(), 5, 5, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    
    setTimeout(function(){ doc.save("confirmatioLetter_" + objStudent.documento.mail + '.pdf') }, 3000);
	
};