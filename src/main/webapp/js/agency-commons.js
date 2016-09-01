
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#agencyModal-form").validate({
		// Rules for form validation
		rules : {
			agencyName : {
				required : true,
			},
			agencyAgencyPhone : {
				required : true,
				email : true
			},
			agencyAgencyEmail : {
				required : true,
			},
		},

		// Messages for form validation
		messages : {
			agencyName : {
				required : 'Please enter agency name',
			},
			agencyAgencyPhone : {
				required : 'Please enter agency phome',
			},
			agencyAgencyEmail : {
				required : 'Please enter agency cell phone',
				email : 'Please enter a VALID email address'
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStorageAgency();
			var objJson = JSON.parse(localStorage.getItem("agency"));
			objJson.documento.consultants = JSON.parse(localStorage.consultants);
			$.each(form
			    , function (i, field) {
				if (field.value){
			        objJson.documento[field.name] = field.value;
				};
			});
			localStorage.setItem("agency", JSON.stringify(objJson));
			if (localStorage.agencyExistente == "true"){
				rest_atualizaAgency(JSON.parse(localStorage.getItem("agency")), fechaModalAgency, semAcao);
			}else{
				rest_incluiAgency(JSON.parse(localStorage.getItem("agency")), fechaModalAgency, semAcao);
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
	
	$('#agencyInclusao').off('click');
	$('#agencyInclusao').on('click', function () {
    	localStorage.agencyExistente = "false";
    	localStorage.consultants = "[]";
    	carregaInclusaoAgency();
    });
	
	$("#agencyModal").off('hidden.bs.modal');
	$("#agencyModal").on('hidden.bs.modal', function(event){
    	$('#agencyName').attr("disabled", false);
    	$("#agencyName").val("");
    	$("#agencyAgencyPhone").val("");
    	$("#agencyAgencyEmail").val("");
    	$("#agencyAgencySigla").val("");
    	$("#agencyAgencyLogo").val("");
    	$("#agencyConsultants").val("");
	 });

	 function fechaModalAgency () {
    	$("#agencyModal").modal('hide');
    	$('#agencyName').attr("disabled", false);
    	
    	$("#agencyName").val("");
    	$("#agencyAgencyPhone").val("");
    	$("#agencyAgencyEmail").val("");
    	$("#agencyAgencySigla").val("");
    	$("#agencyAgencyLogo").val("");
    	$("#agencyConsultants").val("");
    	
    	rest_obterAgencyAll(carregaAgencies);
    };

    function carregaLocalStorageAgency (data, tipo) {
    	localStorage.setItem("agency", JSON.stringify(data));
    	localStorage.consultants = JSON.stringify(data.documento.consultants);
    	localStorage.agencyExistente = "true";
    	carregaConsultantsAgency (data.documento.consultants);
    };

	function carregaInclusaoAgency() { 	   	
		localStorage.agencyExistente = "false";
		carregaConsultantsAgency (JSON.parse("[]"));
	};    
	
	function limpaStorageAgency () {
		
		var data  = 
				{
					"documento" :  
					  {
					    "name" : "",
					    "agencyPhone" : "",
					    "agencyEmail" : "",
					    "agencyLogo" : "",
					    "agencySigla" : "",
					    "consultants" : []
					  }
				};
	
		localStorage.setItem("agency", JSON.stringify(data));
	};		
