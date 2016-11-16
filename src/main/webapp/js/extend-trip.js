	// ** setar menu
	$("#menuStudents_li").addClass("active");
	// 
	//**    carrega dados url
	//
	// 
	//**    carrega dados url
	//
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
	var parameter = parametrosDaUrl.split("&");
	var typePage = "";
	localStorage.newTrip = "false";
	var newTrip = "";
	var actualTripParam = "";
	if (parameter[1]) {
		if (parameter[1].split("=")[0] == "typePage"){
			var typePage = parameter[1].split("=")[1];
		}else{
			if (parameter[1].split("=")[0] == "actualTrip"){
				actualTripParam = parameter[1].split("=")[1];
			};
		};
	};
	if (parameter[2]) {
		if (parameter[2].split("=")[0] == "newTrip"){
			newTrip = parameter[2].split("=")[1];
			localStorage.newTrip = newTrip;
		};
	};

	
	/**
	 * 		carrega student
	 */
	if (mailUrl) {
		actualTrip = parameter[2].split("=")[1];
		rest_obterStudent(mailUrl, carregaDadosTela, obtencaoNaoEfetuada);
	};
	
	/**
	*          valida formulário   
	*/
		
	    // Método de validação  - Adiciona método JQuery Validation
	    $.validator.addMethod("regex", function(value, element, regexp) {
	        var re = new RegExp(regexp);
	        return this.optional(element) || re.test(value);
	    }, "");

		var $studentForm = $("#student-form").validate({
			// Rules for form validation
			rules : {
				destination : {
					required : true,
				},
				start : {
					required : true,
					regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
				},
				end : {
					required : true,
					regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
				},
				arrivalDate : {
					regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
				},
				departureDate : {
					regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
				},
				arrivalFlightNumber : {
					minlength : 2,
					maxlength : 4
				},
				departureFlightNumber : {
					minlength : 2,
					maxlength : 4
				},
				guestName : {
					required : true,
				},
				guestEmail : {
					required : true,
					email : true
				},
				agencyName : {
					required : true,
				},
				schoolName : {
					required : true,
				}
			},

			// Messages for form validation
			messages : {
				destination : {
					required : 'Please enter destination'
				},
				start : {
					required : 'Please enter trip start'
				},
				end : {
					required : 'Please enter trip end'
				},
				arrivalFlightNumber : {
					minlength : 'Minimum 2 caracters',
					maxlength : 'Maximum 4 caracters'
				},
				departureFlightNumber : {
					minlength : 'Minimum 2 caracters',
					maxlength : 'Maximum 4 caracters'
				},
				guestName : {
					required : 'Please enter guest name'
				},
				guestEmail : {
					required : 'Please enter email guest',
					email : 'Please enter a VALID email address'
				},
				agencyName : {
					required : 'Please enter agency name'
				},
				schoolName : {
					required : 'Please enter school name'
				}
			},
			// form submition
			submitHandler : function(form) {
				var newTripJson = montaJsonNewTrip();
				var objStudent = JSON.parse(localStorage.getItem("student"));
				newTripJson.trip = objStudent.documento.trips[objStudent.documento.actualTrip];
				$.each(form
				    , function (i, field) {
						var value = field.value;
						if (field.type == "radio" || field.type == "checkbox") {
							if (field.checked){
								value = "Yes"
							}else{
								value = "No"
							}
						};
						if (field.type == "select-multiple") {
							value = "";
							var first = true;
						    $.each(field.children, function (i, optionValue) {
						    	if (optionValue.selected){
						    		if (first){
						    			value = optionValue.label;
						    			first = false;
						    		}else{
						    			value = value + "," + optionValue.label;
						    		};
						    	};		    			
						    });
						};
						var value = field.value;
						var validField = field.name.split("_");
						if (validField.length == 1){
							newTripJson.trip[field.name] = limpaData(value);
						};
				});
				newTripJson.idStudent = objStudent._id;
				var roomNumber = searchRoomNumber (objStudent.rooms, objStudent.documento.mail);
				if (roomNumber){
					rest_incluiNewTrip(newTripJson, retornaListaStudent, atualizacaoNaoEfetuada);
					if (!$("#changeFamily").is(':checked') && roomNumber){
						var actualTripUpdate = objStudent.documento.trips.length
						var objJson = {
				    			familyName : objStudent.documento.trips[objStudent.documento.actualTrip].familyName,
				    			idFamily : objStudent.documento.trips[objStudent.documento.actualTrip].idFamily,
				    			emailStudent : objStudent.documento.mail,
				    			idStudent : objStudent._id,
				    			actualTrip : actualTripUpdate,
				    			start : newTripJson.trip.start,
				    			end : newTripJson.trip.end,
				    			occupancy : objStudent.documento.trips[objStudent.documento.actualTrip].occupancy,
				    			roomNumber : roomNumber
						};
						rest_obterFamily(objStudent.documento.trips[objStudent.documento.actualTrip].familyName, updateRooms, semAcao, objJson);
					};
				}else{
					noRoomAllocate();
				};
			},	
			// Do not change code below
			errorPlacement : function(error, element) {
				error.insertAfter(element.parent());
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>There is a error</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
			}
		});
		
		$('#start').datepicker({
			dateFormat : 'dd-M-yy',
			prevText : '<i class="fa fa-chevron-left"></i>',
			nextText : '<i class="fa fa-chevron-right"></i>',
			onSelect : function(selectedDate) {
				$('#end').datepicker('option', 'minDate', selectedDate);
				}
		});
		$('#end').datepicker({
			dateFormat : 'dd-M-yy',
			prevText : '<i class="fa fa-chevron-left"></i>',
			nextText : '<i class="fa fa-chevron-right"></i>',
			onSelect : function(selectedDate) {
				}
		});
		$('#status').val("Confirmed");
		$('#changeFamily').change(function() {
			if ($(this).is(':checked')){
				$('#status').val("Available");
			}else{
				$('#status').val("Confirmed");
			};
		});

function montaJsonNewTrip(){
	
	var trip =
		{trip :
			{ 
	    		status:"", 
	    		destination:"", 
	    		familyName:"", 
	    		idFamily:"",
	    		idRoom:"",
	    		idBed:"",
	    		dormName:"",
	    		unitName:"",
	    		roomName:"",
	    		bedName:"",
	    		start:"", 
	    		end:"", 
	    		extend:"", 
	    		arrivalDate:"", 
	    		arrivalTime:"", 
	    		arrivalFlightNumber:"", 
	    		arrivalAirline:"", 
	    		departureDate:"", 
	    		departureTime:"", 
	    		departureFlightNumber:"", 
	    		departureAirline:"", 
	    		pickup:"", 
	    		dropoff:"", 
	    		accommodation:"", 
	    		occupancy:"", 
	    		guestName:"", 
	    		guestEmail:"", 
	    		relationship:"", 
	    		mealPlan:[], 
	    		specialDiet:[], 
	    		privateWashroom:"", 
	    		smoke:"", 
	    		liveDogs:"", 
	    		liveCats:"", 
	    		liveWithChildren:"", 
	    		hobbies:"", 
	    		comments:"", 
	    		medical:"", 
	    		agreeTerm:"", 
	    		usuallyStudy:[], 
	    		keepBedroom:[], 
	    		iAmUsually:[], 
	    		creditCardType:"", 
	    		creditCardNumber:"", 
	    		creditCardExpire:"", 
	    		creditCardCVC:"", 
	    		agreeDebit:"", 
	    		apartamentType:"", 
	    		petsQuantity:"", 
	    		petType:"", 
	    		parking:"", 
	    		wifi:"", 
	    		peopleQuantity:"", 
	    		guest_01:"", 
	    		guest_02:"", 
	    		guest_03:"", 
	    		guest_04:"", 
	    		guest_05:"", 
	    		agreeDebitSuite:"", 
	    		agreeSuite:"",
	    		agencyId:"",
	    		agencyName:"", 
	    		agencyConsultName:"",
	    		schoolId:"",
	    		schoolName:"", 
	    		schoolConsultName:""
			}
	    }; 
	
	return trip;
};

function carregaDadosTela(data, actualTrip){
	
	localStorage.setItem("student", JSON.stringify(data));
    
	if (!actualTrip){
		var actualTrip = data.documento.actualTrip;
	};
	$('#actualTrip').val(actualTrip);
	
	$("#studentCompleteName").html(data.documento.firstName + " " + data.documento.lastName);
	$("#celPhone").html(data.documento.celPhone);
    $('#phone').html(data.documento.phone);
    $('#mail').html(data.documento.mail);
    $('#lastName').html(data.documento.lastName);
    $('#firstName').html(data.documento.firstName);
    $("#birthDay").html(separaDataMes(data.documento.birthDay, "-"));
    $("#age").html(calculaIdade(separaConverteDataMes(data.documento.birthDay, "/")));
    $('#status').val(data.documento.trips[actualTrip].status);
    $('#destination').val(data.documento.trips[actualTrip].destination);
    $('#contactFamilyName').html(data.documento.trips[actualTrip].contactFamilyName);
 
    var daysTotal = calculaDias(separaConverteDataMes(data.documento.trips[actualTrip].start, "/"), separaConverteDataMes(data.documento.trips[actualTrip].end, "/"));
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

	var mealPlanLiteral = "";
	var literal = "";
    $.each(data.documento.trips[actualTrip].mealPlan, function (i, mealPlan) {
    	mealPlanLiteral = mealPlanLiteral + literal + mealPlan;
    	literal = ", ";
    });

    $('#contactName').html(data.documento.trips[actualTrip].contactName);
    $('#contactGender').html(data.documento.trips[actualTrip].contactGender);
    $('#contactEmail').html(data.documento.trips[actualTrip].contactEmail);
    $('#contactPhone').html(data.documento.trips[actualTrip].contactPhone);
    $('#contactMobilePhone').html(data.documento.trips[actualTrip].contactMobilePhone);

	$("#familyName").val(data.documento.trips[actualTrip].familyName);
	$("#agencyName").val(data.documento.trips[actualTrip].agencyName);
	$("#accommodation").val(data.documento.trips[actualTrip].accommodation);
    $("#start").val(separaDataMes(data.documento.trips[actualTrip].end, "-"));
	$('#start').attr("disabled", true);
	$("#end").val("");
	$('#start').datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		minDate : converteToDate(data.documento.trips[actualTrip].end),
		onSelect : function(selectedDate) {
			$('#end').datepicker('option', 'minDate', selectedDate)
			}
	});		
	$('#end').datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		minDate : converteToDate(data.documento.trips[actualTrip].end)
	});		
    $("#duration").val(durationTrip);
    $("#arrivalDate").val(separaDataMes(data.documento.trips[actualTrip].arrivalDate, "-"));
    $("#arrivalTime").val(separaHora(data.documento.trips[actualTrip].arrivalTime, ":"));
    $('#arrivalFlightNumber').val(data.documento.trips[actualTrip].arrivalFlightNumber);
    $('#arrivalAirline').val(data.documento.trips[actualTrip].arrivalAirline);
    $("#departureDate").val(separaDataMes(data.documento.trips[actualTrip].departureDate, "-"));
    $("#departureTime").val(separaHora(data.documento.trips[actualTrip].departureTime, ":"));
    $('#departureFlightNumber').val(data.documento.trips[actualTrip].departureFlightNumber);
    $('#departureAirline').val(data.documento.trips[actualTrip].departureAirline);
    $('#extend').val(data.documento.trips[actualTrip].extend);
    $('#pickup').val(data.documento.trips[actualTrip].pickup);
    $('#dropoff').val(data.documento.trips[actualTrip].dropoff);
    $('#occupancy').val(data.documento.trips[actualTrip].occupancy);
    $('#mealPlan').val(mealPlanLiteral);
    $('#privateWashroom').val(data.documento.trips[actualTrip].privateWashroom);
    if (data.documento.trips[actualTrip].accommodation == "Homestay"){
		$(".homestay").removeClass("hide");
	}else{
		if (data.documento.trips[actualTrip].accommodation == "Dorms"){
    		$(".dorms").removeClass("hide");
    	}else{
        	if (data.documento.trips[actualTrip].accommodation == "Suite"){
        		$(".suite").removeClass("hide");
        	}
    	}
	};
    
	if (data.documento.trips[actualTrip].agencyName){
		rest_obterAgency (data.documento.trips[actualTrip].agencyName, carregaDadosAgency, semAcao, true, data.documento.trips[actualTrip].agencyConsultName);
	};
	
};

function carregaDadosAgency(data, consult, consultName) {
	localStorage.setItem("agency", JSON.stringify(data));
	$("#agencyName").html(data.documento.name);
	$("#agencyName").val(data.documento.name);
    $.each(data.documento.consultants, function (i, consultants) {
    	if (consultants.name == consultName){
    		$("#agencyConsultMobile").html(consultants.celPhone);
    		$("#agencyConsultPhone").html(consultants.phone);
    		$("#agencyConsultEmail").html(consultants.email);
    		$("#agencyConsultName").html(consultants.name);
    		$("#agencyConsultName").val(consultants.name);
    	};
    	if (!consult){
    		$("#agencyConsultName").append( $(option(consultants.name)));
    	};
    });
	$("#agencyPhone").html(data.documento.agencyPhone);
	$("#agencyEmail").html(data.documento.agencyEmail);
	$(".agency").removeClass("hide");
};
function retornaListaStudent(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Student included</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	window.location="students.html"; 
};
function noRoomAllocate(){
	$.smallBox({
		title : "Error",
		content : "<i class='fa fa-clock-o'></i> <i>Sorry! there is no room allocate for this student in this family to extend the trip.</i>",
		color : "#ff8080",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 10000
	});
	window.location="students.html"; 
};


function updateRooms (objFamily, objRoom) {
	var occupancy = 
		{
		emailStudent : objRoom.emailStudent,
		idStudent : objRoom.idStudent,
		actualTrip : objRoom.actualTrip,
        startOccupancy : objRoom.start ,
        endOccupancy : objRoom.end
		};
	if (objRoom.occupancy == "Single"){
		if (objFamily.documento.rooms[objRoom.roomNumber].occupancySingleBed){
			objFamily.documento.rooms[objRoom.roomNumber].occupancySingleBed.push(occupancy);
		};
	};
	if (objRoom.occupancy == "Couple"){
		if (objFamily.documento.rooms[objRoom.roomNumber].occupancyCoupleBed){			
			objFamily.documento.rooms[objRoom.roomNumber].occupancyCoupleBed.push(occupancy);
		};
	};
	rest_atualizaFamily(objFamily, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms update", "Problems to update rooms, try again");
	
};
function searchRoomNumber (rooms, emailStudent) {

	var roomNumber = null;
    $.each(rooms, function (i, room) {
        $.each(room.occupancySingleBed, function (w, occupancy) {
    		if (occupancy.emailStudent == emailStudent){
    			roomNumber = room.number;
    		};
        });            	
        $.each(room.occupancyCoupleBed, function (w, occupancy) {
        	if (occupancy.emailStudent == emailStudent){
        		roomNumber = room.number;
        	};
        });            	
    });

	return roomNumber;
	
};
