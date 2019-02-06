package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

    public BasicDBObject historico(String vendorId) throws UnknownHostException {

        ResponseEntity response = commons_db.listaCrud("payment", "documento.vendorId", vendorId, null, null, null, false);

        ArrayList<BasicDBObject> paymentsResult = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> paymentsCycleResult = new ArrayList<BasicDBObject>();

        ArrayList<BasicDBObject> payments = new ArrayList<BasicDBObject>();
        payments = (JSONArray) response.getBody();

        if (response != null) {
            for (BasicDBObject payment : payments) {
                paymentsResult.add(payment);
                BasicDBObject paymentDoc = new BasicDBObject();
                paymentDoc = (BasicDBObject) payment.get("documento");
                Boolean existe = false;
                for (BasicDBObject paymentCycle : paymentsCycleResult) {
                    if (paymentDoc.get("cycleId") != null) {
                        if (paymentDoc.getString("cycleId").equals(paymentCycle.getString("_id"))) {
                            existe = true;
                        }
                    }
                }
                if (!existe){
                    if (paymentDoc.get("cycleId") != null) {
                        BasicDBObject paymentCycles = commons_db.obterCrudDoc("paymentCycles", "_id", paymentDoc.getString("cycleId"));
                        ArrayList<BasicDBObject> resultPaymentsCycle = new ArrayList<BasicDBObject>();
                        ArrayList<BasicDBObject> paymentsCycle = (ArrayList<BasicDBObject>) paymentCycles.get("payments");
                        BigDecimal totalCycle = new BigDecimal(0.0);
                        for (BasicDBObject paymentCycle : paymentsCycle) {
                            BasicDBObject paymentRead = commons_db.obterCrudDoc("payment", "_id", paymentCycle.getString("id"));
                            if (paymentRead.getString("vendorId").equals(vendorId)) {
                                resultPaymentsCycle.add(paymentCycle);
                                BigDecimal itemCycle = new BigDecimal(Double.valueOf(paymentCycle.getString("payValue")));
                                itemCycle = itemCycle.setScale(2, RoundingMode.CEILING);
                                totalCycle = totalCycle.add(itemCycle);
                            }
                        }
                        paymentCycles.put("payments", resultPaymentsCycle);
                        paymentCycles.put("totalCycle", totalCycle.toString());
                        paymentsCycleResult.add(paymentCycles);
                    }
                }

            }
        }
        BasicDBObject result = new BasicDBObject();
        result.put("payments", paymentsResult);
        result.put("paymentsCycle", paymentsCycleResult);
        return result;
    }
}
