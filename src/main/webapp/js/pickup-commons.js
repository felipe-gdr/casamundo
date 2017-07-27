
	/**
	 * 		carrega tabela bank
	 */
	
	rest_obterBankAll(carregaSelectBanks);

	/**
	 * 		setup dos input do form
	 */
	var $tablesForm = $("#pickupModal-form").validate({
		// Rules for form validation
		rules : {
			name : {
				required : true,
			},
			destination : {
				required : true,
			},
		},

		// Messages for form validation
		messages : {
			name : {
				required : 'Please enter pickup name',
			},
			destination : {
				required : 'Please enter pickup destination',
			},
		},
		// form submition
		submitHandler : function(form) {
			limpaStoragePickup();
			var objJson = JSON.parse(localStorage.getItem("pickup"))
			$.each(form
			    , function (i, field) {
				var value = field.value;
				var validField = field.name.split("-");
				if (validField.length == 1){
					var typeField = field.name.split("_");
					if (typeField.length > 1){
						objJson.documento[typeField[0]][typeField[1]] = value;
					}else{
						if (field.value){
							objJson.documento[field.name] = value;
						};
					};						
				};
			});
			localStorage.setItem("pickup", JSON.stringify(objJson));
			if (localStorage.pickupExistente == "true"){
				rest_atualizaPickup(JSON.parse(localStorage.getItem("pickup")), fechaModalPickup, semAcao);
			}else{
				rest_incluiPickup(JSON.parse(localStorage.getItem("pickup")), fechaModalPickup, semAcao);
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

	$('#pickupInclusao').off('click');
	$('#pickupInclusao').on('click', function () {
    	localStorage.pickupExistente = "false";
    });
	
	$("#pickupModal").off('hidden.bs.modal');
	$("#pickupModal").on('hidden.bs.modal', function(event){
    	$("#pickupName").val("");
    	$("#pickupId").val("");
    	$("#pickupDestination").val("");
    	$("#pickup-payment_financialInstitution").val("");
    	$("#pickup-payment_bankNumber").val("");
    	$("#pickup-payment_branchNumber").val("");
    	$("#pickup-payment_accountNumber").val("");
	 });
	
	$('#pickup-payment_financialInstitution').change(function(){
		rest_obterBank(this.value, carregaNumberBank, semAcao, "alteracao");
	});
	
	$('#pickup-payment_bankNumber').change(function(){
		rest_obterBankNumber(this.value, carregaNameBank, semAcao, "alteracao");
	});


	function carregaNumberBank(data) { 	   	
		$("#pickup-payment_bankNumber").val(data.documento.number);
	};    

	function carregaNameBank(data) { 	   	
		$("#pickup-payment_financialInstitution").val(data.documento.name);
	};    

	function carregaSelectBanks(data) {
	    $.each(data
			    , function (i, optionValue) {
	    			$("#pickup-payment_financialInstitution").append( $(option(optionValue.name)));
	    			$("#pickup-payment_bankNumber").append( $(option(optionValue.number)));
	    });
	};

	function fechaModalPickup (field) {
    	$("#pickupModal").modal('hide');
    	$("#pickupName").val("");
    	$("#pickupId").val("");
    	$("#pickupDestination").val("");
    	$("#pickup-payment_financialInstitution").val("");
    	$("#pickup-payment_bankNumber").val("");
    	$("#pickup-payment_branchNumber").val("");
    	$("#pickup-payment_accountNumber").val("");
    	
    	rest_obterPickupAll(carregaPickups, semAcao, "all");
    };

    function carregaLocalStoragePickup (data, tipo) {
    	localStorage.setItem("pickup", JSON.stringify(data));
    	localStorage.pickupExistente = "true";
    	
    };

function limpaStoragePickup () {
	
	var data  =
	{ 
		documento :   
		  { 
			id : "",
		    name : "", 
		    destination : "",
		    payment :
			    {
			    	financialInstitution : "",
			    	bankNumber : "",
			    	branchNumber : "",
			    	accountNumber : ""
			    }
		  } 
	};
	localStorage.setItem("pickup", JSON.stringify(data));
};		
