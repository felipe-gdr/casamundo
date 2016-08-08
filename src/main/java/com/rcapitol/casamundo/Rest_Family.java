package com.rcapitol.casamundo;

import java.io.IOException;
import java.lang.reflect.Array;
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
@Path("/family")

public class Rest_Family {

	@Path("/obterFamilyName")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterName(@QueryParam("familyName") String familyName) {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("family");
			BasicDBObject searchQuery = new BasicDBObject("documento.familyName", familyName);
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
	public Response IncluirFamily(Family family	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("family");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(family);
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
	public Response AtualizarDocumento(Family doc) {
		String familyName = doc.documento.familyName;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("family");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(doc);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			try {
				mapJson = mapper.readValue(jsonDocumento, HashMap.class);
				JSONObject documento = new JSONObject();
				documento.putAll(mapJson);
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
				BasicDBObject searchQuery = new BasicDBObject("documento.familyName", familyName);
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
	public JSONArray ObterFamilies(@QueryParam("destination") String destination) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			BasicDBObject setQuery = new BasicDBObject();
			if (destination != null){
				if(!destination.equals("all")){
			    	setQuery.put("documento.address.destination", destination);
			    };
			};
			BasicDBObject setSort = new BasicDBObject();
			setSort.put("documento.familyName", 1);

			DBCollection collection = db.getCollection("family");
			
			DBCursor cursor = collection.find(setQuery).sort(setSort);;
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objFamily = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objFamily.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("_id", objFamily.getString("_id"));
					jsonDocumento.put("familyName", jsonObject.get("familyName"));
					jsonDocumento.put("type", jsonObject.get("type"));
					jsonDocumento.put("numbersBedroom", jsonObject.get("numbersBedroom"));
					jsonDocumento.put("numbersStudentsBedroom", jsonObject.get("numbersStudentsBedroom"));
					jsonDocumento.put("numberPrivateWashroom", jsonObject.get("numberPrivateWashroom"));
				    jsonDocumento.put("contact", jsonObject.get("contact"));
				    jsonDocumento.put("address", jsonObject.get("address"));
			    	if (destination != null){
					    jsonDocumento.put("mealPlan", jsonObject.get("mealPlan"));
					    jsonDocumento.put("specialDiet", jsonObject.get("specialDiet"));
					    jsonDocumento.put("haveDogs", jsonObject.get("haveDogs"));
					    jsonDocumento.put("haveCats", jsonObject.get("haveCats"));
					    jsonDocumento.put("preferGenderStudent", jsonObject.get("preferGenderStudent"));
					    jsonDocumento.put("acceptSmokeStudent", jsonObject.get("acceptSmokeStudent"));
					    jsonDocumento.put("dontHostNationality", jsonObject.get("dontHostNationality"));
					    jsonDocumento.put("preferAgeStudent", jsonObject.get("preferAgeStudent"));
					    jsonDocumento.put("rooms", jsonObject.get("rooms"));
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
