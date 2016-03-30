/**
 * 
 */
		    
$("#studentCompleteName").html(getValueStudent("firstNameStudent") + " " + getValueStudent("lastNameStudent"));


function getValueStudent (field, actualTrip) {
	if (field == "celPhoneStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.celPhoneStudent;			
	};
	if (field == "phoneStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.phoneStudent;			
	};
	if (field == "mailStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.mailStudent;			
	};
	if (field == "lastNameStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.lastNameStudent;			
	};
	if (field == "firstNameStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.firstNameStudent;			
	};
	if (field == "birthDayStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.birthDayStudent;			
	};
	if (field == "genderStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.genderStudent;			
	};
	if (field == "nationalityStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.nationalityStudent;			
	};
	if (field == "firstLanguageStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.firstLanguageStudent;			
	};
	if (field == "professionStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.professionStudent;			
	};
	if (field == "englishLevelStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.englishLevelStudent;			
	};
	if (field == "streetNumberStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.streetNumberStudent;			
	};
	if (field == "streetNameStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.streetNameStudent;			
	};
	if (field == "stateStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.stateStudent;			
	};
	if (field == "postalCodeStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.postalCodeStudent;			
	};
	if (field == "cityStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.cityStudent;			
	};
	if (field == "countryStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.countryStudent;			
	};
	if (field == "secondaryTelephoneStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.secondaryTelephoneStudent;			
	};
	if (field == "emergencyContactNameStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.emergencyContactNameStudent;			
	};
	if (field == "emergencyContactPhoneStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.emergencyContactPhoneStudent;			
	};
	if (field == "emergencyContactMailStudent"){
        var objJson = JSON.parse(localStorage.getItem("student"));
        return objJson.documento.emergencyContactMailStudent;			
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
	if (field == "celPhoneStudent"){
        objJson.documento. celPhoneStudent = value;
	};
	if (field == "phoneStudent"){
        objJson.documento.phoneStudent = value;
	};
	if (field == "mailStudent"){
        objJson.documento.mailStudent = value;
	};
	if (field == "lastNameStudent"){
        objJson.documento.lastNameStudent = value;
	};
	if (field == "firstNameStudent"){
        objJson.documento.firstNameStudent = value;
	};
	if (field == "birthDayStudent"){
        objJson.documento.birthDayStudent = value;
	};
	if (field == "genderStudent"){
        objJson.documento.genderStudent = value;
	};
	if (field == "nationalityStudent"){
        objJson.documento.nationalityStudent = value;
	};
	if (field == "firstLanguageStudent"){
        objJson.documento.firstLanguageStudent = value;
	};
	if (field == "professionStudent"){
        objJson.documento.professionStudent = value;
	};
	if (field == "englishLevelStudent"){
        objJson.documento.englishLevelStudent = value;
	};
	if (field == "streetNumberStudent"){
        objJson.documento.streetNumberStudent = value;
	};
	if (field == "streetNameStudent"){
        objJson.documento.streetNameStudent = value;
	};
	if (field == "stateStudent"){
        objJson.documento.stateStudent = value;
	};
	if (field == "postalCodeStudent"){
        objJson.documento.postalCodeStudent = value;
	};
	if (field == "cityStudent"){
        objJson.documento.cityStudent = value;
	};
	if (field == "countryStudent"){
        objJson.documento.countryStudent = value;
	};
	if (field == "secondaryTelephoneStudent"){
        objJson.documento.secondaryTelephoneStudent = value;
	};
	if (field == "emergencyContactNameStudent"){
        objJson.documento.emergencyContactNameStudent = value;
	};
	if (field == "emergencyContactPhoneStudent"){
        objJson.documento.emergencyContactPhoneStudent = value;
	};
	if (field == "emergencyContactMailStudent"){
        objJson.documento.emergencyContactMailStudent = value;
	};
	if (field == "status"){
        objJson.documento.trip[actualTrip].status = value;
	};
	if (field == "destination"){
        objJson.documento.trip[actualTrip].destination = value;
	};
	if (field == "start"){
        objJson.documento.trip[actualTrip].start = value;
	};
	if (field == "end"){
        objJson.documento.trip[actualTrip].end = value;
	};
	if (field == "arrivalDate"){
        objJson.documento.trip[actualTrip].arrivalDate = value;
	};
	if (field == "arrivalTime"){
        objJson.documento.trip[actualTrip].arrivalTime = value;
	};
	if (field == "flightNumber"){
        objJson.documento.trip[actualTrip].flightNumber = value;
	};
	if (field == "flightDate"){
        objJson.documento.trip[actualTrip].flightDate = value;
	};
	if (field == "flightTime"){
        objJson.documento.trip[actualTrip].flightTime = value;
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
