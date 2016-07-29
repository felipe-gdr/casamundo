 
 function carregaMapa (results) {
	$('#address_street').val(results[0].formatted_address);
	$('.addressMap').removeClass("hide");
	generate_map_7(results[0].geometry.location.lat(), results[0].geometry.location.lng());	
	var objJson = JSON.parse(localStorage.getItem("family"));
	objJson.documento.address.latitude = results[0].geometry.location.lat();
	objJson.documento.address.longitude = results[0].geometry.location.lng();
	localStorage.setItem("family", JSON.stringify(objJson));
};

function enderecoComErro (data) {
	$('.addressMap').addClass("hide");		
};


function carregaTelaFamily(data, tipo) {
	
	if (tipo == "consulta"){
	//
	// **** carrega tela consulta
	//
		$("#familyName").html(data.documento.familyName);
		$("#type").html(data.documento.type);	
		$("#numbersBedroom").html(data.documento.numbersBedroom);
		$("#numbersStudentsBedroom").html(data.documento.numbersStudentsBedroom);
		$("#offerPrivateWashroom").html(data.documento.offerPrivateWashroom);
		$("#numberPrivateWashroom").html(data.documento.numberPrivateWashroom);
		$("#offerInternet").html(data.documento.offerInternet);
		$("#haveDogs").html(data.documento.haveDogs);
		$("#haveCats").html(data.documento.haveCats);
		$("#haveOtherPet").html(data.documento.haveOtherPet);
		if (data.documento.haveOtherPet == "Yes"){
			$("#otherPet").html(data.documento.otherPet);
			$(".pet").removeClass("hide");
		}
		$("#firstLanguage").html(data.documento.firstLanguage);
		$("#background").html(data.documento.background);
		$("#othersLanguage").html(data.documento.othersLanguage);
		$("#acceptSmokeStudent").html(data.documento.acceptSmokeStudent);
		$("#preferAgeStudent").html(data.documento.preferAgeStudent);
		$("#preferGenderStudent").html(data.documento.preferGenderStudent);
		$("#mealPlan").html(data.documento.mealPlan);
		$("#specialDiet").html(data.documento.specialDiet);
		$("#dontHostNationality").html(data.documento.dontHostNationality);
		$("#acceptSmokeInsideHome").html(data.documento.acceptSmokeInsideHome);
		$("#howLongHaveYouBeen").html(data.documento.howLongHaveYouBeen);
		$("#description").html(data.documento.description);
	  	$("#contact_name").html(data.documento.contact.firstName + " " + data.documento.contact.lastName);
	  	$("#contact_gender").html(data.documento.contact.gender);
	  	$("#contact_birthDate").html(separaDataMes(data.documento.contact.birthDate, "-"));
	  	$("#contact_age").html(calculaIdade(separaConverteDataMes(data.documento.contact.birthDate, "/")));
	  	$("#contact_ocuppation").html(data.documento.contact.ocuppation);
	  	$("#contact_employer").html(data.documento.contact.employer);
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
	  	$("#payment_financialInstitution").html(data.documento.payment.financialInstitution);
	  	$("#payment_bankNumber").html(data.documento.payment.bankNumber);
	  	$("#payment_branchNumber").html(data.documento.payment.branchNumber);
	  	$("#payment_accountNumber").html(data.documento.payment.accountNumber);
	  	
	  	var relationShip = "";
    	if (data.documento.contact.gender == "Male") {
    		relationShip = "Host Father";	
    	}else{
    		relationShip = "Host Mother";
    	}
    	var mobile = ""; 
    	if (data.documento.contact.occuppation) {
    		'<span class="txt-color-darken"><small class="text-muted" id="familyMobilePhone' + 0 + '" data-original-title="Name"> - Mobile Phone: ' + data.documento.contact.workPhoneNumber + '</small></span>'
    	}
    	var familyMemberLine = '<li>' +
									'<p class="text-muted">' +
										'<i class="fa fa-user"></i>&nbsp;&nbsp;' +
											'<span class="txt-color-darken"><small class="text-danger" id="familyName' + 0 + '" data-original-title="Name">' + data.documento.contact.firstName + " " + data.documento.contact.lastName + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyGender' + 0 + '" data-original-title="Name"> - Gender: ' + data.documento.contact.gender + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyBirthDate' + 0 + '" data-original-title="Name"> - Birhdate: ' + separaDataMes(data.documento.contact.birthDate, "-") + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyAge' + 0 + '" data-original-title="Name"> - Age: ' + calculaIdade(separaConverteDataMes(data.documento.contact.birthDate, "/")) + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyRelationship' + 0 + '" data-original-title="Name"> - Relationship: ' + relationShip + '</small></span>' +
											'<span class="txt-color-darken"><small class="text-muted" id="familyOcuppation' + 0 + '" data-original-title="Name"> - Ocuppation: ' + data.documento.contact.ocuppation + '</small></span>' +
									'</p>' +
								'</li>'
    	$("#familyMembersList").append(familyMemberLine);
	    $.each(data.documento.familyMembers
			    , function (i, value) {
	    	w = i + 1;
	    	var mobile = ""; 
	    	if (value.mobilePhone) {
	    		'<span class="txt-color-darken"><small class="text-muted" id="familyMobilePhone' + w + '" data-original-title="Name"> - Mobile Phone: ' + value.mobilePhone + '</small></span>'
	    	}
	    	var familyMemberLine = '<li>' +
										'<p class="text-muted">' +
											'<i class="fa fa-user"></i>&nbsp;&nbsp;' +
												'<span class="txt-color-darken"><small class="text-danger" id="familyName' + w + '" data-original-title="Name">' + value.name + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyGender' + w + '" data-original-title="Name"> - Gender: ' + value.gender + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyBirthDate' + w + '" data-original-title="Name"> - Birhdate: ' + separaDataMes(value.birthDate, "-") + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyAge' + w + '" data-original-title="Name"> - Age: ' + calculaIdade(separaConverteDataMes(value.birthDate, "/")) + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyRelationship' + w + '" data-original-title="Name"> - Relationship: ' + value.relationship + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="familyOcuppation' + 0 + '" data-original-title="Name"> - Ocuppation: ' + value.ocuppation + '</small></span>' +
										'</p>' +
									'</li>'
	    	$("#familyMembersList").append(familyMemberLine);
	    });
	    $.each(data.documento.rooms
			    , function (i, value) {
	    	w = i + 1;
	    	var roomLine = '<li>' +
										'<p class="text-muted">' +
											'<i class="fa fa-home"></i>&nbsp;&nbsp;' +
												'<span class="txt-color-darken"><small class="text-danger" id="number' + i + '" data-original-title="Number - ">' + w + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="singleBed' + i + '" data-original-title="Number Single Bed"> - Number Single Bed : ' + value.singleBed + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="coupleBed' + i + '" data-original-title="Number Double Bed"> - Number Double Bed : ' + value.coupleBed + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="privateWashroom' + i + '" data-original-title="Have Private Washroom"> - Have Private Washroom : ' + value.privateWashroom + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="level' + i + '" data-original-title="Level"> - Level : ' + value.level + '</small></span>' +
												'<div class="col-xs-12">' +
											    	'<div id="files-roomPhoto' + i + '" class="input-value files col-xs-2">' + 
										    			'<img id="img-roomPhoto' + i + '" class="imgUpload">' +
										    		'</div>' +
										    		'<div class="col-xs-1">' +
										    		'</div>' +
										    		'<div class="col-xs-3">' +
										    			'<textarea rows="5"  cols="40" id="note' + i + '" name="note' + i + '" class="custom-scroll" disabled="disabled">' + value.note + '</textarea>' +
										    		'</div>' +
										    	'</div>' +
									    '</p>' +
									'</li>'
	    	$("#roomsList").append(roomLine);
	    	if (value.photo){
	    		carregaPhoto (localStorage.app, value.photo, "roomPhoto" + i);
	    	};
	    });
	    $.each(data.documento.notes
			    , function (i, value) {
	    	w = i + 1;
	    	var notesLine = '<li>' +
										'<p class="text-muted">' +
											'<i class="fa fa-file-text-o"></i>&nbsp;&nbsp;' +
												'<span class="txt-color-darken"><small class="text-danger" id="notes_date' + i + '" data-original-title="Date - ">' + value.date + '</small></span>' +
												'<span class="txt-color-darken"><small class="text-muted" id="notes_user' + i + '" data-original-title="User"> - User : ' + value.user + '</small></span><br>' +
												'<span class="txt-color-darken"><textarea rows="3"  cols="60" id="notes_note' + i + '" name="notes_note' + i + '" class="custom-scroll" disabled="disabled">' + value.note + '</textarea></span>' +
										'</p>' +
									'</li>'
	    	$("#notesList").append(notesLine);
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
		$("#familyName").val(data.documento.familyName);
		$("#type").val(data.documento.type);	
		$("#numbersBedroom").val(data.documento.numbersBedroom);
		$("#numbersStudentsBedroom").val(data.documento.numbersStudentsBedroom);
		if (data.documento.offerPrivateWashroom == "Yes"){
			$("#offerPrivateWashroom").prop("checked", true)
		}
		$("#numberPrivateWashroom").val(data.documento.numberPrivateWashroom);
		if (data.documento.offerInternet == "Yes"){
			$("#offerInternet").prop("checked", true)
		}
		if (data.documento.haveDogs == "Yes"){
			$("#haveDogs").prop("checked", true)
		}
		if (data.documento.haveCats == "Yes"){
			$("#haveCats").prop("checked", true)
		}
		if (data.documento.haveOtherPet == "Yes"){
			$("#haveOtherPet").prop("checked", true);
			$("#otherPet").val(data.documento.otherPet);
			$(".pet").removeClass("hide");
		}
		$("#firstLanguage").val(data.documento.firstLanguage);
		$("#background").val(data.documento.background);
		$("#othersLanguage").val(data.documento.othersLanguage);
		$("#acceptSmokeStudent").val(data.documento.acceptSmokeStudent);
		$("#preferAgeStudent").val(data.documento.preferAgeStudent);
		$("#preferGenderStudent").val(data.documento.preferGenderStudent);
		$("#mealPlan").val(data.documento.mealPlan);
		$("#specialDiet").val(data.documento.specialDiet);
		$("#dontHostNationality").val(data.documento.dontHostNationality);
		if (data.documento.acceptSmokeInsideHome == "Yes"){
			$("#acceptSmokeInsideHome").prop("checked", true)
		}
		$("#howLongHaveYouBeen").val(data.documento.howLongHaveYouBeen);
		$("#description").val(data.documento.description);
	  	$("#contact_firstName").val(data.documento.contact.firstName);
	  	$("#contact_lastName").val(data.documento.contact.lastName)
	  	$("#contact_gender").val(data.documento.contact.gender);
	  	$("#contact_birthDate").val(separaDataMes(data.documento.contact.birthDate, "-"));
	  	$("#contact_age").html(calculaIdade(separaConverteDataMes(data.documento.contact.birthDate, "/")));
	  	$("#contact_ocuppation").val(data.documento.contact.ocuppation);
	  	$("#contact_employer").val(data.documento.contact.employer);
	  	$("#contact_email").val(data.documento.contact.email);
	  	$("#contact_phoneNumber").val(data.documento.contact.phoneNumber);
	  	$("#contact_mobilePhoneNumber").val(data.documento.contact.mobilePhoneNumber);
	  	$("#contact_workPhoneNumber").val(data.documento.contact.workPhoneNumber);
	  	$("#address_street").val(data.documento.address.street);
	  	$("#address_number").val(data.documento.address.number);
	  	$("#address_city").val(data.documento.address.city);
	  	$("#address_state").val(data.documento.address.state);
	  	$("#address_postalCode").val(data.documento.address.postalCode);
	  	$("#address_complement").val(data.documento.address.complement);
	  	$("#address_mainIntersection").val(data.documento.address.mainIntersection);
	  	$("#address_nearestSubwayStation").val(data.documento.address.nearestSubwayStation);
	  	$("#address_timeSubwayStation").val(data.documento.address.timeSubwayStation);
	  	$("#address_subwayStation").val(data.documento.address.subwayStation);
	  	$("#payment_financialInstitution").val(data.documento.payment.financialInstitution);
	  	$("#payment_bankNumber").val(data.documento.payment.bankNumber);
	  	$("#payment_branchNumber").val(data.documento.payment.branchNumber);
	  	$("#payment_accountNumber").val(data.documento.payment.accountNumber);
	  	$("#destination").val(data.documento.address.destination);
		 if ($('#address_street').val()){
			 getMapCoordinate($('#address_street').val(), localStorage.mapsCoordinate, carregaMapa, enderecoComErro);
		 };
	  	var lines = 0;
	    criaLinhaFamilyMember(0, data.documento.familyName);
	    $('#familyMemberName_0').val(data.documento.contact.firstName + " " + data.documento.contact.lastName);
    	$('#familyMemberGender_0').val(data.documento.contact.gender);
    	$('#familyMemberBirthdate_0').val(separaDataMes(data.documento.contact.birthDate, "-"));
    	if (data.documento.contact.genre == "Male") {
    		$('#familyMemberRelationship_0').val("Host Father");	
    	}else{
    		$('#familyMemberRelationship_0').val("Host Mother");
    	}
        $('#familyMemberOcuppation_0').val(data.documento.contact.ocuppation);
        $('#familyMemberDocDate_0').val(data.documento.contact.docDate);
        $('#docs0').val(data.documento.docs.docs0);
		$('.docs0').removeClass("hide");
    	lines = 1;
	    $.each(data.documento.familyMembers
			    , function (i, value) {
	    	z = i + 1;
		    criaLinhaFamilyMember(z, data.documento.familyName);
		    $('#familyMemberName_' + z).val(value.name);
	    	$('#familyMemberGender_' + z).val(value.gender);
	    	$('#familyMemberBirthdate_' + z).val(separaDataMes(value.birthDate, "-"));
	        $('#familyMemberRelationship_' + z).val(value.relationship);
	        $('#familyMemberOcuppation_' + z).val(value.ocuppation);
	        $('#familyMemberDocDate_' + z).val(value.docDate);
	        var photoDocs = "docs" + z;
	        $('#docs' + z).val(data.documento.docs[photoDocs]);
	    	montaPhoto (localStorage.app, "family", "docsFamily", "family", data.documento.familyName, "docs" + i);
	    	if (value.docDate){
	    		carregaPhoto (localStorage.app, data.documento.docs["docs" + i], "docs" + i);
	    	};
		  	var age = calculaIdade(separaConverteDataMes(value.birthDate, "/"));
			$('.docs' + i).removeClass("hide");
	    	lines = z + 1;
	    });
	    criaLinhaFamilyMember(lines, data.documento.familyName);
	    if (linesRoom != 0){
		    montaPhoto (localStorage.app, "family", "docsFamily", "family", data.documento.familyName, "docs" + lines);
	    };
	  	var linesRoom = 0;
	    $.each(data.documento.rooms
			    , function (i, value) {
		    criaLinhaRoom(i);
		    $('#number_' + i).val(i + 1);
	    	$('#singleBed_' + i).val(value.singleBed);
	    	$('#coupleBed_' + i).val(value.coupleBed);
	        $('#privateWashroom_' + i).val(value.privateWashroom);
	        $('#level' + i).val(value.level);
	        $('#note' + i).val(value.note);
	        $('#roomPhoto' + i).val(value.photo);
	    	montaPhoto (localStorage.app, "family", "roomsPhoto", "family", data.documento.familyName, "roomPhoto" + i);
	    	if (value.photo){
	    		carregaPhoto (localStorage.app, value.photo, "roomPhoto" + i);
	    	};
	    	$('.roomPhoto' + i).removeClass("hide");
	    	linesRoom = i + 1;
	    });
	    criaLinhaRoom(linesRoom);
	    $('#number_' + linesRoom).val(linesRoom + 1);
	    if (linesRoom != 0){
		    montaPhoto (localStorage.app, "family", "roomsPhoto", "family", data.documento.familyName, "roomPhoto" + linesRoom);
	    };
	  	var linesNote = 0;
	    $.each(data.documento.notes
			    , function (i, value) {
		    criaLinhaNote(i);
		    $('#notesDate_' + i).val(value.date);
	    	$('#notesUser_' + i).val(value.user);
	    	$('#notesNote_' + i).val(value.note);
	    	linesNote = i + 1;
	    });
	    criaLinhaNote(linesNote);
	  	var linesVisit = 0;
	    $.each(data.documento.visits
			    , function (i, value) {
		    criaLinhaVisit(i);
		    $('#visitsDate_' + i).val(value.date);
	    	$('#visitsUser_' + i).val(value.user);
	    	$('#visitsComments_' + i).val(value.comments);
	    	linesVisit = i + 1;
	    });
	    criaLinhaVisit(linesVisit);
	};
	//
	// carrega contrato
	//
	
	if (data.documento.uploadContract){
		carregaPhoto (localStorage.app, data.documento.uploadContract, "uploadContract");
		$("#uploadContract").val(data.documento.uploadContract);
	}
	//
	// carrega fotos
	//
	
	if (data.documento.fotos.photo01){
		carregaPhoto (localStorage.app, data.documento.fotos.photo01, "photo01");
		$("#photo01").val(data.documento.fotos.photo01);
	}
	if (data.documento.fotos.photo02){
		carregaPhoto (localStorage.app, data.documento.fotos.photo02, "photo02");
		$("#photo02").val(data.documento.fotos.photo02);
	}
	if (data.documento.fotos.photo03){
		carregaPhoto (localStorage.app, data.documento.fotos.photo03, "photo03");
		$("#photo03").val(data.documento.fotos.photo03);
	}
	if (data.documento.fotos.photo04){
		carregaPhoto (localStorage.app, data.documento.fotos.photo04, "photo04");
		$("#photo04").val(data.documento.fotos.photo04);
	}
	if (data.documento.fotos.photo05){
		carregaPhoto (localStorage.app, data.documento.fotos.photo05, "photo05");
		$("#photo05").val(data.documento.fotos.photo05);
	}
	if (data.documento.fotos.photo06){
		carregaPhoto (localStorage.app, data.documento.fotos.photo06, "photo06");
		$("#photo06").val(data.documento.fotos.photo05);
	}
	
	localStorage.setItem("family", JSON.stringify(data));
};    

function criaLinhaFamilyMember (i, familyName) {
	var familyMemberLine = '<li class="familyMemberItem">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList">' +					
					'<section class="col-xs-3">' +
						'<label class="input"> <i class="icon-prepend fa fa-user"></i>' +
							'<input type="text" id="familyMemberName_' + i + '" name="familyMemberName_' + i + '" placeholder="">' +
							'<input class="hide" type="text" id="docs' + i + '" name="docs' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<label class="select ">' +
							'<select id="familyMemberGender_' + i + '" name="familyMemberGender_' + i + '">' +
								'<option value="" selected="" disabled=""></option>' +
								'<option value="Male">Male</option>' +
								'<option value="Female">Female</option>' +
							'</select><i></i>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-2">' +
						'<label class="input"><i class="icon-prepend fa fa-calendar"></i>'  +
							'<input type="text" id="familyMemberBirthdate_' + i + '" name="familyMemberBirthdate_' + i + '" class="datepicker" data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
					'</section>' +
					'<section class="col-xs-2">' +
						'<label class="select ">' +
							'<select id="familyMemberRelationship_' + i + '" name="familyMemberRelationship_' + i + '">' +
								'<option value="" selected="" disabled=""></option>' +
							'</select><i></i>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-wrench"></i>' +
							'<input type="text" id="familyMemberOcuppation_' + i + '" name="familyMemberOcuppation_' + i + '" placeholder="">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
					'</section>' +
					'<section class="col-xs-2 docs' + i + ' hide">' +
						'<span class="btn btn-success fileinput-button ">' + 
					        '<i class="glyphicon glyphicon-plus"></i>' + 
					        '<span> Load document ...</span>' + 
					        '<input id="upload-img-docs' + i + '" type="file" name="uploadedFile" class="imgUpload">' + 
					    '</span> ' +
					    '<br> ' +
					    '<div id="progress-docs' + i + '" class="progress col-xs-04"">' + 
					       '<div class="progress-bar progress-bar-success"></div>' + 
					    '</div> ' +
					    '<div id="files-docs' + i + '" class="input-value files col-xs-04""> ' +
					    	'<img id="img-docs' + i + '" class="imgUpload">' +
					    '</div>' +
					'</section>' +
					'<section class="col-xs-2 hide docs' + i + '">' +
					'</section>' +
					'<section class="col-xs-2 hide docs' + i + '">' +
						'<span class="btn btn-success fileinput-button ">' + 
					        '<span> Date of issue</span>' + 
					    '</span> ' +
						'<label class="input"> <i class="icon-prepend fa fa-calendar"></i>' +
							'<input type="text" id="familyMemberDocDate_' + i + '" name="familyMemberDocDate_' + i + '" placeholder="" class="datepicker" data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';
	$("#familyMembersList").append(familyMemberLine);
	$('#familyMemberBirthdate_' + i).datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
		}
	});
	$('#familyMemberDocDate_' + i).datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
		}
	});
	$('#familyMemberBirthdate_' + i).bind('blur', function () {
		var idade = calculaIdade(montaDataMesNum($('#familyMemberBirthdate_' + i).val(),"/"));
		if (idade > 17){
			montaPhoto (localStorage.app, "family", "docsFamily", "family", $("#familyName").val(), "docs" + w);
			$('.docs' + w).removeClass("hide");	
		}else{
			var labelId = "docs" + w;
        	obj = JSON.parse(localStorage.getItem("family"));
        	obj.documento.docs[labelId] =  "";
        	localStorage.setItem("family", JSON.stringify(obj));
			$('.docs' + w).addClass("hide");				
		};
    });

	var table = JSON.parse(localStorage.getItem("table"));
	$.each(table.documento.relationship
		, function (j, optionValue) {
		$("#familyMemberRelationship_" + i).append( $(option(optionValue)));
	});	
	$( "#familyMemberName_" + (i - 1)).unbind();
	$( "#familyMemberName_" + i).bind( "blur", function() {
		criaLinhaFamilyMember(i + 1, familyName);
	});
};

function criaLinhaRoom (i) {
	var roomLine = '<li class="roomItem">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList">' +					
					'<section class="col-xs-1">' +
						'<label class="input"> <i class="icon-prepend fa fa-home"></i>' +
							'<input type="text" id="number_' + i + '" name="number_' + i + '" placeholder="" disabled="disabled">' +
							'<input class="hide" type="text" id="singleBedAvailable_' + i + '" name="singleBedAvailable_' + i + '" placeholder="" disabled="disabled">' +
							'<input class="hide" type="text" id="coupleBedAvailable_' + i + '" name="coupleBedAvailable_' + i + '" placeholder="" disabled="disabled">' +
							'<input class="hide" type="text" id="emailStudent_' + i + '" name="emailStudent_' + i + '" placeholder="" disabled="disabled">' +
							'<input class="hide" type="text" id="roomPhoto' + i + '" name="roomPhoto' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<label class="select ">' +
							'<select id="singleBed_' + i + '" name="singleBed_' + i + '">' +
								'<option value="0" selected="0">0</option>' +
								'<option value="1">1</option>' +
								'<option value="2">2</option>' +
								'<option value="3">3</option>' +
								'<option value="4">4</option>' +
							'</select><i></i>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<label class="select ">' +
							'<select id="coupleBed_' + i + '" name="coupleBed_' + i + '">' +
								'<option value="0" selected="0">0</option>' +
								'<option value="1">1</option>' +
								'<option value="2">2</option>' +
								'<option value="3">3</option>' +
								'<option value="4">4</option>' +
							'</select><i></i>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
					'</section>' +
					'<section class="col-xs-1">' +
						'<label class="select ">' +
							'<select id="privateWashroom_' + i + '" name="privateWashroom_' + i + '">' +
								'<option value="Yes">Yes</option>' +
								'<option value="No" selected="No">No</option>' +
							'</select><i></i>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +
					'</section>' +
					'<section class="col-xs-2">' +
						'<label class="select ">' +
							'<select id="level' + i + '" name="level' + i + '">' +
								'<option value="" selected=""></option>' +
								'<option value="Basement">Basement</option>' +
								'<option value="main Floor">main Floor</option>' +
								'<option value="Second">Second</option>' +
								'<option value="Other">Other</option>' +
							'</select><i></i>' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-4">' +
					'</section>' +
					'<section class="col-xs-2 roomPhoto' + i + ' hide">' +
					    '<span class="btn btn-success fileinput-button ">' + 
					        '<i class="glyphicon glyphicon-plus"></i>' +
					        '<span> Load photo ...</span>' +
					        '<input id="upload-img-roomPhoto' + i + '" type="file" name="uploadedFile" class="imgUpload">' + 
					    '</span>' +
					    '<br>' + 
					    '<div id="progress-roomPhoto' + i + '" class="progress col-xs-04"">' + 
					       '<div class="progress-bar progress-bar-success"></div>' + 
					    '</div>' + 
					    '<div id="files-roomPhoto' + i + '" class="input-value files col-xs-04">' + 
					    	'<img id="img-roomPhoto' + i + '" class="imgUpload">' +
					    '</div>' +
					'</section>' +
					'<section class="col-xs-1 roomPhoto' + i + ' hide">' +
					'</section>' +
					'<section class="col-xs-3 roomPhoto' + i + ' hide">' +
						'<label class="input">'  +
							'<textarea rows="5" cols="40" id="note' + i + '" name="note' + i + '" class="custom-scroll"></textarea>' +
						'</label>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';
	$("#roomList").append(roomLine);
	$( "#singleBed_" + (i - 1)).unbind();
	$( "#singleBed_" + i).bind( "blur", function() {
		criaLinhaRoom(i + 1);
		$('#number_' + (i + 1)).val((i + 2));
		$('.roomPhoto' + i).removeClass("hide");
	});
};

function criaLinhaNote (i, note) {
	var noteLine = '<li class="noteItem">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList">' +					
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-calendar"></i>' +
							'<input type="text" id="notesDate_' + i + '" name="notesDate_' + i + '" class="datepicker" data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input"><i class="icon-prepend fa fa-user"></i>'  +
						'<input type="text" id="notesUser_' + i + '" name="notesUser_' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-4">' +
						'<label class="input">'  +
							'<textarea rows="3" cols="40" id="notesNote_' + i + '" name="notesNote_' + i + '" class="custom-scroll"></textarea>' +
						'</label>' +
					'</section>' +
				'</fieldset>' +
			'</div>' +
		'</li>';
	$("#notesList").append(noteLine);
	$('#notesDate_' + i).datepicker({
		dateFormat : 'dd-M-yy',
		prevText : '<i class="fa fa-chevron-left"></i>',
		nextText : '<i class="fa fa-chevron-right"></i>',
		onSelect : function(selectedDate) {
		}
	});
	$( "#notesDate_" + (i - 1)).unbind();
	$( "#notesDate_" + i).bind( "blur", function() {
		criaLinhaNote(i + 1, note);
		$('#notesUser_' + i).val(localStorage.userNameEmail);
	});
};


function criaLinhaVisit (i, visit) {
	var visitLine = '<li class="visitItem">' +
			'<div class="col-xs-11">' +
				'<fieldset class="memberList">' +					
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-2">' +
						'<label class="input"> <i class="icon-prepend fa fa-calendar"></i>' +
							'<input type="text" id="visitsDate_' + i + '" name="visitsDate_' + i + '" class="datepicker" data-dateformat="dd-M-yy">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-3">' +
						'<label class="input"><i class="icon-prepend fa fa-user"></i>'  +
						'<input type="text" id="visitsUser_' + i + '" name="visitsUser_' + i + '" placeholder="" disabled="disabled">' +
						'</label>' +
					'</section>' +
					'<section class="col-xs-1">' +	
					'</section>' +
					'<section class="col-xs-4">' +
						'<label class="input">'  +
							'<textarea rows="3" cols="40" id="visitsComments_' + i + '" name="visitsComments_' + i + '" class="custom-scroll"></textarea>' +
						'</label>' +
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
	$( "#visitsDate_" + (i - 1)).unbind();
	$( "#visitsDate_" + i).bind( "blur", function() {
		criaLinhaVisit(i + 1, visit);
		$('#visitsUser_' + i).val(localStorage.userNameEmail);
	});
};

function limpaStorageFamily () {
	
	var data  =
			{ 
				documento :   
				  { 
				    familyName : "", 
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
				    familyMembers : [{ 
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
				    notes : [],
				    visits : [] 
				  } 
			};

	localStorage.setItem("family", JSON.stringify(data));
};		
function carregaInclusao(data) { 	   	
	localStorage.familyExistente = "false";
};    

function carregaNumberBank(data) { 	   	
	$("#payment_financialInstitution").val(data.documento.name);
};    


function carregaNameBank(data) { 	   	
	$("#payment_bankNumber").val(data.documento.number);
};    

function setValueFamily (field, value) {
	
	var objJson = JSON.parse(localStorage.getItem("family"));
	
	/*
	if (objJson.documento[field]){
        objJson.documento[field] = value;
	};
*/
	if (field == "familyName"){
        objJson.documento.familyName = value;
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

	localStorage.setItem("family", JSON.stringify(objJson));
};		
function retornaFamily(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Family updated</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	var objJson = JSON.parse(localStorage.getItem("family"));
	window.location="family.html?mail=" + objJson.documento.familyName; 
};
function retornaListaFamily(){
	$.smallBox({
		title : "Ok",
		content : "<i class='fa fa-clock-o'></i> <i>Family included</i>",
		color : "#659265",
		iconSmall : "fa fa-check fa-2x fadeInRight animated",
		timeout : 4000
	});
	window.location="families.html"; 
};

function carregaSelectBanks(data) {
    $.each(data
		    , function (i, optionValue) {
    			$("#payment_financialInstitution").append( $(option(optionValue.name)));
    			$("#payment_bankNumber").append( $(option(optionValue.number)));
    });
};

