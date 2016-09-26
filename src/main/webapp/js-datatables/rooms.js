	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var id = parametrosDaUrl.split("=")[1];

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
	if (id){
		rest_obterRoomsAll(id, carregaLocalStorageRooms, semAcao, localStorage.usuarioCity);
	};

	/* BASIC datatables*/

	var responsiveHelper_rooms_list = undefined;
	
	var breakpointDefinition = {
		tablet : 1024,
		phone : 480
	};
     
	/* student list  */
    var room_table = $('#rooms_list').DataTable({
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
			if (!responsiveHelper_rooms_list) {
				responsiveHelper_rooms_list = new ResponsiveDatatablesHelper($('#rooms_list'), breakpointDefinition);
			}
		},
		"rowCallback" : function(nRow) {
			responsiveHelper_rooms_list.createExpandIcon(nRow);
		},
		"drawCallback" : function(oSettings) {
			responsiveHelper_rooms_list.respond();
		},		
		"columns": [
		            {
		                "class":          'details-control',
		                "orderable":      false,
		                "data":           null,
		                "defaultContent": ''
		            },
		            { "data": "room" , "width": "20%" },
		            { "data": "description" , "width": "30%" },
		            { "data": "beds" , "width": "50%" },
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
    var objJson = JSON.parse(localStorage.getItem("rooms"));
    $.each(objJson, function (i, room) {
    	var beds = "";
        if (room.beds){
    	    $.each(room.beds, function (i, bed) {
            	var student = "";
            	if (bed.firstName){
            		student = bed.firstName;
            	}
            	if (bed.firstName){
            		student = student + " " + bed.lastName;
            	}
            	var email = "";
            	if (bed.email){
            		email = " - " + bed.email;
            	}
            	var datesTrip = "";
            	if (bed.trip){
                	if (bed.trip.start){
                		datesTrip = separaDataMes(bed.trip.start, "-");
                	};
	            	if (bed.trip.end){
	            		datesTrip = datesTrip + " - " + separaDataMes(bed.trip.end, "-");
	            	};
            	};
            	studentData = "";
            	if (student != ""){
            		studentData =
            		"<span class='text text-muted'>" + student + "</span>" +
    	    		"<span class='text text-muted'>" + email + "</span><br>" +
    	    		"<span class='text text-muted'>" + datesTrip + "</span><br>";            			
            	};
    	    	beds = beds + 
    	    		"<span class='text text-table'>" + bed.type + "</span><br>" +
    	    		"<span class='text text-muted'>" + bed.description + "</span><br>" +
    	    		studentData;
    	    });
        };        
    	room_table.row.add( {
	    	"room": 
	    			"<a href='room_input.html?id=" + room.id + "'>" +
	    			"<span>" + room.name +  "</span><br>" +
	    			"<small class='text-muted'>Unit: " + room.unit +  "</small><br></a>",
            "description":
            	"<small class='text-muted'>" + room.description +  "</small><br></a>",
            "beds":
            		beds,
            'actions': 
            		'<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button><ul class="dropdown-menu"><li><a  data-toggle="modal" data-target="#accommodation">Change</a></li></ul></div>'
	    }).draw( false );
    });
	// Add event listener for opening and closing details
    $('#rooms_list tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = room_table.row( tr );
 
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
    $("#rooms_list thead th input[type=text]").on( 'keyup change', function () {
    	
    	room_table
            .column( $(this).parent().index()+':visible' )
            .search( this.value )
            .draw();
            
    } );
    /* end trip list */   
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
	function carregaLocalStorageRooms (objJson) {
        localStorage.setItem("rooms", JSON.stringify(objJson));
};
	