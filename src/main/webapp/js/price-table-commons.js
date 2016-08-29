

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


function limpaStoragePriceTable () {
	
	var data  =
			{ 
				documento :   
				  { 
				    name : "", 
				    description : "", 
				    valid : "", 
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
