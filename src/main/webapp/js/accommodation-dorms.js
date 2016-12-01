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
					objStudent.documento,
					objStudent.rooms_actualTrip,
					objStudent._id,
					actualTrip);
		};
	};

	function montaCalendario (objJson, par_startNewEvent, par_endNewEvent, eventName, student, rooms_actualTrip, idStudent, actualTrip) {
        // *** datas Day pilot do novo evento
		var startNewEvent = new DayPilot.Date(separadorAnoMesDia(par_startNewEvent, "-") + "T12:00:00");
		var endNewEvent = new DayPilot.Date(separadorAnoMesDia(par_endNewEvent, "-") + "T12:00:00");
		
		var usedDays = daysUsed(rooms_actualTrip);
		var endNewEvent = DayPilot.Date(endNewEvent).addDays(usedDays * -1);

		var realDaysTrip = calculaDias (DayPilot.Date(startNewEvent).getDay() + "/" + 
 				(DayPilot.Date(startNewEvent).getMonth() + 1) + "/" + 
 				DayPilot.Date(startNewEvent).getYear(), 
 				DayPilot.Date(endNewEvent).getDay() + "/" + 
 				(DayPilot.Date(endNewEvent).getMonth() + 1) + "/" + 
 				DayPilot.Date(endNewEvent).getYear()) + 1;
		
		// *** setup bib day pilot
		var today = new Date();
		var yearToday = today.getYear() + 1900; 
		var setDate = yearToday + "-" + today.getMonth() + "-" + today.getDate();
		var startDate = (yearToday - 1) + "-" + today.getMonth() + "-" + today.getDate();
		var dp = setupDayPilot (startNewEvent, 772, "Day", startNewEvent, endNewEvent, eventName, student, par_startNewEvent, par_endNewEvent, idStudent, actualTrip);

		var dormName = "";
	    var unitName = "";
	    var roomName = "";
    	var indexDorm = 0;
    	var indexUnit = 0;
    	var indexRoom = 0;
	    var resources = [];
	    var events = [];
	    $.each(objJson, function (i, room) {
	        if (room.dormName != dormName){
	        	var dormUnit = 
	        		{
	        			name: "Dorm: " + room.dormName, 
	        			id: room.idDorm,	 
	        			expanded: true, 
	        			children:[]
	        		};
	        	resources.push(dormUnit);
	        	indexDorm = resources.length - 1; 
	    	    unitName = "";
	    	    roomName = "";
	        };
	        if (room.unitName != unitName){
	        	var unitUnit = 
        		{
        			name: "Unit:" + room.unitName, 
        			id: room.idDorm + "_" + room.idUnit,	 
        			expanded: true, 
        			children:[]
        		};
	        	resources[indexDorm].children.push(unitUnit);
	        	indexUnit = resources[indexDorm].children.length - 1;
	    	    roomName = "";
	        };
	        if (room.roomName != roomName){
	        	var roomUnit = 
        		{
        			name: "Room:" + room.roomName, 
        			id: room.idRoom,	 
        			expanded: true, 
        			children:[]
        		};
	        	resources[indexDorm].children[indexUnit].children.push(roomUnit);
	        	indexRoom = resources[indexDorm].children[indexUnit].children.length - 1;
	        };
	    	var room_bed = 
			{
		        idDorm : room.idDorm,
	    	    idUnit : room.idUnit,
	    	    idRoom : room.idRoom,
	    	    idBed : room.bed.id,
		        dormName : room.dormName,
	    	    unitName : room.unitName,
	    	    roomName : room.roomName,
	    	    bedName : room.bed.name,
	    	    actualTrip: occupancy.actualTrip
			};

        	var bedUnit = 
    		{
    			name: "Bed:" + room.bed.name, 
    			id: room_bed,
    			room_bed : room_bed
    		};
        	resources[indexDorm].children[indexUnit].children[indexRoom].children.push(bedUnit);
        	
	        dormName = room.dormName;
    	    unitName = room.unitName;
    	    roomName = room.roomName;

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
	    		          id: room.idRoom + "_" + room.bed.id + "_" + w,
	    		          resource: room_bed,
	    		          text: occupancy.student.firstName + " " + occupancy.student.lastName,
	    		          html: "<div>" + icon + "<b>" + " " + occupancy.student.firstName + " " + occupancy.student.lastName + "</b></div>",
	    		          actualTrip: occupancy.actualTrip,
	    		          occupancy : occupancy,
	    		          idStudent : occupancy.idStudent,
	    		          oldResource : room_bed,
	    		          student : occupancy.student,
	    		          student_daysTrip : realDaysTrip,
	    		          student_usedDays : daysUsed(occupancy.student_occupancies),
	    		          newAllocated : false
	    		        };
	    			var data =
	    				{
	    					actualTrip: occupancy.actualTrip,
		    		        student : occupancy.student,
		    		        actualTrip: occupancy.actualTrip,
		    		        occupancy : occupancy,
		    		        idStudent : occupancy.idStudent,
		    		        oldResource : room_bed,
		    		        student : occupancy.student,
		    		        student_daysTrip : realDaysTrip,
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
	
	function addAllocation (objRoom, objBed, status, actualTrip, args, dp) {

		var objStudent = JSON.parse(localStorage.getItem("student"));

		var occupancy = 
			{
			idStudent : objBed.idStudent,
            startOccupancy : objBed.start ,
            endOccupancy : objBed.end,
            actualTrip : actualTrip
			};

		objRoom.documento.beds[objBed.idBed].occupancies.push(occupancy);

		rest_atualizaRoom(objRoom, atualizouBed, atualizacaoNaoEfetuada, "Room allocated", "Problems to update rooms, try again", objBed.actualTrip, objBed.idStudent, args, dp );
		
	};

	function deallocation (objRoom, objBed, status, actualTrip, args, dp) {

		var objStudent = JSON.parse(localStorage.getItem("student"));

		var remocaoOk = false;
	    $.each(objRoom.documento.beds[objBed.idBed].occupancies, function (i, occupancy) {
	    	if (occupancy){
		    	if (occupancy.idStudent == objBed.idStudent &&
		    		occupancy.startOccupancy == objBed.start &&
		    		occupancy.endOccupancy == objBed.end &&
		    		occupancy.actualTrip == objBed.actualTrip){
		    		objRoom.documento.beds[objBed.idBed].occupancies.splice(i, 1);
		    		remocaoOk = true;
		    	};
	    	};
	    });

	    if (remocaoOk){
	    	rest_atualizaRoom(objRoom, atualizouBedDeallocation, atualizacaoNaoEfetuada, "Room deallocated", "Problems to update rooms, try again", objBed.actualTrip, objBed.idStudent, args, dp);
	    }else{
	    	atualizacaoNaoEfetuada("Problems to deallocate room, try again or contact support");
	    };
		
};

function atualizouBedDeallocation(message, actualTrip, idStudent, args, dp){
	
	atualizacaoEfetuada(message);

	updateAllocation (args, addAllocation, dp);
};

function atualizouBed(message, actualTrip, idStudent, args, dp){

	atualizacaoEfetuada(message);

	updateAllocation (args, semAcao, dp);

	rest_obterStudent(null, atualizaStudent, semAcao, args, actualTrip, actualTrip, idStudent, dp )
	
};

function daysUsed(occupancies){
	var usedDays = 0;
    $.each(occupancies, function (i, occupancy) {
    	if (occupancy.usedDays){
    		usedDays = usedDays + parseInt(occupancy.usedDays);
    	};
    });
	return usedDays;
};

function atualizaStudent (objStudent, args, actualTrip, dp){
    //
    //**** verificar o fim das alocações das datas parciais informadas
    //
    var initialDateOk = false;
    var endDateOk = false;

    var daysTrip = calculaDias(separaConverteDataMes(objStudent.documento.trips[actualTrip].start, "/"), separaConverteDataMes(objStudent.documento.trips[actualTrip].end, "/")) + 1;

	var daysOccupancy = 0;
    if (objStudent.rooms_actualTrip != null && objStudent.rooms_actualTrip != ""){
	    $.each(objStudent.rooms_actualTrip, function (i, room) {
		    daysOccupancy = daysOccupancy + parseInt(room.usedDays);
	    });
	};

	if (daysOccupancy < daysTrip){
		status = "Partially allocated";
	}else{
		status = "Allocated";
	};

	//
	//*** atualiza status do evento
	//
	args.e.data.student.trips[actualTrip].status = status;
	localStorage.insert == "false";
	changeEvent (null, args);
	dp.events.update(args.e, args.e.data);
	//
	//*** atualiza dados do quarto no estudante
	//
	var objStudent = JSON.parse(localStorage.getItem("student"));
	objStudent.documento.trips[actualTrip].idRoom = "";
	objStudent.documento.trips[actualTrip].idBed = "";
	objStudent.documento.trips[actualTrip].dormName = "";
	objStudent.documento.trips[actualTrip].unitName = "";
	objStudent.documento.trips[actualTrip].roomName = "";
	objStudent.documento.trips[actualTrip].bedName = "";
	objStudent.documento.trips[actualTrip].status = status;
	delete objStudent.contact;
	delete objStudent.rooms;
	delete objStudent.family;
	delete objStudent.room;
	rest_atualizaStudent(objStudent, atualizacaoEfetuada, atualizacaoNaoEfetuada, "Room name included", "Problems to update student, try again")
	
};