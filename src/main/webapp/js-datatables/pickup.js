	/**
     * 			adendo a lista pickup
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    /**
	 * 				obter os dados
	 */
	rest_obterPickupAll(carregaPickups, semAcao, "all");

    
    /* Formatting function for row details - modify as you need */
	function formatPickup ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaPickups (objJson) {
		/* BASIC datatables*/

		var responsiveHelper_pickup_list = undefined;
	     
		/* pickup list  */
	    var pickup_table = $('#pickup_list').DataTable({
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
				if (!responsiveHelper_pickup_list) {
					responsiveHelper_pickup_list = new ResponsiveDatatablesHelper($('#pickup_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_pickup_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_pickup_list.respond();
			},		
			"columns": [
			            { "data": "name" },
			            { "data": "destination" },
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
	    $('#pickup_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = pickup_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatPickup(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#pickup_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	pickup_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    pickup_table.clear();
	    
	    localStorage.setItem("pickups", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("pickups"));
        $.each(objJson, function (i, pickup) {
        	pickup_table.row.add( {
    	    	'name': '<a id="pickup' + i + '"  data-toggle="modal" data-target="#pickupModal">' + pickup.name + '</a>',
                'destination':'<small class="text-muted">' + pickup.destination + '</small>'
    	    }).draw( false );
        	$('#pickup' + i).off('click');
            $('#pickup' + i).on('click', function () {
            	$('#pickupId').val(pickup._id);
            	$("#pickupName").val(pickup.name);
            	$("#pickupDestination").val(pickup.destination);
            	$("#pickup-payment_financialInstitution").val(pickup.payment.financialInstitution);
            	$("#pickup-payment_bankNumber").val(pickup.payment.bankNumber);
            	$("#pickup-payment_branchNumber").val(pickup.payment.branchNumber);
            	$("#pickup-payment_accountNumber").val(pickup.payment.accountNumber);
            	localStorage.pickupExistente = "true";
            	rest_obterPickup(pickup.name, carregaLocalStoragePickup, carregaInclusaoPickup, "alteracao");
            });
        });
	};
