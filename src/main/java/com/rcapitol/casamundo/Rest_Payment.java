package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/payment")

public class Rest_Payment {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Rest_PriceTable priceTable = new Rest_PriceTable();

	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray listaPrayment(@QueryParam("date") String date, @QueryParam("occHome") String occHome, @QueryParam("userId") String userId ) throws UnknownHostException, MongoException {
		
		BasicDBObject setQuery = new BasicDBObject();
		BasicDBObject setSort = new BasicDBObject();
		setSort.put("documento.lastDayPayment", -1);
		setQuery.put("documento.occHome", occHome);
		BasicDBObject setCondition = new BasicDBObject();
		int daysPeriodStart = -20;
		int daysPeriodEnd = -5;
		if (!occHome.equals("homestay")) {
			daysPeriodStart = -50;
			daysPeriodEnd = -20;
		}
		if (commons.getMonth(date) == 4 || commons.getMonth(date) == 6 || commons.getMonth(date) == 8 || commons.getMonth(date) == 9 || commons.getMonth(date) == 11) {
			daysPeriodStart++;
			daysPeriodEnd++;				
		}
		if (commons.getMonth(date) == 3) {
			if (commons.anoBissexto(date)) {
				daysPeriodStart--;
				daysPeriodEnd++;				
			}else {
				daysPeriodStart = daysPeriodStart - 2;
				daysPeriodEnd = daysPeriodEnd - 2;								
			}
		}
		setCondition.put("$gte", commons.calcNewDate(date, daysPeriodStart));
		setCondition.put("$lte", commons.calcNewDate(date, daysPeriodEnd));			
		setQuery.put("documento.lastDayPayment", setCondition);

		setQuery.put("documento.extension", "false");
		
		JSONArray result = new JSONArray();
		result = getPayments(userId, setQuery, setSort, result);

		setQuery.put("documento.extension", "true");
		
		daysPeriodStart = daysPeriodStart - 5;
		daysPeriodEnd = daysPeriodEnd - 5;								
		setCondition.put("$gte", commons.calcNewDate(date, daysPeriodStart));
		setCondition.put("$lte", commons.calcNewDate(date, daysPeriodEnd));			
		setQuery.put("documento.lastDayPayment", setCondition);
		
		result = getPayments(userId, setQuery, setSort, result);
		
		return result;

	}	
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public JSONArray getPayments(String userId, BasicDBObject setQuery, BasicDBObject setSort, JSONArray result) throws UnknownHostException, MongoException {

		Response response = commons_db.listaCrud("payment", null, null, userId, setQuery, setSort, false);
		ArrayList<Object> payments = new ArrayList<Object>();
		payments = (JSONArray) response.getEntity();

		if (response != null) {
			for (int i = 0; i < payments.size(); i++) {
				BasicDBObject payment = new BasicDBObject();
				payment.putAll((Map) payments.get(i));
				BasicDBObject paymentDoc = new BasicDBObject();
				paymentDoc = (BasicDBObject) payment.get("documento");
				if (paymentDoc.get("occHome") != null) {
					if (paymentDoc.get("occHome").equals("homestay")) {
						int paymentDays = commons.difDate(paymentDoc.getString("start"), paymentDoc.getString("end"));
						int payedDays = payment.getInt("payedDays");
						int payDays = 0;
						if ((paymentDays - payedDays) > 28) {
							payedDays = payedDays + 28;
							payDays = 28;
						}else {
							payDays = paymentDays - payedDays;
						}
						paymentDoc.put("payDays", payDays);
						Double payValue = (Double.parseDouble(paymentDoc.getString("totalAmount")) / Integer.parseInt(paymentDoc.getString("days")) * payDays);
						if ((payedDays + payDays)  == paymentDays ) {
							payValue = Double.parseDouble(paymentDoc.getString("totalAmount")) - Double.parseDouble(paymentDoc.getString("payedAmount"));
						}
						paymentDoc.put("payValue", payValue);
						payment.put("documento", paymentDoc);
						if (payment != null) {
							result.add(payment);
						};
					}					
				}
			}
		}
		
		return result;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void criarCosts(String invoiceId) throws UnknownHostException, MongoException {
		
		BasicDBObject invoice = commons_db.obterCrudDoc("invoice", "_id", invoiceId);
		String travelId = invoice.getString("trip"); 
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		String studentId =  (String) travel.get("studentId");

		commons_db.removerCrud("payment", "documento.invoiceId", invoiceId, null);

		if (invoice.get("products") != null) {
			ArrayList<Object> products = new ArrayList<Object>();
			products = (ArrayList) invoice.get("products");
	
			for (int i = 0; i < products.size(); i++) {
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				BasicDBObject product = new BasicDBObject();
				product.putAll((Map) products.get(i));
				ArrayList<Object> vendors =  new ArrayList<Object>();
				Response response = commons_db.listaCrud("homestayBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
				ArrayList<Object> result = (ArrayList<Object>) response.getEntity();
				vendors = searchVendor(result, vendors, travel, "familyId", "familyDorm", "familyRooms", "family");
				response = commons_db.listaCrud("sharedBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
				result = (ArrayList<Object>) response.getEntity();
				vendors = searchVendor(result, vendors, travel, "vendorId", "dorm", "room", "shared");
				response = commons_db.listaCrud("suiteBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
				result = (ArrayList<Object>) response.getEntity();
				vendors = searchVendor(result, vendors, travel, "vendorId", "dorm", "room", "suite");
				for (int j = 0; j < vendors.size(); j++) {
					BasicDBObject vendor = new BasicDBObject();
					vendor.putAll((Map) vendors.get(i));
					BasicDBObject itemCost = new BasicDBObject();
					itemCost.put("paymentType", "automatic");
					itemCost.put("vendorType", vendor.get("type"));
					itemCost.put("vendorId", vendor.get("vendorId"));
					itemCost.put("occHome", accomodation.getString("occHome"));
					itemCost.put("studentId", studentId);
					itemCost.put("invoiceId", invoiceId);
					itemCost.put("travelId", travelId);
					itemCost.put("status", "to approve");
					itemCost.put("number", numberPayment());
					itemCost.put("destination", travel.get("destination"));
					itemCost.put("start", vendor.getString("start"));
					itemCost.put("end", vendor.getString("end"));
					itemCost.put("lastDayPayment", vendor.getString("start"));
					if (vendor.get("extension") != null) {
						if (vendor.getString("extension").equals("true")) {
							itemCost.put("lastDayPayment", commons.calcNewDate(vendor.getString("start"), -5));	
						}
					}
					JSONArray itens = new JSONArray();
					JSONArray notes = new JSONArray();
					JSONObject item = new JSONObject();
					item.put("item", product.getString("id"));
					int days = commons.difDate(vendor.getString("start"), vendor.getString("end"));
					itemCost.put("days", Integer.toString(days));;
					itemCost.put("payedDays", "0");
					itemCost.put("payedAmount", "0.0");
					BasicDBObject cost = priceTable.getCost(travelId, product.getString("id"), vendor.getString("vendorId"));
					itemCost.put("cost", cost.get("value"));
					double value = 0.0;
					if (cost.get("value") != null) {
						value = Double.parseDouble(cost.getString("value"));
					};
					double amountValue = days * value;
					item.put("itemAmount", Double.toString(amountValue));
					item.put("days", Integer.toString(days));
					itens.add(item);
					if (amountValue != 0.00){
						itemCost.put("totalAmount", Double.toString(amountValue));
						itemCost.put("itens", itens);
						itemCost.put("notes", notes);
						commons_db.incluirCrud("payment", itemCost);
					};
				}
			}
		}
	};

	@SuppressWarnings({"rawtypes" })
	private ArrayList<Object> searchVendor(ArrayList<Object> vendorArray, ArrayList<Object> resultOutput, BasicDBObject travel, String nameId, String collectionDorm, String collectionRoom, String type) throws UnknownHostException, MongoException {
		
		for (int i = 0; i < vendorArray.size(); i++) {
			BasicDBObject vendor = new BasicDBObject();
			vendor.putAll((Map) vendorArray.get(i));
			BasicDBObject vendorDoc = (BasicDBObject) vendor.get("documento");
			if (vendorDoc.getString("ativo").equals("ativo")) {
				BasicDBObject vendorResult = new BasicDBObject();
				BasicDBObject dorm = commons_db.obterCrudDoc(collectionDorm, "documento.id", vendorDoc.getString("resource"));
				if (dorm != null) {
					BasicDBObject room = commons_db.obterCrudDoc(collectionRoom, "_id", dorm.getString("roomId"));
					if (room != null) {
						vendorResult.put("vendorId", room.getString(nameId));
						vendorResult.put("start", vendorDoc.getString("start"));
						vendorResult.put("end", vendorDoc.getString("end"));
						vendorResult.put("type", type);
						resultOutput.add(vendorResult);
					};
				};
			};
		};
		return resultOutput;
	};

	@Path("/get/number")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)

	public String numberPayment(){
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject obj = new BasicDBObject();
			ObjectId id = new ObjectId(); 
			DBCollection collection = db.getCollection("setup");
			BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", "numberPayment");
			DBObject cursor = collection.findOne(searchQuery);
			int number = 1;
			if (cursor != null){
				obj = (BasicDBObject) cursor.get("documento");
				id = (ObjectId) cursor.get("_id");
				String oldNumber = obj.getString("setupValue");
				number = ((Integer.parseInt(oldNumber) + 1 ));
			};
			searchQuery = new BasicDBObject("documento.setupKey", "yearNumberPayment");
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
			objUpdate.put("documento.setupKey", "numberPayment");
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



