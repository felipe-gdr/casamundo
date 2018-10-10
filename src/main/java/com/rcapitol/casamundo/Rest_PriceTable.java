package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
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
@Path("/pricetable")

public class Rest_PriceTable {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings("unchecked")
	@Path("/obterPriceTable")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterPriceTable(@QueryParam("id") String idParam ) {
		ObjectId id = new ObjectId(idParam);
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("priceTable");
			BasicDBObject setQuery = new BasicDBObject("_id", id);
			DBObject cursor = collection.findOne(setQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			ObjectId priceTableIdObject = (ObjectId) cursor.get("_id");
			String priceTableId = priceTableIdObject.toString();
			documento.put("_id", priceTableId);
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
	public Response IncluirPriceTable(PriceTable priceTable	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("priceTable");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(priceTable);
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
	public Response AtualizarDocumento(PriceTable doc) {
		String idString = doc.documento.id;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			ObjectId id = new ObjectId(idString);
			DBCollection collection = db.getCollection("priceTable");
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
	public JSONArray ObterPriceTables(@QueryParam("date") String date, @QueryParam("destination") String destination, @QueryParam("agency") String agency ) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("priceTable");
			
			DBCursor cursor = collection.find();
			JSONArray documentos = new JSONArray();
			//
			// 			tirar este acesso quando mudar o agency para Id no estudante
			//
			String agencyId = null;
			if (!agency.equals("null")){
				Mongo mongoAgency = new Mongo();
				DB dbAgency = (DB) mongoAgency.getDB("documento");
				DBCollection collectionAgency = dbAgency.getCollection("agency");
				BasicDBObject searchQueryAgency = new BasicDBObject("documento.name", agency);
				DBObject cursorAgency = collectionAgency.findOne(searchQueryAgency);
				if (cursorAgency.get("_id") != null){
					ObjectId agencyObject = (ObjectId) cursorAgency.get("_id");
					agencyId = agencyObject.toString();
				};
				mongoAgency.close();
			};
			//
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objPriceTable = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objPriceTable.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("id", "");
					jsonDocumento.put("name", "");
					jsonDocumento.put("description", "");
					jsonDocumento.put("vendorType", "");
					jsonDocumento.put("valid", "");
					jsonDocumento.put("gross", "");
					jsonDocumento.put("net", "");
					if (objPriceTable.getString("_id") != null){
						jsonDocumento.put("id", objPriceTable.getString("_id"));
					};
					if (jsonObject.get("name") != null){
						jsonDocumento.put("name", jsonObject.get("name"));
					};
					if (jsonObject.get("description") != null){
						jsonDocumento.put("description", jsonObject.get("description"));
					};
					if (jsonObject.get("vendorType") != null){
						jsonDocumento.put("vendorType", jsonObject.get("vendorType"));
					};
					if (jsonObject.get("valid") != null){
						jsonDocumento.put("valid", jsonObject.get("valid"));
					};
					if (!date.equals("null")){
						Boolean findValue = false;
						if (agencyId != null && !destination.equals("null")){
							String idPriceTable = objPriceTable.getString("_id");
							JSONObject jsonValue = searchValue (agencyId, destination, idPriceTable, date);
							if (jsonValue != null){
								if ((Boolean) jsonValue.get("findValue")){
									jsonDocumento.put("gross", jsonValue.get("gross"));
									jsonDocumento.put("net", jsonValue.get("net"));
									findValue = true;
								};
							};
						};
						if (!findValue && agencyId != null){
							String idPriceTable = objPriceTable.getString("_id");
							JSONObject jsonValue = searchValue (agencyId, "", idPriceTable, date);
							if (jsonValue != null){
								if ((Boolean) jsonValue.get("findValue")){
									jsonDocumento.put("gross", jsonValue.get("gross"));
									jsonDocumento.put("net", jsonValue.get("net"));
									findValue = true;
								};
							};							
						};
						if (!findValue && !destination.equals("null")){
							String idPriceTable = objPriceTable.getString("_id");
							JSONObject jsonValue = searchValue ("", destination, idPriceTable, date);
							if (jsonValue != null){
								if ((Boolean) jsonValue.get("findValue")){
									jsonDocumento.put("gross", jsonValue.get("gross"));
									jsonDocumento.put("net", jsonValue.get("net"));
									findValue = true;
								};
							};
						};
						if (!findValue){
							String idPriceTable = objPriceTable.getString("_id");
							JSONObject jsonValue = searchValue ("", "", idPriceTable, date);
							if (jsonValue != null){
								if ((Boolean) jsonValue.get("findValue")){
									jsonDocumento.put("gross", jsonValue.get("gross"));
									jsonDocumento.put("net", jsonValue.get("net"));
									findValue = true;
								};
							};
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

	@SuppressWarnings({ "unchecked"})
	public JSONObject searchValue (String travelId,String productId, String date, String userId){

		JSONObject jsonObject = new JSONObject();
		JSONObject jsonValue = new JSONObject();
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		String destination =  (String) travel.get("destinatio");
		String agencyId  = (String) travel.get("agencyId");
		
		BasicDBObject setQuery = new BasicDBObject();
		JSONParser parser = new JSONParser(); 
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
		setQuery.put("documento.destination", destination);
		setQuery.put("documento.agency", agencyId);
		Response response = commons_db.listaCrud("priceTableValue", null, null, userId, setQuery);

		ArrayList<Object> pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getEntity();

		for (int i = 0; i < pricesList.size(); i++) {
			BasicDBObject priceList = new BasicDBObject();
			priceList.putAll((Map) pricesList.get(i));
			BasicDBObject doc = (BasicDBObject) priceList.get("documento");
			String bookType = doc.getString("accControl");
			if (bookType.equals("homestay")){
				response =  commons_db.listaCrud("homestayBook", "documento.studentId", travelId, userId, null);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getEntity();
				for (int j = 0; j < allocations.size(); j++) {
					BasicDBObject allocation = new BasicDBObject();
					allocation.putAll((Map) allocations.get(j));
//					allocationsHomeStay.add(allocation);
				};
			}
		}
/*				while (((Iterator<DBObject>) cursorValue).hasNext()) {
					BasicDBObject objValue = (BasicDBObject) ((Iterator<DBObject>) cursorValue).next();
					String documentoValue = objValue.getString("documento");
					try {
						Commons commons = new Commons();
						jsonObject = (JSONObject) parser.parse(documentoValue);
						if (commons.verifyInterval (date, (String) jsonObject.get("from"), (String) jsonObject.get("to"))){
							jsonValue.put("gross", jsonObject.get("gross"));
							jsonValue.put("net", jsonObject.get("net"));
							jsonValue.put("findValue", true);
							return jsonValue;
						};
				};
*/		return null;
	};

}
