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
	var mailUrl = "";
	var parameter = "";
	var typePage = "";
	var newTrip = "";
	var actualTripParam = 0;
	if (parametrosDaUrl){
		mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
		parameter = parametrosDaUrl.split("&");
		localStorage.newTrip = "false";
		if (parameter[1]) {
			if (parameter[1].split("=")[0] == "typePage"){
				typePage = parameter[1].split("=")[1];
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
	};
	
	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTelaTabelas, obtencaoNaoEfetuada);

	rest_obterAgencyAll(carregaSelectAgencies, true);
	
	rest_obterSchoolAll(carregaSelectSchool, true);
	
	/**
	 * 		carrega tela se alteração
	 */
	if (mailUrl){
		localStorage.studentExistente = "true";
		rest_obterStudent(mailUrl, carregaTela, carregaInclusao, actualTripParam);
		montaPhoto (localStorage.app, "student", "photoPassport", "student", mailUrl, "photoPassport");
		$('#mail').attr("disabled", true);
	}else{
	   	$('#actualTrip').val("0");
	   	$('#status').val("Available");
		$('#birthDay').val("01-Jan-1980");
		localStorage.newTrip = false;
		criaLinhaNote();
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
//			celPhone : {
//				required : true,
//			},
//			phone : {
//				required : true,
//			},
			lastName : {
				required : true,
				minlength : 2,
//				regex : /^\S+$/
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
/*			gender : {
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
*/			destination : {
				required : true,
			},
			accommodation : {
				required : true,
			},
			occupancyDorms : {
				required : true,
			},
			occupancyHomestay : {
				required : true,
			},
			occupancySuite : {
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
/*			arrivalDate : {
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
*/			agencyName : {
				required : true,
			},
			schoolName : {
				required : true,
			},
			agreeTerm : {
				required : true,
			},
			agreeDebit : {
				required : true,
			},
			agreeSuite : {
				required : true,
			},
			agreeDebitSuite : {
				required : true,
			}
		},

		// Messages for form validation
		messages : {
			mail : {
				required : 'Please enter student email',
				email : 'Please enter a VALID email address'
			},
//			celPhone : {
//				required : 'Please enter student cel phone',
//			},
//			phone : {
//				required : 'Please enter student phone',
//			},
			lastName : {
				required : 'Please enter student last name',
//				regex : 'Do not use whitespace in last name',
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
/*			gender : {
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
*/			destination : {
				required : 'Please enter destination'
			},
			accommodation : {
				required : 'Please enter accommodation'
			},
			occupancyDorms : {
				required : 'Please enter occupancy'
			},
			occupancyHomestay : {
				required : 'Please enter occupancy'
			},
			occupancySuite : {
				required : 'Please enter occupancy'
			},
			start : {
				required : 'Please enter trip start'
			},
			end : {
				required : 'Please enter trip end'
			},
/*			arrivalFlightNumber : {
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
*/			agencyName : {
				required : 'Please enter agency name'
			},
			schoolName : {
				required : 'Please enter school name'
			},
			agreeTerm : {
				required : 'Please enter fill agree term'
			},
			agreeDebit : {
				required : 'Please enter fill agree term'
			},
			agreeSuite : {
				required : 'Please enter fill agree term'
			},
			agreeDebitSuite : {
				required : 'Please enter fill agree term'
			}
		},
		// form submition
		submitHandler : function(form) {
			if (localStorage.studentExistente == "true"){
		        var objJson = JSON.parse(localStorage.getItem("student"));
		        var idStudent = objJson._id;
		        var trips = objJson.documento.trips;
				var actualTrip = actualTripParam;
				var startOrigem = trips[actualTripParam].start;
				var endOrigem = trips[actualTripParam].end;
				limpaStorageStudent ();
		        var objJson = JSON.parse(localStorage.getItem("student"));
				var newTripJson = objJson.documento.trips[0];
				objJson.documento.trips = trips;
				if (newTrip == "true"){
					objJson.documento.trips.push(newTripJson);
					actualTrip = objJson.documento.trips.length - 1;
					$("#actualTrip").val(actualTrip);
				};			
				localStorage.setItem("student", JSON.stringify(objJson));
			}else{
				limpaStorageStudent ();				
		        var objJson = JSON.parse(localStorage.getItem("student"));
				var actualTrip = 0;
			};
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
					var parentNode = field.parentNode;
					var trip = false;
					var notTrip = false;
					while (parentNode != null & !trip & !notTrip) {
						if (parentNode.id == "trip" || parentNode.id == "school" || parentNode.id == "agency" || parentNode.id == "trip-1" || parentNode.id == "trip-2" || parentNode.id == "trip-3"){
							trip = true;
						};
						if (parentNode.id == "body"){
							notTrip = true;
						};
						var parentNode = parentNode.parentNode;
					};
					if (field.name != ""){
						if (field.type == "select-multiple") {
							var array = [];
						    $.each(field.children, function (i, optionValue) {
						    	if (optionValue.selected){
					    			array.push(optionValue.label);
						    	}				    			
						    });
							if (!trip){
								objJson.documento[field.name] = array;
							}else{
								objJson.documento.trips[actualTrip][field.name] = array;
							};
						}else{
							if (!trip){
								objJson.documento[field.name] = limpaData(value);
							}else{
								objJson.documento.trips[actualTrip][field.name] = limpaData(value);
							};
						};
					};
					localStorage.setItem("student", JSON.stringify(objJson));
			});
			if (localStorage.studentExistente == "true"){
		        var objJson = JSON.parse(localStorage.getItem("student"));
				objJson.documento.notes = [];
				$(".noteItem").each(function(i, value) {
					if ($("#notesDate_" + i).val()) {
						objJson.documento.notes.push(JSON.parse('{"date":"' + $("#notesDate_" + i).val() 
																+ '","user":"' + $("#notesUser_" + i).val() 
																+ '","note":"' + $("#notesNote_" + i).val() 
																+  '"}'
																));
					};
				});
				if (newTrip == "true"){
					var actualTrip = objJson.documento.trips.length - 1;
					var actualTripString = actualTrip.toString();
					objJson.documento.actualTrip = actualTripString;
					var newTripJson = 
						{
							idStudent : idStudent,
							trip : objJson.documento.trips[actualTrip]
						}
					rest_incluiNewTrip(newTripJson, retornaListaStudent, atualizacaoNaoEfetuada);
				}else{
					var actualTrip = objJson.documento.trips.length - 1;
					var actualTripString = actualTrip.toString();
					objJson.documento.actualTrip = actualTripString;
					rest_atualizar("student", objJson, "_id", idStudent);
					if (objJson.documento.trips[actualTrip].start != startOrigem || objJson.documento.trips[actualTrip].end != endOrigem){
	    				if (call_rest_get ("family/deallocate/room", "idStudent=" + idStudent  + "&indexTrip=" + actualTrip + "&idFamily=" + objJson.documento.trips[actualTrip].idFamily) + "&start=" + startOrigem + "&end=" + endOrigem){
	    					call_rest_get ("student/changeStatus", "idStudent=" + idStudent  + "&indexTrip=" + actualTrip + "&status=" + "Available");
	    				};						
					};
					retornaStudent(actualTrip);
				};
			}else{
		        var objJson = JSON.parse(localStorage.getItem("student"));
				objJson.documento.notes = [];
				$(".noteItem").each(function(i, value) {
					if ($("#notesDate_" + i).val()) {
						objJson.documento.notes.push(JSON.parse('{"date":"' + $("#notesDate_" + i).val() 
																+ '","user":"' + $("#notesUser_" + i).val() 
																+ '","note":"' + $("#notesNote_" + i).val() 
																+  '"}'
																));
					};
				});
				var studentDoc = rest_incluir("student", objJson);
				localStorage.setItem("students", JSON.stringify(studentDoc.documento));
				retornaStudent("0");
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
		if (this.value){
			localStorage.studentExistente = "false";
			montaPhoto (localStorage.app, "student", "photoPassport", "student", this.value, "photoPassport");
			var data = rest_obterStudent(this.value, carregaTela, carregaInclusao);
		};
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
		$('#occupancyDorms').find('option:not(:first)').remove();
		$('#occupancyHomestay').find('option:not(:first)').remove();
		$('#occupancySuite').find('option:not(:first)').remove();
		$(".guest").addClass("hide");
    	var table = JSON.parse(localStorage.getItem("table"));
		if ($(this).val() == "Homestay"){
			$(".dorms").addClass("hide");
			$(".suite").addClass("hide");
			$(".homestay").removeClass("hide");
	        $.each(table.documento.occupancyHomestay
	    		    , function (i, optionValue) {
	        			$("#occupancyHomestay").append( $(option(optionValue)));
	    		    });
		}else{
			if ($(this).val() == "Dorms"){
				$(".homestay").addClass("hide");
				$(".suite").addClass("hide");
				$(".dorms").removeClass("hide");
		        $.each(table.documento.occupancyDorms
		    		    , function (i, optionValue) {
		        			$("#occupancyDorms").append( $(option(optionValue)));
		    		    });
			}else{
				$(".homestay").addClass("hide");
				$(".dorms").addClass("hide");
				$(".suite").removeClass("hide");				
		        $.each(table.documento.occupancySuite
		    		    , function (i, optionValue) {
		        			$("#occupancySuite").append( $(option(optionValue)));
		    		    });
			};
		};
	});
	
	$('#occupancyDorms').change(function() {
		if ($(this).val() != "Single"){
			$(".guest").removeClass("hide");
		}else{
			$(".guest").addClass("hide");
		};
		$('#occupancyHomestay').val($(this).val());
		$('#occupancySuite').val($(this).val());
	});
	
	$('#occupancyHomestay').change(function() {
		if ($(this).val() != "Single"){
			$(".guest").removeClass("hide");
		}else{
			$(".guest").addClass("hide");
		};
		$('#occupancyDorms').val($(this).val());
		$('#occupancySuite').val($(this).val());
	});
	
	$('#occupancySuite').change(function() {
		if ($(this).val() != "Single"){
			$(".guest").removeClass("hide");
		}else{
			$(".guest").addClass("hide");
		};
		$('#occupancyHomestay').val($(this).val());
		$('#occupancyDorms').val($(this).val());
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

    $('#arrivalTime').timepicker({
        showInputs: false,
        disableFocus: true,
        showMeridian : false
    });
    $('#departureTime').timepicker({
        showInputs: false,
        disableFocus: true,
        showMeridian : false
    });
	
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
	$('#agencyId').change(function() {
		$("#agencyConsultName option").remove();
		$("#agencyConsultName").append($(option("Choose one item")));
		$('#agencyConsultName option[value="Choose one item"]').attr('disabled','disabled');
		$("#agencyConsultMobile").html("");
		$("#agencyConsultPhone").html("");
		$("#agencyConsultEmail").html("");
		$(".agency").addClass("hide");
		var agencyData = rest_obter("agency", "_id", $(this).val());
		if (agencyData){
			carregaDadosAgency(agencyData, false, "");
		};
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

	$('#schoolId').change(function() {
		$("#schoolConsultName option").remove();
		$("#schoolConsultName").append($(option("Choose one item")));
		$('#schoolConsultName option[value="Choose one item"]').attr('disabled','disabled');
		$("#schoolConsultMobile").html("");
		$("#schoolConsultPhone").html("");
		$("#schoolConsultEmail").html("");
		$(".school").addClass("hide");
		var schoolData = rest_obter("school", "_id", $(this).val());
		if (schoolData){
			carregaDadosSchool(schoolData, false, "");
		};
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
    