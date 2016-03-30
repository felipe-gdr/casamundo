/**
 * 
 */

function capturaData (data, separador) {
	
	return data.day() + separador + (data.month() + 1) + separador + data.year();
	 
};				
function separaData ( data, separador) {

	return data.slice(0,2) + separador + data.slice(2,4) + separador + data.slice(4,8);
	 
};				
function separaHora ( hora, separador) {

	return hora.slice(0,2) + separador + hora.slice(2,4);
	 
};				
function converteAnoMesDia (data) {
	
	return data.slice(4,8) + data.slice(2,4) + data.slice(0,2);
	 
};				

function calculaIdade ( dataNascimento ) {
	 var hoje = new Date();
	 
	 var arrayData = dataNascimento.split("/");
	 
	 var idade = 0;
	 if (arrayData.length == 3) {
	  // Decompoem a data em array
	  var ano = parseInt( arrayData[2] );
	  var mes = parseInt( arrayData[1] );
	  var dia = parseInt( arrayData[0] );
	  
	  // Valida a data informada
	  if ( arrayData[0] > 31 || arrayData[1] > 12 ) {
	   return idade;
	  }  
	  
	  ano = ( ano.length == 2 ) ? ano += 1900 : ano;

	  // Subtrai os anos das duas datas
	  idade = ( hoje.getYear()+1900 ) - ano;

	  // Subtrai os meses das duas datas
	  var meses = ( hoje.getMonth() + 1 ) - mes;
	  
	  // Se meses for menor que 0 entao nao cumpriu anos. Se for maior sim ja cumpriu
	  idade = ( meses < 0 ) ? idade - 1 : idade;    

	  meses = ( meses < 0 ) ? meses + 12 : meses;      

	  retorno = ( idade + " a " + meses + " m" );  
	 }   

	 return idade;
	};				
