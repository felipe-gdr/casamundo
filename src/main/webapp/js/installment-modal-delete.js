/**
 * 
 */

function montaInstallmentDelete (installments, idPayment){
    $.each(installments
		    , function (i, installment) {
	    criaLinhaInstallment(i, installment, idPayment);
    });
};

function criaLinhaInstallment (i, installment, idPayment) {
	
	var installmentLine = '<li class="installmentItem">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList ">' +					
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-11">' +
						'<section class="col-xs-3">' +
							'<span type="text" id="installmentDate_' + i + '" name="installmentDate_' + i + '" class="col-xs-3">' + installment.date + '</span>' +
							'<input type="text" id="idPayment_' + i + '" name="idPayment_' + i + '" class="hide">' +
						'</section>' +
						'<section class="col-xs-3">' +
							'<span type="text" id="installmentType_' + i + '" name="installmentType_' + i + '" class="col-xs-3">' + installment.type + '</span>' +
						'</section>' +
						'<section class="col-xs-3">' +
							'<span type="text" id="installmentValue_' + i + '" name="installmentValue_' + i + '" class="col-xs-3">' + installment.value + '</span>' +
						'</section>' +
						'<section class="col-xs-2">' +
							'<a id="delItem_' + i + '"  class="delItem control-item "><i class="glyphicon glyphicon-remove control-item "></i></a>' +
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
			id : idPayment,
			date : installment.date,
			type : installment.type,
			value : installment.value,
		};	 
		localStorage.nextWindow = "payments.html"
		rest_excluiInstallment(param, atualizacaoEfetuada, semAcao, "Installment deleted", "problems to delete installment, try again");
	});
	
};
