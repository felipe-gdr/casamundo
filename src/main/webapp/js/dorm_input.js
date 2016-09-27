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
		localStorage.dormExistente = "false";
		criaLinhaUnit(0, 0);
		criaLinhaComment(0);
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
			},
		},
		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter dorm name',
			},
		},
		// form submition
		submitHandler : function(form) {
			var objJson = limpaStorageDorm();
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
					var validField = field.name.split("-");
					if (validField.length == 1){
						var typeField = field.name.split("_");
						if (typeField.length > 1){
							objJson.documento[typeField[0]][typeField[1]] = value;
						}else{
							if (field.value){
								objJson.documento[field.name] = value;
							};
						};						
					};
			});
			$(".unitItem").each(function(i, value) {
				var unitItem = 
					{
						id: $("#id-" + i).val(), 
						name:$("#name-" + i).val(), 
						keyDoor:$("#keyDoor-" + i).val(),
						wifiCode:$("#wifiCode-" + i).val(),
						description:$("#description-" + i).val()
					};
				console.log ("id:" + $("#id-" + i).val())
				objJson.documento.units.push(unitItem);
			});
			$(".commentItem").each(function(i, value) {
				var commentItem = 
					{
						date: $("#commentsDate-" + i).val(), 
						user: $("#commentsUser-" + i).val(), 
						comments: $("#commentsComments-" + i).val()
					};
				objJson.documento.comments.push(commentItem);
			});
			$(".visitItem").each(function(i, value) {
				var visitItem = 
				{
					date: $("#visitsDate-" + i).val(), 
					user: $("#visitsUser-" + i).val(), 
					comments: $("#visitsComments-" + i).val()
				};
				objJson.documento.visits.push(visitItem);
			});
			localStorage.setItem("dorm", JSON.stringify(objJson));
			if (localStorage.dormExistente == "true"){
				rest_atualizaDorm(objJson, retornaDorm, atualizacaoNaoEfetuada);
			}else{
				rest_incluiDorm(objJson, retornaListaDorm, inclusaoNaoEfetuada);
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
	
	$('#address_destination').change(function() {
		$("#address_mainIntersection option").remove();
		$("#address_mainIntersection").append($(option("Choose one item")));
		$('#address_mainIntersection option[value="Choose one item"]').attr('disabled','disabled');
		$("#address_subwayStation option").remove();
		$("#address_subwayStation").append($(option("Choose one item")));
		$('#address_subwayStation option[value="Choose one item"]').attr('disabled','disabled');
		rest_obterMainIntersectionAll(carregaSelectMainIntersection, semAcao, $(this).val());
		rest_obterSubwayAll(carregaSelectSubway, semAcao, $(this).val());
	});


	function limpaStorageDorm () {
		
		var data  =
		
			{	
			    documento : {
			        id : "",
			        name : "",
			        type : "",
			        description : "",
			        keyDoor : "",
			        contact : {
			            firstName : "",
			            lastName : "",
			            gender : "",
			            email : "",
			            phoneNumber : "",
			            mobilePhoneNumber : "",
			            workPhoneNumber : "",
			        },
			        address : {
			            street : "",
			            number : "",
			            city : "",
			            state : "",
			            postalCode : "",
			            complement : "",
			            mainIntersection : "",
			            nearestSubwayStation : "",
			            timeSubwayStation : "",
			            subwayStation : "",
			            latitude : "",
			            longitude : "",
			            destination : "",
			        },
			        fotos : [],
			        units : [],
			        visits : [],
			        comments : []
			    }
			}
		
		localStorage.setItem("dorm", JSON.stringify(data));
		
		return data;
	};		
