function carregaLocalStorageAgency (data, tipo) {
    localStorage.setItem("agency", JSON.stringify(data));
    localStorage.agencyExistente = "true";
};

function carregaInclusao(data) { 	   	
	localStorage.agencyExistente = "false";
};    

function limpaStorageAgency () {
	
	var data  = JSON.parse(
			'{' +
				'"documento" : ' + 
				  '{' +
				    '"name" : "",' +
				    '"nameConsult" : "",' +
				    '"cellPhone" : "",' +
				    '"phone" : "",' +
				    '"email" : "",' +
				  '}' +
			'}'
	);

	localStorage.setItem("agency", JSON.stringify(data));
};		
function carregaInclusao(data) { 	   	
	localStorage.agencyExistente = "false";
};    
