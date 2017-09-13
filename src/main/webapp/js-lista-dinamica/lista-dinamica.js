
  var myVar = setInterval(function(){ setIntervalObject() }, 30);	  
  
  function setIntervalObject() {
  	
	lines = JSON.parse(sessionStorage.getItem("lines"));
  	assunto = JSON.parse(sessionStorage.getItem("assunto"));
  	i = sessionStorage.getItem("index");
  	totalRecords = sessionStorage.getItem("totalRecords");

    if (lines[i]) {
		switch (sessionStorage.getItem("processo")) {
		case "carregaDados":
			carregaDados(lines[i]);
			break;
		default:
			break;
		};
	};
    if (sessionStorage.getItem("processo") == "carrega-lista-student"){
	  	if (lines[i]){
	  		carregaListaStudent(lines[i]);
	  	};
    };
    if (sessionStorage.getItem("processo") == "encerra-set-interval"){
  	    for (var i = 1; i < 99999; i++){
  	        window.clearInterval(i);
  	    };
    };
  	i++;

  	if (i > totalRecords){
  	    sessionStorage.setItem("processo", "encerra-set-interval");
  	};
    sessionStorage.setItem("index", i);
  };

  
  function processaRegistros (data, lines){
     sessionStorage.setItem("processo", "carrega-dados");
     var myVar = setInterval(function(){ setIntervalObject() }, 30);
  };
