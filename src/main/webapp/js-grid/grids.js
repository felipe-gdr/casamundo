/**
 * 
 */
				//
				//  Grid de valore fixos
				//
				var valoresFixos_data = [{
					valoresFixosDescricao : "Vale refeição",
					valoresFixosValor : "200,00",
					valoresFixosObservacao : "Vale refeição a ser creditado mensalmente ao funcionário"
				},{
					valoresFixosDescricao : "Vale compras",
					valoresFixosValor : "200,00",
					valoresFixosObservacao : "Vale compras a ser creditado ao mensalmente funcionário"
				},{
					valoresFixosDescricao : "Desconto segura de vida",
					valoresFixosValor : "200,00",
					valoresFixosObservacao : "Desconto de seguro de vida a ser descontado mensalmente do funcionário"
				}];
				
				var valoresFixosRow;

				jQuery("#valoresFixos").jqGrid({
					data : valoresFixos_data,
					datatype : "local",
					height : 'auto',
					colNames : ['Descrição', 'Valor', 'Observação'],
					colModel : [{
						name : 'valoresFixosDescricao',
						index : 'valoresFixosDescricao',
						width:150,
						editable: true,
						edittype:"select",
						editoptions:{value:"VR:Vale Refeição;VT:Vale Transporte;SG:Seguro Saúde;SV:Seguro de Vida"}
					}, {
						name : 'valoresFixosValor',
						index : 'valoresFixosValor',
						width:60,
						align:"right",
						editable: true
					}, {
						name : 'valoresFixosObservacao',
						index : 'valoresFixosObservacao',
						width:200,
						editable: false
					}],
					rowNum : 10,
					rowList : [10, 20, 30],
					pager : '#pgValoresFixo',
					sortname : 'valoresFixosDescricao',
					toolbarfilter : true,
					viewrecords : true,
					sortorder : "asc",
					gridComplete : function() {
					},
					onSelectRow: function(id){
						if(id && id!==valoresFixosRow){
							jQuery('#valoresFixos').jqGrid('restoreRow',valoresFixosRow);
							jQuery('#valoresFixos').jqGrid('editRow',id,true);
							valoresFixosRow=id;
						}
					},
					editurl : "dummy.html",
					caption : "Valores fixos",
					multiselect : true,
					autowidth : true,

				});
				jQuery("#valoresFixos").jqGrid('navGrid', "#pgValoresFixo", {
					edit : false,
					add : false,
					del : true
				});
				jQuery("#valoresFixos").jqGrid('inlineNav', "#pgValoresFixo");
				/* Add tooltips */
				$('.navtable .ui-pg-button').tooltip({
					container : 'body'
				});

				jQuery("#m1").click(function() {
					var s;
					s = jQuery("#valoresFixos").jqGrid('getGridParam', 'selarrrow');
					alert(s);
				});
				jQuery("#m1s").click(function() {
					jQuery("#valoresFixos").jqGrid('setSelection', "13");
				});

				//
				//  Grid de valore periódicos
				//
				var valoresPeriodicos_data = [{
					valoresPeriodicosDescricao : "Vale refeição",
					valoresPeriodicosValor : "200,00",
					valoresPeriodicosInicio : "03/2016",
					valoresPeriodicosFinal : "07/2016"
				},{
					valoresPeriodicosDescricao : "Vale compras",
					valoresPeriodicosValor : "200,00",
					valoresPeriodicosInicio : "03/2016",
					valoresPeriodicosFinal : "07/2016"
				},{
					valoresPeriodicosDescricao : "Desconto segura de vida",
					valoresPeriodicosValor : "200,00",
					valoresPeriodicosInicio : "03/2016",
					valoresPeriodicosFinal : "07/2016"
				}];
				
				var valoresPeriodicosRow;

				jQuery("#valoresPeriodicos").jqGrid({
					data : valoresPeriodicos_data,
					datatype : "local",
					height : 'auto',
					colNames : ['Descrição', 'Valor', 'Inicio', 'Final'],
					colModel : [{
						name : 'valoresPeriodicosDescricao',
						index : 'valoresPeriodicosDescricao',
						width:150,
						editable: true,
						edittype:"select",
						editoptions:{value:"VR:Vale Refeição;VT:Vale Transporte;SG:Seguro Saúde;SV:Seguro de Vida"}
					}, {
						name : 'valoresPeriodicosValor',
						index : 'valoresPeriodicosValor',
						width:60,
						align:"right",
						editable: true
					}, {
						name : 'valoresPeriodicosInicio',
						index : 'valoresPeriodicosInicio',
						width:60,
						align:"center",
						editable: true
					}, {
						name : 'valoresPeriodicosFinal',
						index : 'valoresPeriodicosFinal',
						width:60,
						align:"center",
						editable: true
					}],
					rowNum : 10,
					rowList : [10, 20, 30],
					pager : '#pgValoresPeriodicos',
					sortname : 'valoresPeriodicosDescricao',
					toolbarfilter : true,
					viewrecords : true,
					sortorder : "asc",
					gridComplete : function() {
					},
					onSelectRow: function(id){
						if(id && id!==valoresPeriodicosRow){
							jQuery('#valoresPeriodicos').jqGrid('restoreRow',valoresPeriodicosRow);
							jQuery('#valoresPeriodicos').jqGrid('editRow',id,true);
							valoresPeriodicosRow=id;
						}
					},
					editurl : "dummy.html",
					caption : "Valores Periódicos",
					multiselect : true,
					autowidth : true,

				});
				jQuery("#valoresPeriodicos").jqGrid('navGrid', "#pgValoresPeriodicos", {
					edit : false,
					add : false,
					del : true
				});
				jQuery("#valoresPeriodicos").jqGrid('inlineNav', "#pgValoresPeriodicos");
				/* Add tooltips */
				$('.navtable .ui-pg-button').tooltip({
					container : 'body'
				});

				jQuery("#m1").click(function() {
					var s;
					s = jQuery("#valoresPeriodicos").jqGrid('getGridParam', 'selarrrow');
					alert(s);
				});
				jQuery("#m1s").click(function() {
					jQuery("#valoresPeriodicos").jqGrid('setSelection', "13");
				});

				//
				//  Grid de valores mensais
				//
				var valoresMensais_data = [{
					valoresMensaisDescricao : "Vale refeição",
					valoresMensaisValor : "200,00",
					valoresMensaisObservacao : "Vale refeição a ser creditado mensalmente ao funcionário"
				},{
					valoresMensaisDescricao : "Vale compras",
					valoresMensaisValor : "200,00",
					valoresMensaisObservacao : "Vale compras a ser creditado ao mensalmente funcionário"
				},{
					valoresMensaisDescricao : "Desconto segura de vida",
					valoresMensaisValor : "200,00",
					valoresMensaisObservacao : "Desconto de seguro de vida a ser descontado mensalmente do funcionário"
				}];
				
				var valoresMensaisRow;

				jQuery("#valoresMensais").jqGrid({
					data : valoresMensais_data,
					datatype : "local",
					height : 'auto',
					colNames : ['Descrição', 'Valor', 'Observação'],
					colModel : [{
						name : 'valoresMensaisDescricao',
						index : 'valoresMensaisDescricao',
						width:150,
						editable: true,
						edittype:"select",
						editoptions:{value:"VR:Vale Refeição;VT:Vale Transporte;SG:Seguro Saúde;SV:Seguro de Vida"}
					}, {
						name : 'valoresMensaisValor',
						index : 'valoresMensaisValor',
						width:60,
						align:"right",
						editable: true
					}, {
						name : 'valoresMensaisObservacao',
						index : 'valoresMensaisObservacao',
						width:200,
						editable: false
					}],
					rowNum : 10,
					rowList : [10, 20, 30],
					pager : '#pgValoresMensais',
					sortname : 'valoresMensaisDescricao',
					toolbarfilter : true,
					viewrecords : true,
					sortorder : "asc",
					gridComplete : function() {
					},
					onSelectRow: function(id){
						if(id && id!==valoresMensaisRow){
							jQuery('#valoresMensais').jqGrid('restoreRow',valoresMensaisRow);
							jQuery('#valoresMensais').jqGrid('editRow',id,true);
							valoresMensaisRow=id;
						}
					},
					editurl : "dummy.html",
					caption : "Valores Mensais",
					multiselect : true,
					autowidth : true,

				});
				jQuery("#valoresMensais").jqGrid('navGrid', "#pgValoresMensais", {
					edit : false,
					add : false,
					del : true
				});
				jQuery("#valoresMensais").jqGrid('inlineNav', "#pgValoresMensais");
				/* Add tooltips */
				$('.navtable .ui-pg-button').tooltip({
					container : 'body'
				});

				jQuery("#m1").click(function() {
					var s;
					s = jQuery("#valoresMensais").jqGrid('getGridParam', 'selarrrow');
					alert(s);
				});
				jQuery("#m1s").click(function() {
					jQuery("#valoresMensais").jqGrid('setSelection', "13");
				});


				//
				//  Grid de valores por funcionário
				//
				var valoresFuncionarios_data = [{
					valoresFuncionariosFuncionario : "Jõao Alves de Lima",
					valoresFuncionariosDescricao : "Vale refeição",
					valoresFuncionariosValor : "200,00"
				},{
					valoresFuncionariosFuncionario : "Antonio Jose Medeiros",
					valoresFuncionariosDescricao : "Vale compras",
					valoresFuncionariosValor : "200,00"
				},{
					valoresFuncionariosFuncionario : "Luiza Francisco Souza",
					valoresFuncionariosDescricao : "Desconto segura de vida",
					valoresFuncionariosValor : "200,00"
				}];
				
				var valoresFuncionariosRow;

				jQuery("#valoresFuncionarios").jqGrid({
					data : valoresFuncionarios_data,
					datatype : "local",
					height : 'auto',
					colNames : ['Funcionário','Descrição', 'Valor'],
					colModel : [{
						name : 'valoresFuncionariosFuncionario',
						index : 'valoresFuncionariosFuncionario',
						width:200,
						editable: true,
						edittype:"select",
						editoptions:{
							value:
								"001:Antonio Jose Medeiros;" +
								"002:Luiza Francisco Souza;" +
								"003:Jõao Alves de Lima;" +
								"004:Franciso Alves;" +
								"005:Maria de Oliveira;" +
								"006:Marta Antonio Silva;" +
								"007:Mario Lima;" +
								"008:Luiz Jorge;"
							}
					}, {
						name : 'valoresFuncionariosDescricao',
						index : 'valoresFuncionariosDescricao',
						width:150,
						editable: true,
						edittype:"select",
						editoptions:{value:"VR:Vale Refeição;VT:Vale Transporte;SG:Seguro Saúde;SV:Seguro de Vida"}
					}, {
						name : 'valoresFuncionariosValor',
						index : 'valoresFuncionariosValor',
						width:60,
						align:"right",
						editable: true
					}],
					rowNum : 10,
					rowList : [10, 20, 30],
					pager : '#pgValoresFuncionarios',
					sortname : 'valoresFuncionariosDescricao',
					toolbarfilter : true,
					viewrecords : true,
					sortorder : "asc",
					gridComplete : function() {
					},
					onSelectRow: function(id){
						if(id && id!==valoresFuncionariosRow){
							jQuery('#valoresFuncionarios').jqGrid('restoreRow',valoresFuncionariosRow);
							jQuery('#valoresFuncionarios').jqGrid('editRow',id,true);
							valoresFuncionariosRow=id;
						}
					},
					editurl : "dummy.html",
					caption : "Valores Funcionarios",
					multiselect : true,
					autowidth : true,

				});
				jQuery("#valoresFuncionarios").jqGrid('navGrid', "#pgValoresFuncionarios", {
					edit : false,
					add : false,
					del : true
				});
				jQuery("#valoresFuncionarios").jqGrid('inlineNav', "#pgValoresFuncionarios");
				/* Add tooltips */
				$('.navtable .ui-pg-button').tooltip({
					container : 'body'
				});

				jQuery("#m1").click(function() {
					var s;
					s = jQuery("#valoresFuncionarios").jqGrid('getGridParam', 'selarrrow');
					alert(s);
				});
				jQuery("#m1s").click(function() {
					jQuery("#valoresFuncionarios").jqGrid('setSelection', "13");
				});
			
				// remove classes
				$(".ui-jqgrid").removeClass("ui-widget ui-widget-content");
				$(".ui-jqgrid-view").children().removeClass("ui-widget-header ui-state-default");
				$(".ui-jqgrid-labels, .ui-search-toolbar").children().removeClass("ui-state-default ui-th-column ui-th-ltr");
				$(".ui-jqgrid-pager").removeClass("ui-state-default");
				$(".ui-jqgrid").removeClass("ui-widget-content");

				// add classes
				$(".ui-jqgrid-htable").addClass("table table-bordered table-hover");
				$(".ui-jqgrid-btable").addClass("table table-bordered table-striped");
/*				
				$(".ui-pg-div").removeClass().addClass("btn btn-sm btn-primary");
				$(".ui-icon.ui-icon-plus").removeClass().addClass("fa fa-plus");
				$(".ui-icon.ui-icon-pencil").removeClass().addClass("fa fa-pencil");
				$(".ui-icon.ui-icon-trash").removeClass().addClass("fa fa-trash-o");
				$(".ui-icon.ui-icon-search").removeClass().addClass("fa fa-search");
				$(".ui-icon.ui-icon-refresh").removeClass().addClass("fa fa-refresh");
				$(".ui-icon.ui-icon-disk").removeClass().addClass("fa fa-save").parent(".btn-primary").removeClass("btn-primary").addClass("btn-success");
				$(".ui-icon.ui-icon-cancel").removeClass().addClass("fa fa-times").parent(".btn-primary").removeClass("btn-primary").addClass("btn-danger");

				$(".ui-icon.ui-icon-seek-prev").wrap("<div class='btn btn-sm btn-default'></div>");
				$(".ui-icon.ui-icon-seek-prev").removeClass().addClass("fa fa-backward");

				$(".ui-icon.ui-icon-seek-first").wrap("<div class='btn btn-sm btn-default'></div>");
				$(".ui-icon.ui-icon-seek-first").removeClass().addClass("fa fa-fast-backward");

				$(".ui-icon.ui-icon-seek-next").wrap("<div class='btn btn-sm btn-default'></div>");
				$(".ui-icon.ui-icon-seek-next").removeClass().addClass("fa fa-forward");

				$(".ui-icon.ui-icon-seek-end").wrap("<div class='btn btn-sm btn-default'></div>");
				$(".ui-icon.ui-icon-seek-end").removeClass().addClass("fa fa-fast-forward");

*/				