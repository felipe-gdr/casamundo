	/**
	 * 		setup dos input do form price table
	 */
	var $tablesFormVendor = $("#priceCostVendorModal-form").validate({
		// Rules for form validation
		rules : {
			from : {
				required : true,
			},
			to : {
				required : true,
			},
			vendor : {
				required : true,
			},
			gross : {
				required : true,
			},
			net : {
				required : true,
			}
		},

		// Messages for form validation
		messages : {
			from : {
				required : 'Please enter from interval',
			},
			to : {
				required : 'Please enter to interval ',
			},
			vendorType : {
				required : 'Please enter type',
			},
			vendorId : {
				required : 'Please enter vendor',
			},
			value : {
				required : 'Please enter net value ',
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStoragePriceCostVendor();
			var objJson = JSON.parse(localStorage.getItem("pricecostvendor"));
			var id = "";
			$.each(form
			    , function (i, field) {
				var value = field.value;
				if (field.type == "radio" || field.type == "checkbox") {
					if (field.checked){
						value = "Yes"
					}else{
						value = "No"
					}
				}
				if (field.name == "id"){
					id = field.value;
				}
				if (field.name == "from" | field.name == "to"){
					value = limpaData(value)
				}
				
				if (field.value){
					objJson.documento[field.name] = value;
				};
			});
			localStorage.setItem("pricecostvendor", JSON.stringify(objJson));
			if (localStorage.priceCostVendorExistente == "true"){
				rest_atualizaPriceTableCost(JSON.parse(localStorage.getItem("pricecostvendor")), fechaModalPriceCostVendor, semAcao);
			}else{
				rest_incluiPriceTableCost(JSON.parse(localStorage.getItem("pricecostvendor")), fechaModalPriceCostVendor, semAcao);
			};
		},	
		// Do not change code below
		errorPlacement : function(error, element) {
			error.insertAfter(element.parent());
			$.smallBox({
				title : "Error",
				content : "<i class='fa fa-clock-o'></i> <i>There is a error</i>",
				color : "#ff8080",
				iconSmall : "fa fa-check fa-2x fadeInRight animated",
				timeout : 4000
			});
		}
	});

	/**
	 * 
	 */

	$('#priceTableCostVendorInclusao').off('click');
	$('#priceTableCostVendorInclusao').on('click', function () {
		localStorage.priceCostVendorExistente = "false";
	});

	$("#priceCostVendorModal").off('hidden.bs.modal');
	$("#priceCostVendorModal").on('hidden.bs.modal', function(event){
		$("#priceCostVendorId").val("");
		$("#vendorFrom").val("");
		$("#vendorTo").val("");
		$("#vendorType").val("");
		$("#vendorId").val("");
		$("#vendorValue").val("");
	 });

	$('#vendorFrom').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#vendorTo').datepicker('option', 'minDate', selectedDate);
			}
	});


	$('#vendorTo').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#vendorFrom').datepicker('option', 'minDate', selectedDate);
			}
	});
	
	$('#vendorValue').maskMoney({thousands:'', decimal:'.', allowZero:true});
	
 function fechaModalPriceCostVendor () {
	$("#priceCostVendorModal").modal('hide');
	
	$("#priceCostVendorId").val("");
	$("#vendorFrom").val("");
	$("#vendorTo").val("");
	$("#vendorType").val("");
	$("#vendorValue").val("");
	
	rest_obterPriceTableCostAll(id, carregaTableCostVendor , semAcao);
};

function carregaLocalStoragePriceTable (data, tipo) {
	localStorage.setItem("pricecostvendor", JSON.stringify(data));
	localStorage.priceCostVendorExistente = "true";
};

function carregaInclusaoVendor() { 	   	
	localStorage.priceCostVendorExistente = "false";
};    

function limpaStoragePriceCostVendor () {
	
	var data  = 
			{
				documento :  
				  {
					id:"",
				    type : "main",
				    idPriceTable : "",
				    idVendor : "",
				    from : "",
				    to : "",
				    value : ""
				  }
			};

	localStorage.setItem("pricecostvendor", JSON.stringify(data));
};		

function carregaInclusao(data) { 	   	
	localStorage.priceCostVendorExistente = "false";
};    

function retornaPriceTable(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Price table updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("pricecostvendor"));
	window.location="price-table.html?id=" + objJson.id; 
};

function retornaListaPriceTable(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Price table included</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	window.location="prices-table.html"; 
};
