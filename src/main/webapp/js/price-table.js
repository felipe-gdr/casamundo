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
	rest_obterTable(carregaTelaTabelas, obtencaoNaoEfetuada);
	rest_obterAgencyAll(carregaSelectAgencies, true);

	//
	//***   chamar tela de alteração com o student da pagina
	//
	$( "#alteracaoButton" ).bind( "click", function() {
		$(window.document.location).attr('href','price-table-input.html?id=' + id );
	});
	
/**
 * 
 */
	$("#priceValueMainIdPriceTable").val(id);
	$("#priceValueAgencyIdPriceTable").val(id);
	
	/**
	 * 
	 */
	var data = rest_obterPriceTable(id, carregaTelaPriceTable, obtencaoNaoEfetuada);
	rest_obterPriceTableValueAll(id, carregaTableValueMain , semAcao);
	rest_obterPriceTableValueAll(id, carregaTableValueAgency, semAcao);

	var table = JSON.parse(localStorage.getItem("table"));

		    