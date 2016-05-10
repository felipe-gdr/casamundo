
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

	//
	//  **** tratar os itens das tabelas
	//
	$('.item-table').on('itemRemoved', function(event) {
		setValueTable (event.currentTarget.id)
	})
		
    // custom toolbar
    $("div.toolbar").html('<div class="text-right"><img src="img/logo.png" alt="SmartAdmin" style="width: 111px; margin-top: 3px; margin-right: 10px;"></div>');

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
    
    function putValueTable (field) {
		
		var objJson = JSON.parse(localStorage.getItem("table"));

		$.each(objJson.documento[field]
			    , function (i, data) {
			$('#' + field).tagsinput('add', { "value": data , "text": data});
		});
	};				

	function setValueTable (field) {
		
		var objJson = JSON.parse(localStorage.getItem("table"));
	
		var test = $("#" + field).tagsinput('items');
		if (objJson.documento[field]){
	        objJson.documento[field] = $("#" + field).tagsinput('items');
		};

		localStorage.setItem("table", JSON.stringify(objJson));
		rest_atualizaTable(JSON.parse(localStorage.getItem("table")), atualizacaoCampoEfetuada, atualizacaoCampoNaoEfetuada);
		
	};		
