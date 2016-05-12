
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#schoolModal-form").validate({
		// Rules for form validation
		rules : {
			name : {
				required : true,
			},
			nameContact : {
				required : true,
			},
			celPhone : {
				required : true,
			},
			phone : {
				required : true,
			},
			email : {
				required : true,
				email : true
			},
			schoolEmail : {
				required : true,
				email : true
			},
		},

		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter school name',
			},
			nameContact : {
				required : 'Please enter school contact name',
			},
			celPhone : {
				required : 'Please enter contact cel phone',
			},
			phone : {
				required : 'Please enter contact phone',
			},
			email : {
				required : 'Please enter contact email',
				email : 'Please enter a VALID email address'
			},
			SchoolEmail : {
				required : 'Please enter school email',
				email : 'Please enter a VALID email address'
			},
		},
		// form submition
		submitHandler : function(form) {
			var objJson = JSON.parse(localStorage.getItem("school"));
			if (!objJson){
				limpaStorageSchool();
				var objJson = JSON.parse(localStorage.getItem("school"));
			};
			$.each(form
			    , function (i, field) {
				if (field.value){
			        objJson.documento[field.name] = field.value;
				};
			});
			localStorage.setItem("school", JSON.stringify(objJson));
			if (localStorage.schoolExistente == "true"){
				rest_atualizaSchool(JSON.parse(localStorage.getItem("school")), fechaModalSchool, semAcao);
			}else{
				rest_incluiSchool(JSON.parse(localStorage.getItem("school")), fechaModalSchool, semAcao);
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

	$('#schoolInclusao').bind('click', function () {
    	localStorage.schoolExistente = "false";
    });
    function fechaModalSchool (field) {
    	$("#schoolModal").modal('hide');
    	$('#schoolName').attr("disabled", false);
    	
    	$("#schoolName").val("");
    	$("#schoolSchoolPhone").val("");
    	$("#schoolSchoolEmail").val("");
    	$("#schoolNameContact").val("");
    	$("#schoolCelPhone").val("");
    	$("#schoolPhone").val("");
    	$("#schoolEmail").val("");
    	
    	rest_obterSchoolAll(carregaSchools);
    };

function carregaLocalStorageSchool (data, tipo) {
    localStorage.setItem("school", JSON.stringify(data));
    localStorage.schoolExistente = "true";
};

function carregaInclusaoSchool(data) { 	   	
	localStorage.schoolExistente = "false";
};    

function limpaStorageSchool () {
	
	var data  = JSON.parse(
			'{' +
				'"documento" : ' + 
				  '{' +
				    '"name" : "",' +
				    '"schoolPhone" : "",' +
				    '"schoolEmail" : "",' +
				    '"nameContact" : "",' +
				    '"celPhone" : "",' +
				    '"phone" : "",' +
				    '"email" : ""' +
				  '}' +
			'}'
	);

	localStorage.setItem("school", JSON.stringify(data));
};		
