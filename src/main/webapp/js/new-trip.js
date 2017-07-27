	// ** setar menu
	$("#menuStudents_li").addClass("active");
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
	 * 		carrega student
	 */
	if (mailUrl) {
		rest_obterStudent(mailUrl, carregaTela, obtencaoNaoEfetuada);
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
				var newTripJson = montaJsonNewTrip();
				var objStudent = JSON.parse(localStorage.getItem("student"));
				newTripJson.trip = objStudent.documento.trips[objStudent.documento.actualTrip];
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
							value = [];
							var first = true;
						    $.each(field.children, function (i, optionValue) {
						    	if (optionValue.selected){
						    		value.push(optionValue.label);
						    	};		    			
						    });
						    newTripJson.trip[field.name] = value;
						}else{
							if (field.name != "" ){
								var validField = field.name.split("_");
								if (validField.length == 1 && field.name != ""){
									newTripJson.trip[field.name] = limpaData(value);
								};
							};
						};
				});
				newTripJson.idStudent = objStudent._id;
				rest_incluiNewTrip(newTripJson, retornaListaStudent, atualizacaoNaoEfetuada);
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
//				$('#finishdate').datepicker('option', 'minDate', selectedDate);
				}
		});

		$('#peopleQuantity').change(function() {
			$('.g5').addClass("hide");
			$('.g' + $(this).val()).removeClass("hide");
		});

		$('#arrivalTime').timepicker();
		$('#flightTime').timepicker();
		
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
		
		$('#status').val("Available");
		$('#familyName').val("");
		$('#idFamily').val("");

		
function montaJsonNewTrip(){
	
	var trip =
		{trip :
			{ 
	    		status:"", 
	    		destination:"", 
	    		familyName:"", 
	    		idFamily:"",
	    		idRoom:"",
	    		idBed:"",
	    		dormName:"",
	    		unitName:"",
	    		roomName:"",
	    		bedName:"",
	    		start:"", 
	    		end:"", 
	    		extend:"", 
	    		arrivalDate:"", 
	    		arrivalTime:"", 
	    		arrivalFlightNumber:"", 
	    		arrivalAirline:"", 
	    		departureDate:"", 
	    		departureTime:"", 
	    		departureFlightNumber:"", 
	    		departureAirline:"", 
	    		pickup:"", 
	    		dropoff:"", 
	    		accommodation:"", 
	    		occupancy:"", 
	    		guestName:"", 
	    		guestEmail:"", 
	    		relationship:"", 
	    		mealPlan:[], 
	    		specialDiet:[], 
	    		privateWashroom:"", 
	    		smoke:"", 
	    		liveDogs:"", 
	    		liveCats:"", 
	    		liveWithChildren:"", 
	    		hobbies:"", 
	    		comments:"", 
	    		medical:"", 
	    		agreeTerm:"", 
	    		usuallyStudy:[], 
	    		keepBedroom:[], 
	    		iAmUsually:[], 
	    		creditCardType:"", 
	    		creditCardNumber:"", 
	    		creditCardExpire:"", 
	    		creditCardCVC:"", 
	    		agreeDebit:"", 
	    		apartamentType:"", 
	    		petsQuantity:"", 
	    		petType:"", 
	    		parking:"", 
	    		wifi:"", 
	    		peopleQuantity:"", 
	    		guest_01:"", 
	    		guest_02:"", 
	    		guest_03:"", 
	    		guest_04:"", 
	    		guest_05:"", 
	    		agreeDebitSuite:"", 
	    		agreeSuite:"",
	    		agencyId:"",
	    		agencyName:"", 
	    		agencyConsultName:"",
	    		schoolId:"",
	    		schoolName:"", 
	    		schoolConsultName:""
			}
	    }; 
	
	return trip;
};
function retornaListaStudent(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Student included</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	window.location="students.html"; 
};
