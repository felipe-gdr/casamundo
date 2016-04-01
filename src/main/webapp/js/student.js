/**
 * 
 */
		    
$("#studentCompleteName").html(getValueStudent("firstName") + " " + getValueStudent("lastName"));


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
        return objJson.documento.trip[actualTrip].status;		
	};
	if (field == "destination"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].destination;		
	};
	if (field == "start"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].start;		
	};
	if (field == "end"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].end;		
	};
	if (field == "arrivalDate"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].arrivalDate;		
	};
	if (field == "arrivalTime"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].arrivalTime;		
	};
	if (field == "flightDate"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].flightDate;		
	};
	if (field == "flightNumber"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].flightNumber;		
	};
	if (field == "flightTime"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].flightTime;		
	};
	if (field == "airline"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].airline;			
	};
	if (field == "extend"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].extend;		
	};
	if (field == "pickup"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].pickup;		
	};
	if (field == "dropoff"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].dropoff;		
	};
	if (field == "accommodation"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].accommodation;		
	};
	if (field == "occupancy"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].occupancy;		
	};
	if (field == "guestName"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].guestName;		
	};
	if (field == "relationship"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].relationship;		
	};
	if (field == "mealPlan"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].mealPlan;		
	};
	if (field == "specialDiet"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].specialDiet;		
	};
	if (field == "privateWashroom"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].privateWashroom;		
	};
	if (field == "smoke"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].smoke;		
	};
	if (field == "liveDogs"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].liveDogs;		
	};
	if (field == "liveCats"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].liveCats;		
	};
	if (field == "hobbies"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].hobbies;		
	};
	if (field == "medical"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].medical;		
	};
	if (field == "comments"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].comments;		
	};
	if (field == "agreeTerm"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].agreeTerm;		
	};
	if (field == "usuallyStudy"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].usuallyStudy;		
	};
	if (field == "keepBedroom"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].keepBedroom;		
	};
	if (field == "iAmUsually"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].iAmUsually;		
	};
	if (field == "creditCardType"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].creditCardType;		
	};
	if (field == "creditCardNumber"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].creditCardNumber;		
	};
	if (field == "creditCardExpire"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].creditCardExpire;		
	};
	if (field == "creditCardCVC"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].creditCardCVC;		
	};
	if (field == "agreeDebit"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].agreeDebit;		
	};
	if (field == "apartamentType"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].apartamentType;		
	};
	if (field == "petQuantity"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].petQuantity;		
	};
	if (field == "petType"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].petType;		
	};
	if (field == "parking"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].parking;		
	};
	if (field == "wifi"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].wifi;		
	};
	if (field == "peopleQuantity"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].peopleQuantity;		
	};
	if (field == "guest_01"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].guest_01;		
	};
	if (field == "guest_02"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].guest_02;		
	};
	if (field == "guest_03"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].guest_03;		
	};
	if (field == "guest_04"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].guest_04;		
	};
	if (field == "guest_05"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].guest_05;		
	};
	if (field == "agreeDebitSuite"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].agreeDebitSuite;		
	};
	if (field == "agreeSuite"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.trip[actualTrip].agreeSuite;		
	};
					
	return "##erro";
};				

function setValueStudent (field, value, actualTrip) {
	
	var objJson = JSON.parse(localStorage.getItem("student"));
	
	if (field == "celPhone"){
        objJson.documento.celPhone = value;
	};
	if (field == "phone"){
        objJson.documento.phone = value;
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
        objJson.documento.secondaryTelephone = value;
	};
	if (field == "emergencyContactName"){
        objJson.documento.emergencyContactName = value;
	};
	if (field == "emergencyContactPhone"){
        objJson.documento.emergencyContactPhone = value;
	};
	if (field == "emergencyContactMail"){
        objJson.documento.emergencyContactMail = value;
	};
	if (field == "status"){
        objJson.documento.trip[actualTrip].status = value;
	};
	if (field == "destination"){
        objJson.documento.trip[actualTrip].destination = value;
	};
	if (field == "start"){
        objJson.documento.trip[actualTrip].start = limpaData(value);
	};
	if (field == "end"){
        objJson.documento.trip[actualTrip].end = limpaData(value);
	};
	if (field == "arrivalDate"){
        objJson.documento.trip[actualTrip].arrivalDate = limpaData(value);
	};
	if (field == "arrivalTime"){
        objJson.documento.trip[actualTrip].arrivalTime = limpaData(value);
	};
	if (field == "flightNumber"){
        objJson.documento.trip[actualTrip].flightNumber = value;
	};
	if (field == "flightDate"){
        objJson.documento.trip[actualTrip].flightDate = limpaData(value);
	};
	if (field == "flightTime"){
        objJson.documento.trip[actualTrip].flightTime = limpaData(value);
	};
	if (field == "airline"){
        objJson.documento.trip[actualTrip].airline = value;
	};
	if (field == "extend"){
        objJson.documento.trip[actualTrip].extend = value;
	};
	if (field == "pickup"){
        objJson.documento.trip[actualTrip].pickup = value;
	};
	if (field == "dropoff"){
        objJson.documento.trip[actualTrip].dropoff = value;
	};
	if (field == "accommodation"){
        objJson.documento.trip[actualTrip].accommodation = value;
	};
	if (field == "occupancy"){
        objJson.documento.trip[actualTrip].occupancy = value;
	};
	if (field == "guestName"){
        objJson.documento.trip[actualTrip].guestName = value;
	};
	if (field == "relationship"){
        objJson.documento.trip[actualTrip].relationship = value;
	};
	if (field == "mealPlan"){
        objJson.documento.trip[actualTrip].mealPlan = value;
	};
	if (field == "specialDiet"){
        objJson.documento.trip[actualTrip].specialDiet = value;
	};
	if (field == "privateWashroom"){
        objJson.documento.trip[actualTrip].privateWashroom = value;
	};
	if (field == "smoke"){
        objJson.documento.trip[actualTrip].smoke = value;
	};
	if (field == "liveDogs"){
        objJson.documento.trip[actualTrip].liveDogs = value;
	};
	if (field == "liveCats"){
        objJson.documento.trip[actualTrip].liveCats = value;
	};
	if (field == "hobbies"){
        objJson.documento.trip[actualTrip].hobbies = value;
	};
	if (field == "medical"){
        objJson.documento.trip[actualTrip].medical = value;
	};
	if (field == "comments"){
        objJson.documento.trip[actualTrip].comments = value;
	};
	if (field == "agreeTerm"){
        objJson.documento.trip[actualTrip].agreeTerm = value;
	};
	if (field == "usuallyStudy"){
        objJson.documento.trip[actualTrip].usuallyStudy = value;
	};
	if (field == "keepBedroom"){
        objJson.documento.trip[actualTrip].keepBedroom = value;
	};
	if (field == "iAmUsually"){
        objJson.documento.trip[actualTrip].iAmUsually = value;
	};
	if (field == "creditCardType"){
        objJson.documento.trip[actualTrip].creditCardType = value;
	};
	if (field == "creditCardNumber"){
        objJson.documento.trip[actualTrip].creditCardNumber = value;
	};
	if (field == "creditCardExpire"){
        objJson.documento.trip[actualTrip].creditCardExpire = value;
	};
	if (field == "creditCardCVC"){
        objJson.documento.trip[actualTrip].creditCardCVC = value;
	};
	if (field == "agreeDebit"){
        objJson.documento.trip[actualTrip].agreeDebit = value;
	};
	if (field == "apartamentType"){
        objJson.documento.trip[actualTrip].apartamentType = value;
	};
	if (field == "petQuantity"){
        objJson.documento.trip[actualTrip].petQuantity = value;
	};
	if (field == "petType"){
        objJson.documento.trip[actualTrip].petType = value;
	};
	if (field == "parking"){
        objJson.documento.trip[actualTrip].parking = value;
	};
	if (field == "wifi"){
        objJson.documento.trip[actualTrip].wifi = value;
	};
	if (field == "peopleQuantity"){
        objJson.documento.trip[actualTrip].peopleQuantity = value;
	};
	if (field == "guest_01"){
        objJson.documento.trip[actualTrip].guest_01 = value;
	};
	if (field == "guest_02"){
        objJson.documento.trip[actualTrip].guest_02 = value;
	};
	if (field == "guest_03"){
        objJson.documento.trip[actualTrip].guest_03 = value;
	};
	if (field == "guest_04"){
        objJson.documento.trip[actualTrip].guest_04 = value;
	};
	if (field == "guest_05"){
        objJson.documento.trip[actualTrip].guest_05 = value;
	};
	if (field == "agrreeDebitSuite"){
        objJson.documento.trip[actualTrip].agrreeDebitSuite = value;
	};
	if (field == "agrreeSuite"){
        objJson.documento.trip[actualTrip].agrreeSuite = value;
	};

	localStorage.setItem("student", JSON.stringify(objJson));
};		


function limpaData(campo){
	var campoNovo = "";
	i = 0;
	while (i < campo.length) {
		if (campo.substring(i, (i + 1)) != "." && campo.substring(i, (i + 1)) != "/" && campo.substring(i, (i + 1)) != ":"){
			campoNovo = campoNovo.toString() + campo.substring(i, (i + 1)).toString() 
		};
	    i++;
	};
	return campoNovo;
}
