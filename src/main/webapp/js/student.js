	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("=")[1];
	 	 
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
    $("#birthDay").html(separaData(getValueStudent("birthDay"), "/"));
    $("#age").html(calculaIdade(separaData(getValueStudent("birthDay"), "/")));
    $('#gender').html(getValueStudent("gender"));
    $('#nationality').html(getValueStudent("nationality"));
    $('#firstLanguage').html(getValueStudent("firstLanguage"));
    $('#profession').html(getValueStudent("profession"));
    $('#mainPurposeTrip').html(getValueStudent("mainPurposeTrip"));
    $('#englishLevel').html(getValueStudent("englishLevel"));
    $('#streetNumber').html(getValueStudent("streetNumber"));
    $('#streetName').html(getValueStudent("streetName"));
    $('#state').html(getValueStudent("state"));
    $('#postalCode').html(getValueStudent("postalCode"));
    $('#city').html(getValueStudent("city"));
    $('#country').html(getValueStudent("country"));
    $('#secondaryTelephone').html(getValueStudent("secondaryTelephone"));
    $('#emergencyContactName').html(getValueStudent("emergencyContactName"));
    $('#emergencyContactPhone').html(getValueStudent("emergencyContactPhone"));
    $('#emergencyContactMail').html(getValueStudent("emergencyContactMail"));
    $('#status').html(getValueStudent("status",actualTrip));
    $('#destination').html(getValueStudent("destination",actualTrip));
    $("#start").html(separaData(getValueStudent("start", actualTrip), "."), actualTrip);
    $("#end").html(separaData(getValueStudent("end", actualTrip), "."), actualTrip);
    $("#arrivalDate").html(separaData(getValueStudent("arrivalDate", actualTrip), "."), actualTrip);
    $("#arrivalTime").html(separaHora(getValueStudent("arrivalTime", actualTrip), ":"));
    $('#flightNumber').html(getValueStudent("flightNumber",actualTrip));
    $("#flightDate").html(separaData(getValueStudent("flightDate", actualTrip), "."), actualTrip);
    $("#flightTime").html(separaHora(getValueStudent("flightTime", actualTrip), ":"), actualTrip);
    $('#airline').html(getValueStudent("airline",actualTrip));
    $('#extend').html(getValueStudent("extend",actualTrip));
    $('#pickup').html(getValueStudent("pickup",actualTrip));
    $('#dropoff').html(getValueStudent("dropoff",actualTrip));
    $('#accommodation').html(getValueStudent("accommodation",actualTrip));
	if (getValueStudent("accommodation", actualTrip) == "Homestay"){
		$(".homestay").removeClass("hide");
	}else{
		if (getValueStudent("accommodation", actualTrip) == "Dorms"){
    		$(".dorms").removeClass("hide");
    	}else{
        	if (getValueStudent("accommodation", actualTrip) == "Suite"){
        		$(".suite").removeClass("hide");
        	}
    	}
	};
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
    $('#relationship').html(getValueStudent("relationship",actualTrip));
    $('#mealPlan').html(getValueStudent("mealPlan",actualTrip));
    $('#specialDiet').html(getValueStudent("specialDiet",actualTrip));
    $('#privateWashroom').html(getValueStudent("privateWashroom",actualTrip));
    $('#smoke').html(getValueStudent("smoke",actualTrip));
    $('#liveDogs').html(getValueStudent("liveDogs",actualTrip));
    $('#liveCats').html(getValueStudent("liveCats",actualTrip));
    $('#hobbies').html(getValueStudent("hobbies",actualTrip));
    $('#medical').html(getValueStudent("medical",actualTrip));
    $('#comments').html(getValueStudent("comments",actualTrip));
    $('#agreeTerm').html(getValueStudent("agreeTerm",actualTrip));
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
		rest_obterAgency (getValueStudent("agencyName",actualTrip), carregaDadosAgency, semAcao, true)
	};
	
	if (getValueStudent("schoolName",actualTrip)){
		rest_obterSchool (getValueStudent("schoolName",actualTrip), carregaDadosSchool, semAcao, true)
	};
	
	
