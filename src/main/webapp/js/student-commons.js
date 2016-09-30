 
 function carregaMapa (results) {
	$('#streetName').val(results[0].formatted_address);
	$('.addressMap').removeClass("hide");
	generate_map_6(results[0].geometry.location.lat(), results[0].geometry.location.lng());	
	$('#latitude').val(results[0].geometry.location.lat());
	$('#longitude').val(results[0].geometry.location.lng());
};

function enderecoComErro (data) {
	$('.addressMap').addClass("hide");		
};

    
function carregaTela(data) {
    	
	var actualTrip = data.documento.actualTrip;	
	
	$("#studentCompleteName").html(getValueStudent("firstName") + " " + getValueStudent("lastName"));
	$("#firstName").val(data.documento.firstName);
	$("#secondName").val(data.documento.secondName);
	$("#lastName").val(data.documento.lastName);
	$("#celPhone").val(data.documento.celPhone);
	$("#phone").val(data.documento.phone);
	$("#mail").val(data.documento.mail);
	$("#birthDay").val(separaDataMes(data.documento.birthDay, "-"));
	$("#age").html(calculaIdade(separaConverteDataMes(data.documento.birthDay, "/")));
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
	$("#complement").val(data.documento.complement);
	$("#latitude").val(data.documento.latitude);
	$("#longitude").val(data.documento.longitude);

	// ** carrega mapa endereco
	generate_map_6(data.documento.latitude, data.documento.longitude);
	$('.addressMap').removeClass("hide");

	$("#secondaryTelephone").val(data.documento.secondaryTelephone);
	$("#emergencyContactName").val(data.documento.emergencyContactName);
	$("#emergencyContactPhone").val(data.documento.emergencyContactPhone);
	$("#emergencyContactMail").val(data.documento.emergencyContactMail);
	$("#emergencyContactRelationship").val(data.documento.emergencyContactRelationship);
	$("#photoPassport").val(data.documento.photoPassport);
	if (data.documento.photoPassport){
		carregaPhoto (localStorage.app, data.documento.photoPassport, "photoPassport");
	};
	$("#status").val(data.documento.trips[actualTrip].status);
	$("#destination").val(data.documento.trips[actualTrip].destination);
	$("#start").val(separaDataMes(data.documento.trips[actualTrip].start, "-"));
	$("#end").val(separaDataMes(data.documento.trips[actualTrip].end, "-"));
	$("#arrivalDate").val(separaDataMes(data.documento.trips[actualTrip].arrivalDate, "-"));
	$("#arrivalTime").val(data.documento.trips[actualTrip].arrivalTime);
	$("#arrivalFlightNumber").val(data.documento.trips[actualTrip].arrivalFlightNumber);
	$("#arrivalAirline").val(data.documento.trips[actualTrip].arrivalAirline);
	$("#departureDate").val(separaDataMes(data.documento.trips[actualTrip].departureDate, "-"));
	$("#departureTime").val(data.documento.trips[actualTrip].departureTime);
	$("#departureFlightNumber").val(data.documento.trips[actualTrip].departureFlightNumber);
	$("#departureAirline").val(data.documento.trips[actualTrip].departureAirline);
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
	$("#familyName").val(data.documento.trips[actualTrip].familyName);
	$("#status").val(data.documento.trips[actualTrip].status);
	$("#guestName").val(data.documento.trips[actualTrip].guestName);
	$("#guestEmail").val(data.documento.trips[actualTrip].guestEmail);
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
	if (data.documento.trips[actualTrip].liveWithChildren == "Yes"){
		$("#liveChildren").prop("checked", true)
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
		rest_obterAgency (data.documento.trips[actualTrip].agencyName, carregaDadosAgency, semAcao, false, data.documento.trips[actualTrip].agencyConsultName)
	};
	$("#agencyConsultName").val(data.documento.trips[actualTrip].agencyConsultName);
	
	if (data.documento.trips[actualTrip].schoolName){
		$(".school").addClass("hide");
		rest_obterSchool (data.documento.trips[actualTrip].schoolName, carregaDadosSchool, semAcao, false, data.documento.trips[actualTrip].schoolConsultName)
	};
	$("#schoolConsultName").val(data.documento.trips[actualTrip].schoolConsultName);

	localStorage.setItem("student", JSON.stringify(data));
	localStorage.studentExistente = "true";
};    

function carregaDadosAgency(data, consult, consultName) {
	localStorage.setItem("agency", JSON.stringify(data));
	if (consult){
		$("#agencyName").html(data.documento.name);
	}else{
		$("#agencyName").val(data.documento.name);
	};
    $.each(data.documento.consultants, function (i, consultants) {
    	if (consultants.name == consultName){
    		$("#agencyConsultMobile").html(consultants.celPhone);
    		$("#agencyConsultPhone").html(consultants.phone);
    		$("#agencyConsultEmail").html(consultants.email);
    		$("#agencyConsultName").html(consultants.name);
    	};
    	if (!consult){
    		$("#agencyConsultName").append( $(option(consultants.name)));
    	};
    });
	$("#agencyPhone").html(data.documento.agencyPhone);
	$("#agencyEmail").html(data.documento.agencyEmail);
	$(".agency").removeClass("hide");
};

function carregaDadosSchool(data, consult, consultName) {
	localStorage.setItem("school", JSON.stringify(data));
	if (consult){
		$("#schoolName").html(data.documento.name);	
	}else{
		$("#schoolName").val(data.documento.name);
	};
	$("#schoolPhone").html(data.documento.phone);
	$("#schoolEmail").html(data.documento.email);
	$("#schoolAddress").html(data.documento.address);
    $.each(data.documento.consultants, function (i, consultants) {
    	if (consultants.name == consultName){
    		$("#schoolConsultMobile").html(consultants.celPhone);
    		$("#schoolConsultPhone").html(consultants.phone);
    		$("#schoolConsultEmail").html(consultants.email);
    	};
    	$("#schoolConsultName").append( $(option(consultants.name)));
    });
	$(".school").removeClass("hide");
	generate_map_7(data.documento.latitude, data.documento.longitude);
	localStorage.latitudeSchool = data.documento.latitude;
	localStorage.longitudeSchool = data.documento.longitude;
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
	if (field == "secondName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.secondName;			
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
	if (field == "complement"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.complement;			
	};
	if (field == "latitude"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.latitude;			
	};
	if (field == "longitude"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.longitude;			
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
	if (field == "emergencyContactRelationship"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.emergencyContactRelationship;			
	};
	if (field == "actualTrip"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.actualTrip;			
	};
	if (field == "photoPassport"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.photoPassport;			
	};
	if (field == "status"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].status;		
	};
	if (field == "destination"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].destination;		
	};
	if (field == "familyName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].familyName;		
	};
	if (field == "status"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].status;		
	};
	if (field == "contactFamilyName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].familyName;		
	};
	if (field == "contactName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        if (objJson.contact){
        	return objJson.contact.firstName + " " + objJson.contact.lastName;
        }else{
        	return "";
        };
	};
	if (field == "contactGender"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        if (objJson.contact){
        	return objJson.contact.gender;
        }else{
        	return "";
        };
	};
	if (field == "contactEmail"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        if (objJson.contact){
        	return objJson.contact.email;
        }else{
        	return "";
        };
	};
	if (field == "contactPhone"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        if (objJson.contact){
        	return objJson.contact.phone;
        }else{
        	return "";
        };
	};
	if (field == "contactMobilePhone"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        if (objJson.contact){
        	return objJson.contact.mobilePhone;
        }else{
        	return "";
        };
	};
	if (field == "roomData"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        if (objJson.rooms){
        	var jsonRoom;
            $.each(objJson.rooms, function (i, room) {
                $.each(room.occupancySingleBed, function (i, occupancy) {
                	if (occupancy.emailStudent == objJson.documento.mail){
                		jsonRoom = 
                			{
                				number:room.number,
                				singleBed:room.singleBed,
                				coupleBed:room.coupleBed,
                				note:room.note,
                				startOccupancy:occupancy.startOccupancy,
                				endOccupancy:occupancy.endOccupancy,
                				studentOccupancy:"single"
                			};
                	};
                });            	
                $.each(room.occupancyCoupleBed, function (i, occupancy) {
                	if (occupancy.emailStudent == objJson.documento.mail){
                		jsonRoom = 
                			{
                				number:room.number,
                				singleBed:room.singleBed,
                				coupleBed:room.coupleBed,
                				note:room.note,
                				startOccupancy:occupancy.startOccupancy,
                				endOccupancy:occupancy.endOccupancy,
                				studentOccupancy:"couple"
                			};
                	};
                });            	
            });
    		return jsonRoom;
        }else{
        	return "";
        };
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
	if (field == "arrivalFlightNumber"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].arrivalFlightNumber;		
	};
	if (field == "arrivalAirline"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].arrivalAirline;			
	};
	if (field == "departureDate"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].departureDate;		
	};
	if (field == "departureTime"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].departureTime;		
	};
	if (field == "departureFlightNumber"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].departureFlightNumber;		
	};
	if (field == "departureAirline"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].departureAirline;			
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
	if (field == "guestEmail"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].guestEmail;		
	};
	if (field == "relationship"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].relationship;		
	};
	if (field == "mealPlan"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        var mealPlan ="";
        var comma = "";
        $.each(objJson.documento.trips[actualTrip].mealPlan, function (i, meals) {
        	mealPlan = mealPlan + comma + meals;
        	comma = ", ";
        });
        return mealPlan;
	};
	if (field == "specialDiet"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        var specialDiet ="";
        var comma = "";
        $.each(objJson.documento.trips[actualTrip].specialDiet, function (i, diets) {
        	specialDiet = specialDiet + comma + diets;
        	comma = ", ";
        });
        return specialDiet;
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
	if (field == "liveWithChildren"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].liveWithChildren;		
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
	if (field == "agencyConsultName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].agencyConsultName;		
	};
	if (field == "schoolName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].schoolName;		
	};
	if (field == "schoolConsultName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].schoolConsultName;		
	};
	if (field == "mainPurposeTrip"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trips[actualTrip].mainPurposeTrip;		
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
	if (field == "secondName"){
        objJson.documento.secondName = value;
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
	if (field == "complement"){
        objJson.documento.complement = value;
	};
	if (field == "latitude"){
        objJson.documento.latitude = value;
	};
	if (field == "longitude"){
        objJson.documento.longitude = value;
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
	if (field == "emergencyContactRelationship"){
        objJson.documento.emergencyContactRelationship = value;
	};
	if (field == "emergencyContactRelationship"){
        objJson.documento.emergencyContactRelationship = value;
	};
	if (field == "photoPassport"){
        objJson.documento.photoPassport = value;
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
	if (field == "arrivalFlightNumber"){
        objJson.documento.trips[actualTrip].arrivalFlightNumber = value;
	};
	if (field == "arrivalAirline"){
        objJson.documento.trips[actualTrip].arrivalAirline = value;
	};
	if (field == "departureDate"){
        objJson.documento.trips[actualTrip].departureDate = limpaData(value);
	};
	if (field == "departureTime"){
        objJson.documento.trips[actualTrip].departureTime = limpaData(value);
	};
	if (field == "departureFlightNumber"){
        objJson.documento.trips[actualTrip].departureFlightNumber = value;
	};
	if (field == "departureAirline"){
        objJson.documento.trips[actualTrip].departureAirline = value;
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
	if (field == "familyName"){
        objJson.documento.trips[actualTrip].familyName = value;
	};
	if (field == "status"){
        objJson.documento.trips[actualTrip].status = value;
	};
	if (field == "guestName"){
        objJson.documento.trips[actualTrip].guestName = value;
	};
	if (field == "guestEmail"){
        objJson.documento.trips[actualTrip].guestEmail = value;
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
	if (field == "liveWithChildren"){
        objJson.documento.trips[actualTrip].liveWithChildren = value;
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
	if (field == "agencyConsultName"){
        objJson.documento.trips[actualTrip].agencyConsultName = value;
	};
	if (field == "schoolName"){
        objJson.documento.trips[actualTrip].schoolName = value;
	};
	if (field == "schoolConsultName"){
        objJson.documento.trips[actualTrip].schoolConsultName = value;
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
//	
//*** setar datas do modal
//	
	date = separaConverteDataMes(objJson.documento.trips[actualTrip].start, "/").split("/");
	var start = new Date(date[1]+"/"+date[0]+"/"+date[2]);
	date = separaConverteDataMes(objJson.documento.trips[actualTrip].end, "/").split("/");
	var end = new Date(date[1]+"/"+date[0]+"/"+date[2]);
	$('#bedAllocationStart').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		maxDate: end,
		minDate: start,		
		onSelect : function(selectedDate) {
			$('#bedAllocationEnd').datepicker('option', 'minDate', selectedDate);
			}
		});

	$('#bedAllocationEnd').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		maxDate: end,
		minDate: start,		
		onSelect : function(selectedDate) {
//			$('#bedAllocationStart').datepicker('option', 'minDate', selectedDate);
			}
		});
	
	
};

function limpaStorageStudent () {
	
	var data  = 
			{ 
			  documento :  
			  	{ 
				    lastDestination : "", 
				    mail : "", 
				    celPhone : "", 
				    phone : "", 
				    lastName : "", 
				    firstName : "", 
				    secondName : "", 
				    birthDay : "", 
				    gender : "", 
				    nationality : "", 
				    firstLanguage : "", 
				    profession : "", 
				    englishLevel : "", 
				    streetNumber : "", 
				    streetName : "", 
				    state : "", 
				    postalCode : "", 
				    city : "", 
				    country : "", 
				    complement : "", 
				    secondaryTelephone : "", 
				    emergencyContactName : "", 
				    emergencyContactPhone : "", 
				    emergencyContactMail : "", 
				    emergencyContactRelationship : "", 
				    actualTrip : 0, 
				    photoPassport : "", 
				    trips: 
				    	[ 
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
					    ] 
				} 
			};

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
    var objJson = JSON.parse(localStorage.getItem("student"));
    delete objJson["contact"];
    var actualTrip = objJson.documento.actualTrip;
    objJson.documento.trips[actualTrip].status = "Offered";
	delete objJson.contact;
	delete objJson.rooms;
	delete objJson.family;
	rest_atualizaStudent(objJson, semAcao, semAcao);
	
	// *** refresh students list
	$(window.document.location).attr('href','students.html');

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
