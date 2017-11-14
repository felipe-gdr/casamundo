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
		if (objStudent.documento.trips[actualTrip].destination){
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

		var totalDaysTrip = (calculaDias (DayPilot.Date(startNewEvent).getDay() + "/" + 
 				(DayPilot.Date(startNewEvent).getMonth() + 1) + "/" + 
 				DayPilot.Date(startNewEvent).getYear(), 
 				DayPilot.Date(endNewEvent).getDay() + "/" + 
 				(DayPilot.Date(endNewEvent).getMonth() + 1) + "/" + 
 				DayPilot.Date(endNewEvent).getYear()) + 1) - 1;
		
		var usedDays = daysUsed(rooms_actualTrip, startNewEvent, endNewEvent );
		var startNewEvent = DayPilot.Date(startNewEvent).addDays(usedDays);

		var realDaysTrip = (calculaDias (DayPilot.Date(startNewEvent).getDay() + "/" + 
 				(DayPilot.Date(startNewEvent).getMonth() + 1) + "/" + 
 				DayPilot.Date(startNewEvent).getYear(), 
 				DayPilot.Date(endNewEvent).getDay() + "/" + 
 				(DayPilot.Date(endNewEvent).getMonth() + 1) + "/" + 
 				DayPilot.Date(endNewEvent).getYear()) + 1) - 1;
		
		// *** setup bib day pilot
		var today = new Date();
		var yearToday = today.getYear() + 1900; 
		var setDate = yearToday + "-" + today.getMonth() + "-" + today.getDate();
		var startDate = (yearToday - 1) + "-" + today.getMonth() + "-" + today.getDate();
		var dp = setupDayPilot (DayPilot.Date(startNewEvent).addDays(-365), 772, "Day", startNewEvent, endNewEvent, eventName, student, par_startNewEvent, par_endNewEvent, idStudent, actualTrip);

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
	    	    actualTrip: occupancy.actualTrip,
	    	    occupancy:room.bed.occupancies
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
		        	var occupancies = montaOcupancies(occupancy.student_occupancies);		        	
	    			var event = 
	    				{
	    		          start: separadorAnoMesDia(occupancy.startOccupancy, "-") + "T12:00:00",
	    		          end: separadorAnoMesDia(occupancy.endOccupancy, "-") + "T12:00:00",
	    		          id: room.idRoom + "_" + room.bed.id + "_" + w,
	    		          resource: room_bed,
	    		          text: occupancy.student.firstName + " " + occupancy.student.lastName,
	    		          html: "<div>" + icon + "<b>" + " " + occupancy.student.firstName + " " + occupancy.student.lastName + "</b>" + occupancies + "</div>",
	    		          actualTrip: occupancy.actualTrip,
	    		          occupancy : occupancy,
	    		          idStudent : occupancy.idStudent,
	    		          oldResource : room_bed,
	    		          student : occupancy.student,
	    		          student_daysTrip : realDaysTrip,
	    		          student_totalDaysTrip : totalDaysTrip,
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
		    		        student_totalDaysTrip : totalDaysTrip,
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
	function montaOcupancies(student_occupancies){

		var occupancies = "";
	    $.each(student_occupancies, function (i, occupancy) {
	    	occupancies = occupancies + "<br>" + separaDataMes(occupancy.occupancy.startOccupancy, "-") + "/" + separaDataMes(occupancy.occupancy.endOccupancy, "-");
	    });
		return occupancies;
		
	};
	
	function daysUsed(occupancies){

		var usedDays = 0;
	    $.each(occupancies, function (i, occupancy) {
	    	if (occupancy.usedDays){
	    		usedDays = usedDays + ((parseInt(occupancy.usedDays)) - 1);
	    	};
	    });
		return usedDays;
	};
	
	function inicioFim(occupancie, start, end){

		var inicioFim = "";
	    $.each(occupancies, function (i, occupancy) {
	    	startOccupancy = new DayPilot.Date(separadorAnoMesDia(occupancy.startOccupancy, "-") + "T12:00:00");
	    	endOccupancy = new DayPilot.Date(separadorAnoMesDia(occupancy.endOccupancy, "-") + "T12:00:00");
	    	if (start <= startOccupancy){
	    		
	    	};
	    });
		return inicioFim;
	};
