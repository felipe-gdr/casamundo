	/**
	 * 		setup dos input do form price table
	 */
	var $tablesFormFamily = $("#priceCostFamilyModal-form").validate({
		// Rules for form validation
		rules : {
			from : {
				required : true,
			},
			to : {
				required : true,
			},
			value : {
				required : true
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
				required : 'Please enter net value ',
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStoragePriceCostFamily();
			var objJson = JSON.parse(localStorage.getItem("pricecostfamily"));
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
			localStorage.setItem("pricecostfamily", JSON.stringify(objJson));
			if (localStorage.agencyExistente == "true"){
				rest_atualizarDocumento (JSON.parse(localStorage.getItem("pricecostfamily")), "priceTableCost", fechaModalPriceCostFamily, semAcao);
			}else{
				rest_incluirrDocumento (JSON.parse(localStorage.getItem("pricecostfamily")), "priceTableCost", fechaModalPriceCostFamily, semAcao);
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
	 * 				carrega drop down family
	 */
	rest_obterFamiliesAll(carregaSelectFamilies, semAcao, localStorage.usuarioCity, null, "true");

	/**
	 * 
	 */

	$('#priceTableCostFamilyInclusao').off('click');
	$('#priceTableCostFamilyInclusao').on('click', function () {
		localStorage.priceCostFamilyExistente = "false";
	});

	$("#priceCostFamilyModal").off('hidden.bs.modal');
	$("#priceCostFamilyModal").on('hidden.bs.modal', function(event){
		$("#priceCostFamilyId").val("");
		$("#familyFrom").val("");
		$("#familyTo").val("");
		$("#familyType").val("");
		$("#familyId").val("");
		$("#familyValue").val("");
	 });

	$('#familyFrom').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#familyTo').datepicker('option', 'minDate', selectedDate);
			}
	});


	$('#familyTo').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#familyFrom').datepicker('option', 'minDate', selectedDate);
			}
	});
	
	$('#familyValue').maskMoney({thousands:'', decimal:'.', allowZero:true});
	
 function fechaModalPriceCostFamily () {
	$("#priceCostFamilyModal").modal('hide');
	
	$("#priceCostFamilyId").val("");
	$("#familyFrom").val("");
	$("#familyTo").val("");
	$("#familyType").val("");
	$("#familyValue").val("");
	
	rest_obterPriceTableCostAll(id, carregaTableCostFamily , semAcao);
};

function carregaLocalStoragePriceTable (data, tipo) {
	localStorage.setItem("pricecostfamily", JSON.stringify(data));
	localStorage.priceCostFamilyExistente = "true";
};

function carregaInclusaoFamily() { 	   	
	localStorage.priceCostFamilyExistente = "false";
};    

function limpaStoragePriceCostFamily () {
	
	var data  = 
			{
				documento :  
				  {
					id:"",
				    type : "family",
				    idPriceTable : "",
				    idVendor : "",
				    from : "",
				    to : "",
				    value : ""
				  }
			};

	localStorage.setItem("pricecostfamily", JSON.stringify(data));
};		

function carregaInclusao(data) { 	   	
	localStorage.priceCostFamilyExistente = "false";
};    

function retornaPriceTable(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Price table updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("pricecostfamily"));
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

