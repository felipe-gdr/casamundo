	/**
	 * 		carrega tabelas
	 */
	rest_listaOneKey("table", null, null, true, carregaTabelas, obtencaoNaoEfetuada, var1, var2, var3)

	/**
	 * 				obter os dados
	 */

	rest_obterStudentsAll(carregaAccommodationsStudents, semAcao, localStorage.usuarioCity, null, email );


	function carregaAccommodationsStudents (objJson) {

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
            var statusCollor = statusCollorDef (student.trip.status);
            var genderCollor = genderCollorDef (student.gender);
            var smokeCollor = smokeCollorDef (student.trip.smoke);
            var smokeText = smokeTextDef (student.trip.smoke);
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
            var genderCollor = genderCollorDef (student.gender);
            var specialDiet = "";
            if (student.trip.specialDiet[0]){
			    $.each(student.trip.specialDiet, function (i, value) {
			    	specialDiet = String(specialDiet) + "<span class='label label-warning'>" + value + " </span>";
			    });
            }else{
            	specialDiet = "<span class='label label-success'>No food restrictions</span>"
            };
		    
	        var actions = "";
	        var actualTrip = student.actualTrip;
	        var emailStudent = student.mail;
		    var accommodation = "Not yet acomodate";
	        var familyName = "";
	        var typePage = "accommodation";
		    if (student.trip.familyName) {
		        familyName = student.trip.familyName;	
		        accommodation =
		        "<span>" + student.trip.familyName + "</span><br>" +
    			"<span>" + student.familyContact.firstName +  " " + student.familyContact.lastName + "</span><br>" + 
    			"<small class='text-muted'><i>Gender: " + student.familyContact.gender + "<i></small><br>" + 
    			"<small class='text-muted'><i>Phone: " + student.familyContact.phoneNumber +  "<i></small><br>" + 
    			"<small class='text-muted'><i>Cel Phone: " + student.familyContact.mobilePhoneNumber +  "<i></small><br>" + 
    			"<small class='text-muted'><i>Email: " + student.familyContact.email +  "<i></small><br></a>";
		    };
	        var familyName = student.trip.familyName;
	        if (student.trip.status == "Available"){
	        	actions = "<li><a href='student.html?mail=" + student.mail + "&typePage=accommodation'>Looking for accommodation</a></li>";
	        };
	        if (student.trip.status == "Confirmed"){
	        	typePage = "change";
	        	actions = "<li data-process='sendlettertostudent' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#letterToStudent'>Send confirmation letter</a></li>";
	        };
	        if (student.trip.status == "DocsOk"){
	        	typePage = "change";
	        	actions = "<li data-process='studentinhouse' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#offerToFamily'>Student in house</a></li>" +
	        				"<li data-process='cancel' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#offerToFamily'>Cancel></li>"
	        };
	        if (student.trip.status == "InHouse"){
	        	typePage = "change";
	        	actions = "<li data-process='terminate' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#offerToFamily'>Terminated</a></li>" +
	        				"<li data-process='cancel' data-idFamily='" + familyName + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + familyName + "' data-toggle='modal' data-target='#offerToFamily'>Cancel></li>"
	        };

        	accommodation_table.row.add( {
    	    	"name": "<a href='student.html?mail=" + student.mail + "&typePage=" + typePage + "'>" +
			    			"<span>" + student.firstName +  " " + student.lastName + "</span>",
                "start": "<small class='hide'>" + converteAnoMesDia(student.trip.start) + "</small><small class='text-muted'>" + separaData(student.trip.start, "/") + "</small>",
                "end": "<small class='hide'>" + converteAnoMesDia(student.trip.end) + "</small><small class='text-muted'>" + separaData(student.trip.end, "/") + "</small>",
                "status": "<small class='label " + statusCollor + "'>" + student.trip.status + "</small>",
    	    	"gender":"<small class='label " + genderCollor + " '>" + student.gender + "</small>",
    	    	"agency":student.agency.name ,
				"school":student.school.name ,
                "filters": "<span class='label " + occupancyCollor + "'>" + occupancyText + " </span>" +
                		specialDiet +
                		"<span class='label " + liveDogsCollor + "'>" + liveDogsText + "</span>" +
                		"<span class='label " + liveCatsCollor + "'>" + liveCatsText + "</span>" +
                		"<span class='label " + smokeCollor + "'>" + smokeText + "</span>" +
                		"<span class='label " + medicalCollor + "'>" + medicalText + "</span>",
                "accommodation": "<span class='label label-warning'>" + accommodation + "</span><br>",
                "comments": "<small class='text-muted'><i>" + student.trip.comments + "<i></small>",
                'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
    			'<ul id="listFamily" class="dropdown-menu">' +
    				actions +
    			'</ul></div>'
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
	    		$("#listFamily li").on('click',function(){
	    			$('#familyName').html($(this).attr('data-idFamily'));
	    			$('#emailFamily').val($(this).attr('data-emailFamily'));
	    			$('#emailStudent').val($(this).attr('data-emailStudent'));
	    			$('#indexTrip').val($(this).attr('data-indexTrip'));
	    			$('#roomSingle').val($(this).attr('data-roomSingle'));
	    			$('#roomCouple').val($(this).attr('data-roomCouple'));
	    			if ($(this).attr('data-process') == "sendlettertostudent") {
	    				rest_obterFamily($(this).attr('data-idFamily'), carregaTelaFamily, semAcao, "consulta");
	    			};
	    		});
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
	};
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
