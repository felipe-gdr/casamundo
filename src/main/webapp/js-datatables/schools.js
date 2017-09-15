	/**
     * 			adendo a lista school
     */

	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};

    /**
	 * 				obter os dados
	 */
	rest_obterSchoolAll(carregaSchools);

    
    /* Formatting function for row details - modify as you need */
	function formatSchool ( d ) {
	    // `d` is the original data object for the row
/*	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
*/	};
	
	function carregaSchools (objJson) {
		/* BASIC datatables*/

		var responsiveHelper_school_list = undefined;
	     
		/* school list  */
	    var school_table = $('#school_list').DataTable({
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
				if (!responsiveHelper_school_list) {
					responsiveHelper_school_list = new ResponsiveDatatablesHelper($('#school_list'), breakpointDefinition);
				}
			},
			"rowCallback" : function(nRow) {
				responsiveHelper_school_list.createExpandIcon(nRow);
			},
			"drawCallback" : function(oSettings) {
				responsiveHelper_school_list.respond();
			},		
			"columns": [
			            { "data": "name" },
			            { "data": "sigla" },
			            { "data": "celPhone" },
			            { "data": "phone" },
			            { "data": "email" },
			            ],
	        "responsive": true,
	        "charset" : "UTF-8",
	        "bDestroy": true,
	        "iDisplayLength": 15,
	        "order": [[3, 'desc']],
	        "fnDrawCallback": function( oSettings ) {
		       runAllCharts()
		    }
		
	    });
		// Add event listener for opening and closing details
	    $('#school_list tbody').on('click', 'td.details-control', function () {
	        var tr = $(this).closest('tr');
	        var row = school_table.row( tr );
	 
	        if ( row.child.isShown() ) {
	            // This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	        else {
	            // Open this row
	            row.child( formatSchool(row.data()) ).show();
	            tr.addClass('shown');
	        }
	    });
	    
	    // Apply the filter
	    $("#school_list thead th input[type=text]").on( 'keyup change', function () {
	    	
	    	school_table
	            .column( $(this).parent().index()+':visible' )
	            .search( this.value )
	            .draw();
	            
	    } );

	    school_table.clear();
	    
	    localStorage.setItem("schools", JSON.stringify(objJson));
        var objJson = JSON.parse(localStorage.getItem("schools"));
        $.each(objJson, function (i, school) {
        	var dadosSchool = 
        		" data-schoollId='" + school._id +
        		"' data-schoolName='" + school.name +
        		"' data-schoolCelPhone='" + school.celPhone +
        		"' data-schoolPhone='" + school.phone +
        		"' data-schoolEmail='" + school.email +
        		"' data-schoolAddress='" + school.address +
        		"' data-schoolSigla='" + school.sigla +
        		"' data-schoolLogo='" + school.logo +
        		"' data-schoolLatitude='" + school.latitude +
        		"' data-schoolLongitude='" + school.longitude + "' ";
        	school_table.row.add( {
    	    	'name': '<a href="#" id="school' + i + '"  data-toggle="modal" data-target="#schoolModal"' + dadosSchool + '>' + school.name + '</a>',
                'sigla':'<small class="text-muted">' + school.sigla + '</small>',
                'celPhone':'<small class="text-muted">' + school.celPhone + '</small>',
                'phone':'<small class="text-muted">' + school.phone + '</small>',
                'email':'<small class="text-muted">' + school.email + '</small>'
    	    }).draw( false );
        });
		$( "#school_list" ).delegate( "a", "click", function() {
        	$("#schoolName").val($(this).attr('data-schoolName'));
        	$('#schoolName').attr("disabled", true);
        	$("#schoolCelPhone").val($(this).attr('data-schoolCelPhone'));
        	$("#schoolPhone").val($(this).attr('data-schoolPhone'));
        	$("#schoolEmail").val($(this).attr('data-schoolEmail'));
        	$("#schoolAddress").val($(this).attr('data-schoolAddress'));
        	$("#schoolSigla").val($(this).attr('data-schoolSigla'));
        	$("#schoolLogo").val($(this).attr('data-schoolLogo'));
        	$("#schoolLatitude").val($(this).attr('data-schoolLatitude'));
        	$("#schoolLongitude").val($(this).attr('data-schoolLongitude'));
        	localStorage.schoolExistente = "true";
        	rest_obterSchool($(this).attr('data-schoolName'), carregaLocalStorageSchool, carregaInclusaoSchool, "alteracao");
		});
	};
