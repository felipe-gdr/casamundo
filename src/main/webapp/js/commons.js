/**
 * 
 */

function stringMatch(variable, str){
	var returnResult =  false;
	if (str) {
		var words = str.split(" ");
		for (var i = 0; i < words.length; i++) {
			var word_a = singularize(words[i]);
			var word_b = singularize(variable);
			if ( singularize(words[i]) == singularize(variable)) {
				returnResult = true;
			};
		};
	};
	return returnResult;
};

function singularize(variable) {
	return variable.toLowerCase().replace(/\s|[0-9_]|\W|[#$%^&*()]/g, "").replace("á", "a").replace("ã", "a").replace("â", "a").replace("é", "e").replace("ê", "e").replace("õ", "o").replace("ô", "o");	
};