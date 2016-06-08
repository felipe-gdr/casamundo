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
	setFilter ("dogs");
	setFilter ("cats");
	setFilter ("nationality");
	setFilter ("mealPlan");
	setFilter ("specialDiet");

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
	    		$("#listFamily li").on('click',function(){
	    			$('#familyName').html($(this).attr('data-idFamily'));
	    			$('#emailFamily').val($(this).attr('data-emailFamily'));
	    		});
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
        if (family.acceptSmokeStudent == "Yes"){
        	acceptSmokeCollor = "label-success"
        		acceptSmokeText = "Accept smoke"
        }else{
        	acceptSmokeCollor = "label-warning"
            	acceptSmokeText = "Don't accept smoke"
        };
        if (family.haveDogs == "Yes"){
        	haveDogsCollor = "label-warning";
        	haveDogsText = "Have dogss";
        }else{
        	haveDogsCollor = "label-success";
        	haveDogsText = "Don't have dogs";
        };
        if (family.haveCats == "Yes"){
        	haveCatsCollor = "label-warning";
        	haveCatsText = "Have cats";
        }else{
        	haveCatsCollor = "label-success";
        	haveCatsText = "Don't have cats";
        };
        if (family.preferGenderStudent){
        	preferGenderStudentCollor = "label-warning";
        	preferGenderStudentText = "Prefer gender ";
        	literal = "";
		    $.each(family.preferGenderStudent, function (i, preferGenderStudent) {
		    	preferGenderStudentText = preferGenderStudentText + literal + preferGenderStudent;
		    	literal = ", ";
		    });
        }else{
        	preferGenderStudentCollor = "label-success";
        	preferGenderStudentText = "Don't mind gender";
        };
        if (family.preferAgeStudent){
        	preferAgeStudentCollor = "label-warning";
        	preferAgeStudentText = "Prefer age ";
        	literal = "";
		    $.each(family.preferAgeStudent, function (i, preferAgeStudent) {
		    	preferAgeStudentText = preferAgeStudentText + literal + preferAgeStudent;
		    	literal = ", ";
		    });
        }else{
        	preferAgeStudentCollor = "label-success";
        	preferAgeStudentText = "Don't mind age student";
        };
        if (family.mealPlan){
        	haveMealPlanCollor = "label-success";
        	haveMealPlanText = "Offer ";  
        	literal = "";
		    $.each(family.mealPlan, function (i, mealPlan) {
		    	haveMealPlanText = haveMealPlanText + literal + mealPlan;
		    	literal = ", ";
		    });
		    haveMealPlanText = haveMealPlanText + " for meal plan"
        }else{
        	haveMealPlanCollor = "label-warning";
        	haveMealPlanText = "Don't offer meal plan";        	
        };
        if (family.specialDiet){
        	haveSpecialDietCollor = "label-success";
        	haveSpecialDietText = "Offer ";  
        	literal = "";
		    $.each(family.specialDiet, function (i, specialDiet) {
		    	haveSpecialDietText = haveSpecialDietText + literal + specialDiet;
		    	literal = ", ";
		    });
		    haveSpecialDietText = haveSpecialDietText + " for special diet"
        }else{
        	haveSpecialDietCollor = "label-warning";
        	haveSpecialDietText = "Don't offer special diet";        	
        };
        if (family.dontHostNationality){
        	dontHostNationalityCollor = "label-warning";
        	dontHostNationalityText = "Don't host nationality ";  
        	literal = "";
		    $.each(family.dontHostNationality, function (i, dontHostNationality) {
		    	dontHostNationalityText = dontHostNationalityText + literal + dontHostNationality;
		    	literal = ", ";
		    });
        }else{
        	dontHostNationalityCollor = "label-success";
        	dontHostNationalityText = "Don't have restriction for nationality";        	
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
        var actions = "";
        var student = JSON.parse(localStorage.getItem("student"));
        var actualTrip = student.documento.actualTrip;
        if (student.documento.trips[actualTrip].status == "Available"){
        	actions = "<li data-idFamily='" + family.familyName + "' data-emailFamily='" + family.contact.email + "'><a href='#' id='chooseFamily_" + family.familyName + "' data-toggle='modal' data-target='#offerToFamily'>Offer to Family</a></li>";
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
	    		"<span class='label " + haveDogsCollor + "'>" + haveDogsText + "</span><br>" +
	    		"<span class='label " + haveCatsCollor + "'>" + haveCatsText + "</span><br>" +
	    		"<span class='label " + dontHostNationalityCollor + "'>" + dontHostNationalityText + "</span><br>" +
	    		"<span class='label " + haveMealPlanCollor + "'>" + haveMealPlanText + "</span><br>" +
	    		"<span class='label " + haveSpecialDietCollor + "'>" + haveSpecialDietText + "</span>",
            "distances": distances,
            'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
            			'<ul id="listFamily" class="dropdown-menu">' +
            				actions +
            				'</ul></div>'
	    }).draw();
		
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
		var pesoHasDogs = 1;
		var pesoDontHasDogs = -1;
		var pesoHasCats = 1;
		var pesoDontHasCats = -1;
		var pesoAcceptAnyNationality = 1;
		var pesoDontAcceptAnyNationality = -1;
		var pesoHasMealPlan = 1;
		var pesoDontHasMealPLan = -1;
		var pesoHasSpecialDiet = 1;
		var pesoDontHasSpecialDiet = -1;
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
				points = parseInt(points) + 1 + parseInt(pesoHasPrivateWashroom)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasPrivateWashroom)
			};			
		};
		if ($('#filter_age').hasClass( "btn-success")){
			var preferAgeOk = false;
			var age = calculaIdade(separaData(objStudent.documento.birthDay, "/"));
			var ageCompar = "0-0";
			if (age < 15) {
				ageCompar = "0-14"
			}else{
				if (age < 20) {
					ageCompar = "15-20"
				}else{
					if (age < 30) {
						ageCompar = "20-30"
					}else{
						ageCompar = "30+"
					};
				};
			};
	    	if (family.preferAgeStudent){
			    $.each(family.preferAgeStudent, function (i, preferAgeStudent) {
			    	if (ageCompar == preferAgeStudent){
			    		preferAgeOk = true;	
			    	};
			    });
    		}else{
    			preferAgeOk = true;
    		};
			if (preferAgeOk){
				points = parseInt(points) + 1 + parseInt(pesoPreferAge)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontPreferAge)
			};			
		};
		if ($('#filter_gender').hasClass( "btn-success")){
			var preferGenderOk = false;
	    	if (family.preferGenderStudent){
			    $.each(family.preferGenderStudent, function (i, preferGenderStudent) {
			    	if (student.documento.gender == preferGenderStudent){
			    		preferGenderOk = true;	
			    	};
			    });
    		}else{
    			preferGenderOk = true;
    		};
			if (preferGenderOk){
				points = parseInt(points) + 1 + parseInt(pesoPreferGender)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontPreferGender)
			};			
		};
		if ($('#filter_smoke').hasClass( "btn-success")){
			var acceptSmoke = false;
    		if (student.documento.trips[actualTrip].smoke){
    			if (student.documento.trips[actualTrip].smoke == "Yes"){
    				if (family.acceptSmokeStudent == "Yes" ){
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

		if ($('#filter_dogs').hasClass( "btn-success")){
			var hasDogs = false;
    		if (family.haveDogs){
    			if (family.haveDogs == "Yes"){
    				if (student.documento.trips[actualTrip].liveDogs == "Yes"){
    					hasDogs = true;
    				}
        		}else{
        			hasDogs = true;
        		}
    		}else{
    			hasDogs = true;
    		};
			if (hasDogs){
				points = parseInt(points) + 1 + parseInt(pesoHasDogs)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasDogs)
			};			
		};

		if ($('#filter_cats').hasClass( "btn-success")){
			var hasCats = false;
    		if (family.haveCats){
    			if (family.haveCats == "Yes"){
    				if (student.documento.trips[actualTrip].liveCats == "Yes"){
    					hasCats = true;
    				}
        		}else{
        			hasCats = true;
        		}
    		}else{
    			hasCats = true;
    		};
			if (hasCats){
				points = parseInt(points) + 1 + parseInt(pesoHasCats)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasCats)
			};			
		};
		if ($('#filter_mealPlan').hasClass( "btn-success")){
			var hasMealPlan = false;
    		if (student.documento.trips[actualTrip].mealPLan){
			    $.each(student.documento.trips[actualTrip].mealPLan, function (i, mealPlanStudent) {
			    	if (family.mealPLan){
					    $.each(family.mealPLan, function (i, mealPlanFamily) {
					    	if (mealPlanStudent == mealPlanFamily){
					    		hasMealPlan = true;	
					    	};
					    });
			    	};
        		});
    		}else{
    			hasMealPlan = true;
    		}
			if (hasMealPlan){
				points = parseInt(points) + 1 + parseInt(pesoHasMealPlan)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasMealPlan)
			};			
		};
		if ($('#filter_specialDiet').hasClass( "btn-success")){
			var hasSpecialDiet = false;
    		if (student.documento.trips[actualTrip].specialDiet){
			    $.each(student.documento.trips[actualTrip].specialDiet, function (i, specialDietStudent) {
			    	if (family.specialDiet){
				    	$.each(family.specialDiet, function (i, specialDietFamily) {
					    	if (specialDietStudent == specialDietFamily){
					    		hasSpecialDiet = true;	
					    	};
					    });
			    	};
        		});
    		};
			if (hasSpecialDiet){
				points = parseInt(points) + 1 + parseInt(pesoHasSpecialDiet)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontHasSpecialDiet)
			};			
		};
		if ($('#filter_nationality').hasClass( "btn-success")){
			var hasAcceptAnyNationality = true;
    		if (family.dontHostNationality){
			    $.each(family.dontHostNationality, function (i, dontHostNationality) {
			    	if (student.documento.nationality == dontHostNationality) {
			    		hasAcceptAnyNationality = false;
				    };
        		});
    		};
			if (hasAcceptAnyNationality){
				points = parseInt(points) + 1 + parseInt(pesoAcceptAnyNationality)  
			}else{
				points = parseInt(points) + 1 + parseInt(pesoDontAcceptAnyNationality)
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
	