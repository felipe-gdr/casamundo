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
			rest_obterBedsAll(montaCalendario, semAcao, 
					objStudent.documento.trips[actualTrip].destination, 
					objStudent.documento.trips[actualTrip].start, 
					objStudent.documento.trips[actualTrip].end, 
					objStudent.documento.firstName + " " +
					objStudent.documento.lastName, 
					objStudent.documento);
		};
	};

	function montaCalendario (objJson, par_startNewEvent, par_endNewEvent, eventName, student) {
        // *** datas do novo evento
		var startNewEvent = separadorAnoMesDia(par_startNewEvent, "-") + "T12:00:00";
		var endNewEvent = separadorAnoMesDia(par_endNewEvent, "-") + "T12:00:00";
		
		// *** setup bib day pilot
		var today = new Date();
		var yearToday = today.getYear() + 1900; 
		var setDate = yearToday + "-" + today.getMonth() + "-" + today.getDate();
		var startDate = (yearToday - 1) + "-" + today.getMonth() + "-" + today.getDate();
		var dp = setupDayPilot (startDate, 772, "Day", startNewEvent, endNewEvent, eventName, student, par_startNewEvent, par_endNewEvent);

		var dormName = "";
	    var unitName = "";
	    var roomName = "";
    	var indexDorm = 0;
    	var indexUnit = 0;
    	var indexRoom = 0;
	    var resources = [];
	    var events = [];
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
        			id: room.idDorm + "_" + room.idUnit,	 
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
    			id: room.id + "_" + room.bed.id,	 
    		};
        	resources[indexDorm].children[indexUnit].children[indexRoom].children.push(bedUnit);
        	
	        dormName = room.dorm;
    	    unitName = room.unit;
    	    roomName = room.name;

    	    if (room.bed.occupancies){
	    		$.each(room.bed.occupancies, function (w, occupancy) {
		    		var startTrip = separadorAnoMesDia(occupancy.startOccupancy, "-");
		    		var endTrip =  separadorAnoMesDia(occupancy.endOccupancy, "-");
		        	if (occupancy.student.gender == "Male"){
			        	if (occupancy.student.trips[occupancy.actualTrip].occupancy == "Couple"){
			        		icon = "<i class='fa fa-male'></i><i class='fa fa-female'></i>"
			        	}else{
				        	if (occupancy.student.trips[occupancy.actualTrip].occupancy == "Twin"){
				        		icon = "<i class='fa fa-male'></i><i class='fa fa-male'></i>"
				        	}else{
				        		icon = "<i class='fa fa-male'></i>"
				        	};
			        	};
		        	}else{
			        	if (occupancy.student.trips[occupancy.actualTrip].occupancy == "Couple"){
			        		icon = "<i class='fa fa-female'></i><i class='fa fa-male'></i>"
			        	}else{
				        	if (occupancy.student.trips[occupancy.actualTrip].occupancy == "Twin"){
				        		icon = "<i class='fa fa-female'></i><i class='fa fa-female'></i>"
				        	}else{
				        		icon = "<i class='fa fa-female'></i>"
				        	};
			        	};		        		
		        	}
	    			var event = 
	    				{
	    		          start: separadorAnoMesDia(occupancy.startOccupancy, "-") + "T12:00:00",
	    		          end: separadorAnoMesDia(occupancy.endOccupancy, "-") + "T12:00:00",
	    		          id: room.id + "_" + room.bed.id + "_" + w,
	    		          resource: room.id + "_" + room.bed.id,
	    		          html: "<div>" + icon + "<b>" + " " + occupancy.student.firstName + " " + occupancy.student.lastName + "</b></div>",
	    		          actualTrip: occupancy.actualTrip,
	    		          student : occupancy.student,
	    		          student_daysTrip : occupancy.student_daysTrip,
	    		          student_usedDays : daysUsed(occupancy.student_occupancies),
	    		          newAllocated : false
	    		        };
	    			var data =
	    				{
	    					actualTrip: occupancy.actualTrip,
		    		        student : occupancy.student,
		    		        actualTrip: occupancy.actualTrip,
		    		        student : occupancy.student,
		    		        student_daysTrip : occupancy.student_daysTrip,
		    		        student_usedDays : daysUsed(occupancy.student_occupancies),
		    		        newAllocated : false
	    				}
			        events.push(event, data);
	    		});
        	};
	    
	    });

	    dp.resources = resources;

	    dp.events.list = events;

	    dp.init();

	    dp.scrollTo(startNewEvent, false,  "middle");

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

function daysUsed(occupancies){
	var usedDays = 0;
    $.each(occupancies, function (i, occupancy) {
    	usedDays = usedDays + parseInt(occupancy.usedDays);
    });
	return usedDays;
};