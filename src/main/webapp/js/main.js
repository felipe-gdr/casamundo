//
//*** 	botão genérico para voltar uma pagina
//
	$( ".getback" ).bind( "click", function() {
		parent.history.back();
		return false;
	});


/**
 * 
 */
function carregaTabelas(data) { 	
	
	localStorage.setItem("table", JSON.stringify(data));
	localStorage.carragendoTags = true;
};

function capturaData (data, separador) {
	
	return data.day() + separador + (data.month() + 1) + separador + data.year();
	 
};				
function capturaDataStandard (data, separador) {
	var dataBase = new Date(data);
	dataBase.setDate(dataBase.getDate() + 1);
	var dataBase = dataBase.getDate()  + "/" + dataBase.getMonth() + "/"  + dataBase.getFullYear();
	var dia = dataBase.split("/")[0];
	if (dia < 10 ){
		dia = "0" + dia.toString();
	};
	var mes = parseInt(dataBase.split("/")[1]) + 1;
	if (mes < 10 ){
		mes = "0" + mes.toString();
	}
	return (dia + separador + mes + separador + dataBase.split("/")[2]);
	 
};				
function capturaHoraStandard (data, separador) {
	var dataBase = new Date(data);
	var horaBase = dataBase.getHours()  + "/" + dataBase.getMinutes();
	var hora = horaBase.split("/")[0];
	if (hora < 10 ){
		hora = "0" + hora.toString();
	};
	var minuto = parseInt(horaBase.split("/")[1]);
	if (minuto < 10 ){
		minuto = "0" + minuto.toString();
	}
	return (hora + separador + minuto);
	 
};				
function separaData ( data, separador) {
	if (data){
		return data.slice(0,2) + separador + data.slice(2,4) + separador + data.slice(4,8);
	}else{
		return "Empty";
	}

	 
};				
function separaHora ( hora, separador) {
	if (hora){
		return hora.slice(0,2) + separador + hora.slice(2,4);		
	}else{
		return "Empty";
	}

	 
};				
function converteAnoMesDia (data) {
	
	return data.slice(4,8) + data.slice(2,4) + data.slice(0,2);
	 
};				

function calculaIdade ( dataNascimento ) {
	 var hoje = new Date();
	 
	 var arrayData = dataNascimento.split("/");
	 
	 var idade = 0;
	 if (arrayData.length == 3) {
	  // Decompoem a data em array
	  var ano = parseInt( arrayData[2] );
	  var mes = parseInt( arrayData[1] );
	  var dia = parseInt( arrayData[0] );
	  
	  // Valida a data informada
	  if ( arrayData[0] > 31 || arrayData[1] > 12 ) {
	   return idade;
	  }  
	  
	  ano = ( ano.length == 2 ) ? ano += 1900 : ano;

	  // Subtrai os anos das duas datas
	  idade = ( hoje.getYear()+1900 ) - ano;

	  // Subtrai os meses das duas datas
	  var meses = ( hoje.getMonth() + 1 ) - mes;
	  
	  // Se meses for menor que 0 entao nao cumpriu anos. Se for maior sim ja cumpriu
	  idade = ( meses < 0 ) ? idade - 1 : idade;    

	  meses = ( meses < 0 ) ? meses + 12 : meses;      

	  retorno = ( idade + " a " + meses + " m" );  
	 }   

	 return idade;
	};				
	function inclusaoEfetuada(mensagem) {
		$.smallBox({
			title : "Ok",
			content : "<i class='fa fa-clock-o'></i> <i>" + mensagem + "</i>",
			color : "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
		$(window.document.location).attr('href','students.html');
    };
	function inclusaoNaoEfetuada() {
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>An error occurred while recording , try again</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
    };
	function obtencaoNaoEfetuada() {
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>Record not found</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
    };
	function atualizacaoEfetuada() {
		$.smallBox({
			title : "Ok",
			content : "<i class='fa fa-clock-o'></i> <i>Student data atualized</i>",
			color : "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
		$(window.document.location).attr('href','students.html');
    };
	function atualizacaoNaoEfetuada() {
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>An error occurred while recording , try again</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
    };
    function option(value) {
    	return '<option value="' + value + '" selected="selected">' + value +'</option>';
    };
    function atualizacaoCampoEfetuada() {
    };
    function atualizacaoCampoNaoEfetuada() {
    };
    function semAcao() {
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
    	
    	if (grava){
    		rest_atualizaStudent(JSON.parse(localStorage.getItem("student")), atualizacaoCampoEfetuada, atualizacaoCampoNaoEfetuada);
    	}
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
    					    		'"mealPlan":"",' +
    					    		'"specialDiet":"",' +
    					    		'"privateWashroom":"",' +
    					    		'"smoke":"",' +
    					    		'"liveDogs":"",' +
    					    		'"liveCats":"",' +
    					    		'"hobbies":"",' +
    					    		'"comments":"",' +
    					    		'"medical":"",' +
    					    		'"agreeTerm":"",' +
    					    		'"usuallyStudy":"",' +
    					    		'"keepBedroom":"",' +
    					    		'"iAmUsually":"",' +
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
    					    		'"agreeSuite":""' +
    					    	'}' +
    					    ']' +
    				'}' +
    			'}'
    	);

    	localStorage.setItem("student", JSON.stringify(data));
    };		


    function limpaData(campo){
    	var campoNovo = "";
    	i = 0;
    	while (i < campo.length) {
    		if (campo.substring(i, (i + 1)) != "." && campo.substring(i, (i + 1)) != "/" && campo.substring(i, (i + 1)) != ":" && campo.substring(i, (i + 1)) != ")" && campo.substring(i, (i + 1)) != "(" && campo.substring(i, (i + 1)) != "-"){
    			campoNovo = campoNovo.toString() + campo.substring(i, (i + 1)).toString() 
    		};
    	    i++;
    	};
    	return campoNovo;
    }
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
    	$("#extend").val(data.documento.trips[actualTrip].extend);
    	$("#pickup").val(data.documento.trips[actualTrip].pickup);
    	$("#dropoff").val(data.documento.trips[actualTrip].dropoff);
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
    	$('#mealPlan').multiselect('select', ['3 meals', '3 meals']);    	
    	$("#specialDiet").val(data.documento.trips[actualTrip].specialDiet);
    	$("#privateWashroom").val(data.documento.trips[actualTrip].privateWashroom);
    	$("#smoke").val(data.documento.trips[actualTrip].smoke);
    	$("#liveDogs").val(data.documento.trips[actualTrip].liveDogs);
    	$("#liveCats").val(data.documento.trips[actualTrip].liveCats);
    	$("#hobbies").val(data.documento.trips[actualTrip].hobbies);
    	$("#medical").val(data.documento.trips[actualTrip].medical);
    	$("#comments").val(data.documento.trips[actualTrip].comments);
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
    	$("#parking").val(data.documento.trips[actualTrip].parking);
    	$("#wifi").val(data.documento.trips[actualTrip].wifi);
    	$("#peopleQuantity").val(data.documento.trips[actualTrip].peopleQuantity);
    	$("#guest_01").val(data.documento.trips[actualTrip].guest_01);
    	$("#guest_02").val(data.documento.trips[actualTrip].guest_02);
    	$("#guest_03").val(data.documento.trips[actualTrip].guest_03);
    	$("#guest_04").val(data.documento.trips[actualTrip].guest_04);
    	$("#guest_05").val(data.documento.trips[actualTrip].guest_05);
    	$("#agrreeDebitSuite").val(data.documento.trips[actualTrip].agrreeDebitSuite);
    	$("#agrreeSuite").val(data.documento.trips[actualTrip].agrreeSuite);
    	
    	localStorage.setItem("student", JSON.stringify(data));
    	localStorage.studentExistente = "true";
    };    
    function carregaInclusao(data) { 	   	
    	localStorage.studentExistente = "false";
    };    
    function carregaStudent(data) { 	
    	
    	localStorage.setItem("student", JSON.stringify(data));
    };
    function carregaTelaTabelas(data) { 	
    	
    	localStorage.setItem("table", JSON.stringify(data));
    	localStorage.carragendoTags = true;
    	
    	var table = JSON.parse(localStorage.getItem("table"));
    	
    	$.each(table.documento.nationality
    		    , function (i, optionValue) {
        			$("#nationality").append( $(option(optionValue)));
    		    });
        $.each(table.documento.mainPurposeTrip
    		    , function (i, optionValue) {
        			$("#mainPurposeTrip").append( $(option(optionValue)));
    		    });
        $.each(table.documento.englishLevel
    		    , function (i, optionValue) {
        			$("#englishLevel").append( $(option(optionValue)));
    		    });
        $.each(table.documento.state
    		    , function (i, optionValue) {
        			$("#state").append( $(option(optionValue)));
    		    });
        $.each(table.documento.city
    		    , function (i, optionValue) {
        			$("#city").append( $(option(optionValue)));
    		    });
        $.each(table.documento.country
    		    , function (i, optionValue) {
        			$("#country").append( $(option(optionValue)));
    		    });
        $.each(table.documento.firstLanguage
    		    , function (i, optionValue) {
        			$("#firstLanguage").append( $(option(optionValue)));
    		    });
        $.each(table.documento.status
    		    , function (i, optionValue) {
        			$("#status").append( $(option(optionValue)));
    		    });
        $.each(table.documento.destination
    		    , function (i, optionValue) {
        			$("#destination").append( $(option(optionValue)));
    		    });
        $.each(table.documento.accommodation
    		    , function (i, optionValue) {
        			$("#accommodation").append( $(option(optionValue)));
    		    });
        $.each(table.documento.occupancy
    		    , function (i, optionValue) {
        			$("#occupancy").append( $(option(optionValue)));
    		    });
        $.each(table.documento.relationship
    		    , function (i, optionValue) {
        			$("#relationship").append( $(option(optionValue)));
    		    });
        $.each(table.documento.mealPlan
    		    , function (i, optionValue) {
        			$("#mealPlan").append( $(option(optionValue)));
    		    });
        $.each(table.documento.usuallyStudy
    		    , function (i, optionValue) {
        			$("#usuallyStudy").append( $(option(optionValue)));
    		    });
        $.each(table.documento.keepBedroom
    		    , function (i, optionValue) {
        			$("#keepBedroom").append( $(option(optionValue)));
    		    });
        $.each(table.documento.iAmUsually
    		    , function (i, optionValue) {
        			$("#iAmUsually").append( $(option(optionValue)));
    		    });
        $.each(table.documento.creditCardType
    		    , function (i, optionValue) {
        			$("#creditCardType").append( $(option(optionValue)));
    		    });
        $.each(table.documento.apartamentType
    		    , function (i, optionValue) {
        			$("#apartamentType").append( $(option(optionValue)));
    		    });
        $.each(table.documento.specialDiet
    		    , function (i, optionValue) {
        			$("#specialDiet").append( $(option(optionValue)));
    		    });
        
        localStorage.carragendoTags = false;
    };    
        
