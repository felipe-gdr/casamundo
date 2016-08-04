/**
 * 
 */
    function rest_incluiStudent(objJson, action_ok, action_not_ok) {
        var actualTrip = objJson.documento.actualTrip;
        objJson.documento.trips[actualTrip].status = 'Available';
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/incluir",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson)
		})
	  	.done(function( data ) {
	  	})
        .fail(function(data) {
        })
       	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ();
        	}else{
        		actio_not_ok()
        	};
       	});
    };
    
    function rest_obterStudent(email, action_ok, action_not_ok, tipo) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/obterEmail?mail="  + email,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, tipo);
    	})
    	.fail(function(data) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_obterStudentsAll(action_ok, action_notOk, destination, accommodation) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/lista?destination=" + destination + "&accommodation=" + accommodation,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data);
    	})
    	.fail(function(data) {
    		action_notOk();
    	})
    	.always(function(data) {
    	});
    };

    
    function rest_changeStatus(action_ok, action_notOk, objJson ) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/changeStatus?params=mail:" + objJson.mail + "/indexTrip:" + objJson.indexTrip + "/status:" + status + "/familyName:" + objJson.familyName + "/emailFamily:" + objJson.emailFamily + "/reason:" + objJson.reason,
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
    	})
    	.done(function( data ) {
    		action_ok(data);
    	})
    	.fail(function(data) {
    		action_notOk();
    	})
    	.always(function(data) {
    	});
    };

    function rest_atualizaStudent(objJson, action_ok, action_not_ok, afterUpdate) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/atualizar",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson),
            async:false
    	
		})        	
		.done(function( data ) {
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ("Student updated", afterUpdate);
        	}else{
        		actio_not_ok()
        	};
    	});

    };

    function rest_obterTable(action_ok, action_not_ok) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/table/obter",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data);
    	})
    	.fail(function(data) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    function rest_atualizaTable(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/table/atualizar",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson)
		})        	
		.done(function(data) {
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
        	if (data.status = 200) {
    		action_ok ("Tabels updated");
        	}else{
        		actio_not_ok()
        	};
    	});
    };

    function rest_obterFamiliesAll(action_ok, action_notok, destination, occupancy) {
    	var parameters = "";
    	if (destination && occupancy){
    		parameters = "?destination=" + destination + "&occupancy=" + occupancy;
    	}else{
        	if (destination){
        		parameters = "?destination=" + destination;
        	}else{
            	if (occupancy){
            		parameters = "?occupancy=" + occupancy;
            	};
        	};
    	};
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/family/lista" + parameters,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data);
    	})
    	.fail(function(data) {
    		action_notok
    	})
    	.always(function(data) {
    	});
    };

    function rest_obterFamily(familyName, action_ok, action_not_ok, tipo) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/family/obterFamilyName?familyName="  + familyName,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, tipo);
    	})
    	.fail(function(data) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    function rest_incluiFamily(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/family/incluir",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson)
		})
	  	.done(function( data ) {
	  	})
        .fail(function(data) {
        })
       	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ();
        	}else{
        		actio_not_ok()
        	};
       	});
    };

    function rest_atualizaFamily(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/family/atualizar",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson),
            async:false
    	
		})        	
		.done(function( data ) {
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ("Family updated");
        	}else{
        		actio_not_ok()
        	};
    	});

    };

    function rest_obterAgencyAll(action_ok) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/agency/lista",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data);
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaAgency(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/agency/atualizar",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson),
            async:false
    	
		})        	
		.done(function( data ) {
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ("Agency updated");
        	}else{
        		actio_not_ok()
        	};
    	});
    };

    function rest_incluiAgency(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/agency/incluir",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson)
		})
	  	.done(function( data ) {
	  	})
        .fail(function(data) {
        })
       	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ("Agency included");
        	}else{
        		actio_not_ok()
        	};
       	});
    };

    function rest_obterAgency(agencyName, action_ok, action_not_ok, par1, par2 ) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/agency/obterAgencyName?name="  + agencyName,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, par1, par2);
    	})
    	.fail(function(data) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };


    function rest_obterSchoolAll(action_ok) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/school/lista",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data);
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaSchool(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/school/atualizar",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson),
            async:false
    	
		})        	
		.done(function( data ) {
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ("School updated");
        	}else{
        		actio_not_ok()
        	};
    	});
    };

    function rest_incluiSchool(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/school/incluir",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson)
		})
	  	.done(function( data ) {
	  	})
        .fail(function(data) {
        })
       	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ("School included");
        	}else{
        		actio_not_ok()
        	};
       	});
    };

    function rest_obterSchool(schoolName, action_ok, action_not_ok, par1, par2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/school/obterSchoolName?name="  + schoolName,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data,par1, par2);
    	})
    	.fail(function(data) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_obterUsuario(email, action_ok, action_not_ok, par1, par2) {
    	$.ajax({
			url : "http://" + localStorage.urlServidor + ":8080/casamundo/rest/usuario/obter?email=" + email,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok (data, par1, par2);
    	})
    	.fail(function(data) {
    		action_not_ok (data, par1, par2);
    	})
    	.always(function(data) {
    	});
    };

    function rest_obterBankAll(action_ok) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/bank/lista",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data);
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaBank(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/bank/atualizar",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson),
            async:false
    	
		})        	
		.done(function( data ) {
    	})
    	.fail(function(data) {
    	})
    	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ("Bank updated");
        	}else{
        		actio_not_ok()
        	};
    	});
    };

    function rest_incluiBank(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/bank/incluir",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson)
		})
	  	.done(function( data ) {
	  	})
        .fail(function(data) {
        })
       	.always(function(data) {
        	if (data.status = 200) {
        		action_ok ("Bank included");
        	}else{
        		actio_not_ok()
        	};
       	});
    };

    function rest_obterBank(bankName, action_ok, action_not_ok, tipo) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/bank/obterBankName?name="  + bankName,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, tipo);
    	})
    	.fail(function(data) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    function rest_obterBankNumber(bankNumber, action_ok, action_not_ok, tipo) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/bank/obterBankNumber?number="  + bankNumber,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, tipo);
    	})
    	.fail(function(data) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };
    