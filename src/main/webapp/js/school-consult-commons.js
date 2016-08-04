
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#schoolConsultModal-form").validate({
		// Rules for form validation
		rules : {
			name : {
				required : true,
			},
			phone : {
				required : true,
			},
			celPhone : {
			},
			email : {
				required : true,
				email : true
			},
		},

		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter consult name',
			},
			phone : {
				required : 'Please enter consult phome',
			},
			celPhone : {
				required : 'Please enter consult cel phome',
			},
			email : {
				required : 'Please enter consult email',
				email : 'Please enter a VALID email address'
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStorageConsultSchool();
			var objJson = JSON.parse(localStorage.getItem("consult"));
			$.each(form
			    , function (i, field) {
				if (field.value){
			        objJson[field.name] = field.value;
				};
			});
			localStorage.setItem("consult", JSON.stringify(objJson));
			if (localStorage.consultExistente == "true"){
				atualizaConsultListSchool (objJson);
			}else{
				incluiConsultListSchool (objJson);
			};
			$("#schoolConsultModal").modal('hide');
			carregaConsultantsSchool (JSON.parse(localStorage.consultants));
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

	$('#schoolConsultInclusao').bind('click', function () {
    	localStorage.consultExistente = "false";
    });
	$("#schoolConsultModal").on('hidden.bs.modal', function(event){
		$('#schoolConsultName').attr("disabled", false);
		$("#schoolConsultName").val("");
		$("#schoolConsultPhone").val("");
		$("#schoolConsultCelPhone").val("");
		$("#schoolConsultEmail").val("");
	});
	
    function fechaModalConsultSchool () {
    	$("#schoolConsultModal").modal('hide');
    	$('#schoolConsultName').attr("disabled", false);
    	
    	$("#schoolConsultName").val("");
    	$("#schoolConsultPhone").val("");
    	$("#schoolConsultCelPhone").val("");
    	$("#schoolConsultEmail").val("");
    	var objJson = JSON.parse(localStorage.getItem("school"));
    	carregaConsultantsAgency (objJson.documento.consultants);
    };
	
	function limpaStorageConsultSchool () {
		
		var data  = 
				{
				    "name" : "",
				    "phone" : "",
				    "celPhone" : "",
				    "email" : ""
				};
	
		localStorage.setItem("consult", JSON.stringify(data));
	};		
	
	function atualizaConsultListSchool (newConsult) {
		var objJson = JSON.parse(localStorage.consultants);
        $.each(objJson, function (i, oldConsult) {
        	if (oldConsult.name == newConsult.name){
        		oldConsult.phone = newConsult.phone;
        		oldConsult.celPhone = newConsult.celPhone;
        		oldConsult.email = newConsult.email;
        		return;
        	};
        });
        localStorage.consultants = JSON.stringify(objJson);
	};
	
	function incluiConsultListSchool (consult) {
		var objJson = JSON.parse(localStorage.consultants);
		objJson.push(consult);
		localStorage.consultants = JSON.stringify(objJson);
	};