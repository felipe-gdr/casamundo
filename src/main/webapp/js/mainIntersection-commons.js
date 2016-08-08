
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#mainIntersectionModal-form").validate({
		// Rules for form validation
		rules : {
			name : {
				required : true,
			},
			destination : {
				required : true,
			},
		},

		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter mainIntersection name',
			},
			destination : {
				required : 'Please enter mainIntersection destination',
			},
		},
		// form submition
		submitHandler : function(form) {
			limpaStorageMainIntersection();
			var objJson = JSON.parse(localStorage.getItem("mainIntersection"))
			$.each(form
			    , function (i, field) {
				if (field.value){
			        objJson.documento[field.name] = field.value;
				};
			});
			localStorage.setItem("mainIntersection", JSON.stringify(objJson));
			if (localStorage.mainIntersectionExistente == "true"){
				rest_atualizaMainIntersection(JSON.parse(localStorage.getItem("mainIntersection")), fechaModalMainIntersection, semAcao);
			}else{
				rest_incluiMainIntersection(JSON.parse(localStorage.getItem("mainIntersection")), fechaModalMainIntersection, semAcao);
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

	$('#mainIntersectionInclusao').bind('click', function () {
    	localStorage.mainIntersectionExistente = "false";
    });
	
	$("#mainIntersectionModal").on('hidden.bs.modal', function(event){
    	$('#mainIntersectionName').attr("disabled", false);
    	$("#mainIntersectionName").val("");
    	$("#mainIntersectionDestination").val("");
	 });

    function fechaModalMainIntersection (field) {
    	$("#mainIntersectionModal").modal('hide');
    	$('#mainIntersectionName').attr("disabled", false);
    	
    	$("#mainIntersectionName").val("");
    	$("#mainIntersectionDestination").val("");
    	
    	rest_obterMainIntersectionAll(carregaMainIntersections, semAcao, "all");
    };

    function carregaLocalStorageMainIntersection (data, tipo) {
    	localStorage.setItem("mainIntersection", JSON.stringify(data));
    	localStorage.mainIntersectionExistente = "true";
    	
    };

function carregaInclusaoMainIntersection(data) { 	   	
	localStorage.mainIntersectionExistente = "false";
};    

function limpaStorageMainIntersection () {
	
	var data  =
	{ 
		documento :   
		  { 
		    name : "", 
		    destination : ""
		  } 
	};
	localStorage.setItem("mainIntersection", JSON.stringify(data));
};		
