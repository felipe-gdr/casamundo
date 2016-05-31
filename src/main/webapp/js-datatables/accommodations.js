	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
	 * 				obter os dados
	 */
	rest_obterStudentsAll(carregaLocalStorageStudents, "", "Homestay");


    /* Formatting function for row details - modify as you need */
	function formatStudent ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	            '<td>Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
	};
	function carregaLocalStorageStudents (objJson) {

		localStorage.setItem("students", JSON.stringify(objJson));

    	/* BASIC datatables*/

    	var responsiveHelper_accommodations_list = undefined;
    	
    	var breakpointDefinition = {
    		tablet : 1024,
    		phone : 480
    	};
         
    	/* accommodation list  */
        var accommodation_table = $('#accommodations_list').DataTable({
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
    			if (!responsiveHelper_accommodations_list) {
    				responsiveHelper_accommodations_list = new ResponsiveDatatablesHelper($('#accommodations_list'), breakpointDefinition);
    			}
    		},
    		"rowCallback" : function(nRow) {
    			responsiveHelper_accommodations_list.createExpandIcon(nRow);
    		},
    		"drawCallback" : function(oSettings) {
    			responsiveHelper_accommodations_list.respond();
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
        		smokeText = "Smoke"
                break;
            case "No":
            	smokeCollor = "label-success"
            	smokeText = "Don't smoke"
                break;
            default: 
        		smokeCollor = "label-primary"
        		smokeText = ""
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
    	    	"name": "<a href='student.html?mail=" + student.mail + "&typePage=accommodation'>" +
			    			"<span>" + student.firstName +  " " + student.lastName + "</span><br>" + 
			    			"<small class='text-muted'><i>Age: " + age + "<i></small><br>" + 
			    			"<small class='text-muted'><i>Phone: " + student.phone +  "<i></small><br>" + 
			    			"<small class='text-muted'><i>Cel Phone: " + student.phone +  "<i></small><br>" + 
			    			"<small class='text-muted'><i>Mail: " + student.mail +  "<i></small><br></a>",
                "start": "<small class='hide'>" + converteAnoMesDia(student.trip.start) + "</small><small class='text-muted'>" + separaData(student.trip.start, "/") + "</small>",
                "end": "<small class='hide'>" + converteAnoMesDia(student.trip.end) + "</small><small class='text-muted'>" + separaData(student.trip.end, "/") + "</small>",
                "status": "<span class='label " + statusCollor + "'>" + student.trip.status + "</span>",
    	    	"gender":"<small class='label " + genderCollor + " '>" + student.gender + "</small>",
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
                		"<span class='label " + smokeCollor + "'>" + smokeText + "</span>" +
                		"<span class='label " + medicalCollor + "'>" + medicalText + "</span>",
                "accommodation": "<span class='label label-warning'>" + accommodation + "</span><br>",
                "comments": "<small class='text-muted'><i>" + student.trip.comments + "<i></small>",
                "actions": "<div class='btn-group'><button class='btn btn-primary btn-xs dropdown-toggle' data-toggle='dropdown' >Action <span class='caret'></span></button><ul class='dropdown-menu'><li><a  data-toggle='modal' data-target='#accommodation'>Looking for accommodation</a></li></ul></div>"
    	    }).draw( false );
        });
    	// Add event listener for opening and closing details
        $('#accommodations_list tbody').on('click', 'td.details-control', function () {
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
        $("#accommodations_list thead th input[type=text]").on( 'keyup change', function () {
        	
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
		            '<td style="width:100px">Filters:</td>'+
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
	