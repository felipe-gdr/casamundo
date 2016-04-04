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
    
    function rest_obterStudent(email, action_ok, action_not_ok) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/obterEmail?mail="  + email,
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
    
    
    function rest_obterStudentsAll(action_ok) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/lista",
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
	function rest_atualizaStudent(objJson, action_ok, action_not_ok) {
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
        		action_ok ();
        	}else{
        		actio_not_ok()
        	};
    	});

    };
