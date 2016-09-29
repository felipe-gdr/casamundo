
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#bedAlocationModal-form").validate({
		// Rules for form validation
		rules : {
			bedAlocationStart : {
				required : true,
			},
			bedAlocationEnd : {
				required : true,
			},
		},

		// Messages for form validation
		messages : {
			bedAlocationStart : {
				required : 'Please enter start date',
			},
			bedAlocationEnd : {
				required : 'Please enter bank end date',
			},
		},
		// form submition
		submitHandler : function(form) {
			var objJson = JSON.parse(localStorage.getItem("bedAllocation"));
			$.each(form
				    , function (i, field) {
					if (field.value){
						if (field.name == 'bedAlocationStart'){	
							objJson.start = limpaData(field.value);
						};
						if (field.name == 'bedAlocationEnd'){	
							objJson.end =  limpaData(field.value);
						};
					};
				});
			rest_obterRoom(objJson.idRoom, updateRooms, semAcao, objJson);
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
	
	$("#bankModal").on('hidden.bs.modal', function(event){
		var student = JSON.parse(localStorage.getItem("student"));
    	$('#bedAlocationStart').val(separaDataMes(data.documento.trips[student.actualTrip].start, "-"));
    	$("#bedAlocationEnd").val(separaDataMes(data.documento.trips[student.actualTrip].end, "-"));
	});

