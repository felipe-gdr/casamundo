
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
		var familyName = parametrosDaUrl.split("=")[1];
	};

	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTelaTabelas, obtencaoNaoEfetuada);

	if (familyName){
		localStorage.familyExistente = "true";
		var data = rest_obterFamily(familyName, carregaTelaFamily, carregaInclusao, "alteracao");
		//
		// formata campos img
		//
		montaPhoto (localStorage.app, "family", "photosFamily", "family", familyName, "photo01");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", familyName, "photo02");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", familyName, "photo03");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", familyName, "photo04");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", familyName, "photo05");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", familyName, "photo06");
		
		// desabilita nome familia pois é chave
		$('#familyName').attr("disabled", true);
	}else{
		criaLinhaFamilyMember(0);
		criaLinhaRoom(0);
		$('#number_0').val(0);
	};
	//
	//  *** salva dados dos quartos
	//+
	var objJson = JSON.parse(localStorage.getItem("family"));
	var objJsonSaveRooms = [];

   if (objJson){
		$.each(objJson.documento.rooms, function (i, optionValue) {
			if (objJson.documento.rooms[i].occupancySingleBed){
				occupancySingleBedSave = objJson.documento.rooms[i].occupancySingleBed
			}else{
				occupancySingleBedSave = [
				    		                 {
					    		                 emailStudent : "",
					    		                 startOccupancy : "",
					    		                 endOccupancy : ""
				    		                 }
				                          ];
			};
			if (objJson.documento.rooms[i].occupancyCoupleBed){
				occupancyCoupleBedSave = objJson.documento.rooms[i].occupancyCoupleBed
			}else{
				occupancyCoupleBedSave = [
				    		                 {
					    		                 emailStudent : "",
					    		                 startOccupancy : "",
					    		                 endOccupancy : ""
				    		                 }
				                          ];
			};
		    var room = 
		    {
		    		mumber : i,
		    		singleBed : objJson.documento.rooms[i].singleBedAvailable,
		    		coupleBed : objJson.documento.rooms[i].coupleBedAvailable,
		    		privateWashroom : objJson.documento.rooms[i].privateWashroom,
		    		occupancySingleBed : occupancySingleBedSave,
		    		occupancyCoupleBed : occupancyCoupleBedSave
		    };
	    	objJsonSaveRooms.push(room);
	    });
   };
   localStorage.setItem("saveDataRooms", JSON.stringify(objJsonSaveRooms));

	//
	//  *** limpa storage para pegar sempre o layout novo
	//
	limpaStorageFamily ();

	//
	// *** retorna nome fotos salvas
	//
	var obj = JSON.parse(localStorage.getItem("family"));
	if (localStorage.photo01){
		obj.documento.fotos.photo01 =  localStorage.photo01;
	}
	if (localStorage.photo02){
		obj.documento.fotos.photo02 =  localStorage.photo02;
	}
	if (localStorage.photo03){
		obj.documento.fotos.photo03 =  localStorage.photo03;
	}
	if (localStorage.photo04){
		obj.documento.fotos.photo04 =  localStorage.photo04;
	}
	if (localStorage.photo05){
		obj.documento.fotos.photo05 =  localStorage.photo05;
	}
	if (localStorage.photo06){
		obj.documento.fotos.photo06 =  localStorage.photo06;
	}
	//
	// *** retorna nome documentos salvos
	//
	var obj = JSON.parse(localStorage.getItem("family"));
	if (localStorage.docs1){
		obj.documento.docs.docs1 =  localStorage.docs1;
	}
	if (localStorage.docs2){
		obj.documento.docs.docs2 =  localStorage.docs2;
	}
	if (localStorage.docs3){
		obj.documento.docs.docs3 =  localStorage.docs3;
	}
	if (localStorage.docs4){
		obj.documento.docs.docs4 =  localStorage.docs4;
	}
	if (localStorage.docs5){
		obj.documento.docs.docs5 =  localStorage.docs5;
	}
	if (localStorage.docs6){
		obj.documento.docs.docs6 =  localStorage.docs6;
	}
    localStorage.setItem("family", JSON.stringify(obj));

	

/**
*          valida formulário   
*/

	var $familyForm = $("#family-form").validate({
		// Rules for form validation
		rules : {
			familyName : {
				required : true,
			},
			type : {
				required : true,
			},
			contact_phoneNumber : {
				required : true,
			},
			contact_mobilePhoneNumber : {
				required : true,
			},
			contact_email : {
				required : true,
				email : true,
			},
			contact_lastName : {
				required : true,
			},
			contact_firstName : {
				required : true,
			},
			contact_birthDate : {
				required : true,
			},
			contact_gender : {
				required : true,
			},
			address_street : {
				required : true,
			},
			address_mainIntersection : {
				required : true,
			},
			address_nearestSubwayStation : {
				required : true,
			},
			address_walkingTimeSubwayStation : {
				required : true,
			},
			address_nearestBusStop : {
				required : true,
			},
			address_walkingTimeBusStation : {
				required : true,
			},
			numbersStudentsBedroom : {
				required : true,
			},
			numberPrivateWashroom : {
				required : true,
			},
			firstLanguage : {
				required : true,
			}
		},

		// Messages for form validation
		messages : {
			familyName : {
				required : 'Please enter family name',
				email : 'Please enter a VALID email address'
			},
			type : {
				required : 'Please enter family type',
			},
			contact_phoneNumber : {
				required : 'Please enter family phone number',
			},
			contact_mobilePhoneNumber : {
				required : 'Please enter family mobile phone number',
			},
			contact_email : {
				required : 'Please enter contact family email',
				email : 'Please enter a VALID email address'
			},
			contact_lastName : {
				required : 'Please enter contact last name',
			},
			contact_firstName : {
				required : 'Please enter contact firstname',
			},
			contact_birthDate : {
				required : 'Please enter contact birthdate',
			},
			contact_gender : {
				required : 'Please enter contact gender',
			},
			address_street : {
				required : 'Please enter street name',
			},
			address_mainIntersection : {
				required : 'Please enter address main intersection',
			},
			address_nearestSubwayStation : {
				required : 'Please enter nearest subway station',
			},
			address_walkingTimeSubwayStation : {
				required : 'Please enter walking time to subway station',
			},
			address_nearestBusStop : {
				required : 'Please enter nearest bus stop',
			},
			address_walkingTimeBusStation : {
				required : 'Please enter walking time bus station',
			},
			numbersStudentsBedroom : {
				required : 'Please enter total number of bedroom in your home',
			},
			offerPrivateWashroom : {
				required : 'Please enter if you offer private washroom for the student',
			},
			offerInternet : {
				required : 'Please enter if you offer internet',
			},
			havePets : {
				required : 'Please enter if you have pets',
			},
			firstLanguage : {
				required : 'Please enter your first language',
			},
			acceptSmokeStudent : {
				required : 'Please enter if you accept smoke student',
			},
			acceptSmokeInsideHome : {
				required : 'Please enter if you accept anyone smoke inside your house ',
			},
			hostVegetarianStudent : {
				required : 'Please enter if you host a student vegetarian',
			},
			hostAnyNationalityStudent : {
				required : 'Please enter if you host a student from any nationality',
			}
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
					setValueFamily (field.id, value, 0)
			});
			var objJson = JSON.parse(localStorage.getItem("family"));
		    $.each(objJson.documento.familyMembers, function (i, optionValue) {
		    	objJson.documento.familyMembers.splice(0, 1);
		    });
			$( ".familyMemberItem" ).each(function(i, value) {
				w = i + 1;
				if ($("#familyMemberName_" + w).val()) {
					objJson.documento.familyMembers.push(JSON.parse('{"name":"' + $("#familyMemberName_" + w).val() 
															+ '","gender":"' + $("#familyMemberGender_" + w).val() 
															+ '","relationship":"' + $("#familyMemberRelationship_" + w).val() 
															+ '","birthDate":"' + $("#familyMemberBirthdate_" + w).val()
															+ '","mobilePhone":"' + $("#familyMemberMobilePhone_" + w).val()
															+  '"}'
															));
				};
			});

			$.each(objJson.documento.rooms, function (i, optionValue) {
		    	objJson.documento.rooms.splice(0, 1);
		    });
		    objJsonSaveRooms = JSON.parse(localStorage.getItem("saveDataRooms"));
		    $( ".roomItem" ).each(function(i, value) {
				if ($("#singleBed_" + i).val() != "0" || $("#coupleBed_" + i).val() != "0" ) {
					if (objJsonSaveRooms[i]){
						if (objJsonSaveRooms[i].occupancySingleBed){
							occupancySingleBedSave = objJsonSaveRooms[i].occupancySingleBed
						}else{
							occupancySingleBedSave = [
							    		                 {
								    		                 emailStudent : "",
								    		                 startOccupancy : "",
								    		                 endOccupancy : "",
								    		                 emailStudent : ""
							    		                 }
							                          ];
						};
						if (objJsonSaveRooms[i].occupancyCoupleBed){
							occupancyCoupleBedSave = objJsonSaveRooms[i].occupancyCoupleBed
						}else{
							occupancyCoupleBedSave = [
							    		                 {
								    		                 emailStudent : "",
								    		                 startOccupancy : "",
								    		                 endOccupancy : ""
							    		                 }
							                          ];
						};
					};
			        var room = 
			        {
			        		number : i,
			        		singleBed : $("#singleBed_" + i).val(),
			        		coupleBed : $("#coupleBed_" + i).val(),
			        		privateWashroom : $("#privateWashroom_" + i).val(),
				    		occupancySingleBed : occupancySingleBedSave,
				    		occupancyCoupleBed : occupancyCoupleBedSave
			        };
			        objJson.documento.rooms.push(room);
				};
			});
			localStorage.setItem("family", JSON.stringify(objJson));
			if (localStorage.familyExistente == "true"){
				rest_atualizaFamily(JSON.parse(localStorage.getItem("family")), retornaFamily, atualizacaoNaoEfetuada);
			}else{
				rest_incluiFamily(JSON.parse(localStorage.getItem("family")), retornaListaFamily, inclusaoNaoEfetuada);
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

	// **** testa existencia do email
	$("#familyName").blur(function(){
		localStorage.familyExistente = "false";
		var data = rest_obterFamily(this.value, carregaTelaFamily, carregaInclusao);
		//
		// formata campos img
		//
		montaPhoto (localStorage.app, "family", "photosFamily", "family", this.value, "photo01");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", this.value, "photo02");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", this.value, "photo03");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", this.value, "photo04");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", this.value, "photo05");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", this.value, "photo06");
	});	

	$('#birthDate').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
	//		$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
		});
    
	$('#address_street').bind('blur', function () {
    	getMapCoordinate($('#address_street').val(), localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
    });
	
    
	$("#contact_firstName").bind('blur', function () {
	    $('#familyMemberName_0').val($("#contact_firstName").val() + " " + $("#contact_lastName").val());
	});
	$("#contact_lastName").bind('blur', function () {
	    $('#familyMemberName_0').val($("#contact_firstName").val() + " " + $("#contact_lastName").val());
	});
	$("#contact_gender").bind('blur', function () {
    	$('#familyMemberGender_0').val($("#contact_gender").val());
	});
	$("#contact_birthDate").bind('blur', function () {
    	$('#familyMemberBirthdate_0').val($("#contact_birthDate").val());
    	$('.docs1').addClass("hide");
		var idade = calculaIdade($('#familyMemberBirthdate_0').val());
		if (idade > 17){
			montaPhoto (localStorage.app, "family", "docsFamily", "family", $("#familyName").val(), "docs1");
			$('.docs1').removeClass("hide");	
		};

   	});
	$("#contact_workPhoneNumber").bind('blur', function () {
        $('#familyMemberMobilePhone_0').val($("#contact_workPhoneNumber").val());
    });
