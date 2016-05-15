/**
 *	carrega variaveis do sistema 
 */

	localStorage.mapsCoordinate = "AIzaSyBtvFz034ClyfruthGGd4BCO0_I2iBZG3g";
	localStorage.mapsDistance = "AIzaSyCY4Bn4wcalIGk7D1N3HaSdoaqgcfrdNRE";
	localStorage.app = "casamundo";

	localStorage.urlServidor = window.location.hostname;

	// 	*** inicializar dados
	var data  = JSON.parse(
		'{' +
		  '"documento" :' + 
		  	'{' +
			    '"lastDestination" : "Toronto",' +
			    '"mail" : "amanda@gmail.com",' +
			    '"celPhone" : "01199456.4584",' +
			    '"phone" : "011994564584",' +
			    '"lastName" : "Ferreira",' +
			    '"firstName" : "Amanda",' +
			    '"birthDay" : "24031985",' +
			    '"gender" : "Female",' +
			    '"nationality" : "Brasilian",' +
			    '"firstLanguage" : "Portuguese",' +
			    '"profession" : "Student",' +
			    '"englishLevel" : "Beginner",' +
			    '"streetNumber" : "2133",' +
			    '"streetName" : "Rua 12 de Maio",' +
			    '"state" : "SP",' +
			    '"postalCode" : "04752200",' +
			    '"city" : "São Paulo",' +
			    '"country" : "Brasil",' +
			    '"secondaryTelephone" : "",' +
			    '"emergencyContactName" : "",' +
			    '"emergencyContactPhone" : "",' +
			    '"emergencyContactMail" : "",' +
			    '"actualTrip" : 0,' +
			    '"trips":' +
			    	'[' +
				    	'{' +
				    		'"status":"Confirmed",' +
				    		'"destination":"Toronto",' +
				    		'"start":"01042016",' +
				    		'"end":"10042016",' +
				    		'"extend":"No",' +
				    		'"arrivalDate":"01042016",' +
				    		'"arrivalTime":"1145",' +
				    		'"flightNumber":"0564",' +
				    		'"flightDate":"01042016",' +
				    		'"flightTime":"1145",' +
				    		'"airline":"Air Canadian",' +
				    		'"pickup":"Yes",' +
				    		'"dropoff":"No",' +
				    		'"accommodation":"Homestay",' +
				    		'"occupancy":"Couple",' +
				    		'"guestName":"Liz Ferreira",' +
				    		'"relationship":"Husband",' +
				    		'"mealPlan":"2 meals, 3 meals",' +
				    		'"specialDiet":"Halla, Vegetarian",' +
				    		'"privateWashroom":"No",' +
				    		'"smoke":"No",' +
				    		'"liveDogs":"Yes",' +
				    		'"liveCats":"Yes",' +
				    		'"hobbies":"Soccer, Chess and croosfit",' +
				    		'"comments":"No comments",' +
				    		'"medical":"None",' +
				    		'"agreeTerm":"Yes",' +
				    		'"usuallyStudy":"durmo, acordo ,durmodenovo",' +
				    		'"keepBedroom":"Toys",' +
				    		'"iAmUsually":"SleepEarly",' +
				    		'"creditCardType":"Amex",' +
				    		'"creditCardNumber":"123112311231",' +
				    		'"creditCardExpire":"032016",' +
				    		'"creditCardCVC":"356",' +
				    		'"agreeDebit":"Yes",' +
				    		'"apartamentType":"Studio",' +
				    		'"petsQuantity":"1",' +
				    		'"petType":"Dog",' +
				    		'"parking":"Yes",' +
				    		'"wifi":"Yes",' +
				    		'"peopleQuantity":"5",' +
				    		'"guest_01":"",' +
				    		'"guest_02":"",' +
				    		'"guest_03":"",' +
				    		'"guest_04":"",' +
				    		'"guest_05":"",' +
				    		'"agreeDebitSuite":"Yes",' +
				    		'"agreeSuite":"Yes",' +
				    		'"agencyName":"57003362506862044074260a",' +
				    		'"schoolName":"570033c4506862044074260b"' +
				    	'}' +
				    ']' +
			'}' +
		'}'
);
var students  = JSON.parse(
		'[' +
		  '{' +
		    '"lastDestination": "Toronto",' +
		    '"mailStudent": "amanda@gmail.com",' +
		    '"celPhoneStudent": "011994564584",' +
		    '"phoneStudent": "011994564584",' +
		    '"lastNameStudent": "Ferreira",' +
		    '"firstNameStudent": "Amanda",' +
		    '"birthDayStudent": "24031985",' +
		    '"genderStudent": "Female",' +
		    '"nationalityStudent": "Brasilian",' +
		    '"firstLanguageStudent": "Portuguese",' +
		    '"professionStudent": "Student",' +
		    '"englishLevelStudent": "Beginner",' +
		    '"streetNumberStudent": "2133",' +
		    '"streetNameStudent": "Rua 12 de Maio",' +
		    '"stateStudent": "SP",' +
		    '"postalCodeStudent": "04752200",' +
		    '"cityStudent": "São Paulo",' +
		    '"countryStudent": "Brasil",' +
		    '"secondaryTelephoneStudent": "",' +
		    '"emergencyContactNameStudent": "",' +
		    '"emergencyContactPhoneStudent": "",' +
		    '"emergencyContactMailStudent": "",' +
		    '"trip": {' +
		      '"status": "Confirmed",' +
		      '"destination": "Toronto",' +
		      '"start": "01042016",' +
		      '"end": "10042016",' +
		      '"extend": "No",' +
		      '"arrivalDate": "01042016",' +
		      '"arrivalTime": "1145",' +
		      '"flightNumber": "0564",' +
		      '"flightDate": "01042016",' +
		      '"flightTime": "1145",' +
		      '"airline": "Air Canadian",' +
		      '"pickup": "Yes",' +
		      '"dropoff": "No",' +
		      '"accommodation": "Homestay"' +
		    '},' +
		    '"agency": {' +
		      '"name": "Canada Destino",' +
		      '"nameConsult": "Saulo Oliveira",' +
		      '"celPhone": "011994564584",' +
		      '"phone": "011994564584",' +
		      '"email": "soliveira@canadadestino.com.br"' +
		    '},' +
		    '"school": {' +
		      '"name": "UFT",' +
		      '"nameContact": "John Andrews",' +
		      '"celPhone": "011994564584",' +
		      '"phone": "011994564584",' +
		      '"email": "andrews@uft.com.can"' +
		    '}' +
		  '}' +
		']'
		);

var table  = JSON.parse(
		'{' +
		  '"documento" : {' +
		        '"nationality" : ["Brasilian", "American","Canadian"],' +
		        '"mainPurposeTrip" : ["College/University", "ESL","University","Hogh School","Tourism"],' +
		        '"englishLevel" : ["Beginner", "Intermediate","Advanced"],' +
		        '"state" : ["SP", "RJ","MG"],' +
		        '"city" : ["São Paulo", "Campinas","Rio de Janeiro"],' +
		        '"country" : ["Brasil", "Colombia","Venezuela"],' +
		        '"firstLanguage" : ["Portuguese", "English","Spanish"],' +
		        '"status" : ["Available", "Confirmed","Placement offered","Terminated"],' +
		        '"destination" : ["Toronto", "Vancouver"],' +
		        '"accommodation" : ["Homestay", "Dorms","Suite"],' +
		        '"occupancy" : ["Single", "Twin", "Couple"],' +
		        '"relationship" : ["Husband", "Wife", "Brother","Sun", "Daughter"],' +
		        '"mealPlan" : ["3 meals","2 meals"],' +
		        '"usuallyStudy" : ["Math","Chemical"],' +
		        '"keepBedroom" : ["Book","Surf Board"],' +
		        '"iAmUsually" : ["Calm","Free"],' +
		        '"creditCardType" : ["Amex","Master Card","Visa"],' +
		        '"apartamentType" : ["Studio","1 bedroom","2 bedroomm"],' +
		        '"peopleQuantity" : ["1","2","3","4","5"],' +
		        '"specialDiet" : ["Vegetarian", "Halla", "Regular"]' +
		  '}' +
		'}'
);

localStorage.setItem("student", JSON.stringify(data));
//localStorage.setItem("students", JSON.stringify(students));
//localStorage.setItem("table", JSON.stringify(table));
