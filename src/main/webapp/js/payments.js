	// ** setar menu
	$("#menuPayment_li").addClass("active");
	
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

	
	$('#filter_due_date_from').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#filter_due_date_in').datepicker('option', 'minDate', selectedDate);
			$('#filter_due_date_from').focus();
		}
		});

	$('#filter_due_date_to').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
			$('#filter_due_date_to').focus();
		}
		});


// 
// **** montagem do filtro para submissão ao server
//

	// **** testa existencia do email
	$(".text-filter").blur(function(){
		var filters = 
				'filter_student:' + $("#filter_student").val() + ',' +
				'filter_destination:' + $("#filter_destination").val() + ',' +
				'filter_check_in:' + $("#filter_check_in").val() + ',' +
				'filter_check_out:' + $("#filter_check_out").val() + ',' +
				'filter_status:' + $("#filter_status").val() + ',' +
				'filter_due_date_from:' + $("#filter_due_date_from").val() + ',' +
				'filter_due_date_to:' + $("#filter_due_date_to").val() + ',' +
				'filter_vendor:' + $("#filter_vendor").val() + ',' +
				'filter_comments:' + $("#filter_comments").val();

		rest_obterPaymentsAll(carregaLocalStoragePayments, semAcao, localStorage.usuarioCity, filters, "true");

	});	

	
