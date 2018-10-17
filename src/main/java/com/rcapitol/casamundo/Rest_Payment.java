package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
					itemCost.put("type", vendor.get("type"));
					itemCost.put("vendorId", vendor.get("vendorId"));
					itemCost.put("studentId", studentId);
					itemCost.put("invoiceId", invoiceId);
					itemCost.put("travelId", travelId);
					itemCost.put("status", "to approve");
					itemCost.put("number", numberPayment());
					itemCost.put("destination", travel.get("destination"));
					JSONArray itens = new JSONArray();
					JSONArray notes = new JSONArray();
					JSONObject item = new JSONObject();
					item.put("item", product.getString("id"));
					int amount = commons.difDate(vendor.getString("start"), vendor.getString("end"));
					item.put("amount", Integer.toString(amount));
					BasicDBObject cost = priceTable.getCost(travelId, product.getString("id"), vendor.getString("vendorId"));
					double value = 0.0;
					if (cost.get("value") != null) {
						value = Double.parseDouble(cost.getString("value"));
					};
					double amountValue = amount * value;
					item.put("value", Double.toString(amountValue));
					itens.add(item);
					if (amountValue != 0.00){
						itemCost.put("amount", Double.toString(amountValue));
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

	@SuppressWarnings({ "unused" })
	@Path("/changeStatus")	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response ChangeStatus(JSONObject param)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject objPayment = new BasicDBObject();
			ObjectId paymentId = new ObjectId((String) param.get("paymentId"));
			DBCollection collection = db.getCollection("payment");
			BasicDBObject searchQuery = new BasicDBObject("_id", paymentId);
			DBObject cursor = collection.findOne(searchQuery);
			BasicDBObject objUpdate = new BasicDBObject();
			if (cursor != null){
				objPayment = (BasicDBObject) cursor.get("documento");
				//
				// ** atualizar status
				//
				objUpdate.put("documento.status", param.get("status"));
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
				BasicDBObject setQuery = new BasicDBObject("_id", paymentId);
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
	@Path("/incluiInstallment")	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluiInstallment(JSONObject installment)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject objPayment = new BasicDBObject();
			ObjectId paymentId = new ObjectId((String) installment.get("id"));
			DBCollection collection = db.getCollection("payment");
			BasicDBObject searchQuery = new BasicDBObject("_id", paymentId);
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
				BasicDBObject setQuery = new BasicDBObject("_id", paymentId);
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
			ObjectId paymentId = new ObjectId((String) installment.get("id"));
			DBCollection collection = db.getCollection("payment");
			BasicDBObject searchQuery = new BasicDBObject("_id", paymentId);
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
		    	float payment = 0;
				while (z < installments.size()) {
					BasicDBObject installmentSource = new BasicDBObject();
					installmentSource = (BasicDBObject) installments.get(z);
					if (!installmentSource.get("date").equals(installment.get("date"))){
						installmentsNew.add(installmentSource);
						payment = payment + Float.valueOf(installmentSource.get("value").toString());
					};
					++z;
				};
				if (payment == 0) {
					objUpdate.put("documento.status", "approved");	
				}else {
					objUpdate.put("documento.status", "unpaid");
				};
				objUpdate.put("documento.installments", installmentsNew);			
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
				BasicDBObject setQuery = new BasicDBObject("_id", paymentId);
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



