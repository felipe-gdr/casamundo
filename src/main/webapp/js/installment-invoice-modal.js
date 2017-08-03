
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#invoiceModal-form").validate({
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
			var status = "unpaid";
			if (parseFloat($("#paymentValue").val()) == parseFloat($("#paymentBalance").html())){
				status = "paid";
			};
			var installment = {
				id : $("#invoiceId").val(),
				value : $("#paymentValue").val(),
				type : $("#paymentType").val(),
				date : limpaData($("#paymentDate").val()),
				status : status
			};
			var installmentOk = true;
			var message = "";
			if ($("#paymentType").val() != "Credit"){
				if (parseFloat($("#paymentValue").val()) > parseFloat($("#paymentBalance").html())){
					installmentOk = false;
					message = "No balance for this value";
				}else{
					if ($("#paymentType").val() == "Use Credit"){
						if (parseFloat($("#paymentValue").val()) > parseFloat($("#paymentBalanceGeral").html())){
							installmentOk = false;
							message = "No credit for this value";
						};
					};
				};
			};
			if (installmentOk){
				rest_incluiInstallmentInvoice(installment, fechaModalInstallment, semAcao, "", "", "invoices.html");
			}else{
				$.smallBox({
					title : "Error",
					content : "<i class='fa fa-clock-o'></i> <i>" + message + "</i>",
					color : "#ff8080",
					iconSmall : "fa fa-check fa-2x fadeInRight animated",
					timeout : 4000
				});
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
