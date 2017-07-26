	/**
	 * 		setup dos input do form price table
	 */
	var $tablesFormPickup = $("#priceCostPickupModal-form").validate({
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
			limpaStoragePriceCostPickup();
			var objJson = JSON.parse(localStorage.getItem("pricecostpickup"));
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
			localStorage.setItem("pricecostpickup", JSON.stringify(objJson));
			if (localStorage.agencyExistente == "true"){
				rest_atualizarDocumento (JSON.parse(localStorage.getItem("pricecostpickup")), "priceTableCost", fechaModalPriceCostPickup, semAcao);
			}else{
				rest_incluirrDocumento (JSON.parse(localStorage.getItem("pricecostpickup")), "priceTableCost", fechaModalPriceCostPickup, semAcao);
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

	$('#priceTableCostPickupInclusao').off('click');
	$('#priceTableCostPickupInclusao').on('click', function () {
		localStorage.priceCostPickupExistente = "false";
	});

	$("#priceCostPickupModal").off('hidden.bs.modal');
	$("#priceCostPickupModal").on('hidden.bs.modal', function(event){
		$("#priceCostPickupId").val("");
		$("#pickupFrom").val("");
		$("#pickupTo").val("");
		$("#pickupType").val("");
		$("#pickupId").val("");
		$("#pickupValue").val("");
	 });

	$('#pickupFrom').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#pickupTo').datepicker('option', 'minDate', selectedDate);
			}
	});


	$('#pickupTo').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#pickupFrom').datepicker('option', 'minDate', selectedDate);
			}
	});
	
	$('#pickupValue').maskMoney({thousands:'', decimal:'.', allowZero:true});
	
 function fechaModalPriceCostPickup () {
	$("#priceCostPickupModal").modal('hide');
	
	$("#priceCostPickupId").val("");
	$("#pickupFrom").val("");
	$("#pickupTo").val("");
	$("#pickupType").val("");
	$("#pickupValue").val("");
	
	rest_obterPriceTableCostAll(id, carregaTableCostPickup , semAcao);
};

function carregaLocalStoragePriceTable (data, tipo) {
	localStorage.setItem("pricecostpickup", JSON.stringify(data));
	localStorage.priceCostPickupExistente = "true";
};

function carregaInclusaoPickup() { 	   	
	localStorage.priceCostPickupExistente = "false";
};    

function limpaStoragePriceCostPickup () {
	
	var data  = 
			{
				documento :  
				  {
					id:"",
				    type : "pickup",
				    idPriceTable : "",
				    idVendor : "",
				    from : "",
				    to : "",
				    value : ""
				  }
			};

	localStorage.setItem("pricecostpickup", JSON.stringify(data));
};		

function carregaInclusao(data) { 	   	
	localStorage.priceCostPickupExistente = "false";
};    

function retornaPriceTable(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Price table updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("pricecostpickup"));
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
