	/**
     * 			adendo a lista price_table
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    /**
	 * 				obter os dados
	 */
	rest_obterPriceTableAll(carregaPriceTable, semAcao, null, null, null);

    
    /* Formatting function for row details - modify as you need */
	function formatPriceTable ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaPriceTable (objJson) {
		/* BASIC datatables*/

		var responsiveHelper_price_table_list = undefined;
	     
		/* price_table list  */
	    var price_table_table = $('#price_table_list').DataTable({
	    	//"bFilter": false,
	    	//"bInfo": false,
	    	//"bLengthChange": true,
	    	//"bAutoWidth": true,
	    	//"bPaginate": false,
	    	//"bStateSave": true // saves sort state using localStorage
			"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
					"t"+
					"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
			"preDrawCallback" : function() {
				// Initialize the responsive datatables helper once.
				if (!responsiveHelper_price_table_list) {
					responsiveHelper_price_table_list = new ResponsiveDatatablesHelper($('#price_table_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_price_table_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_price_table_list.respond();
			},		
			"columns": [
			            { "data": "name" },
			            { "data": "descricao" },
			            { "data": "valid" },
			            { "data": "actions" },
			            ],
	        "responsive": true,
	        "charset" : "UTF-8",
	        "bDestroy": true,
	        "iDisplayLength": 15,
	        "order": [[1, 'desc']],
	        "fnDrawCallback": function( oSettings ) {
		       runAllCharts()
		    }
		
	    });
		// Add event listener for opening and closing details
	    $('#price_table_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = price_table_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatPriceTable(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#price_table_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	price_table_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    price_table_table.clear();
	    
	    localStorage.setItem("priceTables", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("priceTables"));
        $.each(objJson, function (i, price_table) {
        	price_table_table.row.add( {
    	    	"name": "<a id='" + price_table.id + "' href='price-table.html?id=" + price_table.id + "'>" +
    	    			"<span>" + price_table.name +  "</span></a>",
                'descricao':'<small class="text-muted">' + price_table.description + '</small>',
                'valid':'<small class="text-muted">' + price_table.valid + '</small>',
                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >' +
                				'Action <span class="caret"></span></button>' + 
                					'<ul id="listPriceTable" class="dropdown-menu">' +
                						"<li'><a id='change" + price_table.id + "' data-process='changeitempricetable' data-id='" + price_table.id + "' data-name='" + price_table.name + "'' data-description='" + price_table.description + "'' data-valid='" + price_table.valid + "'href='#priceModal' data-toggle='modal' >Change</a></li>" +
                					'</ul>' +
                			'</div>'
    	    }).draw( false );
    		// Add event listener for opening and closing details
    	    $('#change' + price_table.id).off('click');
    	    $('#change' + price_table.id).on('click',function(){
    			$("#priceId").val($(this).attr('data-id'));
    			$("#priceName").val($(this).attr('data-name'));
    			$("#priceDescription").val($(this).attr('data-description'));
    			if ($(this).attr('data-valid') == "Yes"){
    				$("#priceValid").prop("checked", true)
    			};
    			localStorage.priceTableExistente = "true";
    	    });
        });
	};
