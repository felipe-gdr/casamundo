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
@Path("/invoice")

public class Rest_Invoice {

	@SuppressWarnings("unchecked")
	@Path("/obterInvoice")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterInvoice(@QueryParam("id") String idParam, @QueryParam("cost") String cost ) {
		ObjectId id = new ObjectId(idParam);
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("invoice");
			BasicDBObject setQuery = new BasicDBObject("_id", id);
			DBObject cursor = collection.findOne(setQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			obj.put("id", idParam);
			documento.put("documento", obj);
						
			//
			//** ler student
			//
			String idstudentString = obj.getString("idStudent");
			ObjectId studentId = new ObjectId(idstudentString);
			Mongo mongoStudent = new Mongo();
			DB dbStudent = (DB) mongoStudent.getDB("documento");
			DBCollection collectionStudent = dbStudent.getCollection("student");
			BasicDBObject searchQueryStudent = new BasicDBObject("_id", studentId);
			DBObject cursorStudent = collectionStudent.findOne(searchQueryStudent);
			BasicDBObject objStudent = (BasicDBObject) cursorStudent.get("documento");
			objStudent.put("id", idstudentString);
			mongoStudent.close();
			documento.put("student", objStudent);
			
			//
			// *** ler custos
			//
			
			if (cost != null){
				documento.put("cost", searchCost(obj, objStudent));				
			};
			mongo.close();
			return documento;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};
	@SuppressWarnings({ "unchecked", "unused" })
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluirInvoice(Invoice invoice	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("invoice");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(invoice);
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
			objUpdate.put("documento.number", numberInvoice());
			BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
			BasicDBObject setQuery = new BasicDBObject("_id", id);
			DBObject cursor = collection.findAndModify(setQuery,
	                null,
	                null,
	                false,
	                update,
	                true,
	                false);
			criarCosts(id, null, null);
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
	public Response AtualizarDocumento(Invoice doc) {
		String idString = doc.documento.id;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			ObjectId id = new ObjectId(idString);
			DBCollection collection = db.getCollection("invoice");
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
				criarCosts(id, null, null);
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
	public JSONArray ObterInvoices(@QueryParam("destination") String destination, @QueryParam("filters") String filters) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("invoice");

			BasicDBObject setQuery = new BasicDBObject();
			if(!destination.equals("all")){
		    	setQuery.put("documento.destination", destination);
		    };
			
			DBCursor cursor = collection.find(setQuery);
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objInvoice = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objInvoice.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("id", objInvoice.getString("_id"));
					jsonDocumento.put("idStudent", jsonObject.get("idStudent"));
					jsonDocumento.put("actualTrip", jsonObject.get("actualTrip"));
					jsonDocumento.put("status", jsonObject.get("status"));
					jsonDocumento.put("destination", jsonObject.get("destination"));
					jsonDocumento.put("number", jsonObject.get("number"));
					jsonDocumento.put("dueDate", jsonObject.get("dueDate"));
					jsonDocumento.put("amountNet", jsonObject.get("amountNet"));
					jsonDocumento.put("amountGross", jsonObject.get("amountGross"));
					jsonDocumento.put("itensNet", jsonObject.get("itensNet"));
					jsonDocumento.put("itensGross", jsonObject.get("itensGross"));
					jsonDocumento.put("notes", jsonObject.get("notes"));
					//
					//** ler student
					//
					String idStudentString = (String) jsonObject.get("idStudent");
					ObjectId studentId = new ObjectId(idStudentString);
					Mongo mongoStudent = new Mongo();
					DB dbStudent = (DB) mongoStudent.getDB("documento");
					DBCollection collectionStudent = dbStudent.getCollection("student");
					BasicDBObject searchQueryStudent = new BasicDBObject("_id", studentId);
					DBObject cursorStudent = collectionStudent.findOne(searchQueryStudent);
					BasicDBObject objStudent = (BasicDBObject) cursorStudent.get("documento");
					mongoStudent.close();

				    Integer tripIndex = Integer.parseInt((String) jsonObject.get("actualTrip"));
					String agencySigla = null;
				    String agencyName = null;
				    if (tripIndex != null){
						List<?> trips = (List<?>) objStudent.get("trips");
						BasicDBObject jsonTrip = (BasicDBObject) trips.get(tripIndex);
						jsonDocumento.put("trip", jsonTrip);
						agencyName = (String) jsonTrip.get("agencyName");
				    };
					if (agencyName != null && !agencyName.equals("")){
						Mongo mongoAgency = new Mongo();
						DB dbAgency = (DB) mongoAgency.getDB("documento");
						DBCollection collectionAgency = dbAgency.getCollection("agency");
						BasicDBObject searchQueryAgency = new BasicDBObject("documento.name", agencyName);
						DBObject cursorAgency = collectionAgency.findOne(searchQueryAgency);
						BasicDBObject obj = (BasicDBObject) cursorAgency.get("documento");
						agencySigla = (String) obj.get("agencySigla");
						jsonDocumento.put("agencyName", agencyName);
						jsonDocumento.put("agencySigla", agencySigla);
						mongoAgency.close();
					}else{
						jsonDocumento.put("agencyName", "");
						jsonDocumento.put("agencySigla", "");
					};

					jsonDocumento.put("student", objStudent);

					Boolean filter_ok = checkFilters (filters, jsonDocumento, agencySigla, null);
					if (filter_ok){
						documentos.add(jsonDocumento);
					};
					mongo.close();
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
	
	public Boolean checkFilters (String filters, JSONObject objJson, String agencySigla, String schoolSigla){
		BasicDBObject jsonTrip =  (BasicDBObject) objJson.get("trip");
		Boolean response = true;
		String array[] = new String[24];
		array = filters.split(",");
		BasicDBObject objStudent = (BasicDBObject) objJson.get("student");
		Commons commons = new Commons();
		int i = 0;
		while (i < array.length) {
			String element[] = new String[2];
			element = array[i].split (":");
			if (element.length > 1){
			    if (element[0].equals("filter_student")){
					if (((String) objStudent.get("firstName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						if (((String) objStudent.get("lastName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
					};
			    };
			    if (element[0].equals("filter_destination")){
					if (((String) objJson.get("destination")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_check_in")){
					if (commons.convertToCalendar((String)jsonTrip.get("start")).before(commons.convertToCalendar(element[1].replace("-", ""))) ){
						response = false;
					};
			    };
			    if (element[0].equals("filter_check_out")){
					if (commons.convertToCalendar((String)jsonTrip.get("start")).after(commons.convertToCalendar(element[1].replace("-", ""))) ){
						response = false;
					};
			    };
			    if (element[0].equals("filter_due_date_from")){
					if (commons.convertToCalendar((String)objJson.get("dueDate")).before(commons.convertToCalendar(element[1].replace("-", ""))) ){
						response = false;
					};
			    };
			    if (element[0].equals("filter_due_date_to")){
					if (commons.convertToCalendar((String)objJson.get("dueDate")).after(commons.convertToCalendar(element[1].replace("-", ""))) ){
						response = false;
					};
			    };
			    if (element[0].equals("filter_status")){
			    	if (element[1].toLowerCase().equals("overdue")){
						if (commons.convertToCalendar((String)objJson.get("dueDate")).before(commons.currentTime())){
							response = false;
						};			    		
			    	}else{
						if (((String) objJson.get("status")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
			    	};
			    };
			    if (element[0].equals("filter_agent")){
					if (agencySigla.toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_private_wc")){
					if (((String) jsonTrip.get("privateWashroom")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			};
			++i;
		};
		return response;
	};

	@SuppressWarnings({"rawtypes", "unchecked" })
	public JSONArray searchCost (BasicDBObject objInvoice, BasicDBObject objStudent){
	    Integer tripIndex = Integer.parseInt((String) objInvoice.get("actualTrip"));
	    String date = null;
    	String idFamily = null;
    	String idVendor = null;
    	String destination = null;
	    if (tripIndex != null){
			List trips = (List) objStudent.get("trips");
			BasicDBObject jsonTrip =  (BasicDBObject) trips.get(tripIndex);
			date = (String) jsonTrip.get("start");
			idFamily = (String) jsonTrip.get("idFamily");
			destination = (String) jsonTrip.get("destination");
	    };
		List listItens = (List) objInvoice.get("itensNet");
		JSONArray arrayCost = new JSONArray();
		int w = 0;
		while (w < listItens.size()) {
			BasicDBObject itemInvoice = (BasicDBObject) listItens.get(w);
			JSONObject itemCost = new JSONObject();
			itemCost.put("idInvoice", objInvoice.get("id"));
			itemCost.put("invoiceNumber", objInvoice.get("number"));
			itemCost.put("idStudent", objStudent.get("id"));
			itemCost.put("actualTrip", objInvoice.get("actualTrip"));
			itemCost.put("destination", destination);
			itemCost.put("item", itemInvoice.get("item"));
			itemCost.put("amount", itemInvoice.get("amount"));
			itemCost.put("description", itemInvoice.get("description"));
			String value = null;
			String type = null;
			if (!date.equals("null")){
				JSONObject jsonCost = new JSONObject();
				String idPriceTable = (String) itemInvoice.get("item");
				if (idFamily != null && !destination.equals("null")){
					jsonCost = searchCostValue (idFamily, destination, idPriceTable, date);
					value = (String) jsonCost.get("value");
					type = (String) jsonCost.get("type");
					idVendor = idFamily;
				};
				if (value == null && idFamily != null){
					jsonCost = searchCostValue (idFamily, "", idPriceTable, date);
					value = (String) jsonCost.get("value");
					type = (String) jsonCost.get("type");
					idVendor = idFamily;
				};
				if (value == null ){
			    	ArrayList arrayListVendors = new ArrayList(); 
			    	arrayListVendors = (ArrayList) objStudent.get("vendors");
			    	if (arrayListVendors != null){
				    	Object arrayVendors[] = arrayListVendors.toArray(); 
						int z = 0;
						while (z < arrayVendors.length | value != null) {
							idVendor = (String) arrayVendors[z];
							jsonCost = searchCostValue (idVendor, destination, idPriceTable, date);
							value = (String) jsonCost.get("value");
							type = (String) jsonCost.get("type");
							if (value == null){
								jsonCost = searchCostValue (idVendor, "", idPriceTable, date);
								value = (String) jsonCost.get("value");
								type = (String) jsonCost.get("type");
							};
							++z;
						};
			    	};
				};
				if (value == null && !destination.equals("null")){
					jsonCost = searchCostValue ("", destination, idPriceTable, date);						
					value = (String) jsonCost.get("value");
					type = (String) jsonCost.get("type");
				};
				if (value == null){
					jsonCost = searchCostValue ("", "", idPriceTable, date);
					value = (String) jsonCost.get("value");
					type = (String) jsonCost.get("type");
				};
				if (value != null){
					itemCost.put("value", value);
					itemCost.put("idVendor", idVendor);
					itemCost.put("type", type);
				}else{
					itemCost.put("value", "");
					itemCost.put("idVendor", "");
					itemCost.put("type", "");
				};
		    };
			if (value != null){
				arrayCost.add(itemCost);
			};
			++w;
		};
		return arrayCost;
	
	};

	@SuppressWarnings("unchecked")
	public JSONObject searchCostValue (String idVendor, String destination, String id, String date){

		JSONObject jsonObject = new JSONObject();
		JSONObject jsonCost = new JSONObject();
		Mongo mongoCost;
		try {
			mongoCost = new Mongo();
			DB dbCost = (DB) mongoCost.getDB("documento");
			DBCollection collectionCost = dbCost.getCollection("priceTableCost");
			BasicDBObject setQuery = new BasicDBObject();
			JSONParser parser = new JSONParser(); 
	    	setQuery.put("documento.idPriceTable", id);
			setQuery.put("documento.idVendor", idVendor);
//				setQuery.put("documento.destination", destination);
			DBCursor cursorCost = collectionCost.find(setQuery);
			while (((Iterator<DBObject>) cursorCost).hasNext()) {
				BasicDBObject objCost = (BasicDBObject) ((Iterator<DBObject>) cursorCost).next();
				String documentoCost = objCost.getString("documento");
				try {
					Commons commons = new Commons();
					jsonObject = (JSONObject) parser.parse(documentoCost);
					if (commons.verifyInterval (date, (String) jsonObject.get("from"), (String) jsonObject.get("to"))){
						mongoCost.close();
						jsonCost.put("value", jsonObject.get("value"));
						jsonCost.put("type", jsonObject.get("type"));
						jsonCost.put("findValue", true);
						return jsonCost;
					};
				} catch (ParseException e) {
					e.printStackTrace();
				}
			};
			mongoCost.close();
			jsonCost.put("value", null);
			jsonCost.put("type", null);
			jsonCost.put("findValue", null);
			return jsonCost;
		} catch (UnknownHostException e1) {
			e1.printStackTrace();
		} catch (MongoException e1) {
			e1.printStackTrace();
		}
		jsonCost.put("value", null);
		jsonCost.put("type", null);
		jsonCost.put("findValue", null);
		return jsonCost;
	};
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void criarCosts(ObjectId id, String actualTrip, ObjectId idStudent) {
		Commons commons = new Commons();
		Rest_Payment payment = new Rest_Payment();
		
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("invoice");
			BasicDBObject setQuery = new BasicDBObject();
			if (id != null){
				setQuery = new BasicDBObject("_id", id);
			};
			if (actualTrip != null){
				setQuery = new BasicDBObject("actualTrip", actualTrip);
			};
			if (idStudent != null){
				setQuery = new BasicDBObject("idStudent", idStudent);
			};
			DBObject cursor = collection.findOne(setQuery);
			BasicDBObject objInvoice = (BasicDBObject) cursor.get("documento");
			ObjectId idInvoice = (ObjectId) cursor.get("_id");
			String idInvoiceString = idInvoice.toString();
			//
			//** deletar payments da invoice
			//
			Mongo mongoPayment;
			mongoPayment = new Mongo();
			DB dbPayment = (DB) mongoPayment.getDB("documento");
			DBCollection collectionPayment = dbPayment.getCollection("payment");
			BasicDBObject queryDelete = new BasicDBObject();
			queryDelete.put("documento.idInvoice", idInvoiceString);
			collectionPayment.remove(queryDelete);
			//** ler student
			//
			String idstudentString = objInvoice.getString("idStudent");
			ObjectId studentId = new ObjectId(idstudentString);
			Mongo mongoStudent = new Mongo();
			DB dbStudent = (DB) mongoStudent.getDB("documento");
			DBCollection collectionStudent = dbStudent.getCollection("student");
			BasicDBObject searchQueryStudent = new BasicDBObject("_id", studentId);
			DBObject cursorStudent = collectionStudent.findOne(searchQueryStudent);
			BasicDBObject objStudent = (BasicDBObject) cursorStudent.get("documento");
			mongoStudent.close();
			List listItens = (List) objInvoice.get("itensNet");
			while (listItens.size() != 0) {
				JSONObject itemCost = new JSONObject();
				BasicDBObject itemInvoice = (BasicDBObject) listItens.get(0);
			    JSONObject dadosCost = obterDadosCosts (itemCost, objStudent, objInvoice, itemInvoice);
				itemCost.put("id", "1");
				itemCost.put("idStudent", idstudentString);
				itemCost.put("idInvoice", idInvoiceString);
				itemCost.put("invoiceNumber", objInvoice.get("number"));
				itemCost.put("actualTrip", objInvoice.get("actualTrip"));
				itemCost.put("status", "unpaid");
				itemCost.put("number", payment.numberPayment());
				if (dadosCost.get("date") != null){
					itemCost.put("dueDate", commons.calcNewDate((String) dadosCost.get("date"), 6));
				};
				itemCost.put("destination", dadosCost.get("destination"));
				JSONArray installments = new JSONArray();
				JSONArray itens = new JSONArray();
				JSONArray notes = new JSONArray();
				String typeItem = (String) dadosCost.get("type");
				int w = 0;
				double valueNumber = 0;
				Double amountValue = 0.00;
				while (w < listItens.size()) {
					itemInvoice = (BasicDBObject) listItens.get(w);
					dadosCost = obterDadosCosts (itemCost, objStudent, objInvoice, itemInvoice);
					if (typeItem.equals(dadosCost.get("type"))){
						JSONObject item = new JSONObject();
						item.put("item", itemInvoice.get("item"));
						item.put("amount", itemInvoice.get("amount"));
						double amount = Double.parseDouble((String) itemInvoice.get("amount"));
						item.put("description", itemInvoice.get("description"));
						if (dadosCost.get("value") != null){
							item.put("value", dadosCost.get("value"));
							itens.add(item);
							String value = (String) dadosCost.get("value");							
							valueNumber = Double.parseDouble(value);
							amountValue = amountValue + amount * valueNumber;
						};
						listItens.remove(w);
						--w;
					};
					++w;
				};
				if (amountValue != 0.00){
					itemCost.put("amount", amountValue);
					itemCost.put("installments", installments);
					itemCost.put("itens", itens);
					itemCost.put("notes", notes);
					//
					// ** incluir novo custo
					//
					BasicDBObject documento = new BasicDBObject();
					documento.put("documento", itemCost);
					DBObject insert = new BasicDBObject(documento);
					collectionPayment.insert(insert);
				};
			};
			mongoPayment.close();
			mongo.close();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		};
	};

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject obterDadosCosts(JSONObject itemCost, BasicDBObject objStudent, BasicDBObject objInvoice, BasicDBObject itemInvoice) {

	    Integer tripIndex = Integer.parseInt((String) objInvoice.get("actualTrip"));
		String date = null;
    	String idFamily = null;
    	String idVendor = null;
    	String destination = null;
	    if (tripIndex != null){
			List trips = (List) objStudent.get("trips");
			BasicDBObject jsonTrip =  (BasicDBObject) trips.get(tripIndex);
			date = (String) jsonTrip.get("start");
			idFamily = (String) jsonTrip.get("idFamily");
			destination = (String) jsonTrip.get("destination");
	    };
		String value = null;
		String type = null;
		//
		//** get value
		//
		JSONObject jsonCost = new JSONObject();
		String idPriceTable = (String) itemInvoice.get("item");
		if (idFamily != null && !destination.equals("null")){
			jsonCost = searchCostValue (idFamily, destination, idPriceTable, date);
			value = (String) jsonCost.get("value");
			type = (String) jsonCost.get("type");
			idVendor = idFamily;
		};
		if (value == null && idFamily != null){
			jsonCost = searchCostValue (idFamily, "", idPriceTable, date);
			value = (String) jsonCost.get("value");
			type = (String) jsonCost.get("type");
			idVendor = idFamily;
		};
		if (value == null ){
	    	ArrayList arrayListVendors = new ArrayList(); 
	    	arrayListVendors = (ArrayList) objStudent.get("vendors");
	    	if (arrayListVendors != null){
		    	Object arrayVendors[] = arrayListVendors.toArray(); 
				int z = 0;
				while (z < arrayVendors.length | value != null) {
					idVendor = (String) arrayVendors[z];
					jsonCost = searchCostValue (idVendor, destination, idPriceTable, date);
					value = (String) jsonCost.get("value");
					type = (String) jsonCost.get("type");
					if (value == null){
						jsonCost = searchCostValue (idVendor, "", idPriceTable, date);
						value = (String) jsonCost.get("value");
						type = (String) jsonCost.get("type");
					};
					++z;
				};
	    	};
		};
		if (value == null && !destination.equals("null")){
			jsonCost = searchCostValue ("", destination, idPriceTable, date);						
			value = (String) jsonCost.get("value");
			type = (String) jsonCost.get("type");
		};
		if (value == null){
			jsonCost = searchCostValue ("", "", idPriceTable, date);
			value = (String) jsonCost.get("value");
			type = (String) jsonCost.get("type");
		};
		if (type == null){
			type = "undefined";
		};

		JSONObject dadosCost = new JSONObject();
		dadosCost.put("type", type);
		dadosCost.put("value", value);
		dadosCost.put("idVendor", idVendor);
		dadosCost.put("destination", destination);
		dadosCost.put("date", date);
		
		return dadosCost;
	};

	@SuppressWarnings({ "unused" })
	@Path("/changeStatus")	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response ChangeStatus(JSONObject param)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject objInvoice = new BasicDBObject();
			ObjectId idInvoice = new ObjectId((String) param.get("idInvoice"));
			DBCollection collection = db.getCollection("invoice");
			BasicDBObject searchQuery = new BasicDBObject("_id", idInvoice);
			DBObject cursor = collection.findOne(searchQuery);
			if (cursor != null){
				objInvoice = (BasicDBObject) cursor.get("documento");
			};
			//
			// ** atualizar status
			//
			BasicDBObject objUpdate = new BasicDBObject();
			objUpdate.put("documento.status", param.get("status"));
			BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
			BasicDBObject setQuery = new BasicDBObject("_id", idInvoice);
			cursor = collection.findAndModify(setQuery,
	                null,
	                null,
	                false,
	                update,
	                true,
	                false);
			mongo.close();
			return Response.status(200).entity(objUpdate).build();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};


	public String numberInvoice(){
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject obj = new BasicDBObject();
			ObjectId id = new ObjectId(); 
			DBCollection collection = db.getCollection("setup");
			BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", "numberInvoice");
			DBObject cursor = collection.findOne(searchQuery);
			int number = 1;
			if (cursor != null){
				obj = (BasicDBObject) cursor.get("documento");
				id = (ObjectId) cursor.get("_id");
				String oldNumber = obj.getString("setupValue");
				number = ((Integer.parseInt(oldNumber) + 1 ));
			};
			searchQuery = new BasicDBObject("documento.setupKey", "yearNumberInvoice");
			cursor = collection.findOne(searchQuery);
			String year = "2017";
			if (cursor != null){
				obj = (BasicDBObject) cursor.get("documento");
				year = obj.getString("setupValue");
			};
			//
			// ** atualizar novo numero
			//
			BasicDBObject objUpdate = new BasicDBObject();
			objUpdate.put("documento.setupKey", "numberInvoice");
			objUpdate.put("documento.setupValue", Integer.toString(number));
			BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
			BasicDBObject setQuery = new BasicDBObject("_id", id);
			cursor = collection.findAndModify(setQuery,
	                null,
	                null,
	                false,
	                update,
	                true,
	                false);
			mongo.close();

			return Integer.toString(number) + "/" + year;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		};
		return null;
	};
	
	
};



