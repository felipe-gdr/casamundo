
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#bedAllocationModal-form").validate({
		// Rules for form validation
		rules : {
			bedAllocationStart : {
				required : true,
			},
			bedAllocationEnd : {
				required : true,
			},
		},

		// Messages for form validation
		messages : {
			bedAllocationStart : {
				required : 'Please enter start date',
			},
			bedAllocationEnd : {
				required : 'Please enter bank end date',
			},
		},
		// form submition
		submitHandler : function(form) {
			var objJson = JSON.parse(localStorage.getItem("bedAllocation"));
			var objStudent = JSON.parse(localStorage.getItem("student"));
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
			if (checkDateAllocate(objJson.start, objJson.end, objStudent.rooms)){
				rest_obterRoom(objJson.idRoom, updateRooms, semAcao, objJson);
				$(window.document.location).attr('href','students.html?students.html?accommodation=Dorms');
			}else{
				error.insertAfter($('#bedAllocationStart'));
				error.insertAfter($('#bedAllocationEnd'));
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>Enter no allocate date</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
				errors = { personalid: "Please enter an ID to check" };
				$tablesForm.showErrors(errors);      
			};
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
	
	$("#bankModal").on('hidden.bs.modal', function(event){
		var student = JSON.parse(localStorage.getItem("student"));
    	$('#bedAllocationStart').val(separaDataMes(data.documento.trips[student.actualTrip].start, "-"));
    	$("#bedAllocationEnd").val(separaDataMes(data.documento.trips[student.actualTrip].end, "-"));
	});

	
function checkDateAllocate (start, end, rooms){
	return false;
};
	

