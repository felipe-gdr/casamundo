package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;


public class Estimated {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void criarCosts(ArrayList<Object> products,  String travelId,  String invoiceId) throws UnknownHostException {

        BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
        String studentId =  (String) travel.get("studentId");

        commons_db.removerCrud("estimated", "documento.invoiceId", invoiceId, null);

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
            itemCost.put("item", product.get("id"));
            if (product.get("dates") != null) {
                ArrayList dates = (ArrayList) product.get("dates");
                for (int j = 0; j < dates.size(); j++) {
                    BasicDBObject date = new BasicDBObject();
                    date.putAll((Map) dates.get(j));
                    ArrayList<BasicDBObject> costs = priceTable.getCost(date.getString("start"), date.getString("end"), travelId, product.getString("id"), null);
                    for (BasicDBObject cost : costs) {
                        itemCost.put("cost", cost.get("value"));
                        itemCost.put("start", cost.getString("start"));
                        itemCost.put("end", cost.getString("end"));
                        int days = commons.difDate(cost.getString("start"), cost.getString("end"));
                        itemCost.put("days", Integer.toString(days));
                        ;
                        double value = 0.0;
                        if (cost.get("value") != null) {
                            if (!cost.getString("value").equals("")) {
                                value = Double.parseDouble(cost.getString("value"));
                            }
                        }
                        BasicDBObject productDoc = commons_db.obterCrudDoc("priceTable", "_id", product.getString("id"));
                        if (productDoc.getString("charging") != "week" && productDoc.getString("charging") != "eNight"){
                            days = 0;
                        }
                        if (value != 0.0) {
                            double amountValue = days * value;
                            itemCost.put("totalAmount", Double.toString(amountValue));
                            commons_db.incluirCrud("estimated", itemCost);
                        }
                    }
                }
            }
		}
	}
}



