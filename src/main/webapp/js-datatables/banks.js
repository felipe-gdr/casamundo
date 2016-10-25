	/**
     * 			adendo a lista bank
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    /**
	 * 				obter os dados
	 */
	rest_obterBankAll(carregaBanks);

    
    /* Formatting function for row details - modify as you need */
	function formatBank ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaBanks (objJson) {
		/* BASIC datatables*/

		var responsiveHelper_bank_list = undefined;
	     
		/* bank list  */
	    var bank_table = $('#bank_list').DataTable({
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
				if (!responsiveHelper_bank_list) {
					responsiveHelper_bank_list = new ResponsiveDatatablesHelper($('#bank_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_bank_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_bank_list.respond();
			},		
			"columns": [
			            { "data": "name" },
			            { "data": "number" },
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
	    $('#bank_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = bank_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatBank(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#bank_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	bank_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    bank_table.clear();
	    
	    localStorage.setItem("banks", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("banks"));
        $.each(objJson, function (i, bank) {
        	bank_table.row.add( {
    	    	'name': '<a id="bank' + i + '"  data-toggle="modal" data-target="#bankModal">' + bank.name + '</a>',
                'number':'<small class="text-muted">' + bank.number + '</small>'
    	    }).draw( false );
            $('#bank' + i).bind('click', function () {
            	$('#bankName').attr("disabled", true);
            	$("#bankName").val(bank.name);
            	$("#bankNumber").val(bank.number);
            	localStorage.bankExistente = "true";
            	rest_obterBank(bank.name, carregaLocalStorageBank, carregaInclusaoBank, "alteracao");
            });
        });
	};
