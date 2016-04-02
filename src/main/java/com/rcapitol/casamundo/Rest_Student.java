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
import com.rcapitol.casamundo.Student.Documento.Trips;

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
	    Gson gson = new Gson();
		JSONParser parser = new JSONParser(); 
		BasicDBObject objStudent = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
		String documento = objStudent.getString("documento");
	    Student jsonStudent = gson.fromJson(documento, Student.class);
		try {
			jsonObject = (JSONObject) parser.parse(documento);
			JSONObject jsonDocumento = new JSONObject();
			jsonDocumento.put("_id", objStudent.getString("_id"));
			jsonDocumento.put("lastDestination", jsonStudent.getDocumento().getLastDestination());
		    jsonDocumento.put("mail", jsonStudent.getDocumento().getMail());
		    jsonDocumento.put("celPhone", jsonStudent.getDocumento().getCelPhone());
		    jsonDocumento.put("phone", jsonStudent.getDocumento().getPhone()); 
		    jsonDocumento.put("lastName", jsonStudent.getDocumento().getLastName()); 
		    jsonDocumento.put("firstName", jsonStudent.getDocumento().getFirstName());
		    jsonDocumento.put("birthDay", jsonStudent.getDocumento().getBirthDay()); 
		    jsonDocumento.put("gender", jsonStudent.getDocumento().getGender()); 
		    jsonDocumento.put("nationality", jsonStudent.getDocumento().getNationality());
		    jsonDocumento.put("firstLanguage", jsonStudent.getDocumento().getFirstLanguage());
		    jsonDocumento.put("profession", jsonStudent.getDocumento().getProfession());
		    jsonDocumento.put("englishLevel", jsonStudent.getDocumento().getEnglishLevel());
		    jsonDocumento.put("streetNumber", jsonStudent.getDocumento().getStreetNumber());
		    jsonDocumento.put("streetName", jsonStudent.getDocumento().getStreetName());
		    jsonDocumento.put("state", jsonStudent.getDocumento().getState());
		    jsonDocumento.put("postalCode", jsonStudent.getDocumento().getPostalCode());
		    jsonDocumento.put("city", jsonStudent.getDocumento().getCity());
		    jsonDocumento.put("country", jsonStudent.getDocumento().getCountry());
		    jsonDocumento.put("secondaryTelephone", jsonStudent.getDocumento().getSecondaryTelephone());
		    jsonDocumento.put("emergencyContactName", jsonStudent.getDocumento().getEmergencyContactName());
		    jsonDocumento.put("emergencyContactPhone", jsonStudent.getDocumento().getEmergencyContactPhone());
		    jsonDocumento.put("emergencyContactMail", jsonStudent.getDocumento().getEmergencyContactMail());
		    jsonDocumento.put("actualTrip", jsonStudent.getDocumento().getActualTrip());
		    Integer tripIndex = Integer.parseInt(jsonStudent.getDocumento().getActualTrip());
		    if (tripIndex != null){
			    Trips jsonTrip = jsonStudent.documento.trips[tripIndex];
			    jsonDocumento.put("trip", jsonTrip);
				Mongo mongo;
				try {
					mongo = new Mongo();
					DB db = (DB) mongo.getDB("documento");
					if (jsonTrip.agencyId != null){
						ObjectId _agencyId = new ObjectId(jsonTrip.agencyId);
				    	// obter agency
						BasicDBObject setQueryAgency = new BasicDBObject();
						setQueryAgency.put("_id", _agencyId);
						DBCollection agencyCollection = db.getCollection("agency");
						DBObject agencyCursor = agencyCollection.findOne(setQueryAgency);
						BasicDBObject objAgency = (BasicDBObject) agencyCursor.get("documento");
						String docAgency = objAgency.getString("documento");
						Agency jsonAgency = gson.fromJson(docAgency, Agency.class);
						jsonDocumento.put("agency.name", jsonAgency.documento.getName());
					    jsonDocumento.put("agency.nameConsult", jsonAgency.documento.getNameConsult());
					    jsonDocumento.put("agency.celPhone", jsonAgency.documento.getCelPhone());
					    jsonDocumento.put("agency.phone", jsonAgency.documento.getPhone());
					    jsonDocumento.put("agency.email", jsonAgency.documento.getEmail());
					}else{
						jsonDocumento.put("agency.name", "");
					    jsonDocumento.put("agency.nameConsult", "");
					    jsonDocumento.put("agency.celPhone", "");
					    jsonDocumento.put("agency.phone", "");
					    jsonDocumento.put("agency.email", "");						
					};
				    	// obter school
					ObjectId _schoolId = new ObjectId(jsonTrip.schoolId);
					if (jsonTrip.schoolId != null){
					    BasicDBObject setQuerySchool = new BasicDBObject();
						setQuerySchool.put("_id", _schoolId);
						DBCollection schoolCollection = db.getCollection("school");
						DBObject schoolCursor = schoolCollection.findOne(setQuerySchool);
						BasicDBObject objSchool = (BasicDBObject) schoolCursor.get("documento");
						String docSchool = objSchool.getString("documento");
						School jsonSchool = gson.fromJson(docSchool, School.class);
						jsonDocumento.put("school.name", jsonSchool.documento.getName());
					    jsonDocumento.put("school.nameContact", jsonSchool.documento.getNameContact());
					    jsonDocumento.put("school.celPhone", jsonSchool.documento.getCelPhone());
					    jsonDocumento.put("school.phone", jsonSchool.documento.getPhone());
					    jsonDocumento.put("school.email", jsonSchool.documento.getEmail());
					}else{
						jsonDocumento.put("school.name", "");
					    jsonDocumento.put("school.nameContact", "");
					    jsonDocumento.put("school.celPhone", "");
					    jsonDocumento.put("school.phone", "");
					    jsonDocumento.put("school.email", "");						
					};
					documentos.add(jsonDocumento);
					mongo.close();
				} catch (UnknownHostException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (MongoException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		    }
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	};
	return documentos;
}

}
