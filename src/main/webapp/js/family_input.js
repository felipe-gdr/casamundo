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
	}else{
		criaLinhaFamilyMember(0);
		criaLinhaRoom(0);
		$('#number_0').val(0);
	};


	limpaStorageFamily ();

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
			address_number : {
				required : true,
			},
			address_city : {
				required : true,
			},
			address_state : {
				required : true,
			},
			address_postalCode : {
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
			address_number : {
				required : 'Please enter address number',
			},
			address_city : {
				required : 'Please enter address city',
			},
			address_state : {
				required : 'Please enter address state',
			},
			address_postalCode : {
				required : 'Please enter address postal code',
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
				if ($("#familyMemberName_" + i).val()) {
					objJson.documento.familyMembers.push(JSON.parse('{"name":"' + $("#familyMemberName_" + i).val() 
															+ '","gender":"' + $("#familyMemberGender_" + i).val() 
															+ '","relationship":"' + $("#familyMemberRelationship_" + i).val() 
															+ '","birthDate":"' + $("#familyMemberBirthdate_" + i).val()
															+ '","mobilePhone":"' + $("#familyMemberMobilePhone_" + i).val()
															+  '"}'
															));
				};
			});
		    $.each(objJson.documento.rooms, function (i, optionValue) {
		    	objJson.documento.rooms.splice(0, 1);
		    });
			$( ".roomItem" ).each(function(i, value) {
				if ($("#singleBed_" + i).val() != "0" || $("#coupleBed_" + i).val() != "0") {
					objJson.documento.rooms.push(JSON.parse('{"number":"' + $("#number_" + i).val() 
															+ '","singleBed":"' + $("#singleBed_" + i).val() 
															+ '","coupleBed":"' + $("#coupleBed_" + i).val() 
															+ '","privateWashroom":"' + $("#privateWashroom_" + i).val()
															+  '"}'
															));
				};
			});
			localStorage.setItem("family", JSON.stringify(objJson));
			if (localStorage.familyExistente == "true"){
				rest_atualizaFamily(JSON.parse(localStorage.getItem("family")), atualizacaoEfetuada, atualizacaoNaoEfetuada);
			}else{
				rest_incluiFamily(JSON.parse(localStorage.getItem("family")), inclusaoEfetuada, inclusaoNaoEfetuada);
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
	});	

	$('#birthDate').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
	//		$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
		});
	
