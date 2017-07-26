	// ** setar menu
	$("#menuAdministrator_li").addClass("active");
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#tables-form").validate({
		// Rules for form validation
		rules : {
		},

		// Messages for form validation
		messages : {
		},
		// form submition
		submitHandler : function(form) {
			$.each(form
			    , function (i, field) {
					setValueTable (field.id)
			});
			rest_atualizarDocumento (JSON.parse(localStorage.getItem("table")), "table", semAcao, semAcao);
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

	//
	//  **** tratar os itens das tabelas
	//
	$('.item-table').on('itemRemoved', function(event) {
		setValueTable (event.currentTarget.id)
	})
		
    // custom toolbar
    $("div.toolbar").html('<div class="text-right"></div>');

    
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
		rest_atualizarDocumento (JSON.parse(localStorage.getItem("table")), "table", semAcao, semAcao);
		
	};		
