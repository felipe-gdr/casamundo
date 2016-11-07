	// 
	//**    carrega dados url
	//

	var idPayment = 1; 
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var parameter = parametrosDaUrl.split("&");
	var idInvoice = "";
	var typePage = "";
	var mailUrl = "";
	if (parameter[1]) {
		var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
		var idInvoice = parametrosDaUrl.split("&")[1].split("=")[1];
		var typePage = parametrosDaUrl.split("&")[2].split("=")[1];
	};
	
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);
	//
	//***   ler dados invoice
	//
	if (typePage == "create"){
		rest_obterInvoice(idInvoice, carregaTelaPaymentInclusao, semAcao, "cost");
	}else{
		rest_obterPayment(idInvoice, carregaTelaPaymentAlteracao, semAcao, "cost");
	}
	//
/**
 * 
 */
	rest_obterStudent(mailUrl, carregaDadosTelaPayment, obtencaoNaoEfetuada);

	
	$('#paymentSubmmit').off('click');
	$('#paymentSubmmit').on('click', function () {
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
			if (!$('#itemDueDate_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing due date</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				localStorage.valid = false;
			}
		});
		if (localStorage.valid == "true"){
			$(".item").each(function() {
				var id = $(this).attr('id');
				var i = id.split("_")[1];
				criaPayment(i);
			});
		}
	});


function paymentNumber () {
	if (localStorage.numberPayment){
		localStorage.numberPayment = parseInt(localStorage.numberPayment) + 1;
	}else{
		localStorage.numberPayment = 1;
	};
	return localStorage.numberPayment;
};

function limpaStoragePayment () {
	
};

function criaPayment(i){

	var objStudent = JSON.parse(localStorage.getItem("student"));
		
	var objPayment =
		{
			documento:
				{
					id : $('#itemIdPayment_' + i).val(),
					idStudent : $('#itemIdStudent_' + i).val(),
					idVendor : $('#itemIdVendor_' + i).val(),
					idInvoice : $('#itemIdInvoice_' + i).val(),
					invoiceNumber : $('#itemInvoiceNumber_' + i).val(),
					actualTrip : $('#itemActualTrip_' + i).val(),
					status : "new",
					type : $('#itemType_' + i).val(),
					number : paymentNumber,
					dueDate : limpaData($('#itemDueDate_' + i).val()),
					amount : parseFloat($('#itemValue_' + i).val()) * parseFloat($('#itemAmount_' + i).val()), 
					destination : $('#itemDestination_' + i).val(),
					itens : []
				}
			
		};

	var item = 
		{
			item : $('#itemId_' + i).val(),
			value : $('#itemValue_' + i).val(),
			amount : $('#itemAmount_' + i).val(),
			description : $('#itemDescription_' + i).val(),
		};
	objPayment.documento.itens.push(item);
	
	if (typePage == "change"){
		rest_atualizaPayment(objPayment, retornaPayment, semAcao, "payments.html")
	}else{
		rest_incluiPayment(objPayment, retornaPayment, semAcao, "invoices.html")
	};

};

function retornaPayment(telaRetorno){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Payment created</i>",
		color : "#659265",
		
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	window.location = telaRetorno; 
};

function createItem(i, date, agency, destination, type){
	
	var item = 
		'<div id="item_' + i + '" class="row item net">' +
			'<section class="col-xs-3">' +
				'<label class="label text-info">Item</label>' +							
				'<label class="select">' +
					'<select class="itemName' + i + '" id="itemId_' + i + '" name="itemId_' + i + '" disabled="disabled">' +
						'<option value="" selected="" disabled="disabled">Choose one item</option>' +
					'</select><i></i>' +
				'</label>' +
				'<input class="hide" type="text" id="itemIdInvoice_' + i + '" name="itemIdInvoice_' + i + '"  >' +
				'<input class="hide" type="text" id="itemIdPayment_' + i + '" name="itemIdPayment_' + i + '"  >' +
				'<input class="hide" type="text" id="itemInvoiceNumber_' + i + '" name="itemInvoiceNumber_' + i + '"  >' +
				'<input class="hide" type="text" id="itemIdStudent_' + i + '" name="itemIdStudent_' + i + '"  >' +
				'<input class="hide" type="text" id="itemActualTrip_' + i + '" name="itemActualTrip_' + i + '"  >' +
				'<input class="hide" type="text" id="itemType_' + i + '" name="itemType_' + i + '"  >' +
				'<input class="hide" type="text" id="itemIdVendor_' + i + '" name="itemIdVendor_' + i + '"  >' +
				'<input class="hide" type="text" id="itemDescription_' + i + '" name="itemDescription_' + i + '"  >' +
				'<input class="hide" type="text" id="itemDestination_' + i + '" name="itemDestination_' + i + '"  >' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<label class="label text-info">Value</label>' +								
				'<label class="input">' +
					'<input class="text-right itemValue" type="text" id="itemValue_' + i + '" name="itemValue_' + i + '" placeholder="ex: 9999.99" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<label class="label text-info">Amount</label>' +								
				'<label class="input">' +
					'<input value="1.00" class="text-right itemAmount" type="text" id="itemAmount_' + i + '" name="itemAmount_' + i + '" placeholder="ex: 99.99" disabled="disabled">' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<label class="label text-info">Due date</label>' +								
				'<label class="input">' +
					'<input id="itemDueDate_' + i + '" type="text" name="itemDueDate_' + i + '" placeholder="" class="datepicker form-control" data-dateformat="dd-M-yy" >' +	
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<a id="newItem_' + i + '"  class="newItem control-item hide"><i class="glyphicon glyphicon-plus control-item hide"></i></a>' +
			'</section>' +
			'<section class="col-xs-1">' +
				'<a id="delItem_' + i + '"  class="delItem control-item hide"><i class="glyphicon glyphicon-minus control-item hide"></i></a>' +
			'</section>' +
		'</div>';
	
	$("#itensPayment").append(item);

	acertaSinalItem ();
	
	$('#newItem_' + i).off('click');
	$('#newItem_' + i).on('click', function () {
		createItem (i + 1, date, agency, destination, type);
		acertaSinalItem ()
	});

	$('#delItem_' + i).off('click');
	$('#delItem_' + i).on('click', function () {
		$('#item_' + i).remove();
		acertaSinalItem ()
	});

	$('#itemValue_' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});
	$('#itemAmount_' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});

	rest_obterPriceTableAll(carregaAppendPriceTable, semAcao, date, agency, destination, i, type);
};	

function carregaAppendPriceTable (data, i, type){
	
	var priceTableJson =
		{
			itens : []
		};
	
    $.each(data, function (w, priceTable) {
    			if (priceTable.valid == "Yes" && priceTable.gross && priceTable.net){
   					$('#itemId_' + i).append( $(option(priceTable.name, "", true, priceTable.id)));
    			};
    			var priceTable =
    				{
    					id : priceTable.id,
    					name : priceTable.name,
						description : priceTable.description,
						net : priceTable.net,
						gross : priceTable.gross
    				};
    			priceTableJson.itens.push(priceTable);
    });
	
	localStorage.setItem("pricetableitens", JSON.stringify(priceTableJson));
    	
	$('#itemId_' + i).change(function() {
		$('#itemValue_' + i).val(itemPriceTable($( this ).val()).net);
		$('#itemDescription_' + i).val(itemPriceTable($( this ).val()).description);
	});


};

function carregaTelaPaymentInclusao(data){

	$.each(data.cost, function (i, item) {
		var actualTrip = data.student.actualTrip;
		createItem(i, data.student.trips[actualTrip].start, data.student.trips[actualTrip].agencyName, data.student.trips[actualTrip].destination);
		$('#itemId_' + i).val(item.item);
		$('#itemIdPayment_' + i).val("");
		$('#itemIdInvoice_' + i).val(item.idInvoice);
		$('#itemInvoiceNumber_' + i).val(item.invoiceNumber);
		$('#itemIdStudent_' + i).val(item.idStudent);
		$('#itemActualTrip_' + i).val(actualTrip);
		$('#itemType_' + i).val(item.type);
		$('#itemIdVendor_' + i).val(item.idVendor);
		$('#itemDescription_' + i).val(item.description);
		$('#itemDestination_' + i).val(item.destination);
		$('#itemValue_' + i).val(item.value);
		$('#itemAmount_' + i).val(item.amount);
		$('#itemDueDate_' + i).val(calculaData(data.student.trips[actualTrip].start, 6));
    });
	
};

function carregaTelaPaymentAlteracao(data){

	$.each(data.documento.itens, function (i, item) {
		var actualTrip = data.student.actualTrip;
		createItem(i, data.student.trips[actualTrip].start, data.student.trips[actualTrip].agencyName, data.student.trips[actualTrip].destination);
		$('#itemId_' + i).val(item.item);
		$('#itemIdPayment_' + i).val(data.documento.id);
		$('#itemIdInvoice_' + i).val(data.documento.idInvoice);
		$('#itemInvoiceNumber_' + i).val(data.documento.invoiceNumber);
		$('#itemIdStudent_' + i).val(data.documento.idStudent);
		$('#itemActualTrip_' + i).val(actualTrip);
		$('#itemType_' + i).val(data.documento.type);
		$('#itemIdVendor_' + i).val(data.documento.idVendor);
		$('#itemDescription_' + i).val(item.description);
		$('#itemDestination_' + i).val(data.documento.destination);
		$('#itemValue_' + i).val(item.value);
		$('#itemAmount_' + i).val(item.amount);
		$('#itemDueDate_' + i).val(separaDataMes(data.documento.dueDate, "-"));
    });
	
};

function acertaSinalItem (){
	var ultimoItem = 0;
	$(".item").each(function() {
		var id = $(this).attr('id');
		var i = id.split("_")[1];
		$("#delItem_" + i).removeClass("hide");
		$("#delItemGross_" + i).removeClass("hide");
		$("#newItem_" + i).addClass("hide");
		$("#newItemGross_" + i).addClass("hide");
		ultimoItem = i;
	});
	$("#newItem_" + ultimoItem).removeClass("hide");
	$("#newItemGross_" + ultimoItem).removeClass("hide");
	if ($(".item").length == 1){
		$("#delItem_" + ultimoItem).addClass("hide");
		$("#delItemGross_" + ultimoItem).addClass("hide");
	};
}

function carregaDadosTelaPayment(data){
	
	localStorage.setItem("student", JSON.stringify(data));
    
	var actualTrip = data.documento.actualTrip;	    

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

function fillSpaces(text, size){
	
	var sizeOriginal = text.length;
	var espacos = size - text.length;
	var i = 0;
	while (i < espacos) {
	    text = " " + text;
	    i++;
	};
	var i = 0;
	while (i < (espacos / 2)) {
	    text = " " + text;
	    i++;
	};
	return text;
};
function salvaCodigoPDF(){
//	html2canvas($("#div-pdf"), {
//    onrendered: function(canvas) {
//    	return Canvas2Image.saveAsPNG(canvas);
//    }
//});
//html2canvas($("#div-pdf"),{
//	onrendered: function (canvas){
//		var img = canvas.toDataURL("image/png");
//		window.open(img);
//		var doc = new jsPDF();
//		doc.addImage (img, JPEG, 100, 100);
//	    doc.save('payment_' + mailUrl + '.pdf');				
//	}
//})


}