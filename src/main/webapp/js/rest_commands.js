/**
 * 
 */
    function incluiStudent(objJson) {
		$.ajax({
			type: "POST",
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/student/incluir",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            data : JSON.stringify(objJson)
		})
	  	.done(function( data ) {
	  		console.log ("inclusão saiu por done");
	  	})
        .fail(function(data) {
    	   console.log ("inclusão saiu por fail");
        })
       	.always(function(data) {
       		console.log ("inclusão saiu por always");
       	});
    };
    
    
	function atualizaStudent() {
    };
