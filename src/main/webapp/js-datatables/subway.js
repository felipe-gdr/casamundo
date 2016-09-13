	/**
     * 			adendo a lista subway
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    /**
	 * 				obter os dados
	 */
	rest_obterSubwayAll(carregaSubways, semAcao, "all");

    
    /* Formatting function for row details - modify as you need */
	function formatSubway ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaSubways (objJson) {
		/* BASIC datatables*/

		var responsiveHelper_subway_list = undefined;
	     
		/* subway list  */
	    var subway_table = $('#subway_list').DataTable({
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
				if (!responsiveHelper_subway_list) {
					responsiveHelper_subway_list = new ResponsiveDatatablesHelper($('#subway_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_subway_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_subway_list.respond();
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
	    $('#subway_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = subway_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatSubway(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#subway_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	subway_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    subway_table.clear();
	    
	    localStorage.setItem("subways", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("subways"));
        $.each(objJson, function (i, subway) {
        	subway_table.row.add( {
    	    	'name': '<a id="subway' + i + '"  data-toggle="modal" data-target="#subwayModal">' + subway.name + '</a>',
                'destination':'<small class="text-muted">' + subway.destination + '</small>',
                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >' +
                		'Action <span class="caret"></span></button>' + 
                			'<ul class="dropdown-menu">' +
                			'</div>'
    	    }).draw( false );
            $('#subway' + i).bind('click', function () {
            	$('#subwayName').attr("disabled", true);
            	$("#subwayName").val(subway.name);
            	$("#subwayDestination").val(subway.destination);
            	localStorage.subwayExistente = "true";
            	rest_obterSubway(subway.name, carregaLocalStorageSubway, carregaInclusaoSubway, "alteracao");
            });
        });
	};