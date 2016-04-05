	/**
	 * 		carrega selects
	 */

		
	var table = JSON.parse(localStorage.getItem("table"));
	
    $.each(table.documento.nationality
		    , function (i, optionValue) {
    			$("#nationality").append( $(option(optionValue)));
		    });
	function option(value) {
    	return '<option value="' + value + '" selected="selected">' + value +'</option>';
    };

