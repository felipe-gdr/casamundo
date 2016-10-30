package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
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
@Path("/table")

public class Rest_Table {

	@SuppressWarnings("unchecked")
	@Path("/obter")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject Obter() {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("table");
			BasicDBObject searchQuery = new BasicDBObject();
			DBObject cursor = collection.findOne(searchQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			documento.put("documento", obj);
			mongo.close();
			return documento;
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MongoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	};
	@SuppressWarnings("unchecked")
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AtualizarDocumento(Table doc) {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("table");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(doc);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			try {
				mapJson = mapper.readValue(jsonDocumento, HashMap.class);
				JSONObject documento = new JSONObject();
				documento.putAll(mapJson);
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
				BasicDBObject searchQuery = new BasicDBObject();
				@SuppressWarnings("unused")
				DBObject cursor = collection.findAndModify(searchQuery,
		                null,
		                null,
		                false,
		                update,
		                true,
		                false);
				mongo.close();
				return Response.status(200).build();
			} catch (JsonParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JsonMappingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MongoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	};
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterStudentss(@QueryParam("destination") String destination) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			BasicDBObject setQuery = new BasicDBObject();
			setQuery.put("documento.destination", destination);
			DBCollection collection = db.getCollection("student");
			
			DBCursor cursor = collection.find();
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objStudent = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objStudent.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("_id", objStudent.getString("_id"));
					jsonDocumento.put("lastDestination", jsonObject.get("lastDestination"));
				    jsonDocumento.put("mail", jsonObject.get("mail"));
				    jsonDocumento.put("celPhone", jsonObject.get("celPhone"));
				    jsonDocumento.put("phone", jsonObject.get("phone")); 
				    jsonDocumento.put("lastName", jsonObject.get("lastName")); 
				    jsonDocumento.put("firstName", jsonObject.get("firstName"));
				    jsonDocumento.put("birthDay", jsonObject.get("birthDay")); 
				    jsonDocumento.put("gender", jsonObject.get("gender")); 
				    jsonDocumento.put("nationality", jsonObject.get("nationality"));
				    jsonDocumento.put("firstLanguage", jsonObject.get("firstLanguage"));
				    jsonDocumento.put("profession", jsonObject.get("profession"));
				    jsonDocumento.put("englishLevel", jsonObject.get("englishLevel"));
				    jsonDocumento.put("streetNumber", jsonObject.get("streetNumber"));
				    jsonDocumento.put("streetName", jsonObject.get("streetName"));
				    jsonDocumento.put("state", jsonObject.get("state"));
				    jsonDocumento.put("postalCode", jsonObject.get("postalCode"));
				    jsonDocumento.put("city", jsonObject.get("city"));
				    jsonDocumento.put("country", jsonObject.get("country"));
				    jsonDocumento.put("secondaryTelephone", jsonObject.get("secondaryTelephone"));
				    jsonDocumento.put("emergencyContactName", jsonObject.get("emergencyContactName"));
				    jsonDocumento.put("emergencyContactPhone", jsonObject.get("emergencyContactPhone"));
				    jsonDocumento.put("emergencyContactMail", jsonObject.get("emergencyContactMail"));
				    jsonDocumento.put("actualTrip", jsonObject.get("actualTrip"));
				    Integer tripIndex = Integer.parseInt((String) jsonObject.get("actualTrip"));
				    String agencyName = null;
				    String schoolName = null;
				    if (tripIndex != null){
						List trips = (List) jsonObject.get("trips");
						JSONObject jsonTrip = (JSONObject) trips.get(tripIndex);
						jsonDocumento.put("trip", jsonTrip);
						agencyName = (String) jsonTrip.get("agencyName");
						schoolName = (String) jsonTrip.get("schoolName");
				    };
					if (agencyName != null){
/*						Mongo mongoAgency;
						mongoAgency = new Mongo();
						DB dbAgency = (DB) mongoAgency.getDB("documento");
						ObjectId _agencyName = new ObjectId(agencyName);
				    	// obter agency
	        			DBCollection docCollection = dbAgency.getCollection("student");
	        			BasicDBObject searchQuery = new BasicDBObject("_id",_agencyName);
	        			DBObject docCursorAgency = docCollection.findOne(searchQuery);
	        			BasicDBObject docAgency = (BasicDBObject) docCursorAgency.get("documento");
*/	        			JSONObject docAgency = new JSONObject();
						docAgency.put("name", "Canada Destino");
						docAgency.put("nameConsult", "Saulo Oliveira");
						docAgency.put("celPhone", "011994564584");
						docAgency.put("phone", "011994564584");
						docAgency.put("email", "soliveira@canadadestino.com.br");						
						jsonDocumento.put("agency", docAgency);
//						mongoAgency.close();
					}else{
	        			JSONObject docAgency = new JSONObject();
						docAgency.put("name", "");
						docAgency.put("nameConsult", "");
						docAgency.put("celPhone", "");
						docAgency.put("phone", "");
						docAgency.put("email", "");						
						jsonDocumento.put("agency", docAgency);
					};
					if (schoolName != null){
/*						Mongo mongoSchool;
						mongoSchool = new Mongo();
						DB dbSchool = (DB) mongoSchool.getDB("documento");
						ObjectId _schoolName = new ObjectId(schoolName);
				    	// obter school
	        			DBCollection docCollection = dbSchool.getCollection("student");
	        			BasicDBObject searchQuery = new BasicDBObject("_id",_schoolName);
	        			DBObject docCursorSchool = docCollection.findOne(searchQuery);
	        			BasicDBObject docSchool = (BasicDBObject) docCursorSchool.get("documento");
*/	        			JSONObject docSchool = new JSONObject();
						docSchool.put("name", "UTC");
						docSchool.put("nameContact", "John Andrews");
						docSchool.put("celPhone", "011994564584");
						docSchool.put("phone", "011994564584");
						docSchool.put("email", "andrews@uft.com.can");						
						jsonDocumento.put("school", docSchool);
//						mongoSchool.close();
					}else{
	        			JSONObject docSchool = new JSONObject();
						docSchool.put("name", "");
						docSchool.put("nameContact", "");
						docSchool.put("celPhone", "");
						docSchool.put("phone", "");
						docSchool.put("email", "");						
						jsonDocumento.put("school", docSchool);
					};
					documentos.add(jsonDocumento);
					mongo.close();
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			};
			mongo.close();
			return documentos;
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (MongoException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	};

}
