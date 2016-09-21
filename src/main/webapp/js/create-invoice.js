	// ** setar menu
	$("#menuStudents_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var idInvoice = 1; 
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
	if (parametrosDaUrl.split("&")[2]){
		idInvoice = parametrosDaUrl.split("&")[2].split("=")[1];
	};
	var parameter = parametrosDaUrl.split("&");
	if (parameter[1]) {
		var typePage = parametrosDaUrl.split("&")[1].split("=")[1];
	};

	/**
	 * 		pega o ultimo numero de invoice
	 */
	//rest_obterUltimaInvoice(saveUltimaInvoice, primeiraInvoice);
	if (localStorage.numberInvoice){
		saveUltimaInvoice();
	}else{
		primeiraInvoice();
	};
		

	
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);
	//
	//***   setar pagina como accommodation
	//
	if (typePage == "change"){
		rest_obterInvoice(idInvoice, carregaTelaInvoice, semAcao);
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
/**
 *     Guarda o primeiro item do due date 
 */
	
	localStorage.primeiroDue = 0;
/**
 * 
 */
	var data = rest_obterStudent(mailUrl, carregaDadosTelaInvoice, obtencaoNaoEfetuada);
	var table = JSON.parse(localStorage.getItem("table"));

/**
 * 
 */
	$('#type').off('click');
	$('#type').on('click', function () {
		if ($(this).is(':checked')){
			$(".net").addClass("hide");
			$(".gross").removeClass("hide");
		}else{
			$(".gross").addClass("hide");
			$(".net").removeClass("hide");			
		}
	});
	
/**
 * 
 */
	var doc = new jsPDF();
	var specialElementHandlers = {
	    '#editor': function (element, renderer) {
	        return true;
	    }
	};
	var doc = new jsPDF();
	var specialElementHandlers = {
	    '#editor': function (element, renderer) {
	        return true;
	    }
	};
	$('#geraPDF').click(function () {
//		html2canvas($("#div-pdf"), {
//	        onrendered: function(canvas) {
//	        	return Canvas2Image.saveAsPNG(canvas);
//	        }
//	    });
//		html2canvas($("#div-pdf"),{
//			onrendered: function (canvas){
//				var img = canvas.toDataURL("image/png");
//				window.open(img);
//				var doc = new jsPDF();
//				doc.addImage (img, JPEG, 100, 100);
//			    doc.save('invoice_' + mailUrl + '.pdf');				
//			}
//		})

	    doc.fromHTML($('#content').html(), 5, 5, {
	        'width': 170,
	            'elementHandlers': specialElementHandlers
	    });
	    doc.save('sample-file.pdf');
	});
	
	$('#invoiceSubmmit').off('click');
	$('#invoiceSubmmit').on('click', function () {
		var valid = true;
		$(".item").each(function() {
			var id = $(this).attr('id');
			var i = id.split("_")[1];
			if (!$('#itemName_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing item</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				valid = false;
			}
			if (!$('#itemValue_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing value</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				valid = false;
			}
			if (!$('#itemAmount_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing amount</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				valid = false;
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
				valid = false;
			}
			if (!$('#dueValue_' + i).val()){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Missing due value</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				valid = false;
			}
		});
		if (valid){
			criaInvoice(idInvoice);
		}
	});
 
function saveUltimaInvoice (data) {
	localStorage.numberInvoice = parseInt(localStorage.numberInvoice) + 1;
};


function primeiraInvoice () {
	localStorage.numberInvoice = 1;
};

function limpaStorageInvoice () {
	
};

function criaInvoice(id){

	var objStudent = JSON.parse(localStorage.getItem("student"));
		
	var objInvoice =
		{
			documento:
				{
					id : id,
					idStudent : objStudent._id,
					actualTrip : objStudent.documento.actualTrip,
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
				item : $('#itemName_' + i).val(),
				value : $('#itemValue_' + i).val(),
				amount : $('#itemAmount_' + i).val(),
			}
		var itemGross = 
			{
				item : $('#itemNameGross_' + i).val(),
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

function createItem(i, date, agency, destination, type){
	
	var item = 
		'<div id="item_' + i + '" class="row item net">' +
			'<section class="col-xs-4">' +
				'<label class="label text-info">Item</label>' +							
				'<label class="select">' +
					'<select class="iteName' + i + '" id="itemName_' + i + '" name="itemName_' + i + '">' +
						'<option value="" selected="" disabled="">Choose one item</option>' +
					'</select><i></i>' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-2">' +
				'<label class="label text-info">Value</label>' +								
				'<label class="input">' +
					'<input class="text-right itemValue" type="text" id="itemValue_' + i + '" name="itemValue_' + i + '" placeholder="ex: 9999.99" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<label class="label text-info">Amount</label>' +								
				'<label class="input">' +
					'<input value="1.00" class="text-right itemAmount" type="text" id="itemAmount_' + i + '" name="itemAmount_' + i + '" placeholder="ex: 99.99" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<a id="newItem_' + i + '"  class="newItem"><i class="glyphicon glyphicon-plus"></i></a>' +
			'</section>' +
			'<section class="col-xs-1">' +
				'<a id="delItem_' + i + '"  class="delItem"><i class="glyphicon glyphicon-minus"></i></a>' +
			'</section>' +
		'</div>' +
		'<div id="itemGross_' + i + '" class="row itemGross hide gross">' +
			'<section class="col-xs-4">' +
				'<label class="label text-info">Item</label>' +							
				'<label class="select">' +
					'<select class="itemName' + i + '" id="itemNameGross_' + i + '" name="itemNameGross_' + i + '">' +
						'<option value="" selected="" disabled="">Choose one item</option>' +
					'</select><i></i>' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-2">' +
				'<label class="label text-info">Value</label>' +								
				'<label class="input">' +
					'<input class="text-right itemValue" type="text" id="itemValueGross_' + i + '" name="itemValueGross_' + i + '" placeholder="ex: 9999.99" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<label class="label text-info">Amount</label>' +								
				'<label class="input">' +
					'<input value="1.00" class="text-right itemAmount" type="text" id="itemAmountGross_' + i + '" name="itemAmountGross_' + i + '" placeholder="ex: 99.99" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<a id="newItemGross_' + i + '"  class="newItem"><i class="glyphicon glyphicon-plus"></i></a>' +
			'</section>' +
			'<section class="col-xs-1">' +
				'<a id="delItemGross_' + i + '"  class="delItem"><i class="glyphicon glyphicon-minus"></i></a>' +
			'</section>' +
		'</div>';
	
	$("#itensInvoice").append(item);

	acertaSinalItem ();
	
	$('#newItem_' + i).off('click');
	$('#newItem_' + i).on('click', function () {
		createItem (i + 1, date, agency, destination, type);
		acertaSinalItem ()
	});
	
	$('#newItemGross_' + i).off('click');
	$('#newItemGross_' + i).on('click', function () {
		createItem (i + 1, date, agency, destination, type);
		acertaSinalItem ()
	});

	$('#delItem_' + i).off('click');
	$('#delItem_' + i).on('click', function () {
		$('#item_' + i).remove();
		$('#itemGross_' + i).remove();
		acertaSinalItem ()
		calcTotal();
	});

	$('#delItemGross_' + i).off('click');
	$('#delItemGross_' + i).on('click', function () {
		$('#item_' + i).remove();
		$('#itemGross_' + i).remove();
		acertaSinalItem ()
		calcTotal();
	});

	$('#itemValue_' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});
	$('#itemAmount_' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});
	$('#itemValueGross_' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});
	$('#itemAmountGross_' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});

	$('#itemValue_' + i).off('blur');
	$('#itemValue_' + i).on('blur', function () {
		calcTotal();
	});	

	$('#itemValueGross_' + i).off('blur');
	$('#itemValueGross_' + i).on('blur', function () {
		calcTotal();
	});	
	
	$('#itemAmount_' + i).off('blur');
	$('#itemAmount_' + i).on('blur', function () {
		$('#itemAmountGross_' + i).val($('#itemAmount_' + i).val())
		calcTotal();
	});	
	
	$('#itemAmountGross_' + i).off('blur');
	$('#itemAmountGross_' + i).on('blur', function () {
		$('#itemAmount_' + i).val($('#itemAmountGross_' + i).val())
		calcTotal();
	});	

	rest_obterPriceTableAll(carregaAppendPriceTable, semAcao, date, agency, destination, i, type);
};	
	
function carregaAppendPriceTable (data, i, type){
 
    $.each(data
		    , function (w, optionValue) {
    			if (optionValue.valid == "Yes" && optionValue.gross && optionValue.net){
   					$('#itemName_' + i).append( $(option(optionValue.name, "", true, optionValue.net + "_" + optionValue.gross + "_" + optionValue.name)));
   					$('#itemNameGross_' + i).append( $(option(optionValue.name, "", true, optionValue.net + "_" + optionValue.gross + "_" + optionValue.name)));
    			};
    });
    	
	$('#itemName_' + i).change(function() {
		$('#itemValue_' + i).val($( this ).val().split("_")[0]);
		$('#itemValueGross_' + i).val($( this ).val().split("_")[1]);
		$('#itemNameGross_' + i).val($('#itemName_' + i).val())
		calcTotal();
	});
	$('#itemNameGross_' + i).change(function() {
		$('#itemValue_' + i).val($( this ).val().split("_")[0]);
		$('#itemValueGross_' + i).val($( this ).val().split("_")[1]);
		$('#itemName_' + i).val($('#itemNameGross_' + i).val())
		calcTotal();
	});


};

function carregaTelaInvoice(data){

	$.each(data.documento.itensNet, function (i, item) {
		var actualTrip = data.student.actualTrip;
		createItem(i, data.student.trips[actualTrip].start, data.student.trips[actualTrip].agencyName, data.student.trips[actualTrip].destination, "net");
		$('#itemName_' + i).val(item.item);
		$('#itemValue_' + i).val(item.value);
		$('#itemAmount_' + i).val(item.amount);
    });
	$.each(data.documento.itensGross, function (i, item) {
		$('#itemNameGross_' + i).val(item.item);
		$('#itemValueGross_' + i).val(item.value);
		$('#itemAmountGross_' + i).val(item.amount);
    });

	createDue(0);
	$('#due_0').val(separaDataMes(data.documento.dueDate, "-"));
	$('#dueGross_0').val(separaDataMes(data.documento.dueDate, "-"));
	$('#dueValue_0').val(data.documento.amountNet);
	$('#dueValueGross_0').val(data.documento.amountGross);
	
}

function createDue(i){
	
	var item = 
		'<div id="dueItem_' + i + '"class="row dueItem net">' +
			'<section class="col-xs-3">' +
				'<label class="label text-info">Due date</label>' +								
				'<label class="input">' +
					'<input id="due_' + i + '" type="text" name="due_' + i + '" placeholder="" class="datepicker form-control" data-dateformat="dd-M-yy" >' +	
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-3">' +
				'<label class="label text-info">Value</label>' +								
				'<label class="input">' +
					'<input class="text-right dueValue " disabled="disabled" type="text" id="dueValue_' + i + '" name="dueValue_' + i + '" placeholder="" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
//			'<section class="col-xs-1">' +
//				'<a id="newDue_' + i + '"  class=""><i class="glyphicon glyphicon-plus"></i></a>' +
//			'</section>' +
//			'<section class="col-xs-1">' +
//				'<a id="delDue_' + i + '"  class=""><i class="glyphicon glyphicon-minus"></i></a>' +
//			'</section>' +
		'</div>' +
		'<div id="dueItemGross_' + i + '" class="row dueItemGross hide gross">' +
			'<section class="col-xs-3">' +
				'<label class="label text-info">Due date</label>' +								
				'<label class="input">' +
					'<input id="dueGross_' + i + '" type="text" name="dueGross_' + i + '" placeholder="" class="datepicker form-control" data-dateformat="dd-M-yy" >' +	
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-3">' +
				'<label class="label text-info">Value</label>' +								
				'<label class="input">' +
					'<input class="text-right dueValue " disabled="disabled" type="text" id="dueValueGross_' + i + '" name="dueValueGross_' + i + '" placeholder="" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
//			'<section class="col-xs-1">' +
//				'<a id="newDueGross_' + i + '"  class="hide"><i class="glyphicon glyphicon-plus"></i></a>' +
//			'</section>' +
//			'<section class="col-xs-1">' +
//				'<a id="delDueGross_' + i + '"  class="hide"><i class="glyphicon glyphicon-minus"></i></a>' +
//			'</section>' +
		'</div>';

	$("#dues").append(item);

	$('#dueValue_' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});
	$('#dueValueGross_' + i).maskMoney({thousands:'', decimal:'.', allowZero:true});

	$('#due_' + i).datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#dueGross_' + i).val($(this).val())
			if (i > 0){
				$('#due_' + (i-1)).datepicker('option', 'maxDate', selectedDate);
				$('#dueGross_' + (i-1)).datepicker('option', 'maxDate', selectedDate);
			};
		}
	});

	$('#dueGross_' + i).datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#due_' + i).val($(this).val())
			if (i > 0){
				$('#due_' + (i-1)).datepicker('option', 'maxDate', selectedDate);
				$('#dueGross_' + (i-1)).datepicker('option', 'maxDate', selectedDate);
			};
		}
	});

	acertaSinalDue ();
	
	$('#newDue_' + i).off('click');
	$('#newDue_' + i).on('click', function () {
		createDue (i + 1);
		acertaSinalDue ()
	});


	$('#newDueGross_' + i).off('click');
	$('#newDueGross_' + i).on('click', function () {
		createDue (i + 1);
		acertaSinalDue ()
	});

	$('#delDue_' + i).off('click');
	$('#delDue_' + i).on('click', function () {
		$('#dueItem_' + i).remove();
		$('#dueItemGross_' + i).remove();
		acertaSinalDue ()
	});

	$('#delDueGross_' + i).off('click');
	$('#delDueGross_' + i).on('click', function () {
		$('#dueItem_' + i).remove();
		$('#dueItemGross_' + i).remove();
		acertaSinalDue ()
	});
};

function calcTotal(){
	var total = 0;
	var totalGross = 0;
	$(".item").each(function(w) {
		var id = $(this).attr('id');
		var i = id.split("_")[1];
		total = parseFloat(total) + ((parseFloat($('#itemValue_' + i).val()) * parseFloat($('#itemAmount_' + i).val())));
		totalGross = parseFloat(totalGross) + ((parseFloat($('#itemValueGross_' + i).val()) * parseFloat($('#itemAmountGross_' + i).val())));
	});
	
	if (total){
		$('#totalValue').html(total.toFixed(2));
		$('#dueValue_' + localStorage.primeiroDue).val(total.toFixed(2));
	};
	if (totalGross){
		$('#totalValueGross').html(totalGross.toFixed(2));
		$('#dueValueGross_' + localStorage.primeiroDue).val(totalGross.toFixed(2));
	};	
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

function acertaSinalDue (){
	var ultimoItem = 0;
	localStorage.primeiroDue = 0;
	$(".dueItem").each(function(w) {
		var id = $(this).attr('id');
		var i = id.split("_")[1];
		if (w == 0){
			localStorage.primeiroDue = i;
		};
		$("#delDue_" + i).removeClass("hide");
		$("#delDueGross_" + i).removeClass("hide");
		$("#newDue_" + i).addClass("hide");
		$("#newDueGross_" + i).addClass("hide");
		$("#dueValue_" + i).val("");
		$("#dueValueGross_" + i).val("");
		ultimoItem = i;
	});
	$("#newDue_" + ultimoItem).removeClass("hide");
	$("#newDueGross_" + ultimoItem).removeClass("hide");
	if ($(".dueItem").length == 1){
		$("#delDue_" + ultimoItem).addClass("hide");
		$("#delDueGross_" + ultimoItem).addClass("hide");
	};
	
	calcTotal();
};

function carregaDadosTelaInvoice(data){
	
	localStorage.setItem("student", JSON.stringify(data));
    
	var actualTrip = data.documento.actualTrip;	    

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
	/**
	 *      Criar o primeira item 
	 */
	if (typePage != "change"){
		createItem(0, data.documento.trips[actualTrip].start, data.documento.trips[actualTrip].agencyName, data.documento.trips[actualTrip].destination, "net");
		createDue(0);
		$('#due_0').val(calculaData(data.documento.trips[actualTrip].start, -14));
		$('#dueGross_0').val(calculaData(data.documento.trips[actualTrip].start, -14));
	};
	
};