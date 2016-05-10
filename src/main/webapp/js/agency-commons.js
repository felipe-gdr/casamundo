
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#agencyModal-form").validate({
		// Rules for form validation
		rules : {
			name : {
				required : true,
			},
			nameConsult : {
				required : true,
			},
			cellPhone : {
				required : true,
			},
			phone : {
				required : true,
			},
			email : {
				required : true,
				email : true
			},
		},

		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter agency name',
			},
			nameConsult : {
				required : 'Please enter agency consult name',
			},
			cellPhone : {
				required : 'Please enter agency cell phone',
			},
			phone : {
				required : 'Please enter agency phone',
			},
			email : {
				required : 'Please enter agency email',
				email : 'Please enter a VALID email address'
			},
		},
		// form submition
		submitHandler : function(form) {
			var objJson = JSON.parse(localStorage.getItem("agency"));
			if (!objJson){
				limpaStorageAgency();
				var objJson = JSON.parse(localStorage.getItem("agency"));
			};
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

	$('#agencyInclusao').bind('click', function () {
    	localStorage.agencyExistente = "false";
    });

    function fechaModalAgency (field) {
    	$("#agencyModal").modal('hide');
    	$('#agencyName').attr("disabled", false);
    	
    	$("#agencyName").val("");
    	$("#agencyNameConsult").val("");
    	$("#agencyCellPhone").val("");
    	$("#agencyPhone").val("");
    	$("#agencyEmail").val("");
    	
    	rest_obterAgencyAll(carregaAgencies);
    };

    function carregaLocalStorageAgency (data, tipo) {
    localStorage.setItem("agency", JSON.stringify(data));
    localStorage.agencyExistente = "true";
};

function carregaInclusaoAgency(data) { 	   	
	localStorage.agencyExistente = "false";
};    

function limpaStorageAgency () {
	
	var data  = JSON.parse(
			'{' +
				'"documento" : ' + 
				  '{' +
				    '"name" : "",' +
				    '"nameConsult" : "",' +
				    '"cellPhone" : "",' +
				    '"phone" : "",' +
				    '"email" : ""' +
				  '}' +
			'}'
	);

	localStorage.setItem("agency", JSON.stringify(data));
};		
