package com.rcapitol.casamundo;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

@Singleton
// @Lock(LockType.READ)
@Path("/student")

public class Rest_Student {

	@Path("/obter")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterStudent(@QueryParam("email") String email) throws UnknownHostException, MongoException {
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("diagrams");
		BasicDBObject searchQuery = new BasicDBObject("documento.email", email);
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
	public String IncluirStudent(Student student)  {
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
			return insert.get("_id").toString();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			System.out.println("UnknownHostException");
			e.printStackTrace();
		} catch (MongoException e) {
			// TODO Auto-generated catch block
			System.out.println("MongoException");
			e.printStackTrace();
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			System.out.println("JsonParseException");
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println("IOException");
			e.printStackTrace();
		}
		return "fail";
		
	};


}
