package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.UnknownHostException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
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
                        BigDecimal total = BigDecimal.valueOf(Double.parseDouble(paymentResult.getString("payValue")) + Double.parseDouble(paymentDoc.getString("payValue")));
                        total = total.setScale(2, RoundingMode.CEILING);
                        paymentResult.put("payValue", total.toString());
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
        ResponseEntity response = commons_db.incluirCrud("paymentBank",doc);
        String bankListId = (String) response.getBody();

        for (int i = 0; i < paymentsCycles.size(); i++) {
            ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
            BasicDBObject update = new BasicDBObject();
            update.put("field", "status");
            update.put("value", "sending to bank");
            arrayUpdate.add(update);
            update = new BasicDBObject();
            update.put("field", "bankListId");
            update.put("value", bankListId);
            arrayUpdate.add(update);
            commons_db.atualizarCrud("paymentCycles", arrayUpdate, "_id", paymentsCycles.get(i));
        }

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

    public ArrayList lista(String userId) throws UnknownHostException {

        ResponseEntity response = commons_db.listaCrud("paymentBank",null, null, userId, null, null, false);
        ArrayList<Object> paymentsBank = new ArrayList<Object>();
        paymentsBank = (JSONArray) response.getBody();
        return paymentsBank;
    }

    public ArrayList listaPayments(String paymentBankId) throws UnknownHostException {

        ArrayList <BasicDBObject> paymentsBankResult = new ArrayList<>();
        BasicDBObject paymentBank = commons_db.obterCrudDoc("paymentBank", "_id", paymentBankId);

        ArrayList <BasicDBObject> payments = (ArrayList<BasicDBObject>) paymentBank.get("payments");
        if (payments != null) {
            for (int j = 0; j < payments.size(); j++) {
                BasicDBObject payment = new BasicDBObject();
                payment.putAll((Map) payments.get(j));
                BasicDBObject vendor = commons_db.obterCrudDoc("family", "_id", payment.getString("vendorId"));
                if (vendor != null) {
                    payment.put("name", vendor.getString("familyName"));
                    payment.put("financialInstitution", vendor.getString("payment_financialInstitution"));
                    payment.put("accountHolder", vendor.getString("payment_accountHolder"));
                    payment.put("branchNumber", vendor.getString("payment_branchNumber"));
                    payment.put("accountNumber", vendor.getString("payment_accountNumber"));
                    payment.put("vendorType", "family");
                }
                if (vendor == null) {
                    vendor = commons_db.obterCrudDoc("vendor", "_id", payment.getString("vendorId"));
                    if (vendor != null) {
                        payment.put("name", vendor.getString("name"));
                        payment.put("financialInstitution", vendor.getString("financialInst"));
                        payment.put("accountHolder", vendor.getString("accountHolder"));
                        payment.put("branchNumber", vendor.getString("branch"));
                        payment.put("accountNumber", vendor.getString("accNumber"));
                        payment.put("vendorType", "vendor");
                    }
                }
                if (vendor == null) {
                    vendor = commons_db.obterCrudDoc("driver", "_id", payment.getString("vendorId"));
                    if (vendor != null) {
                        payment.put("name", vendor.getString("name"));
                        payment.put("financialInstitution", vendor.getString("financialInst"));
                        payment.put("accountHolder", vendor.getString("accountHolder"));
                        payment.put("branchNumber", vendor.getString("branchNumber"));
                        payment.put("accountNumber", vendor.getString("accountNumber"));
                        payment.put("vendorType", "vendor");
                    }
                }
                payments.set(j, payment);
            }
        }
        return payments;
    }

    public ResponseEntity atualiza(BasicDBObject doc) throws UnknownHostException {

        String bankListId = doc.getString("_id");

        ResponseEntity response  = commons_db.listaCrud("paymentCycles", "documento.bankListId", bankListId, null, null, null, false);

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

        ArrayList <BasicDBObject> paymentCycles = (ArrayList<BasicDBObject>) doc.get("paymentCycles");
        if (paymentCycles == null ){
            response = commons_db.removerCrud("paymentBank","_id",bankListId, null);
            return response;
        }else {
            ArrayList <BasicDBObject> paymentsResult = new ArrayList<>();
            for (int i = 0; i < paymentCycles.size(); i++) {
                ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                BasicDBObject update = new BasicDBObject();
                update.put("field", "status");
                update.put("value", "sending to bank");
                arrayUpdate.add(update);
                update = new BasicDBObject();
                update.put("field", "bankListId");
                update.put("value", bankListId);
                arrayUpdate.add(update);
                commons_db.atualizarCrud("paymentCycles", arrayUpdate, "_id", String.valueOf(paymentCycles.get(i)));
                BasicDBObject paymentCycle = commons_db.obterCrudDoc("paymentCycles", "_id", String.valueOf(paymentCycles.get(i)));
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
                            BigDecimal total = BigDecimal.valueOf(Double.parseDouble(paymentResult.getString("payValue")) + Double.parseDouble(paymentDoc.getString("payValue")));
                            total = total.setScale(2, RoundingMode.CEILING);
                            paymentResult.put("payValue", total.toString());
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
            doc.remove("_id");
            doc.put("payments",paymentsResult);
            ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
            BasicDBObject update = new BasicDBObject();
            update.put("field", "documento");
            update.put("value", doc);
            arrayUpdate.add(update);
            response = commons_db.atualizarCrud("paymentBank",arrayUpdate,"_id",bankListId);
            return response;
        }
    }

    public Boolean atualizaPagamento(String paymentBankId) throws UnknownHostException {

        BasicDBObject doc = commons_db.obterCrudDoc("paymentBank", "_id", paymentBankId);
        ArrayList <BasicDBObject> paymentsResult = new ArrayList<>();
        ArrayList <String> paymentsCycles = (ArrayList<String>) doc.get("paymentCycles");
        for (int i = 0; i < paymentsCycles.size(); i++) {
            BasicDBObject paymentCycle = commons_db.obterCrudDoc("paymentCycles", "_id", paymentsCycles.get(i));
            ArrayList  payments = (ArrayList) paymentCycle.get("payments");
            for (int j = 0; j < payments.size(); j++) {
                BasicDBObject payment = (BasicDBObject) payments.get(j);
                BasicDBObject paymentDoc = commons_db.obterCrudDoc("payment", "_id", payment.getString("id"));
                if (paymentDoc != null){
                    paymentDoc.put("payedAmount", Double.toString(Double.parseDouble(paymentDoc.getString("payedAmount")) + Double.parseDouble(paymentDoc.getString("payValue"))));
                    paymentDoc.put("payedDays", Integer.toString(Integer.parseInt(paymentDoc.getString("payedDays")) + Integer.parseInt(paymentDoc.getString("payDays"))));
                    if (Double.parseDouble(paymentDoc.getString("payedAmount")) >= Double.parseDouble(paymentDoc.getString("totalAmount"))){
                        paymentDoc.put("status", "payed");
                    }else {
                        paymentDoc.put("status", "pending");
                    }
                    if (paymentDoc.getString("sugestLastDatePayment") != null) {
                        paymentDoc.put("lastDayPayment", paymentDoc.getString("sugestLastDatePayment"));
                    }
                    ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                    BasicDBObject update = new BasicDBObject();
                    update.put("field", "documento");
                    update.put("value", paymentDoc);
                    arrayUpdate.add(update);
                    commons_db.atualizarCrud("payment", arrayUpdate, "_id", paymentDoc.getString("_id"));
                }
            }
            paymentCycle.put("status","payed");
            paymentCycle.remove("_id");
            ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
            BasicDBObject update = new BasicDBObject();
            update.put("field", "documento");
            update.put("value", paymentCycle);
            arrayUpdate.add(update);
            commons_db.atualizarCrud("paymentCycles", arrayUpdate, "_id", paymentsCycles.get(i));

            doc.put("status","payed");
            arrayUpdate = new ArrayList<BasicDBObject>();
            update = new BasicDBObject();
            update.put("field", "documento");
            update.put("value", doc);
            arrayUpdate.add(update);
            commons_db.atualizarCrud("paymentBank", arrayUpdate, "_id", paymentBankId);
        }

        return true;
    }

    public ResponseEntity delete(String bankListId) throws UnknownHostException {


        ResponseEntity response  = commons_db.listaCrud("paymentCycles", "documento.bankListId", bankListId, null, null, null, false);

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

        return commons_db.removerCrud("paymentBank","_id",bankListId, null);
    }

}
