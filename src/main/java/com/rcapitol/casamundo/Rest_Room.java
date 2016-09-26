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

	
@Singleton
// @Lock(LockType.READ)
@Path("/room")

public class Rest_Room {

	@SuppressWarnings("unchecked")
	@Path("/obterRoom")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterRoom(@QueryParam("id") String idParam ) {
		ObjectId id = new ObjectId(idParam);
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("room");
			BasicDBObject setQuery = new BasicDBObject("_id", id);
			DBObject cursor = collection.findOne(setQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			obj.put("id", idParam);
			String idDorm = (String) obj.get("idDorm");
			String idUnit = (String) obj.get("idUnit");
			if (idDorm != null && !idDorm.equals("")){
				ObjectId objectIdDorm = new ObjectId(idDorm);
				Mongo mongoDorm = new Mongo();
				DB dbDorm = (DB) mongoDorm.getDB("documento");
				DBCollection collectionDorm = dbDorm.getCollection("dorm");
				BasicDBObject searchQueryDorm = new BasicDBObject("_id", objectIdDorm);
				DBObject cursorDorm = collectionDorm.findOne(searchQueryDorm);
				BasicDBObject objDorm = (BasicDBObject) cursorDorm.get("documento");
				obj.put("dormName", objDorm.get("name"));
				@SuppressWarnings("rawtypes")
				List<JSONObject> units = (List) objDorm.get("units");
				for(Object unit : units){
					if (idUnit.equals(((BasicBSONObject) unit).get("id"))){
						obj.put("unitName", ((BasicBSONObject) unit).get("name"));								
					}
				};
				mongoDorm.close();
			};
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
	public Response IncluirRoom(Room room	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("room");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(room);
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
	public Response AtualizarDocumento(Room doc) {
		String idString = doc.documento.id;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			ObjectId id = new ObjectId(idString);
			DBCollection collection = db.getCollection("room");
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
	public JSONArray ObterRooms(@QueryParam("idDorm") String idDorm) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("room");
			BasicDBObject setQuery = new BasicDBObject("documento.idDorm", idDorm);			
			DBCursor cursor = collection.find(setQuery);
			JSONArray documentos = new JSONArray();
			//
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objRoom = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objRoom.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("id", objRoom.getString("_id"));
					jsonDocumento.put("idDorm", jsonObject.get("idDorm"));
					jsonDocumento.put("idUnit", jsonObject.get("idUnit"));
					jsonDocumento.put("name", jsonObject.get("name"));
					jsonDocumento.put("type", jsonObject.get("type"));
					jsonDocumento.put("description", jsonObject.get("description"));
					jsonDocumento.put("keyDoor", jsonObject.get("keyDoor"));
					String idUnit = (String) jsonObject.get("idUnit");
					if (idDorm != null && !idDorm.equals("")){
						ObjectId objectIdDorm = new ObjectId(idDorm);
						Mongo mongoDorm = new Mongo();
						DB dbDorm = (DB) mongoDorm.getDB("documento");
						DBCollection collectionDorm = dbDorm.getCollection("dorm");
						BasicDBObject searchQueryDorm = new BasicDBObject("_id", objectIdDorm);
						DBObject cursorDorm = collectionDorm.findOne(searchQueryDorm);
						BasicDBObject objDorm = (BasicDBObject) cursorDorm.get("documento");
						jsonDocumento.put("dorm", objDorm.get("name"));
						@SuppressWarnings("rawtypes")
						List<JSONObject> units = (List) objDorm.get("units");
						for(Object unit : units){
							if (idUnit.equals(((BasicBSONObject) unit).get("id"))){
								jsonDocumento.put("unit", ((BasicBSONObject) unit).get("name"));								
							}
						};
						mongoDorm.close();
					};
					@SuppressWarnings("rawtypes")
					List<JSONObject> beds = (List) jsonObject.get("beds");
					ArrayList <JSONObject> bedsOut = new ArrayList(); 
					for(JSONObject bed : beds){
						System.out.println("idUser " + bed.get("idUser"));
						String idStudent = (String) bed.get("idUser");
						if (idStudent != null){
							ObjectId objectStudent = new ObjectId(idStudent);
							Mongo mongoStudent = new Mongo();
							DB dbDorm = (DB) mongoStudent.getDB("documento");
							DBCollection collectionStudent = dbDorm.getCollection("student");
							BasicDBObject searchQueryStudent = new BasicDBObject("_id", objectStudent);
							DBObject cursorStudent = collectionStudent.findOne(searchQueryStudent);
							BasicDBObject objStudent = (BasicDBObject) cursorStudent.get("documento");
							bed.put("lastName", objStudent.get("lastName"));
							bed.put("firstName", objStudent.get("firstName"));
							bed.put("email", objStudent.get("mail"));
						    Integer tripIndex = Integer.parseInt((String) objStudent.get("actualTrip"));
						    if (tripIndex != null){
								@SuppressWarnings("rawtypes")
								List trips = (List) objStudent.get("trips");
								BasicDBObject jsonTrip = (BasicDBObject) trips.get(tripIndex);
								bed.put("trip", jsonTrip);
						    };
						};
						bedsOut.add(bed);
					}
					jsonDocumento.put("beds", bedsOut);
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
};
