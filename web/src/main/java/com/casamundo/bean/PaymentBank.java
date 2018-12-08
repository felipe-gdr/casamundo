package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class PaymentBank {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();

	public ArrayList incluir(BasicDBObject doc) throws UnknownHostException {

        ArrayList <BasicDBObject> paymentsResult = new ArrayList<>();
        ArrayList <String> paymentsCycles = (ArrayList<String>) doc.get("paymentCycles");
        for (int i = 0; i < paymentsCycles.size(); i++) {
            BasicDBObject paymentCycle = commons_db.obterCrudDoc("paymentCycles", "_id", paymentsCycles.get(i));
            ArrayList  payments = (ArrayList) paymentCycle.get("payments");
            for (int j = 0; j < payments.size(); j++) {
                BasicDBObject payment = (BasicDBObject) payments.get(j);
                BasicDBObject paymentDoc = commons_db.obterCrudDoc("payment", "_id", payment.getString("id"));
                Boolean existeResult = false;
                for (int k = 0; k < paymentsResult.size(); k++) {
                    BasicDBObject paymentResult = new BasicDBObject();
                    paymentResult.putAll((Map) paymentsResult.get(k));
                    if (paymentResult.getString("vendorId").equals(paymentDoc.getString("vendorId"))){
                        existeResult = true;
                        paymentResult.put("payValue", Double.toString(Double.parseDouble(paymentResult.getString("payValue")) + Double.parseDouble(paymentDoc.getString("payValue"))));
                        paymentsResult.set(k,paymentResult);
                    }
                }
                if (!existeResult){
                    BasicDBObject paymentResult = new BasicDBObject();
                    paymentResult.put("vendorId",paymentDoc.getString("vendorId"));
                    paymentResult.put("payValue",paymentDoc.getString("payValue"));
                    paymentsResult.add(paymentResult);
                }
            }
        }
        doc.put("payments",paymentsResult);
        commons_db.incluirCrud("paymentBank",doc);

        for (int i = 0; i < paymentsResult.size() ; i++) {
            BasicDBObject paymentResult = new BasicDBObject();
            paymentResult.putAll((Map) paymentsResult.get(i));
            BasicDBObject vendor = commons_db.obterCrudDoc("family","_id",paymentResult.getString("vendorId"));
            if (vendor != null){
                paymentResult.put("name",vendor.getString("familyName"));
                paymentResult.put("financialInstitution",vendor.getString("payment_financialInstitution"));
                paymentResult.put("accountHolder",vendor.getString("payment_accountHolder"));
                paymentResult.put("branchNumber",vendor.getString("payment_branchNumber"));
                paymentResult.put("accountNumber",vendor.getString("payment_accountNumber"));
                paymentResult.put("vendorType","family");
            }
            if (vendor == null) {
                vendor = commons_db.obterCrudDoc("vendor", "_id", paymentResult.getString("vendorId"));
                if (vendor != null) {
                    paymentResult.put("name", vendor.getString("name"));
                    paymentResult.put("financialInstitution", vendor.getString("financialInst"));
                    paymentResult.put("accountHolder", vendor.getString("accountHolder"));
                    paymentResult.put("branchNumber", vendor.getString("branchNumber"));
                    paymentResult.put("accountNumber", vendor.getString("accountNumber"));
                    paymentResult.put("vendorType", "vendor");
                }
            }
            if (vendor == null) {
                vendor = commons_db.obterCrudDoc("driver", "_id", paymentResult.getString("vendorId"));
                if (vendor != null) {
                    paymentResult.put("name", vendor.getString("name"));
                    paymentResult.put("financialInstitution", vendor.getString("financialInst"));
                    paymentResult.put("accountHolder", vendor.getString("accountHolder"));
                    paymentResult.put("branchNumber", vendor.getString("branchNumber"));
                    paymentResult.put("accountNumber", vendor.getString("accountNumber"));
                    paymentResult.put("vendorType", "vendor");
                }
            }
            paymentsResult.set(i,paymentResult);
        }
        return paymentsResult;
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
}
