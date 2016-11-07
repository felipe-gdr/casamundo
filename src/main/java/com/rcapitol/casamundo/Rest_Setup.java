package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Iterator;
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
@Path("/setup")

public class Rest_Setup {

	@SuppressWarnings("unchecked")
	@Path("/obterSetupName")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterSetup(@QueryParam("setupKey") String setupKey) throws UnknownHostException, MongoException {
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("setup");
		BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", setupKey);
		DBObject cursor = collection.findOne(searchQuery);
		JSONObject documento = new JSONObject();
		BasicDBObject obj = (BasicDBObject) cursor.get("documento");
		documento.put("documento", obj);
		mongo.close();
		return documento;
		
	};
	@SuppressWarnings("unchecked")
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluirSetup(Setup setup	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("setup");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(setup);
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
	public Response AtualizarDocumento(Setup doc) {
		String setupKey = doc.documento.setupKey;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("setup");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(doc);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			try {
				mapJson = mapper.readValue(jsonDocumento, HashMap.class);
				JSONObject documento = new JSONObject();
				documento.putAll(mapJson);
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
				BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", setupKey);
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
	public JSONArray ObterAgencies() {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("setup");
			DBCursor cursor = collection.find();
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objSetup = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objSetup.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("_id", objSetup.getString("_id"));
					jsonDocumento.put("setupKey", jsonObject.get("setupKey"));
					jsonDocumento.put("setupValue", jsonObject.get("setupValue"));
					documentos.add(jsonDocumento);
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

}
