	// ** setar menu
	$("#menuStudents_li").addClass("active");
	// 
	//**    desproteje o email na inclusão pois é chave
	//

   	$('#mail').attr("disabled", false);

	// 
	//**    carrega dados url
	//
	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
	var parameter = parametrosDaUrl.split("&");
	var typePage = "";
	localStorage.newTrip = "false";
	var newTrip = "";
	var actualTripParam = "";
	if (parameter[1]) {
		if (parameter[1].split("=")[0] == "typePage"){
			var typePage = parameter[1].split("=")[1];
		}else{
			if (parameter[1].split("=")[0] == "actualTrip"){
				actualTripParam = parameter[1].split("=")[1];
			};
		};
	};
	if (parameter[2]) {
		if (parameter[2].split("=")[0] == "newTrip"){
			newTrip = parameter[2].split("=")[1];
			localStorage.newTrip = newTrip;
		};
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
		rest_obterStudent(mailUrl, carregaTela, carregaInclusao, actualTripParam);
		montaPhoto (localStorage.app, "student", "photoPassport", "student", mailUrl, "photoPassport");
		$('#mail').attr("disabled", true);
	}else{
		$('#birthDay').val("01-Jan-1980");
	};		

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
				minlength : 2,
				regex : /^\S+$/
			},
			firstName : {
				required : true,
				minlength : 2,
				regex : /^\S+$/
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
			secondaryTelephone : {
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
			emergencyContactPhone : {
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
			arrivalFlightNumber : {
				minlength : 2,
				maxlength : 4
			},
			departureFlightNumber : {
				minlength : 2,
				maxlength : 4
			},
			guestName : {
				required : true,
			},
			guestEmail : {
				required : true,
				email : true
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

			},
			phone : {
				required : 'Please enter student phone',
			},
			lastName : {
				required : 'Please enter student last name',
				regex : 'Do not use whitespace in last name',
				minlength : 'Minimum two catacters'
			},
			firstName : {
				required : 'Please enter student first name',
				regex : 'Do not use whitespace in first name',
				minlength : 'Minimum two catacters'
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
			secondaryTelephone : {
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
			},
			emergencyContactName : {
				minlength : 'Minimum 2 caracters',
				maxlength : 'Maximum 42 caracters'
			},
			emergencyContactMail : {
				email : 'Please enter a VALID email address'
			},
			emergencyContactPhone : {
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
			arrivalFlightNumber : {
				minlength : 'Minimum 2 caracters',
				maxlength : 'Maximum 4 caracters'
			},
			departureFlightNumber : {
				minlength : 'Minimum 2 caracters',
				maxlength : 'Maximum 4 caracters'
			},
			guestName : {
				required : 'Please enter guest name'
			},
			guestEmail : {
				required : 'Please enter email guest',
				email : 'Please enter a VALID email address'
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
	        var objJson = JSON.parse(localStorage.getItem("student"));
	        var trips = objJson.documento.trips;
			var actualTrip = actualTripParam;
			limpaStorageStudent ();
	        var objJson = JSON.parse(localStorage.getItem("student"));
			var newTripJson = objJson.documento.trips[0];
			if (localStorage.studentExistente == "true"){
				objJson.documento.trips = trips;
				if (newTrip == "true"){
					objJson.documento.trips.push(newTripJson);
					actualTrip = objJson.documento.trips.length - 1;
					$("#actualTrip").val(actualTrip);
				};			
			};
			localStorage.setItem("student", JSON.stringify(objJson));
			$.each(form
			    , function (i, field) {
					var value = field.value;
					if (field.type == "radio" || field.type == "checkbox") {
						if (field.checked){
							value = "Yes"
						}else{
							value = "No"
						}
					};
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
					setValueStudent (field.id, value, actualTrip);
			});
			if (localStorage.studentExistente == "true"){
		        var objJson = JSON.parse(localStorage.getItem("student"));
				if (newTrip == "true"){
					rest_atualizaStudent(objJson, retornaListaStudent, atualizacaoNaoEfetuada);
				}else{
					objJson.documento.actualTrip = objJson.documento.trips.length - 1;
					rest_atualizaStudent(objJson, retornaStudent, atualizacaoNaoEfetuada);					
				};
			}else{
		        var objJson = JSON.parse(localStorage.getItem("student"));
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
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		yearRange: "1940:2020",
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
		if (
				(($(this).val() == "Twin" || $(this).val() == "Couple") && $('#accommodation').val() == "Homestay")
			)
		{
			$(".guest").removeClass("hide");
		}else{
			$(".guest").addClass("hide");
		};
	});
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
		$("#agencyConsultMobile").html("");
		$("#agencyConsultPhone").html("");
		$("#agencyConsultEmail").html("");
		$(".agency").addClass("hide");
		rest_obterAgency ($(this).val(), carregaDadosAgency, semAcao);
	});
	$('#agencyConsultName').change(function() {
		var objJson = JSON.parse(localStorage.getItem("agency"));
	    $.each(objJson.documento.consultants, function (i, consultants) {
	    	console.log ("valor" + $('#agencyConsultName').val())
	    	if (consultants.name == $('#agencyConsultName').val()){
	    		$("#agencyConsultMobile").html(consultants.celPhone);
	    		$("#agencyConsultPhone").html(consultants.phone);
	    		$("#agencyConsultEmail").html(consultants.email);
	    	};
	    });
	});

	$('#schoolName').change(function() {
		$("#schoolConsultName option").remove();
		$("#schoolConsultName").append($(option("Choose one item")));
		$('#schoolConsultName option[value="Choose one item"]').attr('disabled','disabled');
		$("#schoolConsultMobile").html("");
		$("#schoolConsultPhone").html("");
		$("#schoolConsultEmail").html("");
		$(".school").addClass("hide");
		rest_obterSchool ($(this).val(), carregaDadosSchool, semAcao);
	});
	$('#schoolConsultName').change(function() {
		var objJson = JSON.parse(localStorage.getItem("school"));
	    $.each(objJson.documento.consultants, function (i, consultants) {
	    	if (consultants.name == $('#schoolConsultName').val()){
	    		$("#schoolConsultMobile").html(consultants.celPhone);
	    		$("#schoolConsultPhone").html(consultants.phone);
	    		$("#schoolConsultEmail").html(consultants.email);
	    	};
	    });
	});

	$('#streetName').bind('blur', function () {
    	getMapCoordinate($('#streetName').val(), localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
    });
	//
	//*** uso na tela extend trip
	//
	if (localStorage.newTrip){
		if (localStorage.newTrip == "true"){	
			$('#status').val("confirmed");
			$('#changeFamily').change(function() {
				if ($(this).checked){
					$('#status').val("available");
				}else{
					$('#status').val("confirmed");
				};
			});
		};
	};
    