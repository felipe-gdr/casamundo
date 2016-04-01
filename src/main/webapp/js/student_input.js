
	localStorage.urlServidor = window.location.hostname;
	limpaStorageStudent ();



/**
*          valida formulário   
*/

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
					setValueStudent (field.id, value, 0)
			});
			if (localStorage.studentExistente){
				rest_atualizaStudent(JSON.parse(localStorage.getItem("student")), atualizacaoEfetuada, atualizacaoNaoEfetuada);;
			}else{
				rest_incluiStudent(JSON.parse(localStorage.getItem("student")), inclusaoEfetuada, inclusaoNaoEfetuada);
			}
//			$(form).ajaxSubmit({
//			success : function() {
//					console.log ("submit");
//				}
//			});
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
		localStorage.studentExistente = false;
		var data = rest_obterStudent(this.value, carregaTela);
	});	

    // **** carrega select
	var table = JSON.parse(localStorage.getItem("table"));

    $.each(table.documento.firstLanguage
		    , function (i, optionValue) {
    			$("#firstLanguage").append( $(option(optionValue)));
		    });
    $.each(table.documento.nationality
		    , function (i, optionValue) {
    			$("#nationality").append( $(option(optionValue)));
		    });
    $.each(table.documento.mainPurposeTrip
		    , function (i, optionValue) {
    			$("#mainPurposeTrip").append( $(option(optionValue)));
		    });
    $.each(table.documento.englishLevel
		    , function (i, optionValue) {
    			$("#englishLevel").append( $(option(optionValue)));
		    });
    $.each(table.documento.state
		    , function (i, optionValue) {
    			$("#state").append( $(option(optionValue)));
		    });
    $.each(table.documento.city
		    , function (i, optionValue) {
    			$("#city").append( $(option(optionValue)));
		    });
    $.each(table.documento.country
		    , function (i, optionValue) {
    			$("#country").append( $(option(optionValue)));
		    });
    $.each(table.documento.status
		    , function (i, optionValue) {
    			$("#status").append( $(option(optionValue)));
		    });
    $.each(table.documento.destination
		    , function (i, optionValue) {
    			$("#destination").append( $(option(optionValue)));
		    });
    $.each(table.documento.accommodation
		    , function (i, optionValue) {
    			$("#accommodation_group").append( $(radio(optionValue, "accommodation", i, 0)));
		    });
    $.each(table.documento.occupancy
		    , function (i, optionValue) {
    			$("#occupancy").append( $(option(optionValue)));
		    });
    $.each(table.documento.relationship
		    , function (i, optionValue) {
    			$("#relationship").append( $(option(optionValue)));
		    });
    $.each(table.documento.mealPlan
		    , function (i, optionValue) {
    			$("#mealPlan").append( $(option(optionValue)));
		    });
    $.each(table.documento.specialDiet
		    , function (i, optionValue) {
				$("#specialDiet").append( $(option(optionValue)));
		    });
    $.each(table.documento.creditCardType
		    , function (i, optionValue) {
    			$("#creditCardType").append( $(option(optionValue)));
		    });
    $.each(table.documento.apartamentType
		    , function (i, optionValue) {
    			$("#apartamentType").append( $(option(optionValue)));
		    });
    $.each(table.documento.peopleQuantity
		    , function (i, optionValue) {
    			$("#peopleQuantity").append( $(option(optionValue)));
		    });
    $.each(table.documento.usuallyStudy
		    , function (i, optionValue) {
    			$("#usuallyStudy").append( $(option(optionValue)));
		    });
    $.each(table.documento.keepBedroom
		    , function (i, optionValue) {
    			$("#keepBedroom").append( $(option(optionValue)));
		    });
    $.each(table.documento.iAmUsually
		    , function (i, optionValue) {
    			$("#iAmUsually").append( $(option(optionValue)));
		    });
	$('#birthDayStudent').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
	//		$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
		});
	$('#start').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#end').datepicker('option', 'minDate', selectedDate);
			}
		});
	$('#end').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});
	$('#arrivalDate').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});
	$('#flightDate').datepicker({
		dateFormat : 'dd.mm.yy',
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

	$('#occupancy').change(function() {
		if ($(this).val() == "Twin" || $(this).val() == "Couple"){
			$(".guest").removeClass("hide");
		}else{
			$(".guest").addClass("hide");
		};
	})

	$('#arrivalTime').timepicker();
	$('#flightTime').timepicker();
	
	$(".homestay").removeClass("hide");
	
	$("#accommodation0").click(function() {
		$(".dorms").addClass("hide");
		$(".suite").addClass("hide");
		$(".homestay").removeClass("hide");
	});
	$("#accommodation1").click(function() {
		$(".homestay").addClass("hide");
		$(".suite").addClass("hide");
		$(".dorms").removeClass("hide");
	});
	$("#accommodation2").click(function() {
		$(".homestay").addClass("hide");
		$(".dorms").addClass("hide");
		$(".suite").removeClass("hide");
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

	function option(value) {
    	return '<option value="' + value +'">' + value +'</option>';
    };
	function inclusaoEfetuada() {
		$.smallBox({
			title : "Ok",
			content : "<i class='fa fa-clock-o'></i> <i>You included a new Student</i>",
			color : "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
		$(window.document.location).attr('href','students.html');
    };
	function inclusaoNaoEfetuada() {
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>An error occurred while recording , try again</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
    };
	function atualizacaoEfetuada() {
		$.smallBox({
			title : "Ok",
			content : "<i class='fa fa-clock-o'></i> <i>Student data atualized</i>",
			color : "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
		$(window.document.location).attr('href','students.html');
    };
	function atualizacaoNaoEfetuada() {
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>An error occurred while recording , try again</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
    };
    function carregaTela(data) {
    	
    	$("#celPhone").val(data.documento.celPhone);
    	$("#phone").val(data.documento.phone);
    	$("#mail").val(data.documento.mail);
    	$("#lastName").val(data.documento.lastName);
    	$("#firstName").val(data.documento.firstName);
    	$("#birthDay").val(data.documento.birthDay);
    	$("#gender").val(data.documento.gender);
    	$("#nationality").val(data.documento.nationality);
    	$("#firstLanguage").val(data.documento.firstLanguage);
    	$("#profession").val(data.documento.profession);
    	$("#englishLevel").val(data.documento.englishLevel);
    	$("#streetNumber").val(data.documento.streetNumber);
    	$("#streetName").val(data.documento.streetName);
    	$("#state").val(data.documento.state);
    	$("#postalCode").val(data.documento.postalCode);
    	$("#city").val(data.documento.city);
    	$("#country").val(data.documento.country);
    	$("#secondaryTelephone").val(data.documento.secondaryTelephone);
    	$("#emergencyContactName").val(data.documento.emergencyContactName);
    	$("#emergencyContactPhone").val(data.documento.emergencyContactPhone);
    	$("#emergencyContactMail").val(data.documento.emergencyContactMail);
/*    	$("#status").val(data.documento.trips[actualTrip].status);
    	$("#destination").val(data.documento.trips[actualTrip].destination);
    	$("#start").val(data.documento.trips[actualTrip].start);
    	$("#end").val(data.documento.trips[actualTrip].end);
    	$("#arrivalDate").val(data.documento.trips[actualTrip].arrivalDate);
    	$("#arrivalTime").val(data.documento.trips[actualTrip].arrivalTime);
    	$("#flightNumber").val(data.documento.trips[actualTrip].flightNumber);
    	$("#flightDate").val(data.documento.trips[actualTrip].flightDate);
    	$("#flightTime").val(data.documento.trips[actualTrip].flightTime);
    	$("#airline").val(data.documento.trips[actualTrip].airline);
    	$("#extend").val(data.documento.trips[actualTrip].extend);
    	$("#pickup").val(data.documento.trips[actualTrip].pickup);
    	$("#dropoff").val(data.documento.trips[actualTrip].dropoff);
    	$("#accommodation").val(data.documento.trips[actualTrip].accommodation);
    	$("#occupancy").val(data.documento.trips[actualTrip].occupancy);
    	$("#guestName").val(data.documento.trips[actualTrip].guestName);
    	$("#relationship").val(data.documento.trips[actualTrip].relationship);
    	$("#mealPlan").val(data.documento.trips[actualTrip].mealPlan);
    	$("#specialDiet").val(data.documento.trips[actualTrip].specialDiet);
    	$("#privateWashroom").val(data.documento.trips[actualTrip].privateWashroom);
    	$("#smoke").val(data.documento.trips[actualTrip].smoke);
    	$("#liveDogs").val(data.documento.trips[actualTrip].liveDogs);
    	$("#liveCats").val(data.documento.trips[actualTrip].liveCats);
    	$("#hobbies").val(data.documento.trips[actualTrip].hobbies);
    	$("#medical").val(data.documento.trips[actualTrip].medical);
    	$("#comments").val(data.documento.trips[actualTrip].comments);
    	$("#agreeTerm").val(data.documento.trips[actualTrip].agreeTerm);
    	$("#usuallyStudy").val(data.documento.trips[actualTrip].usuallyStudy);
    	$("#keepBedroom").val(data.documento.trips[actualTrip].keepBedroom);
    	$("#iAmUsually").val(data.documento.trips[actualTrip].iAmUsually);
    	$("#creditCardType").val(data.documento.trips[actualTrip].creditCardType);
    	$("#creditCardNumber").val(data.documento.trips[actualTrip].creditCardNumber);
    	$("#creditCardExpire").val(data.documento.trips[actualTrip].creditCardExpire);
    	$("#creditCardCVC").val(data.documento.trips[actualTrip].creditCardCVC);
    	$("#agreeDebit").val(data.documento.trips[actualTrip].agreeDebit);
    	$("#apartamentType").val(data.documento.trips[actualTrip].apartamentType);
    	$("#petQuantity").val(data.documento.trips[actualTrip].petQuantity);
    	$("#petType").val(data.documento.trips[actualTrip].petType);
    	$("#parking").val(data.documento.trips[actualTrip].parking);
    	$("#wifi").val(data.documento.trips[actualTrip].wifi);
    	$("#peopleQuantity").val(data.documento.trips[actualTrip].peopleQuantity);
    	$("#guest_01").val(data.documento.trips[actualTrip].guest_01);
    	$("#guest_02").val(data.documento.trips[actualTrip].guest_02);
    	$("#guest_03").val(data.documento.trips[actualTrip].guest_03);
    	$("#guest_04").val(data.documento.trips[actualTrip].guest_04);
    	$("#guest_05").val(data.documento.trips[actualTrip].guest_05);
    	$("#agrreeDebitSuite").val(data.documento.trips[actualTrip].agrreeDebitSuite);
    	$("#agrreeSuite").val(data.documento.trips[actualTrip].agrreeSuite);
*/    	
    	localStorage.setItem("student", JSON.stringify(data));
    	localStorage.studentExistente = true;
    };    

    function checkbox(value, field) {
    	return '<label class="checkbox"><input type="checkbox" id="' + field +'" name="' + field +'"><i></i>' + value +'</label>';
    };    
    function radio(value, field, i, x) {
    	if (i == x){
    		return '<label class="radio"><input type="radio" id="' + field  + i +'" name="' + field + '" checked="checked"><i></i>' + value +'</label>';	
    	}
    	return '<label class="radio"><input type="radio" id="' + field  + i +'" name="' + field + '"><i></i>' + value +'</label>';
    };        