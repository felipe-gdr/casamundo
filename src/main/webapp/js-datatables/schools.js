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
			            { "data": "schoolPhone" },
			            { "data": "schoolEmail" },
			            { "data": "nameContact" },
			            { "data": "celPhone" },
			            { "data": "phone" },
			            { "data": "email" },
			            { "data": "actions" },
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
        	school_table.row.add( {
    	    	'name': '<a id="school' + i + '"  data-toggle="modal" data-target="#schoolModal">' + school.name + '</a>',
                'schoolPhone':'<small class="text-muted">' + school.schoolPhone + '</small>',
                'schoolEmail':'<small class="text-muted">' + school.schoolEmail + '</small>',
                'nameContact':'<small class="text-muted">' + school.nameContact + '</small>',
                'celPhone':'<small class="text-muted">' + school.celPhone + '</small>',
                'phone':'<small class="text-muted">' + school.phone + '</small>',
                'email':'<small class="text-muted">' + school.email + '</small>',
                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >' +
                		'Action <span class="caret"></span></button>' + 
                			'<ul class="dropdown-menu">' +
                			'</div>'
    	    }).draw( false );
            $('#school' + i).bind('click', function () {
            	$("#schoolName").val(school.name);
            	$('#schoolName').attr("disabled", true);
            	$("#schoolSchoolPhone").val(school.schoolPhone);
            	$("#schoolSchoolEmail").val(school.schoolEmail);
            	$("#schoolNameContact").val(school.nameContact);
            	$("#schoolCelPhone").val(school.celPhone);
            	$("#schoolPhone").val(school.phone);
            	$("#schoolEmail").val(school.email);
            	$("#schoolAddress").val(school.address);
            	localStorage.schoolExistente = "true";
            	rest_obterSchool(school.name, carregaLocalStorageSchool, carregaInclusaoSchool, "alteracao");
            });
        });
	};
