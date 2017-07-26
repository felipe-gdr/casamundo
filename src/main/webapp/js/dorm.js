	// ** setar menu
	$("#menuDorms_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var id = parametrosDaUrl.split("=")[1];
	 	 
	/**
	 * 		carrega tabelas
	 */
	rest_listaOneKey("table", null, null, true, carregaTabelas, obtencaoNaoEfetuada, var1, var2, var3)

	/**
	 * 		esconde mapa
	 */
	$('.addressMap').addClass("hide");

	//
	//***   chamar tela de alteração com o student da pagina
	//
	$( "#alteracaoButton" ).bind( "click", function() {
		$(window.document.location).attr('href','dorm_input.html?id=' + id);
	});
	
/**
 * 
 */
	
	var data = rest_obterDorm(id, carregaTelaDorm, obtencaoNaoEfetuada, "consulta");
	var table = JSON.parse(localStorage.getItem("table"));
		    
    
