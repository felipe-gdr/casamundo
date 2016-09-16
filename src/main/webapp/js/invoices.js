	// ** setar menu
	$("#menuInvoice_li").addClass("active");
	
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
// **** montagem do filtro para submissão ao server
//

	// **** testa existencia do email
	$(".text-filter").blur(function(){
		var filters = 
				'filter_student:' + $("#filter_student").val() + ',' +
				'filter_gender:' + $("#filter_gender").val() + ',' +
				'filter_nationality:' + $("#filter_nationality").val() + ',' +
				'filter_age_from:' + $("#filter_age_from").val() + ',' +
				'filter_age_to:' + $("#filter_age_to").val() + ',' +
				'filter_check_in:' + $("#filter_check_in").val() + ',' +
				'filter_check_out:' + $("#filter_check_out").val() + ',' +
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

		rest_obterInvoicessAll(carregaLocalStorageInvoices, semAcao, localStorage.usuarioCity, filters, "true");

	});	
