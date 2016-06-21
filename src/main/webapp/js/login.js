/**
 * 
 */
	$(function() {
		localStorage.mapsCoordinate = "AIzaSyBtvFz034ClyfruthGGd4BCO0_I2iBZG3g";
		localStorage.mapsDistance = "AIzaSyCY4Bn4wcalIGk7D1N3HaSdoaqgcfrdNRE";
		localStorage.mapMatrixDistance = "AIzaSyDaDHbZU3-9m0g09R1d-g1eqwgwXqBkWRE";
		localStorage.hostNameEmail = "smtp.gmail.com";

		
		localStorage.app = "casamundo";

		localStorage.urlServidor = window.location.hostname;

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
	
	function executaLogin(email, senha) {

		rest_obterUsuario(email, usuarioOk, usuarioFail, senha)

	};

	function usuarioOk (data, senha){

		if (data.documento.password == senha){
			localStorage.usuarioEmail = data.documento.email;
			localStorage.usuarioFirstName = data.documento.firstName;
			localStorage.usuarioLastName = data.documento.lastName;
			localStorage.usuarioPerfil = data.documento.perfil;
			localStorage.usuarioCity = data.documento.city;
			localStorage.usuarioGender = data.documento.gender;
			localStorage.loginOk = true;
			$(window.document.location).attr('href','dashboard.html');
			return true;
		}else{
			usuarioFail ();
		};
		return false;
	};
	
	function usuarioFail (){
		$.smallBox({
			title : "Error",
			content : "<i class='fa fa-clock-o'></i> <i>User/Password invalid</i>",
			color : "#ff8080",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 4000
		});
	};