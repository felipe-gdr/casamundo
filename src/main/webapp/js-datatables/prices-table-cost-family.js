
    
    /* Formatting function for row details - modify as you need */
	function formatTableCostFamily ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaTableCostFamily (objJson) {

		var breakpointDefinition = {
			tablet : 1024,
			phone : 480
		};
		/* BASIC datatables*/

		var responsiveHelper_price_table_cost_family_list = undefined;
	     
		/* price_table list  */
	    var price_table_cost_family = $('#price_table_cost_family_list').DataTable({
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
				if (!responsiveHelper_price_table_cost_family_list) {
					responsiveHelper_price_table_cost_family_list = new ResponsiveDatatablesHelper($('#price_table_cost_family_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_price_table_cost_family_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_price_table_cost_family_list.respond();
			},		
			"columns": [
			            { "data": "interval", "width": "35%" },
			            { "data": "family", "width": "25%" },
			            { "data": "value", "width": "15%" }
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
	    $('#price_table_cost_family_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = price_table_cost_family.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatTableCostFamily(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#price_table_cost_family_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	price_table_cost_family
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    price_table_cost_family.clear();
	    
	    localStorage.setItem("priceTableCost", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("priceTableCost"));
        $.each(objJson, function (i, price_table) {
        	if (price_table.type == "family"){
	        	price_table_cost_family.row.add( {
	    	    	"interval": "<a id='" + price_table._id + "' href='#priceCostFamilyModal' data-toggle='modal'  data-id='" + price_table._id + "' >" +
									"<span class='hide'>" + (separaAnoMesDia(price_table.from)) +  "</span>" +
									"<span>From: " + (separaDataMes(price_table.from, "/")) +  "</span>" +
									"<span> To: " + (separaDataMes(price_table.to, "/")) +  "</span>" +
								"</a>",
	                'family':'<small class="text-muted">' + price_table.nameVendor + '</small>',
				    'type':'<small class="text-muted">' + price_table.type + '</small>',
				    'value':'<small class="text-muted">' + price_table.value + '</small>'
	    	    }).draw( false );
	    	    $('#' + price_table._id).off('click');
	    	    $('#' + price_table._id).on('click',function(){
	    			$("#priceCostFamilyId").val(price_table._id);
	    			$("#priceCostMainIdPriceTable").val(price_table.idPriceTable);
	    			$("#familyFrom").val(price_table.from);
	    			$("#familyTo").val(price_table.to);
	    			$("#familyType").val(price_table.type);
	    			$("#familyId").val(price_table.idVendor);
	    			$("#familyValue").val(price_table.value);
	    			localStorage.priceCostFamilyExistente = "true";
	    	    });
        	};
        });
	};
