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
 *     Guarda o primeiro item do due date 
 */
	
	localStorage.primeiroDue = 0;
/**
 * 
 */
	var data = rest_obterStudent(mailUrl, carregaStudent, obtencaoNaoEfetuada);
	var table = JSON.parse(localStorage.getItem("table"));
    var actualTrip = getValueStudent("actualTrip");	    

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
	$('#geraPDF').click(function () {
		html2canvas($("#div-pdf"), {
	        onrendered: function(canvas) {
	        	return Canvas2Image.saveAsPNG(canvas);
	        }
	    });
		/*		html2canvas(document.getElementById("testepdf"),{
			onrendered: function (canvas){
				var img = canvas.toDataURL("image/png");
				window.open(img);
				var doc = new jsPDF();
				doc.addImage (img, JPEG, 100, 100);
			    doc.save('invoice_' + mailUrl + '.pdf');				
			}
		})
*/
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
		var a = (parseFloat($('#totalValue').html()));
		if (total != (parseFloat($('#totalValue').html()))){
			$.smallBox({
				title : "Error",
				content : "<i class='fa fa-clock-o'></i> <i>Amount Installment do not equal total invoice</i>",
				color : "#ff8080",
				iconSmall : "fa fa-check fa-2x fadeInRight animated",
				timeout : 4000
			});
			valid = false;
		}
		if (valid){
			retornaInvoice();
		}
	});

    
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

function limpaStorageInvoice () {
	
};

function retornaInvoice(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Invoice created</i>",
		color : "#659265",
		
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	window.location="students.html"; 
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
   					$('#itemName_' + i).append( $(option(optionValue.name, "", true, optionValue.net + "_" + optionValue.gross)));
   					$('#itemNameGross_' + i).append( $(option(optionValue.name, "", true, optionValue.net + "_" + optionValue.gross)));
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
					'<input class="text-right dueValue disable" type="text" id="dueValue_' + i + '" name="dueValue_' + i + '" placeholder="" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<a id="newDue_' + i + '"  class=""><i class="glyphicon glyphicon-plus"></i></a>' +
			'</section>' +
			'<section class="col-xs-1">' +
				'<a id="delDue_' + i + '"  class=""><i class="glyphicon glyphicon-minus"></i></a>' +
			'</section>' +
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
					'<input class="text-right dueValue disable" type="text" id="dueValueGross_' + i + '" name="dueValueGross_' + i + '" placeholder="" >' +
				'</label>' +
			'</section>' +
			'<section class="col-xs-1"></section>' +
			'<section class="col-xs-1">' +
				'<a id="newDueGross_' + i + '"  class=""><i class="glyphicon glyphicon-plus"></i></a>' +
			'</section>' +
			'<section class="col-xs-1">' +
				'<a id="delDueGross_' + i + '"  class=""><i class="glyphicon glyphicon-minus"></i></a>' +
			'</section>' +
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
}