	// ** setar menu
	$("#menuDorms_li").addClass("active");
	
	/**
	 * 		esconde mapa
	 */
	$('.addressMap').addClass("hide");


	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	if (parametrosDaUrl){
		var id = parametrosDaUrl.split("=")[1];
	};

	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTelaTabelas, obtencaoNaoEfetuada);
	
	if (id){
		localStorage.dormExistente = "true";
		var data = rest_obterDorm(id, carregaTelaDorm, carregaInclusao, "alteracao");
	}else{
		criaLinhaFloor(0, 0);
		criaLinhaComments(0);
		criaLinhaVisit(0);
	};

	var objJson = JSON.parse(localStorage.getItem("dorm"));
	//
	//  *** limpa storage para pegar sempre o layout novo
	//
	limpaStorageDorm ();
	
    // Método de validação  - Adiciona método JQuery Validation
    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");
/**
*          valida formulário   
*/

	var $dormForm = $("#dorm-form").validate({
		rules : {
			name : {
				required : true,
				regex : /^\S+$/
			},
		},
		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter dorm name',
				regex : 'Do not use whitespace in dorm name'
			},
		},
		// form submition
		submitHandler : function(form) {
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
					if (field.type == "select-multiple") {
						value = "";
						var first = true;
					    $.each(field.children, function (i, optionValue) {
					    	if (optionValue.selected){
					    		if (first){
					    			value = optionValue.label;
					    			first = false;
					    		}else{
					    			value = value + "," + optionValue.label;
					    		}
					    	}				    			
					    });
					};
					if (field.value){
						objJson.documento[field.name] = value;
					};
			});
			var objJson = JSON.parse(localStorage.getItem("dorm"));
			$(".floorItem").each(function(i, value) {
				objJson.documento.notes.push(JSON.parse('{"id":"' + $("#id_" + i).val() 
														+ '","name":"' + $("#name_" + i).val() 
														+ '","keyDoors":"' + $("#keyDoors_" + i).val()
														+ '","description":"' + $("#description_" + i).val()
														+  '"}'
														));
			});
			$(".commentItem").each(function(i, value) {
				objJson.documento.comments.push(JSON.parse('{"date":"' + $("#commentsDate_" + i).val() 
														+ '","user":"' + $("#commentsUser_" + i).val() 
														+ '","comments":"' + $("#commentsNote_" + i).val() 
														+  '"}'
														));
			});
			$(".visitItem").each(function(i, value) {
				objJson.documento.visits.push(JSON.parse('{"date":"' + $("#visitsDate_" + i).val() 
														+ '","user":"' + $("#visitsUser_" + i).val() 
														+ '","comments":"' + $("#visitsComments_" + i).val() 
														+  '"}'
														));
			});
			localStorage.setItem("dorm", JSON.stringify(objJson));
			if (localStorage.dormExistente == "true"){
				rest_atualizaDorm(JSON.parse(localStorage.getItem("dorm")), retornaDorm, atualizacaoNaoEfetuada);
			}else{
				rest_incluiDorm(JSON.parse(localStorage.getItem("dorm")), retornaListaDorm, inclusaoNaoEfetuada);
			}
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

	$('#address_street').bind('blur', function () {
    	getMapCoordinate($('#address_street').val(), localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
    });
	
	$('#destination').change(function() {
		$("#address_mainIntersection option").remove();
		$("#address_mainIntersection").append($(option("Choose one item")));
		$('#address_mainIntersection option[value="Choose one item"]').attr('disabled','disabled');
		$("#address_subwayStation option").remove();
		$("#address_subwayStation").append($(option("Choose one item")));
		$('#address_subwayStation option[value="Choose one item"]').attr('disabled','disabled');
		rest_obterMainIntersectionAll(carregaSelectMainIntersection, semAcao, $(this).val());
		rest_obterSubwayAll(carregaSelectSubway, semAcao, $(this).val());
	});
