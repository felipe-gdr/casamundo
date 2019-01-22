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

        String cycleId = doc.getString("_id");

        ResponseEntity response  = commons_db.listaCrud("payment", "documento.cycleId", cycleId, null, null, null, false);

        ArrayList<Object> paymentsAtu = new ArrayList<Object>();
        paymentsAtu = (JSONArray) response.getBody();

        if (response != null) {
            for (int i = 0; i < paymentsAtu.size(); i++) {
                BasicDBObject payment = new BasicDBObject();
                payment.putAll((Map) paymentsAtu.get(i));
                ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                BasicDBObject update = new BasicDBObject();
                update.put("field", "status");
                update.put("value", "pending");
                arrayUpdate.add(update);
                update = new BasicDBObject();
                update.put("field", "cycleId");
                update.put("value", "");
                arrayUpdate.add(update);
                update = new BasicDBObject();
                update.put("field", "payValue");
                update.put("value", "0");
                arrayUpdate.add(update);
                commons_db.atualizarCrud("payment",arrayUpdate,"_id",payment.get("_id").toString());
            }
        }


        doc.remove("_id");
        ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
        BasicDBObject update = new BasicDBObject();
        update.put("field", "documento");
        update.put("value", doc);
        arrayUpdate.add(update);
        ArrayList <BasicDBObject> payments = (ArrayList<BasicDBObject>) doc.get("payments");
        if (payments == null){
            response = commons_db.removerCrud("paymentCycles","_id","documento.cycleId", null);
            return response;
        }else {
            response = commons_db.atualizarCrud("paymentCycles",arrayUpdate,"_id",cycleId);
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
                update = new BasicDBObject();
                update.put("field", "payValue");
                update.put("value", payment.getString("payValue"));
                arrayUpdate.add(update);
                commons_db.atualizarCrud("payment", arrayUpdate, "_id", payment.getString("id"));
            }
            return response;
        }
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

    public ResponseEntity delete(String bankListId) throws UnknownHostException {

        ResponseEntity response = commons_db.listaCrud("paymentCycles", "documento.bankListId", bankListId, null, null, null, false);

        ArrayList<Object> paymentsCycles = new ArrayList<Object>();
        paymentsCycles = (JSONArray) response.getBody();

        if (response != null) {
            for (int i = 0; i < paymentsCycles.size(); i++) {
                BasicDBObject paymentCycle = new BasicDBObject();
                paymentCycle.putAll((Map) paymentsCycles.get(i));
                ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                BasicDBObject update = new BasicDBObject();
                update.put("field", "status");
                update.put("value", "bank");
                arrayUpdate.add(update);
                update = new BasicDBObject();
                update.put("field", "bankListId");
                update.put("value", "");
                arrayUpdate.add(update);
                commons_db.atualizarCrud("paymentCycles", arrayUpdate, "_id", paymentCycle.get("_id").toString());
            }
        }

        return commons_db.removerCrud("paymentBank", "_id", bankListId, null);
    }
}
