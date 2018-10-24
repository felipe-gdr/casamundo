package com.rcapitol.casamundo;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.json.simple.JSONObject;

import com.mongodb.BasicDBObject;


public class Commons {
	
	public Boolean verifyInterval (String date, String initInterval, String endInterval){
	
		DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
		try {
			if (initInterval != null && endInterval != null){
				Date d1 = df.parse (date);
				Date d2 = df.parse (initInterval);
				Date d3 = df.parse (endInterval);
				long d1_time = d1.getTime();
				long d2_time = d2.getTime();
				long d3_time = d3.getTime();
				if (d1_time >= d2_time && d1_time <=d3_time){
					return true;
				}
			};
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return false;
	};
	
	public Long currentTime (){		
		Date d2 = new Date(System.currentTimeMillis()); 
		return d2.getTime();
	};
	
	public Long calcAge (String birthDate){
		
		DateFormat df = new SimpleDateFormat ("dd/MM/yyyy");
		try {
			Date d1 = df.parse (birthDate);
			Date d2 = new Date(System.currentTimeMillis()); 
			long dt = (d2.getTime() - d1.getTime()) + 3600000;
			return ((dt / 86400000L) / 365L);
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return null;
	};
	
	@SuppressWarnings("null")
	public int difDate (String start, String end){
		
		DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
		try {
			Date d1 = df.parse (start);
			Date d2 = df.parse (end); 
			long dt = (d2.getTime() - d1.getTime()) + 3600000;
			int daysInBetween = (int) (dt / (24*60*60*1000));
			return daysInBetween;
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return (Integer) null;
	};

	public String calcNewDate (String date, int days){
		
		DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();   
		Integer day = Integer.parseInt(date.substring(8, 10));
		Integer month = Integer.parseInt(date.substring(5, 7));
		Integer year = Integer.parseInt(date.substring(0, 4));
		cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(date.substring(8, 10)));
		cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
		cal.add(Calendar.DAY_OF_MONTH, days);
		return df.format(cal.getTime());
	};

	public Integer weekDay (String date){
		
		Calendar cal = Calendar.getInstance();   
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(date.substring(8, 10)));
		cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
		  
		return cal.get(Calendar.DAY_OF_WEEK);
	};

	public Calendar convertToCalendar (String date){
		
		Calendar cal = Calendar.getInstance();   
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(date.substring(8, 10)));
		cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
		return cal;
	};

	public String todaysDate(String type) {
		
		Calendar calendar = Calendar.getInstance();
		//getTime() returns the current date in default time zone
		int day = calendar.get(Calendar.DATE);
		//Note: +1 the month for current month
		int month = calendar.get(Calendar.MONTH) + 1;
		int year = calendar.get(Calendar.YEAR);
		int hour = calendar.get(Calendar.HOUR_OF_DAY);
		int min = calendar.get(Calendar.MINUTE);
		
		String dayString = "";
		String monthString = "";
		String hourString = "";
		String minString = "";

		if (day < 10){
			dayString = "0" + String.valueOf(day);
 		}else{
 			dayString = String.valueOf(day);
 		};

		if (hour < 10){
			hourString = "0" + String.valueOf(hour);
 		}else{
 			hourString = String.valueOf(hour);
 		};

		if (min < 10){
			minString = "0" + String.valueOf(min);
 		}else{
 			minString = String.valueOf(min);
 		};

		if (month < 10){
			monthString = "0" + String.valueOf(month);
 		}else{
 			monthString = String.valueOf(month);
 		};
 		
 		String dateString = "";
 		if (type == "inv_month_number"){
 			dateString = String.valueOf(year) + monthString + dayString;
 		};
 		if (type == "yyyy-mm-dd-time"){
 			dateString = String.valueOf(year) + monthString + dayString + hourString + minString;
 		};
		  
		return dateString;
   
	}

	public int getDay(String date) {
		
		return Integer.parseInt(date.substring(8, 10));

	};

	public String setDay(String date, String day) {
		
		return 	date.substring(0,8)+day;


	};

	public int getMonth(String date) {
		
		return Integer.parseInt(date.substring(5, 7));

	};

	public String setMonth(String date, String month) {
		
		return 	date.substring(0,4)+month+date.substring(8,10);

	};

	public int getYear(String date) {
		
		return Integer.parseInt(date.substring(0, 4));

	};

	public String setYar(String date, String year) {
		
		return 	year + date.substring(5,10);

	};

	public boolean anoBissexto(String date) {
		
		int year = getYear(date);
		if ((year % 4) == 0) {
			return true;
		};
		
		return false;
	}
	
	public Long calcTime (String date){
		System.out.println("date=" + date);
		DateFormat df = new SimpleDateFormat ("dd/MM/yyyy");
		try {
			Date d1 = df.parse (date);
			long dt = d1.getTime();
			return dt;
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return null;
	};
	
	@SuppressWarnings("unchecked")
	public ArrayList<JSONObject> atualizaArrayObjeto (ArrayList<JSONObject> origem, JSONObject elemento, int index, Boolean atualiza) {
		
		ArrayList<JSONObject> result = new ArrayList<JSONObject>();
		for (int i = 0; i < origem.size(); i++) {
			if (i != index) {
				JSONObject jsonObj = new JSONObject();
				jsonObj.putAll(origem.get(i));
				result.add(jsonObj);
			};
		};
		if (atualiza) {
			result.add(elemento);
		};
		
		return result;
	};

	public Boolean testaElementoArray(String elemento, ArrayList<String> array) {

		for (int w = 0; w < array.size(); w++) {
			if (array.get(w).toString().equals(elemento)) {
				return true;
			};
		};
		return false;
	};

	public Boolean testaElementoArrayObject(BasicDBObject elemento, ArrayList<BasicDBObject> array) {

		for (int w = 0; w < array.size(); w++) {
			if (array.get(w).equals(elemento)) {
				return true;
			}
			;
		}
		;
		return false;
	};

	@SuppressWarnings("rawtypes")
	public boolean testaArray(ArrayList arrayOrigem, ArrayList arrayElementos) {
		for (int w = 0; w < arrayOrigem.size(); w++) {
			Boolean naoAchou = true;
			for (int i = 0; i < arrayElementos.size(); i++) {
				if (arrayOrigem.get(w).toString().equals(arrayElementos.get(i))) {
					naoAchou = false;
					i = arrayElementos.size() + 1;
				};
			};
			if (naoAchou) {
				return false;
			}
			;
		}
		;
		return true;
	};

	@SuppressWarnings("rawtypes")
	public boolean testaArrayTodosElementos(ArrayList arrayOrigem, ArrayList arrayElementos) {
		for (int w = 0; w < arrayOrigem.size(); w++) {
			for (int i = 0; i < arrayElementos.size(); i++) {
				if (arrayOrigem.get(w).toString().equals(arrayElementos.get(i))) {
					return true;
				}
				;
			}
			;
		}
		;
		return false;
	};

	@SuppressWarnings("rawtypes")
	public int testaArrayElementosIguais(ArrayList arrayOrigem, ArrayList arrayElementos) {

		int elementosIguais = 0;
		for (int w = 0; w < arrayOrigem.size(); w++) {
			for (int i = 0; i < arrayElementos.size(); i++) {
				if (arrayOrigem.get(w).toString().equals(arrayElementos.get(i))) {
					elementosIguais = elementosIguais + 1;
				}
				;
			}
			;
		}
		;
		return elementosIguais;
	}

		
};
