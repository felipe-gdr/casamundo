	// ** setar menu
	$("#menuPriceTable_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var id = parametrosDaUrl.split("=")[1];
	 	 
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	//
	//***   chamar tela de alteração com o student da pagina
	//
	$( "#alteracaoButton" ).bind( "click", function() {
		$(window.document.location).attr('href','price-table-input.html?id=' + id );
	});
	
/**
 * 
 */
	
	var data = rest_obterPriceTable(id, carregaTelaPriceTable, obtencaoNaoEfetuada, "consulta");
	var table = JSON.parse(localStorage.getItem("table"));
		    
    
