	
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
	    				$(window.document.location).attr('href','students.html?typePage=accommodation-dorms');

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
			if ((student.documento.trips[actualTrip].occupancy == "Single" && room.bed.type == "Single") |
				(student.documento.trips[actualTrip].occupancy == "Couple" && room.bed.type == "Couple")){
				bedAvailable = true;
				actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='offerbed,'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Allocate bed</a></li>";
			};
		};
        if (student.documento.trips[actualTrip].status == "Confirmed"){
        	actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='sendlettertostudent,'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Send confirmation letter</a></li>";
        };
        if (student.documento.trips[actualTrip].status == "DocsOk"){
        	actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='studentinhouse,'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Student in house</a></li>";
    		actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='cancel'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Cancel</a></li>";
        };
        if (student.documento.trips[actualTrip].status == "InHouse"){
        	actions = actions + "<li  id='roomId_'" + room.id + "_" + room.bed.id + "' data-process='terminate,'  data-idRoom='" + room.id + "' data-emailStudent='" + emailStudent + "' data-indexTrip='" + actualTrip + "' data-start='" + student.documento.trips[actualTrip].start + "' data-end='" + student.documento.trips[actualTrip].end + "' ' data-occupancy='" + student.documento.trips[actualTrip].occupancy + "'><a href='#' id='allocateRoom_" + room.bed.id + "_" + room.id + "'>Terminated</a></li>";
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
		    		"<span class='hide'>" + calculaPontuacaoRoom(room,JSON.parse(localStorage.getItem("student"))) + "</span>" +
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
