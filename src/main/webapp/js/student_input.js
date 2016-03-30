/**
 * 
 */


    // **** carrega select
	var table = JSON.parse(localStorage.getItem("table"));

    $.each(table.documento.firstLanguage
		    , function (i, optionValue) {
    			$("#firstLanguageStudent").append( $(option(optionValue)));
		    });
    $.each(table.documento.nationality
		    , function (i, optionValue) {
    			$("#nationalityStudent").append( $(option(optionValue)));
		    });
    $.each(table.documento.mainPurposeTrip
		    , function (i, optionValue) {
    			$("#mainPurposeTripStudent").append( $(option(optionValue)));
		    });
    $.each(table.documento.englishLevel
		    , function (i, optionValue) {
    			$("#englishLevelStudent").append( $(option(optionValue)));
		    });
    $.each(table.documento.state
		    , function (i, optionValue) {
    			$("#stateStudent").append( $(option(optionValue)));
		    });
    $.each(table.documento.city
		    , function (i, optionValue) {
    			$("#cityStudent").append( $(option(optionValue)));
		    });
    $.each(table.documento.country
		    , function (i, optionValue) {
    			$("#countryStudent").append( $(option(optionValue)));
		    });
    $.each(table.documento.status
		    , function (i, optionValue) {
    			$("#status").append( $(option(optionValue)));
		    });
    $.each(table.documento.destination
		    , function (i, optionValue) {
    			$("#destination").append( $(option(optionValue)));
		    });
    $.each(table.documento.accommodation
		    , function (i, optionValue) {
    			$("#accommodation_group").append( $(radio(optionValue, "accommodation", i, 0)));
		    });
    $.each(table.documento.occupancy
		    , function (i, optionValue) {
    			$("#occupancy").append( $(option(optionValue)));
		    });
    $.each(table.documento.relationship
		    , function (i, optionValue) {
    			$("#relationship").append( $(option(optionValue)));
		    });
    $.each(table.documento.mealPlan
		    , function (i, optionValue) {
    			$("#mealPlan_section").append( $(checkbox(optionValue, "mealPlan")));
		    });
    $.each(table.documento.specialDiet
		    , function (i, optionValue) {
				$("#specialDiet_section").append( $(checkbox(optionValue, "specialDiet")));
		    });
    $.each(table.documento.creditCardType
		    , function (i, optionValue) {
    			$("#creditCardType").append( $(option(optionValue)));
		    });
    $.each(table.documento.apartamentType
		    , function (i, optionValue) {
    			$("#apartamentType").append( $(option(optionValue)));
		    });
    $.each(table.documento.apartamentType
		    , function (i, optionValue) {
    			$("#apartamentType").append( $(option(optionValue)));
		    });
    $.each(table.documento.apartamentType
		    , function (i, optionValue) {
    			$("#apartamentType").append( $(option(optionValue)));
		    });
	$('#birthDayStudent').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
	//		$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
		});
	$('#start').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#end').datepicker('option', 'minDate', selectedDate);
			}
		});
	$('#end').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});
	$('#arrivalDate').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});
	$('#flightDate').datepicker({
		dateFormat : 'dd.mm.yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
//			$('#finishdate').datepicker('option', 'minDate', selectedDate);
			}
	});

	$('#occupancy').change(function() {
		if ($(this).val() == "Twin" || $(this).val() == "Couple"){
			$(".guest").removeClass("hide");
		}else{
			$(".guest").addClass("hide");
		};
	})

	$('#arrivalTime').timepicker();
	$('#flightTime').timepicker();
	
	$(".homestay").removeClass("hide");
	
	$("#accommodation0").click(function() {
		$(".dorms").addClass("hide");
		$(".suite").addClass("hide");
		$(".homestay").removeClass("hide");
	});
	$("#accommodation1").click(function() {
		$(".homestay").addClass("hide");
		$(".suite").addClass("hide");
		$(".dorms").removeClass("hide");
	});
	$("#accommodation2").click(function() {
		$(".homestay").addClass("hide");
		$(".dorms").addClass("hide");
		$(".suite").removeClass("hide");
	});
    $('#usuallyStudy').editable({
        inputclass: 'input-large',
        select2: {
            tags: table.documento.usuallyStudy,
            tokenSeparators: [",", " "]
        },
    	value:"",
        validate: function (value) {
        },
    });
    $('#keepBedroom').editable({
        inputclass: 'input-large',
        select2: {
            tags: table.documento.keepBedroom,
            tokenSeparators: [",", " "]
        },
    	value:"",
        validate: function (value) {
        },
    });
    $('#iAmUsually').editable({
        inputclass: 'input-large',
        select2: {
            tags: table.documento.iAmUsually,
            tokenSeparators: [",", " "]
        },
    	value:"",
        validate: function (value) {
        },
    });


	function option(value) {
    	return '<option value="' + value +'">' + value +'</option>';
    };
    function checkbox(value, field) {
    	return '<label class="checkbox"><input type="checkbox" id="' + field +'" name="' + field +'"><i></i>' + value +'</label>';
    };    
    function radio(value, field, i, x) {
    	if (i == x){
    		return '<label class="radio"><input type="radio" id="' + field  + i +'" name="' + field + '" checked="checked"><i></i>' + value +'</label>';	
    	}
    	return '<label class="radio"><input type="radio" id="' + field  + i +'" name="' + field + '"><i></i>' + value +'</label>';
    };        