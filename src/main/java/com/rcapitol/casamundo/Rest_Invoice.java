package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/invoice")

public class Rest_Invoice {

	@SuppressWarnings("unchecked")
	@Path("/obterInvoice")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterInvoice(@QueryParam("id") String idParam ) {
		ObjectId id = new ObjectId(idParam);
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("invoice");
			BasicDBObject setQuery = new BasicDBObject("_id", id);
			DBObject cursor = collection.findOne(setQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			//
			//** ler student
			//
			String studentIdString = obj.getString("idStudent");
			ObjectId studentId = new ObjectId(studentIdString);
			Mongo mongoStudent = new Mongo();
			DB dbStudent = (DB) mongoStudent.getDB("documento");
			DBCollection collectionStudent = dbStudent.getCollection("student");
			BasicDBObject searchQueryStudent = new BasicDBObject("_id", studentId);
			DBObject cursorStudent = collectionStudent.findOne(searchQueryStudent);
			BasicDBObject objStudent = (BasicDBObject) cursorStudent.get("documento");
			mongoStudent.close();
			
			documento.put("student", objStudent);
			documento.put("documento", obj);
			mongo.close();
			return documento;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};
	@SuppressWarnings("unchecked")
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluirInvoice(Invoice invoice	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("invoice");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(invoice);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			mapJson = mapper.readValue(jsonDocumento, HashMap.class);
			JSONObject documento = new JSONObject();
			documento.putAll(mapJson);
			DBObject insert = new BasicDBObject(documento);
			collection.insert(insert);
			mongo.close();
			return Response.status(200).entity(documento).build();
		} catch (UnknownHostException e) {
			System.out.println("UnknownHostException");
			e.printStackTrace();
		} catch (MongoException e) {
			System.out.println("MongoException");
			e.printStackTrace();
		} catch (JsonMappingException e) {
			System.out.println("JsonMappingException");
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("IOException");
			e.printStackTrace();
		}
		return Response.status(500).build();
		
	};
	@SuppressWarnings("unchecked")
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AtualizarDocumento(Invoice doc) {
		String idString = doc.documento.id;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			ObjectId id = new ObjectId(idString);
			DBCollection collection = db.getCollection("invoice");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(doc);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			try {
				mapJson = mapper.readValue(jsonDocumento, HashMap.class);
				JSONObject documento = new JSONObject();
				documento.putAll(mapJson);
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
				BasicDBObject setQuery = new BasicDBObject("_id", id);
				@SuppressWarnings("unused")
				DBObject cursor = collection.findAndModify(setQuery,
		                null,
		                null,
		                false,
		                update,
		                true,
		                false);
				mongo.close();
				return Response.status(200).build();
			} catch (JsonParseException e) {
				e.printStackTrace();
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};
	@SuppressWarnings("unchecked")
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterInvoices(@QueryParam("destination") String destination, @QueryParam("accommodation") String accommodation,@QueryParam("filters") String filters) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("invoice");

			BasicDBObject setQuery = new BasicDBObject();
			if(!destination.equals("all")){
		    	setQuery.put("documento.trips.destination", destination);
		    };
			
			DBCursor cursor = collection.find(setQuery);
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objInvoice = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objInvoice.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("id", objInvoice.getString("_id"));
					jsonDocumento.put("idStudent", jsonObject.get("idStudent"));
					jsonDocumento.put("actualTrip", jsonObject.get("actualTrip"));
					jsonDocumento.put("status", jsonObject.get("status"));
					jsonDocumento.put("number", jsonObject.get("number"));
					jsonDocumento.put("dueDate", jsonObject.get("dueDate"));
					jsonDocumento.put("totalAmount", jsonObject.get("totalAmount"));
					jsonDocumento.put("itensNet", jsonObject.get("itensNet"));
					jsonDocumento.put("itensGross", jsonObject.get("itensGross"));
					//
					//** ler student
					//
					String idStudentString = (String) jsonObject.get("idStudent");
					ObjectId studentId = new ObjectId(idStudentString);
					Mongo mongoStudent = new Mongo();
					DB dbStudent = (DB) mongoStudent.getDB("documento");
					DBCollection collectionStudent = dbStudent.getCollection("student");
					BasicDBObject searchQueryStudent = new BasicDBObject("_id", studentId);
					DBObject cursorStudent = collectionStudent.findOne(searchQueryStudent);
					BasicDBObject objStudent = (BasicDBObject) cursorStudent.get("documento");
					mongoStudent.close();

				    Integer tripIndex = Integer.parseInt((String) objStudent.get("actualTrip"));
					String agencySigla = null;
				    String agencyName = null;
				    if (tripIndex != null){
						@SuppressWarnings("rawtypes")
						List trips = (List) objStudent.get("trips");
						BasicDBObject jsonTrip = (BasicDBObject) trips.get(tripIndex);
						jsonDocumento.put("trip", jsonTrip);
						agencyName = (String) jsonTrip.get("agencyName");
				    };
					if (agencyName != null && !agencyName.equals("")){
						Mongo mongoAgency = new Mongo();
						DB dbAgency = (DB) mongoAgency.getDB("documento");
						DBCollection collectionAgency = dbAgency.getCollection("agency");
						BasicDBObject searchQueryAgency = new BasicDBObject("documento.name", agencyName);
						DBObject cursorAgency = collectionAgency.findOne(searchQueryAgency);
						BasicDBObject obj = (BasicDBObject) cursorAgency.get("documento");
						agencySigla = (String) obj.get("agencySigla");
						jsonDocumento.put("agencyName", agencyName);
						jsonDocumento.put("agencySigla", agencySigla);
						mongoAgency.close();
					}else{
						jsonDocumento.put("agencyName", "");
						jsonDocumento.put("agencySigla", "");
					};

					jsonDocumento.put("student", objStudent);

					Boolean filter_ok = checkFilters (filters, jsonDocumento, agencySigla, null);
					if (filter_ok){
						documentos.add(jsonDocumento);
					};
					mongo.close();
				} catch (ParseException e) {
					e.printStackTrace();
				}
			};
			mongo.close();
			return documentos;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};
	
	@SuppressWarnings("rawtypes")
	public Boolean checkFilters (String filters, JSONObject objJson, String agencySigla, String schoolSigla){
		BasicDBObject jsonTrip =  (BasicDBObject) objJson.get("trip");
		Boolean response = true;
		String array[] = new String[24];
		array = filters.split(",");
		int i = 0;
		while (i < array.length) {
			String element[] = new String[2];
			element = array[i].split (":");
			if (element.length > 1){
			    if (element[0].equals("filter_student")){
					if (((String) objJson.get("firstName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						if (((String) objJson.get("lastName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
					};
			    };
			    if (element[0].equals("filter_gender")){
					if (element[1].toLowerCase().equals("male") ){
						if (!((String) objJson.get("gender")).toLowerCase().equals("male")){
							response = false;
						};
					}else{
						if (element[1].toLowerCase().equals("female") ){
							if (!((String) objJson.get("gender")).toLowerCase().equals("female")){
								response = false;
							};
						}else{
							response = false;
						};
					};
			    };
			    if (element[0].equals("filter_nationality")){
					if (((String) objJson.get("nationality")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_age_from")){
			    	Long ageFrom = calcAge((String)objJson.get("birthDay"));
					if (ageFrom <= Integer.parseInt((String) element[1])){
						response = false;
					};
			    };
			    if (element[0].equals("filter_age_to")){
			    	Long ageTo = calcAge((String)objJson.get("birthDay"));
					if (ageTo >= Integer.parseInt((String) element[1])){
						response = false;
					};
			    };
			    if (element[0].equals("filter_check_in")){
					if (calcTime((String)jsonTrip.get("start")) <= calcTime(element[1].replace("-", ""))){
						response = false;
					};
			    };
			    if (element[0].equals("filter_check_out")){
					if (calcTime((String)jsonTrip.get("start")) >= calcTime(element[1].replace("-", ""))){
						response = false;
					};
			    };
			    if (element[0].equals("filter_status")){
					if (((String) jsonTrip.get("status")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_payment")){
					if (((String) jsonTrip.get("payment")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_visa")){
//					if (((String) jsonTrip.get("visa")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
//						response = false;
//					};
			    };
			    if (element[0].equals("filter_flight")){
					if (((String) jsonTrip.get("arrivalFlightNumber")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_pickup")){
					if (((String) jsonTrip.get("pickup")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_dropoff")){
					if (((String) jsonTrip.get("dropoff")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_school")){
					if (schoolSigla.toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_agent")){
					if (agencySigla.toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_host")){
					if (((String) jsonTrip.get("familyName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_driver")){
//					if (((String) jsonTrip.get("driver")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
//						response = false;
//					};
			    };
			    if (element[0].equals("filter_occupancy")){
					if (((String) jsonTrip.get("occupancy")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_private_wc")){
					if (((String) jsonTrip.get("privateWashroom")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_dogs")){
					if (((String) jsonTrip.get("liveDogs")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_cats")){
					if (((String) jsonTrip.get("liveCats")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_meals")){
			    	ArrayList arrayListMeals = new ArrayList(); 
			    	arrayListMeals = (ArrayList) jsonTrip.get("mealPlan");
			    	Object arrayMeals[] = arrayListMeals.toArray(); 
					Boolean resultMeals = false;
					int w = 0;
					while (w < arrayMeals.length) {
						if (((String) arrayMeals[w]).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						}else{
							resultMeals = true;
						};
						++w;
					};
					if (!resultMeals){
						response = false;
					}
			    };
			    if (element[0].equals("filter_diet")){
			    	ArrayList arrayListDiet = new ArrayList(); 
			    	arrayListDiet = (ArrayList) jsonTrip.get("specialDiet");
			    	Object arrayDiet[] = arrayListDiet.toArray(); 
					Boolean resultDiet = false;
					int z = 0;
					while (z < arrayDiet.length) {
						if (((String) arrayDiet[z]).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						}else{
							resultDiet = true;
						};
						++z;
					};
					if (!resultDiet){
						response = false;
					}
			    };
			};
			++i;
		};
		return response;
	};
		
	public Long calcAge (String birthDate){
		
		DateFormat df = new SimpleDateFormat ("dd/MM/yyyy");
		try {
			Date d1 = df.parse (convertDateMes (birthDate));
			Date d2 = new Date(System.currentTimeMillis()); 
			long dt = (d2.getTime() - d1.getTime()) + 3600000;
			return ((dt / 86400000L) / 365L);
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return null;
	};
	
	public Long calcTime (String date){
		System.out.println("date=" + date);
		DateFormat df = new SimpleDateFormat ("dd/MM/yyyy");
		try {
			Date d1 = df.parse (convertDateMes (date));
			long dt = d1.getTime();
			return dt;
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return null;
	};

	public String convertDateMes (String strDate){
		String mesNumber = "01";
		String mesAlpha = strDate.substring	(2, 5);
	    if (mesAlpha.equals("Jan")){
	    	mesNumber = "01";
	    };
	    if (mesAlpha.equals("Feb")){
	    	mesNumber = "02";
	    };
	    if (mesAlpha.equals("Mar")){
	    	mesNumber = "03";
	    };
	    if (mesAlpha.equals("Apr")){
	    	mesNumber = "04";
	    };
	    if (mesAlpha.equals("May")){
	    	mesNumber = "05";
	    };
	    if (mesAlpha.equals("Jun")){
	    	mesNumber = "06";
	    };
	    if (mesAlpha.equals("Jul")){
	    	mesNumber = "07";
	    };
	    if (mesAlpha.equals("Aug")){
	    	mesNumber = "08";
	    };
	    if (mesAlpha.equals("Sep")){
	    	mesNumber = "09";
	    };
	    if (mesAlpha.equals("Out")){
	    	mesNumber = "10";
	    };
	    if (mesAlpha.equals("Nov")){
	    	mesNumber = "11";
	    };
	    if (mesAlpha.equals("Dec")){
	    	mesNumber = "12";
	    };
		return strDate.substring(0, 2) + "/" + mesNumber + "/" + strDate.substring(5, 9);
	};
};
