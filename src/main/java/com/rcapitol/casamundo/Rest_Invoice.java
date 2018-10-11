package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;
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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

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

	Commons commons = new Commons();
	Rest_Payment payment = new Rest_Payment();
	Commons_DB commons_db = new Commons_DB();

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
	@SuppressWarnings({ "rawtypes" })
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluirInvoice(BasicDBObject documento) throws UnknownHostException, MongoException  {
		
		Response response = commons_db.incluirCrud("invoice", documento);
		if (response.getStatus() == 200) {
			BasicDBObject docInserted = new BasicDBObject();
			docInserted.putAll((Map) response.getEntity());
			ObjectId idObj = new ObjectId(docInserted.getString("_id"));
			criarCosts(idObj.toString(), null);
		};
		return response;

	};

	@SuppressWarnings("rawtypes")
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AtualizarDocumento(BasicDBObject documento) throws UnknownHostException, MongoException  {
		
		String value = documento.get("_id").toString();
		documento.remove("_id");		
		Response response = commons_db.atualizarCrud("invoice", documento, "_id", value);
		if (response.getStatus() == 200) {
			BasicDBObject doc = new BasicDBObject();
			doc.putAll((Map) response.getEntity());
			ObjectId id = new ObjectId(doc.getString("_id"));
			criarCosts(id.toString(), null);
		};
		return response;

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
					jsonDocumento.put("agencyId", jsonObject.get("agencyId"));
					jsonDocumento.put("actualTrip", jsonObject.get("actualTrip"));
					jsonDocumento.put("status", jsonObject.get("status"));
					jsonDocumento.put("destination", jsonObject.get("destination"));
					jsonDocumento.put("number", jsonObject.get("number"));
					jsonDocumento.put("dueDate", jsonObject.get("dueDate"));
					jsonDocumento.put("amountNet", jsonObject.get("amountNet"));
					jsonDocumento.put("amountGross", jsonObject.get("amountGross"));
					jsonDocumento.put("itensNet", jsonObject.get("itensNet"));
					jsonDocumento.put("itensGross", jsonObject.get("itensGross"));
					jsonDocumento.put("installments", jsonObject.get("installments"));
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
			itemCost.put("invoiceId", objInvoice.get("id"));
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
	public void criarCosts(String invoiceId, String travelId) throws UnknownHostException, MongoException {
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		String studentId =  (String) travel.get("studentId");
		BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");

		BasicDBObject invoice = commons_db.obterCrudDoc("invoice", "_id", invoiceId);

		//
		//** deletar payments da invoice
		//
		commons_db.removerCrud("payment", "documento.invoiceId", invoiceId, null);

		ArrayList<Object> products = new ArrayList<Object>();
		products = (JSONArray) invoice.get("products");

		for (int i = 0; i < products.size(); i++) {
			BasicDBObject itemCost = new BasicDBObject();
			BasicDBObject itemInvoice = new BasicDBObject();
			itemInvoice.putAll((Map) products.get(i));
		    JSONObject dadosCost = obterDadosCosts (itemCost, accomodation, invoice, itemInvoice);
			itemCost.put("studentId", studentId);
			itemCost.put("invoiceId", invoiceId);
			itemCost.put("invoiceNumber", invoice.get("number"));
			itemCost.put("travelId", travelId);
			itemCost.put("status", "to approve");
			itemCost.put("number", payment.numberPayment());
			if (dadosCost.get("date") != null){
				itemCost.put("dueDate", commons.calcNewDate((String) dadosCost.get("date"), 6));
			};
			itemCost.put("destination", travel.get("destination"));
			JSONArray itens = new JSONArray();
			JSONArray notes = new JSONArray();
			String typeItem = (String) dadosCost.get("type");
			double valueNumber = 0;
			Double amountValue = 0.00;
			for (int w = 0; w < products.size(); w++) {
				itemInvoice.putAll((Map) products.get(w));
			    dadosCost = obterDadosCosts (itemCost, accomodation, invoice, itemInvoice);
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
					products.remove(w);
					--w;
				};
				++w;
			};
			if (amountValue != 0.00){
				itemCost.put("amount", amountValue);
				itemCost.put("itens", itens);
				itemCost.put("notes", notes);
				//
				// ** incluir novo custo
				//
				commons_db.incluirCrud("payment", itemCost);
			};
			
		}
	};

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public JSONObject obterDadosCosts(BasicDBObject itemCost, BasicDBObject objStudent, BasicDBObject objInvoice, BasicDBObject itemInvoice) {

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
			ObjectId invoiceId = new ObjectId((String) param.get("invoiceId"));
			DBCollection collection = db.getCollection("invoice");
			BasicDBObject searchQuery = new BasicDBObject("_id", invoiceId);
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
			BasicDBObject setQuery = new BasicDBObject("_id", invoiceId);
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

	@SuppressWarnings({ "rawtypes" })
	@Path("/get/number")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)

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
	

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/agency/payments")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject AgencyPayments(@QueryParam("id") String id) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("invoice");

			BasicDBObject setQuery = new BasicDBObject();
	    	setQuery.put("documento.agencyId", id);
			
			DBCursor cursor = collection.find(setQuery);
			float amount = 0;
			float payment = 0;
			float credit = 0;
			JSONArray installments = new JSONArray();
			JSONArray invoices = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				BasicDBObject obj = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				BasicDBObject doc = new BasicDBObject();
				doc.putAll((Map) obj.get("documento"));
				ArrayList<BasicDBObject> objInstallments = (ArrayList<BasicDBObject>) doc.get("installments");
				if (objInstallments != null) {
					for (int i = 0; i < objInstallments.size(); i++) {
						if (objInstallments.get(i).get("type").toString().equals("Use Credit")) {
							payment = payment + Float.valueOf(objInstallments.get(i).get("value").toString()).longValue();
						};
						if (objInstallments.get(i).get("type").toString().equals("Credit")) {
							credit = credit + Float.valueOf(objInstallments.get(i).get("value").toString()).longValue();
						};
					};
					installments.add(objInstallments);
				};
				ArrayList<BasicDBObject> objItens = (ArrayList<BasicDBObject>) doc.get("itensNet");
				float amountItens = 0;
				if (objItens != null) {
					for (int i = 0; i < objItens.size(); i++) {
						amount = amount + Float.valueOf(objItens.get(i).get("value").toString());
						amountItens = amountItens + Float.valueOf(objItens.get(i).get("value").toString());
					};
				};
				BasicDBObject invoice = new BasicDBObject();
				invoice.put("number", doc.get("number"));
				invoice.put("dueDate", doc.get("dueDate"));
				invoice.put("amount", String.valueOf(amountItens));
				invoices.add(invoice);
			};
			JSONObject jsonReturn = new JSONObject();
			jsonReturn.put("amount", String.valueOf(amount));
			jsonReturn.put("payment", String.valueOf(payment));
			jsonReturn.put("balance", String.valueOf(credit - payment));
			jsonReturn.put("installments", installments);
			jsonReturn.put("invoices", invoices);
			
			mongo.close();
			return jsonReturn;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};

	@SuppressWarnings({"unchecked", "rawtypes" })
	@Path("/incluiInstallment")	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluiInstallment(JSONObject installment)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject objPayment = new BasicDBObject();
			ObjectId invoiceId = new ObjectId((String) installment.get("id"));
			DBCollection collection = db.getCollection("invoice");
			BasicDBObject searchQuery = new BasicDBObject("_id", invoiceId);
			DBObject cursor = collection.findOne(searchQuery);
			BasicDBObject objUpdate = new BasicDBObject();
			if (cursor != null){
				objPayment = (BasicDBObject) cursor.get("documento");
				//
				// ** inclui installment
				//
				BasicDBObject installmentObj = new BasicDBObject();
				installmentObj.put("value", installment.get("value"));
				installmentObj.put("type", installment.get("type"));
				installmentObj.put("date", installment.get("date"));
		    	ArrayList installments = new ArrayList(); 
		    	installments = (ArrayList) objPayment.get("installments");
				installments.add(installmentObj);
				objUpdate.put("documento.installments", installments);
				objUpdate.put("documento.status", installment.get("status"));
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
				BasicDBObject setQuery = new BasicDBObject("_id", invoiceId);
				cursor = collection.findAndModify(setQuery,
		                null,
		                null,
		                false,
		                update,
		                true,
		                false);
			};
			mongo.close();
			return Response.status(200).entity(objUpdate).build();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};

	@SuppressWarnings({"unchecked", "rawtypes" })
	@Path("/excluiInstallment")	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response ExcluiInstallment(JSONObject installment)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject objPayment = new BasicDBObject();
			ObjectId invoiceId = new ObjectId((String) installment.get("id"));
			DBCollection collection = db.getCollection("invoice");
			BasicDBObject searchQuery = new BasicDBObject("_id", invoiceId);
			DBObject cursor = collection.findOne(searchQuery);
			BasicDBObject objUpdate = new BasicDBObject();
			if (cursor != null){
				objPayment = (BasicDBObject) cursor.get("documento");
				//
				// ** inclui installment
				//
		    	ArrayList installmentsNew = new ArrayList(); 
		    	ArrayList installments = new ArrayList(); 
		    	installments = (ArrayList) objPayment.get("installments");
		    	int z = 0;
				while (z < installments.size()) {
					BasicDBObject installmentSource = new BasicDBObject();
					installmentSource = (BasicDBObject) installments.get(z);
					if (!installmentSource.get("date").equals(installment.get("date"))){
						installmentsNew.add(installmentSource);
					};
					++z;
				};
				objUpdate.put("documento.installments", installmentsNew);
				objUpdate.put("documento.status", "unpaid");
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
				BasicDBObject setQuery = new BasicDBObject("_id", invoiceId);
				cursor = collection.findAndModify(setQuery,
		                null,
		                null,
		                false,
		                update,
		                true,
		                false);
			};
			mongo.close();
			return Response.status(200).entity(objUpdate).build();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};
};



