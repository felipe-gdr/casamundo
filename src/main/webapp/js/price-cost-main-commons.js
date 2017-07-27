	/**
	 * 		carrega cabeçalho da lista de cistos
	 */
		var objPriceTable = JSON.parse(localStorage.getItem("pricetable"));
		$("#labelMainCost").html(objPriceTable.documento.vendorType + " cost");
	/**
	 * 		setup dos input do form price table
	 */
	var $tablesFormMain = $("#priceCostMainModal-form").validate({
		// Rules for form validation
		rules : {
			from : {
				required : true,
			},
			to : {
				required : true,
			},
			value : {
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
			value : {
				required : 'Please enter value ',
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStoragePriceCostMain();
			var objJson = JSON.parse(localStorage.getItem("pricecostmain"));
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
			var objPriceTable = JSON.parse(localStorage.getItem("pricetable"));
			objJson.documento.type = objPriceTable.documento.vendorType;
			localStorage.setItem("pricecostmain", JSON.stringify(objJson));
			if (localStorage.priceCostMainExistente == "true"){
				rest_atualizaPriceTableCost(JSON.parse(localStorage.getItem("pricecostmain")), fechaModalPriceCostMain, semAcao);
			}else{
				rest_incluiPriceTableCost(JSON.parse(localStorage.getItem("pricecostmain")), fechaModalPriceCostMain, semAcao);
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

	$('#priceTableCostMainInclusao').off('click');
	$('#priceTableCostMainInclusao').on('click', function () {
		localStorage.priceCostMainExistente = "false";
	});

	$("#priceCostMainModal").off('hidden.bs.modal');
	$("#priceCostMainModal").on('hidden.bs.modal', function(event){
		$("#priceCostMainId").val("");
		$("#mainCostFrom").val("");
		$("#mainCostTo").val("");
		$("#mainCostType").val("");
		$("#mainCostValue").val("");
	 });

	$('#mainCostFrom').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#mainTo').datepicker('option', 'minDate', selectedDate);
			}
	});

	$('#mainCostTo').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#mainFrom').datepicker('option', 'minDate', selectedDate);
			}
	});
	
	$('#mainCostValue').maskMoney({thousands:'', decimal:'.', allowZero:true});

 function fechaModalPriceCostMain () {
	$("#priceCostMainModal").modal('hide');
	
	$("#priceCostMainId").val("");
	$("#mainCostFrom").val("");
	$("#mainCostTo").val("");
	$("#mainCostType").val("");
	$("#mainCostValue").val("");
	
	rest_obterPriceTableCostAll(id, carregaTableCostMain , semAcao);
};

function carregaLocalStoragePriceTable (data, tipo) {
	localStorage.setItem("pricecostmain", JSON.stringify(data));
	localStorage.priceCostMainExistente = "true";
};

function limpaStoragePriceCostMain () {
	
	var data  = 
			{
				documento :  
				  {
					id:"",
				    type : "",
				    idPriceTable : "",
				    idVendor : "",
				    from : "",
				    to : "",
				    value : ""
				  }
			};

	localStorage.setItem("pricecostmain", JSON.stringify(data));
};		

function carregaInclusao(data) { 	   	
	localStorage.priceCostMainExistente = "false";
};    

function retornaPriceTable(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Price table updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("pricecostmain"));
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
