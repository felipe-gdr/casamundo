	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	if (parametrosDaUrl){
		localStorage.accommodation = parametrosDaUrl.split("=")[1];
	};

	// ** setar menu

	if (localStorage.accommodation == "Homestay"){
		$("#menuHomestay_li").addClass("active");
	};

	if (localStorage.accommodation == "Dorms"){
		$("#menuShare_li").addClass("active");
	};
	// *** flag para não permitir setar evento click na tabela
	localStorage.setClickTable = "false";
	
	
	$('#filter_check_in').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#filter_check_out').datepicker('option', 'minDate', selectedDate);
			$('#filter_check_in').focus();
		}
		});

	$('#filter_check_out').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#filter_check_out').focus();
		}
		});

	// 
	// **** limpa filtros
	//

	var filters = 
		'filter_student:""' + ',' +
		'filter_gender:""' + ',' +
		'filter_nationality:""' + ',' +
		'filter_destination:""' + ',' +
		'filter_age_from:""' + ',' +
		'filter_age_to:""' + ',' +
		'filter_check_in:""' + ',' +
		'filter_check_out:""' + ',' +
		'filter_check_in-end:""' + ',' +
		'filter_check_out-end:""' + ',' +
		'filter_status:""' + ',' +
		'filter_payment:""' + ',' +
		'filter_visa:""' + ',' +
		'filter_flight:""' + ',' +
		'filter_pickup:""' + ',' +
		'filter_dropoff:""' + ',' +
		'filter_school:""' + ',' +
		'filter_agent:""' + ',' +
		'filter_host:""' + ',' +
		'filter_driver:""' + ',' +
		'filter_occupancy:""' + ',' +
		'filter_private_wc:""' + ',' +
		'filter_dogs:""' + ',' +
		'filter_cats:""' + ',' +
		'filter_meals:""' + ',' +
		'filter_diet:""' + ',' +
		'filter_comments:""';

	localStorage.setItem("filters", filters);

// 
// **** montagem do filtro para submissão ao server
//

	// **** testa existencia do email
	$(".text-filter").blur(function(){
		var filters = 
				'filter_student:' + $("#filter_student").val() + ',' +
				'filter_gender:' + $("#filter_gender").val() + ',' +
				'filter_nationality:' + $("#filter_nationality").val() + ',' +
				'filter_destination:' + $("#filter_destination").val() + ',' +
				'filter_age_from:' + $("#filter_age_from").val() + ',' +
				'filter_age_to:' + $("#filter_age_to").val() + ',' +
				'filter_check_in:' + $("#filter_check_in").val() + ',' +
				'filter_check_out:' + $("#filter_check_out").val() + ',' +
				'filter_check_in-end:' + $("#filter_check_in-end").val() + ',' +
				'filter_check_out-end:' + $("#filter_check_out-end").val() + ',' +
				'filter_status:' + $("#filter_status").val() + ',' +
				'filter_payment:' + $("#filter_payment").val() + ',' +
				'filter_visa:' + $("#filter_visa").val() + ',' +
				'filter_flight:' + $("#filter_flight").val() + ',' +
				'filter_pickup:' + $("#filter_pickup").val() + ',' +
				'filter_dropoff:' + $("#filter_dropoff").val() + ',' +
				'filter_school:' + $("#filter_school").val() + ',' +
				'filter_agent:' + $("#filter_agent").val() + ',' +
				'filter_host:' + $("#filter_host").val() + ',' +
				'filter_driver:' + $("#filter_driver").val() + ',' +
				'filter_occupancy:' + $("#filter_occupancy").val() + ',' +
				'filter_private_wc:' + $("#filter_private_wc").val() + ',' +
				'filter_dogs:' + $("#filter_dogs").val() + ',' +
				'filter_cats:' + $("#filter_cats").val() + ',' +
				'filter_meals:' + $("#filter_meals").val() + ',' +
				'filter_diet:' + $("#filter_diet").val() + ',' +
				'filter_comments:' + $("#filter_comments").val();
		var valueFilters = "";
		$(".text-filter").each(function( i ) {
			valueFilters = valueFilters + $(this).val();
		});
		console.log ("filters:" + valueFilters);
		if (valueFilters == ""){
			filters = null;
		};
		if (filters != localStorage.getItem("filters")){
			localStorage.setItem("filters", filters);
		    console.log ("1 - filtro " + new Date().getTime());

			rest_obterStudentsAll(carregaLocalStorageStudents, semAcao, localStorage.usuarioCity, localStorage.accommodation , filters, null, null);
		};
	});	
