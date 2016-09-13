
    
    /* Formatting function for row details - modify as you need */
	function formatTableValueMain ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaTableValueMain (objJson) {

		var breakpointDefinition = {
			tablet : 1024,
			phone : 480
		};

		/* BASIC datatables*/

		var responsiveHelper_price_table_values_main_list = undefined;
	     
		/* price_table list  */
	    var price_table_values_main = $('#price_table_values_main_list').DataTable({
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
				if (!responsiveHelper_price_table_values_main_list) {
					responsiveHelper_price_table_values_main_list = new ResponsiveDatatablesHelper($('#price_table_values_main_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_price_table_values_main_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_price_table_values_main_list.respond();
			},		
			"columns": [
			            { "data": "interval", "width": "38%" },
			            { "data": "localization", "width": "28%" },
			            { "data": "gross", "width": "17%" },
			            { "data": "net", "width": "17%" },
			            ],
	        "responsive": true,
	        "charset" : "UTF-8",
	        "bDestroy": true,
	        "iDisplayLength": 15,
	        "order": [[0, 'desc']],
	        "fnDrawCallback": function( oSettings ) {
		       runAllCharts()
		    }
		
	    });
		// Add event listener for opening and closing details
	    $('#price_table_values_main_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = price_table_values_main.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatTableValueMain(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#price_table_values_main_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	price_table_values_main
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    price_table_values_main.clear();
	    
	    localStorage.setItem("priceTableValue", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("priceTableValue"));
        $.each(objJson, function (i, price_table) {
        	if (price_table.type == "main"){
	        	price_table_values_main.row.add( {
	    	    	"interval": "<a id='" + price_table._id + "' href='#priceValueMainModal' data-toggle='modal'  data-id='" + price_table._id + "' >" +
	    	    					"<span class='hide'>" + (separaAnoMesDia(price_table.from)) +  "</span>" +
	    	    					"<span>From: " + (separaDataMes(price_table.from, "/")) +  "</span><br>" +
	    	    					"<span>To: " + (separaDataMes(price_table.to, "/")) +  "</span>" +
	    	    				"</a>",
	                'localization':'<small class="text-muted">' + price_table.destination + '</small>',
	                'gross':'<small class="text-muted">' + price_table.gross + '</small>',
	                'net':'<small class="text-muted">' + price_table.net + '</small>'
	    	    }).draw( false );
	    		// Add event listener for opening and closing details
	    	    $('#' + price_table._id).off('click');
	    	    $('#' + price_table._id).on('click',function(){
	    			$("#priceValueMainId").val(price_table._id);
	    			$("#priceValueMainIdPriceTable").val(price_table.idPriceTable);
	    			$("#mainFrom").val(price_table.from);
	    			$("#mainTo").val(price_table.to);
	    			$("#mainDestination").val(price_table.destination);
	    			$("#mainGross").val(price_table.gross);
	    			$("#mainNet").val(price_table.net);
	    			localStorage.priceValueMainExistente = "true";
	    	    });
        	};
        });
	};
