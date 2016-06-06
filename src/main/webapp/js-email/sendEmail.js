/**
 * 
 */
    function rest_sendSimpleEmail(hostName, userName, password, from, to, subject, message, action_ok, action_not_ok) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/email/sendSimpleEmail?hostName="  + hostName + 
            																						"&userName="  + userName + 
            																						"&password="  + password +
            																						"&from="  + from + 
            																						"&to="  + to + 
            																						"&subject="  + subject + 
            																						"&message="  + message, 
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
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
    function rest_sendEmailHtml(hostName, userName, password, from, to, subject, html, action_ok, action_not_ok) {
    	$.ajax({
            url: "http://" + localStorage.urlServidor + ":8080/casamundo/rest/email/sendEmailHtml?hostName="  + hostName + 
            																						"&userName="  + userName + 
            																						"&password="  + password +
            																						"&from="  + from + 
            																						"&to="  + to + 
            																						"&subject="  + subject + 
            																						"&html="  + html, 
            contentType: "application/json; charset=utf-8",
            dataType: 'json'
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
