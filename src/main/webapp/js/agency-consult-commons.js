
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#agencyConsultModal-form").validate({
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
			limpaStorageConsult();
			var objJson = JSON.parse(localStorage.getItem("consult"));
			$.each(form
			    , function (i, field) {
				if (field.value){
			        objJson[field.name] = field.value;
				};
			});
			localStorage.setItem("consult", JSON.stringify(objJson));
			if (localStorage.consultExistente == "true"){
				atualizaConsultList (objJson);
			}else{
				incluiConsultList (objJson);
			};
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

	$('#consultInclusao').bind('click', function () {
    	localStorage.consultExistente = "false";
    });
	
	$('#agencyConsultModal-form').on('hidden', function () {
    	$('#agencyConsultName').attr("disabled", false);
    	$("#agencyConsultName").val("");
    	$("#agencyConsultPhone").val("");
    	$("#agencyConsultCelPhone").val("");
    	$("#agencyConsultEmail").val("");
	});
	
    function fechaModalConsult () {
    	$("#agencyConsultModal").modal('hide');
    	$('#agencyConsultName').attr("disabled", false);
    	
    	$("#agencyConsultName").val("");
    	$("#agencyConsultPhone").val("");
    	$("#agencyConsultCelPhone").val("");
    	$("#agencyConsultEmail").val("");
    	var objJson = JSON.parse(localStorage.getItem("agency"));
    	carregaConsultants (objJson);
    	$('#agencyModal').modal('hide');
    };

    function carregaLocalStorageConsult (data, tipo) {
    	localStorage.setItem("consult", JSON.stringify(data));
    	localStorage.consultExistente = "true";
    	carregaConsultants (data);
    };

	function carregaInclusaoConsult(data) { 	   	
		localStorage.consultExistente = "false";
	};    
	
	function limpaStorageConsult () {
		
		var data  = 
				{
				    "name" : "",
				    "phone" : "",
				    "celPhone" : "",
				    "email" : ""
				};
	
		localStorage.setItem("consult", JSON.stringify(data));
	};		
	
	function atualizaConsultList (newConsult) {
		var objJson = JSON.parse(localStorage.getItem("agency"));
        $.each(objJson.documento.consultants, function (i, oldConsult) {
        	if (oldConsult.name == newConsult.name){
        		oldConsult.phone = newConsult.phone;
        		oldConsult.celPhone = newConsult.celPhone;
        		oldConsult.email = newConsult.email;
        		return;
        	};
        });
        localStorage.setItem("agency", JSON.stringify(objJson));
		if (localStorage.agencyExistente == "true"){
			rest_atualizaAgency(JSON.parse(localStorage.getItem("agency")), fechaModalConsult, semAcao);
		};
	};
	
	function incluiConsultList (consult) {
		var objJson = JSON.parse(localStorage.getItem("agency"));
		objJson.documento.consultants.push(consult);
		localStorage.setItem("agency", JSON.stringify(objJson));
		if (localStorage.agencyExistente == "true"){
			rest_atualizaAgency(JSON.parse(localStorage.getItem("agency")), fechaModalConsult, semAcao);
		};
	};