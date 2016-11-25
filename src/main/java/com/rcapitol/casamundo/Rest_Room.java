package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
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
				BasicDBObject objAddress = (BasicDBObject) objDorm.get("address");
				obj.put("destination", objAddress.get("destination"));
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
			ObjectId id = (ObjectId)insert.get( "_id" );
			String idString = id.toString();
			BasicDBObject objUpdate = new BasicDBObject();
			objUpdate.put("documento.id", idString);
			BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
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
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterRooms(@QueryParam("idDorm") String idDorm, @QueryParam("destination") String destination) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			
			DBCollection collection = db.getCollection("room");
			BasicDBObject setQuery = new BasicDBObject();
			if (idDorm != null && !idDorm.equals("null")){
				setQuery.put("documento.idDorm", idDorm);
			};
			if (destination != null && !destination.equals("all") ){
				setQuery.put("documento.address.destination", destination);
			};

			BasicDBObject setSort = new BasicDBObject();
			setSort.put("documento.dormName", 1);

			DBCursor cursor = collection.find(setQuery).sort(setSort);;
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
						List<JSONObject> units = (List) objDorm.get("units");
						for(Object unit : units){
							if (idUnit.equals(((BasicBSONObject) unit).get("id"))){
								jsonDocumento.put("unit", ((BasicBSONObject) unit).get("name"));								
							}
						};
						mongoDorm.close();
					};
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
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/lista/beds")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterBeds(@QueryParam("destination") String destination) {
		Commons commons = new Commons();
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("room");
			BasicDBObject setQuery = new BasicDBObject();
			if (destination != null && !destination.equals("all") ){
				setQuery.put("documento.destination", destination);
			};

			BasicDBObject setSort = new BasicDBObject();
			setSort.put("documento.dormName", 1);

			DBCursor cursor = collection.find(setQuery).sort(setSort);;
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
					String idDorm = (String) jsonObject.get("idDorm");
					if (idDorm != null && !idDorm.equals("")){
						ObjectId objectIdDorm = new ObjectId(idDorm);
						Mongo mongoDorm = new Mongo();
						DB dbDorm = (DB) mongoDorm.getDB("documento");
						DBCollection collectionDorm = dbDorm.getCollection("dorm");
						BasicDBObject searchQueryDorm = new BasicDBObject("_id", objectIdDorm);
						DBObject cursorDorm = collectionDorm.findOne(searchQueryDorm);
						BasicDBObject objDorm = (BasicDBObject) cursorDorm.get("documento");
						jsonDocumento.put("dorm", objDorm.get("name"));
						List<JSONObject> units = (List) objDorm.get("units");
						for(Object unit : units){
							if (idUnit.equals(((BasicBSONObject) unit).get("id"))){
								jsonDocumento.put("unit", ((BasicBSONObject) unit).get("name"));								
							}
						};
						mongoDorm.close();
					};
					List<JSONObject> beds = (List) jsonObject.get("beds");
					for(JSONObject bed : beds){
						JSONObject jsonBed = new JSONObject();
						jsonBed.putAll(jsonDocumento);
						List<JSONObject> occupancies = (List) bed.get("occupancies");
						List<JSONObject> occupanciesOut =  new ArrayList(); 
						if (occupancies != null){
							for(JSONObject occupancy : occupancies){
								String idStudent = (String) occupancy.get("idStudent");
								String actualTrip = (String) occupancy.get("actualTrip");
							    Integer actualTripInt = Integer.parseInt((String) occupancy.get("actualTrip"));
								if (idStudent != null){
									ObjectId objectStudent = new ObjectId(idStudent);
									Mongo mongoStudent = new Mongo();
									DB dbDorm = (DB) mongoStudent.getDB("documento");
									DBCollection collectionStudent = dbDorm.getCollection("student");
									BasicDBObject searchQueryStudent = new BasicDBObject("_id", objectStudent);
									DBObject cursorStudent = collectionStudent.findOne(searchQueryStudent);
									if (cursorStudent != null){
										BasicDBObject objStudent = (BasicDBObject) cursorStudent.get("documento");
										occupancy.put("student", objStudent);
										List trips = (List) objStudent.get("trips");
										BasicDBObject jsonTrip = (BasicDBObject) trips.get(actualTripInt);
										occupancy.put("student_occupancies", carregaAlocacoes(idStudent,actualTrip, (String) occupancy.get("startOccupancy"),(String) occupancy.get("endOccupancy")));
										int days = commons.difDate ((String) jsonTrip.get("start"),(String) jsonTrip.get("end"));
										occupancy.put("student_daysTrip", String.valueOf(days));
									};
								};
								occupanciesOut.add(occupancy);
							};
							bed.put("occupancies", occupanciesOut);
						};
						jsonBed.put("bed", bed);
						documentos.add(jsonBed);
					}
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
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private JSONArray carregaAlocacoes(String idStudent, String actualTrip, String startOccupancy, String endOccupancy) {
		Commons commons = new Commons();
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("room");
			BasicDBObject setQuery = new BasicDBObject();
			if (idStudent != null){
				setQuery.put("documento.beds.occupancies.idStudent", idStudent);
			};
			if (actualTrip != null){
				setQuery.put("documento.beds.occupancies.actualTrip", actualTrip);
			};

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
					List<JSONObject> beds = (List) jsonObject.get("beds");
					for(JSONObject bed : beds){
						JSONObject jsonOccupancy = new JSONObject();
						List<JSONObject> occupancies = (List) bed.get("occupancies");
						if (occupancies != null){
							for(JSONObject occupancy : occupancies){
								String idStudentOccupancy = (String) occupancy.get("idStudent");
								String actualTripOccupancy = (String) occupancy.get("actualTrip");
								if (idStudentOccupancy.equals(idStudent) &&	actualTripOccupancy.equals(actualTrip)) {
									if (startOccupancy.equals((String)occupancy.get("startOccupancy")) && endOccupancy.equals((String)occupancy.get("endOccupancy"))){
									}else{
										jsonOccupancy.put("occupancy", occupancy);
										int days = commons.difDate ((String)occupancy.get("startOccupancy"),(String)occupancy.get("endOccupancy"));
										jsonOccupancy.put("usedDays", String.valueOf(days));
										documentos.add(jsonOccupancy);
									};
								};
							};
						};
					};
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
