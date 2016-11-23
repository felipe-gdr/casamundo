/**
 * 
 */	
	function montaAccommodationRoom (actualTrip){

		/*** 		carrega student
		 */
		var objStudent = JSON.parse(localStorage.getItem("student"));
		
		/**
		 * 				obter os dados
		 */
		if (objStudent.documento.trips[objStudent.documento.actualTrip].destination){
			rest_obterBedsAll(montaCalendario, semAcao, objStudent.documento.trips[actualTrip].destination);
		};
	};

	function montaCalendario (objJson) {

		// *** setup bib day pilot
		var today = new Date();
		var yearToday = today.getYear() + 1900; 
		var setDate = yearToday + "-" + today.getMonth() + "-" + today.getDate();
		var dp = setupDayPilot (setDate, 366, "Day");
    	
	    var dormName = "";
	    var unitName = "";
	    var roomName = "";
    	var indexDorm = 0;
    	var indexUnit = 0;
    	var indexRoom = 0;
	    var resources = [];
	    $.each(objJson, function (i, room) {
	        if (room.dorm != dormName){
	        	var dormUnit = 
	        		{
	        			name: "Dorm: " + room.dorm, 
	        			id: room.idDorm,	 
	        			expanded: true, 
	        			children:[]
	        		};
	        	resources.push(dormUnit);
	        	indexDorm = resources.length - 1; 
	    	    unitName = "";
	    	    roomName = "";
	        };
	        if (room.unit != unitName){
	        	var unitUnit = 
        		{
        			name: "Unit:" + room.unit, 
        			id: room.idDorm + room.idUnit,	 
        			expanded: true, 
        			children:[]
        		};
	        	resources[indexDorm].children.push(unitUnit);
	        	indexUnit = resources[indexDorm].children.length - 1;
	    	    roomName = "";
	        };
	        if (room.name != roomName){
	        	var roomUnit = 
        		{
        			name: "Room:" + room.name, 
        			id: room.id,	 
        			expanded: true, 
        			children:[]
        		};
	        	resources[indexDorm].children[indexUnit].children.push(roomUnit);
	        	indexRoom = resources[indexDorm].children[indexUnit].children.length - 1;
	        };

        	var bedUnit = 
    		{
    			name: "Bed:" + room.bed.name, 
    			id: room.id + room.bed.id,	 
    		};
        	resources[indexDorm].children[indexUnit].children[indexRoom].children.push(bedUnit);
        	
	        dormName = room.dorm;
    	    unitName = room.unit;
    	    roomName = room.name;
	    });

	    dp.resources = resources;

	    dp.init();

	    dp.scrollTo(setDate);

	};

	function montaLinhaTree(dp, name, tipo){
		
	};

	function montaLinhaBed(i, dp, room){

        var student = JSON.parse(localStorage.getItem("student"));
        
        if (room.dorm != dormName){
        	montaLinhaDorm(dp, dorm);
        	dormName = room.dorm;
        };

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
				
				if (endOccupancy <= startTrip ){
					if (endOccupancy > studentOccupancyData.lastDate){	
						studentOccupancyData.lastName = occupancy.student.firstName + " " + occupancy.student.lastName
						studentOccupancyData.lastGender = occupancy.student.gender;
						studentOccupancyData.lastNationality = occupancy.student.nationality;
						studentOccupancyData.lastVisa = "No";
						studentOccupancyData.lastPayment = "No";
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
						studentOccupancyData.nextVisa = "No";
						studentOccupancyData.nextPayment = "No";
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
		var occupied = null;
		if (objJson.rooms == null | objJson.rooms == ""){
			occupied = checkBedOccupied (occupancies, studentOccupancyData, objJson.documento.trips[actualTrip].start, objJson.documento.trips[actualTrip].end)
		}else{
			if (objJson.rooms){
			    $.each(objJson.rooms, function (i, room) {
			    	$.each(room.documento.beds, function (i, bed) {
			    		$.each(bed.occupancies, function (w, occupancy) {
				    		var startTrip = Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].start))); 
				    		var endTrip =  Date.parse(new Date(separaAnoMesDia(objJson.documento.trips[actualTrip].end)));
							var startOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.startOccupancy))); 
							var endOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.endOccupancy)));
							if (startOccupancy != startTrip){
								occupied = checkBedOccupied (occupancies, studentOccupancyData, objJson.documento.trips[actualTrip].start, occupancy.startOccupancy)						
							}else{
								occupied = checkBedOccupied (occupancies, studentOccupancyData, occupancy.endOccupancy, objJson.documento.trips[actualTrip].end)
							};
			    		});
			    	});
			    });
			};
		};
	    return occupied;
	};
	
	function checkBedOccupied (occupancies, studentOccupancyData, startTripOrigin, endTripOrigin){
		var occupied = null;
		var startTrip = Date.parse(new Date(separaAnoMesDia(startTripOrigin))); 
		var endTrip =  Date.parse(new Date(separaAnoMesDia(endTripOrigin)));
	    $.each(occupancies, function (i, occupancy) {
			if (occupancy.idStudent){
				var startOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.startOccupancy))); 
				var endOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.endOccupancy)));
				
				if (startTrip >= startOccupancy && startTrip < endOccupancy){
					occupied = occupancy.student.trips[occupancy.student.actualTrip].status;
					studentOccupancyData.lastName = occupancy.student.firstName + " " + occupancy.student.lastName
					studentOccupancyData.lastGender = occupancy.student.gender;
					studentOccupancyData.lastNationality = occupancy.student.nationality;
					studentOccupancyData.lastVisa = "No";
					studentOccupancyData.lastPayment = "No";
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
					studentOccupancyData.lastVisa = "No";
					studentOccupancyData.lastPayment = "No";
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
					studentOccupancyData.lastVisa = "No";
					studentOccupancyData.lastPayment = "No";
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
	
	function updateBeds (objRoom, objBed, status) {
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
	    //
	    //**** verificar o fim das alocações das datas parciais informadas
	    //
	    var initialDateOk = false;
	    var endDateOk = false;
	    if (objStudent.documento.trips[objStudent.documento.actualTrip].start == objBed.start){
	    	initialDateOk = true;
	    };
	    if (objStudent.documento.trips[objStudent.documento.actualTrip].end == objBed.end){
	    	endDateOk = true;
	    };
		if (objStudent.rooms != null && objStudent.rooms != ""){
		    $.each(objStudent.rooms, function (i, room) {
		    	$.each(room.documento.beds, function (i, bed) {
		    		$.each(bed.occupancies, function (w, occupancy) {
						if (occupancy.idStudent == objStudent._id){
						    if (objStudent.documento.trips[objStudent.documento.actualTrip].start == occupancy.startOccupancy){
						    	initialDateOk = true;
						    };
						    if (objStudent.documento.trips[objStudent.documento.actualTrip].end == endOccupancy){
						    	endDateOk = true;
						    };
						};
		    		});
		    	});
		    });
		};
	
		if (status == "Partially allocated"){
			if (initialDateOk == true && endDateOk == true){
				status = "Allocated";
			};
		};
		rest_atualizaRoom(objRoom, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Rooms update", "Problems to update rooms, try again")
		var objStudent = JSON.parse(localStorage.getItem("student"));
		objStudent.documento.trips[objStudent.documento.actualTrip].idRoom = objBed.idRoom;
		objStudent.documento.trips[objStudent.documento.actualTrip].idBed = objBed.idBed;
		objStudent.documento.trips[objStudent.documento.actualTrip].dormName = objBed.dormName;
		objStudent.documento.trips[objStudent.documento.actualTrip].unitName = objBed.unitName;
		objStudent.documento.trips[objStudent.documento.actualTrip].roomName = objBed.roomName;
		objStudent.documento.trips[objStudent.documento.actualTrip].bedName = objBed.bedName;
		objStudent.documento.trips[objStudent.documento.actualTrip].status = status;
		delete objStudent.contact;
		delete objStudent.rooms;
		delete objStudent.family;
		delete objStudent.room;
		rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Room name included", "Problems to update student, try again")
		
	};

function montaDp (){

	var dp = new DayPilot.Scheduler("dp");

    // behavior and appearance
    dp.theme = "scheduler_traditional";

    dp.startDate = "2016-01-01";
    dp.days = 366;
    dp.scale = "Day";
    dp.timeHeaders = [
        { groupBy: "Month", format: "MMM yyyy" },
        { groupBy: "Cell", format: "d" }
    ];

    dp.bubble = new DayPilot.Bubble();
    dp.resourceBubble = new DayPilot.Bubble();

    dp.contextMenu = new DayPilot.Menu({items: [
        {text:"Edit", onclick: function() { dp.events.edit(this.source); } },
        {text:"Delete", onclick: function() { dp.events.remove(this.source); } },
        {text:"-"},
        {text:"Select", onclick: function() { dp.multiselect.add(this.source); } },
    ]});

    dp.treeEnabled = true;
    dp.resources = [
                 { name: "2Glen Elm", id: "G1",	 expanded: false, children:[
                		 { name: "11", 
                			 id: "U1", 
                			 expanded: false, 
                			 children:[
                				 { name: "1", 
                					 id: "Q1", 
                					 expanded: false, 
                					 children:[
                						 { name : "Bed 1", 
                							 id : "A" },
               							 { name : "Bed 2", id : "B" }
                							 ]
                				 }
                         ]
                     },
                     { name: "12", id: "U1", expanded: false, children:[
                         { name: "1", id: "Q1", expanded: false, children:[
	                         { name : "Bed 1", id : "C" },
   		                     { name : "Bed 2", id : "D" }
                         	
	                         ]
                         }
                         ]
                     },
                     { name: "13", id: "U1", expanded: false, children:[
                         { name: "1", id: "Q1", expanded: false, children:[
	                         { name : "Bed 1", id : "E" },
   		                     { name : "Bed 2", id : "F" }
                         	
	                         ]
                         }
                         ]
                     }
                     
                     ]
                 },
                 { name: "Jose Tower", id: "G2", expanded: true, children:[
                     { name: "A", id: "U2", expanded: true, children:[
                         { name: "1", id: "Q2", expanded: true, children:[
	                         { name : "Bed 1", id : "G" },
   		                     { name : "Bed 2", id : "H" }
                         	
	                         ]
                         }
                         ]
                     }
                     ]
                 },
                 { name: "Empire Jose", id: "G3", expanded: true, children:[
                     { name: "Apto B", id: "U3", expanded: true, children:[
                         { name: "1", id: "Q3", expanded: true, children:[
	                         { name : "Bed 1", id : "I" },
   		                     { name : "Bed 2", id : "J" }
                         	
	                         ]
                         }
                         ]
                     }
                     ]
                 },
                ];

    dp.heightSpec = "Max";
    dp.height = 500;

    dp.events.list = [];

    for (var i = 0; i < 12; i++) {
        var duration = Math.floor(Math.random() * 6) + 1; // 1 to 6
        var durationDays = Math.floor(Math.random() * 6); // 0 to 5
        var start = Math.floor(Math.random() * 6) + 2; // 2 to 7

        var e = {
            start: new DayPilot.Date("2016-03-25T00:00:00").addDays(start),
            end: new DayPilot.Date("2016-03-25T12:00:00").addDays(start).addDays(durationDays).addHours(duration),
            id: DayPilot.guid(),
            resource: String.fromCharCode(65+i),
            
            text: "Student " + (i + 1)
        };

        dp.events.list.push(e);
    };

    dp.eventMovingStartEndEnabled = true;
    dp.eventResizingStartEndEnabled = true;
    dp.timeRangeSelectingStartEndEnabled = true;

    dp.onBeforeResHeaderRender = function(args) {
        args.resource.bubbleHtml = "Test";
    };

    dp.onBeforeRowHeaderRender = function(args) {
    };

    dp.onBeforeCellRender = function(args) {
        /*
        if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
            args.cell.backColor = "#ffcccc";
        }
        */
    };

    dp.onEventMove = function(args) {
    };

    // event moving
    dp.onEventMoved = function (args) {
        dp.message("Moved: " + args.e.text() + " start: " + args.e.start() + " end: " + args.e.end());
    };

    dp.onEventClicked = function(args) {
    };

    dp.onEventMoving = function(args) {
        if (args.e.resource() === "A" && args.resource === "B") {  // don't allow moving from A to B
            args.left.enabled = false;
            args.right.html = "You can't move an event from Room 1 to Room B";

            args.allowed = false;
        }
        else if (args.resource === "B") {  // must start on a working day, maximum length one day
            while (args.start.getDayOfWeek() == 0 || args.start.getDayOfWeek() == 6) {
                args.start = args.start.addDays(1);
            }
            args.end = args.start.addDays(1);  // fixed duration
            args.left.enabled = false;
            args.right.html = "Events in Room 2 must start on a workday and are limited to 1 day.";
        }

        if (args.resource === "C") {
            var except = args.e.data;
            var events = dp.rows.find(args.resource).events.all();

            var start = args.start;
            var end = args.end;
            var overlaps = events.some(function(item) {
                return item.data !== except && DayPilot.Util.overlaps(item.start(), item.end(), start, end);
            });

            while (overlaps) {
                start = start.addDays(1);
                end = end.addDays(1);

                overlaps = events.some(function(item) {
                    return item.data !== except && DayPilot.Util.overlaps(item.start(), item.end(), start, end);
                });
            }

            if (args.start !== start) {
                args.start = start;
                args.end = end;

                args.left.enabled = false;
                args.right.html = "Start automatically moved to " + args.start.toString("d MMMM, yyyy");
            }

        }

    };

    dp.onBeforeEventRender = function(args) {
        args.data.bubbleHtml = "<div><b>" + args.data.text + "</b></div><div>Start: " + new DayPilot.Date(args.data.start).toString("M/d/yyyy") + "</div><div>End: " + new DayPilot.Date(args.data.end).toString("M/d/yyyy") + "</div>";
    };

    dp.onEventResize = function(args) {
    };

    // event resizing
    dp.onEventResized = function (args) {
        dp.message("Resized: " + args.e.text());
    };

    dp.onTimeRangeSelecting = function(args) {
        //args.end = args.start.addDays(1);
    };

    // event creating
    dp.onTimeRangeSelected = function (args) {
        var name = prompt("New event name:", "New Event ");
        dp.clearSelection();
        if (!name) return;
        var e = new DayPilot.Event({
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            resource: args.resource,
            text: name
        });
        dp.events.add(e);
        dp.message("Created");

        new DayPilot.Modal({
            onClosed: function(margs) {
                dp.clearSelection();
                if (!margs.result) {
                    return;
                }
                if (!name) return;
                var e = new DayPilot.Event({
                    start: args.start,
                    end: args.end,
                    id: DayPilot.guid(),
                    resource: args.resource,
                    text: margs.result.name
                });
                dp.events.add(e);
                dp.message("Created");
            }
        }).showUrl("modal.html");

    };

    dp.separators = [
        {color:"Red", location:"2016-03-29T00:00:00", layer: "BelowEvents"}
    ];

    dp.treePreventParentUsage = true;

    dp.onEventClicked = function(args) {
        console.log("clicked: " + args.e.text());
    };

    dp.timeRangeRightClickHandling = "Disabled";
    dp.onGridMouseDown = function(args) {
        var button = DayPilot.Util.mouseButton(args.originalEvent);
        if (button.right) {
            args.action = "None";
        }
    };

    dp.eventClickHandling = "Edit";

    dp.onEventClick = function(args) {
        new DayPilot.Modal({
            left: DayPilot.abs(args.div).x,
            width: args.div.offsetWidth,
            height: args.div.offsetHeight,
            top: DayPilot.abs(args.div).y,
            theme: "modal_min"
        }).showHtml(args.e.text());
    };

    dp.onEventMove = function(args) {
        if (args.ctrl) {
            var newEvent = new DayPilot.Event({
                start: args.newStart,
                end: args.newEnd,
                text: "Copy of " + args.e.text(),
                resource: args.newResource,
                id: DayPilot.guid()  // generate random id
            });
            dp.events.add(newEvent);

            // notify the server about the action here

            args.preventDefault(); // prevent the default action - moving event to the new location
        }
    };

    dp.init();

    dp.scrollTo("2016-03-25");

    $(document).ready(function() {
        $(document).keydown(function(ev) {
            if (ev.which === 27) {
                DayPilot.Scheduler.stopDragging();
            }
        });
    });

};