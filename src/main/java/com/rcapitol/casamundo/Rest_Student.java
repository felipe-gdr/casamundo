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

import org.bson.BasicBSONObject;
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
import com.rcapitol.casamundo.Student.Documento;

	
@Singleton
// @Lock(LockType.READ)
@Path("/student")

public class Rest_Student {

	@Path("/obterEmail")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterEmail(@QueryParam("mail") String mail) {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			BasicDBObject searchQuery = new BasicDBObject("documento.mail", mail);
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

	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluirStudent(Student student)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(student);
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
			// TODO Auto-generated catch block
			System.out.println("UnknownHostException");
			e.printStackTrace();
		} catch (MongoException e) {
			// TODO Auto-generated catch block
			System.out.println("MongoException");
			e.printStackTrace();
		} catch (JsonMappingException e) {
			// TODO Auto-generated catch block
			System.out.println("JsonMappingException");
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("IOException");
			e.printStackTrace();
		}
		return Response.status(500).build();
		
	};
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AtualizarDocumento(Student doc)  {
		String mail = doc.documento.mail;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(doc);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			try {
				mapJson = mapper.readValue(jsonDocumento, HashMap.class);
				JSONObject documento = new JSONObject();
				documento.putAll(mapJson);
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
				BasicDBObject searchQuery = new BasicDBObject("documento.mail", mail);
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
	
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterStudentss(@QueryParam("destination") String destination, @QueryParam("accommodation") String accommodation) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			BasicDBObject setQuery = new BasicDBObject();
			String literal = "all";
			if(!destination.equals("all")){
		    	setQuery.put("documento.trips.destination", destination);
		    };
//		    if (accommodation != null){
//		    	setQuery.put("documento.trips.accommodation", accommodation);
//		    };
			DBCollection collection = db.getCollection("student");
			
			DBCursor cursor = collection.find(setQuery);
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
				    jsonDocumento.put("emergencyContactMail", jsonObject.get("emergencyContactMail"));
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
						Mongo mongoAgency = new Mongo();
						DB dbAgency = (DB) mongoAgency.getDB("documento");
						DBCollection collectionAgency = dbAgency.getCollection("agency");
						BasicDBObject searchQueryAgency = new BasicDBObject("documento.name", agencyName);
						DBObject cursorAgency = collectionAgency.findOne(searchQueryAgency);
						JSONObject documentoAgency = new JSONObject();
						BasicDBObject obj = (BasicDBObject) cursorAgency.get("documento");
						jsonDocumento.put("agency", obj);
						mongoAgency.close();
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
						Mongo mongoSchool = new Mongo();
						DB dbSchool = (DB) mongoSchool.getDB("documento");
						DBCollection collectionSchool = dbSchool.getCollection("school");
						BasicDBObject searchQuerySchool = new BasicDBObject("documento.name", schoolName);
						DBObject cursorSchool = collectionSchool.findOne(searchQuerySchool);
						JSONObject documentoSchool = new JSONObject();
						BasicDBObject obj = (BasicDBObject) cursorSchool.get("documento");
						jsonDocumento.put("school", obj);
						mongoSchool.close();
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

	@Path("/changeStatus")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String ChangeStatus(@QueryParam("params") String params)  {
		System.out.println("params : " + params);
		String array[] = new String[6];
		array = params.split("/");
		String mail = array [0].split(":")[1]; 
		Integer indexTrip = Integer.parseInt((String) array [1].split(":")[1]); 
		String status = array [2].split(":")[1];
		String familyName = array [3].split(":")[1];
		String emailFamily = array [4].split(":")[1];
		String reason = array [5].split(":")[1];
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			BasicDBObject searchQuery = new BasicDBObject("documento.mail", mail);
			DBObject cursor = collection.findOne(searchQuery);
			JSONParser parser = new JSONParser(); 
			BasicDBObject objStudent = (BasicDBObject) cursor;
			String documento = objStudent.getString("documento");
			JSONObject jsonObject; 
			try {
				jsonObject = (JSONObject) parser.parse("{\"documento.trips." + indexTrip + ".status\":\"" + status + "\"}");
				String jsonDocumento = documento;
				Map<String,String> mapJson = new HashMap<String,String>();
				ObjectMapper mapper = new ObjectMapper();
				try {
					mapJson = mapper.readValue(jsonDocumento, HashMap.class);
					JSONObject docJson = new JSONObject();
					docJson.putAll(mapJson);
					BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(jsonObject));
					BasicDBObject searchQueryUpdate = new BasicDBObject("documento.mail", mail);
					DBObject cursorUpdate = collection.findAndModify(searchQueryUpdate,
			                null,
			                null,
			                false,
			                update,
			                true,
			                false);
					mongo.close();
					TemplateEmail template = new TemplateEmail(); 
					String studentName = (String) docJson.get("firstName") + " " + (String) docJson.get("lastName");
					String emailStudent = (String) docJson.get("mail");
					SendEmailHtml sendEmailHtml = new SendEmailHtml();
					String message = "";
					String subject = "";
					if (reason.equals("Accept")){
						message = "Family " + familyName + " confirm offer of student " + studentName;
						subject = "Family "  + familyName + " confirm offer";
					};
					if (reason.equals("NoRoom")){
						message = "Family " + familyName + " decline offer because don't have room available for student " + studentName;
						subject = "Family "  + familyName + " don't have room";
					};
					if (reason.equals("Refuse")){
						message = "Family " + familyName + " don't accept student " + studentName;
						subject = "Family "  + familyName + " don't accept student";
					};
					if (reason.equals("DocsOk")){
						message = "Confirmation letter sent to a sutdent " + studentName;
						subject = "Confirmation letter sent to a sutdent " + studentName;
					};
					if (reason.equals("InHouse")){
						message = "Student " + studentName + " arrived and he is in house";
						subject = "Student " + studentName + " in house";
					};
					if (reason.equals("Cancel")){
						message = "Student " + studentName + " cancel accommodation";
						subject = "Student " + studentName + " cancel";
					};
					if (reason.equals("Terminated")){
						message = "Student " + studentName + " finished accommodation";
						subject = "Student " + studentName + " finished";
					};
					sendEmailHtml.sendEmailHtml("smtp.gmail.com", 
							"grenneglr@gmail.com", 
							"Hefega0701", 
							"grenneglr@gmail.com", 
							"grenneglr@gmail.com", 
							subject, 
							template.emailHtml(
									familyName, 
									emailFamily, 
									studentName, 
									emailStudent, 
									subject, 
									message));

					return "Thanks for your decision";
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
			} catch (ParseException e) {
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
};