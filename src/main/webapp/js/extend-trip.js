	// ** setar menu
	$("#menuStudents_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
	var parameter = parametrosDaUrl.split("&");
	var typePage = "";
	var actualTrip = "";
	if (parameter[1]) {
		var typePage = parametrosDaUrl.split("&")[1].split("=")[1];
	};
	if (parameter[2]) {
		var actualTrip = parametrosDaUrl.split("&")[2].split("=")[1];
	};
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
	 * 		carrega dados estudante
	 */
	rest_obterStudent(mailUrl, carregaDadosTelaInvoice, obtencaoNaoEfetuada, actualTrip);
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "onlyStudent"){
		$(".notOnlyStudent" ).addClass("hide");
	}
	
	$('#invoiceSubmmit').off('click');
	$('#invoiceSubmmit').on('click', function () {
		localStorage.valid = true;
		$(".item").each(function() {
			var id = $(this).attr('id');
			var i = id.split("_")[1];
			if (!$('#itemId_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing item</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				localStorage.valid = false;
			}
			if (!$('#itemValue_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing value</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				localStorage.valid = false;
			}
			if (!$('#itemAmount_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing amount</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				localStorage.valid = false;
			}
		});
		var total = 0;
		$(".due").each(function() {
			var id = $(this).attr('id');
			var i = id.split("_")[1];
			var a = ((parseFloat($('#dueValue_' + i).val())));
			total = total = parseFloat(total) + ((parseFloat($('#dueValue_' + i).val())));
			if (!$('#due_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing due date</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				localStorage.valid = false;
			}
			if (!$('#dueValue_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing due value</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				localStorage.valid = false;
			}
		});
		if (localStorage.valid == "true"){
			criaInvoice(idInvoice, actualTrip);
		}
	});

function criaInvoice(id, actualTrip){

	var objStudent = JSON.parse(localStorage.getItem("student"));
	
	if (!actualTrip){
		actualTrip = objStudent.documento.actualTrip;
	};
	var objInvoice =
		{
			documento:
				{
					id : id,
					idStudent : objStudent._id,
					actualTrip : $('#actualTrip').val(),
					number : localStorage.numberInvoice,
					status : "new",
					dueDate : limpaData($('#due_0').val()),
					amountNet : $('#dueValue_0').val(),
					amountGross : $('#dueValueGross_0').val(),
					destination : objStudent.destination,
					itensNet : [],
					itensGross : [],
					
				}
			
		};

	$(".item").each(function() {
		var id = $(this).attr('id');
		var i = id.split("_")[1];
		var itemNet = 
			{
				item : $('#itemId_' + i).val(),
				value : $('#itemValue_' + i).val(),
				amount : $('#itemAmount_' + i).val(),
				description : $('#itemDescription_' + i).val(),
			}
		var itemGross = 
			{
				value : $('#itemValueGross_' + i).val(),
				amount : $('#itemAmountGross_' + i).val(),
			}
		objInvoice.documento.itensNet.push(itemNet);
		objInvoice.documento.itensGross.push(itemGross);
	});
	
	if (typePage == "change"){
		rest_atualizaInvoice(objInvoice, retornaInvoice, semAcao, "invoices.html")
	}else{
		rest_incluiInvoice(objInvoice, retornaInvoice, semAcao, "students.html")
	};

};

function retornaInvoice(telaRetorno){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Invoice created</i>",
		color : "#659265",
		
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	window.location = telaRetorno; 
};

function carregaDadosTelaInvoice(data, actualTrip){
	
	localStorage.setItem("student", JSON.stringify(data));
    
	if (!actualTrip){
		var actualTrip = data.documento.actualTrip;
	};
	$('#actualTrip').val(actualTrip);
	
	$("#agencyName").html(data.documento.agencyName);
	$("#studentCompleteName").html(data.documento.firstName + " " + data.documento.lastName);
	$("#celPhone").html(data.documento.celPhone);
    $('#phone').html(data.documento.phone);
    $('#mail').html(data.documento.mail);
    $('#lastName').html(data.documento.lastName);
    $('#firstName').html(data.documento.firstName);
    $("#birthDay").html(separaDataMes(data.documento.birthDay, "-"));
    $("#age").html(calculaIdade(separaConverteDataMes(data.documento.birthDay, "/")));
    $('#status').html(data.documento.trips[actualTrip].status);
    $('#destination').html(data.documento.trips[actualTrip].destination);
    $('#contactFamilyName').html(data.documento.trips[actualTrip].contactFamilyName);
 
    var daysTotal = calculaDias(separaConverteDataMes(data.documento.trips[actualTrip].start, "/"), separaConverteDataMes(data.documento.trips[actualTrip].end, "/"));
    var weeks = Math.abs(Math.round(daysTotal / 7));
    var days = daysTotal % 7;
    var durationTrip = "";
    var litDay = " nights";
    if (days == 1){
    	litDay = " night";
    }
    var litWeek = " weeks ";
    if (weeks == 1){
    	litWeek = " week ";
    }
    if (weeks > 0){
    	durationTrip = weeks + litWeek;
    };
    if (days > 0){
        durationTrip = durationTrip + days + litDay;
    }else{
    	durationTrip = durationTrip;
    };

	var mealPlanLiteral = "";
	var literal = "";
    $.each(data.documento.trips[actualTrip].mealPlan, function (i, mealPlan) {
    	mealPlanLiteral = mealPlanLiteral + literal + mealPlan;
    	literal = ", ";
    });

    $('#contactName').html(data.documento.trips[actualTrip].contactName);
    $('#contactGender').html(data.documento.trips[actualTrip].contactGender);
    $('#contactEmail').html(data.documento.trips[actualTrip].contactEmail);
    $('#contactPhone').html(data.documento.trips[actualTrip].contactPhone);
    $('#contactMobilePhone').html(data.documento.trips[actualTrip].contactMobilePhone);
    
    $("#start").html(separaDataMes(data.documento.trips[actualTrip].start, "-"));
    $("#end").html(separaDataMes(data.documento.trips[actualTrip].end, "-"), actualTrip);
    $("#duration").html(durationTrip);
    $("#arrivalDate").html(separaDataMes(data.documento.trips[actualTrip].arrivalDate, "-"));
    $("#arrivalTime").html(separaHora(data.documento.trips[actualTrip].arrivalTime, ":"));
    $('#arrivalFlightNumber').html(data.documento.trips[actualTrip].arrivalFlightNumber);
    $('#arrivalAirline').html(data.documento.trips[actualTrip].arrivalAirline);
    $("#departureDate").html(separaDataMes(data.documento.trips[actualTrip].departureDate, "-"));
    $("#departureTime").html(separaHora(data.documento.trips[actualTrip].departureTime, ":"));
    $('#departureFlightNumber').html(data.documento.trips[actualTrip].departureFlightNumber);
    $('#departureAirline').html(data.documento.trips[actualTrip].departureAirline);
    $('#extend').html(data.documento.trips[actualTrip].extend);
    $('#pickup').html(data.documento.trips[actualTrip].pickup);
    $('#dropoff').html(data.documento.trips[actualTrip].dropoff);
    $('#occupancy').html(data.documento.trips[actualTrip].occupancy);
    $('#mealPlan').html(mealPlanLiteral);
    $('#privateWashroom').html(data.documento.trips[actualTrip].privateWashroom);
    if (data.documento.trips[actualTrip].accommodation == "Homestay"){
		$(".homestay").removeClass("hide");
	}else{
		if (data.documento.trips[actualTrip].accommodation == "Dorms"){
    		$(".dorms").removeClass("hide");
    	}else{
        	if (data.documento.trips[actualTrip].accommodation == "Suite"){
        		$(".suite").removeClass("hide");
        	}
    	}
	};
    
	if (data.documento.trips[actualTrip].agencyName){
		rest_obterAgency (data.documento.trips[actualTrip].agencyName, carregaDadosAgency, semAcao, true, data.documento.trips[actualTrip].agencyConsultName);
	};
	
};
