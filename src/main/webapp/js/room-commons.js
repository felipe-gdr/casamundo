

function carregaTelaRoom(data, tipo) {
	

	if (tipo == "consulta"){
	//
	// **** carrega tela consulta
	//
		$("#id").val(data.documento.id);
		$("#dormName").html(data.documento.dormName);
		$("#idDorm").val(data.dorm.idDorm);
		$("#floorName").html(data.documento.floorName);
		$("#idFloor").val(data.dorm.idFloor);
		$("#name").html(data.documento.name);
		$("#type").html(data.documento.type);	
		$("#keyDoor").html(data.documento.keyDoor);	
		$("#description").html(data.documento.description);
	  	
	    $.each(data.documento.beds , function (i, bed) {
	    	var bedLine = 
		    	'<li>' +
					'<p class="text-muted">' +
						'<i class="fa fa-home"></i>&nbsp;&nbsp;' +
							'<span class="txt-color-darken"><small class="hide" id="' + bed.id + '" data-original-title="Number - "></small></span>' +
							'<span class="txt-color-darken"><small class="text-muted" id="type' + i + '" data-original-title="Name">' + bed.type + '</small></span>' +
							'<span class="txt-color-darken"><small class="text-muted" id="keyDoor' + i + '" data-original-title="Key door"> - key door: ' + bed.keyDoor + '</small></span><br>' +
							'<span class="txt-color-darken"><textarea rows="2"  cols="60" id="description' + i + '" name="description' + i + '" class="custom-scroll" disabled="disabled">' + bed.description + '</textarea></span>' +
				    '</p>' +
				'</li>'
	    	$("#bedsList").append(bedLine);
	    });
	    $.each(data.documento.comments
			    , function (i, value) {
	    	w = i + 1;
	    	var commentsLine = '<li>' +
										'<p class="text-muted">' +
											'<i class="fa fa-file-text-o"></i>&nbsp;&nbsp;' +
												'<span class="txt-color-darken"><small class="text-danger" id="commentsDate-' + i + '" data-original-title="Date - ">' + value.date + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="commentsUser-' + i + '" data-original-title="User"> - User : ' + value.user + '</small></span><br>' +
												'<span class="txt-color-darken"><textarea rows="3"  cols="60" id="commentsComments-' + i + '" class="custom-scroll" disabled="disabled">' + value.comments + '</textarea></span>' +
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
											'<span class="txt-color-darken"><small class="text-danger" id="visitsDate-' + i + '" data-original-title="Date - ">' + value.date + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="visitsUser-' + i + '" data-original-title="User"> - User : ' + value.user + '</small></span><br>' +
											'<span class="txt-color-darken"><textarea rows="3"  cols="60" id="visitsComments-' + i + '" class="custom-scroll" disabled="disabled">' + value.comments + '</textarea></span><br>' +
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
		$("#idDorm").val(data.documento.idDorm);
		$("#idFloor").val(data.documento.idFloor);
		$("#dormName").val(data.documento.dormName);
		$("#floorName").val(data.documento.floorName);
		$("#name").val(data.documento.name);
		$("#type").val(data.documento.type);	
		$("#keyDoor").val(data.documento.keyDoor);	
		$("#description").val(data.documento.description);
	  	if (data.documento.beds.length > 0){
		    $.each(data.documento.beds
				    , function (i, value) {
			    criaLinhaBed(i);
			    $('#id-' + i).val(value.id);
		    	$('#type-' + i).val(value.type);
		    	$('#description-' + i).val(value.description);
		    });
	  	}else{
	  		criaLinhaBed(0, 0);
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
			$('#commentsUser-0').val(localStorage.userNameEmail);
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
			$('#visitsUser-0').val(localStorage.userNameEmail);
	  	};
		var objDorm = JSON.parse(localStorage.getItem("dorm"));
	    $.each(objDorm.documento.floors, function (i, floor) {
			$('#idFloor').append( $(option(floor.name, "", true, floor.id)));
	    });
		$("#idFloor").val(data.documento.idFloor);
	};
	
	localStorage.setItem("room", JSON.stringify(data));
};    

function criaLinhaBed (i) {
	var bedLine = 
		'<li class="bedItem" id="bedItem-' + i + '">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList body-background-color-room">' +					
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-home"></i>' +
							'<input class="body-background-color-room" type="text" id="type-' + i + '" name="type-' + i + '" placeholder="" >' +
							'<input class="hide" type="text" id="id-' + i + '" name="id-' + i + '" placeholder="" >' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-2">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<textarea rows="3" cols="30" id="description-' + i + '" name="description-' + i + '" class="custom-scroll body-background-color-room"></textarea>' +
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
	$("#bedsList").append(bedLine);

	acertaSinalItem ("bedItem", "");
	
	$('#newItem-' + i).off('click');
	$('#newItem-' + i).on('click', function () {
		criaLinhaBed (i + 1);
		acertaSinalItem ("bedItem", "");
	});
	
	$('#delItem-' + i).off('click');
	$('#delItem-' + i).on('click', function () {
		$('#bedItem-' + i).remove();
		acertaSinalItem ("bedItem", "");
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
							'<textarea rows="3" cols="30" id="commentsComments-' + i + '" name="commentsComments-' + i + '" class="custom-scroll body-background-color-dorm"></textarea>' +
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
		$('#commentsUser-' + (i + 1)).val(localStorage.userNameEmail);
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
		$('#visitsUser-' + (i + 1)).val(localStorage.userNameEmail);
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
	localStorage.roomExistente = "false";
};    

function retornaRoom(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Room updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("dorm"));
	window.location="dorm.html?id=" + objJson.documento.id; 
};

function retornaListaRoom(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Room included</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("dorm"));
	window.location="dorm.html?id=" + objJson.documento.id; 
};

