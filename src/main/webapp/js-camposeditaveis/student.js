/**
 * 				dados da url
 */
	console.log ('href 2 ' + window.location.href);
	var url   = window.location.href;
	console.log ('url ' + url);
	var parametrosDaUrl = url.split("?")[1];
	console.log ('parametrosDaUrl ' + parametrosDaUrl);
	var email = parametrosDaUrl.split("=")[1];
	console.log ('email ' + email);
	
	/**
	 * 				obter os dados
	 */
	rest_obterStudent(email, carregaLocalStorageStudent);
    
	var table = JSON.parse(localStorage.getItem("table"));
    var actualTrip = getValueStudent("actualTrip");

    /**
     * 				Formata campos editaveis
     */
    
    //
    //    *** personal data
    //
    $('#celPhone').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'celularcontato',
        title: 'Cel Phone ',
        viewformat: '(999)99999.9999',
        value: getValueStudent("celPhone"),
        placeholder: 'Nome',
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("celPhone", value, actualTrip, true);
        }
    });

    $('#phone').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'phone',
        title: 'Phone',
		value: getValueStudent("phone"),
        placeholder: 'Phone',
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("phone", value, actualTrip, true);
        }
    });
    $('#mail').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'mail',
        title: 'Mail',
		value: getValueStudent("mail"),
        placeholder: 'Mail',
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("mail", value, actualTrip, true);
        }
    });

    $('#lastName').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'lastName',
        title: 'Last Name',
        placeholder: 'Last name',
		value: getValueStudent("lastName"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("lastName", value, actualTrip, true);
        }
    });
    $('#firstName').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'firstName',
        title: 'First name',
        placeholder: 'First name',
		value: getValueStudent("firstName"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("firstName", value, actualTrip, true);
        }
    });
    $('#birthDay').editable({
//		        url: '/post',
        type: 'text',
        datepicker: {
            todayBtn: 'linked'
        },
        pk: 1,
        name: 'birthDay',
        title: 'Birthday',
        placeholder: 'Birthday',
		value: getValueStudent("birthDay"),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
	            var day = value.date().toString();
            	var year = value.year().toString();
	            var month = (value.month() + 1).toString();
	            if (value.month() < 10){
	            	month = '0' + month;
	            };
	            if (value.date() < 10){
	            	day = '0' + day;
	            };
	            setValueStudent("birthDay", day + month + year, actualTrip, true);
            	$("#age").html(calculaIdade(capturaData(value, "/")));
            }
        }
    });
    $("#birthDay").html(separaData(getValueStudent("birthDay"), "/"));
    
    $('#age').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'age',
        title: 'Age',
        placeholder: 'Age',
		value: calculaIdade(separaData(getValueStudent("birthDay"), "/")),
        validate: function (value) {
            setValueStudent("age", value, actualTrip, true);
        }
    });
    var gender_source = [];
    $.each({
        "Male" : "Male",
        "Female" : "Female"
    }, function (k, v) {
    	gender_source.push({
            id: v,
            text: v
        });
    });
    $('#gender').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'gender',
        title: 'Gender',
        placeholder: 'Gnder',
		value: getValueStudent("gender"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("gender", value, actualTrip, true);
        },
        source: gender_source,
        select2: {
            width: 200
        }
    });
    var nationality_source = [];
    $.each(table.documento.nationality
    , function (k, v) {
    	nationality_source.push({
            id: v,
            text: v
        });
    });
    $('#nationality').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'nationality',
        title: 'Nationality',
        placeholder: 'Nationality',
		value: getValueStudent("nationality"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("nationality", value, actualTrip, true);
        },
        source: nationality_source,
        select2: {
            width: 200
        }
    });
    var firstLanguageStudent_source = [];
    $.each(table.documento.firstLanguage
    , function (k, v) {
    	firstLanguageStudent_source.push({
            id: v,
            text: v
        });
    });
    $('#firstLanguage').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'firstLanguage',
        title: 'First Language Student',
        placeholder: 'First Language Student',
		value: getValueStudent("firstLanguage"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("firstLanguage", value, actualTrip, true);
        },
        source: firstLanguageStudent_source,
        select2: {
            width: 200
        }
    });
    $('#profession').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'profession',
        title: 'Profession',
        placeholder: 'Profession',
		value: getValueStudent("profession"),
        validate: function (value) {
            setValueStudent("profession", value, actualTrip, true);
        }
    });
    var mainPurposeTripStudent_source = [];
    $.each(table.documento.mainPurposeTrip
    , function (k, v) {
    	mainPurposeTripStudent_source.push({
            id: v,
            text: v
        });
    });
    $('#mainPurposeTrip').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'mainPurposeTrip',
        title: 'Main Purpose Trip',
        placeholder: 'Main Purpose Trip',
		value: getValueStudent("mainPurposeTrip"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("mainPurposeTrip", value, actualTrip, true);
        },
        source: mainPurposeTripStudent_source,
        select2: {
            width: 200
        }
    });
    var englishLevelStudent_source = [];
    $.each(table.documento.englishLevel
    , function (k, v) {
    	englishLevelStudent_source.push({
            id: v,
            text: v
        });
    });
    $('#englishLevel').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'englishLevel',
        title: 'English Level',
        placeholder: 'English Level',
		value: getValueStudent("englishLevel"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("englishLevel", value, actualTrip, true);
        },
        source: englishLevelStudent_source,
        select2: {
            width: 200
        }
    });
    $('#streetNumber').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'streetNumber',
        title: 'Street Number',
        placeholder: 'Street Number',
		value: getValueStudent("streetNumber"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("englishLevel", value, actualTrip, true);
        }
    });
    $('#streetName').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'streetName',
        title: 'Street name',
        placeholder: 'Street name',
		value: getValueStudent("streetName"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("streetName", value, actualTrip, true);
        }
    });
    var stateStudent_source = [];
    $.each(table.documento.state
    , function (k, v) {
    	stateStudent_source.push({
            id: v,
            text: v
        });
    });
    $('#state').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'state',
        title: 'State',
        placeholder: 'State',
		value: getValueStudent("state"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("state", value, actualTrip, true);
        },
        source: stateStudent_source,
        select2: {
            width: 200
        }
    });
    $('#postalCode').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'postalCode',
        title: 'ZIP',
        placeholder: 'ZIP',
		value: getValueStudent("postalCode"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("postalCode", value, actualTrip, true);
        }
    });
    var cityStudent_source = [];
    $.each(table.documento.city
    , function (k, v) {
    	cityStudent_source.push({
            id: v,
            text: v
        });
    });
    $('#city').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'city',
        title: 'City',
        placeholder: 'City',
		value: getValueStudent("city"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("city", value, actualTrip, true);
        },
        source: cityStudent_source,
        select2: {
            width: 200
        }
    });
    var countryStudent_source = [];
    $.each(table.documento.country
    , function (k, v) {
    	countryStudent_source.push({
            id: v,
            text: v
        });
    });
    $('#country').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'country',
        title: 'Country',
        placeholder: 'Country',
		value: getValueStudent("country"),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("country", value, actualTrip, true);
        },
        source: countryStudent_source,
        select2: {
            width: 200
        }
    });
    $('#secondaryTelephone').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'secondaryTelephone',
        title: 'Secondary Phone',
        placeholder: 'Secondary Phone',
		value: getValueStudent("secondaryTelephone"),
        validate: function (value) {
            setValueStudent("secondaryTelephone", value, actualTrip, true);
        }
    });
    $('#emergencyContactName').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'emergencyContactName',
        title: 'Emergency Contact Name',
        placeholder: 'Emergency Contact Name',
		value: getValueStudent("emergencyContactName"),
        validate: function (value) {
            setValueStudent("emergencyContactName", value, actualTrip, true);
        }
    });
    $('#emergencyContactPhone').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'emergencyContactPhone',
        title: 'Emergency Contact Phone',
        placeholder: 'Emergency Contact Phone',
		value: getValueStudent("emergencyContactPhone"),
        validate: function (value) {
            setValueStudent("emergencyContactPhone", value, actualTrip, true);
        }
    });
    $('#emergencyContactMail').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'emergencyContactMail',
        title: 'Emergency Contact Mail',
        placeholder: 'Emergency Contact Mail',
		value: getValueStudent("emergencyContactMail"),
        validate: function (value) {
            setValueStudent("emergencyContactMail", value, actualTrip, true);
        }
    });
    //
    //    *** trip
    //
    var status_source = [];
    $.each(table.documento.status
    , function (k, v) {
    	status_source.push({
            id: v,
            text: v
        });
    });
    $('#status').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'status',
        title: 'Status',
        placeholder: 'Status',
		value: getValueStudent("status", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("status", value, actualTrip, true);
        },
        source: status_source,
        select2: {
            width: 200
        }
    });
    var destination_source = [];
    $.each(table.documento.destination
    , function (k, v) {
    	destination_source.push({
            id: v,
            text: v
        });
    });
    $('#destination').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'destination',
        title: 'Destination',
        placeholder: 'Destination',
		value: getValueStudent("destination", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("destination", value, actualTrip, true);
        },
        source: destination_source,
        select2: {
            width: 200
        }
    });
    $('#start').editable({
//		        url: '/post',
        datepicker: {
            todayBtn: 'linked'
        },
        pk: 1,
        name: 'start',
        title: 'Start',
        placeholder: 'Start',
		value: getValueStudent("start", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            	setValueStudent("start", capturaDataStandard (value, "") , actualTrip, true);
            }
        }
    });
    $("#start").html(separaData(getValueStudent("start", actualTrip), "."), actualTrip);

    $('#end').editable({
//		        url: '/post',
        datepicker: {
            todayBtn: 'linked'
        },
        pk: 1,
        name: 'end',
        title: 'End',
        placeholder: 'End',
		value: getValueStudent("end", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            	setValueStudent("end", capturaDataStandard (value, "") , actualTrip, true);
            }
        }
    });
    $("#end").html(separaData(getValueStudent("end", actualTrip), "."), actualTrip);
    
    $('#arrivalDate').editable({
//		        url: '/post',
        datepicker: {
            todayBtn: 'linked'
        },
        pk: 1,
        name: 'arrivalDate',
        title: 'Arrival Date',
        placeholder: 'Arrival Date',
		value: getValueStudent("arrivalDate", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            	setValueStudent("arrivalDate", capturaDataStandard (value, "") , actualTrip, true);
            }
        }
    });
    $("#arrivalDate").html(separaData(getValueStudent("arrivalDate", actualTrip), "."), actualTrip);

    $('#arrivalTime').editable({
//		        url: '/post',
        combodate: {
            firstItem: 'name'
        },
        pk: 1,
        name: 'arrivalTime',
        title: 'Arrival Time',
        placeholder: 'Arrival Time',
		value: getValueStudent("arrivalTime", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            	setValueStudent("arrivalTime", capturaHoraStandard  (value, "") , actualTrip, true);
            }
        }
    });
    $("#arrivalTime").html(separaHora(getValueStudent("arrivalTime", actualTrip), ":"));

    $('#flightNumber').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'flightNumber',
        title: 'Flight Number',
        placeholder: 'Flight Number',
		value: getValueStudent("flightNumber", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("flightNumber", value, actualTrip, true);
        }
    });

    $('#flightDate').editable({
//		        url: '/post',
        datepicker: {
            todayBtn: 'linked'
        },
        pk: 1,
        name: 'flightDate',
        title: 'Flight Date',
        placeholder: 'Flight Date',
		value: getValueStudent("flightDate", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            	setValueStudent("flightDate", capturaDataStandard (value, "") , actualTrip, true);
            }
        }
    });
    $("#flightDate").html(separaData(getValueStudent("flightDate", actualTrip), "."), actualTrip);

    $('#flightTime').editable({
//		        url: '/post',
        combodate: {
            firstItem: 'name'
        },
        pk: 1,
        name: 'flightTime',
        title: 'Airline',
        placeholder: 'Airline',
		value: getValueStudent("flightTime", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            	setValueStudent("flightTime", capturaHoraStandard  (value, "") , actualTrip, true);
            }
        }
    });
    $("#flightTime").html(separaHora(getValueStudent("flightTime", actualTrip), ":"), actualTrip);

    $('#airline').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'airline',
        title: 'Airline',
        placeholder: 'Airline',
		value: getValueStudent("airline", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("airline", value, actualTrip, true);
        }
    });

    var extend_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	extend_source.push({
            id: v,
            text: v
        });
    });
    $('#extend').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'extend',
        title: 'Extend',
        placeholder: 'Extend',
		value: getValueStudent("extend", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("extend", value, actualTrip, true);
        },
        source: extend_source,
        select2: {
            width: 200
        }
    });
    var pickup_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	pickup_source.push({
            id: v,
            text: v
        });
    });
    $('#pickup').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'pickup',
        title: 'Pickup',
        placeholder: 'Pickup',
		value: getValueStudent("pickup", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("pickup", value, actualTrip, true);
        },
        source: pickup_source,
        select2: {
            width: 200
        }
    });
    var dropoff_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	dropoff_source.push({
            id: v,
            text: v
        });
    });
    $('#dropoff').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'dropoff',
        title: 'Dropoff',
        placeholder: 'Dropoff',
		value: getValueStudent("dropoff", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("dropoff", value, actualTrip, true);
        },
        source: dropoff_source,
        select2: {
            width: 200
        }
    });

    var accommodation_source = [];
    $.each(table.documento.accommodation
    , function (k, v) {
    	accommodation_source.push({
            id: v,
            text: v
        });
    });
    $('#accommodation').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'accommodation',
        title: 'Accommodation',
        placeholder: 'Accommodation',
		value: getValueStudent("accommodation", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            	$(".homestay").addClass("hide");
            	$(".dorms").addClass("hide");
            	$(".suite").addClass("hide");
            	if (value == "Homestay"){
            		$(".homestay").removeClass("hide");
            	}else{
	            	if (value == "Dorms"){
	            		$(".dorms").removeClass("hide");
	            	}else{
		            	if (value == "Suite"){
		            		$(".suite").removeClass("hide");
		            	}
	            	}
            	}
            }
            setValueStudent("accommodation", value, actualTrip, true);
        },
        source: accommodation_source,
        select2: {
            width: 200
        }
    });
	if (getValueStudent("accommodation", actualTrip) == "Homestay"){
		$(".homestay").removeClass("hide");
	}else{
		if (getValueStudent("accommodation", actualTrip) == "Dorms"){
    		$(".dorms").removeClass("hide");
    	}else{
        	if (getValueStudent("accommodation", actualTrip) == "Suite"){
        		$(".suite").removeClass("hide");
        	}
    	}
	};
    //
    //    *** homestay
    //
    var occupancy_source = [];
    $.each(table.documento.occupancy
    , function (k, v) {
    	occupancy_source.push({
            id: v,
            text: v
        });
    });
    $('#occupancy').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'occupancy',
        title: 'occupancy',
        placeholder: 'occupancy',
		value: getValueStudent("occupancy", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            	if (value == "Twin" || value == "Couple"){
            		$(".guest").removeClass("hide");
            	}else{
            		$(".guest").addClass("hide");
            	}
            }
            setValueStudent("occupancy", value, actualTrip, true);
        },
        source: occupancy_source,
        select2: {
            width: 200
        }
    });
	if (getValueStudent("occupancy", actualTrip) == "Twin" || getValueStudent("occupancy", actualTrip) == "Couple"){
		$(".guest").removeClass("hide");
	}else{
		$(".guest").addClass("hide");
	}
    $('#guestName').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'guestName',
        title: 'Guest Name',
        placeholder: 'Guest Name',
		value: getValueStudent("guestName", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("guestName", value, actualTrip, true);
        }
    });

    var relationship_source = [];
    $.each(table.documento.relationship
    , function (k, v) {
    	relationship_source.push({
            id: v,
            text: v
        });
    });
    $('#relationship').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'relationship',
        title: 'Relationship',
        placeholder: 'Relationship',
		value: getValueStudent("relationship", actualTrip),
        validate: function (value) {
            if (value == ''){
                return 'Required!';
            }else{
            }
            setValueStudent("relationship", value, actualTrip, true);
        },
        source: relationship_source,
        select2: {
            width: 200
        }
    });

    var mealPlan_source = [];
    $.each(table.documento.mealPlan
    , function (k, v) {
    	mealPlan_source.push({
            value: v,
            text: v
        });
    });

    $('#mealPlan').editable({
        pk: 1,
        limit: 2,
        source: mealPlan_source,
//		        value:"2 meals, 3 meals",
        name: 'mealPlan',
        title: 'Meal Plan',
        placeholder: 'Meal Plan',
		value: getValueStudent("mealPlan", actualTrip),	        
        validate: function (value) {
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
            setValueStudent("mealPlan", valueNew, actualTrip, true);
        },
    });

    var specialDiet_source = [];
    $.each(table.documento.specialDiet
    , function (k, v) {
    	specialDiet_source.push({
            value: v,
            text: v
        });
    });

    $('#specialDiet').editable({
        pk: 1,
        limit: 2,
        source: specialDiet_source,
        name: 'specialDiet',
        title: 'Special Diet',
        placeholder: 'Special Diet',
		value: getValueStudent("specialDiet", actualTrip),	        
        validate: function (value) {
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
            setValueStudent("specialDiet", valueNew, actualTrip, true);
        },
    });
    var privateWashroom_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	privateWashroom_source.push({
            id: v,
            text: v
        });
    });
    $('#privateWashroom').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'privateWashroom',
        title: 'Private Washroom',
        placeholder: 'Private Washroom',
		value: getValueStudent("privateWashroom", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("privateWashroom", value, actualTrip, true);
        },
        source: privateWashroom_source,
        select2: {
            width: 200
        }
    });
    var smoke_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	smoke_source.push({
            id: v,
            text: v
        });
    });
    $('#smoke').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'smoke',
        title: 'Do you Smoke?',
        placeholder: 'Do you Smoke?',
		value: getValueStudent("smoke", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("smoke", value, actualTrip, true);
        },
        source: smoke_source,
        select2: {
            width: 200
        }
    });
    var liveDogs_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	liveDogs_source.push({
            id: v,
            text: v
        });
    });
    $('#liveDogs').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'liveDogs',
        title: 'Do you live with Dogs?',
        placeholder: 'Do you live with Dogs?',
		value: getValueStudent("liveDogs", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("liveDogs", value, actualTrip, true);
        },
        source: liveDogs_source,
        select2: {
            width: 200
        }
    });
    var liveCats_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	liveCats_source.push({
            id: v,
            text: v
        });
    });
    $('#liveCats').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'liveCats',
        title: 'Do you live with Cats?',
        placeholder: 'Do you live with Cats?',
		value: getValueStudent("liveCats", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("liveCats", value, actualTrip, true);
        },
        source: liveCats_source,
        select2: {
            width: 200
        }
    });

    $('#hobbies').editable({
        pk: 1,
        name: 'hobbies',
        title: 'Hobbies/Interest',
        placeholder: 'Hobbies/Interest',
		value: getValueStudent("hobbies", actualTrip),
        validate: function (value) {
            setValueStudent("hobbies", value, actualTrip, true);
        },
        showbuttons: 'bottom'
    });

    $('#medical').editable({
        pk: 1,
        name: 'medical',
        title: 'Alergies or Medical Concern',
        placeholder: 'Alergies or Medical Concern',
		value: getValueStudent("medical", actualTrip),
        validate: function (value) {
            setValueStudent("medical", value, actualTrip, true);
        },
        showbuttons: 'bottom'
    });

    $('#comments').editable({
        pk: 1,
        name: 'comments',
        title: 'Comments',
        placeholder: 'Comments',
		value: getValueStudent("comments", actualTrip),
        validate: function (value) {
            setValueStudent("comments", value, actualTrip, true);
        },
        showbuttons: 'bottom'
    });

    $('#agreeTerm').editable({
        pk: 1,
        limit: 1,
        source: [{
            value: 'Yes',
            text: 'Yes'
        }],
        name: 'agreeTerm',
        title: 'Yes',
        placeholder: 'Yes',
		value: getValueStudent("agreeTerm", actualTrip),	        
        validate: function (value) {
            if (value == '')
                return 'Required!';
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
            setValueStudent("agreeTerm", valueNew, actualTrip, true);
        },
    });
    //
    // *** dorms
    //
    $('#usuallyStudy').editable({
        inputclass: 'input-large',
        select2: {
            tags: table.documento.usuallyStudy,
            tokenSeparators: [",", " "]
        },
    	value:getValueStudent("usuallyStudy", actualTrip),
        validate: function (value) {
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
            setValueStudent("usuallyStudy", valueNew, actualTrip, true);
        },
    });
    $('#keepBedroom').editable({
        inputclass: 'input-large',
        select2: {
            tags: table.documento.keepBedroom,
            tokenSeparators: [",", " "]
        },
    	value:getValueStudent("keepBedroom", actualTrip),
        validate: function (value) {
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
            setValueStudent("keepBedroom", valueNew, actualTrip, true);
        },
    });
    $('#iAmUsually').editable({
        inputclass: 'input-large',
        select2: {
            tags: table.documento.iAmUsually,
            tokenSeparators: [",", " "]
        },
    	value:getValueStudent("iAmUsually", actualTrip),
        validate: function (value) {
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
            setValueStudent("iAmUsually", valueNew, actualTrip, true);
        },
    });
    var creditCardType_source = [];
    $.each(table.documento.creditCardType
    , function (k, v) {
    	creditCardType_source.push({
            value: v,
            text: v
        });
    });

    $('#creditCardType').editable({
        pk: 1,
        limit: 2,
        source: creditCardType_source,
        name: 'creditCardType',
        title: 'Credit Card',
        placeholder: 'Credit Card',
		value: getValueStudent("creditCardType", actualTrip),	        
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("creditCardType", value, actualTrip, true);
        },
    });
    $('#creditCardNumber').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'creditCardNumber',
        title: 'Number',
        placeholder: 'Number',
		value: getValueStudent("creditCardNumber", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("creditCardNumber", value, actualTrip, true);
        }
    });
    var expireDate = getValueStudent("creditCardExpire", actualTrip);
    $('#creditCardExpire').editable({
//		        url: '/post',
        type: 'text',
        datepicker: {
            todayBtn: 'linked'
        },
        pk: 1,
        name: 'creditCardExpire',
        title: 'Expire',
        placeholder: 'Expire',
		value: getValueStudent("creditCardExpire", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            var year = value.year().toString();
            var month = (value.month() + 1).toString();
            if (value.month() < 10){
            	month = '0' + month;
            };
            setValueStudent("creditCardExpire", month + year, actualTrip, true);
        }
    });
    $('#creditCardCVC').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'creditCardCVC',
        title: 'CVC',
        placeholder: 'CVC',
		value: getValueStudent("creditCardCVC", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("creditCardCVC", value, actualTrip, true);
        }
    });
    var apartamentType_source = [];
    $.each(table.documento.apartamentType
    , function (k, v) {
    	apartamentType_source.push({
            value: v,
            text: v
        });
    });

    $('#apartamentType').editable({
        pk: 1,
        limit: 2,
        source: apartamentType_source,
//		        value:"2 meals, 3 meals",
        name: 'apartamentType',
        title: 'Apartament Type',
        placeholder: 'Apartament Type',
		value: getValueStudent("apartamentType", actualTrip),	        
        validate: function (value) {
            setValueStudent("apartamentType", value, actualTrip, true);
        },
    });
    var petQuantity_source = [];
    $.each({
        "1" : "1",
        "2" : "2",
        "3" : "3",
        "4" : "4",
        "5" : "5"
    }, function (k, v) {
    	petQuantity_source.push({
            id: v,
            text: v
        });
    });
    $('#petQuantity').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'petQuantity',
        title: 'Quantity guest',
        placeholder: 'Quantity guest',
		value: getValueStudent("petQuantity", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("petQuantity", value, actualTrip, true);
        },
        source: petQuantity_source,
        select2: {
            width: 200
        }
    });
    $('#petType').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'petType',
        title: 'Pet Type',
        placeholder: 'Pet Type',
		value: getValueStudent("petType", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("petType", value, actualTrip, true);
        }
    });
    var parking_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	parking_source.push({
            id: v,
            text: v
        });
    });
    $('#parking').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'parking',
        title: 'Parking?',
        placeholder: 'Parking?',
		value: getValueStudent("parking", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("parking", value, actualTrip, true);
        },
        source: parking_source,
        select2: {
            width: 200
        }
    });
    var wifi_source = [];
    $.each({
        "Yes" : "Yes",
        "No" : "No"
    }, function (k, v) {
    	wifi_source.push({
            id: v,
            text: v
        });
    });
    $('#wifi').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'wifi',
        title: 'Dedicated WiFi?',
        placeholder: 'Dedicated WiFi?',
		value: getValueStudent("wifi", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("wifi", value, actualTrip, true);
        },
        source: liveCats_source,
        select2: {
            width: 200
        }
    });
    var peopleQuantity_source = [];
    $.each({
        "1" : "1",
        "2" : "2",
        "3" : "3",
        "4" : "4",
        "5" : "5"
    }, function (k, v) {
    	peopleQuantity_source.push({
            id: v,
            text: v
        });
    });
    $('#peopleQuantity').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'peopleQuantity',
        title: 'Quantity guest',
        placeholder: 'Quantity guest',
		value: getValueStudent("peopleQuantity", actualTrip),
        validate: function (value) {
        	$('.g5').addClass("hide");
        	$('.g' + value).removeClass("hide");
            setValueStudent("peopleQuantity", value, actualTrip, true);
        },
        source: peopleQuantity_source,
        select2: {
            width: 200
        }
    });
    var peopleQuantity = getValueStudent("peopleQuantity", actualTrip); 
    $('.g' + getValueStudent("peopleQuantity", actualTrip)).removeClass("hide");
    
    $('#guest_01').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'guest_01',
        title: 'Guest name',
        placeholder: 'Guest name',
		value: getValueStudent("guest_01", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("guest_01", value, actualTrip, true);
        }
    });
    $('#guest_02').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'guest_02',
        title: 'Guest name',
        placeholder: 'Guest name',
		value: getValueStudent("guest_02", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("guest_02", value, actualTrip, true);
        }
    });
    $('#guest_03').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'guest_03',
        title: 'Guest name',
        placeholder: 'Guest name',
		value: getValueStudent("guest_03", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("guest_03", value, actualTrip, true);
        }
    });
    $('#guest_04').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'guest_04',
        title: 'Guest name',
        placeholder: 'Guest name',
		value: getValueStudent("guest_04", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("guest_04", value, actualTrip, true);
        }
    });
    $('#guest_05').editable({
//		        url: '/post',
        type: 'text',
        pk: 1,
        name: 'guest_05',
        title: 'Guest name',
        placeholder: 'Guest name',
		value: getValueStudent("guest_05", actualTrip),
        validate: function (value) {
            if (value == '')
                return 'Required!';
            setValueStudent("guest_05", value, actualTrip, true);
        }
    });

    $('#agreeDebit').editable({
        pk: 1,
        limit: 1,
        source: [{
            value: 'Yes',
            text: 'Yes'
        }],
        name: 'agreeDebit',
        title: 'Yes',
        placeholder: 'Yes',
		value: getValueStudent("agreeDebit", actualTrip),	        
        validate: function (value) {
            if (value == '')
                return 'Required!';
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
           setValueStudent("agreeDebit", valueNew, actualTrip, true);
        },
    });
    $('#agreeDebitSuite').editable({
        pk: 1,
        limit: 1,
        source: [{
            value: 'Yes',
            text: 'Yes'
        }],
        name: 'agreeDebitSuite',
        title: 'Yes',
        placeholder: 'Yes',
		value: getValueStudent("agreeDebitSuite", actualTrip),	        
        validate: function (value) {
            if (value == '')
                return 'Required!';
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
            setValueStudent("agreeDebitSuite", valueNew, actualTrip, true);
        },
    });
    $('#agreeSuite').editable({
        pk: 1,
        limit: 1,
        source: [{
            value: 'Yes',
            text: 'Yes'
        }],
        name: 'agreeSuite',
        title: 'Yes',
        placeholder: 'Yes',
		value: getValueStudent("agreeSuite", actualTrip),	        
        validate: function (value) {
            if (value == '')
                return 'Required!';
			valueNew = "";
			var first = true;
		    $.each(value, function (i, optionValue) {
	    		if (first){
	    			valueNew = optionValue;
	    			first = false;
	    		}else{
	    			valueNew = valueNew + "," + optionValue;
	    		}
		    });
            setValueStudent("agreeSuite", valueNew, actualTrip, true);
        },
    });

    (function (e) {
        "use strict";
        var t = function (e) {
            this.init("address", e, t.defaults)
        };
        e.fn.editableutils.inherit(t, e.fn.editabletypes.abstractinput);
        e.extend(t.prototype, {
            render: function () {
                this.$input = this.$tpl.find("input")
            },
            value2html: function (t, n) {
                if (!t) {
                    e(n).empty();
                    return
                }
                var r = e("<div>").text(t.ruafuncionario).html() + ", " + e("<div>").text(t.numeroenderecofuncionario).html() + ", " +
                     e("<div>").text(t.bairroenderecofuncionario).html();
                e(n).html(r)
            },
            html2value: function (e) {
                return null
            },
            value2str: function (e) {
                var t = "";
                if (e)
                    for (var n in e)
                        t = t + n + ":" + e[n] + ";";
                return t
            },
            str2value: function (e) {
                return e
            },
            value2input: function (e) {
                if (!e)
                    return;
                this.$input.filter('[name="ruafuncionario"]').val(e.ruafuncionario);
                this.$input.filter('[name="numeroenderecofuncionario"]').val(e.numeroenderecofuncionario);
                this.$input.filter('[name="bairroenderecofuncionario"]').val(e.bairroenderecofuncionario)
            },
            input2value: function () {
                return {
                    ruafuncionario: this.$input.filter('[name="ruafuncionario"]').val(),
                    numeroenderecofuncionario: this.$input.filter('[name="numeroenderecofuncionario"]').val(),
                    bairroenderecofuncionario: this.$input.filter('[name="bairroenderecofuncionario"]').val()
                }
            },
            activate: function () {
                this.$input.filter('[name="ruafuncionario"]').focus()
            },
            autosubmit: function () {
                this.$input.keydown(function (t) {
                    t.which === 13 && e(this).closest("form").submit()
                })
            }
        });
        t.defaults = e.extend({}, e.fn.editabletypes.abstractinput.defaults, {
            tpl: '<div class="editable-address"><label><span>Endereço: </span><input type="text" name="ruafuncionario" class="input-small"></label></div><div class="editable-address"><label><span>Numero: </span><input type="text" name="numeroenderecofuncionario" class="input-small"></label></div><div class="editable-address"><label><span>Bairro: </span><input type="text" name="bairroenderecofuncionario" class="input-mini"></label></div>',
            inputclass: ""
        });
        e.fn.editabletypes.address = t
    })(window.jQuery);

	$('#enderecofuncionario').editable({
//		        url: '/post',
        value: {
            ruafuncionario: "Rua Aberto Brago",
            numeroenderecofuncionario: "235",
            bairroenderecofuncionario: "Butantã"
        },
        validate: function (value) {
            if (value.ruafuncionario == '')
                return 'Endereço obrigatório!';
        },
        display: function (value) {
            if (!value) {
                $(this).empty();
                return;
            }
            var html = $('<div>').text(value.ruafuncionario).html() + ', ' + $('<div>').text(value.numeroenderecofuncionario)
                .html() + ", " + $('<div>').text(value.bairroenderecofuncionario).html();
            $(this).html(html);
        }
    });

	function carregaLocalStorageStudent (objJson) {
	        localStorage.setItem("student", JSON.stringify(objJson));
	};
