
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#paymentModal-form").validate({
		// Rules for form validation
		rules : {
			paymentValue : {
				required : true,
			},
			paymentDate : {
				required : true,
			},
			paymentType : {
				required : true,
			},
		},

		// Messages for form validation
		messages : {
			paymentValue : {
				required : 'Please enter payment value',
			},
			paymentDate : {
				required : 'Please enter payment date',
			},
			paymentType : {
				required : 'Please enter payment type',
			}
		},
		// form submition
		submitHandler : function(form) {
			var a = parseFloat($("#paymentValue").val());
			var b = parseFloat($("#paymentBalance").html());
			if (parseFloat($("#paymentValue").val()) > parseFloat($("#paymentBalance").html())){
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>No balance for this value</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
			}else{
				var status = "approved";
				if (parseFloat($("#paymentValue").val()) == parseFloat($("#paymentBalance").html())){
					status = "paid";
				};
				var installment =
					{
						id : $("#paymentId").val(),
						value : $("#paymentValue").val(),
						type :$("#paymentType").val(),
						date : limpaData($("#paymentDate").val()),
						status : status
					};
				rest_incluiInstallment(installment, fechaModalInstallment, semAcao, "", "", "payments.html");
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
	
	$('#paymentDate').datepicker({
	    changeMonth: true,
	    changeYear: true,
	    dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		yearRange: "1940:2020",
		onSelect : function(selectedDate) {
			}
		});

	$("#paymentValue").maskMoney({thousands:'', decimal:'.', allowZero:true});

	 function fechaModalInstallment (telaRetorno) {
			window.location = telaRetorno; 
	 };