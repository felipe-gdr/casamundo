
	/**
	 * 		esconde mapa
	 */
	$('.school').addClass("hide");
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
				fieldName = field.name;
				if (fieldName == "destinationSchool"){
					fieldName = "destination";
				} 
				if (field.value){
			        objJson.documento[fieldName] = field.value;
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
    
	$('#schoolAddress').bind('blur', function () {
    	getMapCoordinate($('#schoolAddress').val(), localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
    });
	
	 $("#schoolModal").on('shown.bs.modal', function(event){
		 if ($('#schoolAddress').val()){
			 getMapCoordinate($('#schoolAddress').val(), localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
		 };
	 });
	 
	 function carregaMapa (results) {
		$('#schoolAddress').val(results[0].formatted_address);
		$('.school').removeClass("hide");
		generate_map_7(results[0].geometry.location.lat(), results[0].geometry.location.lng());	
		var objJson = JSON.parse(localStorage.getItem("school"));
		objJson.documento.latitude = results[0].geometry.location.lat();
		objJson.documento.longitude = results[0].geometry.location.lng();
		localStorage.setItem("school", JSON.stringify(objJson));
	};
	
	function enderecoComErro (data) {
		$('.school').addClass("hide");		
	};
	
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
    	$("#schoolAddress").val("");
    	
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
				    '"address" : ""' +
				    '"latitude" : ""' +
				    '"longitude" : ""' +
				    '"destination" : ""' +
				  '}' +
			'}'
	);

	localStorage.setItem("school", JSON.stringify(data));
};		
