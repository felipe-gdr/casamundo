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
@Path("/pricetablecost")

public class Rest_PriceTableCost {

	@SuppressWarnings("unchecked")
	@Path("/obterPriceTableCost")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterPriceTableCost(@QueryParam("_id") String idParam, @QueryParam("idPriceTable") String idPriceTable, @QueryParam("idVendor") String idVendor) {
		ObjectId id = new ObjectId(idParam);
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("priceTableCost");
			BasicDBObject setQuery = new BasicDBObject();
			if (id != null){
		    	setQuery.put("_id", id);
			};
			if (idPriceTable != null){
		    	setQuery.put("documento.idPriceTable", idPriceTable);
			};
			if (idVendor != null){
		    	setQuery.put("documento.idVendor", idVendor);
			};
			DBObject cursor = collection.findOne(setQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
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
	public Response IncluirPriceTableCost(PriceTableCost priceTableCost	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("priceTableCost");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(priceTableCost);
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
	public Response AtualizarDocumento(PriceTableCost doc) throws MongoException, JsonParseException, JsonMappingException, IOException {
		String idString = doc.documento.id;
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		ObjectId id = new ObjectId(idString);
		DBCollection collection = db.getCollection("priceTableCost");
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
	public JSONArray ObterPriceTableCosts(@QueryParam("idPriceTable") String idPriceTable){

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("priceTableCost");
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
					jsonDocumento.put("idVendor", jsonObject.get("idVendor"));
					jsonDocumento.put("from", jsonObject.get("from"));
					jsonDocumento.put("to", jsonObject.get("to"));
					jsonDocumento.put("value", jsonObject.get("value"));
					jsonDocumento.put("nameVendor", "");
					String type = (String) jsonObject.get("type");
					System.out.println("fora eq -" + type);
					if (type.equals("family")){
						System.out.println("eh familia");
						String idFamily = (String) jsonObject.get("idVendor");
						if (idFamily != null && !idFamily.equals("")){
							ObjectId objectIdFamily = new ObjectId(idFamily);
							Mongo mongoFamily = new Mongo();
							DB dbFamily = (DB) mongoFamily.getDB("documento");
							DBCollection collectionFamily = dbFamily.getCollection("family");
							BasicDBObject searchQueryFamily = new BasicDBObject("_id", objectIdFamily);
							DBObject cursorFamily = collectionFamily.findOne(searchQueryFamily);
							System.out.println("tem id");
							if (cursorFamily != null){
								BasicDBObject obj = (BasicDBObject) cursorFamily.get("documento");
								jsonDocumento.put("nameVendor", obj.get("familyName"));
								System.out.println("tem dado");
							};
							mongoFamily.close();
						};
					};
					if (type.equals("pickup")){
						String idPickup = (String) jsonObject.get("idVendor");
						if (idPickup != null && !idPickup.equals("")){
							ObjectId objectIdPickup = new ObjectId(idPickup);
							Mongo mongoPickup = new Mongo();
							DB dbPickup = (DB) mongoPickup.getDB("documento");
							DBCollection collectionPickup = dbPickup.getCollection("pickup");
							BasicDBObject searchQueryPickup = new BasicDBObject("_id", objectIdPickup);
							DBObject cursorPickup = collectionPickup.findOne(searchQueryPickup);
							if (cursorPickup != null){
								BasicDBObject obj = (BasicDBObject) cursorPickup.get("documento");
								jsonDocumento.put("nameVendor", obj.get("name"));
							};
							mongoPickup.close();
						};
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