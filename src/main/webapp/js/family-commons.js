

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
		$("#othersLanguage").html(data.documento.othersLanguage);
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
		if (data.documento.offerPrivateWashroom == "Yes"){
			$("#offerPrivateWashroom").prop("checked", true)
		}
		$("#numberPrivateWashroom").val(data.documento.numberPrivateWashroom);
		if (data.documento.offerInternet == "Yes"){
			$("#offerInternet").prop("checked", true)
		}
		if (data.documento.havePets == "Yes"){
			$("#havePets").prop("checked", true)
		}
		$("#firstLanguage").val(data.documento.firstLanguage);
		var array = [data.documento.othersLanguage.split(",")];
		$("#othersLanguage").val(array);
		$("#acceptSmokeStudent").val(data.documento.acceptSmokeStudent);
		$("#preferAgeStudent").val(data.documento.preferAgeStudent);
		$("#preferGenderStudent").val(data.documento.preferGenderStudent);
		$("#mealPlan").val(data.documento.mealPlan);
		if (data.documento.hostVegetarianStudent == "Yes"){
			$("#hostVegetarianStudent").prop("checked", true)
		}
		if (data.documento.hostAnyNationalityStudent == "Yes"){
			$("#hostAnyNationalityStudent").prop("checked", true)
		}
		if (data.documento.acceptSmokeInsideHome == "Yes"){
			$("#acceptSmokeInsideHome").prop("checked", true)
		}
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
	    $.each(data.documento.familyMembers
			    , function (i, value) {
	    	var familyMemberLine = '<li >' +
										'<div class="col-xs-11">' +
											'<fieldset class="familyMemberList">' +					
												'<section class="col-xs-4">' +
													'<label class="input"> <i class="icon-prepend fa fa-user"></i>' +
														'<input type="text" id=familyMemberName_' + i + '" name="familyMemberName_' + i + '" value="' + value.name + '" placeholder="">' +
													'</label>' +
												'</section>' +
												'<section class="col-xs-2">' +
													'<label class="select ">' +
														'<select id="familyMemberGender_' + i + '" name="familyMemberGender_' + i + '">' +
															'<option value="" selected="" disabled=""></option>' +
															'<option value="Male">Male</option>' +
															'<option value="Female">Female</option>' +
														'</select><i></i>' +
													'</label>' +
												'</section>' +
												'<section class="col-xs-2">' +
													'<label class="input"><i class="icon-prepend fa fa-calendar"></i>'  +
														'<input type="text" id=familyMemberBirthdate_' + i + '" name="familyMemberBirthdate_' + i + '" value="' + value.birthDate + '" class="datepicker" data-dateformat="dd/mm/yy" data-mask="99/99/9999">' +
													'</label>' +
												'</section>' +
											'</fieldset>' +
										'</div>' +
									'</li>';
	    	$('#familyMemberGender_' + i).val(value.gender);
	    	$('#familyMemberBirthdate_' + i).datepicker({
	    		dateFormat : 'dd.mm.yy',
	    		prevText : '<i class="fa fa-chevron-left"></i>',
	    		nextText : '<i class="fa fa-chevron-right"></i>',
	    		onSelect : function(selectedDate) {
	    			}
	    		});
	    	$('#familyMemberBirthdate_' + i).val(value.birthdate);
	    	$("#familyMembersList").append(familyMemberLine);
	    });
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
	
	if (field == "familyName"){
        objJson.documento.familyName = value;
	};
	if (field == "type"){
        objJson.documento.type = value;
	};
	if (field == "numbersBedroom"){
        objJson.documento.numbersBedroom = value;
	};
	if (field == "numbersStudentsBedroom"){
        objJson.documento.numbersStudentsBedroom = value;
	};
	if (field == "offerPrivateWashroom"){
        objJson.documento.offerPrivateWashroom = value;
	};
	if (field == "numberPrivateWashroom"){
        objJson.documento.numberPrivateWashroom = value;
	};
	if (field == "offerInternet"){
        objJson.documento.offerInternet = value;
	};
	if (field == "havePets"){
        objJson.documento.havePets = value;
	};
	if (field == "firstLanguage"){
        objJson.documento.firstLanguage = value;
	};
	if (field == "othersLanguage"){
        objJson.documento.othersLanguage = value;
	};
	if (field == "acceptSmokeStudent"){
        objJson.documento.acceptSmokeStudent = value;
	};
	if (field == "preferAgeStudent"){
        objJson.documento.preferAgeStudent = value;
	};
	if (field == "preferGenderStudent"){
        objJson.documento.preferGenderStudent = value;
	};
	if (field == "mealPlan"){
        objJson.documento.mealPlan = value;
	};
	if (field == "hostVegetarianStudent"){
        objJson.documento.hostVegetarianStudent = value;
	};
	if (field == "hostAnyNationalityStudent"){
        objJson.documento.hostAnyNationalityStudent = value;
	};
	if (field == "acceptSmokeInsideHome"){
        objJson.documento.acceptSmokeInsideHome = value;
	};
  	if (field == "contact_firstName"){
        objJson.documento.contact.firstName = value;
	};
  	if (field == "contact_lastName"){
        objJson.documento.contact.lastName = value;
	};
  	if (field == "contact_gender"){
        objJson.documento.contact.gender = value;
	};
  	if (field == "contact_ocuppation"){
        objJson.documento.contact.ocuppation = value;
	};
  	if (field == "contact_employer"){
        objJson.documento.contact.employer = value;
	};
  	if (field == "contact_email"){
        objJson.documento.contact.email = value;
	};
  	if (field == "contact_phoneNumber"){
        objJson.documento.contact.phoneNumber = value;
	};
  	if (field == "contact_mobilePhoneNumber"){
        objJson.documento.contact.mobilePhoneNumber = value;
	};
  	if (field == "contact_workPhoneNumber"){
        objJson.documento.contact.workPhoneNumber = value;
	};
  	if (field == "contact_birthDate"){
        objJson.documento.contact.birthDate = value;
	};
  	if (field == "address_street"){
        objJson.documento.address.street = value;
	};
  	if (field == "address_number"){
        objJson.documento.address.number = value;
	};
  	if (field == "address_city"){
        objJson.documento.address.city = value;
	};
  	if (field == "address_state"){
        objJson.documento.address.state = value;
	};
  	if (field == "address_postalCode"){
        objJson.documento.address.postalCode = value;
	};
  	if (field == "address_mainIntersection"){
        objJson.documento.address.mainIntersection = value;
	};
  	if (field == "address_nearestSubwayStation"){
        objJson.documento.address.nearestSubwayStation = value;
	};
  	if (field == "address_walkingTimeSubwayStation"){
        objJson.documento.address.walkingTimeSubwayStation = value;
	};
  	if (field == "address_nearestBusStop"){
        objJson.documento.address.nearestBusStop = value;
	};
  	if (field == "address_walkingTimeBusStation"){
        objJson.documento.address.walkingTimeBusStation = value;
	};

	localStorage.setItem("family", JSON.stringify(objJson));
	
};		
