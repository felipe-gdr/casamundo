package com.casamundo.commons;

import com.mongodb.BasicDBObject;
import org.json.simple.JSONObject;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Array;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.util.logging.Level;
import java.util.logging.Logger;

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
		
		DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
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

	public Long calcAgeData (String birthDate, String date){

		DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
		try {
			Date d1 = df.parse (birthDate);
			Date d2 = df.parse (date);
			long dt = (d2.getTime() - d1.getTime()) + 3600000;
			return ((dt / 86400000L) / 365L);
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return null;
	};

	public Boolean comparaData (String dataIni, String dataFim){

		DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
		try {
			Date d1 = df.parse (dataIni);
			Date d2 = df.parse (dataFim);
			if (d1.after(d2)){
				return true;
			}else{
				return false;
			}
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return false;
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
		cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(date.substring(8, 10)));
		cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
		cal.add(Calendar.DAY_OF_MONTH, days);
		return df.format(cal.getTime());
	};

    public String calcNewMonth (String date, int months){

        DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
        cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
        cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(date.substring(8, 10)));
        cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
        cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
        cal.add(Calendar.MONTH, months);
        return df.format(cal.getTime());
    };

	public String calcNewYear (String date, int years){

		DateFormat df = new SimpleDateFormat ("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(date.substring(8, 10)));
		cal.set(Calendar.MONTH, (Integer.parseInt(date.substring(5, 7)) ) - 1 );
		cal.set(Calendar.YEAR, Integer.parseInt(date.substring(0, 4)));
		cal.add(Calendar.YEAR, years);
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
		if (type == "yyyy-mm-dd"){
			dateString = String.valueOf(year) + monthString + dayString;
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
			}
		}
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
			}
		}
		return elementosIguais;
	}

	public BasicDBObject numberWeeks (String start, String end, String accControl){
				  
		BasicDBObject result = new BasicDBObject();
		int weekDayStart =  weekDay(start);
		int weekDayEnd =  weekDay(end);
		int days = difDate(start, end);
        int weeks = days / 7;
        int daysWeek = weeks * 7;
		int extraNightsSaida = 0;
		int extraNightsEntrada = 0;
		
		result.put("start", start);
		result.put("end", end);

        if (!accControl.equals("homestay")) {
            if (days < 28) {
                result.put("weeks", "0");
                result.put("extraNights", Integer.toString(days));
                result.put("extraNightsEntrada", Integer.toString(days));
                result.put("extraNightsSaida", Integer.toString(extraNightsSaida));
                return criaDatas(result);
            }
        }

        if (days < 4) {
            result.put("weeks", "0");
            result.put("extraNights", Integer.toString(days));
            result.put("extraNightsEntrada", Integer.toString(days));
            result.put("extraNightsSaida", Integer.toString(extraNightsSaida));
            return criaDatas(result);
        }

        if (days < 7) {
            result.put("weeks", "1");
            result.put("extraNights", "0");
            result.put("extraNightsEntrada", "0");
            result.put("extraNightsSaida", "0");
            return criaDatas(result);
        }

		if (weekDayStart < 4){
		    days = days + weekDayStart - 1;
            if (weekDayEnd > 4){
                days = days + 8 - weekDayEnd;
            }else{
                extraNightsSaida = weekDayEnd - 1;
            }
        }else{
            extraNightsEntrada = 7 - weekDayStart;
            if (weekDayEnd < 4){
                extraNightsSaida = weekDayEnd;
            }else{
                days = days + 8 - weekDayEnd;
            }
        }

        weeks = days / 7;
        int extraNights = extraNightsEntrada + extraNightsSaida;
        result.put("weeks", Integer.toString(weeks));
        result.put("extraNights", Integer.toString(extraNights));
        result.put("extraNightsEntrada", Integer.toString(extraNightsEntrada));
        result.put("extraNightsSaida", Integer.toString(extraNightsSaida));

		return criaDatas(result);
	}

    public BasicDBObject numberWeeksSeason (String start, String end){

        BasicDBObject result = new BasicDBObject();
        int weekDayStart =  weekDay(start);
        int weekDayEnd =  weekDay(end);
        int days = difDate(start, end);
        int weeks = days / 7;
        int extraNightsSaida = 0;
        int extraNightsEntrada = 0;

        result.put("start", start);
        result.put("end", end);

        if (days < 4) {
            result.put("weeks", "0");
            result.put("extraNights", Integer.toString(days));
            result.put("extraNightsEntrada", Integer.toString(days));
            result.put("extraNightsSaida", Integer.toString(extraNightsSaida));
            return criaDatas(result);
        }

        if (days < 7) {
            result.put("weeks", "1");
            result.put("extraNights", "0");
            result.put("extraNightsEntrada", "0");
            result.put("extraNightsSaida", "0");
            return criaDatas(result);
        }

        if (weekDayStart < 4){
            days = days + weekDayStart - 1;
            if (weekDayEnd > 4){
                days = days + 8 - weekDayEnd;
            }else{
                extraNightsSaida = weekDayEnd - 1;
            }
        }else{
            extraNightsEntrada = 7 - weekDayStart;
            if (weekDayEnd < 4){
                extraNightsSaida = weekDayEnd;
            }else{
                days = days + 8 - weekDayEnd;
            }
        }

        weeks = days / 7;
        int extraNights = extraNightsEntrada + extraNightsSaida;
        result.put("weeks", Integer.toString(weeks));
        result.put("extraNights", Integer.toString(extraNights));
        result.put("extraNightsEntrada", Integer.toString(extraNightsEntrada));
        result.put("extraNightsSaida", Integer.toString(extraNightsSaida));

        return criaDatas(result);
    }

	private BasicDBObject criaDatas(BasicDBObject result) {
		
		int weeks = Integer.parseInt(result.getString("weeks"));
		int extraNightsEntrada = Integer.parseInt(result.getString("extraNightsEntrada"));
		int extraNightsSaida = Integer.parseInt(result.getString("extraNightsSaida"));
		String start = result.getString("start");
		String end = result.getString("end");
		String startWeek = "";
		String endWeek = "";
		String startExtraNightEntrada = "";
		String endExtraNightEntrada = "";
		String startExtraNightSaida = "";
		String endExtraNightSaida = "";
		
		if (weeks != 0) {
			startWeek = start;
			endWeek = end;
		}
		if (extraNightsEntrada != 0) {
			startExtraNightEntrada = start;
			endExtraNightEntrada = calcNewDate(start, extraNightsEntrada);
			if (weeks != 0) {
				startWeek = calcNewDate(start, extraNightsEntrada);
			}
		}
		if (extraNightsSaida != 0) {
			endExtraNightSaida = end;
			startExtraNightSaida = calcNewDate(end, extraNightsSaida * -1);
			if (weeks != 0) {
				endWeek = calcNewDate(end, (extraNightsSaida) * -1);
			}
		}
		result.put("startExtraNightsEntrada", startExtraNightEntrada);
		result.put("endExtraNightsEntrada", endExtraNightEntrada);
		result.put("startWeeks", startWeek);
		result.put("endWeeks", endWeek);
		result.put("startExtraNightsSaida", startExtraNightSaida);
		result.put("endExtraNightsSaida", endExtraNightSaida);
		
		return result;
	}

	public int convertDateInt(String date) {

        String dateString = date.substring(0,10);
        return Integer.parseInt(dateString.replace("-", ""));

	};

    public BasicDBObject getDaysInterval(String start, String end, String start1, String end1) {
        BasicDBObject result = new BasicDBObject();
        result.put ("days",0);
        result.put("start", start);
        result.put("end",end);
        if (convertDateInt(start1) >= convertDateInt(start) &&
                convertDateInt(end1) <= convertDateInt(end)){
            result.put ("days",difDate(start1, end1));
            result.put("start", start1);
            result.put("end",end1);
			return result;
		};
		if (convertDateInt(start1) >= convertDateInt(start) &&
                convertDateInt(start1) < convertDateInt(end) &&
                convertDateInt(end1) >= convertDateInt(end)){
            result.put ("days",difDate(start1, end));
            result.put("start", start1);
            result.put("end", end);
            return result;
		};
		if (convertDateInt(start1) <= convertDateInt(start) &&
                convertDateInt(end1) <= convertDateInt(end) &&
                convertDateInt(end1) > convertDateInt(start)){
            result.put ("days",difDate(start, end1));
            result.put("start", start);
            result.put("end", end1);
            return result;
		};
		if (convertDateInt(start1) <= convertDateInt(start) &&
                convertDateInt(end1) >= convertDateInt(end)){
            result.put ("days",difDate(start, end));
            result.put("start", start);
            result.put("end", end);
            return result;
		};
		return result;
    };

	public String lastDayMonth(String date) {

        Calendar calendar = convertToCalendar(date);
        calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DATE));
        int day = calendar.get(Calendar.DATE);
        //Note: +1 the month for current month
        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR);

        String dayString = "";
        String monthString = "";

        if (day < 10){
            dayString = "0" + String.valueOf(day);
        }else{
            dayString = String.valueOf(day);
        };

        if (month < 10){
            monthString = "0" + String.valueOf(month);
        }else{
            monthString = String.valueOf(month);
        };

        String dateString = String.valueOf(year) + "-" + monthString + "-" + dayString;

        return dateString;

	}


	public ArrayList<Object> removeObjeto(ArrayList<Object> array, Object elemento) {
		if (array != null) {
			for (int i = 0; i < array.size(); i++) {
				if (array.get(i).equals(elemento)) {
					array.remove(i);
					return array;
				};
			};
		} else {
			return array;
		};
		return array;
	};

	public ArrayList<String> removeString(ArrayList<String> array, String elemento) {
		if (array != null) {
			for (int i = 0; i < array.size(); i++) {
				if (array.get(i).equals(elemento)) {
					array.remove(i);
					return array;
				};
			};
		} else {
			return array;
		};
		return array;
	};

	@SuppressWarnings("unchecked")
	public JSONObject getProperties() {
		Properties prop = new Properties();
		InputStream input = null;
		try {
			input = getClass().getClassLoader().getResourceAsStream("application.properties");
			// load a properties file
			prop.load(input);
			JSONObject properties = new JSONObject();
			properties.put("database", prop.getProperty("database"));
			properties.put("dbuser", prop.getProperty("dbuser"));
			properties.put("dbpassword", prop.getProperty("dbpassword"));
			properties.put("host", prop.getProperty("host"));
			return properties;
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return null;
	};

	private static MessageDigest md;

	public static String cryptWithMD5(String pass){
		try {
			md = MessageDigest.getInstance("MD5");
			byte[] passBytes = pass.getBytes();
			md.reset();
			byte[] digested = md.digest(passBytes);
			StringBuffer sb = new StringBuffer();
			for(int i=0;i<digested.length;i++){
				sb.append(Integer.toHexString(0xff & digested[i]));
			}
			return sb.toString();
		} catch (NoSuchAlgorithmException ex) {
			Logger.getLogger(Commons.class.getName()).log(Level.SEVERE, null, ex);
		}
		return null;


	}
	public String getDataString(HashMap<String, String> params) throws UnsupportedEncodingException {
		StringBuilder result = new StringBuilder();
		boolean first = true;
		for(Map.Entry<String, String> entry : params.entrySet()){
			if (first)
				first = false;
			else
				result.append("&");
			result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
			result.append("=");
			result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
		}
		return result.toString();
	}

	public ArrayList<Object> addArray(ArrayList<Object> arrayA, ArrayList<Object> arrayB) {

		ArrayList<Object> result = arrayA;

		for (Object array:arrayB) {
			result.add(array);
		}

		return result;

	}
};
