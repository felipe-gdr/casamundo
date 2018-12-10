package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class PaymentCycles {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();

	public ResponseEntity incluir(BasicDBObject doc) throws UnknownHostException {
        ResponseEntity response = commons_db.incluirCrud("paymentCycles",doc);
        String cycleId = (String) response.getBody();
        ArrayList <BasicDBObject> payments = (ArrayList<BasicDBObject>) doc.get("payments");
        for (int i = 0; i < payments.size(); i++) {
            BasicDBObject payment = new BasicDBObject();
            payment.putAll((Map) payments.get(i));
            ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
            BasicDBObject update = new BasicDBObject();
            update.put("field", "status");
            update.put("value", "processing");
            arrayUpdate.add(update);
            update = new BasicDBObject();
            update.put("field", "cycleId");
            update.put("value", cycleId);
            arrayUpdate.add(update);
            update = new BasicDBObject();
            update.put("field", "payValue");
            update.put("value", payment.getString("payValue"));
            arrayUpdate.add(update);
            commons_db.atualizarCrud("payment",arrayUpdate,"_id",payment.getString("id"));
        }
        return response;
	}

    public ResponseEntity atualiza(BasicDBObject doc) throws UnknownHostException {

        ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
        BasicDBObject update = new BasicDBObject();
        update.put("field", "status");
        update.put("value", "pending");
        arrayUpdate.add(update);
        update = new BasicDBObject();
        update.put("field", "cycleId");
        update.put("value", "");
        arrayUpdate.add(update);
        commons_db.atualizarCrud("payment",arrayUpdate,"documento.cycleId",doc.getString("_id"));

        String cycleId = doc.getString("_id");
        doc.remove("_id");
        arrayUpdate = new ArrayList<BasicDBObject>();
        update = new BasicDBObject();
        update.put("field", "documento");
        update.put("value", doc);
        arrayUpdate.add(update);
        commons_db.atualizarCrud("paymentCycle",arrayUpdate,"documento.cycleId",cycleId);

        ResponseEntity response = commons_db.incluirCrud("paymentCycles",doc);
        ArrayList <BasicDBObject> payments = (ArrayList<BasicDBObject>) doc.get("payments");
        for (int i = 0; i < payments.size(); i++) {
            BasicDBObject payment = new BasicDBObject();
            payment.putAll((Map) payments.get(i));
            arrayUpdate = new ArrayList<BasicDBObject>();
            update = new BasicDBObject();
            update.put("field", "status");
            update.put("value", "processing");
            arrayUpdate.add(update);
            update = new BasicDBObject();
            update.put("field", "cycleId");
            update.put("value", cycleId);
            arrayUpdate.add(update);
            commons_db.atualizarCrud("payment",arrayUpdate,"_id",payment.getString("id"));
        }
        return response;
    }

    public ArrayList listaStatus(String status, String userId ) throws UnknownHostException {
        BasicDBObject setQuery = new BasicDBObject();
        BasicDBObject setSort = new BasicDBObject();
        setQuery.put("documento.status", status);

        ResponseEntity response = commons_db.listaCrud("paymentCycles",null, null, userId, setQuery, null, true);
        ArrayList<Object> paymentsCycles = new ArrayList<Object>();
        paymentsCycles = (JSONArray) response.getBody();
        return paymentsCycles;

    }

}
