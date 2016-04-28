

function carregaTelaFamily(data, tipo) {
	
	if (tipo == "consulta"){
	//
	// **** carrega tela consulta
	//
		$("#familyName").html(data.documento.familyName);
		$("#type").html(data.documento.type);	
		$("#numbersBedroom").html(data.documento.numbersBedroom);
		$("#numbersStudentsBedroom").html(data.documento.numbersStudentsBedroom);
		$("#offerPrivateWashroom").html(data.documento.offerPrivateWashroom);
		$("#numberPrivateWashroom").html(data.documento.numberPrivateWashroom);
		$("#offerInternet").html(data.documento.offerInternet);
		$("#havePets").html(data.documento.havePets);
		$("#firstLanguage").html(data.documento.firstLanguage);
	
		var separador = "";
		$.each(data.documento.othersLanguage
			    , function (i, value) {
			$("#othersLanguage").html($("#othersLanguage").html() + separador + value);
			separador = ", ";
	    });
		$("#acceptSmokeStudent").html(data.documento.acceptSmokeStudent);
		$("#preferAgeStudent").html(data.documento.preferAgeStudent);
		$("#preferGenderStudent").html(data.documento.preferGenderStudent);
		$("#mealPlan").html(data.documento.mealPlan);
		$("#hostVegetarianStudent").html(data.documento.hostVegetarianStudent);
		$("#hostAnyNationalityStudent").html(data.documento.hostAnyNationalityStudent);
		$("#acceptSmokeInsideHome").html(data.documento.acceptSmokeInsideHome);
	  	$("#contact_name").html(data.documento.contact.firstName + " " + data.documento.contact.lastName);
	  	$("#contact_gender").html(data.documento.contact.gender);
	  	$("#contact_birthDate").html(separaData(data.documento.contact.birthDate, "/"));
	  	$("#contact_age").html(calculaIdade(separaData(data.documento.contact.birthDate, "/")));
	  	$("#contact_ocuppation").html(data.documento.contact.ocuppation);
	  	$("#contact_employer").html(data.documento.contact.employer);
	  	$("#contact_email").html(data.documento.contact.email);
	  	$("#contact_phoneNumber").html(data.documento.contact.phoneNumber);
	  	$("#contact_mobilePhoneNumber").html(data.documento.contact.mobilePhoneNumber);
	  	$("#contact_workPhoneNumber").html(data.documento.contact.workPhoneNumber);
	  	$("#address_street").html(data.documento.address.street);
	  	$("#address_number").html(data.documento.address.number);
	  	$("#address_city").html(data.documento.address.city);
	  	$("#address_state").html(data.documento.address.state);
	  	$("#address_postalCode").html(data.documento.address.postalCode);
	  	$("#address_mainIntersection").html(data.documento.address.mainIntersection);
	  	$("#address_nearestSubwayStation").html(data.documento.address.nearestSubwayStation);
	  	$("#address_walkingTimeSubwayStation").html(data.documento.address.walkingTimeSubwayStation);
	  	$("#address_nearestBusStop").html(data.documento.address.nearestBusStop);
	  	$("#address_walkingTimeBusStation").html(data.documento.address.walkingTimeBusStation);
	  	
	    $.each(data.documento.familyMembers
			    , function (i, value) {
	    	var mobile = ""; 
	    	if (value.mobilePhone) {
	    		'<span class="txt-color-darken"><small class="text-muted" id="familyMobilePhone' + i + '" data-original-title="Name"> - Mobile Phone: ' + value.mobilePhone + '</small></span>'
	    	}
	    	var familyMemberLine = '<li>' +
										'<p class="text-muted">' +
											'<i class="fa fa-user"></i>&nbsp;&nbsp;' +
												'<span class="txt-color-darken"><small class="text-danger" id="familyName' + i + '" data-original-title="Name">' + value.name + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyGender' + i + '" data-original-title="Name"> - Gender: ' + value.gender + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyBirthDate' + i + '" data-original-title="Name"> - Birhdate: ' + separaData(value.birthDate, "/") + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyAge' + i + '" data-original-title="Name"> - Age: ' + calculaIdade(separaData(value.birthDate, "/")) + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyRelationship' + i + '" data-original-title="Name"> - Relationship: ' + value.relationship + '</small></span>' +
												mobile +
										'</p>' +
									'</li>'
	    	$("#familyMembersList").append(familyMemberLine);
	    });
	};	

	if (tipo == "alteracao"){
		//
		// **** carrega tela alteração
		//
		$("#familyName").val(data.documento.familyName);
		$("#type").val(data.documento.type);	
		$("#numbersBedroom").val(data.documento.numbersBedroom);
		$("#numbersStudentsBedroom").val(data.documento.numbersStudentsBedroom);
		$("#offerPrivateWashroom").val(data.documento.offerPrivateWashroom);
		$("#numberPrivateWashroom").val(data.documento.numberPrivateWashroom);
		$("#offerInternet").val(data.documento.offerInternet);
		$("#havePets").val(data.documento.havePets);
		$("#firstLanguage").val(data.documento.firstLanguage);
		$("#othersLanguage").val(data.documento.othersLanguage);
		$("#acceptSmokeStudent").val(data.documento.acceptSmokeStudent);
		$("#preferAgeStudent").val(data.documento.preferAgeStudent);
		$("#preferGenderStudent").val(data.documento.preferGenderStudent);
		$("#mealPlan").val(data.documento.mealPlan);
		$("#hostVegetarianStudent").val(data.documento.hostVegetarianStudent);
		$("#hostAnyNationalityStudent").val(data.documento.hostAnyNationalityStudent);
		$("#acceptSmokeInsideHome").val(data.documento.acceptSmokeInsideHome);
	  	$("#contact_firstName").val(data.documento.contact.firstName);
	  	$("#contact_lastName").val(data.documento.contact.lastName)
	  	$("#contact_gender").val(data.documento.contact.gender);
	  	$("#contact_birthDate").val(separaData(data.documento.contact.birthDate, "/"));
	  	$("#contact_age").val(calculaIdade(separaData(data.documento.contact.birthDate, "/")));
	  	$("#contact_ocuppation").val(data.documento.contact.ocuppation);
	  	$("#contact_employer").val(data.documento.contact.employer);
	  	$("#contact_email").val(data.documento.contact.email);
	  	$("#contact_phoneNumber").val(data.documento.contact.phoneNumber);
	  	$("#contact_mobilePhoneNumber").val(data.documento.contact.mobilePhoneNumber);
	  	$("#contact_workPhoneNumber").val(data.documento.contact.workPhoneNumber);
	  	$("#address_street").val(data.documento.address.street);
	  	$("#address_number").val(data.documento.address.number);
	  	$("#address_city").val(data.documento.address.city);
	  	$("#address_state").val(data.documento.address.state);
	  	$("#address_postalCode").val(data.documento.address.postalCode);
	  	$("#address_mainIntersection").val(data.documento.address.mainIntersection);
	  	$("#address_nearestSubwayStation").val(data.documento.address.nearestSubwayStation);
	  	$("#address_walkingTimeSubwayStation").val(data.documento.address.walkingTimeSubwayStation);
	  	$("#address_nearestBusStop").val(data.documento.address.nearestBusStop);
	  	$("#address_walkingTimeBusStation").val(data.documento.address.walkingTimeBusStation);
	};
	
    localStorage.setItem("family", JSON.stringify(data));
};    

function limpaStorageFamily () {
	
	var data  = JSON.parse(
			'{' +
				'"documento" : ' + 
				  '{' +
				    '"familyName" : "",' +
				    '"type" : "",' +
				    '"numbersBedroom" : "",' +
				    '"numbersStudentsBedroom" : "",' +
				    '"offerPrivateWashroom" : "",' +
				    '"numberPrivateWashroom" : "",' +
				    '"offerInternet" : "",' +
				    '"havePets" : "",' +
				    '"firstLanguage" : "",' +
				    '"othersLanguage" : [],' +
				    '"acceptSmokeStudent" : "",' +
				    '"preferAgeStudent" : "",' +
				    '"preferGenderStudent" : "",' +
				    '"mealPlan" : "",' +
				    '"hostVegetarianStudent" : "",' +
				    '"hostAnyNationalityStudent" : "",' +
				    '"acceptSmokeInsideHome" : "",' +
				    '"contact" : {' +
				      '"firstName" : "",' +
				      '"lastName" : "",' +
				      '"gender" : "",' +
				      '"ocuppation" : "",' +
				      '"employer" : "",' +
				      '"email" : "",' +
				      '"phoneNumber" : "",' +
				      '"mobilePhoneNumber" : "",' +
				      '"workPhoneNumber" : "",' +
				      '"birthDate" : ""' +
				    '},' +
				    '"address" : {' +
				      '"street" : "",' +
				      '"number" : "",' +
				      '"city" : "",' +
				      '"state" : "",' +
				      '"postalCode" : "",' +
				      '"mainIntersection" : "",' +
				      '"nearestSubwayStation" : "",' +
				      '"walkingTimeSubwayStation" : "",' +
				      '"nearestBusStop" : "",' +
				      '"walkingTimeBusStation" : ""' +
				    '},' +
				    '"familyMembers" : [{' +
				        '"name" : "",' +
				        '"gender" : "",' +
				        '"relatioship" : "",' +
				        '"birthDate" : "",' +
				        '"mobilePhone" : ""' +
				      '}]' +
				  '}' +
			'}'
	);

	localStorage.setItem("student", JSON.stringify(data));
};		
function carregaInclusao(data) { 	   	
	localStorage.familyExistente = "false";
};    

function setValueFamily (field, value) {
	
	var objJson = JSON.parse(localStorage.getItem("family"));
	
	if (field == "celPhone"){
        objJson.documento.celPhone = limpaData(value);
	};
	if (field == "phone"){
        objJson.documento.phone = limpaData(value);
	};
	if (field == "mail"){
        objJson.documento.mail = value;
	};
	if (field == "lastName"){
        objJson.documento.lastName = value;
	};
	if (field == "firstName"){
        objJson.documento.firstName = value;
	};
	if (field == "birthDay"){
        objJson.documento.birthDay = limpaData(value);
	};
	if (field == "gender"){
        objJson.documento.gender = value;
	};
	if (field == "nationality"){
        objJson.documento.nationality = value;
	};
	if (field == "firstLanguage"){
        objJson.documento.firstLanguage = value;
	};
	if (field == "profession"){
        objJson.documento.profession = value;
	};
	if (field == "englishLevel"){
        objJson.documento.englishLevel = value;
	};
	if (field == "streetNumber"){
        objJson.documento.streetNumber = value;
	};
	if (field == "streetName"){
        objJson.documento.streetName = value;
	};
	if (field == "state"){
        objJson.documento.state = value;
	};
	if (field == "postalCode"){
        objJson.documento.postalCode = value;
	};
	if (field == "city"){
        objJson.documento.city = value;
	};
	if (field == "country"){
        objJson.documento.country = value;
	};
	if (field == "secondaryTelephone"){
        objJson.documento.secondaryTelephone = limpaData(value);
	};
	if (field == "emergencyContactName"){
        objJson.documento.emergencyContactName = value;
	};
	if (field == "emergencyContactPhone"){
        objJson.documento.emergencyContactPhone = limpaData(value);
	};
	if (field == "emergencyContactMail"){
        objJson.documento.emergencyContactMail = value;
	};
	if (field == "status"){
        objJson.documento.trips[actualTrip].status = value;
	};
	if (field == "destination"){
        objJson.documento.trips[actualTrip].destination = value;
	};
	if (field == "start"){
        objJson.documento.trips[actualTrip].start = limpaData(value);
	};
	if (field == "end"){
        objJson.documento.trips[actualTrip].end = limpaData(value);
	};
	if (field == "arrivalDate"){
        objJson.documento.trips[actualTrip].arrivalDate = limpaData(value);
	};
	if (field == "arrivalTime"){
        objJson.documento.trips[actualTrip].arrivalTime = limpaData(value);
	};
	if (field == "flightNumber"){
        objJson.documento.trips[actualTrip].flightNumber = value;
	};
	if (field == "flightDate"){
        objJson.documento.trips[actualTrip].flightDate = limpaData(value);
	};
	if (field == "flightTime"){
        objJson.documento.trips[actualTrip].flightTime = limpaData(value);
	};
	if (field == "airline"){
        objJson.documento.trips[actualTrip].airline = value;
	};
	if (field == "extend"){
        objJson.documento.trips[actualTrip].extend = value;
	};
	if (field == "pickup"){
        objJson.documento.trips[actualTrip].pickup = value;
	};
	if (field == "dropoff"){
        objJson.documento.trips[actualTrip].dropoff = value;
	};
	if (field == "accommodation"){
        objJson.documento.trips[actualTrip].accommodation = value;
	};
	if (field == "occupancy"){
        objJson.documento.trips[actualTrip].occupancy = value;
	};
	if (field == "guestName"){
        objJson.documento.trips[actualTrip].guestName = value;
	};
	if (field == "relationship"){
        objJson.documento.trips[actualTrip].relationship = value;
	};
	if (field == "mealPlan"){
        objJson.documento.trips[actualTrip].mealPlan = value;
	};
	if (field == "specialDiet"){
        objJson.documento.trips[actualTrip].specialDiet = value;
	};
	if (field == "privateWashroom"){
        objJson.documento.trips[actualTrip].privateWashroom = value;
	};
	if (field == "smoke"){
        objJson.documento.trips[actualTrip].smoke = value;
	};
	if (field == "liveDogs"){
        objJson.documento.trips[actualTrip].liveDogs = value;
	};
	if (field == "liveCats"){
        objJson.documento.trips[actualTrip].liveCats = value;
	};
	if (field == "hobbies"){
        objJson.documento.trips[actualTrip].hobbies = value;
	};
	if (field == "medical"){
        objJson.documento.trips[actualTrip].medical = value;
	};
	if (field == "comments"){
        objJson.documento.trips[actualTrip].comments = value;
	};
	if (field == "agreeTerm"){
        objJson.documento.trips[actualTrip].agreeTerm = value;
	};
	if (field == "usuallyStudy"){
        objJson.documento.trips[actualTrip].usuallyStudy = value;
	};
	if (field == "keepBedroom"){
        objJson.documento.trips[actualTrip].keepBedroom = value;
	};
	if (field == "iAmUsually"){
        objJson.documento.trips[actualTrip].iAmUsually = value;
	};
	if (field == "creditCardType"){
        objJson.documento.trips[actualTrip].creditCardType = value;
	};
	if (field == "creditCardNumber"){
        objJson.documento.trips[actualTrip].creditCardNumber = value;
	};
	if (field == "creditCardExpire"){
        objJson.documento.trips[actualTrip].creditCardExpire = value;
	};
	if (field == "creditCardCVC"){
        objJson.documento.trips[actualTrip].creditCardCVC = value;
	};
	if (field == "agreeDebit"){
        objJson.documento.trips[actualTrip].agreeDebit = value;
	};
	if (field == "apartamentType"){
        objJson.documento.trips[actualTrip].apartamentType = value;
	};
	if (field == "petQuantity"){
        objJson.documento.trips[actualTrip].petQuantity = value;
	};
	if (field == "petType"){
        objJson.documento.trips[actualTrip].petType = value;
	};
	if (field == "parking"){
        objJson.documento.trips[actualTrip].parking = value;
	};
	if (field == "wifi"){
        objJson.documento.trips[actualTrip].wifi = value;
	};
	if (field == "peopleQuantity"){
        objJson.documento.trips[actualTrip].peopleQuantity = value;
	};
	if (field == "guest_01"){
        objJson.documento.trips[actualTrip].guest_01 = value;
	};
	if (field == "guest_02"){
        objJson.documento.trips[actualTrip].guest_02 = value;
	};
	if (field == "guest_03"){
        objJson.documento.trips[actualTrip].guest_03 = value;
	};
	if (field == "guest_04"){
        objJson.documento.trips[actualTrip].guest_04 = value;
	};
	if (field == "guest_05"){
        objJson.documento.trips[actualTrip].guest_05 = value;
	};
	if (field == "agrreeDebitSuite"){
        objJson.documento.trips[actualTrip].agrreeDebitSuite = value;
	};
	if (field == "agrreeSuite"){
        objJson.documento.trips[actualTrip].agrreeSuite = value;
	};

	localStorage.setItem("student", JSON.stringify(objJson));
	
};		
