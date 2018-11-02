package com.casamundo.bean;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Path;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;

	
@Singleton
// @Lock(LockType.READ)
@Path("/payment")

public class Estimated {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void criarCosts(String invoiceId) throws UnknownHostException {
		
		BasicDBObject invoice = commons_db.obterCrudDoc("invoice", "_id", invoiceId);
		System.out.println("id travel" + invoice.getString("trip"));
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
				itemCost.put("number", commons_db.getNumber("numberEstimated", "yearNumberEstimated"));
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
};



