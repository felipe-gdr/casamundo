package com.rcapitol.casamundo;
import java.io.IOException;
import java.lang.reflect.Array;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

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
@Path("/student")

public class Rest_Student {

	@Path("/obterEmail")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterEmail(@QueryParam("mail") String mail) throws UnknownHostException, MongoException {
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("student");
		BasicDBObject searchQuery = new BasicDBObject("documento.mail", mail);
		DBObject cursor = collection.findOne(searchQuery);
		JSONObject documento = new JSONObject();
		BasicDBObject obj = (BasicDBObject) cursor.get("documento");
		documento.put("documento", obj);
		mongo.close();
		return documento;
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
	public Response AtualizarDocumento(Student doc) throws MongoException, JsonParseException, JsonMappingException, IOException {
		String mail = doc.documento.mail;
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("student");
		Gson gson = new Gson();
		String jsonDocumento = gson.toJson(doc);
		Map<String,String> mapJson = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
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
	};
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
			if (destination != null){
				DBCursor cursor = collection.find(setQuery);
				mongo.close();
				return (JSONArray) montaLista(cursor);
			}else{
				DBCursor cursor = collection.find();
				mongo.close();
				return (JSONArray) montaLista(cursor);
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

	JSONArray montaLista(DBCursor cursor){

	JSONArray documentos = new JSONArray();

	while (((Iterator<DBObject>) cursor).hasNext()) {
		JSONObject jsonObject; 
		JSONParser parser = new JSONParser(); 
		BasicDBObject objStudent = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
		String documento = objStudent.getString("documento");
		try {
			jsonObject = (JSONObject) parser.parse(documento);
			JSONObject jsonDocumento = new JSONObject();
			jsonDocumento.put("_id", objStudent.getString("_id"));
			jsonDocumento.put("lastDestination", objStudent.getString("lastDestination"));
		    jsonDocumento.put("mail", objStudent.getString("mail"));
		    jsonDocumento.put("celPhone", objStudent.getString("celPhone"));
		    jsonDocumento.put("phone", objStudent.getString("phone")); 
		    jsonDocumento.put("lastName", objStudent.getString("lastName")); 
		    jsonDocumento.put("firstName", objStudent.getString("firstName"));
		    jsonDocumento.put("birthDay", objStudent.getString("birthDay")); 
		    jsonDocumento.put("gender", objStudent.getString("gender")); 
		    jsonDocumento.put("nationality", objStudent.getString("nationality"));
		    jsonDocumento.put("firstLanguage", objStudent.getString("firstLanguage"));
		    jsonDocumento.put("profession", objStudent.getString("profession"));
		    jsonDocumento.put("englishLevel", objStudent.getString("englishLevel"));
		    jsonDocumento.put("streetNumber", objStudent.getString("streetNumber"));
		    jsonDocumento.put("streetName", objStudent.getString("streetName"));
		    jsonDocumento.put("state", objStudent.getString("state"));
		    jsonDocumento.put("postalCode", objStudent.getString("postalCode"));
		    jsonDocumento.put("city", objStudent.getString("city"));
		    jsonDocumento.put("country", objStudent.getString("country"));
		    jsonDocumento.put("secondaryTelephone", objStudent.getString("secondaryTelephone"));
		    jsonDocumento.put("emergencyContactName", objStudent.getString("emergencyContactName"));
		    jsonDocumento.put("emergencyContactPhone", objStudent.getString("emergencyContactPhone"));
		    jsonDocumento.put("emergencyContactMail", objStudent.getString("emergencyContactMail"));
		    jsonDocumento.put("actualTrip", objStudent.getString("actualTrip"));
		    Integer tripIndex = Integer.parseInt(objStudent.getString("actualTrip"));
			
			JSONArray trips = (JSONArray) jsonObject.get("tripIndex");
		    jsonDocumento.put("trip", trips.get(0));
			ObjectId _agencyId = new ObjectId(objStudent.getString("agencyId"));
			Mongo mongo;
			try {
				mongo = new Mongo();
				DB db = (DB) mongo.getDB("documento");
		    	// obter agency
				BasicDBObject setQueryAgency = new BasicDBObject();
				setQueryAgency.put("_id", _agencyId);
				DBCollection agencyCollection = db.getCollection("agency");
				DBObject agencyCursor = agencyCollection.findOne(setQueryAgency);
				BasicDBObject objAgency = (BasicDBObject) agencyCursor.get("documento");
			    jsonDocumento.put("trip", trips.get(0));
			    jsonDocumento.put("name", objAgency.getString("name"));
			    jsonDocumento.put("nameConsult", objAgency.getString("nameConsult"));
			    jsonDocumento.put("celPhone", objAgency.getString("celPhone"));
			    jsonDocumento.put("phone", objAgency.getString("phone"));
			    jsonDocumento.put("email", objAgency.getString("email"));
		    	// obter school
			    BasicDBObject setQuerySchool = new BasicDBObject();
				setQuerySchool.put("_id", _agencyId);
				DBCollection schoolCollection = db.getCollection("school");
				DBObject schoolCursor = schoolCollection.findOne(setQuerySchool);
				BasicDBObject objSchool = (BasicDBObject) schoolCursor.get("documento");
			    jsonDocumento.put("trip", trips.get(0));
			    jsonDocumento.put("name", objSchool.getString("name"));
			    jsonDocumento.put("nameContact", objSchool.getString("nameContact"));
			    jsonDocumento.put("celPhone", objSchool.getString("celPhone"));
			    jsonDocumento.put("phone", objSchool.getString("phone"));
			    jsonDocumento.put("email", objSchool.getString("email"));
				documentos.add(jsonDocumento);
				mongo.close();
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MongoException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	};
	return documentos;
}

}
