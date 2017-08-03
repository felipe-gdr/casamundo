/**
 * 
 */
	$(function() {
		localStorage.mapsCoordinate = "AIzaSyBtvFz034ClyfruthGGd4BCO0_I2iBZG3g";
		localStorage.mapsDistance = "AIzaSyCY4Bn4wcalIGk7D1N3HaSdoaqgcfrdNRE";
		localStorage.mapMatrixDistance = "AIzaSyDaDHbZU3-9m0g09R1d-g1eqwgwXqBkWRE";
		localStorage.hostNameEmail = "smtp.gmail.com";
		localStorage.userNameEmail = "grenneglr@gmail.com";
		localStorage.passwordEmail = "H2l2n1#0701";

		
		localStorage.app = "casamundo";

		localStorage.urlServidor = window.location.hostname;
		if (localStorage.urlServidor == "localhost"){
			localStorage.mainHost = "50.112.77.221";
		}else{
			localStorage.mainHost = localStorage.urlServidor;
		};

		if (localStorage.urlServidor == "localhost"){
			localStorage.mainHost = "www.yggboard.com";
			localStorage.mainUrl = "http://localhost:8080/";
		}else{
			localStorage.mainHost = localStorage.urlServidor;
			localStorage.mainUrl = "http://52.41.8.255:8080/";
		};

		// Validation
		$("#login-form").validate({
			// Rules for form validation
			rules : {
				email : {
					required : true,
					email : true
				},
				password : {
					required : true,
					minlength : 3,
					maxlength : 20
				}
			},
	
			// Messages for form validation
			messages : {
				email : {
					required : 'Please enter your email address',
					email : 'Please enter a VALID email address'
				},
				password : {
					required : 'Please enter your password'
				}
			},
			// form submition
			submitHandler : function(form) {
				var usuEmail = null;
				var usuSenha = null;
				$.each(form
				    , function (i, field) {
						var value = field.value;
						if (field.id == "email") {
							usuEmail = value;
						};
						if (field.id == "password") {
							usuSenha = value;
						};
				});
				executaLogin(usuEmail, usuSenha)
			},	
			// Do not change code below
			errorPlacement : function(error, element) {
				error.insertAfter(element.parent());
			}
		});
	});
