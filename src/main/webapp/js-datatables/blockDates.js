	/**
     * 			adendo a lista blockDates
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    
    /* Formatting function for row details - modify as you need */
	function formatBlockDate ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table taobjFamilyble-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaBlockDate (objFamily, roomNumber) {
		
		$("#familyNameBlockDate").html(objFamily.documento.familyName);
		
		var responsiveHelper_blockDates_list = undefined;
	     
		/* blockDates list  */
	    var blockDates_table = $('#blockDate_list').DataTable({
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
				if (!responsiveHelper_blockDates_list) {
					responsiveHelper_blockDates_list = new ResponsiveDatatablesHelper($('#blockDate_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_blockDates_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_blockDates_list.respond();
			},		
			"columns": [
			            { "data": "start" },
			            { "data": "end" },
			            { "data": "room" },
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
	    $('#blockDates_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = blockDates_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatBlockDate(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#blockDates_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	blockDates_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    blockDates_table.clear();
	    
        if (objFamily.documento.rooms){
        	$.each(objFamily.documento.rooms, function (i, objRoom) {
                if (objRoom.blockDates){
				    $.each(objRoom.blockDates, function (i, blockDates) {
			        	blockDates_table.row.add( {
			        		'start':'<small class="text-muted">' + separaDataMes(blockDates.start, "-") + '</small>',
			                'end':'<small class="text-muted">' + separaDataMes(blockDates.end, "-") + '</small>',
			                'room':'<small class="text-muted">' + objRoom.number + '</small>',
			                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >' +
			                		'Action <span class="caret"></span></button>' + 
			                		'<ul id="listBlockDate" class="dropdown-menu">' + 
		                				'<li data-process="delete" data-start"' + blockDates.start + '"><a>Delete</a></li>' +
		                			'</ul></div>'
			    	    }).draw( false );
			        });
                };
        	});
        };
	};
