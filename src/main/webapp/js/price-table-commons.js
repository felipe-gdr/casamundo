	/**
	 * 		setup dos input do form price table
	 */
	var $tablesForm = $("#priceModal-form").validate({
		// Rules for form validation
		rules : {
			name : {
				required : true,
			},
			description : {
				required : true,
			},
			valid : {
			},
		},

		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter prive table name',
			},
			description : {
				required : 'Please enter description ',
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStoragePriceTable();
			var objJson = JSON.parse(localStorage.getItem("pricetable"));
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
			localStorage.setItem("pricetable", JSON.stringify(objJson));
			if (localStorage.priceTableExistente == "true"){
				rest_atualizaPriceTable(JSON.parse(localStorage.getItem("pricetable")), fechaModalPriceTable, semAcao);
			}else{
				rest_incluiPriceTable(JSON.parse(localStorage.getItem("pricetable")), fechaModalPriceTable, semAcao);
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

	$('#priceTableInclusao').off('click');
	$('#priceTableInclusao').on('click', function () {
		localStorage.priceTableExistente = "false";
	});

	$("#priceModal").off('hidden.bs.modal');
	$("#priceModal").on('hidden.bs.modal', function(event){
		$("#priceId").val("");
		$("#priceName").val("");
		$("#priceDescription").val("");
		$("#priceValid").val("");
	 });

function carregaTelaPriceTable(data, tipo) {
	

	if (tipo == "consulta"){
	//
	// **** carrega tela consulta
	//
		$("#name").html(data.documento.name);
		$("#description").html(data.documento.description);	
		$("#valid").html(data.documento.valid);
	};	

	if (tipo == "alteracao"){
		//
		// **** carrega tela alteração
		//
		$("#name").val(data.documento.name);
		$("#description").val(data.documento.description);	
		if (data.documento.valid == "Yes"){
			$("#valid").prop("checked", true)
		};
	};
	
	localStorage.setItem("pricetable", JSON.stringify(data));
};    

 function fechaModalPriceTable () {
	$("#priceModal").modal('hide');
	
	$("#priceName").val("");
	$("#priceDescription").val("");
	$("#pricevalid").val("No");
	
	rest_obterPriceTableAll(carregaPriceTable, semAcao);
};

function carregaLocalStoragePriceTable (data, tipo) {
	localStorage.setItem("pricetable", JSON.stringify(data));
	localStorage.priceTableExistente = "true";
};

function carregaInclusaoAgency() { 	   	
	localStorage.priceTableExistente = "false";
};    

function limpaStoragePriceTable () {
	
	var data  = 
			{
				documento :  
				  {
					id:"",
				    name : "",
				    description : "",
				    valid : "No"
				  }
			};

	localStorage.setItem("pricetable", JSON.stringify(data));
};		

function carregaInclusao(data) { 	   	
	localStorage.priceTableExistente = "false";
};    

function retornaPriceTable(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Price table updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("pricetable"));
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