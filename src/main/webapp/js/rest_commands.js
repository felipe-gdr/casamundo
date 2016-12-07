/**
 * 
 */
    function rest_incluiStudent(objJson, action_ok, action_not_ok) {
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
    
    function rest_incluiNewTrip(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/incluirNewTrip",
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

    function rest_obterStudent(email, action_ok, action_not_ok, var1, var2, actualTrip, idStudent, var3, var4) {
    	var parametro = "";
    	if (var3){
    		if (var3 == "complementaDados"){
    			parametro = "&complementaDados=true"
    		};
    	};
    	var	idStudentParam = "null";
       	if (idStudent){
    		idStuentParam = idStudent;
    	};
    	var	emailParam = "null";
       	if (email){
       		emailParam = email;
    	};
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/obterEmail?mail=" + emailParam + "&actualTrip=" + actualTrip + "&idStudent=" + idStudentParam + parametro,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		if (typeof data !== "undefined") {
    			action_ok(data, var1, var2, var3, var4);
    		}else{
    			action_not_ok (data, var1, var3, var4)	
    		};
    	})
    	.fail(function(data) {
    		action_not_ok (data, var1, var2)
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_obterStudentsAll(action_ok, action_notOk, destination, accommodation, filters, var1) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/lista?destination=" + destination + "&accommodation=" + accommodation + "&filters=" + filters,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1);
    	})
    	.fail(function(data) {
    		action_notOk(data, var1);
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

    function rest_atualizaStudent(objJson, action_ok, action_not_ok, messageOk, messageNotoK, var1, var2) {
    	delete objJson["_id"];
    	delete objJson["contact"];
    	delete objJson["rooms_actualTrip"];
    	delete objJson["family"];
    	delete objJson["accommodations"];
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
        		if (var1){
        			action_ok (var1, var2);
        		}else{
        			if (messageOk){
        				action_ok (messageOk);
        			}else{
        				action_ok ();        			
        			};
        		};
        	}else{
        		if (messageNotoK){
        			action_not_ok(messageNotoK);
        		}else{
        			action_not_ok();        			
        		};
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

    function rest_atualizaTable(objJson, action_ok, action_not_ok, var1, var2, var3) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/table/atualizar",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson)
		})        	
		.done(function(data, var1, var2, var3) {
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

    function rest_obterFamiliesAll(action_ok, action_notok, destination, filters, var1) {
    	var parameters = "";
    	if (destination){
    		parameters = "?destination=" + destination;
    	};
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/family/lista" + parameters  + "&filters=" + filters,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1);
    	})
    	.fail(function(data, var1) {
    		action_notok
    	})
    	.always(function(data) {
    	});
    };

    function rest_obterFamily(familyName, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/family/obterFamilyName?familyName="  + familyName,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
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

    function rest_atualizaFamily(objJson, action_ok, action_not_ok, messageOk, messageNotOk,var1, var2) {
    	delete objJson["_id"];
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
        		if (var1){
        			action_ok (var1, var2);
        		}else{
        			if (messageOk){
        				action_ok (messageOk);
        			}else{
        				action_ok ();        			
        			};
        		};
        	}else{
    			if (messageNotOk){
    				action_not_ok (messageNotOk);
    			}else{
    				action_not_ok ();        			
    			};
    		};
    	});

    };

    function rest_obterAgencyAll(action_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/agency/lista",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    	})
    	.always(function(data, var1, var2) {
    	});
    };
    
    function rest_atualizaAgency(objJson, action_ok, action_not_ok) {
    	delete objJson["_id"];
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
    	delete objJson["_id"];
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
    	delete objJson["_id"];
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

    function rest_obterBank(bankName, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/bank/obterBankName?name="  + bankName,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1. var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    function rest_obterBankNumber(bankNumber, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/bank/obterBankNumber?number="  + bankNumber,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    function rest_obterMainIntersectionAll(action_ok, action_notok, destination) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/mainIntersection/lista?destination=" + destination,
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
    
    function rest_atualizaMainIntersection(objJson, action_ok, action_not_ok) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/mainIntersection/atualizar",
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
        		action_ok ("MainIntersection updated");
        	}else{
        		actio_not_ok()
        	};
    	});
    };

    function rest_incluiMainIntersection(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/mainIntersection/incluir",
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
        		action_ok ("MainIntersection included");
        	}else{
        		actio_not_ok()
        	};
       	});
    };

    function rest_obterMainIntersection(mainIntersectionName, action_ok, action_not_ok, var1, var2 ) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/mainIntersection/obterMainIntersectionName?name="  + mainIntersectionName,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2 );
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    function rest_obterSubwayAll(action_ok, action_notok, destination) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/subway/lista?destination=" + destination,
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
    
    function rest_atualizaSubway(objJson, action_ok, action_not_ok) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/subway/atualizar",
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
        		action_ok ("Subway updated");
        	}else{
        		actio_not_ok()
        	};
    	});
    };

    function rest_incluiSubway(objJson, action_ok, action_not_ok) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/subway/incluir",
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
        		action_ok ("Subway included");
        	}else{
        		actio_not_ok()
        	};
       	});
    };

    function rest_obterSubway(subwayName, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/subway/obterSubwayName?name="  + subwayName,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2 );
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    //
    //**** Price table
    //

    function rest_obterPriceTableAll(action_ok, action_notok, date, agency, destination, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetable/lista?date="  + date + "&agency="  + agency + "&destination="  + destination,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data) {
    		action_notok(data, var1, var2);
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaPriceTable(objJson, action_ok, action_not_ok, message) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetable/atualizar",
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
        		action_ok (message);
        	}else{
        		action_not_ok(message)
        	};
    	});
    };

    function rest_incluiPriceTable(objJson, action_ok, action_not_ok, message) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetable/incluir",
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
        		action_ok (message);
        	}else{
        		actio_not_ok(message)
        	};
       	});
    };

    function rest_obterPriceTable(id, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetable/obterPriceTable?id="  + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    //
    //**** Price value table
    //

    function rest_obterPriceTableValueAll(idPriceTable, action_ok, action_notok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetablevalue/lista?idPriceTable="  + idPriceTable,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data) {
    		action_notok(data, var1, var2);
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaPriceTableValue(objJson, action_ok, action_not_ok, message) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetablevalue/atualizar",
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
        		action_ok (message);
        	}else{
        		action_not_ok(message)
        	};
    	});
    };

    function rest_incluiPriceTableValue(objJson, action_ok, action_not_ok, message) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetablevalue/incluir",
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
        		action_ok (message);
        	}else{
        		actio_not_ok(message)
        	};
       	});
    };

    function rest_obterPriceTableValue(id, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetablevalue/obterPriceTable?id="  + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    //
    //**** Price cost table
    //

    function rest_obterPriceTableCostAll(idPriceTable, action_ok, action_notok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetablecost/lista?idPriceTable="  + idPriceTable,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data) {
    		action_notok(data, var1, var2);
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaPriceTableCost(objJson, action_ok, action_not_ok, message) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetablecost/atualizar",
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
        		action_ok (message);
        	}else{
        		action_not_ok(message)
        	};
    	});
    };

    function rest_incluiPriceTableCost(objJson, action_ok, action_not_ok, message) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetablecost/incluir",
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
        		action_ok (message);
        	}else{
        		actio_not_ok(message)
        	};
       	});
    };

    function rest_obterPriceTableCost(id, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pricetablecost/obterPriceTable?id="  + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    //
    //**** Invoice
    //

    
    function rest_obterInvoicesAll(action_ok, action_notOk, destination, filters, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/invoice/lista?destination=" + destination + "&filters=" + filters,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1);
    	})
    	.fail(function(data) {
    		action_notOk(data, var1);
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaInvoice(objJson, action_ok, action_not_ok, message) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/invoice/atualizar",
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
        		action_ok (message);
        	}else{
        		action_not_ok(message)
        	};
    	});
    };

    function rest_incluiInvoice(objJson, action_ok, action_not_ok, message) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/invoice/incluir",
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
        		action_ok (message);
        	}else{
        		actio_not_ok(message)
        	};
       	});
    };

    function rest_obterInvoice(id, action_ok, action_not_ok, var1, var2) {
    	var costParam = "";
    	if (var1 == "cost"){
    		costParam = "&cost=true";
    	}
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/invoice/obterInvoice?id="  + id + costParam ,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_changeStatusInvoice(objJson, action_ok, action_notOk, messageOk, messageNotOk) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/invoice/changeStatus",
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
        		action_ok (messageOk);
        	}else{
        		actio_not_ok(messageNotOk)
        	};
       	});
    };

    //
    //**** Payment
    //

    
    function rest_obterPaymentsAll(action_ok, action_notOk, destination, filters, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/payment/lista?destination=" + destination + "&filters=" + filters,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1);
    	})
    	.fail(function(data) {
    		action_notOk(data, var1);
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaPayment(objJson, action_ok, action_not_ok, message) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/payment/atualizar",
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
        		action_ok (message);
        	}else{
        		action_not_ok(message)
        	};
    	});
    };

    function rest_incluiPayment(objJson, action_ok, action_not_ok, message) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/payment/incluir",
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
        		action_ok (message);
        	}else{
        		actio_not_ok(message)
        	};
       	});
    };

    function rest_obterPayment(id, action_ok, action_not_ok, var1, var2) {
    	var costParam = "";
    	if (var1 == "cost"){
    		costParam = "&cost=true";
    	}
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/payment/obterPayment?id="  + id + costParam ,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    function rest_criaPayment(idStudent, actualTrip, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/payment/criaPayment?idStudent="  + idStudent + "&actualTrip=" + actualTrip,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_changeStatusPayment(objJson, action_ok, action_notOk, messageOk, messageNotOk) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/payment/changeStatus",
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
        		action_ok (messageOk);
        	}else{
        		actio_not_ok(messageNotOk)
        	};
       	});
    };

    //
    //**** Dorm
    //

    
    function rest_obterDormsAll(action_ok, action_notOk, destination, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/dorm/lista?destination=" + destination,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1);
    	})
    	.fail(function(data) {
    		action_notOk(data, var1);
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaDorm(objJson, action_ok, action_not_ok, message) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/dorm/atualizar",
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
        		action_ok (message);
        	}else{
        		action_not_ok(message)
        	};
    	});
    };

    function rest_incluiDorm(objJson, action_ok, action_not_ok, message) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/dorm/incluir",
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
        		action_ok (message);
        	}else{
        		actio_not_ok(message)
        	};
       	});
    };

    function rest_obterDorm(id, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/dorm/obterDorm?id="  + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };
    //
    //**** Room
    //
    
    function rest_obterRoomsAll(idDorm, action_ok, action_notOk, destination, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/room/lista?idDorm=" + idDorm + "&destination=" + destination,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data) {
    		action_notOk(data, var1, var2);
    	})
    	.always(function(data) {
    	});
    };
    
    
    function rest_obterBedsAll(action_ok, action_notOk, destination, var1, var2, var3, var4, var5, var6, var7) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/room/lista/beds?destination=" + destination,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1, var2, var3, var4, var5, var6, var7);
    	})
    	.fail(function(data) {
    		action_notOk(data, var1, var2, var3, var4, var5, var6, var7);
    	})
    	.always(function(data) {
    	});
    };

    function rest_atualizaRoom(objJson, action_ok, action_not_ok, messageOk, messageNotOk, var1, var2, var3, var4, var5) {
    	console.log ("rest atualiza quarto:" + messageOk);
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/room/atualizar",
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
        		action_ok (messageOk, var1, var2, var3, var4, var5);
        	}else{
        		action_not_ok(messageNotOk, var1, var2, var3, var4, var5)
        	};
    	});
    };


    function rest_atualizaBed(objJson, action_ok, action_not_ok, message) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/room/atualizar/bed",
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
        		action_ok (message);
        	}else{
        		action_not_ok(message)
        	};
    	});
    };

    function rest_incluiRoom(objJson, action_ok, action_not_ok, message) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/room/incluir",
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
        		action_ok (message);
        	}else{
        		actio_not_ok(message)
        	};
       	});
    };

    function rest_obterRoom(id, action_ok, action_not_ok, var1, var2, var3, var4, var5, var6 ,var7) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/room/obterRoom?id="  + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2, var3, var4, var5, var6, var7);
    	})
    	.fail(function(data, var1, var2, var3, var4, var5, var6, var7) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };


    function rest_deallocateBed(idStudent, actualTrip, action_ok, action_not_ok, var1, var2, var3, var4, var5, var6 ,var7) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/room/deallocate/beds?idStudent="  + idStudent + "&actualTrip="  + actualTrip,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2, var3, var4, var5, var6, var7);
    	})
    	.fail(function(data, var1, var2, var3, var4, var5, var6, var7) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };

    
    function rest_reallocateBed (objJson, action_ok, action_notOk, messageOk, messageNotOk, var1, var2, var3, var4, var5, var6) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/room/reallocate/bed",
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
        		action_ok (messageOk, var1, var2, var3, var4, var5, var6);
        	}else{
        		actio_not_ok(messageNotOk, var1, var2, var3, var4, var5, var6)
        	};
       	});
    };
//
    //**** Pickup
    //

    function rest_obterPickupAll(action_ok, action_notok, destination, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pickup/lista?destination="  + destination,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function( data ) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data) {
    		action_notok(data, var1, var2);
    	})
    	.always(function(data) {
    	});
    };
    
    function rest_atualizaPickup(objJson, action_ok, action_not_ok, message) {
    	delete objJson["_id"];
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pickup/atualizar",
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
        		action_ok (message);
        	}else{
        		action_not_ok(message)
        	};
    	});
    };

    function rest_incluiPickup(objJson, action_ok, action_not_ok, message) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pickup/incluir",
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
        		action_ok (message);
        	}else{
        		actio_not_ok(message)
        	};
       	});
    };

    function rest_obterPickup(id, action_ok, action_not_ok, var1, var2) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/pickup/obterPriceTable?id="  + id,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            async:false
    	})
    	.done(function(data) {
    		action_ok(data, var1, var2);
    	})
    	.fail(function(data, var1, var2) {
    		action_not_ok
    	})
    	.always(function(data) {
    	});
    };
