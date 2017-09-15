	/**
     * 			adendo a lista agency
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    /**
	 * 				obter os dados
	 */
	rest_obterAgencyAll(carregaAgencies);

    
    /* Formatting function for row details - modify as you need */
	function formatAgency ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaAgencies (objJson) {
		/* BASIC datatables*/

		var responsiveHelper_agency_list = undefined;
	     
		/* agency list  */
	    var agency_table = $('#agency_list').DataTable({
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
				if (!responsiveHelper_agency_list) {
					responsiveHelper_agency_list = new ResponsiveDatatablesHelper($('#agency_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_agency_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_agency_list.respond();
			},		
			"columns": [
			            { "data": "name" },
			            { "data": "agencyPhone" },
			            { "data": "agencyEmail" },
			            { "data": "agencySigla" },
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
	    $('#agency_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = agency_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatAgency(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#agency_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	agency_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    agency_table.clear();
	    
	    localStorage.setItem("agencies", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("agencies"));
        $.each(objJson, function (i, agency) {
        	var dadosAgency = " data-agencyId='" + agency._id + "' data-agencyName='" + agency.name + "' data-agencyEmail='" + agency.agencyEmail + "' data-agencyPhone='" + agency.agencyPhone + "' data-agencySigla='" + agency.agencySigla + "' data-agencyLogo='" + agency.agencyLogo + "'";
        	agency_table.row.add( {
    	    	'name': '<a href="#" data-toggle="modal" data-target="#agencyModal" ' + dadosAgency + '>' + agency.name + '</a>',
                'agencyPhone':'<small class="text-muted">' + agency.agencyPhone + '</small>',
                'agencyEmail':'<small class="text-muted">' + agency.agencyEmail + '</small>',
                'agencySigla':'<small class="text-muted">' + agency.agencySigla + '</small>'
    	    }).draw( false );
        });
    	$("#agency_list a").off('click');
		$("#agency_list").delegate( "a", "click", function() {
			$("#agencyName").val($(this).attr('data-agencyName'));
        	$('#agencyName').attr("disabled", true);
        	$("#agencyAgencyPhone").val($(this).attr('data-agencyPhone'));
        	$("#agencyAgencyEmail").val($(this).attr('data-agencyEmail'));
        	$("#agencyAgencySigla").val($(this).attr('data-agencySigla'));
        	$("#agencyLogo").val($(this).attr('data-agencyLogo'));
        	localStorage.agencyExistente = "true";
        	rest_obterAgency($(this).attr('data-agencyName'), carregaLocalStorageAgency, carregaInclusaoAgency, "alteracao");
		});

	
	};
