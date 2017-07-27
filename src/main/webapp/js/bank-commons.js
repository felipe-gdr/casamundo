
	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#bankModal-form").validate({
		// Rules for form validation
		rules : {
			name : {
				required : true,
			},
			number : {
				required : true,
				maxlength: 4,
				digits: true
			},
		},

		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter bank name',
			},
			number : {
				required : 'Please enter bank consult name',
				maxlength: "Maximum 4 digits",
				digits: "Only digits"
			},
		},
		// form submition
		submitHandler : function(form) {
			var objJson = JSON.parse(localStorage.getItem("bank"));
			if (!objJson){
				limpaStorageBank();
				var objJson = JSON.parse(localStorage.getItem("bank"));
			};
			$.each(form
			    , function (i, field) {
				if (field.value){
			        objJson.documento[field.name] = field.value;
				};
			});
			localStorage.setItem("bank", JSON.stringify(objJson));
			if (localStorage.bankExistente == "true"){
				rest_atualizaBank(JSON.parse(localStorage.getItem("bank")), fechaModalBank, semAcao);
			}else{
				rest_incluiBank(JSON.parse(localStorage.getItem("bank")), fechaModalBank, semAcao);
			};
		},	
		// Do not change code below
		errorPlacement : function(error, element) {
			error.insertAfter(element.parent());
			$.smallBox({
				title : "Error",
				content : "<i class='fa fa-clock-o'></i> <i>There is a error</i>",
				color : "#ff8080",
				iconSmall : "fa fa-check fa-2x fadeInRight animated",
				timeout : 4000
			});
		}
	});

	$('#bankInclusao').bind('click', function () {
    	localStorage.bankExistente = "false";
    });
	
	$("#bankModal").on('hidden.bs.modal', function(event){
    	$('#bankName').attr("disabled", false);
    	$("#bankName").val("");
    	$("#bankNumber").val("");
	 });

function fechaModalBank (field) {
	$("#bankModal").modal('hide');
	$('#bankName').attr("disabled", false);
	
	$("#bankName").val("");
	$("#bankNumber").val("");
	
	rest_obterBankAll(carregaBanks);
};

function carregaLocalStorageBank (data, tipo) {
	localStorage.setItem("bank", JSON.stringify(data));
	localStorage.bankExistente = "true";
	
};

function carregaInclusaoBank(data) { 	   	
	localStorage.bankExistente = "false";
};    

function limpaStorageBank () {
	
	var data  =
	{ 
		documento :   
		  { 
		    name : "", 
		    number : ""
		  } 
	};
	localStorage.setItem("bank", JSON.stringify(data));
};		
