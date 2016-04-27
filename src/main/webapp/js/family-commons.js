

function carregaTelaFamily(data) {
	
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
  	$("#contact-name").html(data.documento.contact.firstName + " " + data.documento.contact.lastName);
  	$("#contact-gender").html(data.documento.contact.gender);
  	$("#contact-birthDate").html(separaData(data.documento.contact.birthDate, "/"));
  	$("#contact-age").html(calculaIdade(separaData(data.documento.contact.birthDate, "/")));
  	$("#contact-ocuppation").html(data.documento.contact.ocuppation);
  	$("#contact-employer").html(data.documento.contact.employer);
  	$("#contact-email").html(data.documento.contact.email);
  	$("#contact-phoneNumber").html(data.documento.contact.phoneNumber);
  	$("#contact-mobilePhoneNumber").html(data.documento.contact.mobilePhoneNumber);
  	$("#contact-workPhoneNumber").html(data.documento.contact.workPhoneNumber);
  	$("#address-street").html(data.documento.address.street);
  	$("#address-number").html(data.documento.address.number);
  	$("#address-city").html(data.documento.address.city);
  	$("#address-state").html(data.documento.address.state);
  	$("#address-postalCode").html(data.documento.address.postalCode);
  	$("#address-mainIntersection").html(data.documento.address.mainIntersection);
  	$("#address-nearestSubwayStation").html(data.documento.address.nearestSubwayStation);
  	$("#address-walkingTimeSubwayStation").html(data.documento.address.walkingTimeSubwayStation);
  	$("#address-nearestBusStop").html(data.documento.address.nearestBusStop);
  	$("#address-walkingTimeBusStation").html(data.documento.address.walkingTimeBusStation);
  	
    $.each(data.documento.familyMembers
		    , function (i, value) {
    	var familyMemberLine = '<li>' +
									'<p class="text-muted">' +
										'<i class="fa fa-user"></i>&nbsp;&nbsp;' +
											'<span class="txt-color-darken"><small class="text-danger" id="familyName' + i + '" data-original-title="Name">' + value.name + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyGender' + i + '" data-original-title="Name"> - Gender: ' + value.gender + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyBirthDate' + i + '" data-original-title="Name"> - Birhdate: ' + separaData(value.birthDate, "/") + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyBirthDate' + i + '" data-original-title="Name"> - Age: ' + calculaIdade(separaData(value.birthDate, "/")) + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyMobilePhone' + i + '" data-original-title="Name"> - Mobile Phone: ' + value.mobilePhone + '</small></span>' +
									'</p>' +
								'</li>'
    	$("#familyMembersList").append(familyMemberLine);
    });
	
	localStorage.setItem("family", JSON.stringify(data));
};    
