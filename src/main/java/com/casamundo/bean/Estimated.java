package com.casamundo.bean;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.bson.types.ObjectId;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/payment")

public class Estimated {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void criarCosts(String invoiceId) throws UnknownHostException, MongoException {
		
		BasicDBObject invoice = commons_db.obterCrudDoc("invoice", "_id", invoiceId);
		String travelId = invoice.getString("trip"); 
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		String studentId =  (String) travel.get("studentId");

		commons_db.removerCrud("estimated", "documento.invoiceId", invoiceId, null);

		if (invoice.get("products") != null) {
			ArrayList<Object> products = new ArrayList<Object>();
			products = (ArrayList) invoice.get("products");
	
			for (int i = 0; i < products.size(); i++) {
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				BasicDBObject product = new BasicDBObject();
				product.putAll((Map) products.get(i));
				BasicDBObject itemCost = new BasicDBObject();
				itemCost.put("paymentType", "automatic");
				itemCost.put("occHome", accomodation.getString("occHome"));
				itemCost.put("studentId", studentId);
				itemCost.put("invoiceId", invoiceId);
				itemCost.put("travelId", travelId);
				itemCost.put("status", "to approve");
				itemCost.put("number", numberEstimated());
				itemCost.put("destination", travel.get("destination"));
				itemCost.put("start", accomodation.getString("checkIn"));
				itemCost.put("end", accomodation.getString("checkOut"));
				int days = commons.difDate(accomodation.getString("checkIn"), accomodation.getString("checkOut"));
				itemCost.put("days", Integer.toString(days));;
				BasicDBObject cost = priceTable.getCost(travelId, product.getString("id"), null);
				itemCost.put("cost", cost.get("value"));
				double value = 0.0;
				if (cost.get("value") != null) {
					value = Double.parseDouble(cost.getString("value"));
				};
				double amountValue = days * value;
				itemCost.put("totalAmount", Double.toString(amountValue));
				commons_db.incluirCrud("estimated", itemCost);
			}
		}
	};

	@Path("/get/number")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)

	public String numberEstimated(){
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
			searchQuery = new BasicDBObject("documento.setupKey", "yearNumberEstimated");
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
			objUpdate.put("documento.setupKey", "numberEstimated");
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



