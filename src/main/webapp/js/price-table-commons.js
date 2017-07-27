	// ** setar menu
	$("#menuFinance_li").addClass("active");
	
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
			vendorType : {
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
			},
			vendorType : {
				required : 'Please enter vendor type ',
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
				};
				if (field.value){
					objJson.documento[field.name] = value;
				};
			});
			localStorage.setItem("pricetable", JSON.stringify(objJson));
			if (localStorage.priceTableExistente == "true"){
				rest_atualizaPriceTable(JSON.parse(localStorage.getItem("pricetable")), fechaModalPriceTable, semAcao, JSON.parse(localStorage.getItem("pricetable")));
			}else{
				rest_incluiPriceTable(JSON.parse(localStorage.getItem("pricetable")), retornaListaPriceTable, semAcao);
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

 function carregaTelaPriceTable(data, tipo) {
	
	$("#id").val(data._id);
	$("#name").html(data.documento.name);
	$("#description").html(data.documento.description);	
	$("#vendorTypeOutput").html(data.documento.vendorType);	
	$("#valid").html(data.documento.valid);
	
	if (data.documento.vendorType == "family"){
		$(".family-cost").removeClass ("hide");
		rest_obterFamiliesAll(carregaSelectFamilies, semAcao, localStorage.usuarioCity, true);
	}else{
		if (data.documento.vendorType == "pickup"){
			$(".pickup-cost").removeClass ("hide");
			rest_obterPickupAll(carregaSelectPickups, semAcao, localStorage.usuarioCity, true);
		}else{
			$(".main-cost").removeClass ("hide");
		}
	};
	localStorage.setItem("pricetable", JSON.stringify(data));
};    

 function fechaModalPriceTable () {
	
	$("#priceModal").modal('hide');
	
	$("#priceId").val("");
	$("#priceName").val("");
	$("#priceDescription").val("");
	$("#priceVendorType").val("");
	$("#pricevalid").val("No");
	
	var objJson = JSON.parse(localStorage.getItem("pricetable"));
	window.location="price-table.html?id=" + objJson.documento.id;
	
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
				    valid : "No",
				    vendorType : ""
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
