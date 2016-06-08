    
function carregaTela(data) {
    	
	var actualTrip = data.documento.actualTrip;	
	
	$("#studentCompleteName").html(getValueStudent("firstName") + " " + getValueStudent("lastName"));
	$("#firstName").val(data.documento.firstName);
	$("#lastName").val(data.documento.lastName);
	$("#celPhone").val(data.documento.celPhone);
	$("#phone").val(data.documento.phone);
	$("#mail").val(data.documento.mail);
	$("#birthDay").val(data.documento.birthDay);
	$("#age").html(calculaIdade(separaData(data.documento.birthDay, "/")));
	$("#gender").val(data.documento.gender);
	$("#nationality").val(data.documento.nationality);
	$("#firstLanguage").val(data.documento.firstLanguage);
	$("#profession").val(data.documento.profession);
	$("#englishLevel").val(data.documento.englishLevel);
	$("#streetNumber").val(data.documento.streetNumber);
	$("#streetName").val(data.documento.streetName);
	$("#state").val(data.documento.state);
	$("#postalCode").val(data.documento.postalCode);
	$("#city").val(data.documento.city);
	$("#country").val(data.documento.country);
	$("#secondaryTelephone").val(data.documento.secondaryTelephone);
	$("#emergencyContactName").val(data.documento.emergencyContactName);
	$("#emergencyContactPhone").val(data.documento.emergencyContactPhone);
	$("#emergencyContactMail").val(data.documento.emergencyContactMail);
	$("#status").val(data.documento.trips[actualTrip].status);
	$("#destination").val(data.documento.trips[actualTrip].destination);
	$("#start").val(data.documento.trips[actualTrip].start);
	$("#end").val(data.documento.trips[actualTrip].end);
	$("#arrivalDate").val(data.documento.trips[actualTrip].arrivalDate);
	$("#arrivalTime").val(data.documento.trips[actualTrip].arrivalTime);
	$("#flightNumber").val(data.documento.trips[actualTrip].flightNumber);
	$("#flightDate").val(data.documento.trips[actualTrip].flightDate);
	$("#flightTime").val(data.documento.trips[actualTrip].flightTime);
	$("#airline").val(data.documento.trips[actualTrip].airline);
	if (data.documento.trips[actualTrip].extend == "Yes"){
		$("#extend").prop("checked", true)
	}
	if (data.documento.trips[actualTrip].pickup == "Yes"){
		$("#pickup").prop("checked", true)
	}
	if (data.documento.trips[actualTrip].dropoff == "Yes"){
		$("#dropoff").prop("checked", true)
	}
	$("#accommodation").val(data.documento.trips[actualTrip].accommodation);
	if (data.documento.trips[actualTrip].accommodation == "Homestay"){
		$(".dorms").addClass("hide");
		$(".suite").addClass("hide");
		$(".homestay").removeClass("hide");
	}else{
		if (data.documento.trips[actualTrip].accommodation == "Dorms"){
			$(".homestay").addClass("hide");
			$(".suite").addClass("hide");
			$(".dorms").removeClass("hide");
		}else{
			$(".homestay").addClass("hide");
			$(".dorms").addClass("hide");
			$(".suite").removeClass("hide");				
		}
	};
	$("#occupancy").val(data.documento.trips[actualTrip].occupancy);
	if (data.documento.trips[actualTrip].occupancy == "Twin" || data.documento.trips[actualTrip].occupancy == "Couple"){
		$(".guest").removeClass("hide");
	}else{
		$(".guest").addClass("hide");
	};
	$("#guestName").val(data.documento.trips[actualTrip].guestName);
	$("#relationship").val(data.documento.trips[actualTrip].relationship);
	$('#mealPlan').val(data.documento.trips[actualTrip].mealPlan);    	
	$("#specialDiet").val(data.documento.trips[actualTrip].specialDiet);
	$("#privateWashroom").val(data.documento.trips[actualTrip].privateWashroom);
	if (data.documento.trips[actualTrip].smoke == "Yes"){
		$("#smoke").prop("checked", true)
	}
	if (data.documento.trips[actualTrip].liveDogs == "Yes"){
		$("#liveDogs").prop("checked", true)
	}
	if (data.documento.trips[actualTrip].liveCats == "Yes"){
		$("#liveCats").prop("checked", true)
	}
	$("#hobbies").val(data.documento.trips[actualTrip].hobbies);
	$("#medical").val(data.documento.trips[actualTrip].medical);
	$("#comments").val(data.documento.trips[actualTrip].comments);
	if (data.documento.trips[actualTrip].agreeTerm == "Yes"){
		$("#agreeTerm").prop("checked", true)
	}
	$("#agreeTerm").val(data.documento.trips[actualTrip].agreeTerm);
	$("#usuallyStudy").val(data.documento.trips[actualTrip].usuallyStudy);
	$("#keepBedroom").val(data.documento.trips[actualTrip].keepBedroom);
	$("#iAmUsually").val(data.documento.trips[actualTrip].iAmUsually);
	$("#creditCardType").val(data.documento.trips[actualTrip].creditCardType);
	$("#creditCardNumber").val(data.documento.trips[actualTrip].creditCardNumber);
	$("#creditCardExpire").val(data.documento.trips[actualTrip].creditCardExpire);
	$("#creditCardCVC").val(data.documento.trips[actualTrip].creditCardCVC);
	$("#agreeDebit").val(data.documento.trips[actualTrip].agreeDebit);
	$("#apartamentType").val(data.documento.trips[actualTrip].apartamentType);
	$("#petQuantity").val(data.documento.trips[actualTrip].petQuantity);
	$("#petType").val(data.documento.trips[actualTrip].petType);

	if (data.documento.trips[actualTrip].parking == "Yes"){
		$("#parking").prop("checked", true)
	}
	if (data.documento.trips[actualTrip].wifi == "Yes"){
		$("#wifi").prop("checked", true)
	}
	$("#peopleQuantity").val(data.documento.trips[actualTrip].peopleQuantity);
	$("#guest_01").val(data.documento.trips[actualTrip].guest_01);
	$("#guest_02").val(data.documento.trips[actualTrip].guest_02);
	$("#guest_03").val(data.documento.trips[actualTrip].guest_03);
	$("#guest_04").val(data.documento.trips[actualTrip].guest_04);
	$("#guest_05").val(data.documento.trips[actualTrip].guest_05);
	if (data.documento.trips[actualTrip].agrreeDebitSuite == "Yes"){
		$("#agrreeDebitSuite").prop("checked", true)
	}
	if (data.documento.trips[actualTrip].agrreeSuite == "Yes"){
		$("#agrreeSuite").prop("checked", true)
	};
    
	if (data.documento.trips[actualTrip].agencyName){
		$(".agency").addClass("hide");
		rest_obterAgency (data.documento.trips[actualTrip].agencyName, carregaDadosAgency, semAcao)
	};
	
	if (data.documento.trips[actualTrip].schoolName){
		$(".school").addClass("hide");
		rest_obterSchool (data.documento.trips[actualTrip].schoolName, carregaDadosSchool, semAcao)
	};

	localStorage.setItem("student", JSON.stringify(data));
	localStorage.studentExistente = "true";
};    

function carregaDadosAgency(data, consult) {
	if (consult){
		$("#agencyName").html(data.documento.name);
		$("#agencyNameEmail").html(data.documento.name);
	}else{
		$("#agencyName").val(data.documento.name);
	};
	$("#agencyPhone").html(data.documento.agencyPhone);
	$("#agencyEmail").html(data.documento.agencyEmail);
	$("#agencyNameConsult").html(data.documento.nameConsult);
	$("#agencyConsultMobile").html(data.documento.celPhone);
	$("#agencyConsultPhone").html(data.documento.phone);
	$("#agencyConsultEmail").html(data.documento.email);
	$(".agency").removeClass("hide");
};

function carregaDadosSchool(data, consult) {
	if (consult){
		$("#schoolName").val(data.documento.name);	
		$("#schoolName").val(data.documento.name);
	}else{
		$("#schoolName").val(data.documento.name);
	};
	$("#schoolPhone").html(data.documento.schoolPhone);
	$("#schoolEmail").html(data.documento.schoolEmail);
	$("#schoolNameContact").html(data.documento.nameContact);
	$("#schoolContactMobile").html(data.documento.celPhone);
	$("#schoolContactPhone").html(data.documento.phone);
	$("#schoolContactEmail").html(data.documento.email);
	$("#schoolAddress").html(data.documento.address);
	$(".school").removeClass("hide");
	generate_map_7(data.documento.latitude, data.documento.longitude);
	localStorage.latitudeSchool = data.documento.latitude;
	localStorage.longitudeSchool = data.documento.longitude;
};

function carregaSelectAgencies(data) {
    $.each(data
		    , function (i, optionValue) {
    			$("#agencyName").append( $(option(optionValue.name)));
    });
};

function carregaSelectSchool(data) {
    $.each(data
		    , function (i, optionValue) {
    			$("#schoolName").append( $(option(optionValue.name)));
    });
};

/**
 * 
 */
    
function getValueStudent (field, actualTrip) {
	if (field == "celPhone"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.celPhone;			
	};
	if (field == "phone"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.phone;			
	};
	if (field == "mail"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.mail;			
	};
	if (field == "lastName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.lastName;			
	};
	if (field == "firstName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.firstName;			
	};
	if (field == "birthDay"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.birthDay;			
	};
	if (field == "gender"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.gender;			
	};
	if (field == "nationality"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.nationality;			
	};
	if (field == "firstLanguage"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.firstLanguage;			
	};
	if (field == "profession"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.profession;			
	};
	if (field == "englishLevel"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.englishLevel;			
	};
	if (field == "streetNumber"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.streetNumber;			
	};
	if (field == "streetName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.streetName;			
	};
	if (field == "state"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.state;			
	};
	if (field == "postalCode"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.postalCode;			
	};
	if (field == "city"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.city;			
	};
	if (field == "country"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.country;			
	};
	if (field == "secondaryTelephone"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.secondaryTelephone;			
	};
	if (field == "emergencyContactName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.emergencyContactName;			
	};
	if (field == "emergencyContactPhone"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.emergencyContactPhone;			
	};
	if (field == "emergencyContactMail"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.emergencyContactMail;			
	};
	if (field == "actualTrip"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.actualTrip;			
	};
	if (field == "status"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].status;		
	};
	if (field == "destination"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].destination;		
	};
	if (field == "start"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].start;		
	};
	if (field == "end"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].end;		
	};
	if (field == "arrivalDate"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].arrivalDate;		
	};
	if (field == "arrivalTime"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].arrivalTime;		
	};
	if (field == "flightDate"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].flightDate;		
	};
	if (field == "flightNumber"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].flightNumber;		
	};
	if (field == "flightTime"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].flightTime;		
	};
	if (field == "airline"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].airline;			
	};
	if (field == "extend"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].extend;		
	};
	if (field == "pickup"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].pickup;		
	};
	if (field == "dropoff"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].dropoff;		
	};
	if (field == "accommodation"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].accommodation;		
	};
	if (field == "occupancy"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].occupancy;		
	};
	if (field == "guestName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].guestName;		
	};
	if (field == "relationship"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].relationship;		
	};
	if (field == "mealPlan"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].mealPlan;		
	};
	if (field == "specialDiet"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].specialDiet;		
	};
	if (field == "privateWashroom"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].privateWashroom;		
	};
	if (field == "smoke"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].smoke;		
	};
	if (field == "liveDogs"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].liveDogs;		
	};
	if (field == "liveCats"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].liveCats;		
	};
	if (field == "hobbies"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].hobbies;		
	};
	if (field == "medical"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].medical;		
	};
	if (field == "comments"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].comments;		
	};
	if (field == "agreeTerm"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].agreeTerm;		
	};
	if (field == "usuallyStudy"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].usuallyStudy;		
	};
	if (field == "keepBedroom"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].keepBedroom;		
	};
	if (field == "iAmUsually"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].iAmUsually;		
	};
	if (field == "creditCardType"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].creditCardType;		
	};
	if (field == "creditCardNumber"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].creditCardNumber;		
	};
	if (field == "creditCardExpire"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].creditCardExpire;		
	};
	if (field == "creditCardCVC"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].creditCardCVC;		
	};
	if (field == "agreeDebit"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].agreeDebit;		
	};
	if (field == "apartamentType"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].apartamentType;		
	};
	if (field == "petQuantity"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].petQuantity;		
	};
	if (field == "petType"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].petType;		
	};
	if (field == "parking"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].parking;		
	};
	if (field == "wifi"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].wifi;		
	};
	if (field == "peopleQuantity"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].peopleQuantity;		
	};
	if (field == "guest_01"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].guest_01;		
	};
	if (field == "guest_02"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].guest_02;		
	};
	if (field == "guest_03"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].guest_03;		
	};
	if (field == "guest_04"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].guest_04;		
	};
	if (field == "guest_05"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].guest_05;		
	};
	if (field == "agreeDebitSuite"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].agreeDebitSuite;		
	};
	if (field == "agreeSuite"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].agreeSuite;		
	};
	if (field == "agencyName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].agencyName;		
	};
	if (field == "schoolName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].schoolName;		
	};
					
	return "##erro";
};				

function setValueStudent (field, value, actualTrip, grava) {
	
	var objJson = JSON.parse(localStorage.getItem("student"));
	
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
		var array = value.split(",");
        objJson.documento.trips[actualTrip].mealPlan = array;
	};
	if (field == "specialDiet"){
		var array = value.split(",");
        objJson.documento.trips[actualTrip].specialDiet = array;
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
		var array = value.split(",");
        objJson.documento.trips[actualTrip].usuallyStudy = array;
	};
	if (field == "keepBedroom"){
		var array = value.split(",");
        objJson.documento.trips[actualTrip].keepBedroom = array;
	};
	if (field == "iAmUsually"){
		var array = value.split(",");
        objJson.documento.trips[actualTrip].iAmUsually = array;
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
	if (field == "agencyName"){
        objJson.documento.trips[actualTrip].agencyName = value;
	};
	if (field == "schoolName"){
        objJson.documento.trips[actualTrip].schoolName = value;
	};

	localStorage.setItem("student", JSON.stringify(objJson));
	
	if (grava){
		rest_atualizaStudent(JSON.parse(localStorage.getItem("student")), atualizacaoCampoEfetuada, atualizacaoCampoNaoEfetuada);
	}
};		

function carregaInclusao(data) { 	   	
	localStorage.studentExistente = "false";
};    

function carregaStudent(data) { 	
	
	localStorage.setItem("student", JSON.stringify(data));
};

function limpaStorageStudent () {
	
	var data  = JSON.parse(
			'{' +
			  '"documento" :' + 
			  	'{' +
				    '"lastDestination" : "",' +
				    '"mail" : "",' +
				    '"celPhone" : "",' +
				    '"phone" : "",' +
				    '"lastName" : "",' +
				    '"firstName" : "",' +
				    '"birthDay" : "",' +
				    '"gender" : "",' +
				    '"nationality" : "",' +
				    '"firstLanguage" : "",' +
				    '"profession" : "",' +
				    '"englishLevel" : "",' +
				    '"streetNumber" : "",' +
				    '"streetName" : "",' +
				    '"state" : "",' +
				    '"postalCode" : "",' +
				    '"city" : "",' +
				    '"country" : "",' +
				    '"secondaryTelephone" : "",' +
				    '"emergencyContactName" : "",' +
				    '"emergencyContactPhone" : "",' +
				    '"emergencyContactMail" : "",' +
				    '"actualTrip" : 0,' +
				    '"trips":' +
				    	'[' +
					    	'{' +
					    		'"status":"",' +
					    		'"destination":"",' +
					    		'"start":"",' +
					    		'"end":"",' +
					    		'"extend":"",' +
					    		'"arrivalDate":"",' +
					    		'"arrivalTime":"",' +
					    		'"flightNumber":"",' +
					    		'"flightDate":"",' +
					    		'"flightTime":"",' +
					    		'"airline":"",' +
					    		'"pickup":"",' +
					    		'"dropoff":"",' +
					    		'"accommodation":"",' +
					    		'"occupancy":"",' +
					    		'"guestName":"",' +
					    		'"relationship":"",' +
					    		'"mealPlan":[],' +
					    		'"specialDiet":[],' +
					    		'"privateWashroom":"",' +
					    		'"smoke":"",' +
					    		'"liveDogs":"",' +
					    		'"liveCats":"",' +
					    		'"hobbies":"",' +
					    		'"comments":"",' +
					    		'"medical":"",' +
					    		'"agreeTerm":"",' +
					    		'"usuallyStudy":[],' +
					    		'"keepBedroom":[],' +
					    		'"iAmUsually":[],' +
					    		'"creditCardType":"",' +
					    		'"creditCardNumber":"",' +
					    		'"creditCardExpire":"",' +
					    		'"creditCardCVC":"",' +
					    		'"agreeDebit":"",' +
					    		'"apartamentType":"",' +
					    		'"petsQuantity":"",' +
					    		'"petType":"",' +
					    		'"parking":"",' +
					    		'"wifi":"",' +
					    		'"peopleQuantity":"",' +
					    		'"guest_01":"",' +
					    		'"guest_02":"",' +
					    		'"guest_03":"",' +
					    		'"guest_04":"",' +
					    		'"guest_05":"",' +
					    		'"agreeDebitSuite":"",' +
					    		'"agreeSuite":"",' +
					    		'"agencyName":"",' +
					    		'"schoolName":""' +
					    	'}' +
					    ']' +
				'}' +
			'}'
	);

	localStorage.setItem("student", JSON.stringify(data));
};		

function retornaStudent(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Student updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("student"));
	window.location="student.html?mail=" + objJson.documento.mail; 
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
function emailEnviado(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Email sent</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
};
function emailComProblemas() {
	$.smallBox({
		title : "Error",
		content : "<i class='fa fa-clock-o'></i> <i>Email not sent</i>",
		color : "#ff8080",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
};
