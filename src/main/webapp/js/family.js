	// ** setar menu
	$("#menuFamilies_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var familyName = parametrosDaUrl.split("=")[1];
	 	 
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
		$(window.document.location).attr('href','family_input.html?familyName=' + familyName );
	});
	
/**
 * 
 */
	
	rest_obterFamily(familyName, carregaTelaFamily, obtencaoNaoEfetuada, "consulta");
	rest_obterStudentAccommodations(familyName, carregaAccommodationsStudents, semAcao, "family");
	$(".accommodations-student" ).removeClass("hide");
