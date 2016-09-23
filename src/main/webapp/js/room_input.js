	// ** setar menu
	$("#menuRooms_li").addClass("active");
	
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
		localStorage.roomExistente = "true";
		var data = rest_obterRoom(id, carregaTelaRoom, carregaInclusao, "alteracao");
	}else{
		localStorage.roomExistente = "false";
		criaLinhaBed(0, 0);
		criaLinhaComment(0);
		criaLinhaVisit(0);
	};

	var objJson = JSON.parse(localStorage.getItem("room"));
	//
	//  *** limpa storage para pegar sempre o layout novo
	//
	limpaStorageRoom ();
	
    // Método de validação  - Adiciona método JQuery Validation
    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");
/**
*          valida formulário   
*/

	var $roomForm = $("#room-form").validate({
		rules : {
			name : {
				required : true,
			},
		},
		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter room name',
			},
		},
		// form submition
		submitHandler : function(form) {
			var objJson = limpaStorageRoom();
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
			$(".bedItem").each(function(i, value) {
				var bedItem = 
					{
						id: $("#id-" + i).val(), 
						name:$("#name-" + i).val(), 
						keyDoor:$("#keyDoor-" + i).val(),
						description:$("#description-" + i).val()
					};
				console.log ("id:" + $("#id-" + i).val())
				objJson.documento.beds.push(bedItem);
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
			localStorage.setItem("room", JSON.stringify(objJson));
			if (localStorage.roomExistente == "true"){
				rest_atualizaRoom(objJson, retornaRoom, atualizacaoNaoEfetuada);
			}else{
				rest_incluiRoom(objJson, retornaListaRoom, inclusaoNaoEfetuada);
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

	function limpaStorageRoom () {
		
		var data  =
		
			{	
			    documento : {
			        id : "",
			        name : "",
			        type : "",
			        description : "",
			        destination : "",
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
			        beds : [],
			        visits : [],
			        comments : []
			    }
			}
		
		localStorage.setItem("room", JSON.stringify(data));
		
		return data;
	};		
