	// 
	//**    desproteje o email na inclusão pois é chave
	//

   	$('#mail').attr("disabled", false);

	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	if (parametrosDaUrl){
		var mailUrl = parametrosDaUrl.split("=")[1];
	};

	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTelaTabelas, obtencaoNaoEfetuada);

	rest_obterAgencyAll(carregaSelectAgencies);
	
	rest_obterSchoolAll(carregaSelectSchool);
	
	/**
	 * 		carrega tela se alteração
	 */
	if (mailUrl){
		localStorage.studentExistente = "true";
		var data = rest_obterStudent(mailUrl, carregaTela, carregaInclusao);
		montaPhoto (localStorage.app, "student", "photoPassport", "student", mailUrl, "photoPassport");
		$('#mail').attr("disabled", true);
	};	


	limpaStorageStudent ();
	

/**
*          valida formulário   
*/
	
    // Método de validação  - Adiciona método JQuery Validation
    $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
    }, "");

	var $studentForm = $("#student-form").validate({
		// Rules for form validation
		rules : {
			mail : {
				required : true,
				email : true
			},
			celPhone : {
				required : true,
			},
			phone : {
				required : true,
			},
			lastName : {
				required : true,
			},
			firstName : {
				required : true,
			},
			birthDay : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			gender : {
				required : true,
			},
			nationality : {
				required : true,
			},
			firstLanguage : {
				required : true,
			},
			englishLevel : {
				required : true,
			},
			streetNumber : {
				required : true,
			},
			streetName : {
				required : true,
			},
			postalCode : {
				required : true,
			},
			state : {
				required : true,
			},
			city : {
				required : true,
			},
			country : {
				required : true,
			},
			emergencyContactMail : {
				email : true
			},
			status : {
				required : true,
			},
			destination : {
				required : true,
			},
			start : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			end : {
				required : true,
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			arrivalDate : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			departureDate : {
				regex : /^(([1-9])|([0][1-9])|([1-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/
			},
			agencyName : {
				required : true,
			},
			schoolName : {
				required : true,
			}
		},

		// Messages for form validation
		messages : {
			mail : {
				required : 'Please enter student email',
				email : 'Please enter a VALID email address'
			},
			celPhone : {
				required : 'Please enter student cel phone',
				minlength : 'Fill area code',
				maxlength : 'Number too long',
			},
			phone : {
				required : 'Please enter student phone',
				minlength : 'Fill area code',
				maxlength : 'Number too long',
			},
			lastName : {
				required : 'Please enter student last name',
				minlength : 2
			},
			firstName : {
				required : 'Please enter student first name',
				minlength : 2
			},
			birthDay : {
				required : 'Please enter student birthday'
			},
			gender : {
				required : 'Please enter student gender'
			},
			nationality : {
				required : 'Please enter student nationality'
			},
			firstLanguage : {
				required : 'Please enter student first language'
			},
			englishLevel : {
				required : 'Please enter student english level'
			},
			streetNumber : {
				required : 'Please enter address number'
			},
			streetName : {
				required : 'Please enter address street name'
			},
			postalCode : {
				required : 'Please enter address ZIP code'
			},
			state : {
				required : 'Please enter address state'
			},
			city : {
				required : 'Please enter address city'
			},
			country : {
				required : 'Please enter address country'
			},
			secondaryTelephone : {
				minlength : 'Fill area code',
				maxlength : 'Number too long',
			},
			emergencyContactName : {
				minlength : 'Minimum 2 caracters',
				maxlength : 'Maximum 42 caracters'
			},
			emergencyContactMail : {
				email : 'Please enter a VALID email address'
			},
			status : {
				required : 'Please enter status'
			},
			destination : {
				required : 'Please enter destination'
			},
			start : {
				required : 'Please enter trip start'
			},
			end : {
				required : 'Please enter trip end'
			},
			agencyName : {
				required : 'Please enter agency name'
			},
			schoolName : {
				required : 'Please enter school name'
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
					    		};
					    	};		    			
					    });
					};
					setValueStudent (field.id, value, 0)
			});
			if (localStorage.studentExistente == "true"){
		        var objJson = JSON.parse(localStorage.getItem("student"));
				if (objJson.contact){
					delete objJson["contact"];
				};
				rest_atualizaStudent(objJson, retornaStudent, atualizacaoNaoEfetuada);
			}else{
				var objJson = JSON.parse(localStorage.getItem("student"));
				if (objJson.contact){
					delete objJson["contact"];
				};
				rest_incluiStudent(objJson, retornaListaStudent, inclusaoNaoEfetuada);
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
	$("#mail").blur(function(){
		localStorage.studentExistente = "false";
		montaPhoto (localStorage.app, "student", "photoPassport", "student", this.value, "photoPassport");
		var data = rest_obterStudent(this.value, carregaTela, carregaInclusao);
	});	

	$('#birthDay').datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
	//		$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
		});
	if (!mailUrl){
		$(".homestay").removeClass("hide");
	};
	
	$('#accommodation').change(function() {
		if ($(this).val() == "Homestay"){
			$(".dorms").addClass("hide");
			$(".suite").addClass("hide");
			$(".homestay").removeClass("hide");
		}else{
			if ($(this).val() == "Dorms"){
				$(".homestay").addClass("hide");
				$(".suite").addClass("hide");
				$(".dorms").removeClass("hide");
			}else{
				$(".homestay").addClass("hide");
				$(".dorms").addClass("hide");
				$(".suite").removeClass("hide");				
			}
		};
	});
	$('#occupancy').change(function() {
		if ($(this).val() == "Twin" || $(this).val() == "Couple"){
			$(".guest").removeClass("hide");
		}else{
			$(".guest").addClass("hide");
		};
	})
	$('#start').datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#end').datepicker('option', 'minDate', selectedDate);
			}
		});
	$('#end').datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});
	$('#arrivalDate').datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#departureDate').datepicker('option', 'minDate', selectedDate);
			}
	});
	$('#departureDate').datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});

	$('#peopleQuantity').change(function() {
		$('.g5').addClass("hide");
		$('.g' + $(this).val()).removeClass("hide");
	});

	$('#arrivalTime').timepicker();
	$('#flightTime').timepicker();
	

    $('#profession2').editable({
//        url: '/post',
        type: 'text',
        pk: 1,
        name: 'profession',
        title: 'Profession',
        placeholder: 'Profession',
//		value: "teste",
        validate: function (value) {
            console.log ("xx");
        }
    });
	$('#agencyName').change(function() {
		$("#agencyConsultName option").remove();
		$("#agencyConsultName").append($(option("Choose one item")));
		$('#agencyConsultName option[value="Choose one item"]').attr('disabled','disabled');
		$(".agency").addClass("hide");
		rest_obterAgency ($(this).val(), carregaDadosAgency, semAcao);
	});

	$('#schoolName').change(function() {
		$("#schoolConsultName option").remove();
		$("#schoolConsultName").append($(option("Choose one item")));
		$('#schoolConsultName option[value="Choose one item"]').attr('disabled','disabled');
		$(".school").addClass("hide");
		rest_obterSchool ($(this).val(), carregaDadosSchool, semAcao);
	});

	$('#streetName').bind('blur', function () {
    	getMapCoordinate($('#streetName').val(), localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
    });
    