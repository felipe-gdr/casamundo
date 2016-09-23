 
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
		$("#name").html(data.documento.name);
		$("#type").html(data.documento.type);	
		$("#keyDoors").html(data.documento.keyDoor);	
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
							'<span class="txt-color-darken"><small class="text-muted" id="keyDoors' + i + '" data-original-title="Key door"> - key door: ' + floor.keyDoor + '</small></span><br>' +
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
		$("#name").val(data.documento.name);
		$("#type").val(data.documento.type);	
		$("#keyDoors").val(data.documento.keyDoor);	
		$("#description").val(data.documento.description);
	  	$("#contact_name").val(data.documento.contact.firstName + " " + data.documento.contact.lastName);
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
			    $('#id_' + i).val(value.id);
		    	$('#name_' + i).val(value.name);
		    	$('#keyDoor_' + i).val(value.keyDoor);
		    	$('#description_' + i).val(value.description);
		    });
	  	}else{
	  		criaLinhaFloor(0, 0);
	  	};
	  	if (data.documento.comments.length > 0){
		    $.each(data.documento.comments
				    , function (i, value) {
			    criaLinhaComment(i);
			    $('#commentsDate_' + i).val(value.date);
		    	$('#commentsUser_' + i).val(value.user);
		    	$('#commentsComment_' + i).val(value.comments);
		    });
	  	}else{
	  		criaLinhaComment(0);
	  	};
	  	if (data.documento.visits.length > 0){
		    $.each(data.documento.visits
				    , function (i, value) {
			    criaLinhaVisit(i);
			    $('#visitsDate_' + i).val(value.date);
		    	$('#visitsUser_' + i).val(value.user);
		    	$('#visitsComments_' + i).val(value.comments);
		    });
	  	}else{
	  		criaLinhaVisit(0);
	  	};
	};
	
	localStorage.setItem("dorm", JSON.stringify(data));
};    

function criaLinhaFloor (i) {
	var floorLine = 
		'<li class="floorItem" id="floorItem_' + i + '">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList body-background-color-dorm">' +					
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-home"></i>' +
							'<input class="body-background-color-dorm" type="text" id="name_' + i + '" name="name_' + i + '" placeholder="" disabled="disabled">' +
							'<input class="hide" type="text" id="id_' + i + '" name="id_' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-1">' +
						'<label class="input"> <i class="icon-prepend fa fa-home"></i>' +
							'<input class="body-background-color-dorm" type="text" id="keyDoors_' + i + '" name="keyDoors_' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<textarea rows="3" cols="30" id="description_' + i + '" name="description_' + i + '" class="custom-scroll body-background-color-dorm"></textarea>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="newItem_' + i + '"  class="newItemVisit"><i class="glyphicon glyphicon-plus"></i></a>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="delItem_' + i + '"  class="delItemVisit"><i class="glyphicon glyphicon-minus"></i></a>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';
	$("#floorsList").append(floorLine);

	acertaSinalItem ("floorItem", "");
	
	$('#newItem_' + i).off('click');
	$('#newItem_' + i).on('click', function () {
		criaLinhaFloor (i + 1);
		acertaSinalItem ("floorItem", "");
	});
	
	$('#delItem_' + i).off('click');
	$('#delItem_' + i).on('click', function () {
		$('#floorItem_' + i).remove();
		acertaSinalItem ("floorItem", "");
	});

};

function criaLinhaComment (i, comment) {

	var commentLine = 
		'<li class="commentItem" id="commentItem_' + i + '">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList body-background-color-dorm">' +					
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-calendar"></i>' +
							'<input type="text" id="commentsDate_' + i + '" name="commentsDate_' + i + '" class="datepicker body-background-color-dorm" data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input"><i class="icon-prepend fa fa-user"></i>'  +
						'<input class="body-background-color-dorm"type="text" id="commentsUser_' + i + '" name="commentsUser_' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input">'  +
							'<textarea rows="3" cols="30" id="commentsComment_' + i + '" name="commentsComment_' + i + '" class="custom-scroll body-background-color-dorm"></textarea>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="newItemComment_' + i + '"  class="newItemComment"><i class="glyphicon glyphicon-plus"></i></a>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="delItemComment_' + i + '"  class="delItemComment"><i class="glyphicon glyphicon-minus"></i></a>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';

	$("#commentsList").append(commentLine);

	$('#commentsDate_' + i).datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
		}
	});

	acertaSinalItem ("commentItem", "Comment");
	
	$('#newItemComment_' + i).off('click');
	$('#newItemComment_' + i).on('click', function () {
		criaLinhaComment (i + 1);
		acertaSinalItem ("commentItem", "Comment");
	});
	
	$('#delItemComment_' + i).off('click');
	$('#delItemComment_' + i).on('click', function () {
		$('#commentItem_' + i).remove();
		acertaSinalItem ("commentItem", "Comment");
	});

};


function criaLinhaVisit (i, visit) {

	var visitLine = 
		'<li class="visitItem" id="visitItem_' + i + '">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList body-background-color-dorm">' +					
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-calendar"></i>' +
							'<input type="text" id="visitsDate_' + i + '" name="visitsDate_' + i + '" class="datepicker body-background-color-dorm" data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input"><i class="icon-prepend fa fa-user"></i>'  +
						'<input class="body-background-color-dorm" type="text" id="visitsUser_' + i + '" name="visitsUser_' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input">'  +
							'<textarea rows="3" cols="30" id="visitsComments_' + i + '" name="visitsComments_' + i + '" class="custom-scroll body-background-color-dorm"></textarea>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="newItemVisit_' + i + '"  class="newItem"><i class="glyphicon glyphicon-plus"></i></a>' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<a id="delItemVisit_' + i + '"  class="delItem"><i class="glyphicon glyphicon-minus"></i></a>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';

	$("#visitsList").append(visitLine);

	$('#visitsDate_' + i).datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
		}
	});

	acertaSinalItem ("visitItem", "Visit");
	
	$('#newItemVisit_' + i).off('click');
	$('#newItemVisit_' + i).on('click', function () {
		criaLinhaVisit (i + 1);
		acertaSinalItem ("visitItem", "Visit");
	});
	
	$('#delItemVisit_' + i).off('click');
	$('#delItemVisit_' + i).on('click', function () {
		$('#visitItem_' + i).remove();
		acertaSinalItem ("visitItem", "Visit");
	});

};

function acertaSinalItem (assunto, item){

	var ultimoItem = 0;
	$("." + assunto).each(function() {
		var id = $(this).attr('id');
		var i = id.split("_")[1];
		$("#delItem" + item +"_" + i).removeClass("hide");
		$("#newItem" + item +"_" + i).addClass("hide");
		ultimoItem = i;
	});
	$("#newItem" + item +"_" + ultimoItem).removeClass("hide");
	if ($("." + assunto).length == 1){
		$("#delItem" + item +"_" + ultimoItem).addClass("hide");
	};
}

function limpaStorageDorm () {
	
	var data  =
			{ 
				documento :   
				  { 
				    dormName : "", 
				    type : "", 
				    numbersBedroom : "", 
				    numbersStudentsBedroom : "", 
				    offerPrivateWashroom : "", 
				    numberPrivateWashroom : "", 
				    offerInternet : "", 
				    haveDogs : "", 
				    haveCats : "", 
				    haveOtherPet : "", 
				    otherPet : "", 
				    firstLanguage : "", 
				    background : "", 
				    othersLanguage : [], 
				    acceptSmokeStudent : "", 
				    preferAgeStudent : [], 
				    preferGenderStudent : [], 
				    mealPlan : [], 
				    specialDiet : [], 
				    dontHostNationality : [], 
				    acceptSmokeInsideHome : "", 
				    howLongHaveYouBeen : "",
					description : "",
					uploadContract : "",				    
				    contact : { 
				      firstName : "", 
				      lastName : "", 
				      gender : "", 
				      birthDate : "",
				      ocuppation : "", 
				      employer : "", 
				      email : "", 
				      phoneNumber : "", 
				      mobilePhoneNumber : "", 
				      workPhoneNumber : "", 
				      docDate : ""
				    }, 
				    address : { 
				      street : "", 
				      number : "", 
				      city : "", 
				      state : "", 
				      postalCode : "", 
				      mainIntersection : "", 
				      nearestSubwayStation : "", 
				      timeSubwayStation : "",
				      subwayStation : "", 
				      destination:"", 
				      latitude:"", 
				      longitude:"" 
				    }, 
				    payment : { 
				    	financialInstitution : "", 
				    	bankNumber : "", 
				    	branchNumber : "", 
				    	accountNumber : "" 
					    }, 
				    fotos : { 
				      photo01 : "", 
				      photo02 : "", 
				      photo03 : "", 
				      photo04 : "", 
				      photo05 : "", 
				      photo06 : "" 
				    }, 
				    docs : { 
				      docs0 : "", 
				      docs1 : "", 
				      docs2 : "", 
				      docs3 : "", 
				      docs4 : "", 
				      docs5 : "", 
				      docs6 : "" 
				    }, 
				    dormMembers : [{ 
				        name : "", 
				        gender : "", 
				        relatioship : "", 
				        birthDate : "", 
				        ocuppation : "",
				        docDate : ""
				      }], 
				    rooms : [{ 
				        number : 0, 
				        singleBed : 0, 
				        coupleBed : 0, 
				        privateWashroom : "no",
				        level : "",
				    	photo : "",
				    	note : "",
				        occupancySingleBed : [ 
			                 { 
	   		                 emailStudent : "", 
	   		                 startOccupancy : "", 
	   		                 endOccupancy : "" 
	   		                 } 
	   		                 ], 
				        coupleBedAvailable : [ 
			                 { 
	   		                 emailStudent : "", 
	   		                 startOccupancy : "", 
	   		                 endOccupancy : "" 
	   		                 } 
	   		                 ] 
				      }], 
				    comments : [],
				    visits : [] 
				  } 
			};

	localStorage.setItem("dorm", JSON.stringify(data));
};		
function carregaInclusao(data) { 	   	
	localStorage.dormExistente = "false";
};    

function setValueDorm (field, value) {
	
	var objJson = JSON.parse(localStorage.getItem("dorm"));
	
	/*
	if (objJson.documento[field]){
        objJson.documento[field] = value;
	};
*/
	if (field == "dormName"){
        objJson.documento.dormName = value;
	};
	if (field == "type"){
        objJson.documento.type = value;
	};
	if (field == "numbersBedroom"){
        objJson.documento.numbersBedroom = value;
	};
	if (field == "numbersStudentsBedroom"){
        objJson.documento.numbersStudentsBedroom = value;
	};
	if (field == "offerPrivateWashroom"){
        objJson.documento.offerPrivateWashroom = value;
	};
	if (field == "numberPrivateWashroom"){
        objJson.documento.numberPrivateWashroom = value;
	};
	if (field == "offerInternet"){
        objJson.documento.offerInternet = value;
	};
	if (field == "haveDogs"){
        objJson.documento.haveDogs = value;
	};
	if (field == "haveCats"){
        objJson.documento.haveCats = value;
	};
	if (field == "haveOtherPet"){
        objJson.documento.haveOtherPet = value;
	};
	if (field == "otherPet"){
        objJson.documento.otherPet = value;
	};
	if (field == "firstLanguage"){
        objJson.documento.firstLanguage = value;
	};
	if (field == "background"){
        objJson.documento.background = value;
	};
	if (field == "othersLanguage"){
		var array = value.split(",");
        objJson.documento.othersLanguage = array;
	};
	if (field == "acceptSmokeStudent"){
        objJson.documento.acceptSmokeStudent = value;
	};
	if (field == "preferAgeStudent"){
		var array = value.split(",");
        objJson.documento.preferAgeStudent = array;
	};
	if (field == "preferGenderStudent"){
		var array = value.split(",");
        objJson.documento.preferGenderStudent = array;
	};
	if (field == "mealPlan"){
		var array = value.split(",");
        objJson.documento.mealPlan = array;
	};
	if (field == "specialDiet"){
		var array = value.split(",");
        objJson.documento.specialDiet = array;
	};
	if (field == "dontHostNationality"){
		var array = value.split(",");
        objJson.documento.dontHostNationality = array;
	};
	if (field == "acceptSmokeInsideHome"){
        objJson.documento.acceptSmokeInsideHome = value;
	};
	if (field == "howLongHaveYouBeen"){
        objJson.documento.howLongHaveYouBeen = value;
	};
	if (field == "description"){
        objJson.documento.description = value;
	};
  	if (field == "contact_firstName"){
        objJson.documento.contact.firstName = value;
	};
  	if (field == "contact_lastName"){
        objJson.documento.contact.lastName = value;
	};
  	if (field == "contact_gender"){
        objJson.documento.contact.gender = value;
	};
  	if (field == "contact_ocuppation"){
        objJson.documento.contact.ocuppation = value;
	};
  	if (field == "contact_employer"){
        objJson.documento.contact.employer = value;
	};
  	if (field == "contact_email"){
        objJson.documento.contact.email = value;
	};
  	if (field == "contact_phoneNumber"){
        objJson.documento.contact.phoneNumber = value;
	};
  	if (field == "contact_mobilePhoneNumber"){
        objJson.documento.contact.mobilePhoneNumber = value;
	};
  	if (field == "contact_workPhoneNumber"){
        objJson.documento.contact.workPhoneNumber = value;
	};
  	if (field == "contact_birthDate"){
        objJson.documento.contact.birthDate = limpaData(value);
	};
  	if (field == "address_street"){
        objJson.documento.address.street = value;
	};
  	if (field == "address_number"){
        objJson.documento.address.number = value;
	};
  	if (field == "address_city"){
        objJson.documento.address.city = value;
	};
  	if (field == "address_state"){
        objJson.documento.address.state = value;
	};
  	if (field == "address_postalCode"){
        objJson.documento.address.postalCode = value;
	};
  	if (field == "address_complement"){
        objJson.documento.address.complement = value;
	};
  	if (field == "address_mainIntersection"){
        objJson.documento.address.mainIntersection = value;
	};
  	if (field == "address_nearestSubwayStation"){
        objJson.documento.address.nearestSubwayStation = value;
	};
  	if (field == "address_timeSubwayStation"){
        objJson.documento.address.timeSubwayStation = value;
	};
  	if (field == "address_subwayStation"){
        objJson.documento.address.subwayStation = value;
	};
  	if (field == "payment_financialInstitution"){
        objJson.documento.payment.financialInstitution = value;
	};
  	if (field == "payment_bankNumber"){
        objJson.documento.payment.bankNumber = value;
	};
  	if (field == "payment_branchNumber"){
        objJson.documento.payment.branchNumber = value;
	};
  	if (field == "payment_accountNumber"){
        objJson.documento.payment.accountNumber = value;
	};
	if (field == "destination"){
        objJson.documento.address.destination = value;
	};
	if (field == "uploadContract"){
        objJson.documento.uploadContract = value;
	};
	if (field.slice(0, 5) == "photo"){
        objJson.documento.fotos[field] = value;
	};
	if (field.slice(0, 4) == "docs"){
        objJson.documento.docs[field] = value;
	};

	localStorage.setItem("dorm", JSON.stringify(objJson));
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
	window.location="dorm.html?mail=" + objJson.documento.dormName; 
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

