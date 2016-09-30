	
	function montaAccommodationRoom (){
	
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
			rest_obterBedsAll(carregaLocalStorageRooms, semAcao, objStudent.documento.trips[objStudent.documento.actualTrip].destination);
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
			carregaLocalStorageRooms (JSON.parse(localStorage.getItem("rooms")));
		});
	};

	function carregaLocalStorageRooms (objJson, filters) {

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
			                "defaultContent": '',
			                "width": "5%"
			            },
			            { "data": "building", "width": "25%"},
			            { "data": "current", "width": "20%"},
			            { "data": "dates_01", "width": "15%"},
			            { "data": "next", "width": "20%"},
			            { "data": "dates_02", "width": "15%"},
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
    		montaLinhaRoom(i, room_table, room, filters);
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
    				var objJson = {
    		    			idRoom : $(this).attr('data-idRoom'),
    		    			idBed : $(this).attr('data-idBed'),
    		    			idStudent : $(this).attr('data-idStudent'),
    		    			dormName : $(this).attr('data-dormName'),
    		    			unitName : $(this).attr('data-unitName'),
    		    			roomName : $(this).attr('data-roomName'),
    		    			bedName : $(this).attr('data-bedName'),
    		    			start : $(this).attr('data-start'),
    		    			end : $(this).attr('data-end'),
    				};
    				localStorage.setItem("bedAllocation", JSON.stringify(objJson));
	    			if ($(this).attr('data-process') == "allocatebed") {
	    				rest_obterRoom($(this).attr('data-idRoom'), updateBeds, semAcao, objJson);
	    				$(window.document.location).attr('href','students.html?accommodation=Dorms');
	    			};
	    			if ($(this).attr('data-process') == "allocatebeddata") {
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

	function montaLinhaRoom(results, room_table, room, filters){

		var actions = "";
        var occupancy = "";
        var dates = "";
        var comments = "";
        var student = JSON.parse(localStorage.getItem("student"));
        var actualTrip = student.documento.actualTrip;
        var emailStudent = student.documento.mail;
        var beds = "";
        var studentOccupancyData =
        	{
        		lastName : "",
        		lastGender : "",
        		lastNationality : "",
        		lastVisa : "",
        		lastPayment : "",
        		lastStatus : "",
        		lastFlight : "",
        		lastOccupancy : "",
        		lastEmail : "",
        		lastIn : "",
        		lastOut : "",
        		nextName : "",
        		nextGender : "",
        		nextNationality : "",
        		nextVisa : "",
        		nextPayment : "",
        		nextStatus : "",
        		nextFlight : "",
        		nextOccupancy : "",
        		nextEmail : "",
        		nextIn : "",
        		nextOut : "",
        		lastDateShow : 0,
        		lastDate : 0,
        		nextDate : 999999999999999999999999999999999999,
        		nextDateShow : 0
        	};
        var bedStatus = false;
    	if (room.bed.occupancies){
    		bedStatus = bedsOccupied(room.bed.occupancies, studentOccupancyData);
        	studentOccupancyData = lastNextOccupancy(room.bed.occupancies, studentOccupancyData);
    	};
    	var availableBedText = "available";
    	var availableBedCollor = "text-success";

    	var bedAvailable = false;
		if (bedStatus){
			availableBedText = bedStatus;
			availableBedCollor = "text-warning"
		}else{
//			if (student.documento.trips[actualTrip].occupancy == room.bed.type){
				bedAvailable = true;
				actions = actions + 
									"<li  id='roomId_'" + room.id + "_" + room.bed.id + 
									"' data-process='allocatebed' data-idRoom='" + room.id + 
									"'  data-dormName='" + room.dorm + "'  data-unitName='" + room.unit + 
									"'  data-roomName='" + room.name + "' data-bedName='" + room.bed.name + 
									"' data-idBed='" + room.bed.id + "' data-emailStudent='" + emailStudent + 
									"' data-idStudent='" + student._id + "' data-indexTrip='" + actualTrip + 
									"' data-start='" + student.documento.trips[actualTrip].start + 
									"' data-end='" + student.documento.trips[actualTrip].end + 
									"' data-occupancy='" + student.documento.trips[actualTrip].occupancy + 
									"'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + 
									"'>Allocate bed from " + separaDataMes(student.documento.trips[actualTrip].start, "-") + 
									" to " + separaDataMes(student.documento.trips[actualTrip].end, "-") + "</a></li>" +

									"<li  id='roomId_'" + room.id + "_" + room.bed.id + 
									"' data-process='allocatebeddata' data-idRoom='" + room.id + 
									"'  data-dormName='" + room.dorm + "'  data-unitName='" + room.unit + 
									"'  data-roomName='" + room.name + "' data-bedName='" + room.bed.name + 
									"' data-idBed='" + room.bed.id + "' data-emailStudent='" + emailStudent + 
									"' data-idStudent='" + student._id + "' data-indexTrip='" + actualTrip + 
									"' data-start='" + student.documento.trips[actualTrip].start + 
									"' data-end='" + student.documento.trips[actualTrip].end + 
									"' data-occupancy='" + student.documento.trips[actualTrip].occupancy + 
									"'><a data-toggle='modal' data-target='#bedAllocationModal' id='allocateRoom_" + room.bed.id + "_" + room.id + 
									"'>Allocate bed different date</a></li>";
									
//			}else{
//				availableBedText = "different type of bed";
//				availableBedCollor = "text-warning"				
//			}
		};
        if (student.documento.trips[actualTrip].status == "Confirmed"){
        	actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='sendlettertostudent'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Send confirmation letter</a></li>";
        };
        if (student.documento.trips[actualTrip].status == "DocsOk"){
        	actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='studentinhouse'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Student in house</a></li>";
    		actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='cancel'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Cancel</a></li>";
        };
        if (student.documento.trips[actualTrip].status == "InHouse"){
        	actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='terminate'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Terminated</a></li>";
    		actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='cancel'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Cancel</a></li>";
        };
        var visaCurrent = "";
        if (studentOccupancyData.lastVisa){
        	visaCurrent = "Visa: " + studentOccupancyData.lastVisa;
        };
        var paymentCurrent = "";
        if (studentOccupancyData.lastPayment){
        	paymentCurrent = studentOccupancyData.lastPayment;
        };
        var flightCurrent = "";
        if (studentOccupancyData.lastFlight){
        	flightCurrent = "Flight: " + studentOccupancyData.lastFlight;
        };
        var visaNext = "";
        if (studentOccupancyData.nextVisa){
        	visaNext = "Visa: " + studentOccupancyData.nextVisa;
        };
        var paymentNext = "";
        if (studentOccupancyData.nextPayment){
        	paymentNext = studentOccupancyData.nextPayment;
        };
        var flightNext = "";
        if (studentOccupancyData.nextFlight){
        	flightNext = "Flight: " + studentOccupancyData.nextFlight;
        };
        var litCurrentIn = "";
        var inCurrent = "";
        if (studentOccupancyData.lastIn){
        	litCurrentIn = "IN:";
        	inCurrent = separaDataMes(studentOccupancyData.lastIn, "-");
        };
        var litCurrentOut = "";
        var outCurrent = "";
        if (studentOccupancyData.lastOut){
        	litCurrentOut = "OUT:";
        	outCurrent = separaDataMes(studentOccupancyData.lastOut, "-");
        };
        var litNextIn = "";
        var inNext = "";
        if (studentOccupancyData.nextIn){
        	litNextIn = "IN:";
        	inNext = separaDataMes(studentOccupancyData.nextIn, "-");
        };
        var litNextOut = "";
        var outNext = "";
        if (studentOccupancyData.nextOut){
        	litNextOut = "OUT:";
        	outNext = separaDataMes(studentOccupancyData.nextOut, "-");
        };

        var bedValid = true;
        
        if (filters){
        	if (filters != localStorage.filters){
	        	var filter = filters.split(",");
	        	if (filter[0] != ""){
	        		var value = filter[0].split(":")[1];
					if (room.dorm.toLowerCase().indexOf(value.toLowerCase()) < 0){
						bedValid = false;
					};
	        	};
	        	if (filter[1] != ""){
	        		var value = filter[1].split(":")[1];
					if (room.unit.toLowerCase().indexOf(value.toLowerCase()) < 0){
						bedValid = false;
					};
	        	};
	        	if (filter[2] != ""){
	        		var value = filter[2].split(":")[1];
					if (room.name.toLowerCase().indexOf(value.toLowerCase()) < 0){
						bedValid = false;
					};
	        	};
	        	if (filter[3] != ""){
	        		var value = filter[3].split(":")[1];
					if (room.bed.name.toLowerCase().indexOf(value.toLowerCase()) < 0){
						bedValid = false;
					};
	        	};
	        	if (filter[4] != ""){
	        		var value = filter[4].split(":")[1];
	        		if (availableBedText.toLowerCase().indexOf(value.toLowerCase()) < 0){
	        			bedValid = false;
					};
	        	};
        	};
        };
        
        if (bedValid){
	        room_table.row.add( {
		    	"building":
		    		"<a href='dorm.html?idName=" + room.idDorm + "'>" +
		    			"<span>" + room.dorm +  "</span>" +
		    		"</a><br>" +
	    			"<span class='text text-table-main'>" + room.unit +  "</span><br>" +
	    			"<span class='text text-table-main'>" + room.name +  "</span><br>" +
	    			"<span class='text text-table-main'>" + room.bed.name +  "</span>" +
	    			"<span class='text text-table-main'> - " + room.bed.type +  "</span>" +
	    			"<span class='text text-table-main " + availableBedCollor + "'> - " + availableBedText +  "</span>",
		    	"current": 
	    			"<span class='text text-table-main'>" + studentOccupancyData.lastName + "</span><br>" +
	    			"<span class='text text-table-main'>" + studentOccupancyData.lastGender + " " + "</span>" +
	    			"<span class='text text-table-main'>" + studentOccupancyData.lastNationality + " " + "</span>" +
	    			"<span class='text text-table-main'>" + visaCurrent + " " + "</span><br>" +
	    			"<span class='text text-table-main'>" + paymentCurrent + " " + "</span>" +
	    			"<span class='text text-table-main'>" + studentOccupancyData.lastStatus + " " + "</span>" +
	    			"<span class='text text-table-main'>" + flightCurrent + " " + "</span>" +
	    			"<span class='text text-table-main'>" + studentOccupancyData.lastOccupancy + " " + "</span>",
	            "dates_01":
		    		"<span class='text text-table-main'>" + litCurrentIn +
	    			"<span class='text text-table-main'>" + inCurrent + "</span><br>" +
		    		"<span class='text text-table-main'>" + litCurrentOut + 
	    			"<span class='text text-table-main'>" + outCurrent + "</span><br>",
	            "next":
					"<span class='text text-table-main'>" + studentOccupancyData.nextName + "</span><br>" +
					"<span class='text text-table-main'>" + studentOccupancyData.nextGender + " " + "</span>" +
					"<span class='text text-table-main'>" + studentOccupancyData.nextNationality + " " + "</span>" +
					"<span class='text text-table-main'>" + visaNext + " " + "</span><br>" +
					"<span class='text text-table-main'>" + paymentNext + " " + "</span>" +
					"<span class='text text-table-main'>" + studentOccupancyData.nextStatus + " " + "</span>" +
					"<span class='text text-table-main'>" + flightNext + " " + "</span>" +
					"<span class='text text-table-main'>" + studentOccupancyData.nextOccupancy + " " + "</span>",
	            "dates_02":
		    		"<span class='text text-table-main'>" + litNextIn + 
					"<span class='text text-table-main'>" + inNext + "</span><br>" +
		    		"<span class='text text-table-main'>" + litNextOut +
					"<span class='text text-table-main'>" + outNext + "</span><br>",
	            'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button>' +
	            			'<ul id="listRoom" class="dropdown-menu">' +
	            				actions +
	            			'</ul></div>'
		    }).draw();
        };
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
	
	function lastNextOccupancy (occupancies, studentOccupancyData) {
		var objJson = JSON.parse(localStorage.getItem("student"));
		var actualTrip = objJson.documento.actualTrip;
		var startTrip = Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].start))); 
		var endTrip =  Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].end)));
	    $.each(occupancies, function (i, occupancy) {
			if (occupancy.idStudent){
				var startOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.startOccupancy))); 
				var endOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.endOccupancy)));
				
				if (endOccupancy < startTrip ){
					if (endOccupancy > studentOccupancyData.lastDate){	
						studentOccupancyData.lastName = occupancy.student.firstName + " " + occupancy.student.lastName
						studentOccupancyData.lastGender = occupancy.student.gender;
						studentOccupancyData.lastNationality = occupancy.student.nationality;
						studentOccupancyData.lastVisa = occupancy.student.visa;
						studentOccupancyData.lastPayment = occupancy.student.payment;
						studentOccupancyData.lastStatus = occupancy.student.trips[occupancy.student.actualTrip].status;
						studentOccupancyData.lastFlight = occupancy.student.trips[occupancy.student.actualTrip].arrivalFlightNumber;
						studentOccupancyData.lastOccupancy = occupancy.student.trips[occupancy.student.actualTrip].occupancy;
						studentOccupancyData.lastEmail = occupancy.student.mail,
						studentOccupancyData.lastIn = occupancy.startOccupancy,
						studentOccupancyData.lastOut = occupancy.endOccupancy,
						studentOccupancyData.lastDate = endTrip;
						studentOccupancyData.lastEmail = occupancy.student.mail;
						studentOccupancyData.lastDateShow = occupancy.student.endOccupancy;
					};
				};
				if (startOccupancy > endTrip){
					if (startOccupancy < studentOccupancyData.nextDate){	
						studentOccupancyData.nextName = occupancy.student.firstName + " " + occupancy.student.lastName
						studentOccupancyData.nextGender = occupancy.student.gender;
						studentOccupancyData.nextNationality = occupancy.student.nationality;
						studentOccupancyData.nextVisa = occupancy.student.visa;
						studentOccupancyData.nextPayment = occupancy.student.payment;
						studentOccupancyData.nextStatus = occupancy.student.trips[occupancy.student.actualTrip].status;
						studentOccupancyData.nextFlight = occupancy.student.trips[occupancy.student.actualTrip].arrivalFlightNumber;
						studentOccupancyData.nextOccupancy = occupancy.student.trips[occupancy.student.actualTrip].occupancy;
						studentOccupancyData.nextEmail = occupancy.student.mail,
						studentOccupancyData.nextIn = occupancy.startOccupancy,
						studentOccupancyData.nextOut = occupancy.endOccupancy,
						studentOccupancyData.nextDate = endTrip;
						studentOccupancyData.nextEmail = occupancy.student.mail;
						studentOccupancyData.nextDateShow = occupancy.student.startOccupancy;
					};
				};
			};
	    });
	    return studentOccupancyData;
	};

	
	function bedsOccupied (occupancies, studentOccupancyData) {
		var objJson = JSON.parse(localStorage.getItem("student"));
		var actualTrip = objJson.documento.actualTrip;
		var startTrip = Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].start))); 
		var endTrip =  Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].end)));
		var occupied = null;
	    $.each(occupancies, function (i, occupancy) {
			if (occupancy.idStudent){
				var startOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.startOccupancy))); 
				var endOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.endOccupancy)));
				
				if (startTrip >= startOccupancy && startTrip <= endOccupancy){
					occupied = occupancy.student.trips[occupancy.student.actualTrip].status;
					studentOccupancyData.lastName = occupancy.student.firstName + " " + occupancy.student.lastName
					studentOccupancyData.lastGender = occupancy.student.gender;
					studentOccupancyData.lastNationality = occupancy.student.nationality;
					studentOccupancyData.lastVisa = occupancy.student.visa;
					studentOccupancyData.lastPayment = occupancy.student.payment;
					studentOccupancyData.lastStatus = occupancy.student.trips[occupancy.student.actualTrip].status;
					studentOccupancyData.lastFlight = occupancy.student.trips[occupancy.student.actualTrip].arrivalFlightNumber;
					studentOccupancyData.lastOccupancy = occupancy.student.trips[occupancy.student.actualTrip].occupancy;
					studentOccupancyData.lastEmail = occupancy.student.mail,
					studentOccupancyData.lastIn = occupancy.startOccupancy,
					studentOccupancyData.lastOut = occupancy.endOccupancy,
					studentOccupancyData.lastDate = endTrip;
					studentOccupancyData.lastEmail = occupancy.student.mail;
					studentOccupancyData.lastDateShow = occupancy.student.endOccupancy;
				};
				if (endTrip >= startOccupancy && endTrip <= endOccupancy){
					occupied = occupancy.student.trips[occupancy.student.actualTrip].status;				
					studentOccupancyData.lastName = occupancy.student.firstName + " " + occupancy.student.lastName
					studentOccupancyData.lastGender = occupancy.student.gender;
					studentOccupancyData.lastNationality = occupancy.student.nationality;
					studentOccupancyData.lastVisa = occupancy.student.visa;
					studentOccupancyData.lastPayment = occupancy.student.payment;
					studentOccupancyData.lastStatus = occupancy.student.trips[occupancy.student.actualTrip].status;
					studentOccupancyData.lastFlight = occupancy.student.trips[occupancy.student.actualTrip].arrivalFlightNumber;
					studentOccupancyData.lastOccupancy = occupancy.student.trips[occupancy.student.actualTrip].occupancy;
					studentOccupancyData.lastEmail = occupancy.student.mail,
					studentOccupancyData.lastIn = occupancy.startOccupancy,
					studentOccupancyData.lastOut = occupancy.endOccupancy,
					studentOccupancyData.lastDate = endTrip;
					studentOccupancyData.lastEmail = occupancy.student.mail;
					studentOccupancyData.lastDateShow = occupancy.student.endOccupancy;
				};
				if (startTrip <= startOccupancy && endTrip >= endOccupancy){
					occupied = occupancy.student.trips[occupancy.student.actualTrip].status;
					studentOccupancyData.lastName = occupancy.student.firstName + " " + occupancy.student.lastName
					studentOccupancyData.lastGender = occupancy.student.gender;
					studentOccupancyData.lastNationality = occupancy.student.nationality;
					studentOccupancyData.lastVisa = occupancy.student.visa;
					studentOccupancyData.lastPayment = occupancy.student.payment;
					studentOccupancyData.lastStatus = occupancy.student.trips[occupancy.student.actualTrip].status;
					studentOccupancyData.lastFlight = occupancy.student.trips[occupancy.student.actualTrip].arrivalFlightNumber;
					studentOccupancyData.lastOccupancy = occupancy.student.trips[occupancy.student.actualTrip].occupancy;
					studentOccupancyData.lastEmail = occupancy.student.mail,
					studentOccupancyData.lastIn = occupancy.startOccupancy,
					studentOccupancyData.lastOut = occupancy.endOccupancy,
					studentOccupancyData.lastDate = endTrip;
					studentOccupancyData.lastEmail = occupancy.student.mail;
					studentOccupancyData.lastDateShow = occupancy.student.endOccupancy;
				};
			};
	    });
	    return occupied;
	};	
	
	function updateBeds (objRoom, objBed) {
		var objStudent = JSON.parse(localStorage.getItem("student"));
		var occupancy = 
			{
			idStudent : objStudent._id,
            startOccupancy : objBed.start ,
            endOccupancy : objBed.end
			};
	    $.each(objRoom.documento.beds, function (i, bed) {
	    	if (bed.id == objBed.idBed){
	    		if (objRoom.documento.beds[i].occupancies){
	    			objRoom.documento.beds[i].occupancies.push(occupancy);
	    		}else{
	    			objRoom.documento.beds[i].occupancies = [];
	    			objRoom.documento.beds[i].occupancies.push(occupancy);
	    		};
	    	};
	    });
		rest_atualizaRoom(objRoom, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms update", "Problems to update rooms, try again")
		var objStudent = JSON.parse(localStorage.getItem("student"));
		objStudent.documento.trips[objStudent.documento.actualTrip].idRoom = objBed.idRoom;
		objStudent.documento.trips[objStudent.documento.actualTrip].idBed = objBed.idBed;
		objStudent.documento.trips[objStudent.documento.actualTrip].dormName = objBed.dormName;
		objStudent.documento.trips[objStudent.documento.actualTrip].unitName = objBed.unitName;
		objStudent.documento.trips[objStudent.documento.actualTrip].roomName = objBed.roomName;
		objStudent.documento.trips[objStudent.documento.actualTrip].bedName = objBed.bedName;
		objStudent.documento.trips[objStudent.documento.actualTrip].status = "Allocated";
		delete objStudent.contact;
		delete objStudent.rooms;
		delete objStudent.family;
		delete objStudent.room;
		rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Room name included", "Problems to update student, try again")
		
	};
