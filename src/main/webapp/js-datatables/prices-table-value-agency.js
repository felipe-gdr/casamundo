
    
    /* Formatting function for row details - modify as you need */
	function formatTableValueAgency ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaTableValueAgency (objJson) {

		var breakpointDefinition = {
			tablet : 1024,
			phone : 480
		};
		/* BASIC datatables*/

		var responsiveHelper_price_table_values_agency_list = undefined;
	     
		/* price_table list  */
	    var price_table_values_agency = $('#price_table_values_agency_list').DataTable({
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
				if (!responsiveHelper_price_table_values_agency_list) {
					responsiveHelper_price_table_values_agency_list = new ResponsiveDatatablesHelper($('#price_table_values_agency_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_price_table_values_agency_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_price_table_values_agency_list.respond();
			},		
			"columns": [
			            { "data": "interval", "width": "30%" },
			            { "data": "agency", "width": "20%" },
			            { "data": "localization", "width": "20%" },
			            { "data": "gross", "width": "15%" },
			            { "data": "net", "width": "15%" },
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
	    $('#price_table_values_agency_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = price_table_values_agency.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatTableValueAgency(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#price_table_values_agency_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	price_table_values_agency
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    price_table_values_agency.clear();
	    
	    localStorage.setItem("priceTableValue", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("priceTableValue"));
        $.each(objJson, function (i, price_table) {
        	if (price_table.type == "agency"){
	        	price_table_values_agency.row.add( {
	    	    	"interval": "<a id='" + price_table._id + "' href='#priceValueMainModal' data-toggle='modal'  data-id='" + price_table._id + "' >" +
									"<span class='hide'>" + (separaAnoMesDia(price_table.from)) +  "</span>" +
									"<span>From: " + (separaDataMes(price_table.from, "/")) +  "</span><br>" +
									"<span>To: " + (separaDataMes(price_table.to, "/")) +  "</span>" +
								"</a>",
	                'agency':'<small class="text-muted">' + price_table.agency + '</small>',
				    'localization':'<small class="text-muted">' + price_table.destination + '</small>',
				    'gross':'<small class="text-muted">' + price_table.gross + '</small>',
				    'net':'<small class="text-muted">' + price_table.net + '</small>'
	    	    }).draw( false );
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
