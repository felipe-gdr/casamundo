	/**
	 * 		setup dos input do form price table
	 */
	var $tablesFormAgency = $("#priceValueAgencyModal-form").validate({
		// Rules for form validation
		rules : {
			from : {
				required : true,
			},
			to : {
				required : true,
			},
			agency : {
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
			agency : {
				required : 'Please enter agency',
			},
			gross : {
				required : 'Please enter gross value ',
			},
			net : {
				required : 'Please enter net value ',
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStoragePriceValueAgency();
			var objJson = JSON.parse(localStorage.getItem("pricevalueagency"));
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
				if (field.value){
					objJson.documento[field.name] = value;
				};
			});
			localStorage.setItem("pricevalueagency", JSON.stringify(objJson));
			if (localStorage.priceValueAgencyExistente == "true"){
				rest_atualizaPriceTableValue(JSON.parse(localStorage.getItem("pricevalueagency")), fechaModalPriceValueAgency, semAcao);
			}else{
				rest_incluiPriceTableValue(JSON.parse(localStorage.getItem("pricevalueagency")), fechaModalPriceValueAgency, semAcao);
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

	$('#priceTableValueAgencyInclusao').off('click');
	$('#priceTableValueAgencyInclusao').on('click', function () {
		localStorage.priceValueAgencyExistente = "false";
	});

	$("#priceValueAgencyModal").off('hidden.bs.modal');
	$("#priceValueAgencyModal").on('hidden.bs.modal', function(event){
		$("#priceValueAgencyId").val("");
		$("#agencyFrom").val("");
		$("#agencyTo").val("");
		$("#agencyDestination").val("");
		$("#agencyGross").val("");
		$("#agencyNet").val("");
	 });

	$('#agencyFrom').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
	//		$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});


	$('#agencyTo').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
	//		$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});

 function fechaModalPriceValueAgency () {
	$("#priceValueAgencyModal").modal('hide');
	
	$("#priceValueAgencyId").val("");
	$("#agencyFrom").val("");
	$("#agencyTo").val("");
	$("#agencyDestination").val("");
	$("#agencyGross").val("");
	$("#agencyNet").val("");
	
	rest_obterPriceTableValueAll(id, carregaTableValueAgency , semAcao);
};

function carregaLocalStoragePriceTable (data, tipo) {
	localStorage.setItem("pricevalueagency", JSON.stringify(data));
	localStorage.priceValueAgencyExistente = "true";
};

function carregaInclusaoAgency() { 	   	
	localStorage.priceValueAgencyExistente = "false";
};    

function limpaStoragePriceValueAgency () {
	
	var data  = 
			{
				documento :  
				  {
					id:"",
				    type : "agency",
				    idPriceTable : "",
				    agency : "",
				    destination : "",
				    from : "",
				    to : "",
				    gross : "",
				    net : ""
				  }
			};

	localStorage.setItem("pricevalueagency", JSON.stringify(data));
};		

function carregaInclusao(data) { 	   	
	localStorage.priceValueAgencyExistente = "false";
};    

function retornaPriceTable(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Price table updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("pricevalueagency"));
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
