	// ** setar menu
	$("#menuStudents_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
	var parameter = parametrosDaUrl.split("&");
	if (parameter[1]) {
		var typePage = parametrosDaUrl.split("&")[1].split("=")[1];
	};
	
	// 
	// **** montagem do filtro para submissão ao server
	//

		// **** testa existencia do email
		$(".text-filter").blur(function(){
			var filters = 
					'filter_family:' + $("#filters_family").val() + ',' +
					'filter_mainIntersection:' + $("#filters_mainIntersection").val() + ',' +
					'filter_subway:' + $("#filters_subway").val() + ',' +
					'filter_internet:' + $("#filters_internet").val() + ',' +
					'filter_dogs:' + $("#filters_dogs").val() + ',' +
					'filter_cats:' + $("#filters_cats").val() + ',' +
					'filter_other:' + $("#filters_other").val() + ',' +
					'filter_background:' + $("#filters_background").val() + ',' +
					'filter_inCanada:' + $("#filters_inCanada").val() + ',' +
					'filter_smoke:' + $("#filters_smoke").val() + ',' +
					'filter_type:' + $("#filters_type").val() + ',' +
					'filter_police:' + $("#filters_police").val() + ',' +
					'filter_ageFrom:' + $("#filters_ageFrom").val() + ',' +
					'filter_ageTo:' + $("#filters_ageTo").val() + ',' +
					'filter_gender:' + $("#filters_gender").val() + ',' +
					'filter_meals:' + $("#filters_meals").val() + ',' +
					'filter_diet:' + $("#filters_diet").val() + ',' +
					'filter_dontHost:' + $("#filters_dontHost").val();
					var objStudent = JSON.parse(localStorage.getItem("student"));
					rest_obterFamiliesAll(carregaLocalStorageFamilies, semAcao, objStudent.documento.trips[objStudent.documento.actualTrip].destination, filters, "true");
		});	
	
	 	 
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);
	//
	//***   chamar tela de alteração com o student da pagina
	//
	$( "#alteracaoButton" ).bind( "click", function() {
		$(window.document.location).attr('href','student_input.html?mail=' + mailUrl );
	});
	//
	//***   setar pagina como accommodation
	//
	if (typePage == "accommodation"){
		$(".notAccommodation" ).addClass("hide");
	}
	//
	//***   setar pagina como accommodation
	//
	if (typePage == "accommodation-dorms"){
		$(".notAccommodationDorms" ).addClass("hide");
	}
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "onlyStudent"){
		$(".notOnlyStudent" ).addClass("hide");
	}
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "change"){
		$(".notChange" ).addClass("hide");
	};
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "caretaker"){
		$(".notChange" ).addClass("hide");
		$(".caretaker" ).removeClass("hide");
	};
	//
	//  ** send email to offer a family
	//
	var doc = new jsPDF();
	var specialElementHandlers = {
	    '#editor': function (element, renderer) {
	        return true;
	    }
	};

    $('#sendEmailOfferToFamily').bind( "click", function() {
//	    doc.fromHTML($('#contentPDF').html(), 15, 15, {
//	        'width': 170,
//	            'elementHandlers': specialElementHandlers
//	    });
//	    doc.save('sample-file.pdf');
    	rest_sendEmailHtml(localStorage.hostNameEmail, localStorage.userNameEmail , localStorage.passwordEmail, "grenneglr@gmail.com", $('#emailFamily').val(), "Offer accommodation", templateOffertoFamily(), emailEnviado, emailComProblemas );
    });
/**
 * 
 */
	var data = rest_obterStudent(mailUrl, carregaStudent, obtencaoNaoEfetuada);
	var table = JSON.parse(localStorage.getItem("table"));
    var actualTrip = getValueStudent("actualTrip");
		    
	$("#studentCompleteName").html(getValueStudent("firstName") + " " + getValueStudent("lastName"));
	$("#celPhone").html(getValueStudent("celPhone"));
    $('#phone').html(getValueStudent("phone"));
    $('#mail').html(getValueStudent("mail"));
    $('#lastName').html(getValueStudent("lastName"));
    $('#firstName').html(getValueStudent("firstName"));
    $("#birthDay").html(separaDataMes(getValueStudent("birthDay"), "-"));
    $("#age").html(calculaIdade(separaConverteDataMes(getValueStudent("birthDay"), "/")));
    $('#gender').html(getValueStudent("gender"));
    $('#nationality').html(getValueStudent("nationality"));
    $('#firstLanguage').html(getValueStudent("firstLanguage"));
    $('#profession').html(getValueStudent("profession"));
//    $('#mainPurposeTrip').html(getValueStudent("mainPurposeTrip"));
    $('#englishLevel').html(getValueStudent("englishLevel"));
    $('#streetNumber').html(getValueStudent("streetNumber"));
    $('#streetName').html(getValueStudent("streetName"));
    $('#state').html(getValueStudent("state"));
    $('#postalCode').html(getValueStudent("postalCode"));
    $('#city').html(getValueStudent("city"));
    $('#country').html(getValueStudent("country"));
    $('#complement').html(getValueStudent("complement"));

	// ** carrega mapa endereco
	generate_map_6(getValueStudent("latitude"), getValueStudent("longitude"));
	$('.addressMap').removeClass("hide");

	$('#secondaryTelephone').html(getValueStudent("secondaryTelephone"));
    $('#emergencyContactName').html(getValueStudent("emergencyContactName"));
    $('#emergencyContactPhone').html(getValueStudent("emergencyContactPhone"));
    $('#emergencyContactMail').html(getValueStudent("emergencyContactMail"));
    $('#emergencyContactRelationship').html(getValueStudent("emergencyContactRelationship"));
    $('#photoPassport').html(getValueStudent("photoPassport"));
	if (getValueStudent("photoPassport")){
		carregaPhoto (localStorage.app, getValueStudent("photoPassport"), "photoPassport");
	};
    $('#status').html(getValueStudent("status",actualTrip));
    $('#destination').html(getValueStudent("destination",actualTrip));
    $('#contactFamilyName').html(getValueStudent("contactFamilyName",actualTrip));
    
    $('#contactName').html(getValueStudent("contactName",actualTrip));
    $('#contactGender').html(getValueStudent("contactGender",actualTrip));
    $('#contactEmail').html(getValueStudent("contactEmail",actualTrip));
    $('#contactPhone').html(getValueStudent("contactPhone",actualTrip));
    $('#contactMobilePhone').html(getValueStudent("contactMobilePhone",actualTrip));
    
    $("#start").html(separaDataMes(getValueStudent("start", actualTrip), "-"));
    $("#end").html(separaDataMes(getValueStudent("end", actualTrip), "-"), actualTrip);
    $("#arrivalDate").html(separaDataMes(getValueStudent("arrivalDate", actualTrip), "-"));
    $("#arrivalTime").html(separaHora(getValueStudent("arrivalTime", actualTrip), ":"));
    $('#arrivalFlightNumber').html(getValueStudent("arrivalFlightNumber",actualTrip));
    $('#arrivalAirline').html(getValueStudent("arrivalAirline",actualTrip));
    $("#departureDate").html(separaDataMes(getValueStudent("departureDate", actualTrip), "-"));
    $("#departureTime").html(separaHora(getValueStudent("departureTime", actualTrip), ":"));
    $('#departureFlightNumber').html(getValueStudent("departureFlightNumber",actualTrip));
    $('#departureAirline').html(getValueStudent("departureAirline",actualTrip));
    $('#extend').html(getValueStudent("extend",actualTrip));
    $('#pickup').html(getValueStudent("pickup",actualTrip));
    $('#dropoff').html(getValueStudent("dropoff",actualTrip));
    $('#accommodation').html(getValueStudent("accommodation",actualTrip));
	if (getValueStudent("accommodation", actualTrip) == "Homestay"){
    	$(".homestay" ).removeClass("hide");
	    if (getValueStudent("familyName",actualTrip)){
	    	$(".family" ).removeClass("hide");
	    }else{
	    	$(".family" ).addClass("hide");	
	    };
	}else{
		if (getValueStudent("accommodation", actualTrip) == "Dorms"){
	   		$(".dorms").removeClass("hide");
	  	}else{
        	if (getValueStudent("accommodation", actualTrip) == "Suite"){
	       		$(".suite").removeClass("hide");
	      	}
	 	}
	};
    
    var room = getValueStudent("roomData",actualTrip);
    if (room){
    	if (room.number){
	    	$('#roomNumberHomestay').html((parseInt(room.number) + 1));
	    	$('#singleBed').html(room.singleBed);
	    	$('#coupleBed').html(room.coupleBed);
	    	$('#note').html(room.note);
	    	$('#studentOcuppancy').html(room.studentOccupancy);
	    	$('#startOccupancy').html(room.startOccupancy);
	    	$('#endOccupancy').html(room.endOccupancy);
    	}else{
        	$('.room').addClass("hide");
    	}
    }else{
    	$('.room').addClass("hide");
    }
//
//	***  carrega dados tela email	
//	
	$("#studentCompleteNameEmail").html(getValueStudent("firstName") + " " + getValueStudent("lastName"));
	$("#celPhoneEmail").html(getValueStudent("celPhone"));
    $('#phoneEmail').html(getValueStudent("phone"));
    $('#mailEmail').html(getValueStudent("mail"));
    $('#lastNameEmail').html(getValueStudent("lastName"));
    $('#firstNameEmail').html(getValueStudent("firstName"));
    $("#birthDayEmail").html(separaDataMes(getValueStudent("birthDay"), "-"));
    $("#ageEmail").html(calculaIdade(separaConverteDataMes(getValueStudent("birthDay"), "/")));
    $('#genderEmail').html(getValueStudent("gender"));
    $('#nationalityEmail').html(getValueStudent("nationality"));
    $('#firstLanguageEmail').html(getValueStudent("firstLanguage"));
    $('#professionEmail').html(getValueStudent("profession"));
//    $('#mainPurposeTripEmail').html(getValueStudent("mainPurposeTrip"));
    $('#englishLevelEmail').html(getValueStudent("englishLevel"));
    $('#streetNumberEmail').html(getValueStudent("streetNumber"));
    $('#streetNameEmail').html(getValueStudent("streetName"));
    $('#stateEmail').html(getValueStudent("state"));
    $('#postalCodeEmail').html(getValueStudent("postalCode"));
    $('#cityEmail').html(getValueStudent("city"));
    $('#countryEmail').html(getValueStudent("country"));
    $('#secondaryTelephoneEmail').html(getValueStudent("secondaryTelephone"));
    $('#emergencyContactNameEmail').html(getValueStudent("emergencyContactName"));
    $('#emergencyContactPhoneEmail').html(getValueStudent("emergencyContactPhone"));
    $('#emergencyContactMailEmail').html(getValueStudent("emergencyContactMail"));
    $('#statusEmail').html(getValueStudent("status",actualTrip));
    $('#destinationEmail').html(getValueStudent("destination",actualTrip));
    $("#startEmail").html(separaDataMes(getValueStudent("start", actualTrip), "."), "-");
    $("#endEmail").html(separaDataMes(getValueStudent("end", actualTrip), "."), "-");
    $("#arrivalDateEmail").html(separaDataMes(getValueStudent("arrivalDate", actualTrip), "."), "-");
    $("#arrivalDateEmail").html(separaHora(getValueStudent("arrivalTime", actualTrip), ":"));
    $('#arrivalFlightNumberEmail').html(getValueStudent("arrivalFlightNumber",actualTrip));
    $('#arrivalAirlineEmail').html(getValueStudent("arrivalAirline",actualTrip));
    $("#departureDateEmail").html(separaDataMes(getValueStudent(("departureDate", actualTrip)), "-"));
    $("#departureTimeEmail").html(separaHora(getValueStudent("departureTime", actualTrip), ":"));
    $('#departureFlightNumberEmail').html(getValueStudent("departureFlightNumber",actualTrip));
    $('#departureAirlineEmail').html(getValueStudent("departureAirline",actualTrip));
    $('#extendEmail').html(getValueStudent("extend",actualTrip));
    $('#pickupEmail').html(getValueStudent("pickup",actualTrip));
    $('#dropoffEmail').html(getValueStudent("dropoff",actualTrip));
    $('#accommodationEmail').html(getValueStudent("accommodation",actualTrip));
    //
    //    *** homestay
    //
    $('#occupancy').html(getValueStudent("occupancy",actualTrip));
	if (getValueStudent("occupancy", actualTrip) == "Twin" || getValueStudent("occupancy", actualTrip) == "Couple"){
		$(".guest").removeClass("hide");
	}else{
		$(".guest").addClass("hide");
	}
    $('#guestName').html(getValueStudent("guestName",actualTrip));
    $('#guestEmail').html(getValueStudent("guestEmail",actualTrip));
    $('#relationship').html(getValueStudent("relationship",actualTrip));
    $('#mealPlan').html(getValueStudent("mealPlan",actualTrip));
    $('#specialDiet').html(getValueStudent("specialDiet",actualTrip));
    $('#privateWashroom').html(getValueStudent("privateWashroom",actualTrip));
    $('#smoke').html(getValueStudent("smoke",actualTrip));
    $('#liveDogs').html(getValueStudent("liveDogs",actualTrip));
    $('#liveCats').html(getValueStudent("liveCats",actualTrip));
    $('#liveWithChildren').html(getValueStudent("liveWithChildren",actualTrip));
    $('#hobbies').html(getValueStudent("hobbies",actualTrip));
    $('#medical').html(getValueStudent("medical",actualTrip));
    $('#comments').html(getValueStudent("comments",actualTrip));
    $('#agreeTerm').html(getValueStudent("agreeTerm",actualTrip));
    //
    //    *** carrega dadps homestay do email
    //
    $('#occupancyEmail').html(getValueStudent("occupancy",actualTrip));
    $('#guestNameEmail').html(getValueStudent("guestName",actualTrip));
    $('#relationshipEmail').html(getValueStudent("relationship",actualTrip));
    $('#mealPlanEmail').html(getValueStudent("mealPlan",actualTrip));
    $('#specialDietEmail').html(getValueStudent("specialDiet",actualTrip));
    $('#privateWashroomEmail').html(getValueStudent("privateWashroom",actualTrip));
    $('#smokeEmail').html(getValueStudent("smoke",actualTrip));
    $('#liveDogsEmail').html(getValueStudent("liveDogs",actualTrip));
    $('#liveCatsEmail').html(getValueStudent("liveCats",actualTrip));
    $('#hobbiesEmail').html(getValueStudent("hobbies",actualTrip));
    $('#medicalEmail').html(getValueStudent("medical",actualTrip));
    $('#commentsEmail').html(getValueStudent("comments",actualTrip));
    $('#agreeTermEmail').html(getValueStudent("agreeTerm",actualTrip));
    //
    // *** dorms
    //
    $('#usuallyStudy').html(getValueStudent("usuallyStudy",actualTrip));
    $('#keepBedroom').html(getValueStudent("keepBedroom",actualTrip));
    $('#iAmUsually').html(getValueStudent("iAmUsually",actualTrip));
    $('#creditCardType').html(getValueStudent("creditCardType",actualTrip));
    $('#creditCardNumber').html(getValueStudent("creditCardNumber",actualTrip));
    var expireDate = getValueStudent("creditCardExpire", actualTrip);
    $('#creditCardExpire').html(getValueStudent("creditCardExpire",actualTrip));
    $('#creditCardCVC').html(getValueStudent("creditCardCVC",actualTrip));
    $('#apartamentType').html(getValueStudent("apartamentType",actualTrip));
    $('#petQuantity').html(getValueStudent("petQuantity",actualTrip));
    $('#petType').html(getValueStudent("petType",actualTrip));
    $('#parking').html(getValueStudent("parking",actualTrip));
    $('#wifi').html(getValueStudent("wifi",actualTrip));
    $('#peopleQuantity').html(getValueStudent("peopleQuantity",actualTrip));
    var peopleQuantity = getValueStudent("peopleQuantity", actualTrip); 
    $('.g' + getValueStudent("peopleQuantity", actualTrip)).removeClass("hide");
    $('#guest_01').html(getValueStudent("guest_01",actualTrip));
    $('#guest_02').html(getValueStudent("guest_02",actualTrip));
    $('#guest_03').html(getValueStudent("guest_03",actualTrip));
    $('#guest_04').html(getValueStudent("guest_04",actualTrip));
    $('#guest_05').html(getValueStudent("guest_05",actualTrip));
    $('#agreeDebit').html(getValueStudent("agreeDebit",actualTrip));
    $('#agreeDebitSuite').html(getValueStudent("agreeDebitSuite",actualTrip));
    $('#agreeSuite').html(getValueStudent("agreeSuite",actualTrip));
    
	if (getValueStudent("agencyName",actualTrip)){
		rest_obterAgency (getValueStudent("agencyName",actualTrip), carregaDadosAgency, semAcao, true, getValueStudent("agencyConsultName",actualTrip))
	};
	$("#agencyConsultName").html(getValueStudent("agencyConsultName",actualTrip));
	
	if (getValueStudent("schoolName",actualTrip)){
		rest_obterSchool (getValueStudent("schoolName",actualTrip), carregaDadosSchool, semAcao, true, getValueStudent("schoolConsultName",actualTrip))
	};
	$("#schoolConsultName").html(getValueStudent("schoolConsultName",actualTrip));
	

	
	