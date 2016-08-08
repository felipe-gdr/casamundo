	/**
     * 			adendo a lista mainIntersection
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    /**
	 * 				obter os dados
	 */
	rest_obterMainIntersectionAll(carregaMainIntersections, semAcao, "all");

    
    /* Formatting function for row details - modify as you need */
	function formatMainIntersection ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaMainIntersections (objJson) {
		/* BASIC datatables*/

		var responsiveHelper_mainIntersection_list = undefined;
	     
		/* mainIntersection list  */
	    var mainIntersection_table = $('#mainIntersection_list').DataTable({
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
				if (!responsiveHelper_mainIntersection_list) {
					responsiveHelper_mainIntersection_list = new ResponsiveDatatablesHelper($('#mainIntersection_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_mainIntersection_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_mainIntersection_list.respond();
			},		
			"columns": [
			            { "data": "name" },
			            { "data": "destination" },
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
	    $('#mainIntersection_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = mainIntersection_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatMainIntersection(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#mainIntersection_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	mainIntersection_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    mainIntersection_table.clear();
	    
	    localStorage.setItem("mainIntersections", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("mainIntersections"));
        $.each(objJson, function (i, mainIntersection) {
        	mainIntersection_table.row.add( {
    	    	'name': '<a id="mainIntersection' + i + '"  data-toggle="modal" data-target="#mainIntersectionModal">' + mainIntersection.name + '</a>',
                'destination':'<small class="text-muted">' + mainIntersection.destination + '</small>',
                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >' +
                		'Action <span class="caret"></span></button>' + 
                			'<ul class="dropdown-menu">' +
                			'</div>'
    	    }).draw( false );
            $('#mainIntersection' + i).bind('click', function () {
            	$('#mainIntersectionName').attr("disabled", true);
            	$("#mainIntersectionName").val(mainIntersection.name);
            	$("#mainIntersectionDestination").val(mainIntersection.destination);
            	localStorage.mainIntersectionExistente = "true";
            	rest_obterMainIntersection(mainIntersection.name, carregaLocalStorageMainIntersection, carregaInclusaoMainIntersection, "alteracao");
            });
        });
	};
