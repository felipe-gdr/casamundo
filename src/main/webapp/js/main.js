//
//*** 	botão genérico para voltar uma pagina
//
	$( ".getback" ).bind( "click", function() {
		parent.history.back();
		return false;
	});

	$("#menuCaretaker").addClass ("hide");
	$("#menuStudents").addClass ("hide");
	$("#menuFamilies").addClass ("hide");
	$("#menuAgency").addClass ("hide");
	$("#menuFamily").addClass ("hide");
	$("#menuStudent").addClass ("hide");
	$("#menuAdministrator").addClass ("hide");

	if (localStorage.usuarioPerfil == "caretaker"){
		$("#menuCaretaker").removeClass ("hide");
		$("#menuStudents").removeClass ("hide");
		$("#menuFamilies").removeClass ("hide");
	}; 
	if (localStorage.usuarioPerfil == "agency"){
		$("#menuAgency").removeClass ("hide");
	}; 
	if (localStorage.usuarioPerfil == "administrator"){
		$("#menuCaretaker").removeClass ("hide");
		$("#menuStudents").removeClass ("hide");
		$("#menuFamilies").removeClass ("hide");
		$("#menuAdministrator").removeClass ("hide");
	}; 
	if (localStorage.usuarioPerfil == "student"){
		$("#menuStudent").removeClass ("hide");
	}; 
	if (localStorage.usuarioPerfil == "family"){
		$("#menuFamily").removeClass ("hide");
	}; 
	
	$("#usuarioNome").html(localStorage.usuarioFirstName);

		function executaLogin(email, senha) {

		rest_obterUsuario(email, usuarioOk, usuarioFail, senha)

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
				$(window.document.location).attr('href','dashboard.html');
		        break;
		    case "caretaker":
				$(window.document.location).attr('href','dashboard.html');
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
	}

	 
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
		return data.slice(0,2) + separador + mesNum + separador + data.slice(5,9);
	}else{
		return "Empty";
	}	 
};				
function montaDataMesNum ( data, separador) {
	if (data){
		var mesAlfa = data.slice(3,6);
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
		return data.slice(0,2) + separador + mesNum + separador + data.slice(7,11);
	}else{
		return "01/10/2000";
	}	 
};				
function separaAnoMesDia ( data) {
	if (data){
		return '"' + data.slice(4,8) + '","' + data.slice(2,4) + '","' + data.slice(0,2) + '"';
	}else{
		return "Empty";
	}
};

Date.prototype.julianDate=function(){
	var j=parseInt((this.getTime()-new Date('Dec 30,'+(this.getFullYear()-1)+' 23:00:00').getTime())/86400000).toString(),
	i=3-j.length;
	while(i-->0)j=0+j;
	return j
	};
function dateToJulianNumber(d) {
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
		parent.history.back();
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
	function atualizacaoEfetuada(literal) {
		$.smallBox({
			title : "Ok",
			content : "<i class='fa fa-clock-o'></i> <i>" + literal + "</i>",
			color : "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
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

    function semAcao() {
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
	        			$("#destinationSchool").append( $(option(optionValue)));
	        			$("#destinationAgency").append( $(option(optionValue)));
	    		    });
        }else{
			$("#destination").append( $(option(localStorage.usuarioCity)));
			$("#destinationSchool").append( $(option(localStorage.usuarioCity)));
			$("#destinationAgency").append( $(option(localStorage.usuarioCity)));        	
        }
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
        $.each(table.documento.type
    		    , function (i, optionValue) {
        			$("#type").append( $(option(optionValue)));
    		    });
        $.each(table.documento.address_mainIntersection
    		    , function (i, optionValue) {
        			$("#address_mainIntersection").append( $(option(optionValue)));
    		    });
        
        localStorage.carragendoTags = false;
    };    
        
    function option(value, selectValue) {
    	if (value == selectValue){
    		return '<option value="' + value + '" selected="selected">' + value +'</option>';
    	}else{
    		return '<option value="' + value + '">' + value +'</option>';
    	}
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
