	// ** setar menu
	$("#menuFinance_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var id = parametrosDaUrl.split("=")[1];
	 	 
	rest_obterAgencyAll(carregaSelectAgencies, true);

	//
	//***   chamar tela de alteração com o student da pagina
	//
	$( "#alteracaoItemButton" ).off( "click");
	$( "#alteracaoItemButton" ).on( "click", function() {
		$("#priceId").val($("#id").val());
		$("#priceName").val($("#name").html());
		$("#priceDescription").val($("#description").html());
		$("#vendorType").val($("#vendorTypeOutput").html());
		if ($("#valid").html() == "Yes"){
			$("#priceValid").prop("checked", true)
		};
		localStorage.priceTableExistente = "true";
	});


	/**
	 * 
	 */
	$("#priceValueMainIdPriceTable").val(id);
	$("#priceValueAgencyIdPriceTable").val(id);
	$("#priceCostMainIdPriceTable").val(id);
	$("#priceCostFamilyIdPriceTable").val(id);
	$("#priceCostPickupIdPriceTable").val(id);
	
	/**
	 * 
	 */
	rest_obterPriceTable(id, carregaTelaPriceTable, obtencaoNaoEfetuada);
	rest_obterPriceTableValueAll(id, carregaTableValueMain , semAcao);
	rest_obterPriceTableValueAll(id, carregaTableValueAgency, semAcao);
	rest_obterPriceTableCostAll(id, carregaTableCostMain , semAcao);
	rest_obterPriceTableCostAll(id, carregaTableCostFamily, semAcao);
	rest_obterPriceTableCostAll(id, carregaTableCostPickup, semAcao);

		    