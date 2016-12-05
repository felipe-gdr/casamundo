/**
 * 
 */

// **** exemplo parameters startDate=2016-01-01, size=366 (numero de dias), scale=Day

function setupDayPilot (startDate, size, scale, startNewEvent, endNewEvent, eventName, student, par_startTrip, par_endTrip, idStudent, actualTrip){
	
	var difDiasTripAllocate = calculaDias(separaConverteDataMes(par_startTrip, "/"), separaConverteDataMes(par_endTrip, "/")) + 1;
	
//	xxendNewEvent = DayPilot.Date(endNewEvent).addDays(10);
	var newEventCreated = null;

    var dp = new DayPilot.Scheduler("dp");

    // behavior and appearance
    dp.theme = "scheduler_traditional";
    
    dp.startDate = startDate;
    dp.days = size;
    dp.scale = scale;
    dp.timeHeaders = [
        { groupBy: "Month", format: "MMM yyyy" },
        { groupBy: "Cell", format: "ddd d" }
    ];

    dp.bubble = new DayPilot.Bubble();

    dp.contextMenu = new DayPilot.Menu({items: [
//        {text:"Edit", onclick: function() { dp.events.edit(this.source); } },
//        {text:"Delete", onclick: function() { dp.events.remove(this.source); } },
//        {text:"-"},
//        {text:"Select", onclick: function() { dp.multiselect.add(this.source); } },
    ]});

    dp.treeEnabled = true;

    dp.heightSpec = "Max";
    dp.height = 600;

    dp.eventMovingStartEndEnabled = true;
    dp.eventResizingStartEndEnabled = true;
    dp.timeRangeSelectingStartEndEnabled = true;

    dp.onBeforeEventRender = function(args) {

    	changeEvent (dp, args);    

    };

    dp.onBeforeResHeaderRender = function(args) {
    };

    dp.onBeforeRowHeaderRender = function(args) {

    };

    dp.onBeforeCellRender = function(args) {
    };

    dp.onEventMove = function(args) {
    	checkDates(dp, args, args.e.data.student_usedDays);
    };

    dp.onEventMoved = function (args) {
    	
    	if (args.e.data.oldResource != args.e.data.resource){
    		deallocate (args.e.data, args, dp);
    		args.e.data.oldResource = args.e.data.resource;
    	};

    };

    dp.onEventResize = function(args) {
    	
    	if (args.newStart != args.e.data.start){
    		args.newStart = DayPilot.Date(args.newStart).addHours(12);
    	};
    	if (args.newEnd != args.e.data.end){
    		args.newEnd = DayPilot.Date(args.newEnd).addHours(-12);
    	};
    	checkDates(dp, args, args.e.data.student_usedDays);

    };

    dp.onEventResized = function (args) {
    	
   		deallocate (args.e.data, args, dp);
   		args.e.data.occupancy.startOccupancy = converteDayPilotDate(args.e.data.start, "", true);
   		args.e.data.occupancy.endOccupancy = converteDayPilotDate(args.e.data.end, "", true);
    
    };

    // event creating
    dp.onTimeRangeSelected = function (args) {
    };

    dp.separators = [
        {color:"Red", location:"2016-11-30T00:00:00", layer: "BelowEvents"}
    ];

    dp.treePreventParentUsage = true;

    
    dp.onRowClick = function (args) {
    	if (newEventCreated){
        	dp.events.remove(newEventCreated).queue();
    	};
    	var occupancy = {
    			idStudent : idStudent,
    			startOccupancy : par_startTrip,
    			endOccupancy : par_endTrip,
    			actualTrip : actualTrip
    	};
    	var data = {
                start: startNewEvent,
                end: endNewEvent,
                id: DayPilot.guid(),
                resource: args.resource.id,
                text: eventName,
                resource : args.resource.data.room_bed,
                occupancy : occupancy,
                idStudent : idStudent,
    	        actualTrip: actualTrip,
    	        student : student,
    	        student_daysTrip : difDiasTripAllocate,
    	        student_usedDays : 0,
    	        newAllocated : false
            };
        var e = new DayPilot.Event({
            start: startNewEvent,
            end: endNewEvent,
            id: DayPilot.guid(),
            resource: args.resource.id,
            text: eventName,
            resource : args.resource.data.room_bed,
            occupancy : occupancy,
            idStudent : idStudent,
            actualTrip: actualTrip,
            student : student,
            student_daysTrip : difDiasTripAllocate,
            student_usedDays : 0,
            newAllocated : false,
            newStart: startNewEvent,
            newEnd: endNewEvent
        });
        var args = {
        		e : e,
                newStart: startNewEvent,
                newEnd: endNewEvent,
                newResource : args.resource.data.room_bed
        };
        
        localStorage.insert = "true";

        var param = 
        	{	dp:dp,
        		args:args,
        		e,
        		data,
        		startNewEvent:startNewEvent
        	};

        rest_obterStudent(null, checkDatesCall, obtencaoNaoEfetuada, param, dp, actualTrip, idStudent)
    	
    };
    
    return dp;
};

function createEvent (args, newEventCreated){
	if (newEventCreated){
    	dp.events.remove(newEventCreated).queue();
	};
	var occupancy = {
			idStudent : idStudent,
			startOccupancy : par_startTrip,
			endOccupancy : par_endTrip,
			actualTrip : actualTrip
	};
	var data = {
            start: startNewEvent,
            end: endNewEvent,
            id: DayPilot.guid(),
            resource: args.resource.id,
            text: eventName,
            resource : args.resource.data.room_bed,
            occupancy : occupancy,
            idStudent : idStudent,
	        actualTrip: actualTrip,
	        student : student,
	        student_daysTrip : difDiasTripAllocate,
	        student_usedDays : 0,
	        newAllocated : false
        };
    var e = new DayPilot.Event({
        start: startNewEvent,
        end: endNewEvent,
        id: DayPilot.guid(),
        resource: args.resource.id,
        text: eventName,
        resource : args.resource.data.room_bed,
        occupancy : occupancy,
        idStudent : idStudent,
        actualTrip: actualTrip,
        student : student,
        student_daysTrip : difDiasTripAllocate,
        student_usedDays : 0,
        newAllocated : false,
        newStart: startNewEvent,
        newEnd: endNewEvent
    });
    var args = {
    		e : e,
            newStart: startNewEvent,
            newEnd: endNewEvent,
            newResource : args.resource.data.room_bed
    };
    
    localStorage.insert = "true";

    var param = 
    	{	dp:dp,
    		args:args,
    		e,
    		data,
    		startNewEvent:startNewEvent
    	};

    rest_obterStudent(null, checkDatesCall, obtencaoNaoEfetuada, param, dp, actualTrip, idStudent)
	
};

function checkDatesCall (objStudent, param, dp){

	if (checkDates(param.dp, param.args, objStudent, daysUsed(objStudent.rooms_actualTrip))){
    	param.dp.events.add(param.e, param.data);
        newEventCreated = param.e;
	    param.dp.scrollTo(param.startNewEvent, false,  "middle");        	
	    updateAllocation (param.args, addAllocation, dp);
    };
};

function montaMiniDashboard (args, actualTrip){
	
	var bubleMiniDashboard =
		'<div class="smart-form miniDasboard">' +							
			"<div><b>" + " " + args.data.html + "</b></div>" + 
			"<div>" + new DayPilot.Date(args.data.start).toString("M/d/yyyy") + 
			" " + new DayPilot.Date(args.data.end).toString("M/d/yyyy") + "</div>" + 
			"<div>" + args.data.student.trips[actualTrip].status + 
			" " + args.data.student.gender + "</div>" +
			"<div>" + args.data.student.trips[actualTrip].occupancy + "</div>" +
		'</div>';
	
	var bubleMiniDashboardxxx = 
		'<div class="row smart-form miniDasboard">' +							
			'<div class="col-sm-12">' +
				'<section >' +
					'<div class="col-sm-2">' +	
						'<i class="fa fa-user"></i>' +
					'</div>' +
					'<div class="col-sm-9">' +
						'<label>' +
							args.data.html
						'</label>' +
					'</div>' +
				'</section>' +
			'</div>' +
			'<div class="col-sm-6">' +
				'<section >' +
					'<div class="col-sm-2">' +	
						'<i class="fa fa-unsorted"></i>' +
					'</div>' +
					'<div class="col-sm-9">' +
						'<label>' +
							new DayPilot.Date(args.data.start).toString("M/d/yyyy")
						'</label>' +
					'</div>' +
				'</section>' +
			'</div>' +
			'<div class="col-sm-6">' +
				'<section >' +
					'<div class="col-sm-2">' +	
						'<i class="fa fa-unsorted"></i>' +
					'</div>' +
					'<div class="col-sm-9">' +
						'<label>' +
							new DayPilot.Date(args.data.end).toString("M/d/yyyy")
						'</label>' +
					'</div>' +
				'</section>' +
			'</div>' +
			'<div class="col-sm-6">' +
				'<section >' +
					'<div class="col-sm-2">' +	
						'<i class="fa fa-unsorted"></i>' +
					'</div>' +
					'<div class="col-sm-9">' +
						'<label>' +
							args.data.student.trips[actualTrip].status
						'</label>' +
					'</div>' +
				'</section>' +
			'</div>' +
			'<div class="col-sm-6">' +
				'<section >' +
					'<div class="col-sm-2">' +	
						'<i class="fa fa-unsorted"></i>' +
					'</div>' +
					'<div class="col-sm-9">' +
						'<label>' +
							args.data.student.trips[actualTrip].occupancy
						'</label>' +
					'</div>' +
				'</section>' +
			'</div>' +
			'<div class="col-sm-6">' +
				'<section >' +
					'<div class="col-sm-2">' +	
						'<i class="fa fa-unsorted"></i>' +
					'</div>' +
					'<div class="col-sm-9">' +
						'<label>' +
							args.data.student.gender
						'</label>' +
					'</div>' +
				'</section>' +
			'</div>' +
			'<div class="col-sm-6">' +
				'<section >' +
					'<div class="col-sm-3">' +	
						'<i class="fa fa-fighter-jet"></i>' +
					'</div>' +
					'<div class="col-sm-4">' +
						'<label class="col-sm-12" type="text" id="flightMinDashboard" name="flightMinDashboard">AC78</label>' +
					'</div>' +
				'</section>' +
			'</div>' +
			'</div>' +
			'<div class="row">' +							
				'<div class="col-sm-6">' +
					'<section >' +
						'<div class="col-sm-2">' +	
							'<i class="fa  fa-flag-checkered"></i>' +
						'</div>' +
						'<div class="col-sm-4">' +
							'<label class="toggle text-info">' +
								'<input type="checkbox" id="creditCardMinDashboard" name="creditCardMinDashboard">' +
								'<i data-swchon-text="Yes" data-swchoff-text="No"></i></label>' +
						'</div>' +
					'</section>' +
				'</div>' +
				'<div class="col-sm-6">' +
					'<section >' +
						'<div class="col-sm-2">' +	
							'<i class="fa fa-usd"></i>' +
						'</div>' +
						'<div class="col-sm-4">' +
							'<label class="toggle text-info">' +
								'<input type="checkbox" id="paymentMinDashboard" name="paymentMinDashboard">' +
								'<i data-swchon-text="Yes" data-swchoff-text="No"></i></label>' +
						'</div>' +
					'</section>' +
				'</div>' +
			'</div>' +
			'<br>' +
			'<div class="row">' +							
				'<div class="col-sm-6">' +
					'<section >' +
						'<div class="col-sm-3">' +	
							'<i class="fa fa-taxi"></i>' +
						'</div>' +
						'<div class="col-sm-4">' +
							'<label class="text-success" id="pickupMinDashboard" name="pickupMinDashboard">Yes</label>' +
						'</div>' +
					'</section>' +
				'</div>' +
				'<div class="col-sm-6">' +
					'<section >' +
						'<div class="col-sm-3">' +	
							'<i class="fa fa-undo"></i>' +
						'</div>' +
						'<div class="col-sm-4">' +
							'<label class="text-danger" id="pickupMinDashboard" name="pickupMinDashboard">No</label>' +
						'</div>' +
					'</section>' +
				'</div>' +
			'</div>' +
		'</div>';
	
	return bubleMiniDashboard;
			
};

function checkDates(dp, args, objStudent, usedDays){
	
	var actualTrip = args.e.data.actualTrip;
	var statusCollor = "#ffff80";
	var startTrip = new DayPilot.Date(separadorAnoMesDia(args.e.data.student.trips[actualTrip].start, "-") + "T12:00:00");
	var endTrip = new DayPilot.Date(separadorAnoMesDia(args.e.data.student.trips[actualTrip].end, "-") + "T12:00:00");
	var valid = true;
	
    switch (args.e.data.student.trips[actualTrip].status) {
	case "Available":
		resize = true
        break;
    case "Confirmed":
    	resize = true
        break;
    case "Allocated":
    	resize = true
        break;
    case "Partially allocated":
    	resize = true
        break;
    case "Placement offered":
    	resize = false
        break;
    case "Checked out":
    	resize = false
        break;
    case "In house":
    	resize = false
        break;
    case "Documents":
    	resize = false
        break;
    default: 
    	resize = false
    };	    
    if (!resize) {
        args.preventDefault();
        dp.message(
        		"Student: " +
        		args.e.data.student.firstName + " " + 
        		args.e.data.student.lastName + 
        		" - status: " + 
        		args.e.data.student.trips[args.e.data.actualTrip].status +
        		" cannot be resized.");
        valid = false;
    }else{
    	if (DayPilot.Date(args.newStart) < DayPilot.Date(startTrip)){
            args.preventDefault();
            dp.message(
            		"Student: " +
            		args.e.data.student.firstName + " " + 
            		args.e.data.student.lastName + 
            		" - status: " + 
            		args.e.data.student.trips[args.e.data.actualTrip].status +
            		" cannot be less than start date " +
            		new DayPilot.Date(startTrip).toString("M/d/yyyy"));
            valid = false;
    	};
    	if (DayPilot.Date(args.newEnd) > DayPilot.Date(endTrip)){
            args.preventDefault();
            dp.message(
            		"Student: " +
            		args.e.data.student.firstName + " " + 
            		args.e.data.student.lastName + 
            		" - status: " + 
            		args.e.data.student.trips[args.e.data.actualTrip].status +
            		" cannot be greater than end date " +
            		new DayPilot.Date(endTrip).toString("M/d/yyyy"));
            valid = false;
    	};
    	var difDays = calculaDias (DayPilot.Date(args.newStart).getDay() + "/" + 
    				 				(DayPilot.Date(args.newStart).getMonth() + 1) + "/" + 
    				 				DayPilot.Date(args.newStart).getYear(), 
    				 				DayPilot.Date(args.newEnd).getDay() + "/" + 
    				 				(DayPilot.Date(args.newEnd).getMonth() + 1) + "/" + 
    				 				DayPilot.Date(args.newEnd).getYear()) + 1;
    	
    	if ((parseInt(usedDays) + difDays) > parseInt(args.e.data.student_daysTrip)){
            if (args.preventDefault){
            	args.preventDefault();
            };
            var daysAllocatted = parseInt(usedDays) + difDays;
            dp.message(
            		"Student: " +
            		args.e.data.student.firstName + " " + 
            		args.e.data.student.lastName + 
            		" - status: " + 
            		args.e.data.student.trips[args.e.data.actualTrip].status +
            		" total days allocated (" + daysAllocatted +  ") greater than total days trip (" + args.e.data.student_daysTrip +  ")");
            valid = false;
    	};
    };	
    
    return valid;
};

function changeEvent (dp, args){
	
	if (args.data){
		var data = args.data
	}else{
		var data = args.e.data
	};
	var actualTrip = data.actualTrip;
	var statusCollor = "#ffff80";
    switch (data.student.trips[actualTrip].status) {
	case "Available":
		statusCollor = "#00ff00"
        break;
    case "Confirmed":
    	statusCollor = "#0080ff"
        break;
    case "Allocated":
    	statusCollor = "#008a00"
        break;;
    case "Partially allocated":
    	statusCollor = "#15ffff"
        break;
    case "Placement offered":
    	statusCollor = "#d7d700"
        break;
    case "Checked out":
    	statusCollor = "#c0c0c0"
        break;
    case "In house":
    	statusCollor = "#d2d06a"
        break;
    case "Documents":
    	statusCollor = "#ff8040"
        break;
    default: 
    	statusCollor = "#ffff80"
    };	    
	args.e.backColor = statusCollor;
	if (data.student.gender == "Male"){
		args.e.fontColor = "#FFFFFF";
		args.e.barColor = "#0000ff";
		iconGender = "fa-male";
	}else{
		args.e.fontColor = "#ff73b9";
		args.e.barColor = "#ff73b9";
		iconGender = "fa-female";
	};
	
	if (args.data){
		args.data.bubbleHtml = montaMiniDashboard (args, actualTrip);
	};
    if (localStorage.insert == "true"){
    	if (dp){
    		dp.message("Included: " + args.data.text + " start: " + new DayPilot.Date(args.data.start).toString("M/d/yyyy") + " end: " + new DayPilot.Date(args.data.end).toString("M/d/yyyy"));
    	};
    };
    
	localStorage.insert = "false";
	
};

function updateAllocation (args, nextAction, dp){
	
	if (args.newResource){
		var data = args.newResource;
	}else{
		var data = args.e.data.resource;
	};
	var objJson = {
			idDorm : data.idDorm,
			idUnit : data.idUnit,
			idRoom : data.idRoom,
			idBed : data.idBed,
			idStudent : args.e.data.idStudent,
			dormName : data.dormName,
			unitName : data.unitName,
			roomName : data.roomName,
			bedName : data.bedName,
			start : converteDayPilotDate(args.newStart,"", true),
			end : converteDayPilotDate(args.newEnd,"", true),
			actualTrip : args.e.data.occupancy.actualTrip
	};
	
	rest_obterRoom(data.idRoom, nextAction, semAcao, objJson, "Allocated", args.e.data.occupancy.actualTrip, args, dp);
};

function deallocate (data, args, dp){
	var objJson = {
			idDorm : data.oldResource.idDorm,
			idUnit : data.oldResource.idUnit,
			idRoom : data.oldResource.idRoom,
			idBed : data.oldResource.idBed,
			idStudent : data.idStudent,
			dormName : data.oldResource.dormName,
			unitName : data.oldResource.unitName,
			roomName : data.oldResource.roomName,
			bedName : data.oldResource.bedName,
			start : data.occupancy.startOccupancy,
			end : data.occupancy.endOccupancy,
			actualTrip : data.occupancy.actualTrip
	};
	
	rest_obterRoom(data.oldResource.idRoom, deallocation, semAcao, objJson, "Allocated", data.occupancy.actualTrip, args, dp);
};