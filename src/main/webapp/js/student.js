	// ** setar menu
	$("#menuStudents_li").addClass("active");
	// 
	//**    carrega dados url
	//

	var url   = window.location.search.replace();
	var parametrosDaUrl = url.split("?")[1];
	var mailUrl = parametrosDaUrl.split("&")[0].split("=")[1];
	var parameter = parametrosDaUrl.split("&");
	if (parameter[1]) {
		var typePage = parametrosDaUrl.split("&")[1].split("=")[1];
	};
	
	// 
	// **** montagem do filtro para submissão ao server
	//

		// **** testa filtros
		$(".text-filter").blur(function(){
			var filters = 
					'filter_family:' + $("#filters_family").val() + ',' +
					'filter_mainIntersection:' + $("#filters_mainIntersection").val() + ',' +
					'filter_subway:' + $("#filters_subway").val() + ',' +
					'filter_internet:' + $("#filters_internet").val() + ',' +
					'filter_dogs:' + $("#filters_dogs").val() + ',' +
					'filter_cats:' + $("#filters_cats").val() + ',' +
					'filter_other:' + $("#filters_other").val() + ',' +
					'filter_background:' + $("#filters_background").val() + ',' +
					'filter_inCanada:' + $("#filters_inCanada").val() + ',' +
					'filter_smoke:' + $("#filters_smoke").val() + ',' +
					'filter_type:' + $("#filters_type").val() + ',' +
					'filter_police:' + $("#filters_police").val() + ',' +
					'filter_ageFrom:' + $("#filters_ageFrom").val() + ',' +
					'filter_ageTo:' + $("#filters_ageTo").val() + ',' +
					'filter_gender:' + $("#filters_gender").val() + ',' +
					'filter_meals:' + $("#filters_meals").val() + ',' +
					'filter_diet:' + $("#filters_diet").val() + ',' +
					'filter_dontHost:' + $("#filters_dontHost").val();
					var objStudent = JSON.parse(localStorage.getItem("student"));
					rest_obterFamiliesAll(carregaLocalStorageFamilies, semAcao, objStudent.documento.trips[objStudent.documento.actualTrip].destination, filters, "true");
		});	
	
		// **** testa filtro availability
		localStorage.filters = "";
		$(".text-filter-bed").blur(function(){
			var filters = 
				'filters_dorm:' + $("#filters_dorm").val() + ',' +
				'filters_uni:' + $("#filters_uni").val() + ',' +
				'filters_room:' + $("#filters_room").val() + ',' +
				'filters_bed:' + $("#filters_bed").val() + ',' +
				'filters_availability:' + $("#filters_availability").val();
        	if (filters != localStorage.filters){
        		carregaLocalStorageRooms(JSON.parse(localStorage.getItem("rooms")), filters);
        		localStorage.filters = filters;
        	};
		});
	
	 	 
	/**
	 * 		carrega tabelas
	 */
	rest_obterTable(carregaTabelas, obtencaoNaoEfetuada);
	//
	//***   chamar tela de alteração com o student da pagina
	//
	$( "#alteracaoButton" ).bind( "click", function() {
		$(window.document.location).attr('href','student_input.html?mail=' + mailUrl );
	});
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "onlyStudent"){
		$(".notOnlyStudent" ).addClass("hide");
	}
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "change"){
		$(".notChange" ).addClass("hide");
	};
	//
	//***   setar pagina como somente consulta student
	//
	if (typePage == "caretaker"){
		$(".notChange" ).addClass("hide");
		$(".caretaker" ).removeClass("hide");
	};
	//
	//  ** send email to offer a family
	//
	var doc = new jsPDF();
	var specialElementHandlers = {
	    '#editor': function (element, renderer) {
	        return true;
	    }
	};

    $('#sendEmailOfferToFamily').bind( "click", function() {
//	    doc.fromHTML($('#contentPDF').html(), 15, 15, {
//	        'width': 170,
//	            'elementHandlers': specialElementHandlers
//	    });
//	    doc.save('sample-file.pdf');
    	rest_sendEmailHtml(localStorage.hostNameEmail, localStorage.userNameEmail , localStorage.passwordEmail, "grenneglr@gmail.com", $('#emailFamily').val(), "Offer accommodation", templateOffertoFamily(), emailEnviado, emailComProblemas );
    });
/**
 * 
 */
	rest_obterStudent(mailUrl, carregaStudent, obtencaoNaoEfetuada, typePage);
    
