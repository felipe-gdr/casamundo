//
//*** 	limpar variáveis globais
//
	var url   = window.location.search.replace();
	localStorage.nextWindow = "";
	localStorage.actualUrl = url;
//
//*** 	botão genérico para voltar uma pagina
//
	$( ".getback" ).bind( "click", function() {
		parent.history.back();
		return false;
	});

	if (localStorage.usuarioPerfil == "caretaker"){
		$("#asideMenu").append(lineMenuAside ("menuHomestay", "students.html?accommodation=Homestay", "Homestay"));
		$("#asideMenu").append(lineMenuAside ("menuShare", "students.html?accommodation=Dorms", "Share"));
		$("#asideMenu").append(lineMenuAside ("menuFamilies", "families.html", "Families"));
		$("#asideMenu").append(lineMenuAside ("menuDorms", "dorms.html", "Dorms"));
		$("#asideMenu").append(lineMenuAside ("menuAdministrator", "administrator.html", "Administrator"));
		$("#asideMenu").parent().find('ul').slideToggle();
	}; 
	if (localStorage.usuarioPerfil == "user"){
		$("#asideMenu").append(lineMenuAside ("menuHomestay", "students.html?accommodation=Homestay", "Homestay"));
		$("#asideMenu").append(lineMenuAside ("menuShare", "students.html?accommodation=Dorms", "Share"));
		$("#asideMenu").append(lineMenuAside ("menuFamilies", "families.html", "Families"));
		$("#asideMenu").append(lineMenuAside ("menuAdministrator", "administrator.html", "Administrator"));
		$("#asideMenu").parent().find('ul').slideToggle();
	}; 
	if (localStorage.usuarioPerfil == "agency"){
		$("#asideMenu").append(lineMenuAside ("menuAgency", "agency.html", "Agency"));
		$("#asideMenu").parent().find('ul').slideToggle();
	}; 
	if (localStorage.usuarioPerfil == "administrator"){
		$("#asideMenu").append(lineMenuAside ("menuHomestay", "students.html?accommodation=Homestay", "Homestay"));
		$("#asideMenu").append(lineMenuAside ("menuShare", "students.html?accommodation=Dorms", "Share"));
		$("#asideMenu").append(lineMenuAside ("menuFamilies", "families.html", "Families"));
		$("#asideMenu").append(lineMenuAside ("menuDorms", "dorms.html", "Buildings"));
		$("#asideMenu").append(lineMenuAside ("menuAdministrator", "administrator.html", "Administrator"));
		$("#asideMenu").append(lineMenuAside ("menuFinance", "prices-table.html", "Price List"));
		$("#asideMenu").append(lineMenuAside ("menuInvoice", "invoices.html", "Invoices"));
		$("#asideMenu").append(lineMenuAside ("menuPayment", "payments.html", "Payments"));
		$("#asideMenu").parent().find('ul').slideToggle();
	}; 
	if (localStorage.usuarioPerfil == "tools"){
		$("#asideMenu").append(lineMenuAside ("menuHomestay", "students.html?accommodation=Homestay", "Homestay"));
		$("#asideMenu").append(lineMenuAside ("menuShare", "students.html?accommodation=Dorms", "Share"));
		$("#asideMenu").append(lineMenuAside ("menuFamilies", "families.html", "Families"));
		$("#asideMenu").append(lineMenuAside ("menuDorms", "dorms.html", "Buildings"));
		$("#asideMenu").append(lineMenuAside ("menuAdministrator", "administrator.html", "Administrator"));
		$("#asideMenu").append(lineMenuAside ("menuFinance", "prices-table.html", "Price List"));
		$("#asideMenu").append(lineMenuAside ("menuInvoice", "invoices.html", "Invoices"));
		$("#asideMenu").append(lineMenuAside ("menuPayment", "payments.html", "Payments"));
		$("#asideMenu").append(lineMenuAside ("carregaStudents", "#", "Carrega Students"));
		$("#asideMenu").append(lineMenuAside ("atualizaIdsStudents", "#", "Atualiza id Students"));
		$("#asideMenu").parent().find('ul').slideToggle();
	}; 
	if (localStorage.usuarioPerfil == "student"){
		$("#asideMenu").append(lineMenuAside ("menuStudent", "student.html", "Student"));
		$("#asideMenu").parent().find('ul').slideToggle();
	}; 
	if (localStorage.usuarioPerfil == "family"){
		$("#asideMenu").append(lineMenuAside ("menuFamily", "family.html", "Family"));
		$("#asideMenu").parent().find('ul').slideToggle();
	}; 
	// ** tirar menu caretaker por hora
	$("#menuCaretaker").addClass ("hide");

	//
	//***   carrega base estudantes
	//
	$( "#carregaStudents" ).on( "click", function() {
		carregaStudents();
	});
	//
	//***   atualiza id estudantes
	//
	$( "#atualizaIdsStudents" ).on( "click", function() {
		atualizaIdsStudents();
	});

	
	$("#usuarioNome").html(localStorage.usuarioFirstName);

	function executaLogin(email, senha) {

		rest_obterUsuario(email, usuarioOk, usuarioFail, senha)

	};
	
	function lineMenuAside (id, url, label){

		return '<li id="' + id + '_li" class=""><a id="' + id + '" href="' + url +'" title="' + label + '"><span class="menu-item-parent">' + label + '</span></a></li>'

	};
	function usuarioOk (data, senha){

		if (data.documento.password == senha){
			localStorage.usuarioEmail = data.documento.email;
			localStorage.usuarioFirstName = data.documento.firstName;
			localStorage.usuarioLastName = data.documento.lastName;
			localStorage.usuarioPerfil = data.documento.perfil;
			localStorage.usuarioCity = data.documento.city;
			localStorage.usuarioGender = data.documento.gender;
			localStorage.loginOk = true;
			switch(localStorage.usuarioPerfil) {
		    case "administrator":
				$(window.document.location).attr('href','students.html?accommodation=Homestay');
		        break;
		    case "tools":
		    	$(window.document.location).attr('href','students.html?accommodation=Homestay');
		        break;
		    case "caretaker":
		    	$(window.document.location).attr('href','students.html?accommodation=Homestay');
		        break;
		    case "agency":
				$(window.document.location).attr('href','agency.html');
		        break;
		    case "family":
				$(window.document.location).attr('href','family.html');
		        break;
		    case "student":
				$(window.document.location).attr('href','student.html');
		        break;
		    case "user":
		    	$(window.document.location).attr('href','students.html?accommodation=Homestay');
		        break;
		    default:
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>No associated profile</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
			};			
			return true;
		}else{
			usuarioFail ();
		};
		return false;
	};
	
	function usuarioFail (){
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>User/Password invalid</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
	};
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
	};	 
};				

function separaDataMes ( data, separador) {
	if (data){
		return data.slice(0,2) + separador + data.slice(2,5) + separador + data.slice(5,9);
	}else{
		return "Empty";
	}

	 
};				

function separaConverteDataMes ( data, separador) {

	if (data){
		var mesAlfa = data.slice(2,5);
		return data.slice(0,2) + separador + converteMesNum (mesAlfa) + separador + data.slice(5,9);
	}else{
		return "Empty";
	}	 
};				

function converteDayPilotDate ( data, separador, mesAlfa) {

	if (data){
		var mesNum = data.value.slice(5,7);
		if (mesAlfa){
			var mes = converteMesAlfa (parseInt(mesNum) - 1);
		}else{
			var mes = mesNum;
		};
		
		return data.value.slice(8,10) + separador + mes + separador + data.value.slice(0,4);
	}else{
		return "Empty";
	}	 
};				

function montaDataMesNum ( data, separador) {

	if (data){
		var mesAlfa = data.slice(3,6);
		return data.slice(0,2) + separador + converteMesNum (mesAlfa) + separador + data.slice(7,11);
	}else{
		return "01" + separador + "01" + separador + "2000";
	}	 
};				

function separaAnoMesDia ( data) {
	if (data){
		var mesAlfa = data.slice(2,5);
		return '"' + data.slice(5,9) + '","' + converteMesNum (mesAlfa) + '","' + data.slice(0,2) + '"';
	}else{
		return "2000,01,01";
	}
};

function getDia ( data) {

	if (data){
		return data.slice(0,2);
	}else{
		return "01";
	}
};

function getMes ( data) {

	if (data){
		var mesAlfa = data.slice(2,5);
		return converteMesNum (mesAlfa);
	}else{
		return "01";
	}
};

function getMesAlfa ( data) {
	if (data){
		return data.slice(2,5);
	}else{
		return "Jan";
	}
};

function getAno ( data) {
	if (data){
		return data.slice(5,9);
	}else{
		return "2000";
	}
};

function separadorAnoMesDia ( data, separador) {
	if (data){
		var mesAlfa = data.slice(2,5);
		return data.slice(5,9) + separador + converteMesNum (mesAlfa) + separador + data.slice(0,2);
	}else{
		return "2000" + separador + "01" + separador + "01";
	}
};


function separadorMesDiaAno ( data, separador) {

	if (data){
		var mesAlfa = data.slice(2,5);
		return converteMesNum (mesAlfa) + separador + data.slice(0,2) + separador + data.slice(5,9);
	}else{
		return "01" + separador + "01" + separador + "2000";
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

	function converteToDate (data) {

		date1 = separaConverteDataMes(data, "/").split("/");
		var date = new Date(date1[1]+"/"+date1[0]+"/"+date1[2]);
		return date;
	};				

	function maiorDataHoje (data) {

		var hoje = new Date();
		date1 = separaConverteDataMes(data, "/").split("/");
		var newDate = new Date(date1[1]+"/"+date1[0]+"/"+date1[2]);
		 
		if (newDate < hoje) {
			return false;
		}else{
			return true;
		}
		 return false;
	};				

		
	function calculaData (date, days, weekDay ) {

		date1 = separaConverteDataMes(date, "/").split("/");
		 
		var newDate = new Date(date1[1]+"/"+date1[0]+"/"+date1[2]);
		 
		newDate.setDate(newDate.getDate() + days);
		
		if (newDate.getDay() == 0){
			newDate.setDate(newDate.getDate() + 1);	
		};
		if (newDate.getDay() == 7){
			newDate.setDate(newDate.getDate() + 2);	
		};

		var day = newDate.getDate();
		if (day < 10){
			day = "0" + day;
		}
		return day + "-" + converteMesAlfa(newDate.getMonth()) + "-" + newDate.getFullYear();

	};
	
	function converteMesAlfa ( mesNum) {
		if (mesNum){
			switch(mesNum) {
		    case 0:
		    	mesAlfa = "Jan"
		        break;
		    case 1:
		    	mesAlfa = "Feb"
		        break;
		    case 2:
		    	mesAlfa = "Mar"
		        break;
		    case 3:
		    	mesAlfa = "Apr"
		        break;
		    case 4:
		    	mesAlfa = "May"
		        break;
		    case 5:
		    	mesAlfa = "Jun"
		        break;
		    case 6:
		    	mesAlfa = "Jul"
		        break;
		    case 7:
		    	mesAlfa = "Ago"
		        break;
		    case 8:
		    	mesAlfa = "Sep"
		        break;
		    case 9:
		    	mesAlfa = "Oct"
		        break;
		    case 10:
		    	mesAlfa = "Nov"
		        break;
		    case 11:
		    	mesAlfa = "Dec"
		        break;
		    default:
		    	mesAlfa = "Jan"
			};
			return mesAlfa;
		}else{
			return "Jan";
		}
	};

	
	function converteMesNum ( mesAlfa) {
		if (mesAlfa){
			switch(mesAlfa) {
		    case "Jan":
		    	mesNum = "01"
		        break;
		    case "Feb":
		    	mesNum = "02"
		        break;
		    case "Mar":
		    	mesNum = "03"
		        break;
		    case "Apr":
		    	mesNum = "04"
		        break;
		    case "May":
		    	mesNum = "05"
		        break;
		    case "Jun":
		    	mesNum = "06"
		        break;
		    case "Jul":
		    	mesNum = "07"
		        break;
		    case "Aug":
		    	mesNum = "08"
		        break;
		    case "Sep":
		    	mesNum = "09"
		        break;
		    case "Oct":
		    	mesNum = "10"
		        break;
		    case "Nov":
		    	mesNum = "11"
		        break;
		    case "Dec":
		    	mesNum = "12"
		        break;
		    default:
		    	mesNum = "01"
			};
			return mesNum;
		}else{
			return "01";
		}
	};

	function calculaDias (dateStart, dateEnd ) {
		date1 = dateStart.split("/");
		date2 = dateEnd.split("/");		 
		 
		var sDate = new Date(date1[1]+"/"+date1[0]+"/"+date1[2]);
		var eDate = new Date(date2[1]+"/"+date2[0]+"/"+date2[2]);
		var daysApart = Math.abs(Math.round((sDate-eDate)/86400000));

		return daysApart;
	};				

	function intervaloDatas(start, end){
        var daysTotal = calculaDias(separaConverteDataMes(start, "/"), separaConverteDataMes(end, "/"));
        if (daysTotal > 6){
        	var weeks = Math.abs(Math.round(daysTotal / 7));
		};
        var days = daysTotal % 7;
        var daysInterval = "";
        var litDay = " nights";
        if (days == 1){
        	litDay = " night";
        }
        var litWeek = " weeks ";
        if (weeks == 1){
        	litWeek = " week ";
        };
        var durationTrip = "";
        if (weeks > 0){
        	durationTrip = weeks + litWeek;
        };
        if (days > 0){
        	daysInterval = durationTrip + days + litDay;
        }else{
        	daysInterval = durationTrip;
        };
        
        return daysInterval;
	};
	
	function inclusaoEfetuada(message) {
		if (!message){
			message = "Update ok";
		};
		$.smallBox({
			title : "Ok",
			content : "<i class='fa fa-clock-o'></i> <i>" + message + "</i>",
			color : "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 10000
		});
		parent.history.back();
    };
	function inclusaoNaoEfetuada(message) {
		if (!message){
			message = "An error occurred while recording , try again";
		};
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>" + message  + "</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 10000
		});
    };
	function atualizacaoEfetuada(message) {
		if (!message){
			message = "Update ok";
		};
		$.smallBox({
			title : "Ok",
			content : "<i class='fa fa-clock-o'></i> <i>" + message + "</i>",
			color : "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
		if (localStorage.nextWindow){
    		$(window.document.location).attr('href',localStorage.nextWindow);
		};
	};
	function atualizacaoNaoEfetuada(message) {
		if (!message){
			message = "An error occurred while recording , try again";
		};
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>" + message  + "</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
    };
	function obtencaoNaoEfetuada(message) {
		if (!message){
			message = "Record not found";
		};
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>" + message  + "</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
    };

    function atualizacaoCampoEfetuada() {
    };

    function atualizacaoCampoNaoEfetuada() {
    };

    function semAcao() {
    };

    function limpaData(campo){
    	var campoNovo = "";
    	if (campo){
        	if (campo.length){
		    	i = 0;
		    	while (i < campo.length) {
		    		if (campo.substring(i, (i + 1)) != "." && campo.substring(i, (i + 1)) != "/" && campo.substring(i, (i + 1)) != ":" && campo.substring(i, (i + 1)) != ")" && campo.substring(i, (i + 1)) != "(" && campo.substring(i, (i + 1)) != "-"){
		    			campoNovo = campoNovo.toString() + campo.substring(i, (i + 1)).toString() 
		    		};
		    	    i++;
		    	}
        	}else{
        		campoNovo = campo;
        	}
    	}else{
    		campoNovo = campo;;
    	};
    	return campoNovo;
    }

    function carregaTabelas(data) { 	
    	localStorage.setItem("table", JSON.stringify(data));
    };
    
    function carregaTelaTabelas(data) { 	
    	
    	localStorage.setItem("table", JSON.stringify(data));
    	localStorage.carragendoTags = true;
    	
    	var table = JSON.parse(localStorage.getItem("table"));
    	
    	$.each(table.documento.nationality
    		    , function (i, optionValue) {
        			$("#nationality").append( $(option(optionValue)));
        			$("#dontHostNationality").append( $(option(optionValue)));
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
        $.each(table.documento.state
    		    , function (i, optionValue) {
        			$(".state").append( $(option(optionValue)));
    		    });
        $.each(table.documento.city
    		    , function (i, optionValue) {
        			$("#city").append( $(option(optionValue)));
    		    });
        $.each(table.documento.city
    		    , function (i, optionValue) {
        			$(".city").append( $(option(optionValue)));
    		    });
        $.each(table.documento.country
    		    , function (i, optionValue) {
        			$("#country").append( $(option(optionValue)));
    		    });
        $.each(table.documento.firstLanguage
    		    , function (i, optionValue) {
        			$("#firstLanguage").append( $(option(optionValue)));
    		    });
        $.each(table.documento.firstLanguage
    		    , function (i, optionValue) {
        			$("#othersLanguage").append( $(option(optionValue)));
    		    });
        $.each(table.documento.firstLanguage
    		    , function (i, optionValue) {
        			$("#background").append( $(option(optionValue)));
    		    });
        $.each(table.documento.status
    		    , function (i, optionValue) {
        			$("#status").append( $(option(optionValue)));
    		    });
        if (localStorage.usuarioCity == "all"){
	        $.each(table.documento.destination
	    		    , function (i, optionValue) {
	        			$("#destination").append( $(option(optionValue)));
	        			$("#address_destination").append( $(option(optionValue)));
	        			$("#destinationSchool").append( $(option(optionValue)));
	        			$("#destinationAgency").append( $(option(optionValue)));
	        			$("#mainIntersectionDestination").append( $(option(optionValue)));
	        			$("#subwayDestination").append( $(option(optionValue)));
	        			$("#mainDestination").append( $(option(optionValue)));
	        			$("#agencyDestination").append( $(option(optionValue)));
	        			$("#pickupDestination").append( $(option(optionValue)));
	    		    });
        }else{
			$("#destination").append( $(option(localStorage.usuarioCity)));
			$("#address_destination").append( $(option(localStorage.usuarioCity)));
			$("#destinationSchool").append( $(option(localStorage.usuarioCity)));
			$("#destinationAgency").append( $(option(localStorage.usuarioCity)));   
			$("#mainIntersectionDestination").append( $(option(localStorage.usuarioCity)));
			$("#subwayDestination").append( $(option(localStorage.usuarioCity)));
			$("#mainDestination").append( $(option(localStorage.usuarioCity)));
			$("#agencyDestination").append( $(option(localStorage.usuarioCity)));
			$("#pickupDestination").append( $(option(optionValue)));
        }
        $.each(table.documento.accommodation
    		    , function (i, optionValue) {
        			$("#accommodation").append( $(option(optionValue)));
    		    });
        $.each(table.documento.occupancy
    		    , function (i, optionValue) {
        			$("#occupancy").append( $(option(optionValue)));
    		    });
        $.each(table.documento.occupancyHomestay
    		    , function (i, optionValue) {
        			$("#occupancyHomestay").append( $(option(optionValue)));
    		    });
        $.each(table.documento.occupancyDorms
    		    , function (i, optionValue) {
        			$("#occupancyDorms").append( $(option(optionValue)));
    		    });
        $.each(table.documento.occupancySuite
    		    , function (i, optionValue) {
        			$("#occupancySuite").append( $(option(optionValue)));
    		    });
        $.each(table.documento.relationship
    		    , function (i, optionValue) {
        			$("#relationship").append( $(option(optionValue)));
    		    });
        $.each(table.documento.relationship
    		    , function (i, optionValue) {
        			$("#emergencyContactRelationship").append( $(option(optionValue)));
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
        $.each(table.documento.type
    		    , function (i, optionValue) {
        			$("#type").append( $(option(optionValue)));
    		    });
        $.each(table.documento.type
    		    , function (i, optionValue) {
        			$("#type").append( $(option(optionValue)));
    		    });
        $.each(table.documento.airline
    		    , function (i, optionValue) {
        			$("#airline").append( $(option(optionValue)));
        			$("#arrivalAirline").append( $(option(optionValue)));
        			$("#departureAirline").append( $(option(optionValue)));
    		    });
        $.each(table.documento.vendorType
    		    , function (i, optionValue) {
        			$("#priceVendorType").append( $(option(optionValue)));
        			$("#vendorType").append( $(option(optionValue)));
    		    });
        
        localStorage.carragendoTags = false;
    };    

    function carregaSelectAgencies(data, usaId) {
        $.each(data
    		    , function (i, optionValue) {
        			$("#agencyId").append( $(option(optionValue.name, "", usaId, optionValue._id)));
        });
    };

    function carregaSelectFamilies(data, usaId) {
        $.each(data
    		    , function (i, optionValue) {
        			$("#familyId").append( $(option(optionValue.familyName, "", usaId, optionValue._id)));
        });
    };

    function carregaSelectPickups(data, usaId) {
        $.each(data
    		    , function (i, optionValue) {
        			$("#pickupId").append( $(option(optionValue.name, "", usaId, optionValue._id)));
        });
    };

    function carregaSelectSchool(data, usaId) {
        $.each(data
    		    , function (i, optionValue) {
					$("#schoolId").append( $(option(optionValue.name, "", usaId, optionValue._id)));
        });
    };
        
    function option(value, selectValue, usaId, id) {
    	if (usaId){
	    	if (value == selectValue){
	    		return '<option value="' + id + '" selected="selected">' + value +'</option>';
	    	}else{
	    		return '<option value="' + id + '">' + value +'</option>';
	    	}
    	}else{
	    	if (value == selectValue){
	    		return '<option value="' + value + '" selected="selected">' + value +'</option>';
	    	}else{
	    		return '<option value="' + value + '">' + value +'</option>';
	    	}
    	};
    };
    function checkbox(value, field) {
    	return '<label class="checkbox"><input type="checkbox" id="' + field +'" name="' + field +'"><i></i>' + value +'</label>';
    };    
    function radio(value, field, i, x) {
    	if (i == x){
    		return '<label class="radio"><input type="radio" id="' + field  + i +'" name="' + field + '" checked="checked"><i></i>' + value +'</label>';	
    	}
    		return '<label class="radio"><input type="radio" id="' + field  + i +'" name="' + field + '"><i></i>' + value +'</label>';
    };

    function genderCollorDef (gender){
    	var genderCollor = "label-male";
    	if (gender){
	    	switch (gender) {
	    	case "Male":
	    		genderCollor = "label-male"
	            break;
	        case "Female":
	        	genderCollor = "label-female"
	            break;
	        default: 
	    		genderCollor = "label-male"
	        };	    
    	};
        return genderCollor;
    };

    function smokeTextDef (smoke){
    	var smokeText = "label-male";
    	switch (smoke) {
    	case "Yes":
    		smokeText = "Smoke"
            break;
        case "No":
        	smokeText = "Don't smoke"
            break;
        default: 
    		smokeText = ""
        };	 
        return smokeText;
    };

    function smokeCollorDef (smoke){
    	var smokeCollor = "label-male";
    	switch (smoke) {
    	case "Smoke":
    		smokeCollor = "label-warning"
            break;
        case "Don't smoke":
        	smokeCollor = "label-success"
            break;
        default: 
    		smokeCollor = "label-primary"
        };	 
        return smokeCollor;
    };

    function statusCollorDef (status){
    	var statusCollor = "label-male";
    	if (status){
        	switch (status) {
        	case "Available":
        		statusCollor = "label-available"
                break;
        	case "Partially allocated":
        		statusCollor = "label-partially-allocated"
                break;
            case "Confirmed":
            	statusCollor = "label-confirmed"
                break;
            case "Offered":
            	statusCollor = "label-offered"
                break;
            case "In house":
            	statusCollor = "label-in-house"
                break;
            case "Allocated":
            	statusCollor = "label-allocated"
                break;
            case "Placement offered":
            	statusCollor = "label-placement-offered"
                break;
            case "Documents":
            	statusCollor = "label-documents"
                break;
            case "Checked out":
            	statusCollor = "label-terminated"
                break;
            case "Evaluete received":
            	statusCollor = "label-evalueter-received"
                break;
            case "Canceled":
            	statusCollor = "label-canceled"
                break;
            default: 
        		statusCollor = "#ffffff"
            };	    
    	};
        return statusCollor;
    };
    
    
    