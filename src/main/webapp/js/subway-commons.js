
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#subwayModal-form").validate({
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
				required : 'Please enter subway name',
			},
			destination : {
				required : 'Please enter subway destination',
			},
		},
		// form submition
		submitHandler : function(form) {
			limpaStorageSubway();
			var objJson = JSON.parse(localStorage.getItem("subway"))
			$.each(form
			    , function (i, field) {
				if (field.value){
			        objJson.documento[field.name] = field.value;
				};
			});
			localStorage.setItem("subway", JSON.stringify(objJson));
			if (localStorage.subwayExistente == "true"){
				rest_atualizaSubway(JSON.parse(localStorage.getItem("subway")), fechaModalSubway, semAcao);
			}else{
				rest_incluiSubway(JSON.parse(localStorage.getItem("subway")), fechaModalSubway, semAcao);
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

	$('#subwayInclusao').bind('click', function () {
    	localStorage.subwayExistente = "false";
    });
	
	$("#subwayModal").on('hidden.bs.modal', function(event){
    	$('#subwayName').attr("disabled", false);
    	$("#subwayName").val("");
    	$("#subwayDestination").val("");
	 });

    function fechaModalSubway (field) {
    	$("#subwayModal").modal('hide');
    	$('#subwayName').attr("disabled", false);
    	
    	$("#subwayName").val("");
    	$("#subwayDestination").val("");
    	
    	rest_obterSubwayAll(carregaSubways, semAcao, "all");
    };

    function carregaLocalStorageSubway (data, tipo) {
    	localStorage.setItem("subway", JSON.stringify(data));
    	localStorage.subwayExistente = "true";
    	
    };

function carregaInclusaoSubway(data) { 	   	
	localStorage.subwayExistente = "false";
};    

function limpaStorageSubway () {
	
	var data  =
	{ 
		documento :   
		  { 
		    name : "", 
		    destination : ""
		  } 
	};
	localStorage.setItem("subway", JSON.stringify(data));
};		
