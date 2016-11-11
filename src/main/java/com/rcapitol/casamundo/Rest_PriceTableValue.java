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
@Path("/pricetablevalue")

public class Rest_PriceTableValue {

	@SuppressWarnings("unchecked")
	@Path("/obterPriceTableValue")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterPriceTableValue(@QueryParam("_id") String idParam, @QueryParam("idPriceTable") String idPriceTable, @QueryParam("agency") String agency, @QueryParam("family") String family, @QueryParam("city") String city ) throws UnknownHostException, MongoException {
		ObjectId id = new ObjectId(idParam);
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("priceTableValue");
		BasicDBObject setQuery = new BasicDBObject();
		if (id != null){
	    	setQuery.put("_id", id);
		};
		if (idPriceTable != null){
	    	setQuery.put("documento.idPriceTable", idPriceTable);
		};
		if (agency != null){
	    	setQuery.put("documento.agency", agency);
		};
		if (family != null){
	    	setQuery.put("documento.family", family);
		};
		if (city != null){
	    	setQuery.put("documento.city", city);
		};
		DBObject cursor = collection.findOne(setQuery);
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
	public Response IncluirPriceTableValue(PriceTableValue priceTableValue	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("priceTableValue");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(priceTableValue);
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
	public Response AtualizarDocumento(PriceTableValue doc) throws MongoException, JsonParseException, JsonMappingException, IOException {
		String idString = doc.documento.id;
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		ObjectId id = new ObjectId(idString);
		DBCollection collection = db.getCollection("priceTableValue");
		Gson gson = new Gson();
		String jsonDocumento = gson.toJson(doc);
		Map<String,String> mapJson = new HashMap<String,String>();
		ObjectMapper mapper = new ObjectMapper();
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
	};
	@SuppressWarnings("unchecked")
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterPriceTableValues(@QueryParam("idPriceTable") String idPriceTable) throws UnknownHostException, MongoException {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("priceTableValue");
			BasicDBObject setQuery = new BasicDBObject();
			if (idPriceTable != null){
		    	setQuery.put("documento.idPriceTable", idPriceTable);
			};			
			DBCursor cursor = collection.find(setQuery);
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objPriceValue = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objPriceValue.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("_id", objPriceValue.getString("_id"));
					jsonDocumento.put("type", jsonObject.get("type"));
					jsonDocumento.put("idPriceTable", jsonObject.get("idPriceTable"));
					jsonDocumento.put("agencyId", jsonObject.get("agency"));
					jsonDocumento.put("destination", jsonObject.get("destination"));
					jsonDocumento.put("from", jsonObject.get("from"));
					jsonDocumento.put("to", jsonObject.get("to"));
					jsonDocumento.put("gross", jsonObject.get("gross"));
					jsonDocumento.put("net", jsonObject.get("net"));
					String agencyId = (String) jsonObject.get("agency");
					if (agencyId != null && !agencyId.equals("")){
						ObjectId objectIdAgency = new ObjectId(agencyId);
						Mongo mongoAgency = new Mongo();
						DB dbAgency = (DB) mongoAgency.getDB("documento");
						DBCollection collectionAgency = dbAgency.getCollection("agency");
						BasicDBObject searchQueryAgency = new BasicDBObject("_id", objectIdAgency);
						DBObject cursorAgency = collectionAgency.findOne(searchQueryAgency);
						if (cursorAgency != null){
							BasicDBObject obj = (BasicDBObject) cursorAgency.get("documento");
							jsonDocumento.put("agency", obj.get("name"));
						}else{
							jsonDocumento.put("agency", "");
						};
						mongoAgency.close();
					};
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
