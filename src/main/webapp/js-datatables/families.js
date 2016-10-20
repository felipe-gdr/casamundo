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
	rest_obterFamiliesAll(carregaLocalStorageFamilies, semAcao, localStorage.usuarioCity);

	/* Formatting function for row details - modify as you need */
	function formatFamily ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
	};
	function carregaLocalStorageFamilies (objJson) {

		localStorage.setItem("families", JSON.stringify(objJson));

        /* BASIC datatables*/

    	var responsiveHelper_families_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};
        
    	/* student list  */
        var family_table = $('#families_list').DataTable({
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
    			if (!responsiveHelper_families_list) {
    				responsiveHelper_families_list = new ResponsiveDatatablesHelper($('#families_list'), breakpointDefinition);
    			}
    		},
    		"rowCallback" : function(nRow) {
    			responsiveHelper_families_list.createExpandIcon(nRow);
    		},
    		"drawCallback" : function(oSettings) {
    			responsiveHelper_families_list.respond();
    		},		
    		"columns": [
    		            {
    		                "class":          'details-control',
    		                "orderable":      false,
    		                "data":           null,
    		                "defaultContent": ''
    		            },
    		            { "data": "family" },
    		            { "data": "address" },
    		            { "data": "addressInfo" },
    		            { "data": "rooms" },
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
        var objJson = JSON.parse(localStorage.getItem("families"));
        $.each(objJson, function (i, family) {
        	family_table.row.add( {
    	    	"family": "<a href='family.html?familyName=" + family.familyName + "'>" +
    	    			"<span>Family Name:" + family.familyName +  "</span><br>" +
    	    			"<span>Type:" + family.type +  "</span><br>" +
    	    			"<span>Contact:" + family.contact.firstName +  " " + family.contact.lastName + "</span><br>" +
    	    			"<small class='text-muted'><i>Gender: " + family.contact.gender + "<i></small><br>" +
    	    			"<small class='text-muted'><i>Ocuppation: " + family.contact.ocuppation + "<i></small><br>" +
    	    			"<small class='text-muted'><i>Phone: " + family.contact.phoneNumber +  "<i></small><br>" + 
    	    			"<small class='text-muted'><i>Cel Phone: " + family.contact.mobilePhoneNumber +  "<i></small><br>" +
    	    			"<small class='text-muted'><i>Work Phone: " + family.contact.workPhoneNumber +  "<i></small><br>" +
    	    			"<small class='text-muted'><i>Mail: " + family.contact.email +  "<i></small><br></a>",
                "address":"<small class='text-muted'>Street:" + family.address.street + " - " + family.address.number + "</small><br>" +
                		"<small class='text-muted'>City:" + family.address.city + " State - " + family.address.state + "</small><br>" +
                		"<small class='text-muted'>Postal Code:" + family.address.postalCode + "</small>",
                "addressInfo":"<small class='text-muted'>Main Intersection:" + family.address.mainIntersection + "</small><br>" + 
                		"<small class='text-muted'>Subway Station - nearest:" + family.address.nearestSubwayStation + " walking time:" + family.address.walkingTimeSubwayStation + "</small><br>" +
                		"<small class='text-muted'>Bus Stop - nearest:" + family.address.nearestBusStop + " walking time:" + family.address.walkingTimeBusStation + "</small><br>",
                "rooms":"<small class='text-muted'>Numbers:" + family.numbersBedroom + "</small><br>" +
                		"<small class='text-muted'>Available for students:" + family.numbersStudentsBedroom + "</small><br>" +
                		"<small class='text-muted'>Private washroom:" + family.numberPrivateWashroom +  "</small><br>",
                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button><ul class="dropdown-menu"><li><a  data-toggle="modal" data-target="#accommodation">Change</a></li></ul></div>'
    	    }).draw( false );
        });
    	// Add event listener for opening and closing details
        $('#families_list tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = family_table.row( tr );
     
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( formatFamily(row.data()) ).show();
                tr.addClass('shown');
            }
        });
        
        // Apply the filter
        $("#families_list thead th input[type=text]").on( 'keyup change', function () {
        	
        	family_table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
                
        } );
        /* end trip list */   
        
};
	