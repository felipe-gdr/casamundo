	
	function montaAccommodationFamily (){
		/*** 		carrega student
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
			rest_obterFamiliesAll(carregaLocalStorageFamilies, semAcao, objStudent.documento.trips[objStudent.documento.actualTrip].destination);
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
		
	};
	
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

	function carregaLocalStorageFamilies (objJson) {

		localStorage.setItem("families", JSON.stringify(objJson));

		/* BASIC datatables*/

		var responsiveHelper_families_list = undefined;
		
		var breakpointDefinition = {
			tablet : 1024,
			phone : 480
		};
	     
		/* family list  */
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
			                "orderable":      true,
			                "data":           null,
			                "defaultContent": ''
			            },
			            { "data": "family", "width": "15%"},
			            { "data": "location", "width": "15%"},
			            { "data": "dates", "width": "15%"},
			            { "data": "characteristics", "width": "15%"},
			            { "data": "preferences", "width": "15%"},
			            { "data": "reviews", "width": "10%"},
			            { "data": "comments", "width": "15%"},
			            ],
	        "responsive": true,
	        "charset" : "UTF-8",
	        "bDestroy": true,
	        "iDisplayLength": 30,
	        "order": [[1, 'desc']],
	        "fnDrawCallback": function( oSettings ) {
		       runAllCharts()
		    }
		
	    });
    	
	    family_table.clear();
    	
	    var objJson = JSON.parse(localStorage.getItem("families"));
	    $.each(objJson, function (i, family) {
	    	if (family.address.latitude && family.address.longitude && localStorage.latitudeSchool && localStorage.longitudeSchool){
	    		getMapDistance(family.address.latitude, family.address.longitude, localStorage.latitudeSchool, localStorage.longitudeSchool, localStorage.mapsDistance, montaLinhaFamilia, montaLinhaFamilia, family_table, family);
	    	}else{
	    		montaLinhaFamilia(0, family_table, family);
	    	};
	    });
		
		// Add event listener for opening and closing details
	    $('#families_list tbody').off('click');
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
	            $("#listFamily li").off('click');
	    		$("#listFamily li").on('click',function(){
	    			$('#familyName').html($(this).attr('data-idFamily'));
	    			$('#emailFamily').val($(this).attr('data-emailFamily'));
	    			$('#emailStudent').val($(this).attr('data-emailStudent'));
	    			$('#indexTrip').val($(this).attr('data-indexTrip'));
	    			$('#roomSingle').val($(this).attr('data-roomSingle'));
	    			$('#roomCouple').val($(this).attr('data-roomCouple'));
	    			$('#roomNumber').val($(this).attr('data-roomNumber'));
	    			if ($(this).attr('data-process') == "sendlettertostudent") {
	    				rest_obterFamily($(this).attr('data-idFamily'), carregaTelaFamily, semAcao);
	    			};
	    			if ($(this).attr('data-process') == "offertofamilyi") {
	    				var objJson = {
	    		    			familyName : $(this).attr('data-idFamily'),
	    		    			emailFamily : $(this).attr('data-emailFamily'),
	    		    			emailStudent : $(this).attr('data-emailStudent'),
	    		    			indexTrip : $(this).attr('data-indexTrip'),
	    		    			roomSingle : $(this).attr('data-roomSingle'),
	    		    			roomCouple : $(this).attr('data-roomCouple'),
	    		    			roomNumber : $(this).attr('data-roomNumber'),
	    		    			start : $(this).attr('data-start'),
	    		    			end : $(this).attr('data-end'),
	    		    			occupancy : $(this).attr('data-occupancy')
	    				};
	    				rest_obterFamily($(this).attr('data-idFamily'), updateRooms, semAcao, objJson);
	    				$('#roomNumberHomestay').html((parseInt($(this).attr('data-roomNumber')) + 1));
	    				$('#singleBed').html($(this).attr('data-roomSingle'));
	    				$('#coupleBed').html($(this).attr('data-roomCouple'));
	    				$('#startOccupancy').html($(this).attr('data-start'));
	    				$('#endOccupancy').html($(this).attr('data-end'));
	    				$('#note').html($(this).attr('data-note'));
//	    				$('.room').removeClass("hide");
//	    				$(".notChange" ).addClass("hide");
//	    				$("#accommodation" ).focus();	    				
	    				// *** refresh students list
	    				$(window.document.location).attr('href','students.html?typePage=accommodation');

	    			};
	    		});
	        }
	    });
	    
	    // Apply the filter
//	    $("#families_list thead th input[type=text]").off('keyup change');
//	    $("#families_list thead th input[type=text]").on('keyup change', function () {
//	    	family_table
//	            .column( $(this).parent().index()+':visible' )
//	            .search( this.value )
//	            .draw();
//	    });
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
        var actions = "";
        var occupancy = "";
        var dates = "";
        var notes = "";
        var student = JSON.parse(localStorage.getItem("student"));
        var actualTrip = student.documento.actualTrip;
        var emailStudent = student.documento.mail;
        if (family.rooms){
	        if (family.rooms[0]){
	        	var roomSingle = 0;
	        	var roomCouple = 0;
	        	var roomsAvailable = false;
	        	// ** literal para constar na linha
	            var rooms = "";
			    $.each(family.rooms, function (i, room) {
		            var studentOccupancyData =
		            	{
		            		lastEmail : "",
		            		nextEmail : "",
		            		lastDateShow : 0,
		            		lastDate : 0,
		            		nextDate : 999999999999999999999999999999999999,
		            		nextDateShow : 0
		            	};
			    	// ** montar literal dos quartos
			    	rooms = rooms + 
				    	"<span class='text text-table-main'>" + "Bedroom " + (parseInt(room.number) + 1) + "</span><br>" +
				    	"<span class='text text-table'>" + "Single " + room.singleBed + " couple " + room.coupleBed + "</span><br>" +
				    	"<span class='text text-table'>" + "Private WC " + room.privateWashroom + "</span><br>" +
				    	"<span class='text text-table'>" + room.level + "</span><br>";
			    	// ** verificar se ha quartos disponiveis 
		        	if (room.singleBed){
			    		if (room.singleBed == 1){
			    			literal_1 = "bed"
			    		}else{
			    			literal_1 = "beds"
			    		};
			    		if (room.occupancySingleBed){
				    		var singleBedAvailable = room.singleBed - bedsOccupied(room.occupancySingleBed);
				    		if (singleBedAvailable == 0){
				    			availableBedText = "no available single beds"
				    		}else{
					    		studentOccupancyData = lastNextOccupancy(room.occupancySingleBed, studentOccupancyData);
				    			roomSingle = i;
				    			if (student.documento.trips[actualTrip].occupancy == "Single"){
				    				if (student.documento.trips[actualTrip].status == "Available"){
				    					roomsAvailable = true;
				    					actions = actions + "<li  id='room_'" + room.number + "' data-process='offertofamily' data-roomNumber='" + room.number + "' data-note='" + room.note + "' data-roomCouple='" + room.coupleBed + "'  data-roomSingle='" + room.singleBed + "' data-idFamily='" + family.familyName + "'  data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.number + "_" + family.familyName + "'>Allocate room number " + (parseInt(room.number) + 1) + "</a></li>";
				    				};
				    			};
				    			if (student.documento.trips[actualTrip].occupancy == "Couple" && singleBedAvailable > 1){
				    				if (student.documento.trips[actualTrip].status == "Available"){
				    					roomsAvailable = true;
				    					actions = actions + "<li  id='room_'" + room.number + "' data-process='offertofamily' data-roomNumber='" + room.number + "' data-note='" + room.note + "' data-roomCouple='" + room.coupleBed + "'  data-roomSingle='" + room.singleBed + "' data-idFamily='" + family.familyName + "'  data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.number + "_" + family.familyName + "'>Allocate room number " + (parseInt(room.number) + 1) + "</a></li>";
				    				};
				    			};
					    		if (singleBedAvailable == 1){
					    			availableBedText = "available " + singleBedAvailable + " bed"
					    		}else{
					    			availableBedText = "available " + singleBedAvailable + " beds"
					    		};
				    		};
				    		singleBedText = room.singleBed + " single " + literal_1 + ", " + availableBedText
			    		}else{
			    			singleBedText = "";
			    		}
			    	};
			    	if (room.coupleBed){
			    		if (room.coupleBed == 1){
			    			literal_1 = "bed"
			    		}else{
			    			literal_1 = "beds"
			    		};
			    		if (room.occupancyCoupleBed){
				    		var coupleBedAvailable = room.coupleBed - bedsOccupied(room.occupancyCoupleBed);
				    		if (coupleBedAvailable == 0){
				    			availableBedText = "no available couple beds"
				    		}else{
					    		studentOccupancyData = lastNextOccupancy(room.occupancyCoupleBed, studentOccupancyData);
				    			roomCouple = i;
				    			if (student.documento.trips[actualTrip].occupancy == "Couple"){
				    				if (student.documento.trips[actualTrip].status == "Available"){
				    					roomsAvailable = true;
				    					actions = actions + "<li  id='room_'" + room.number + "' data-process='offertofamily' data-roomNumber='" + room.number + "' data-note='" + room.note + "' data-roomCouple='" + room.coupleBed + "'  data-roomSingle='" + room.singleBed + "' data-idFamily='" + family.familyName + "'  data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.number + "_" + family.familyName + "'>Allocate room number " + (parseInt(room.number) + 1) + "</a></li>";
				    				};
				    			};
					    		if (coupleBedAvailable == 1){
					    			availableBedText = "available " + coupleBedAvailable + " bed"
					    		}else{
					    			availableBedText = "available " + coupleBedAvailable + " beds"
					    		};
				    		};
				    		coupleBedText = room.coupleBed + " couple " + literal_1 + ", " + availableBedText
			    		}else{
			    			coupleBedText = "";
			    		}
			    	};
			    	if (room.privateWashroom){
			    		if (room.privateWashroom == "Yes"){
			    			privateWashroomText = " Have private washroom"
			    		}else{
			    			privateWashroomText = " Dont't have private washroom"
			    		};
			    	};
			    	occupancy = String(occupancy) + "<span class='text-success'><i>Room " + (parseInt(room.number) + 1) + ":</span><br> " + 
			    									"<span class='text-info'><i>" + singleBedText + "<i></span><br>" +
			    									"<span class='text-info'><i>"  + coupleBedText + "<i></span><br>" +
			    									"<span class='text-info'><i>"  + privateWashroomText + "<i></span><br>";
		    		if (studentOccupancyData.lastEmail != "" | studentOccupancyData.nextEmail != ""){
		    			dates = dates + 
			        		"<span class='text text-table-main'>" + "Bedroom " + (parseInt(room.number) + 1) + "</span><br>" +
				    		"<span class='text text-table-main'>OUT " + 
				    			"<a href='student.html?email=" + studentOccupancyData.lastEmail + "&typePage=change'>" +
					    			"<span class='text text-table'>" + separaDataMes(studentOccupancyData.lastDateShow, "/") + 
					    			"</span><br>" + 
					    			"<span class='text text-table'>" + studentOccupancyData.lastEmail + 
					    			"</span><br>" + 
					    		"</a>" +
				    		"</span><br>" +
				    		"<span class='text text-table-main'>IN " +
				    			"<a href='student.html?email=" + studentOccupancyData.nextEmail + "&typePage=change'>" +
				    				"<span class='text text-table'>" + separaDataMes(studentOccupancyData.nextDateShow, "/") + 
				    				"</span><br>" + 
				    				"<span class='text text-table'>" + studentOccupancyData.nextEmail + 
				    				"</span>" + 
				    			"</a>" +
				    		"</span><br>";
		    		};
			    });
			    if (!roomsAvailable){
			    	actions = actions + "<li data-process='noroomsavailable'  data-idFamily='" + family.familyName + "'  data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#'>No rooms available</a></li>";
			    }
	        };
        };
        if (family.notes){
		    $.each(family.notes, function (i, note) {
		    	notes = notes + "<span class='text text-table'>" + note.note + "</span><br>"
		    });
        };
        var police = "No";
        if (family.contact.docDate){
        	if (family.contact.docDate != ""){
				var policeDate = Date.parse(new Date(separaAnoMesDia(family.contact.docDate)));
				var todaysDate = Date.parse(new Date());
				if (policeDate > todaysDate){
					police = "Yes";
				}
        	};
        };
        var objStudent = JSON.parse(localStorage.getItem("student"));
        var distances = "";
        if (results){
            if (results.rows[0].elements[0].duration){
            	var distances = "<span class='text text-table'><i>" + results.rows[0].elements[0].duration.text +"<i></small>";
            };
        };
//        if (student.documento.trips[actualTrip].status == "Available"){
//        	actions = actions + "<li  data-process='offertofamily' data-roomCouple='" + roomCouple + "'  data-roomSingle='" + roomSingle + "' data-idFamily='" + family.familyName + "'  data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + family.familyName + "' data-toggle='modal' data-target='#offerToFamily'>Offer to Family</a></li>";
//        };
        if (student.documento.trips[actualTrip].status == "Confirmed"){
        	actions = "<li data-process='sendlettertostudent' data-idFamily='" + family.familyName + "' data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + family.familyName + "' data-toggle='modal' data-target='#letterToStudent'>Send confirmation letter</a></li>";
        };
        if (student.documento.trips[actualTrip].status == "DocsOk"){
        	actions = "<li data-process='studentinhouse' data-idFamily='" + family.familyName + "' data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + family.familyName + "' data-toggle='modal' data-target='#offerToFamily'>Student in house</a></li>" +
        				"<li data-process='cancel' data-idFamily='" + family.familyName + "' data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + family.familyName + "' data-toggle='modal' data-target='#offerToFamily'>Cancel></li>"
        };
        if (student.documento.trips[actualTrip].status == "InHouse"){
        	actions = "<li data-process='terminate' data-idFamily='" + family.familyName + "' data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + family.familyName + "' data-toggle='modal' data-target='#offerToFamily'>Terminated</a></li>" +
        				"<li data-process='cancel' data-idFamily='" + family.familyName + "' data-emailFamily='" + family.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseFamily_" + family.familyName + "' data-toggle='modal' data-target='#offerToFamily'>Cancel></li>"
        };
        
        family_table.row.add( {
	    	"family":
	    		"<span class='hide'>" + calculaPontuacaoFamilia(family,JSON.parse(localStorage.getItem("student"))) + "</span>" +
	    		"<a href='family.html?familyName=" + family.familyName + "'>" +
	    			"<span>" + family.familyName +  "</span><br>" +
	    			rooms + 
	    		"</a>",
	    	"location": 
	    		"<span class='text text-table-main'>Distance to school "  + "<span class='text text-table'>" + distances + "</span></span><br>" +
	    		"<span class='text text-table-main'>Main Intersection "  + "<span class='text text-table'>" + family.address.mainIntersection + " </span></span><br>" +
	    		"<span class='text text-table-main'>Subway "  + "<span class='text text-table'>" + family.address.subwayStation + " </span></span><br>" +
	    		"<span class='text text-table-main'>Walking time "  + "<span class='text text-table'>" + family.address.timeSubwayStation + " </span></span><br>",
            "dates": dates,
            "characteristics": 
	    		"<span class='text text-table-main'>Internet: "  + "<span class='text text-table'>" + family.offerInternet + "</span></span>" +
	    		"<span class='text text-table-main'> Dogs: "  + "<span class='text text-table'>" + family.haveDogs + "</span></span></br>" +
	    		"<span class='text text-table-main'>Cats: "  + "<span class='text text-table'>" + family.haveCats + "</span></span>" +
	    		"<span class='text text-table-main'> Other: "  + "<span class='text text-table'>" + family.haveOtherPet + "</span></span></br>" +
	    		"<span class='text text-table-main'>Backgroud: "  + "<span class='text text-table'>" + family.background + "</span></span></br>" +
	    		"<span class='text text-table-main'> In Canada: "  + "<span class='text text-table'>" + family.howLongHaveYouBeen + "</span></span></br>" +
	    		"<span class='text text-table-main'>Smoke?: "  + "<span class='text text-table'>" + family.acceptSmokeStudent + "</span></span>" +
	    		"<span class='text text-table-main'> Type: "  + "<span class='text text-table'>" + family.type + "</span></span></br>" +
	    		"<span class='text text-table-main'>Police ok?: "  + "<span class='text text-table'>" + police + "</span></span>",
            "preferences":
	    		"<span class='text text-table-main'>Age: "  + "<span class='text text-table'>" + family.preferAgeStudent + "</span></span>" +
	    		"<span class='text text-table-main'> Gender: "  + "<span class='text text-table'>" + family.preferGenderStudent + "</span></span></br>" +
	    		"<span class='text text-table-main'>Meal: "  + "<span class='text text-table'>" + family.mealPlan + "</span></span>" +
	    		"<span class='text text-table-main'> Diet: "  + "<span class='text text-table'>" + family.specialDiet + "</span></span></br>" +
	    		"<span class='text text-table-main'>Don't host: "  + "<span class='text text-table'>" + family.dontHostNationality + "</span></span>",
            "reviews": "",
            "comments": notes, 
            'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
            			'<ul id="listFamily" class="dropdown-menu">' +
            				actions +
            			'</ul></div>'
	    }).draw();
	};
	
	/* Formatting function for row details - modify as you need */
	function formatFamily ( d ) {
	    // `d` is the original data object for the row
	    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
	        '<tr>'+
	        	'<td style="width:50px">Actions:</td>'+
	            '<td>'+d.actions+'</td>'+
	        '</tr>'+
	    '</table>';
	};
	
	function lastNextOccupancy (occupancyRows, studentOccupancyData) {
		var objJson = JSON.parse(localStorage.getItem("student"));
		var actualTrip = objJson.documento.actualTrip;
		var startTrip = Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].start))); 
		var endTrip =  Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].end)));
	    $.each(occupancyRows, function (i, occupancy) {
			if (occupancy.emailStudent){
				var startOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.startOccupancy))); 
				var endOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.endOccupancy)));
				
				if (endOccupancy < startTrip ){
					if (endOccupancy > studentOccupancyData.lastDate){	
						studentOccupancyData.lastDate = endTrip;
						studentOccupancyData.lastEmail = occupancy.emailStudent;
						studentOccupancyData.lastDateShow = occupancy.endOccupancy;
					};
				};
				if (startOccupancy > endTrip){
					if (startOccupancy < studentOccupancyData.nextDate){	
						studentOccupancyData.nextDate = endTrip;
						studentOccupancyData.nextEmail = occupancy.emailStudent;
						studentOccupancyData.nextDateShow = occupancy.startOccupancy;
					};
				};
			};
	    });
	    return studentOccupancyData;
	};
	
	function bedsOccupied (occupancyRows) {
		var objJson = JSON.parse(localStorage.getItem("student"));
		var actualTrip = objJson.documento.actualTrip;
		var startTrip = Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].start))); 
		var endTrip =  Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].end)));
		var occupied = 0;
	    $.each(occupancyRows, function (i, occupancy) {
			if (occupancy.emailStudent){
				var startOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.startOccupancy))); 
				var endOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.endOccupancy)));
				
				if (startTrip >= startOccupancy && startTrip <= endOccupancy){
					occupied = occupied + 1;	
					return;
				};
				if (endTrip >= startOccupancy && endTrip <= endOccupancy){
					occupied = occupied + 1;	
					return;
				};
				if (startTrip <= startOccupancy && endTrip >= endOccupancy){
					occupied = occupied + 1;	
					return;
				};
				
			};
	    });
	    return occupied;
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
				if (family.rooms){
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
			var age = calculaIdade(separaData(student.documento.birthDay, "/"));
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
	
	
	function updateRooms (objFamily, objRoom) {
		var occupancy = 
			{
			emailStudent : objRoom.emailStudent,
            startOccupancy : objRoom.start ,
            endOccupancy : objRoom.end
			};
		if (objRoom.occupancy == "Single"){
			objFamily.documento.rooms[objRoom.roomNumber].occupancySingleBed.push(occupancy);
		};
		if (objRoom.occupancy == "Couple"){
			objFamily.documento.rooms[objRoom.roomNumber].occupancyCoupleBed.push(occupancy);
		};
		rest_atualizaFamily(objFamily, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms update", "Problems to update rooms, try again")
		var objStudent = JSON.parse(localStorage.getItem("student"));
		objStudent.documento.trips[objStudent.documento.actualTrip].familyName = objRoom.familyName;
		objStudent.documento.trips[objStudent.documento.actualTrip].status = "Allocated";
		delete objStudent.contact;
		delete objStudent.rooms;
		delete objStudent.family;
		delete objStudent.room;
		rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Family name included", "Problems to update student, try again")
		
	};
