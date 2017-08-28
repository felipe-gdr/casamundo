	/**
     * 			adendo a lista consultants
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    
    /* Formatting function for row details - modify as you need */
	function formatConsultantsSchool ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaConsultantsSchool (objJson) {
		/* BASIC datatables*/

		var responsiveHelper_school_consultants_list = undefined;
	     
		/* consultants list  */
	    var consultants_table = $('#school_consultants_list').DataTable({
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
				if (!responsiveHelper_school_consultants_list) {
					responsiveHelper_school_consultants_list = new ResponsiveDatatablesHelper($('#school_consultants_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_school_consultants_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_school_consultants_list.respond();
			},		
			"columns": [
			            { "data": "name" },
			            { "data": "phone" },
			            { "data": "celPhone" },
			            { "data": "email" },
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
	    $('#school_consultants_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = consultants_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatConsultantsSchool(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#school_consultants_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	consultants_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    $('#school_consultants_list tbody > tr').remove();
	    
        $.each(objJson, function (i, consultants) {
        	consultants_table.row.add( {
    	    	'name': '<a id="consultants' + i + '"  data-toggle="modal" data-target="#schoolConsultModal">' + consultants.name + '</a>',
                'phone':'<small class="text-muted">' + consultants.phone + '</small>',
                'celPhone':'<small class="text-muted">' + consultants.celPhone + '</small>',
                'email':'<small class="text-muted">' + consultants.email + '</small>',
    	    }).draw( false );
            $('#consultants' + i).bind('click', function () {
            	$("#schoolConsultName").val(consultants.name);
            	$('#schoolConsultName').attr("disabled", true);
            	$("#schoolConsultPhone").val(consultants.phone);
            	$("#schoolConsultCelPhone").val(consultants.celPhone);
            	$("#schoolConsultEmail").val(consultants.email);
            	localStorage.consultExistente = "true";
            });
        });
	};
