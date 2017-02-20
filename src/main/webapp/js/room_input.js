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
	
	var objDorm = JSON.parse(localStorage.getItem("dorm"));
	//
	// **** carrega dados dorm
	//
	$("#idDorm").val(objDorm.documento.id);
	$("#dormName").val(objDorm.documento.name);
	$("#destination").val(objDorm.documento.address.destination);
    $.each(objDorm.documento.units, function (i, unit) {
		$('#idUnit').append( $(option(unit.name, "", true, unit.id)));
    });

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
  		$('#id-0').val("0");
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
				var item = $(this).attr('id').split("-")[1];
				var bedItem = 
					{
						id: $("#id-" + item).val(), 
						name:$("#name-" + item).val(), 
						type:$("#type-" + item).val(), 
						keyDoor:$("#keyDoor-" + item).val(),
						description:$("#description-" + item).val()
					};
				objJson.documento.beds.push(bedItem);
			});
			$(".commentItem").each(function(i, value) {
				var item = $(this).attr('id').split("-")[1];
				var commentItem = 
					{
						date: $("#commentsDate-" + item).val(), 
						user: $("#commentsUser-" + item).val(), 
						comments: $("#commentsComments-" + item).val()
					};
				objJson.documento.comments.push(commentItem);
			});
			$(".visitItem").each(function(i, value) {
				var item = $(this).attr('id').split("-")[1];
				var visitItem = 
				{
					date: $("#visitsDate-" + item).val(), 
					user: $("#visitsUser-" + item).val(), 
					comments: $("#visitsComments-" + item).val()
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
					idDorm:"",
					dormName:"",
					idUnit:"",
					unitName:"",
			        name:"",
			        type:"",
			        description : "",
			        destination : "",
			        keyDoor : "",
			        fotos : [],
			        beds : [],
			        visits : [],
			        comments : []
			    }
			}
		
		localStorage.setItem("room", JSON.stringify(data));
		
		return data;
	};		
