package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
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
						Mongo mongoValue;
						mongoValue = new Mongo();
						DB dbValue = (DB) mongoValue.getDB("documento");

						DBCollection collectionValue = dbValue.getCollection("priceTableValue");
						BasicDBObject setQuery = new BasicDBObject();
						if (agencyId != null && !destination.equals("null")){
					    	setQuery.put("documento.idPriceTable", objPriceTable.getString("_id"));
							setQuery.put("documento.agency", agencyId);
							setQuery.put("documento.destination", destination);
							DBCursor cursorValue = collectionValue.find(setQuery);
							while (((Iterator<DBObject>) cursorValue).hasNext()) {
								BasicDBObject objValue = (BasicDBObject) ((Iterator<DBObject>) cursorValue).next();
								String documentoValue = objValue.getString("documento");
								try {
									jsonObject = (JSONObject) parser.parse(documentoValue);
									if (verifyInterval (date, (String) jsonObject.get("from"), (String) jsonObject.get("to"))){
										jsonDocumento.put("gross", jsonObject.get("gross"));
										jsonDocumento.put("net", jsonObject.get("net"));
										findValue = true;
									};
								} catch (ParseException e) {
									e.printStackTrace();
								}
							};
						};
						if (!findValue && agencyId != null){
							setQuery = new BasicDBObject();
					    	setQuery.put("documento.idPriceTable", objPriceTable.getString("_id"));
							setQuery.put("documento.agency", agencyId);
							setQuery.put("documento.destination", "");
							DBCursor cursorValue = collectionValue.find(setQuery);
							while (((Iterator<DBObject>) cursorValue).hasNext()) {
								BasicDBObject objValue = (BasicDBObject) ((Iterator<DBObject>) cursorValue).next();
								String documentoValue = objValue.getString("documento");
								try {
									jsonObject = (JSONObject) parser.parse(documentoValue);
									if (verifyInterval (date, (String) jsonObject.get("from"), (String) jsonObject.get("to"))){
										jsonDocumento.put("gross", jsonObject.get("gross"));
										jsonDocumento.put("net", jsonObject.get("net"));
										findValue = true;
									};
								} catch (ParseException e) {
									e.printStackTrace();
								}
							};
							
						}
						if (!findValue && !destination.equals("null")){
							setQuery = new BasicDBObject();
					    	setQuery.put("documento.idPriceTable", objPriceTable.getString("_id"));
							setQuery.put("documento.destination", destination);
							setQuery.put("documento.agency", "");
							DBCursor cursorValue = collectionValue.find(setQuery);
							while (((Iterator<DBObject>) cursorValue).hasNext()) {
								BasicDBObject objValue = (BasicDBObject) ((Iterator<DBObject>) cursorValue).next();
								String documentoValue = objValue.getString("documento");
								try {
									jsonObject = (JSONObject) parser.parse(documentoValue);
									if (verifyInterval (date, (String) jsonObject.get("from"), (String) jsonObject.get("to"))){
										jsonDocumento.put("gross", jsonObject.get("gross"));
										jsonDocumento.put("net", jsonObject.get("net"));
										findValue = true;
									};
								} catch (ParseException e) {
									e.printStackTrace();
								}
							};
							
						}
						if (!findValue){
							setQuery = new BasicDBObject();
					    	setQuery.put("documento.idPriceTable", objPriceTable.getString("_id"));
							setQuery.put("documento.destination", "");
							setQuery.put("documento.agency", "");
							DBCursor cursorValue = collectionValue.find(setQuery);
							while (((Iterator<DBObject>) cursorValue).hasNext()) {
								BasicDBObject objValue = (BasicDBObject) ((Iterator<DBObject>) cursorValue).next();
								String documentoValue = objValue.getString("documento");
								try {
									jsonObject = (JSONObject) parser.parse(documentoValue);
									if (verifyInterval (date, (String) jsonObject.get("from"), (String) jsonObject.get("to"))){
										jsonDocumento.put("gross", jsonObject.get("gross"));
										jsonDocumento.put("net", jsonObject.get("net"));
										findValue = true;
									};
								} catch (ParseException e) {
									e.printStackTrace();
								}
							};
							
						}
						mongoValue.close();
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
	
	public Boolean verifyInterval (String date, String initInterval, String endInterval){
	
		DateFormat df = new SimpleDateFormat ("dd/MM/yyyy");
		try {
			if (initInterval != null && endInterval != null){
				Date d1 = df.parse (convertDateMes (date));
				Date d2 = df.parse (convertDateMes (initInterval));
				Date d3 = df.parse (convertDateMes (endInterval));
				long d1_time = d1.getTime();
				long d2_time = d2.getTime();
				long d3_time = d3.getTime();
				if (d1_time >= d2_time && d1_time <=d3_time){
					return true;
				}
			};
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return false;
	};

	public String convertDateMes (String strDate){
		String mesNumber = "01";
		String mesAlpha = strDate.substring	(2, 5);
	    if (mesAlpha.equals("Jan")){
	    	mesNumber = "01";
	    };
	    if (mesAlpha.equals("Feb")){
	    	mesNumber = "02";
	    };
	    if (mesAlpha.equals("Mar")){
	    	mesNumber = "03";
	    };
	    if (mesAlpha.equals("Apr")){
	    	mesNumber = "04";
	    };
	    if (mesAlpha.equals("May")){
	    	mesNumber = "05";
	    };
	    if (mesAlpha.equals("Jun")){
	    	mesNumber = "06";
	    };
	    if (mesAlpha.equals("Jul")){
	    	mesNumber = "07";
	    };
	    if (mesAlpha.equals("Aug")){
	    	mesNumber = "08";
	    };
	    if (mesAlpha.equals("Sep")){
	    	mesNumber = "09";
	    };
	    if (mesAlpha.equals("Out")){
	    	mesNumber = "10";
	    };
	    if (mesAlpha.equals("Nov")){
	    	mesNumber = "11";
	    };
	    if (mesAlpha.equals("Dec")){
	    	mesNumber = "12";
	    };
		return strDate.substring(0, 2) + "/" + mesNumber + "/" + strDate.substring(5, 9);
	};

}
