	/**
	 * 		setup dos input do form price table
	 */
	var $tablesFormMain = $("#priceValueMainModal-form").validate({
		// Rules for form validation
		rules : {
			from : {
				required : true,
			},
			to : {
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
			gross : {
				required : 'Please enter gross value ',
			},
			net : {
				required : 'Please enter net value ',
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStoragePriceValueMain();
			var objJson = JSON.parse(localStorage.getItem("pricevaluemain"));
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
			localStorage.setItem("pricevaluemain", JSON.stringify(objJson));
			if (localStorage.agencyExistente == "true"){
				rest_atualizarDocumento (JSON.parse(localStorage.getItem("pricevaluemain")), "priceTableCost", fechaModalPriceValueMain, semAcao, JSON.parse(localStorage.getItem("pricetable")));
			}else{
				rest_incluirrDocumento (JSON.parse(localStorage.getItem("pricevaluemain")), "priceTableCost", fechaModalPriceValueMain, semAcao);
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

	$('#priceTableValueMainInclusao').off('click');
	$('#priceTableValueMainInclusao').on('click', function () {
		localStorage.priceValueMainExistente = "false";
	});

	$("#priceValueMainModal").off('hidden.bs.modal');
	$("#priceValueMainModal").on('hidden.bs.modal', function(event){
		$("#priceValueMainId").val("");
		$("#mainFrom").val("");
		$("#mainTo").val("");
		$("#mainDestination").val("");
		$("#mainAgency").val("");
		$("#mainGross").val("");
		$("#mainNet").val("");
	 });

	$('#mainFrom').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#mainTo').datepicker('option', 'minDate', selectedDate);
			}
	});


	$('#mainTo').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#mainFrom').datepicker('option', 'minDate', selectedDate);
			}
	});
	
	$('#mainGross').maskMoney({thousands:'', decimal:'.', allowZero:true});
	$('#mainNet').maskMoney({thousands:'', decimal:'.', allowZero:true});

 function fechaModalPriceValueMain () {
	$("#priceValueMainModal").modal('hide');
	
	$("#priceValueMainId").val("");
	$("#mainFrom").val("");
	$("#mainTo").val("");
	$("#mainDestination").val("");
	$("#mainGross").val("");
	$("#mainNet").val("");
	
	rest_obterPriceTableValueAll(id, carregaTableValueMain , semAcao);
};

function carregaLocalStoragePriceTable (data, tipo) {
	localStorage.setItem("pricevaluemain", JSON.stringify(data));
	localStorage.priceValueMainExistente = "true";
};

function carregaInclusaoAgency() { 	   	
	localStorage.priceValueMainExistente = "false";
};    

function limpaStoragePriceValueMain () {
	
	var data  = 
			{
				documento :  
				  {
					id:"",
				    type : "main",
				    idPriceTable : "",
				    agency : "",
				    destination : "",
				    from : "",
				    to : "",
				    gross : "",
				    net : ""
				  }
			};

	localStorage.setItem("pricevaluemain", JSON.stringify(data));
};		

function carregaInclusao(data) { 	   	
	localStorage.priceValueMainExistente = "false";
};    

function retornaPriceTable(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Price table updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("pricevaluemain"));
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
