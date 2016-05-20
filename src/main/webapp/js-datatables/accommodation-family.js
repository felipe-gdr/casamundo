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
			carregaLocalStorageFamilies (JSON.parse(localStorage.getItem("families")));
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
	        "order": [[1, 'desc']],
	        "fnDrawCallback": function( oSettings ) {
		       runAllCharts()
		    }
		
	    });
    	family_table.clear();
	    var objJson = JSON.parse(localStorage.getItem("families"));
	    $.each(objJson, function (i, family) {
	        getMapDistance(family.address.latitude, family.address.longitude, localStorage.latitudeSchool, localStorage.longitudeSchool, localStorage.mapsDistance, montaLinhaFamilia, montaLinhaFamilia, family_table, family);
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

	function montaLinhaFamilia(results, family_table, family){
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
			    			availableBedText = "available " + room.singleBedAvailable + " bed"
			    		}else{
			    			availableBedText = "available " + room.singleBedAvailable + " beds"
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
        var objStudent = JSON.parse(localStorage.getItem("student"));
        if (results){
        	var distances = "<small class='text-muted'><i>" + results.rows[0].elements[0].duration.text +"<i></small><br>";
        };
        family_table.row.add( {
	    	"family":
	    		"<small class=''>" + calculaPontuacaoFamilia(family,JSON.parse(localStorage.getItem("student"))) + "</small>" +
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
		
	};
	
	function calculaPontuacaoFamilia (family, student) {
		var pesoHasRoom = 1;
		var pesoDontHasRoom = -1;
		var pesoHasPrivateWashroom = 1;
		var pesoDontHasPrivateWashroom = -1;
		var pesoPreferGender = 1;
		var pesoDontPreferGender = -1;
		var pesoPreferAge = 1;
		var pesoDontPreferAge = -1;
		var pesoAcceptSmoke = 1;
		var pesoDontAcceptSmoke = -1;
		var pesoHasPets = 1;
		var pesoDontHasPets = -1;
		var pesoHasAcceptAnyNationality = 1;
		var pesoDontAcceptAnyNationality = -1;
		var pesoHasMeal = 1;
		var pesoDontHasMeal = -1;
		var pesoHasVegetarian = 1;
		var pesoDontHasVegetarian = -1;
		var pesoDistance = -1;
		var points = 0;
		var actualTrip = student.documento.actualTrip;

		if ($('#filter_occupancy').hasClass( "btn-success")){
			var hasRoom = false;
			var hasPrivateWashroom = false;
			if (student.documento.trips[actualTrip].occupancy){
			    $.each(family.rooms, function (i, room) {
			    	if (student.documento.trips[actualTrip].occupancy == "Single"){
			    		if (room.singleBedAvailable > 0){
			    			hasRoom = true;	
			    			if ($('#filter_privateWashroom').hasClass( "btn-success")){
			    				if (student.documento.trips[actualTrip].privateWashroom){
				    				if (student.documento.trips[actualTrip].privateWashroom == "Yes"){
							    		if (room.privateWashroom == "Yes"){
							    			hasPrivateWashroom = true;	
							    		};				    					
				    				};
			    				};			
			    			};
			    		};
			    	};
			    	if (student.documento.trips[actualTrip].occupancy == "Couple"){
			    		if (room.coupleBedAvailable > 0){
			    			hasRoom = true;	
			    			if ($('#filter_privateWashroom').hasClass( "btn-success")){
			    				if (student.documento.trips[actualTrip].privateWashroom){
				    				if (student.documento.trips[actualTrip].privateWashroom == "Yes"){
							    		if (room.privateWashroom == "Yes"){
							    			hasPrivateWashroom = true;	
							    		};				    					
				    				};
			    				};			
			    			};
			    		};
			    	};
			    });
			};
			if (hasRoom){
				points = parseInt(points) + 1 + parseInt(pesoHasRoom)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasRoom)
			};
			if (hasPrivateWashroom){
				points = parseInt(points) + 1 + parseInt(pesoHasPrivateWashroom)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasPrivateWashroom)
			};
		}else{
			var hasPrivateWashroom = false;
			if ($('#filter_privateWashroom').hasClass( "btn-success")){
				if (student.documento.trips[actualTrip].privateWashroom){
				    $.each(family.rooms, function (i, room) {
	    				if (student.documento.trips[actualTrip].privateWashroom == "Yes"){
				    		if (room.privateWashroom == "Yes"){
				    			hasPrivateWashroom = true;	
				    		};				    					
	    				};
				    });
				};
			};
			if (hasPrivateWashroom){
				points = parseInt(points) + 1 + parseInt(pesoPreferGender)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasPrivateWashroom)
			};			
		};
		if ($('#filter_gender').hasClass( "btn-success")){
			var preferGenderOk = false;
    		if (family.preferGenderStudent){
    			if (student.documento.gender == family.preferGenderStudent){
    				preferGenderOk = true;
    			};
    		}else{
    			preferGenderOk = true;
    		};
			if (preferGenderOk){
				points = parseInt(points) + 1 + parseInt(pesoPreferGender)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontPreferGender)
			};			
		};
		if ($('#filter_age').hasClass( "btn-success")){
			var preferAgeOk = false;
    		if (family.preferAgeStudent){
    			var age = calculaIdade(separaData(objStudent.documento.birthDay, "/"));
    			if (family.preferAgeStudent == "15-20"){
    				if (age > 15 && age < 21 ){
    					preferAgeOk = true;
    				};
    			}else{
        			if (family.preferAgeStudent == "20-30"){
        				if (age > 19 && age < 31 ){
        					preferAgeOk = true;
        				};
        			}else{
        				if (family.preferAgeStudent == "30+"){	
            				if (age > 29 ){
            					preferAgeOk = true;
            				};
        				};
        			};
    			};
    		}else{
    			preferAgeOk = true;
    		};
			if (preferAgeOk){
				points = parseInt(points) + 1 + parseInt(pesoPreferAge)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontPreferAge)
			};			
		};

		if ($('#filter_smoke').hasClass( "btn-success")){
			var acceptSmoke = false;
    		if (family.acceptSmokeStudent){
    			if (family.acceptSmokeStudent == "No"){
    				if (student.documento.trips[actualTrip].smoke == "No" ){
    					acceptSmoke = true;
    				}
        		}else{
        			acceptSmoke = true;
        		}
    		}else{
    			acceptSmoke = true;
    		};
			if (acceptSmoke){
				points = parseInt(points) + 1 + parseInt(pesoAcceptSmoke)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontAcceptSmoke)
			};			
		};

		if ($('#filter_pets').hasClass( "btn-success")){
			var hasPets = false;
    		if (family.havePets){
    			if (family.havePets == "Yes"){
    				if (student.documento.trips[actualTrip].liveDogs == "Yes" && student.documento.trips[actualTrip].liveCats == "Yes" ){
    					hasPets = true;
    				}
        		}else{
        			hasPets = true;
        		}
    		}else{
    			hasPets = true;
    		};
			if (hasPets){
				points = parseInt(points) + 1 + parseInt(pesoHasPets)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasPets)
			};			
		};

		if ($('#filter_vegetarian').hasClass( "btn-success")){
			var hasVegetarian = false;
			if (student.documento.trips[actualTrip].specialDiet){
			    $.each(student.documento.trips[actualTrip].specialDiet, function (i, diet) {
			    	if (diet == "Vegetarian"){
			    		if (family.hostVegetarianStudent){
			    			if (family.hostVegetarianStudent == "Yes"){
			    				hasVegetarian = true;
			    			}
			    		}
			    	}
			    });
			}else{
				hasVegetarian = true;
    		};
			if (hasVegetarian){
				points = parseInt(points) + 1 + parseInt(pesoHasVegetarian)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasVegetarian)
			};			
		};
		if (points < 10){
			points = "0" + points;
		};
		if (points < 100){
			points = "0" + points;
		};
		if (points < 1000){
			points = "0" + points;
		};
		return points;
	};
	