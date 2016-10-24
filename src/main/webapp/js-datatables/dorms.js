	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
     * 			adendo a lista student
     */

	/**
	 * 				obter os dados
	 */
	rest_obterDormsAll(carregaLocalStorageDorms, semAcao, localStorage.usuarioCity);
	/* Formatting function for row details - modify as you need */
	function formatDorm ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
	};
	function carregaLocalStorageDorms (objJson) {

		localStorage.setItem("dorms", JSON.stringify(objJson));

    	/* BASIC datatables*/

    	var responsiveHelper_dorms_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};
         
    	/* student list  */
        var dorm_table = $('#dorms_list').DataTable({
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
    			if (!responsiveHelper_dorms_list) {
    				responsiveHelper_dorms_list = new ResponsiveDatatablesHelper($('#dorms_list'), breakpointDefinition);
    			}
    		},
    		"rowCallback" : function(nRow) {
    			responsiveHelper_dorms_list.createExpandIcon(nRow);
    		},
    		"drawCallback" : function(oSettings) {
    			responsiveHelper_dorms_list.respond();
    		},		
    		"columns": [
    		            {
    		                "class":          'details-control',
    		                "orderable":      false,
    		                "data":           null,
    		                "defaultContent": ''
    		            },
    		            { "data": "dorm" , "width": "15%" },
    		            { "data": "contact" , "width": "20%" },
    		            { "data": "address" , "width": "25%" },
    		            { "data": "addressInfo" , "width": "20%" },
    		            { "data": "units" , "width": "20%" },
    		            ],
            "responsive": true,
            "charset" : "UTF-8",
            "bDestroy": true,
            "iDisplayLength": 30,
            "order": [[1, 'asc']],
            "fnDrawCallback": function( oSettings ) {
    	       runAllCharts()
    	    }
    	
        });
        var objJson = JSON.parse(localStorage.getItem("dorms"));
        $.each(objJson, function (i, dorm) {
        	var units = "";
            if (dorm.units){
        	    $.each(dorm.units, function (i, unit) {
        	    	units = units + 
        	    		"<span class='text text-table'>" + unit.name + "</span><br>" +
        	    		"<span class='text text-muted'>" + unit.description + "</span><br>";
        	    });
            };        

        	dorm_table.row.add( {
    	    	"dorm": 
    	    			"<a href='dorm.html?id=" + dorm.id + "'>" +
    	    			"<span>" + dorm.name +  "</span><br>" +
    	    			"<small class='text-muted'>" + dorm.description +  "</small><br></a>",
    	    	"contact": 
    	    			"<small>" + dorm.contact.firstName +  " " + dorm.contact.lastName + "</small><br>" +
    	    			"<small class='text-muted'><i>Phone: " + dorm.contact.phoneNumber +  "<i></small><br>" + 
    	    			"<small class='text-muted'><i>Cel: " + dorm.contact.mobilePhoneNumber +  "<i></small><br>" +
    	    			"<small class='text-muted'><i>Mail: " + dorm.contact.email +  "<i></small><br>",
                "address":
                		"<small class='text-muted'>" + dorm.address.street + "</small><br>" +
                		"<small class='text-muted'>Key door:" + dorm.keyDoor + "</small>",
                "addressInfo":
                		"<small class='text-muted'>Main Intersection:" + dorm.address.mainIntersection + "</small><br>" + 
                		"<small class='text-muted'>Nearest subway station:" + dorm.address.nearestSubwayStation + "</small><br>" +
                		"<small class='text-muted'>Time to subway station:" + dorm.address.timeSubwayStation + "</small><br>" +
                		"<small class='text-muted'>Subway station:" + dorm.address.subwayStation + "</small><br>",
                "units":
                		units,
                'actions': 
                		'<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button><ul class="dropdown-menu"><li><a  data-toggle="modal" data-target="#accommodation">Change</a></li></ul></div>'
    	    }).draw( false );
        });
    	// Add event listener for opening and closing details
        $('#dorms_list tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = dorm_table.row( tr );
     
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( formatDorm(row.data()) ).show();
                tr.addClass('shown');
            }
        });
        
        // Apply the filter
        $("#dorms_list thead th input[type=text]").on( 'keyup change', function () {
        	
        	dorm_table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
                
        } );
        /* end trip list */   
};
	