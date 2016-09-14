	// ** setar menu
	$("#menuStudents_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
	var parameter = parametrosDaUrl.split("&");
	if (parameter[1]) {
		var typePage = parametrosDaUrl.split("&")[1].split("=")[1];
	};
	
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);
	//
	//***   setar pagina como accommodation
	//
	if (typePage == "accommodation"){
		$(".notAccommodation" ).addClass("hide");
	}
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "onlyStudent"){
		$(".notOnlyStudent" ).addClass("hide");
	}
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "change"){
		$(".notChange" ).addClass("hide");
	};
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "caretaker"){
		$(".notChange" ).addClass("hide");
		$(".caretaker" ).removeClass("hide");
	};
	
/**
 * 
 */
	var data = rest_obterStudent(mailUrl, carregaStudent, obtencaoNaoEfetuada);
	var table = JSON.parse(localStorage.getItem("table"));
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
    $('#englishLevel').html(getValueStudent("englishLevel"));
    $('#streetNumber').html(getValueStudent("streetNumber"));
    $('#streetName').html(getValueStudent("streetName"));
    $('#state').html(getValueStudent("state"));
    $('#postalCode').html(getValueStudent("postalCode"));
    $('#city').html(getValueStudent("city"));
    $('#country').html(getValueStudent("country"));
    $('#complement').html(getValueStudent("complement"));

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
    
    if (getValueStudent("familyName",actualTrip)){
    	$(".family" ).removeClass("hide");
    };
    
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
		$(".homestay").removeClass("hide");
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


	if (getValueStudent("agencyName",actualTrip)){
		rest_obterAgency (getValueStudent("agencyName",actualTrip), carregaDadosAgency, semAcao, true, getValueStudent("agencyConsultName",actualTrip))
	};

	/**
	 *      Criar o primeira item 
	 */
	createItem(0, getValueStudent("start", actualTrip), getValueStudent("agencyName", actualTrip), getValueStudent("destination", actualTrip), "net");
	createDue(0);
	
function createItem(i, date, agency, destination, type){
	
	var item = 
		'<div class="row">' +
			'<section class="col-xs-5">' +
				'<label class="label text-info">Item</label>' +							
				'<label class="select">' +
					'<select id="itemName' + i + '" name="itemName' + i + '">' +
						'<option value="" selected="" disabled="">Choose one item</option>' +
					'</select><i></i>' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-2">' +
				'<label class="label text-info">Value</label>' +								
				'<label class="input">' +
					'<input class="text-right itemValue" type="text" id="itemValue' + i + '" name="itemValue' + i + '" placeholder="ex: 9999,99" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<a id="newItem' + i + '"  class=""><i class="glyphicon glyphicon-plus"></i></a>' +
			'</section>' +
		'</div>';
	
	$("#itensInvoice").append(item);

	$('#newItem' + i).off('click');
	$('#newItem' + i).on('click', function () {
		createItem (i + 1, date, agency, destination, type);
		$('#newItem' + i).addClass('hide');
	});
	
	$('#itemValue' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});

	$('#itemValue' + i).off('blur');
	$('#itemValue' + i).on('blur', function () {
		var total = 0;
		$(".itemValue").each(function() {
			  total = parseFloat(total) + parseFloat($( this ).val());
		});
		$('#totalValue').html(total.toFixed(2));
		$('#dueValue0').val(total.toFixed(2));
	});	
	
	rest_obterPriceTableAll(carregaAppendPriceTable, semAcao, date, agency, destination, i, type);
};	
	
function carregaAppendPriceTable (data, i, type){
 
    $.each(data
		    , function (w, optionValue) {
    			if (optionValue.valid == "Yes" && optionValue.gross && optionValue.net){
    				if (type == "gross"){
    					$('#itemName' + i).append( $(option(optionValue.name, "", true, optionValue.gross)));
    				}else{
    					$('#itemName' + i).append( $(option(optionValue.name, "", true, optionValue.net)));
    				}
    			};
    });
    
	
	$('#itemName' + i).change(function() {
		$('#itemValue' + i).val($( this ).val());
		var total = 0;
		$(".itemValue").each(function() {
			  total = parseFloat(total) + parseFloat($( this ).val());
		});
		$('#totalValue').html(total.toFixed(2));
		$('#dueValue0').val(total.toFixed(2));
	});


};

function createDue(i){
	
	var item = 
		'<div class="row">' +
			'<section class="col-xs-3">' +
				'<label class="label text-info">Installment - ' + (i+1) + '</label>' +								
				'<label class="input">' +
					'<input id="due' + i + '" type="text" name="due' + i + '" placeholder="" class="datepicker form-control" data-dateformat="dd-M-yy" >' +	
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-3">' +
				'<label class="label text-info">Value</label>' +								
				'<label class="input">' +
					'<input class="text-right dueValue disable" type="text" id="dueValue' + i + '" name="dueValue' + i + '" placeholder="" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<a id="newDue' + i + '"  class=""><i class="glyphicon glyphicon-plus"></i></a>' +
			'</section>' +
		'</div>';

	$("#dues").append(item);

	$('#due' + i).datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			if (i > 0){
				$('#due' + (i-1)).datepicker('option', 'maxDate', selectedDate);
			};
		}
	});

	$('#newDue' + i).off('click');
	$('#newDue' + i).on('click', function () {
		createDue (i + 1);
		$('#newDue' + i).addClass('hide');
	});

};