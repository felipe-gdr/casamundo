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
		rest_obterRoomsAll(carregaLocalStorageRooms, semAcao, objStudent.documento.trips[objStudent.documento.actualTrip].destination);
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
			carregaLocalStorageRooms (JSON.parse(localStorage.getItem("rooms")));
		});
	};

	function carregaLocalStorageRooms (objJson) {

		localStorage.setItem("rooms", JSON.stringify(objJson));

		/* BASIC datatables*/

		var responsiveHelper_rooms_list = undefined;
		
		var breakpointDefinition = {
			tablet : 1024,
			phone : 480
		};
	     
		/* room list  */
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
			                "orderable":      true,
			                "data":           null,
			                "defaultContent": ''
			            },
			            { "data": "room", "width": "15%"},
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
    	
	    room_table.clear();
    	
	    var objJson = JSON.parse(localStorage.getItem("rooms"));
	    $.each(objJson, function (i, room) {
	    	if (room.address.latitude && room.address.longitude && localStorage.latitudeSchool && localStorage.longitudeSchool){
	    		getMapDistance(room.address.latitude, room.address.longitude, localStorage.latitudeSchool, localStorage.longitudeSchool, localStorage.mapsDistance, montaLinhaRoom, montaLinhaRoom, room_table, room);
	    	}else{
	    		montaLinhaRoom(0, room_table, room);
	    	};
	    });
		
		// Add event listener for opening and closing details
	    $('#rooms_list tbody').off('click');
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
	            row.child( formatRoom(row.data()) ).show();
	            tr.addClass('shown');
	            $("#listRoom li").off('click');
	    		$("#listRoom li").on('click',function(){
	    			$('#roomName').html($(this).attr('data-idRoom'));
	    			$('#emailRoom').val($(this).attr('data-emailRoom'));
	    			$('#emailStudent').val($(this).attr('data-emailStudent'));
	    			$('#indexTrip').val($(this).attr('data-indexTrip'));
	    			$('#roomSingle').val($(this).attr('data-roomSingle'));
	    			$('#roomCouple').val($(this).attr('data-roomCouple'));
	    			$('#roomNumber').val($(this).attr('data-roomNumber'));
	    			if ($(this).attr('data-process') == "sendlettertostudent") {
	    				rest_obterRoom($(this).attr('data-idRoom'), carregaTelaRoom, semAcao);
	    			};
	    			if ($(this).attr('data-process') == "offertoroomi") {
	    				var objJson = {
	    		    			roomName : $(this).attr('data-idRoom'),
	    		    			emailRoom : $(this).attr('data-emailRoom'),
	    		    			emailStudent : $(this).attr('data-emailStudent'),
	    		    			indexTrip : $(this).attr('data-indexTrip'),
	    		    			roomSingle : $(this).attr('data-roomSingle'),
	    		    			roomCouple : $(this).attr('data-roomCouple'),
	    		    			roomNumber : $(this).attr('data-roomNumber'),
	    		    			start : $(this).attr('data-start'),
	    		    			end : $(this).attr('data-end'),
	    		    			occupancy : $(this).attr('data-occupancy')
	    				};
	    				rest_obterRoom($(this).attr('data-idRoom'), updateRooms, semAcao, objJson);
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
	    				$(window.document.location).attr('href','students.html');

	    			};
	    		});
	        }
	    });
	    
	    // Apply the filter
//	    $("#rooms_list thead th input[type=text]").off('keyup change');
//	    $("#rooms_list thead th input[type=text]").on('keyup change', function () {
//	    	room_table
//	            .column( $(this).parent().index()+':visible' )
//	            .search( this.value )
//	            .draw();
//	    });
	    /* end trip list */   

	};

	function montaLinhaRoom(results, room_table, room){

		var actions = "";
        var occupancy = "";
        var dates = "";
        var comments = "";
        var student = JSON.parse(localStorage.getItem("student"));
        var actualTrip = student.documento.actualTrip;
        var emailStudent = student.documento.mail;
        if (room.beds){
	        if (room.beds[0]){
	            var beds = "";
			    $.each(room.beds, function (i, bed) {
		            var studentOccupancyData =
		            	{
		            		lastEmail : "",
		            		nextEmail : "",
		            		lastDateShow : 0,
		            		lastDate : 0,
		            		nextDate : 999999999999999999999999999999999999,
		            		nextDateShow : 0
		            	};
		            var bedOccupied = false;
		        	if (bed.occupancyBed){
		        		bedOccupied = bedsOccupied(room.occupancyBed);
		        	};
		        	var availableBedText = "available";
		    		if (bedOccupied){
		    			availableBedText = "no available"
			    		studentOccupancyData = lastNextOccupancy(room.occupancyBed, studentOccupancyData);
		    			roomSingle = i;
		    			if ((student.documento.trips[actualTrip].occupancy == "Single" && bed.type == "Single") |
	    					(student.documento.trips[actualTrip].occupancy == "Couple" && bed.type == "Couple")){
	    					roomsAvailable = true;
	    					actions = actions + "<li  id='bed_'" + bed.name + "' data-process='offerroom,' data-roomNumber='" + bed.name + "' data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + bed.id + "_" + room.id + "'>Allocate bed " + bed.name + "</a></li>";
		    			};
		    		};
			    	beds = beds + 
			    		"<span class='text text-table'>" + bed.type + " - " + availableBedText + "</span><br>" +
			    		"<span class='text text-muted'>" + bed.description + "</span><br>" +
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
			    });
	        };
        };
        if (room.comments){
		    $.each(room.comments, function (i, note) {
		    	comments = comments + "<span class='text text-table'>" + note.note + "</span><br>"
		    });
        };
        var objStudent = JSON.parse(localStorage.getItem("student"));
        var distances = "";
        if (results){
            if (results.rows[0].elements[0].duration){
            	var distances = "<span class='text text-table'><i>" + results.rows[0].elements[0].duration.text +"<i></small>";
            };
        };
//        if (student.documento.trips[actualTrip].status == "Available"){
//        	actions = actions + "<li  data-process='offertoroom' data-roomCouple='" + roomCouple + "'  data-roomSingle='" + roomSingle + "' data-idRoom='" + room.roomName + "'  data-emailRoom='" + room.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseRoom_" + room.roomName + "' data-toggle='modal' data-target='#offerToRoom'>Offer to Room</a></li>";
//        };
        if (student.documento.trips[actualTrip].status == "Confirmed"){
        	actions = "<li data-process='sendlettertostudent' data-idRoom='" + room.id + "' data-emailRoom='" + room.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseRoom_" + room.id + "' data-toggle='modal' data-target='#letterToStudent'>Send confirmation letter</a></li>";
        };
        if (student.documento.trips[actualTrip].status == "DocsOk"){
        	actions = "<li data-process='studentinhouse' data-idRoom='" + room.id + "' data-emailRoom='" + room.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseRoom_" + room.id + "' data-toggle='modal' data-target='#offerToRoom'>Student in house</a></li>" +
        				"<li data-process='cancel' data-idRoom='" + room.id + "' data-emailRoom='" + room.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseRoom_" + room.id + "' data-toggle='modal' data-target='#offerToRoom'>Cancel></li>"
        };
        if (student.documento.trips[actualTrip].status == "InHouse"){
        	actions = "<li data-process='terminate' data-idRoom='" + room.id + "' data-emailRoom='" + room.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseRoom_" + room.id + "' data-toggle='modal' data-target='#offerToRoom'>Terminated</a></li>" +
        				"<li data-process='cancel' data-idRoom='" + room.id + "' data-emailRoom='" + room.contact.email + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "'><a href='#' id='chooseRoom_" + room.id + "' data-toggle='modal' data-target='#offerToRoom'>Cancel></li>"
        };
        
        room_table.row.add( {
	    	"room":
	    		"<span class='hide'>" + calculaPontuacaoRoom(room,JSON.parse(localStorage.getItem("student"))) + "</span>" +
	    		"<a href='room.html?roomName=" + room.roomName + "'>" +
	    			"<span>" + room.roomName +  "</span><br>" +
	    			rooms + 
	    		"</a>",
	    	"location": 
	    		"<span class='text text-table-main'>Distance to school "  + "<span class='text text-table'>" + distances + "</span></span><br>" +
	    		"<span class='text text-table-main'>Main Intersection "  + "<span class='text text-table'>" + room.address.mainIntersection + " </span></span><br>" +
	    		"<span class='text text-table-main'>Subway "  + "<span class='text text-table'>" + room.address.subwayStation + " </span></span><br>" +
	    		"<span class='text text-table-main'>Walking time "  + "<span class='text text-table'>" + room.address.timeSubwayStation + " </span></span><br>",
            "dates": dates,
            "characteristics": "",
            "preferences": "",
            "reviews": "",
            "comments": comments, 
            'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
            			'<ul id="listRoom" class="dropdown-menu">' +
            				actions +
            			'</ul></div>'
	    }).draw();
	};
	
	/* Formatting function for row details - modify as you need */
	function formatRoom ( d ) {
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
		var occupied = false;
	    $.each(occupancyRows, function (i, occupancy) {
			if (occupancy.emailStudent){
				var startOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.startOccupancy))); 
				var endOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.endOccupancy)));
				
				if (startTrip >= startOccupancy && startTrip <= endOccupancy){
					occupied = true;
				};
				if (endTrip >= startOccupancy && endTrip <= endOccupancy){
					occupied = true;				
				};
				if (startTrip <= startOccupancy && endTrip >= endOccupancy){
					occupied = true;				
				};
			};
	    });
	    return occupied;
	};

	function calculaPontuacaoRoom (room, student) {
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
				if (room.rooms){
				    $.each(room.rooms, function (i, room) {
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
				    $.each(room.rooms, function (i, room) {
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
	    	if (room.preferAgeStudent){
			    $.each(room.preferAgeStudent, function (i, preferAgeStudent) {
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
	    	if (room.preferGenderStudent){
			    $.each(room.preferGenderStudent, function (i, preferGenderStudent) {
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
    				if (room.acceptSmokeStudent == "Yes" ){
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
    		if (room.haveDogs){
    			if (room.haveDogs == "Yes"){
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
    		if (room.haveCats){
    			if (room.haveCats == "Yes"){
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
			    	if (room.mealPLan){
					    $.each(room.mealPLan, function (i, mealPlanRoom) {
					    	if (mealPlanStudent == mealPlanRoom){
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
			    	if (room.specialDiet){
				    	$.each(room.specialDiet, function (i, specialDietRoom) {
					    	if (specialDietStudent == specialDietRoom){
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
    		if (room.dontHostNationality){
			    $.each(room.dontHostNationality, function (i, dontHostNationality) {
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
	
	
	function updateRooms (objRoom, objRoom) {
		var occupancy = 
			{
			emailStudent : objRoom.emailStudent,
            startOccupancy : objRoom.start ,
            endOccupancy : objRoom.end
			};
		if (objRoom.occupancy == "Single"){
			objRoom.documento.rooms[objRoom.roomNumber].occupancySingleBed.push(occupancy);
		};
		if (objRoom.occupancy == "Couple"){
			objRoom.documento.rooms[objRoom.roomNumber].occupancyCoupleBed.push(occupancy);
		};
		rest_atualizaRoom(objRoom, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms update", "Problems to update rooms, try again")
		var objStudent = JSON.parse(localStorage.getItem("student"));
		objStudent.documento.trips[objStudent.documento.actualTrip].roomName = objRoom.roomName;
		objStudent.documento.trips[objStudent.documento.actualTrip].status = "Allocated";
		delete objStudent.contact;
		delete objStudent.rooms;
		delete objStudent.room;
		rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Room name included", "Problems to update student, try again")
		
	};
