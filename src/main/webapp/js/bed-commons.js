
	jQuery.validator.addMethod("checkAllocateDate", function (value, element) {
		return checkDateAllocate ($('#bedAllocationStart').val(), $('#bedAllocationEnd').val());
	}, "enter valid allocated date");

	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#bedAllocationModal-form").validate({
		// Rules for form validation
		rules : {
			bedAllocationStart : {
				required : true,
				checkAllocateDate : true
			},
			bedAllocationEnd : {
				required : true,
				checkAllocateDate : true
			},
		},

		// Messages for form validation
		messages : {
			bedAllocationStart : {
				required : 'Please enter start date',
				checkAllocateDate : "date conflict with allocated date"

			},
			bedAllocationEnd : {
				required : 'Please enter end date',
				checkAllocateDate : "date conflict with allocated date"
			},
		},
		// form submition
		submitHandler : function(form) {
			var objJson = JSON.parse(localStorage.getItem("bedAllocation"));
			$.each(form
				    , function (i, field) {
					if (field.value){
						if (field.name == 'bedAllocationStart'){	
							objJson.start = limpaData(field.value);
						};
						if (field.name == 'bedAllocationEnd'){	
							objJson.end =  limpaData(field.value);
						};
					};
				});
			rest_obterOneKey("room", objJson.idRoom, value, true, updateBeds, semAcao, objJson, "Partially allocated", var3)			
			$(window.document.location).attr('href','students.html?accommodation=Dorms');
		},	
		// Do not change code below
		errorPlacement : function(error, element) {
			error.insertAfter(element.parent());
			$.smallBox({
				title : "Error",
				content : "<i class='fa fa-clock-o'></i> <i>There is a error</i>",
				color : "#ff8080",
				iconSmall : "fa fa-check fa-2x fadeInRight animated",
				timeout : 4000
			});
		}
	});
	
	$("#bedAllocationModal").on('hidden.bs.modal', function(event){
	});

	
function checkDateAllocate (start, end){
	
	var conflict = true;
	var objJson = JSON.parse(localStorage.getItem("student"));
	var startTrip = Date.parse(new Date(separaAnoMesDia(limpaData(start)))); 
	var endTrip =  Date.parse(new Date(separaAnoMesDia(limpaData(end))));
	if (objJson.rooms != null && objJson.rooms != ""){
	    $.each(objJson.rooms, function (i, room) {
	    	$.each(room.documento.beds, function (i, bed) {
	    		$.each(bed.occupancies, function (w, occupancy) {
					if (occupancy.idStudent == objJson._id){
						var startOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.startOccupancy))); 
						var endOccupancy = Date.parse(new Date(separaAnoMesDia(occupancy.endOccupancy)));
						
						if (startTrip >= startOccupancy && startTrip < endOccupancy){
							conflict = false;
						};
						if (endTrip >= startOccupancy && endTrip <= endOccupancy){
							conflict = false;				
						};
						if (startTrip <= startOccupancy && endTrip >= endOccupancy){
							conflict = false;
						};
					};
	    		});
	    	});
	    });
	};
    return conflict;
};
	

