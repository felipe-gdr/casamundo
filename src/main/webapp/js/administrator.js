
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
		rest_atualizaTable(JSON.parse(localStorage.getItem("table")), atualizacaoCampoEfetuada, atualizacaoCampoNaoEfetuada);
		
	};		
