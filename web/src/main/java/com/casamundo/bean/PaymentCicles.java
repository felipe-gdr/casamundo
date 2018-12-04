package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.bson.BSONObject;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class PaymentCicles {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();

	public ResponseEntity incluir(BasicDBObject doc) throws UnknownHostException {
        ResponseEntity result = commons_db.incluirCrud("paymentClicles",doc);
        ArrayList <BasicDBObject> payments = (ArrayList<BasicDBObject>) doc.get("payments");
        for (int i = 0; i < payments.size(); i++) {
            BasicDBObject payment = new BasicDBObject();
            payment.putAll((Map) payments.get(i));
            ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
            BasicDBObject update = new BasicDBObject();
            update.put("field", "status");
            update.put("value", "processing");
            arrayUpdate.add(update);
            commons_db.atualizarCrud("payment",arrayUpdate,"_id",payment.getString("id"));
        }
        return result;
	}
}
