	// ** setar menu
	$("#menuFamilies_li").addClass("active");
	
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
	
	rest_obterBankAll(carregaSelectBanks);
	
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
		montaPhoto (localStorage.app, "family", "contractFamily", "family", familyName, "uploadContract");
	}else{
		criaLinhaFamilyMember(0);
		criaLinhaRoom(0);
		criaLinhaNote(0);
		criaLinhaVisit(0);
		$('#number_0').val(1);
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
	
    // Método de validação  - Adiciona método JQuery Validation
    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");
/**
*          valida formulário   
*/

	var $familyForm = $("#family-form").validate({
		rules : {
			familyName : {
				required : true,
				regex : /^\S+$/
			},
/*			type : {
				required : true,
			},
			otherPet : {
				required : true,
			},
			contact_phoneNumber : {
				required : true,
				regex : /^\+(?=\d{5,15}$)(1|2[078]|3[0-469]|4[013-9]|5[1-8]|6[0-6]|7|8[1-469]|9[0-58]|[2-9]..)(\d+)$/
			},
			contact_mobilePhoneNumber : {
				required : true,
				regex : /^\+(?=\d{5,15}$)(1|2[078]|3[0-469]|4[013-9]|5[1-8]|6[0-6]|7|8[1-469]|9[0-58]|[2-9]..)(\d+)$/
			},
			contact_workPhoneNumber : {
				regex : /^\+(?=\d{5,15}$)(1|2[078]|3[0-469]|4[013-9]|5[1-8]|6[0-6]|7|8[1-469]|9[0-58]|[2-9]..)(\d+)$/
			},
*/			contact_email : {
				required : true,
				email : true,
			},
			contact_lastName : {
				required : true,
			},
			contact_firstName : {
				required : true,
			},
			contact_gender : {
				required : true,
			},
			contact_birthDate : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
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
			},
			familyMemberBirthdate_0 : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberBirthdate_1 : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberBirthdate_2 : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberBirthdate_3 : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberBirthdate_4 : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberBirthdate_5 : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberBirthdate_6 : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberBirthdate_7 : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberDocDate_0 : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberDocDate_1 : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberDocDate_2 : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberDocDate_3 : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberDocDate_4 : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberDocDate_5 : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberDocDate_6 : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			familyMemberDocDate_7 : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			}
		},
		// Messages for form validation
		messages : {
			familyName : {
				required : 'Please enter family name',
				regex : 'Do not use whitespace in family name'
			},
/*			type : {
				required : 'Please enter family type',
			},
			otherPet : {
				required : "Please enter the pet's",
			},
			contact_phoneNumber : {
				required : 'Please enter family phone number',
				regex : 'invalid phone number'
			},
			contact_mobilePhoneNumber : {
				required : 'Please enter family mobile phone number',
				regex : 'invalid mobile phone number'
			},
			contact_workPhoneNumber : {
				regex : 'invalid work phone number'
			},
*/			contact_email : {
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
				regex : 'Invalid contact birthdate example "01-Jan-2000"'
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
			},
			familyMemberBirthdate_0 : {
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberBirthdate_1 : {
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberBirthdate_2 : {
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberBirthdate_3 : {
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberBirthdate_4 : {
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberBirthdate_5 : {
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberBirthdate_6 : {
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberBirthdate_7 : {
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberDocDate_0 : {
				required : 'Please fill in the date of emission',
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberDocDate_1 : {
				required : 'Please fill in the date of emission',
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberDocDate_2 : {
				required : 'Please fill in the date of emission',
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberDocDate_3 : {
				required : 'Please fill in the date of emission',
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberDocDate_4 : {
				required : 'Please fill in the date of emission',
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberDocDate_5 : {
				required : 'Please fill in the date of emission',
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberDocDate_6 : {
				required : 'Please fill in the date of emission',
				regex : 'Invalid family birthdate example "01-Jan-2000"'
			},
			familyMemberDocDate_7 : {
				required : 'Please fill in the date of emission',
				regex : 'Invalid family birthdate example "01-Jan-2000"'
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
		    objJson.documento.contact.docDate = $("#familyMemberDocDate_0").val();
			$(".familyMemberItem").each(function(i, value) {
				w = i + 1;
				if ($("#familyMemberName_" + w).val()) {
					objJson.documento.familyMembers.push(JSON.parse('{"name":"' + $("#familyMemberName_" + w).val() 
															+ '","gender":"' + $("#familyMemberGender_" + w).val() 
															+ '","relationship":"' + $("#familyMemberRelationship_" + w).val() 
															+ '","birthDate":"' + limpaData($("#familyMemberBirthdate_" + w).val())
															+ '","ocuppation":"' + $("#familyMemberOcuppation_" + w).val()
															+ '","docDate":"' + $("#familyMemberDocDate_" + w).val()
															+  '"}'
															));
				};
			});

			$.each(objJson.documento.rooms, function (i, optionValue) {
		    	objJson.documento.rooms.splice(0, 1);
		    });
		    objJsonSaveRooms = JSON.parse(localStorage.getItem("saveDataRooms"));
		    $( ".roomItem").each(function(i, value) {
				if ($("#singleBed_" + i).val() != "0" || $("#coupleBed_" + i).val() != "0" ) {
					if (objJsonSaveRooms[i]){
						var occupancySingleBedSave = "";
						var occupancyCoupleBedSave = "";
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
			        		level : $("#level" + i).val(),
			        		photo : $("#roomPhoto" + i).val(),
			        		note : $("#note" + i).val(),
				    		occupancySingleBed : occupancySingleBedSave,
				    		occupancyCoupleBed : occupancyCoupleBedSave
			        };
			        objJson.documento.rooms.push(room);
				};
			});
			$(".noteItem").each(function(i, value) {
				if ($("#notesDate_" + i).val()) {
					objJson.documento.notes.push(JSON.parse('{"date":"' + $("#notesDate_" + i).val() 
															+ '","user":"' + $("#notesUser_" + i).val() 
															+ '","note":"' + $("#notesNote_" + i).val() 
															+  '"}'
															));
				};
			});
			$(".visitItem").each(function(i, value) {
				if ($("#visitsDate_" + i).val()) {
					objJson.documento.visits.push(JSON.parse('{"date":"' + $("#visitsDate_" + i).val() 
															+ '","user":"' + $("#visitsUser_" + i).val() 
															+ '","comments":"' + $("#visitsComments_" + i).val() 
															+  '"}'
															));
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
		montaPhoto (localStorage.app, "family", "photosFamily", "family", $("#familyName").val(), "photo01");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", $("#familyName").val(), "photo02");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", $("#familyName").val(), "photo03");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", $("#familyName").val(), "photo04");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", $("#familyName").val(), "photo05");
		montaPhoto (localStorage.app, "family", "photosFamily", "family", $("#familyName").val(), "photo06");
		montaPhoto (localStorage.app, "family", "contractFamily", "family", $("#familyName").val(), "uploadContract");
	    montaPhoto (localStorage.app, "family", "docsFamily", "family", $("#familyName").val(), "docs0");
	    montaPhoto (localStorage.app, "family", "roomsPhoto", "family", $("#familyName").val(), "roomPhoto0");
	});	

	$('#contact_birthDate').datepicker({
	    changeMonth: true,
	    changeYear: true,
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		yearRange: "1930:2099",
		onSelect : function(selectedDate) {
	    	$('#familyMemberBirthdate_0').val(selectedDate);
			}
		});

	$('#address_street').bind('blur', function () {
    	getMapCoordinate($('#address_street').val(), localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
    });

    $('#address_timeSubwayStation').timepicker({
        showInputs: false,
        disableFocus: true,
        showMeridian : false
    });
	
    
	$("#contact_firstName").bind('blur', function () {
	    $('#familyMemberName_0').val($("#contact_firstName").val() + " " + $("#contact_lastName").val());
	});
	$("#contact_lastName").bind('blur', function () {
	    $('#familyMemberName_0').val($("#contact_firstName").val() + " " + $("#contact_lastName").val());
	});
	$("#contact_gender").bind('blur', function () {
    	$('#familyMemberGender_0').val($("#contact_gender").val());
    	if ($("#contact_gender").val() == "Male") {
    		$('#familyMemberRelationship_0').val("Host Father");	
    	}else{
    		$('#familyMemberRelationship_0').val("Host Mother");
    	}
	});
	$("#contact_birthDate").bind('blur', function () {
    	$('#familyMemberBirthdate_0').val($("#contact_birthDate").val());
    	$('.docs0').addClass("hide");
		var idade = calculaIdade(montaDataMesNum($("#contact_birthDate").val(),"/"));
		if (idade > 17){
			montaPhoto (localStorage.app, "family", "docsFamily", "family", $("#familyName").val(), "docs0");
			$('.docs0').removeClass("hide");	
		}else{
			$('.docs0').addClass("hide");				
		};

   	});
	$("#contact_ocuppation").bind('blur', function () {
        $('#familyMemberOcuppation_0').val($("#contact_ocuppation").val());
    });
	$("#haveOtherPet").bind('click', function () {
		var field = $("#haveOtherPet:checked").val();
		if (field == "on"){
			$(".pet").removeClass("hide");
		}else{
			$("#otherPet").val("");
			$(".pet").addClass("hide");
		}
	});
	
	$('#payment_financialInstitution').change(function(){
		rest_obterBank(this.value, carregaNumberBank, semAcao, "alteracao");
   });
	
	$('#payment_bankNumber').change(function(){
		rest_obterBankNumber(this.value, carregaNameBank, semAcao, "alteracao");
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
