/**
 * 
 */

function montaInstallmentDelete (installments, invoiceId){
    $.each(installments
		    , function (i, installment) {
	    criaLinhaInstallment(i, installment, invoiceId);
    });
};

function criaLinhaInstallment (i, installment, invoiceId) {
	
	var installmentLine = '<li class="installmentItem">' +
			'<div class="col-xs-12">' +
				'<fieldset class="memberList ">' +					
					'<section class="col-xs-11">' +
						'<section class="col-xs-3">' +
							'<span type="text" id="installmentDate_' + i + '" name="installmentDate_' + i + '" class="col-xs-3">' + installment.date + '</span>' +
							'<input type="text" id="paymentId_' + i + '" name="paymentId_' + i + '" class="hide">' +
						'</section>' +
						'<section class="col-xs-3">' +
							'<span type="text" id="installmentType_' + i + '" name="installmentType_' + i + '" class="col-xs-3">' + installment.type + '</span>' +
						'</section>' +
						'<section class="col-xs-3">' +
							'<span type="text" id="installmentValue_' + i + '" name="installmentValue_' + i + '" class="col-xs-3">' + installment.value + '</span>' +
						'</section>' +
						'<section class="col-xs-1">' +
							'<a id="delItem_' + i + '"  class="delItem control-item hide"><i class="glyphicon glyphicon-remove control-item "></i></a>' +
						'</section>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';
	$("#installmentsList").append(installmentLine);

	$('#delItem_' + i).off('click');
	$('#delItem_' + i).on('click', function () {
		var param  = 
		{
			id : invoiceId,
			date : installment.date,
			type : installment.type,
			value : installment.value,
		};	 
		localStorage.nextWindow = "invoices.html"
		rest_excluiInstallmentInvoice(param, atualizacaoEfetuada, semAcao, "Installment deleted", "problems to delete installment, try again");
	});
	
};
