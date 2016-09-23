 
 function carregaMapa (results) {
	$('#address_street').val(results[0].formatted_address);
	$('.addressMap').removeClass("hide");
	generate_map_7(results[0].geometry.location.lat(), results[0].geometry.location.lng());	
	var objJson = JSON.parse(localStorage.getItem("dorm"));
	objJson.documento.address.latitude = results[0].geometry.location.lat();
	objJson.documento.address.longitude = results[0].geometry.location.lng();
	localStorage.setItem("dorm", JSON.stringify(objJson));
};

function enderecoComErro (data) {
	$('.addressMap').addClass("hide");		
};


function carregaTelaDorm(data, tipo) {
	
	// *** carga do select do mainintersection e subway
	if (data.documento.address.destination){
		rest_obterMainIntersectionAll(carregaSelectMainIntersection, semAcao, data.documento.address.destination);
		rest_obterSubwayAll(carregaSelectSubway, semAcao, data.documento.address.destination);
	};

	if (tipo == "consulta"){
	//
	// **** carrega tela consulta
	//
		$("#id").val(data.documento.id);
		$("#name").html(data.documento.name);
		$("#type").html(data.documento.type);	
		$("#keyDoor").html(data.documento.keyDoor);	
		$("#description").html(data.documento.description);
	  	$("#contact_name").html(data.documento.contact.firstName + " " + data.documento.contact.lastName);
	  	$("#contact_gender").html(data.documento.contact.gender);
	  	$("#contact_email").html(data.documento.contact.email);
	  	$("#contact_phoneNumber").html(data.documento.contact.phoneNumber);
	  	$("#contact_mobilePhoneNumber").html(data.documento.contact.mobilePhoneNumber);
	  	$("#contact_workPhoneNumber").html(data.documento.contact.workPhoneNumber);
	  	$("#address_street").html(data.documento.address.street);
	  	if (data.documento.address.street){
	  		getMapCoordinate(data.documento.address.street, localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
	  	};
	  	$("#address_number").html(data.documento.address.number);
	  	$("#address_city").html(data.documento.address.city);
	  	$("#address_state").html(data.documento.address.state);
	  	$("#address_postalCode").html(data.documento.address.postalCode);
	  	$("#address_complement").html(data.documento.address.complement);
	  	$("#address_mainIntersection").html(data.documento.address.mainIntersection);
	  	$("#address_nearestSubwayStation").html(data.documento.address.nearestSubwayStation);
	  	$("#address_timeSubwayStation").html(data.documento.address.timeSubwayStation);
	  	$("#address_subwayStation").html(data.documento.address.subwayStation);
	  	$("#address_destination").html(data.documento.address.destination);
	  	
	    $.each(data.documento.floors , function (i, floor) {
	    	var floorLine = 
		    	'<li>' +
					'<p class="text-muted">' +
						'<i class="fa fa-home"></i>&nbsp;&nbsp;' +
							'<span class="txt-color-darken"><small class="hide" id="' + floor.id + '" data-original-title="Number - "></small></span>' +
							'<span class="txt-color-darken"><small class="text-muted" id="name' + i + '" data-original-title="Name">' + floor.name + '</small></span>' +
							'<span class="txt-color-darken"><small class="text-muted" id="keyDoor' + i + '" data-original-title="Key door"> - key door: ' + floor.keyDoor + '</small></span><br>' +
							'<span class="txt-color-darken"><textarea rows="2"  cols="60" id="description' + i + '" name="description' + i + '" class="custom-scroll" disabled="disabled">' + floor.description + '</textarea></span>' +
				    '</p>' +
				'</li>'
	    	$("#floorsList").append(floorLine);
	    });
	    $.each(data.documento.comments
			    , function (i, value) {
	    	w = i + 1;
	    	var commentsLine = '<li>' +
										'<p class="text-muted">' +
											'<i class="fa fa-file-text-o"></i>&nbsp;&nbsp;' +
												'<span class="txt-color-darken"><small class="text-danger" id="comments_date' + i + '" data-original-title="Date - ">' + value.date + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="comments_user' + i + '" data-original-title="User"> - User : ' + value.user + '</small></span><br>' +
												'<span class="txt-color-darken"><textarea rows="3"  cols="60" id="comments_note' + i + '" name="comments_note' + i + '" class="custom-scroll" disabled="disabled">' + value.comments + '</textarea></span>' +
										'</p>' +
									'</li>'
	    	$("#commentsList").append(commentsLine);
	    });
	    $.each(data.documento.visits
			    , function (i, value) {
	    	w = i + 1;
	    	var visitsLine = '<li>' +
										'<p class="text-muted">' +
											'<i class="fa fa-file-text-o"></i>&nbsp;&nbsp;' +
											'<span class="txt-color-darken"><small class="text-danger" id="visits_date' + i + '" data-original-title="Date - ">' + value.date + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="visits_user' + i + '" data-original-title="User"> - User : ' + value.user + '</small></span><br>' +
											'<span class="txt-color-darken"><textarea rows="3"  cols="60" id="visits_comments' + i + '" name="visits_comments' + i + '" class="custom-scroll" disabled="disabled">' + value.comments + '</textarea></span><br>' +
										 '</p>' +
									'</li>'
	    	$("#visitsList").append(visitsLine);
	    });
	};	

	if (tipo == "alteracao"){
		//
		// **** carrega tela alteração
		//
		$("#id").val(data.documento.id);
		$("#name").val(data.documento.name);
		$("#type").val(data.documento.type);	
		$("#keyDoor").val(data.documento.keyDoor);	
		$("#description").val(data.documento.description);
	  	$("#contact_lastName").val(data.documento.contact.lastName);
	  	$("#contact_firstName").val(data.documento.contact.firstName);
	  	$("#contact_gender").val(data.documento.contact.gender);
	  	$("#contact_email").val(data.documento.contact.email);
	  	$("#contact_phoneNumber").val(data.documento.contact.phoneNumber);
	  	$("#contact_mobilePhoneNumber").val(data.documento.contact.mobilePhoneNumber);
	  	$("#contact_workPhoneNumber").val(data.documento.contact.workPhoneNumber);
	  	$("#address_street").val(data.documento.address.street);
	  	if (data.documento.address.street){
	  		getMapCoordinate(data.documento.address.street, localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
	  	};
	  	$("#address_number").val(data.documento.address.number);
	  	$("#address_city").val(data.documento.address.city);
	  	$("#address_state").val(data.documento.address.state);
	  	$("#address_postalCode").val(data.documento.address.postalCode);
	  	$("#address_complement").val(data.documento.address.complement);
	  	$("#address_mainIntersection").val(data.documento.address.mainIntersection);
	  	$("#address_nearestSubwayStation").val(data.documento.address.nearestSubwayStation);
	  	$("#address_timeSubwayStation").val(data.documento.address.timeSubwayStation);
	  	$("#address_subwayStation").val(data.documento.address.subwayStation);
	  	$("#address_destination").val(data.documento.address.destination);
	  	if (data.documento.floors.length > 0){
		    $.each(data.documento.floors
				    , function (i, value) {
			    criaLinhaFloor(i);
			    $('#id-' + i).val(value.id);
		    	$('#name-' + i).val(value.name);
		    	$('#keyDoor-' + i).val(value.keyDoor);
		    	$('#description-' + i).val(value.description);
		    });
	  	}else{
	  		criaLinhaFloor(0, 0);
	  	};
	  	if (data.documento.comments.length > 0){
		    $.each(data.documento.comments
				    , function (i, value) {
			    criaLinhaComment(i);
			    $('#commentsDate-' + i).val(value.date);
		    	$('#commentsUser-' + i).val(value.user);
		    	$('#commentsComment-' + i).val(value.comments);
		    });
	  	}else{
	  		criaLinhaComment(0);
	  	};
	  	if (data.documento.visits.length > 0){
		    $.each(data.documento.visits
				    , function (i, value) {
			    criaLinhaVisit(i);
			    $('#visitsDate-' + i).val(value.date);
		    	$('#visitsUser-' + i).val(value.user);
		    	$('#visitsComments-' + i).val(value.comments);
		    });
	  	}else{
	  		criaLinhaVisit(0);
	  	};
	};
	
	localStorage.setItem("dorm", JSON.stringify(data));
};    

function criaLinhaFloor (i) {
	var floorLine = 
		'<li class="floorItem" id="floorItem-' + i + '">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList body-background-color-dorm">' +					
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-home"></i>' +
							'<input class="body-background-color-dorm" type="text" id="name-' + i + '" name="name-' + i + '" placeholder="" >' +
							'<input class="hide" type="text" id="id-' + i + '" name="id-' + i + '" placeholder="" >' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-home"></i>' +
							'<input class="body-background-color-dorm" type="text" id="keyDoor-' + i + '" name="keyDoor-' + i + '" placeholder="" >' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-2">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<textarea rows="3" cols="30" id="description-' + i + '" name="description-' + i + '" class="custom-scroll body-background-color-dorm"></textarea>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="newItem-' + i + '"  class="newItemVisit"><i class="glyphicon glyphicon-plus"></i></a>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="delItem-' + i + '"  class="delItemVisit"><i class="glyphicon glyphicon-minus"></i></a>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';
	$("#floorsList").append(floorLine);

	acertaSinalItem ("floorItem", "");
	
	$('#newItem-' + i).off('click');
	$('#newItem-' + i).on('click', function () {
		criaLinhaFloor (i + 1);
		acertaSinalItem ("floorItem", "");
	});
	
	$('#delItem-' + i).off('click');
	$('#delItem-' + i).on('click', function () {
		$('#floorItem-' + i).remove();
		acertaSinalItem ("floorItem", "");
	});

};

function criaLinhaComment (i, comment) {

	var commentLine = 
		'<li class="commentItem" id="commentItem-' + i + '">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList body-background-color-dorm">' +					
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-calendar"></i>' +
							'<input type="text" id="commentsDate-' + i + '" name="commentsDate-' + i + '" class="datepicker body-background-color-dorm" data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input"><i class="icon-prepend fa fa-user"></i>'  +
						'<input class="body-background-color-dorm"type="text" id="commentsUser-' + i + '" name="commentsUser-' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input">'  +
							'<textarea rows="3" cols="30" id="commentsComment-' + i + '" name="commentsComment-' + i + '" class="custom-scroll body-background-color-dorm"></textarea>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="newItemComment-' + i + '"  class="newItemComment"><i class="glyphicon glyphicon-plus"></i></a>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="delItemComment-' + i + '"  class="delItemComment"><i class="glyphicon glyphicon-minus"></i></a>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';

	$("#commentsList").append(commentLine);

	$('#commentsDate-' + i).datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
		}
	});

	acertaSinalItem ("commentItem", "Comment");
	
	$('#newItemComment-' + i).off('click');
	$('#newItemComment-' + i).on('click', function () {
		criaLinhaComment (i + 1);
		acertaSinalItem ("commentItem", "Comment");
	});
	
	$('#delItemComment-' + i).off('click');
	$('#delItemComment-' + i).on('click', function () {
		$('#commentItem-' + i).remove();
		acertaSinalItem ("commentItem", "Comment");
	});

};


function criaLinhaVisit (i, visit) {

	var visitLine = 
		'<li class="visitItem" id="visitItem-' + i + '">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList body-background-color-dorm">' +					
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-calendar"></i>' +
							'<input type="text" id="visitsDate-' + i + '" name="visitsDate-' + i + '" class="datepicker body-background-color-dorm" data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input"><i class="icon-prepend fa fa-user"></i>'  +
						'<input class="body-background-color-dorm" type="text" id="visitsUser-' + i + '" name="visitsUser-' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input">'  +
							'<textarea rows="3" cols="30" id="visitsComments-' + i + '" name="visitsComments-' + i + '" class="custom-scroll body-background-color-dorm"></textarea>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="newItemVisit-' + i + '"  class="newItem"><i class="glyphicon glyphicon-plus"></i></a>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="delItemVisit-' + i + '"  class="delItem"><i class="glyphicon glyphicon-minus"></i></a>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';

	$("#visitsList").append(visitLine);

	$('#visitsDate-' + i).datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
		}
	});

	acertaSinalItem ("visitItem", "Visit");
	
	$('#newItemVisit-' + i).off('click');
	$('#newItemVisit-' + i).on('click', function () {
		criaLinhaVisit (i + 1);
		acertaSinalItem ("visitItem", "Visit");
	});
	
	$('#delItemVisit-' + i).off('click');
	$('#delItemVisit-' + i).on('click', function () {
		$('#visitItem-' + i).remove();
		acertaSinalItem ("visitItem", "Visit");
	});

};

function acertaSinalItem (assunto, item){

	var ultimoItem = 0;
	$("." + assunto).each(function() {
		var id = $(this).attr('id');
		var i = id.split("-")[1];
		$("#delItem" + item +"-" + i).removeClass("hide");
		$("#newItem" + item +"-" + i).addClass("hide");
		ultimoItem = i;
	});
	$("#newItem" + item +"-" + ultimoItem).removeClass("hide");
	if ($("." + assunto).length == 1){
		$("#delItem" + item +"-" + ultimoItem).addClass("hide");
	};
}
function carregaInclusao(data) { 	   	
	localStorage.dormExistente = "false";
};    

function retornaDorm(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Dorm updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("dorm"));
	window.location="dorm.html?id=" + objJson.documento.id; 
};

function retornaListaDorm(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Dorm included</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	window.location="dorms.html"; 
};


function carregaSelectMainIntersection(data) {
    $.each(data
		    , function (i, optionValue) {
    			$("#address_mainIntersection").append( $(option(optionValue.name)));
    });
};

function carregaSelectSubway(data) {
    $.each(data
		    , function (i, optionValue) {
    			$("#address_subwayStation").append( $(option(optionValue.name)));
    });
};

