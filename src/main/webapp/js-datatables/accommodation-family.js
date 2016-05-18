	/**
	 * 		carrega student
	 */
	var objStudent = JSON.parse(localStorage.getItem("student"));
	/**
	 * 		carrega tabelas
	 */

	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);

	/**
	 * 				obter os dados
	 */
	if (objStudent.documento.trips[objStudent.documento.actualTrip].destination){
		rest_obterFamiliesAll(carregaLocalStorageFamilies, objStudent.documento.trips[objStudent.documento.actualTrip].destination);
	};

    // set filters
	setFilter ("occupancy");
	setFilter ("privateWashroom");
	setFilter ("gender");
	setFilter ("age");
	setFilter ("smoke");
	setFilter ("pets");
	setFilter ("nationality");
	setFilter ("meal");
	setFilter ("vegetarian");
	setFilter ("distance");

	function setFilter (filter) {
		$('#filter_' + filter).click(function() {
			if ($('#filter_' + filter).hasClass( "btn-primary")){
				$('#filter_' + filter).removeClass( "btn-primary" );
				$('#filter_' + filter).addClass( "btn-success" );
				$('#filter_' + filter + '_check').removeClass( "hide" );
			}else{
				$('#filter_' + filter).removeClass( "btn-success" );
				$('#filter_' + filter).addClass( "btn-primary" );
				$('#filter_' + filter + '_check').addClass( "hide" );						
			}
		});
	};
	
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
			            { "data": "occupancy" },
			            { "data": "restrictions" },
			            { "data": "meals" },
			            { "data": "distances" },
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
	    var objJson = JSON.parse(localStorage.getItem("families"));
	    $.each(objJson, function (i, family) {
	    	var age = calculaIdade(separaData(objStudent.documento.birthDay, "/"));
	    	switch (family.acceptSmokeStudent) {
	    	case "Yes":
	    		acceptSmokeCollor = "label-success"
	    		acceptSmokeText = "Accept smoke"
	            break;
	        case "No":
	        	acceptSmokeCollor = "label-warning"
	        	acceptSmokeText = "Don't accept smoke"
	            break;
	        default: 
	        	acceptSmokeCollor = "label-primary"
	        	acceptSmokeText = ""
	        };	 
	    	switch (family.hostAnyNationalityStudent) {
	    	case "Yes":
	    		hostAnyNationalityStudentCollor = "label-success"
	    		hostAnyNationalityStudentText = "Host any nationality"
	            break;
	        case "No":
	        	hostAnyNationalityStudentCollor = "label-warning"
	        	hostAnyNationalityStudentText = "Don't host any nationality"
	            break;
	        default: 
	        	hostAnyNationalityStudentCollor = "label-primary"
	        	hostAnyNationalityStudentSmokeText = ""
	        };	 
	        if (family.havePets == "Yes"){
	        	havePetsCollor = "label-warning";
	        	havePetsText = "Have pets";
	        }else{
	        	havePetsCollor = "label-success";
	        	havePetsText = "Don't have pets";
	        };
	        if (family.hostVegetarianStudent == "Yes"){
	        	hostVegetarianStudentCollor = "label-success";
	        	hostVegetarianStudentText = "Host vegetarian";
	        }else{
	        	hostVegetarianStudentCollor = "label-warning";
	        	hostVegetarianStudentText = "Don't host vegetarian";
	        };
	        if (family.preferGenderStudent){
	        	preferGenderStudentCollor = "label-warning";
	        	preferGenderStudentText = "Prefer gender " + family.preferGenderStudent;
	        }else{
	        	preferGenderStudentCollor = "label-success";
	        	preferGenderStudentText = "Don't mind gender";
	        };
	        if (family.preferAgeStudent){
	        	preferAgeStudentCollor = "label-warning";
	        	preferAgeStudentText = "Prefer age " + family.preferAgeStudent + " years old";
	        }else{
	        	preferAgeStudentCollor = "label-success";
	        	preferAgeStudentText = "Don't mind age student";
	        };
	        var occupancy = "";
	        if (family.rooms[0]){
			    $.each(family.rooms, function (i, room) {
			    	if (room.singleBed){
			    		if (room.singleBed == 1){
			    			literal_1 = "bed"
			    		}else{
			    			literal_1 = "beds"
			    		};
			    		if (room.singleBedAvailable == 0){
			    			availableBedText = "no available single beds"
			    		}else{
				    		if (room.singleBedAvailable == 1){
				    			availableBedText = "available " + room.singleBedAvailable + "bed"
				    		}else{
				    			availableBedText = "available " + room.singleBedAvailable + "beds"
				    		};
			    		};
			    		singleBedText = room.singleBed + " single " + literal_1 + ", " + availableBedText
			    	};
			    	if (room.coupleBed){
			    		if (room.coupleBed == 1){
			    			literal_1 = "bed"
			    		}else{
			    			literal_1 = "beds"
			    		};
			    		if (room.coupleBedAvailable == 0){
			    			availableBedText = "no available couple beds"
			    		}else{
				    		if (room.coupleBedAvailable == 1){
				    			availableBedText = "available " + room.coupleBedAvailable + " bed"
				    		}else{
				    			availableBedText = "available " + room.coupleBedAvailable + " beds"
				    		};
			    		};
			    		coupleBedText = room.coupleBed + " couple " + literal_1 + ", " + availableBedText
			    	};
			    	if (room.privateWashroom){
			    		if (room.privateWashroom == "Yes"){
			    			privateWashroomText = " Have private washroom"
			    		}else{
			    			privateWashroomText = " Dont't have private washroom"
			    		};
			    	};
			    	occupancy = String(occupancy) + "<small class='text-success'><i>Room " + room.number + ":<br> " + 
			    									"<small class='text-info'><i>" + singleBedText + "<i></small><br>" +
			    									"<small class='text-info'><i>"  + coupleBedText + "<i></small><br>" +
			    									"<small class='text-info'><i>"  + privateWashroomText + "<i></small><br>";
			    });
	        };
	        var distances = "<small class='text-muted'><i>subway: 30 minutes<i></small><br>";
	    	family_table.row.add( {
		    	"family":
		    		"<small class='hide'>" + calculaPontuacaoFamilia(family) + "</small>" +
		    		"<a href='family.html?familyName=" + family.familyName + "'>" +
		    			"<span>Family Name:" + family.familyName +  "</span><br>" +
		    			"<span>Type:" + family.type +  "</span><br>" +
		    			"<span>Contact:" + family.contact.firstName +  " " + family.contact.lastName + "</span><br>" +
		    			"<small class='text-muted'><i>Gender: " + family.contact.gender + "<i></small><br>" +
		    			"<small class='text-muted'><i>Ocuppation: " + family.contact.ocuppation + "<i></small><br>" +
		    			"<small class='text-muted'><i>Phone: " + family.contact.phoneNumber +  "<i></small><br>" + 
		    			"<small class='text-muted'><i>Cel Phone: " + family.contact.mobilePhoneNumber +  "<i></small><br>" +
		    			"<small class='text-muted'><i>Work Phone: " + family.contact.workPhoneNumber +  "<i></small><br>" +
		    			"<small class='text-muted'><i>Mail: " + family.contact.email +  "<i></small><br></a>",
		    	"occupancy": occupancy,
	            "restrictions":
		    		"<span class='label " + preferGenderStudentCollor + "'>" + preferGenderStudentText + " </span><br>" +
		    		"<span class='label " + preferAgeStudentCollor + "'>" + preferAgeStudentText + " </span><br>" +
		    		"<span class='label " + acceptSmokeCollor + "'>" + acceptSmokeText + "</span><br>" +
		    		"<span class='label " + havePetsCollor + "'>" + havePetsText + "</span><br>" +
		    		"<span class='label " + hostAnyNationalityStudentCollor + "'>" + hostAnyNationalityStudentText + "</span>",
		    	"meals":
	    				"<span class='label label-warning'>" + family.mealPlan + "</span><br>" +
		    			"<span class='label " + hostVegetarianStudentCollor + "'>" + hostVegetarianStudentText + "</span>",
	            "distances": distances,
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

	function calculaPontuacaoFamilia (family) {
		return 0;
	};
	