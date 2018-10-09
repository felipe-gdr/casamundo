	// ** setar menu
	$("#menuStudents_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
	var parameter = parametrosDaUrl.split("&");
	var actualTrip = null;
	if (parameter[1]) {
		typePage = parameter[1].split("=")[1];
	};
	
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);
	//
	//***   ler dados invoice
	//
	var invoiceId = "";
	if (typePage == "change"){
		if (parameter[2]){
			invoiceId = parameter[2].split("=")[1];
			rest_obterInvoice(invoiceId, carregaTelaInvoice, semAcao);
		};
		$("#menuInvoice_li").addClass("active");
		$("#breadcrumb_label_II").val("Invoices");
		$("#geraPayments").removeClass("hide");
	};
	
	if (typePage == "create"){
		if (parameter[2]) {
		    criaLinhaNote(0);
			actualTrip = parameter[2].split("=")[1];
			$('#number').html(rest_invoice_get_number());
			rest_obterStudent(mailUrl, carregaDadosTelaInvoice, obtencaoNaoEfetuada, actualTrip);
		};
	};
	
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
	var table = JSON.parse(localStorage.getItem("table"));

/**
 * 
 */
	var valueNet = true;
	$('#type').off('click');
	$('#type').on('click', function () {
		if ($(this).is(':checked')){
			valueNet = false;
			$(".net").addClass("hide");
			$(".gross").removeClass("hide");
		}else{
			valueNet = true;
			$(".gross").addClass("hide");
			$(".net").removeClass("hide");			
		}
	});
	
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
			criaInvoice(actualTrip, invoiceId);
		}
	});

	$('#geraPayments').off('click');
	$('#geraPayments').on('click', function () {
		window.location = "create-payments-vendors.html?mail=" + mailUrl + "&typePage=create&id=" + invoiceId; 
	});

	/**
	 * 
	 */
	var splitRegex = /\r\n|\r|\n/g;
	jsPDF.API.textEx = function (text, x, y, hAlign, vAlign) {
	    var fontSize = this.internal.getFontSize() / this.internal.scaleFactor;

	    // As defined in jsPDF source code
	    var lineHeightProportion = 1.15;

	    var splittedText = null;
	    var lineCount = 1;
	    if (vAlign === 'middle' || vAlign === 'bottom' || hAlign === 'center' || hAlign === 'right') {
	        splittedText = typeof text === 'string' ? text.split(splitRegex) : text;
	        if (splittedText){
	        	lineCount = splittedText.length || 1;
	        }else{
	        	lineCount = 0;
	        }
	    };

	    // Align the top
	    y += fontSize * (2 - lineHeightProportion);

	    if (vAlign === 'middle')
	        y -= (lineCount / 2) * fontSize;
	    else if (vAlign === 'bottom')
	        y -= lineCount * fontSize;

	    if (hAlign === 'center' || hAlign === 'right') {
	        var alignSize = fontSize;
	        if (hAlign === 'center')
	            alignSize *= 0.5;

	        if (lineCount > 1) {
	            for (var iLine = 0; iLine < splittedText.length; iLine++) {
	                this.text(splittedText[iLine], x - this.getStringUnitWidth(splittedText[iLine]) * alignSize, y);
	                y += fontSize;
	            }
	            return this;
	        }
	        x -= this.getStringUnitWidth(text) * alignSize;
	    }

	    this.text(text, x, y);
	    return this;
	};
	
	var doc = new jsPDF('p','mm','a4')
	var specialElementHandlers = {
	    '#editor': function (element, renderer) {
	        return true;
	    }
	};
	var img = new Image();
	img.addEventListener('load', function() {
	    doc.addImage(img, 'png', 170, 5, 20, 20);
	});
	img.src = 'img/logo/casatoronto.png';		

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(40);
	doc.setTextColor(0, 51, 102);
	doc.text(15, 30, 'INVOICE');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 40, 'Casa Toronto');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(12);
	doc.setTextColor(0, 51, 102);
	doc.text(15, 55, 'BILL TO');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(12);
	doc.setTextColor(0, 51, 102);
	doc.text(65, 55, 'STUDENT NAME');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(11);
	doc.setTextColor(0, 51, 102);
	doc.text(125, 55, 'INVOICE #');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.textEx($('#number').html(), 190, 55, 'right', 'middle');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 65, $('#agencyName').html());

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	doc.text(65, 65, $('#studentCompleteName').html());

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(11);
	doc.setTextColor(0, 51, 102);
	doc.text(125, 65, 'INVOICE DATE');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 0, 0);
	var hoje = new Date();
	doc.textEx(hoje.getDate() + "-" + converteMesAlfa(hoje.getMonth()) + "-" + hoje.getFullYear(), 190, 65, 'right', 'middle');

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(8);
	doc.setTextColor(0, 51, 102);
	doc.text(65, 70, 'Trip:' + $('#start').html() + " / " + $('#end').html());

	doc.setLineWidth();
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 75, 190, 75);
	
	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 51, 102);
//	doc.text(15, 81, 'DESCRIPTION');
	doc.textEx('DESCRIPTION', 39, 81, 'right', 'top');
	
	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 51, 102);
	doc.textEx('QUANTITY', 140, 81, 'right', 'top');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 51, 102);
	doc.textEx('UNIT PRICE', 163, 81, 'right', 'top');

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(10);
	doc.setTextColor(0, 51, 102);
	doc.textEx('VALUE', 190, 81, 'right', 'top');

	doc.setLineWidth();
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 85, 190, 85);

	doc.setLineWidth(1.5);
	doc.setDrawColor(238, 111, 26);
	doc.line(15, 250, 190, 250);

	doc.setFont("helvetica");
	doc.setFontType("bold");
	doc.setFontSize(09);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 255, "Bank deposit to date : " + $('#due_0').val());

	doc.setFont("helvetica");
	doc.setFontType("italic");
	doc.setFontSize(09);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 260, "Beneficiary: Casa Toronto Corp.");

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(08);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 265, "Address: 1512 - 153 Beecroft Rd Toronto,ON M2N 7C5");

	doc.setFont("helvetica");
	doc.setFontType("italic");
	doc.setFontSize(09);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 270, "Bank Name: TD Canada Trust Bank");

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(08);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 275, "Bank Address: 5650 Yonge Street Toronto, ON M2M 4G3 Branch/Transit# 19702");

	doc.setFont("helvetica");
	doc.setFontType("normal");
	doc.setFontSize(08);
	doc.setTextColor(0, 0, 0);
	doc.text(15, 280, "Account# 5254696 Bank# 004 Swift Code: TDOMCATTTOR");

	$('#geraPDF').click(function () {
		$('#invoiceSubmmit').trigger( "click" );
		if (localStorage.valid == "true"){
			var hight = 95;
			$(".item").each(function() {
				var id = $(this).attr('id');
				var i = id.split("_")[1];
				if ($('#itemDescription_' + i).val()) {
					doc.setFont("helvetica");
					doc.setFontType("normal");
					doc.setFontSize(09);
					doc.setTextColor(0, 0, 0);
					doc.text(15, hight,itemPriceTable($('#itemId_' + i).val()).description);
					
				};
				if ($('#itemAmount_' + i).val()) {
					doc.setFont("helvetica");
					doc.setFontType("normal");
					doc.setFontSize(09);
					doc.setTextColor(0, 0, 0);
					doc.textEx($('#itemAmount_' + i).val(), 140, hight, 'right', 'middle');
				};
				if ($('#itemId_' + i).val()) {
					if(valueNet){
						doc.setFont("helvetica");
						doc.setFontType("normal");
						doc.setFontSize(09);
						doc.setTextColor(0, 0, 0);
						doc.textEx(itemPriceTable($('#itemId_' + i).val()).net, 160, hight, 'right', 'middle');
					}else{
						doc.setFont("helvetica");
						doc.setFontType("normal");
						doc.setFontSize(09);
						doc.setTextColor(0, 0, 0);
						doc.textEx(itemPriceTable($('#itemId_' + i).val()).gross, 160, hight, 'right', 'middle');						
					};
				};
				var totaltem = 0.00;
				if(valueNet){
					if ($('#itemValue_' + i).val()) {
						totaltem = parseFloat($('#itemValue_' + i).val()) * parseFloat($('#itemAmount_' + i).val());
						doc.setFont("helvetica");
						doc.setFontType("normal");
						doc.setFontSize(09);
						doc.setTextColor(0, 0, 0);
						doc.textEx("$ " + totaltem.toFixed(2), 190, hight, 'right', 'middle');
					};
				}else{
					if ($('#itemValueGross_' + i).val()) {
						totaltem = parseFloat($('#itemValueGross_' + i).val()) * parseFloat($('#itemAmount_' + i).val());
						doc.setFont("helvetica");
						doc.setFontType("normal");
						doc.setFontSize(09);
						doc.setTextColor(0, 0, 0);
						doc.textEx("$ " + totaltem.toFixed(2), 190, hight, 'right', 'middle');
					};
				};
				hight = hight + 7;
			});	
			hight = hight + 10;
			doc.setFont("helvetica");
			doc.setFontType("bold");
			doc.setFontSize(12);
			doc.setTextColor(0, 51, 102);
			doc.textEx('TOTAL', 160, hight, 'right', 'middle');
			doc.setFont("helvetica");
			doc.setFontType("normal");
			doc.setFontSize(10);
			doc.setTextColor(0, 0, 0);
			if(valueNet){
				doc.textEx($('#dueValue_0').val(), 190, hight, 'right', 'middle');
			}else{
				doc.textEx($('#dueValueGross_0').val(), 190, hight, 'right', 'middle');				
			}
		    doc.fromHTML($('#invoice-pdf').html(), 5, 5, {
		        'width': 170,
		            'elementHandlers': specialElementHandlers
		    });
		    doc.save("invoice_" + $("#mail").html() + '.pdf');
		};
	});

function saveLastInvoice (data) {
	localStorage.numberInvoice = parseInt(localStorage.numberInvoice) + 1;
};


function firstInvoice () {
	localStorage.numberInvoice = 1;
};

function limpaStorageInvoice () {
	
};

function criaInvoice(actualTrip){

	var objStudent = JSON.parse(localStorage.getItem("student"));
	
	if (!actualTrip){
		actualTrip = objStudent.documento.actualTrip;
	};
	var objInvoice =
		{
			documento:
				{
					idStudent : objStudent._id,
					actualTrip : $('#actualTrip').val(),
					status : "unpaid",
					dueDate : limpaData($('#due_0').val()),
					amountNet : $('#dueValue_0').val(),
					amountGross : $('#dueValueGross_0').val(),
					destination : objStudent.documento.trips[actualTrip].destination,
					agenchyName : objStudent.documento.trips[actualTrip].agencyName,
					agencyId : objStudent.documento.trips[actualTrip].agencyId,
					itensNet : [],
					itensGross : [],
					installments : [],
					notes : [],
					number : $('#dueValue_0').html()
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
	$(".noteItem").each(function(i, value) {
		if ($("#notesDate_" + i).val()) {
			objInvoice.documento.notes.push(JSON.parse('{"date":"' + $("#notesDate_" + i).val() 
													+ '","user":"' + $("#notesUser_" + i).val() 
													+ '","note":"' + $("#notesNote_" + i).val() 
													+  '"}'
													));
		};
	});
	
	if (typePage == "change"){
		objInvoice._id = invoiceId;
		var invoice = rest_atualizaInvoice(objInvoice);
		retornaInvoice("invoices.html");
	}else{
		var invoice = rest_incluiInvoice(objInvoice);
		retornaInvoice("invoices.html");
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
			'<section class="col-xs-5">' +
				'<label class="label text-info">Item</label>' +							
				'<label class="select">' +
					'<select class="iteName' + i + '" id="itemId_' + i + '" name="itemId_' + i + '">' +
						'<option value="" selected="" disabled="">Choose one item</option>' +
					'</select><i></i>' +
				'</label>' +
				'<input class="hide" type="text" id="itemDescription_' + i + '" name="itemDescription_' + i + '"  >' +
				'<input class="hide" type="text" id="itemIdPriceTable_' + i + '" name="itemIdPriceTable_' + i + '"  >' +
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
					'<input value="1" class="text-right itemAmount" type="text" id="itemAmount_' + i + '" name="itemAmount_' + i + '" placeholder="ex: 99.99" >' +
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
			'<section class="col-xs-5">' +
				'<label class="label text-info">Item</label>' +							
				'<label class="select">' +
					'<select class="itemName' + i + '" id="itemIdGross_' + i + '" name="itemIdGross_' + i + '">' +
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
					'<input value="1" class="text-right itemAmount" type="text" id="itemAmountGross_' + i + '" name="itemAmountGross_' + i + '" placeholder="ex: 99" >' +
				'</label>' +
			'</section>' +
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
	$('#itemAmount_' + i).maskMoney({thousands:'', precision:0, allowZero:true});
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
	
	var priceTableJson =
		{
			itens : []
		};
	
    $.each(data, function (w, priceTable) {
    			if (priceTable.valid == "Yes" && priceTable.gross && priceTable.net){
   					$('#itemId_' + i).append( $(option(priceTable.description, "", true, priceTable.id)));
   					$('#itemIdGross_' + i).append( $(option(priceTable.description, "", true, priceTable.id)));
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
		$('#itemValueGross_' + i).val(itemPriceTable($( this ).val()).gross);
		$('#itemIdGross_' + i).val(itemPriceTable($( this ).val()).id);
		$('#itemDescription_' + i).val(itemPriceTable($( this ).val()).description);
		calcTotal();
	});
	$('#itemIdGross_' + i).change(function() {
		$('#itemValue_' + i).val(itemPriceTable($( this ).val()).net);
		$('#itemValueGross_' + i).val(itemPriceTable($( this ).val()).gross);
		$('#itemId_' + i).val(itemPriceTable($( this ).val()).id);
		$('#itemDescription_' + i).val(itemPriceTable($( this ).val()).description);
		calcTotal();
	});


};

function carregaTelaInvoice(data){

	var actualTrip = data.documento.actualTrip;
	
	$('#number').html(data.documento.number);
	
	rest_obterStudent(mailUrl, carregaDadosTelaInvoice, obtencaoNaoEfetuada, actualTrip);
	
	$.each(data.documento.itensNet, function (i, item) {
		createItem(i, data.student.trips[actualTrip].start, data.student.trips[actualTrip].agencyName, data.student.trips[actualTrip].destination, "net");
		$('#itemId_' + i).val(item.item);
		$('#itemIdGross_' + i).val(item.item);
		$('#itemDescription_' + i).val(item.description);
		$('#itemValue_' + i).val(item.value);
		$('#itemAmount_' + i).val(item.amount);
    });
	$.each(data.documento.itensGross, function (i, item) {
		$('#itemValueGross_' + i).val(item.value);
		$('#itemAmountGross_' + i).val(item.amount);
    });

	createDue(0);
	$('#due_0').val(separaDataMes(data.documento.dueDate, "-"));
	$('#dueGross_0').val(separaDataMes(data.documento.dueDate, "-"));
	$('#dueValue_0').val(data.documento.amountNet);
	$('#dueValueGross_0').val(data.documento.amountGross);

	var linesNote = 0;
    $.each(data.documento.notes
		    , function (i, value) {
	    criaLinhaNote(i);
	    $('#notesDate_' + i).val(value.date);
    	$('#notesUser_' + i).val(value.user);
    	$('#notesNote_' + i).val(value.note);
    	linesNote = i + 1;
    });
    criaLinhaNote(linesNote);
	
};

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
    $('#accommodation').html(data.documento.trips[actualTrip].accommodation);
    $('#destination').html(data.documento.trips[actualTrip].destination);
    $('#contactFamilyName').html(data.documento.trips[actualTrip].contactFamilyName);
 
    var durationTrip = intervaloDatas(data.documento.trips[actualTrip].start, data.documento.trips[actualTrip].end);

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
		$('#due_0').val(calculaData(data.documento.trips[actualTrip].start, -28));
		$('#dueGross_0').val(calculaData(data.documento.trips[actualTrip].start, -28));
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

function criaLinhaNote (i, note) {
	var noteLine = '<li class="noteItem">' +
			'<div class="col-xs-11">' +
				'<fieldset class="notesList">' +					
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-calendar"></i>' +
							'<input type="text" id="notesDate_' + i + '" name="notesDate_' + i + '" class="datepicker " data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input"><i class="icon-prepend fa fa-user"></i>'  +
						'<input class=""type="text" id="notesUser_' + i + '" name="notesUser_' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-4">' +
						'<label class="input">'  +
							'<textarea rows="3" cols="40" id="notesNote_' + i + '" name="notesNote_' + i + '" class="custom-scroll"></textarea>' +
						'</label>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';
	$("#notesList").append(noteLine);
	$('#notesDate_' + i).datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
		}
	});
	$( "#notesDate_" + (i - 1)).unbind();
	$( "#notesDate_" + i).bind( "blur", function() {
		criaLinhaNote(i + 1, note);
		$('#notesUser_' + i).val(localStorage.usuarioEmail);
	});
};
