	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var familyName = parametrosDaUrl.split("=")[1];
	 	 
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
	 * 		esconde mapa
	 */
	$('.addressMap').addClass("hide");

	//
	//***   chamar tela de alteração com o student da pagina
	//
	$( "#alteracaoButton" ).bind( "click", function() {
		$(window.document.location).attr('href','family_input.html?familyName=' + familyName );
	});
	
/**
 * 
 */
	
	var data = rest_obterFamily(familyName, carregaTelaFamily, obtencaoNaoEfetuada, "consulta");
	var table = JSON.parse(localStorage.getItem("table"));
		    
    
