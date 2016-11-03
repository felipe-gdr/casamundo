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
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/payment")

public class Rest_Payment {

	@SuppressWarnings("unchecked")
	@Path("/obterPayment")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterPayment(@QueryParam("id") String idParam) {
		ObjectId id = new ObjectId(idParam);
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("payment");
			BasicDBObject setQuery = new BasicDBObject("_id", id);
			DBObject cursor = collection.findOne(setQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			obj.put("id", idParam);
			documento.put("documento", obj);
						
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
			objStudent.put("id", studentIdString);
			mongoStudent.close();
			documento.put("student", objStudent);

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
	public Response IncluirPayment(Payment payment	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("payment");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(payment);
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
	public Response AtualizarDocumento(Payment doc) {
		String idString = doc.documento.id;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			ObjectId id = new ObjectId(idString);
			DBCollection collection = db.getCollection("payment");
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
	public JSONArray ObterPayments(@QueryParam("destination") String destination, @QueryParam("filters") String filters) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("payment");

			BasicDBObject setQuery = new BasicDBObject();
			if(!destination.equals("all")){
		    	setQuery.put("documento.trips.destination", destination);
		    };
			
			DBCursor cursor = collection.find(setQuery);
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objPayment = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objPayment.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("id", objPayment.getString("_id"));
					jsonDocumento.put("idStudent", jsonObject.get("idStudent"));
					jsonDocumento.put("idVendor", jsonObject.get("idVendor"));
					jsonDocumento.put("actualTrip", jsonObject.get("actualTrip"));
					jsonDocumento.put("status", jsonObject.get("status"));
					jsonDocumento.put("type", jsonObject.get("type"));
					jsonDocumento.put("destination", jsonObject.get("destination"));
					jsonDocumento.put("number", jsonObject.get("number"));
					jsonDocumento.put("dueDate", jsonObject.get("dueDate"));
					jsonDocumento.put("amount", jsonObject.get("amount"));
					jsonDocumento.put("itens", jsonObject.get("itens"));
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
				    if (tripIndex != null){
						List<?> trips = (List<?>) objStudent.get("trips");
						BasicDBObject jsonTrip = (BasicDBObject) trips.get(tripIndex);
						jsonDocumento.put("trip", jsonTrip);
				    };

					String idVendor = (String) jsonObject.get("idVendor");
					String vendorName = "";
					String type = (String) jsonObject.get("type");
					if (type.equals("family")){
						Mongo mongoFamily = new Mongo();
						DB dbFamily = (DB) mongoFamily.getDB("documento");
						DBCollection collectionFamily = dbFamily.getCollection("family");
						ObjectId idFamily = new ObjectId(idVendor);
						BasicDBObject searchQueryFamily = new BasicDBObject("_id", idFamily);
						DBObject cursorFamily = collectionFamily.findOne(searchQueryFamily);
						if (cursorFamily != null){
							BasicDBObject objFamily = (BasicDBObject) cursorFamily.get("documento");
							jsonDocumento.put("vendorName", objFamily.get("familyName"));
							vendorName = (String) objFamily.get("familyName");
						}else{
							jsonDocumento.put("vendorName", "undefined");
							vendorName = "undefined";
						};
						mongoFamily.close();
					}else{
						Mongo mongoPickup = new Mongo();
						DB dbPickup = (DB) mongoPickup.getDB("documento");
						DBCollection collectionPickup = dbPickup.getCollection("pickup");
						ObjectId idPickup = new ObjectId(idVendor);
						BasicDBObject searchQueryPickup = new BasicDBObject("_id", idPickup);
						DBObject cursorPickup = collectionPickup.findOne(searchQueryPickup);
						if (cursorPickup != null){
							BasicDBObject objPickup = (BasicDBObject) cursorPickup.get("documento");
							jsonDocumento.put("vendorName", objPickup.get("name"));
							vendorName = (String) objPickup.get("name");
						}else{
							jsonDocumento.put("vendorName", "undefined");
							vendorName = "undefined";
						};
						mongoPickup.close();
					};

					jsonDocumento.put("student", objStudent);

					Boolean filter_ok = checkFilters (filters, jsonDocumento, vendorName, null);
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
	
	public Boolean checkFilters (String filters, JSONObject objJson, String nameVendor, String schoolSigla){
		BasicDBObject jsonTrip =  (BasicDBObject) objJson.get("trip");
		Boolean response = true;
		String array[] = new String[24];
		array = filters.split(",");
		BasicDBObject objStudent = (BasicDBObject) objJson.get("student");
		int i = 0;
		while (i < array.length) {
			String element[] = new String[2];
			element = array[i].split (":");
			if (element.length > 1){
			    if (element[0].equals("filter_student")){
					if (((String) objStudent.get("firstName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						if (((String) objStudent.get("lastName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
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
			    if (element[0].equals("filter_due_date_from")){
					if (calcTime((String)objJson.get("dueDate")) <= calcTime(element[1].replace("-", ""))){
						response = false;
					};
			    };
			    if (element[0].equals("filter_due_date_to")){
					if (calcTime((String)objJson.get("dueDate")) >= calcTime(element[1].replace("-", ""))){
						response = false;
					};
			    };
			    if (element[0].equals("filter_status")){
					if (((String) objJson.get("status")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_vendor")){
					if (nameVendor.toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_private_wc")){
					if (((String) jsonTrip.get("privateWashroom")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			};
			++i;
		};
		return response;
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



