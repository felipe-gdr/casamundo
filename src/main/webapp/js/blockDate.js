
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#blockDateModal-form").validate({
		// Rules for form validation
		rules : {
			startBlockDate : {
				required : true,
			},
			endBlockDate : {
				required : true,
			},
			roomBlockDate : {
				required : true,
			},
		},

		// Messages for form validation
		messages : {
			startBlockDate : {
				required : "Please enter start date",
			},
			endBlockDate : {
				required : "Please enter end date",
			},
			roomBlockDate : {
				required : "Please, choose the room",
			}
		},
		// form submition
		submitHandler : function(form) {
			limpaStorageConsultAgency();
			var objJson = JSON.parse(localStorage.getItem("blockDate"));
			$.each(form
			    , function (i, field) {
				if (field.value){
			        objJson[field.name] = field.value;
				};
			});
			localStorage.setItem("blockDate", JSON.stringify(objJson));
			if (localStorage.blockDateExistente == "true"){
				atualizaBlockDate (objJson);
			}else{
				incluiBlockDate (objJson);
			};
			$("#blockDateModal").modal('hide');
			carregaBlockDate (JSON.parse(localStorage.blockDate));
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

	$('#blockDateInclusao').bind('click', function () {
    	localStorage.blockDateExistente = "false";
    });
	
	 $("#blockDateModal").on('hidden.bs.modal', function(event){
		$("#blockDateStart").val("");
		$("#blockDateEnd").val("");
		$("#blockRoom").val("");
	 });
	
    function fechaModalBlockDate () {
    	$("#blockDateModal").modal('hide');
    	$("#blockDateName").val("");
    	$("#blockDateStart").val("");
    	$("#blockDateCelEnd").val("");
    	$("#blockDateRoom").val("");
    	var objJson = JSON.parse(localStorage.getItem("family"));
    	carregaBlockDate (objJson.documento.consultants);
    };
	
	function limpaStorageBlockDate () {
		
		var data  = 
				{
				    "start" : "",
				    "end" : "",
				    "room" : ""
				};
	
		localStorage.setItem("blockDate", JSON.stringify(data));
	};		
	
	function atualizaBlockDate (newBlockDate) {
		var objJson = JSON.parse(localStorage.blockDates);
        $.each(objJson, function (i, oldBlockDate) {
        	if (oldBlockDate.start == newBlockDate.start){
        		oldBlockDate.end = newBlockDate.end;
        		oldBlockDate.room = newBlockDate.room;
        		return;
        	};
        });
        localStorage.blockDates = JSON.stringify(objJson);
	};
	
	function incluiBlockDate (consult) {
		var objJson = JSON.parse(localStorage.blockDates);
		objJson.push(consult);
		localStorage.blockDates = JSON.stringify(objJson);
	};