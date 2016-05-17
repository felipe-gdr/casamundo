	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);


	/**
	 * 				obter os dados
	 */
	rest_obterFamiliesAll(carregaLocalStorageFamilies, "", "Homestay");


    // set filters
	$('#filter_single').click(function() {
		console.log ("hasclass - " + $( "#filter_single" ).hasClass( "btn-primary"))
		if ($( "#filter_single" ).hasClass( "btn-primary")){
			$('#filter_single').removeClass( "btn-primary" );
			$('#filter_single').addClass( "btn-success" );
			$('#filter_single_check').removeClass( "hide" );
		}else{
			$('#filter_single').removeClass( "btn-success" );
			$('#filter_single').addClass( "btn-primary" );
			$('#filter_single_check').addClass( "hide" );						
		}
	});
	$('#filter_alergies').click(function() {
		console.log ("hasclass - " + $( "#filter_alergies" ).hasClass( "btn-primary"))
		if ($( "#filter_alergies" ).hasClass( "btn-primary")){
			$('#filter_alergies').removeClass( "btn-primary" );
			$('#filter_alergies').addClass( "btn-success" );
			$('#filter_alergies_check').removeClass( "hide" );
		}else{
			$('#filter_alergies').removeClass( "btn-success" );
			$('#filter_alergies').addClass( "btn-primary" );
			$('#filter_alergies_check').addClass( "hide" );						
		}
	});
	$('#filter_smoke').click(function() {
		console.log ("hasclass - " + $( "#filter_smoke" ).hasClass( "btn-primary"))
		if ($( "#filter_smoke" ).hasClass( "btn-primary")){
			$('#filter_smoke').removeClass( "btn-primary" );
			$('#filter_smoke').addClass( "btn-success" );
			$('#filter_smoke_check').removeClass( "hide" );
		}else{
			$('#filter_smoke').removeClass( "btn-success" );
			$('#filter_smoke').addClass( "btn-primary" );
			$('#filter_smoke_check').addClass( "hide" );						
		}
	});
	$('#filter_vegetarian').click(function() {
		console.log ("hasclass - " + $( "#filter_vegetarian" ).hasClass( "btn-primary"))
		if ($( "#filter_vegetarian" ).hasClass( "btn-primary")){
			$('#filter_vegetarian').removeClass( "btn-primary" );
			$('#filter_vegetarian').addClass( "btn-success" );
			$('#filter_vegetarian_check').removeClass( "hide" );
		}else{
			$('#filter_vegetarian').removeClass( "btn-success" );
			$('#filter_vegetarian').addClass( "btn-primary" );
			$('#filter_vegetarian_check').addClass( "hide" );						
		}
	});
	$('#filter_pets').click(function() {
		console.log ("hasclass - " + $( "#filter_pets" ).hasClass( "btn-primary"))
		if ($( "#filter_pets" ).hasClass( "btn-primary")){
			$('#filter_pets').removeClass( "btn-primary" );
			$('#filter_pets').addClass( "btn-success" );
			$('#filter_pets_check').removeClass( "hide" );
		}else{
			$('#filter_pets').removeClass( "btn-success" );
			$('#filter_pets').addClass( "btn-primary" );
			$('#filter_pets_check').addClass( "hide" );						
		}
	});
	$('#filter_halla').click(function() {
		console.log ("hasclass - " + $( "#filter_halla" ).hasClass( "btn-primary"))
		if ($( "#filter_halla" ).hasClass( "btn-primary")){
			$('#filter_halla').removeClass( "btn-primary" );
			$('#filter_halla').addClass( "btn-success" );
			$('#filter_halla_check').removeClass( "hide" );
		}else{
			$('#filter_halla').removeClass( "btn-success" );
			$('#filter_halla').addClass( "btn-primary" );
			$('#filter_halla_check').addClass( "hide" );						
		}
	});

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

    	var responsiveHelper_trip_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};
         
    	/* accommodation list  */
        var accommodation_table = $('#trip_list').DataTable({
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
    			if (!responsiveHelper_trip_list) {
    				responsiveHelper_trip_list = new ResponsiveDatatablesHelper($('#trip_list'), breakpointDefinition);
    			}
    		},
    		"rowCallback" : function(nRow) {
    			responsiveHelper_trip_list.createExpandIcon(nRow);
    		},
    		"drawCallback" : function(oSettings) {
    			responsiveHelper_trip_list.respond();
    		},		
    		"columns": [
    		            {
    		                "class":          'details-control',
    		                "orderable":      false,
    		                "data":           null,
    		                "defaultContent": ''
    		            },
			            { "data": "name" },
			            { "data": "start" },
			            { "data": "end" },
			            { "data": "status" },
			            { "data": "gender" },
			            { "data": "smoke" },
			            { "data": "agency" },
			            { "data": "school" },
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
        var objJson = JSON.parse(localStorage.getItem("students"));
        $.each(objJson, function (i, student) {
        	var age = calculaIdade(separaData(student.birthDay, "/"));
        	switch (student.trip.status) {
        	case "Available":
        		statusCollor = "label-avaliable"
                break;
            case "Confirmed":
            	statusCollor = "label-confirmed"
                break;
            case "Placement offered":
            	statusCollor = "label-placement-offered"
                break;
            case "Terminated":
            	statusCollor = "label-terminated"
                break;
            default: 
        		statusCollor = "label-avaliable"
            };	    

            switch (student.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	    

            switch (student.trip.status) {
        	case "Available":
        		statusCollor = "label-available"
                break;
            case "Confirmed":
            	statusCollor = "label-confirmed"
                break;
            case "Placement offered":
        		statusCollor = "label-placement-offered"
       			break;
            default: 
        		genderCollor = "label-primary"
            };	    
        	switch (student.trip.smoke) {
        	case "Yes":
        		smokeCollor = "label-warning"
                break;
            case "No":
            	smokeCollor = "label-success"
                break;
            default: 
        		smokeCollor = "label-primary"
            };	 
            if (student.trip.medical){
            	medicalCollor = "label-warning";
            	medicalText = student.trip.medical;
            }else{
            	medicalCollor = "label-success";
            	medicalText = "Don´t have medical concerns";
            };
        	occupancyCollor = "label-success";
        	occupancyText = "";
            if (student.trip.occupancy){
            	occupancyText = student.trip.occupancy;
	            if (student.trip.occupancy == "Single"){
	            	occupancyCollor = "label-success";
	            }else{
	            	occupancyCollor = "label-warning";
	            };
            };
            if (student.trip.liveDogs == "Yes"){
            	liveDogsCollor = "label-success";
            	liveDogsText = "Live with dogs";
            }else{
            	liveDogsCollor = "label-warning";
            	liveDogsText = "Don't live with dogs";
            };
            if (student.trip.liveCats == "Yes"){
            	liveCatsCollor = "label-success";
            	liveCatsText = "Live with cats";
            }else{
            	liveCatsCollor = "label-warning";
            	liveCatsText = "Don't live with cats";
            };
        	switch (student.gender) {
        	case "Male":
        		genderCollor = "label-male"
                break;
            case "Female":
            	genderCollor = "label-female"
                break;
            default: 
        		genderCollor = "label-male"
            };	    
            var specialDiet = "";
            if (student.trip.specialDiet[0]){
			    $.each(student.trip.specialDiet, function (i, value) {
			    	specialDiet = String(specialDiet) + "<span class='label label-warning'>" + value + " </span>";
			    });
            }else{
            	specialDiet = "<span class='label label-success'>No food restrictions</span>"
            };
		    var accommodation = "Not yet acomodate";

        	accommodation_table.row.add( {
                "name": "<div class='login-info'><a href='student.html?mail=" + student.mail + "&typePage=accommodation'>" +
//                		"<img src='img/avatars/photo_2.png' alt='me' class='online' />" +
                		"<span>" + student.firstName +  " " + student.lastName + "</span><i class='fa fa-angle-down'></i></a></span></div><br>" +
                		"<small class='text-muted'><i>Age: " + age + "<i></small><br>" +
                		"<small class='text-muted'><i>Phone: " + student.phone +  "<i></small><br>" +
                		"<small class='text-muted'><i>Cel Phone: " + student.celPhone +  "<i></small><br>" +
                		"<small class='text-muted'><i>Email: " + student.mail + "<i></small><br>",
                "start": "<small class='hide'>" + converteAnoMesDia(student.trip.start) + "</small><small class='text-muted'>" + separaData(student.trip.start, "/") + "</small>",
                "end": "<small class='hide'>" + converteAnoMesDia(student.trip.end) + "</small><small class='text-muted'>" + separaData(student.trip.end, "/") + "</small>",
                "status": "<span class='label " + statusCollor + "'>" + student.trip.status + "</span>",
    	    	"gender":"<small class='label " + genderCollor + " '>" + student.gender + "</small>",
                "smoke": "<span class='label " + smokeCollor + "'>" + student.trip.smoke + "</span>",
    	    	"agency":student.agency.name + "<br>" +
				"<small class='text-muted'>Consult: " + student.agency.nameConsult + "</small><br>" +
				"<small class='text-muted'>Cel Phone: " + student.agency.celPhone + "</small><br>" +
				"<small class='text-muted'>Phone: " + student.agency.phone + "</small><br>" +
				"<small class='text-muted'>Mail: " + student.agency.email + "</small><br>",
				"school":student.school.name + "<br>" +
				"<small class='text-muted'>Contact: " + student.school.nameContact + "</small><br>" +
				"<small class='text-muted'>Cel Phone: " + student.school.celPhone + "</small><br>" +
				"<small class='text-muted'>Phone: " + student.school.phone + "</small><br>" +
				"<small class='text-muted'>Mail: " + student.school.email + "</small><br>",
                "filters": "<span class='label " + occupancyCollor + "'>" + occupancyText + " </span>" +
                		specialDiet +
                		"<span class='label " + liveDogsCollor + "'>" + liveDogsText + "</span>" +
                		"<span class='label " + liveCatsCollor + "'>" + liveCatsText + "</span>" +
                		"<span class='label " + medicalCollor + "'>" + medicalText + "</span>",
                "accommodation": "<span class='label label-warning'>" + accommodation + "</span><br>",
                "comments": "<small class='text-muted'><i>" + student.trip.comments + "<i></small>",
                "actions": "<div class='btn-group'><button class='btn btn-primary btn-xs dropdown-toggle' data-toggle='dropdown' >Action <span class='caret'></span></button><ul class='dropdown-menu'><li><a  data-toggle='modal' data-target='#accommodation'>Looking for accommodation</a></li></ul></div>"
    	    }).draw( false );
        });
    	// Add event listener for opening and closing details
        $('#trip_list tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = accommodation_table.row( tr );
     
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( formatAccommodation(row.data()) ).show();
                tr.addClass('shown');
            }
        });
        
        // Apply the filter
        $("#trip_list thead th input[type=text]").on( 'keyup change', function () {
        	
        	accommodation_table
                .column( $(this).parent().index()+':visible' )
                .search( this.value )
                .draw();
                
        } );
        /* end trip list */   
		/* Formatting function for row details - modify as you need */
		function formatAccommodation ( d ) {
		    // `d` is the original data object for the row
		    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
		        '<tr>'+
		            '<td style="width:100px">Another filters:</td>'+
		            '<td>'+d.filters+'</td>'+
		        '</tr>'+
		        '<tr>'+
		            '<td style="width:100px">Accommodation:</td>'+
		            '<td>'+d.accommodation+'</td>'+
		        '</tr>'+
		        '<tr>'+
		            '<td>Comments:</td>'+
		            '<td>'+d.comments+'</td>'+
		        '</tr>'+
		        '<tr>'+
		            '<td>Action:</td>'+
		            '<td>'+d.actions+'</td>'+
		        '</tr>'+
		    '</table>';
		}

	};
	