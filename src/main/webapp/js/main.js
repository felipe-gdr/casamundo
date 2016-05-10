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
	function atualizacaoEfetuada() {
		$.smallBox({
			title : "Ok",
			content : "<i class='fa fa-clock-o'></i> <i>Student data atualized</i>",
			color : "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
		parent.history.back();
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
        $.each(table.documento.type
    		    , function (i, optionValue) {
        			$("#type").append( $(option(optionValue)));
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
