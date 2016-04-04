/**
 * 
 */

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
    function carregaTela(data) {
    	
    	$("#celPhone").val(data.documento.celPhone);
    	$("#phone").val(data.documento.phone);
    	$("#mail").val(data.documento.mail);
    	$("#lastName").val(data.documento.lastName);
    	$("#firstName").val(data.documento.firstName);
    	$("#birthDay").val(data.documento.birthDay);
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
    	$("#occupancy").val(data.documento.trips[actualTrip].occupancy);
    	$("#guestName").val(data.documento.trips[actualTrip].guestName);
    	$("#relationship").val(data.documento.trips[actualTrip].relationship);
    	$("#mealPlan").val(data.documento.trips[actualTrip].mealPlan);
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

    function atualizacaoCampoEfetuada() {
    };
    function atualizacaoCampoNaoEfetuada() {
    };
    
