/**
 * 
 */

function stringMatch(variable, str){
	var returnResult =  false;
	if (str) {
		var words = str.split(" ");
		for (var i = 0; i < words.length; i++) {
			if (singularize(words[i]) == singularize(variable)) {
				returnResult = true;
			};
		};
	};
	return returnResult;
};

function singularize(variable) {
	var varReturn = variable.toLowerCase().replace(/\s|[0-9_]|\W|[#$%^&*()]/g, "").replace("á", "a").replace("ã", "a").replace("â", "a").replace("é", "e").replace("ê", "e").replace("õ", "o").replace("ô", "o");	
};