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

public class Payment {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();

	public ArrayList listaPayment(String date, String accControl, String userId ) throws UnknownHostException {
		
		BasicDBObject setQuery = new BasicDBObject();
		BasicDBObject setSort = new BasicDBObject();
		setSort.put("documento.controlDatePayment", -1);
		setQuery.put("documento.accControl", accControl);
		BasicDBObject setCondition = new BasicDBObject();
        BasicDBObject setConditionLastDayPayment = new BasicDBObject();
        int daysPeriodStart = 0;
        int daysPeriodEnd = 0;
		if (date != null) {
            if (accControl.equals("homestay")) {
                daysPeriodStart = -19;
                daysPeriodEnd = -5;
                if (commons.getDay(date) < 19) {
                    if (commons.getMonth(date) == 4 || commons.getMonth(date) == 6 || commons.getMonth(date) == 8 || commons.getMonth(date) == 9 || commons.getMonth(date) == 11) {
                        daysPeriodStart--;
                    }
                    if (commons.getMonth(date) == 3) {
                        if (commons.anoBissexto(date)) {
                            daysPeriodStart--;
                        } else {
                            daysPeriodStart = daysPeriodStart - 2;
                            daysPeriodEnd = daysPeriodEnd - 2;
                        }
                    }
                }
                setCondition.put("$gte", commons.calcNewDate(date, daysPeriodStart));
                setCondition.put("$lte", commons.calcNewDate(date, daysPeriodEnd));
            }else{
                setCondition.put("$gte", commons.setDay(commons.calcNewMonth(date, -1), "01"));
                setCondition.put("$lte", commons.lastDayMonth(commons.calcNewMonth(date, -1)));
            }
        }else{
            setCondition.put("$gte", "1900-01-01");
            setCondition.put("$lte", "9999-12-31");
        }
		setQuery.put("documento.controlDatePayment", setCondition);

		setQuery.put("documento.extension", "false");
        setQuery.put("documento.status", "pending");

		ArrayList result = new JSONArray();
		result = getPayments(userId, setQuery, setSort, result, date);

		setQuery.put("documento.extension", "true");
		
        if (date != null) {
            setCondition.put("$gte", commons.calcNewDate(date, daysPeriodStart));
            setCondition.put("$lte", date);
        }
		setQuery.put("documento.controlDatePayment", setCondition);

		result = getPayments(userId, setQuery, setSort, result, date);
		
		return result;

	}

    public ArrayList<BasicDBObject> listaPending(String date, String accControl, String userId ) throws UnknownHostException {

	    ArrayList <BasicDBObject> processings = listaPayment(date, accControl,userId);
        BasicDBObject setQuery = new BasicDBObject();
        BasicDBObject setSort = new BasicDBObject();
        setSort.put("documento.lastDayPayment", -1);
        setQuery.put("documento.status", "pending");
        setQuery.put("documento.accControl", accControl);

        ResponseEntity response = commons_db.listaCrud("payment", null, null, userId, setQuery, setSort, false);
        ArrayList<Object> payments = new ArrayList<Object>();
        payments = (JSONArray) response.getBody();

        ArrayList <BasicDBObject> result = new ArrayList();
        for (int i = 0; i < payments.size(); i++) {
            BasicDBObject payment = new BasicDBObject();
            payment.putAll((Map) payments.get(i));
            BasicDBObject paymentDoc = new BasicDBObject();
            paymentDoc = (BasicDBObject) payment.get("documento");
            Boolean existe = false;
            for (BasicDBObject processing:processings) {
                String id1 = payment.getString("_id");
                String id2 = processing.getString("_id");
                if (id1.equals(id2)){
                    existe = true;
                }
            }
            if (!existe) {
                String paymentId = payment.getString("_id");
                if (paymentDoc.get("accControl") != null) {
                    if (paymentDoc.get("paymentType").equals("manual")){
                        BasicDBObject vendor = commons_db.obterCrudDoc("family", "_id", paymentDoc.getString("vendorId"));
                        if (vendor != null) {
                            paymentDoc.put("vendor", vendor.get("familyName"));
                        }
                        vendor = commons_db.obterCrudDoc("vendor", "_id", paymentDoc.getString("vendorId"));
                        if (vendor != null) {
                            paymentDoc.put("vendor", vendor.get("name"));
                        }
                        paymentDoc.put("studentName", "N/A");
                        payment.put("documento", paymentDoc);
                        result.add(payment);
                    }else {
                        if (paymentDoc.get("accControl").equals("homestay")) {
                            paymentDoc = calcPaymentHomestay(paymentDoc, payment.getString("_id"), date, setQuery);
                            payment.put("documento", paymentDoc);
                            result.add(payment);
                        }
                        String lastDayMonthBefore = commons.lastDayMonth(paymentDoc.getString("lastDayPayment"));
                        if (!paymentDoc.get("accControl").equals("homestay")) {
                            paymentDoc = calcPaymentDorms(paymentDoc, lastDayMonthBefore, payment.getString("_id"), setQuery);
                            payment.put("documento", paymentDoc);
                            result.add(payment);
                        }
                    }
                }
            }
        }
        return result;

    }

    @SuppressWarnings({ "rawtypes", "unchecked"})
	public ArrayList<BasicDBObject> getPayments(String userId, BasicDBObject setQuery, BasicDBObject setSort, ArrayList<BasicDBObject> result, String baseDate) throws UnknownHostException {

		ResponseEntity response = commons_db.listaCrud("payment", null, null, userId, setQuery, setSort, false);
		ArrayList<Object> payments = new ArrayList<Object>();
		payments = (JSONArray) response.getBody();

		if (response != null) {
			for (int i = 0; i < payments.size(); i++) {
				BasicDBObject payment = new BasicDBObject();
				payment.putAll((Map) payments.get(i));
				BasicDBObject paymentDoc = new BasicDBObject();
				paymentDoc = (BasicDBObject) payment.get("documento");
                String paymentId = payment.getString("_id");
				if (paymentDoc.get("accControl") != null) {
				    if (paymentDoc.get("paymentType").equals("manual")){
                        BasicDBObject vendor = commons_db.obterCrudDoc("family", "_id", paymentDoc.getString("vendorId"));
                        if (vendor != null) {
                            paymentDoc.put("vendor", vendor.get("familyName"));
                        }
                        vendor = commons_db.obterCrudDoc("vendor", "_id", paymentDoc.getString("vendorId"));
                        if (vendor != null) {
                            paymentDoc.put("vendor", vendor.get("name"));
                        }
                        paymentDoc.put("studentName", "N/A");
                        payment.put("documento", paymentDoc);
                        ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                        BasicDBObject update = new BasicDBObject();
                        update.put("field", "documento");
                        update.put("value", paymentDoc);
                        arrayUpdate.add(update);
                        commons_db.atualizarCrud("payment", arrayUpdate, "_id", payment.getString("_id"));
                        if (payment != null) {
                            result.add(payment);
                        };
                    }else{
                        if (paymentDoc.get("accControl").equals("homestay") && commons.convertDateInt(paymentDoc.getString("lastDayPayment")) < commons.convertDateInt(commons.calcNewDate(paymentDoc.getString("lastDayPayment"), 28))) {
                            paymentDoc = calcPaymentHomestay(paymentDoc, payment.getString("_id"), baseDate, setQuery);
                            payment.put("documento", paymentDoc);
                            ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                            BasicDBObject update = new BasicDBObject();
                            update.put("field", "documento");
                            update.put("value", paymentDoc);
                            arrayUpdate.add(update);
                            commons_db.atualizarCrud("payment", arrayUpdate, "_id", payment.getString("_id"));
                            if (payment != null) {
                                result.add(payment);
                            };
                        }
                        String lastDayMonthBefore = commons.lastDayMonth(paymentDoc.getString("lastDayPayment"));
                        if (!paymentDoc.get("accControl").equals("homestay") && commons.convertDateInt(paymentDoc.getString("lastDayPayment")) < commons.convertDateInt(lastDayMonthBefore)) {
                            paymentDoc = calcPaymentDorms(paymentDoc, lastDayMonthBefore, payment.getString("_id"), setQuery);
                            payment.put("documento", paymentDoc);
                            ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                            BasicDBObject update = new BasicDBObject();
                            update.put("field", "documento");
                            update.put("value", paymentDoc);
                            arrayUpdate.add(update);
                            commons_db.atualizarCrud("payment", arrayUpdate, "_id", payment.getString("_id"));
                            if (payment != null) {
                                result.add(payment);
                            }
                        }
                    }
				}
			}
		}
		
		return result;
	}

    @SuppressWarnings({ "rawtypes", "unchecked"})
    public ArrayList<BasicDBObject> getProcessig(String userId, String cycleId) throws UnknownHostException {

        ArrayList result = new JSONArray();

        ResponseEntity response = commons_db.listaCrud("payment", "documento.cycleId", cycleId, userId, null, null, false);
        ArrayList<Object> payments = new ArrayList<Object>();
        payments = (JSONArray) response.getBody();


        BasicDBObject paymentCycle = new BasicDBObject();
        ArrayList  paymentsCycle = new ArrayList();
        paymentCycle = commons_db.obterCrudDoc("paymentCycles", "_id", cycleId);
        paymentsCycle = (ArrayList) paymentCycle.get("payments");

        if (response != null) {
            for (int i = 0; i < payments.size(); i++) {
                BasicDBObject payment = new BasicDBObject();
                payment.putAll((Map) payments.get(i));
                BasicDBObject paymentDoc = new BasicDBObject();
                paymentDoc = (BasicDBObject) payment.get("documento");
                String paymentId = payment.getString("_id");
                if (paymentDoc.get("accControl") != null) {
                    BasicDBObject vendor = commons_db.obterCrudDoc("family", "_id", paymentDoc.getString("vendorId"));
                    if (vendor != null) {
                        paymentDoc.put("vendor", vendor.get("familyName"));
                    }
                    vendor = commons_db.obterCrudDoc("vendor", "_id", paymentDoc.getString("vendorId"));
                    if (vendor != null) {
                        paymentDoc.put("vendor", vendor.get("name"));
                    }
                    if (paymentDoc.get("paymentType").equals("manual")) {
                        paymentDoc.put("studentName", "N/A");
                    }
                    if (paymentsCycle != null) {
                        for (int j = 0; j < paymentsCycle.size(); j++) {
                            BasicDBObject paymentCycleDoc = new BasicDBObject();
                            paymentCycleDoc.putAll((Map) paymentsCycle.get(j));
                            if (paymentCycleDoc.getString("id").equals(paymentId)) {
                                paymentDoc.put("payValue", paymentCycleDoc.getString("payValue"));
                                paymentDoc.put("startPaying", paymentCycleDoc.getString("startPaying"));
                                paymentDoc.put("endPaying", paymentCycleDoc.getString("endPaying"));
                                paymentDoc.put("payingDays", paymentCycleDoc.getString("payingDays"));
                            }
                        }
                    }
                    payment.put("documento", paymentDoc);
                    if (payment != null) {
                        result.add(payment);
                    };
                }
            }
        }

        return result;
    }

    private BasicDBObject calcPaymentHomestay(BasicDBObject paymentDoc, String paymentId, String baseDate, BasicDBObject setQuery) throws UnknownHostException {

	    BasicDBObject paymentCycle = new BasicDBObject();
        ArrayList  paymentsCycle = new ArrayList();

        if (setQuery.getString("documento.cycleId") != null) {
            paymentCycle = commons_db.obterCrudDoc("paymentCycles", "_id", setQuery.getString("documento.cycleId"));
            paymentsCycle = (ArrayList) paymentCycle.get("payments");
        }
        if (!paymentDoc.getString("paymentType").equals("manual")) {
            String startDate = paymentDoc.getString("start");
            String endDate = paymentDoc.getString("end");
            if (commons.convertDateInt(paymentDoc.getString("start")) < commons.convertDateInt(paymentDoc.getString("lastDayPayment"))) {
                startDate = paymentDoc.getString("lastDayPayment");
            }
            if (commons.convertDateInt(paymentDoc.getString("end")) > commons.convertDateInt(commons.calcNewDate(paymentDoc.getString("lastDayPayment"), 28))) {
                endDate = commons.calcNewDate(baseDate, 28);
            }
            int payedDays = Integer.parseInt(paymentDoc.getString("payedDays"));
            int days = Integer.parseInt(paymentDoc.getString("days"));
            int payDays = 0;
            if ((days - payedDays) > 28) {
                payedDays = payedDays + 28;
                payDays = 28;
            } else {
                payDays = days - payedDays;
                payedDays = days;
            }
            paymentDoc.put("payDays", String.valueOf(payDays));
            BigDecimal payValue = BigDecimal.valueOf(Double.parseDouble(paymentDoc.getString("totalAmount")) / Integer.parseInt(paymentDoc.getString("days")) * payDays);
            payValue = payValue.setScale(2, RoundingMode.CEILING);
            if (payedDays == days) {
                payValue = BigDecimal.valueOf(Double.parseDouble(paymentDoc.getString("totalAmount")) - Double.parseDouble(paymentDoc.getString("payedAmount")));
                payValue = payValue.setScale(2, RoundingMode.CEILING);
            }
            paymentDoc.put("sugestPayValue", payValue.toString());
            paymentDoc.put("sugestLastDatePayment", commons.calcNewDate(paymentDoc.getString("lastDayPayment"), 28));
            paymentDoc.put("startPayment", startDate);
            paymentDoc.put("endPayment", endDate);
        }else{
            paymentDoc.put("payDays", String.valueOf("0"));
            Double payValue = Double.parseDouble(paymentDoc.getString("totalAmount"));
            paymentDoc.put("sugestPayValue", Double.toString(payValue));
            paymentDoc.put("sugestLastDatePayment", commons.calcNewDate(paymentDoc.getString("lastDayPayment"), 28));
            paymentDoc.put("startPayment", paymentDoc.getString("start"));
            paymentDoc.put("endPayment", paymentDoc.getString("end"));
        }
        paymentDoc.put("payValue", "0.00");
        if (!paymentDoc.getString("paymentType").equals("manual")) {
            BasicDBObject product = commons_db.obterCrudDoc("priceTable", "_id", paymentDoc.getString("item"));
            paymentDoc.put("name", product.get("name"));
        }
        if (paymentDoc.get("vendorId") != ""){
            BasicDBObject vendor = commons_db.obterCrudDoc("family", "_id",paymentDoc.getString("vendorId"));
            if (vendor != null){
                paymentDoc.put("vendor", vendor.get("familyName"));
            }
            vendor = commons_db.obterCrudDoc("vendor", "_id",paymentDoc.getString("vendorId"));
            if (vendor != null){
                paymentDoc.put("vendor", vendor.get("name"));
            }
        }
        return paymentDoc;
    }

    private BasicDBObject calcPaymentDorms(BasicDBObject paymentDoc, String lastDayMonthBefore, String paymentId, BasicDBObject setQuery) throws UnknownHostException {

        BasicDBObject paymentCycle = new BasicDBObject();
        ArrayList  paymentsCycle = new ArrayList();

        if (setQuery.getString("documento.cycleId") != null) {
            paymentCycle = commons_db.obterCrudDoc("paymentCycles", "_id", setQuery.getString("documento.cycleId"));
            paymentsCycle = (ArrayList) paymentCycle.get("payments");
        }

        String startDate = paymentDoc.getString("start");
        String endDate = paymentDoc.getString("end");
        if (commons.convertDateInt(paymentDoc.getString("start")) < commons.convertDateInt(paymentDoc.getString("lastDayPayment"))) {
            startDate = paymentDoc.getString("lastDayPayment");
        }
        if (commons.convertDateInt(paymentDoc.getString("end")) > commons.convertDateInt(lastDayMonthBefore)) {
            endDate = commons.calcNewDate(commons.lastDayMonth(paymentDoc.getString("lastDayPayment")), 1);
        }
        int payDays = commons.difDate(startDate, endDate);
        int payedDays = Integer.parseInt(paymentDoc.getString("payedDays"));
        int days = Integer.parseInt(paymentDoc.getString("days"));
        paymentDoc.put("payDays", String.valueOf(payDays));
        BigDecimal payValue = BigDecimal.valueOf(Double.parseDouble(paymentDoc.getString("totalAmount")) / Integer.parseInt(paymentDoc.getString("days")) * payDays);
        payValue = payValue.setScale(2, RoundingMode.CEILING);
        if ((payedDays + payDays) == days) {
            payValue = BigDecimal.valueOf(Double.parseDouble(paymentDoc.getString("totalAmount")) - Double.parseDouble(paymentDoc.getString("payedAmount")));
        }
        paymentDoc.put("sugestPayValue", payValue.toString());
        paymentDoc.put("sugestLastDatePayment", commons.calcNewDate(commons.lastDayMonth(paymentDoc.getString("lastDayPayment")), 1));
        paymentDoc.put("startPayment", startDate);
        paymentDoc.put("endPayment", endDate);
        paymentDoc.put("payValue", "0.00");
        paymentDoc.put("name", payValue);
        BasicDBObject product = commons_db.obterCrudDoc("priceTable", "_id", paymentDoc.getString("item"));
        paymentDoc.put("name", product.get("name"));
        if (paymentDoc.get("vendorId") != "") {
            BasicDBObject vendor = commons_db.obterCrudDoc("family", "_id", paymentDoc.getString("vendorId"));
            if (vendor != null) {
                paymentDoc.put("vendor", vendor.get("familyName"));
            }
            vendor = commons_db.obterCrudDoc("vendor", "_id", paymentDoc.getString("vendorId"));
            if (vendor != null) {
                paymentDoc.put("vendor", vendor.get("name"));
            }
        }

        return paymentDoc;
    }

    @SuppressWarnings({ "rawtypes", "unchecked"})
	public BasicDBObject managementCostsBooking(String travelId) throws UnknownHostException {
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		BasicDBObject invoice = commons_db.obterCrudDoc("invoice", "documento.trip", travelId);

        BasicDBObject payments = new BasicDBObject();
		if (invoice != null && travel != null) {
			String studentId =  (String) travel.get("studentId");
			String invoiceId =  (String) invoice.get("_id");

            BasicDBObject setQuery = new BasicDBObject();
            setQuery.put("documento.status", "pending");
            setQuery.put("documento.travelId", travelId);
            setQuery.put("documento.payedAmount", "0.0");

			commons_db.removerCrud("payment", "documento.travelId" , travelId, setQuery);

			ArrayList<BasicDBObject> debits = atualizaPayment(travelId);
            BasicDBObject student = commons_db.obterCrudDoc("student", "_id", studentId);

			if (invoice.get("products") != null) {

				ArrayList<Object> products = new ArrayList<Object>();
				products = (ArrayList) invoice.get("products");

				for (int i = 0; i < products.size(); i++) {
					BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
					BasicDBObject product = new BasicDBObject();
					product.putAll((Map) products.get(i));
                    BasicDBObject productDoc = commons_db.obterCrudDoc("priceTable", "_id", product.getString("id"));
                    if (productDoc.getString("charging").equals("eNight") || productDoc.getString("charging").equals("week")) {
                        ArrayList<Object> vendors = new ArrayList<Object>();
                        ResponseEntity response = commons_db.listaCrud("homestayBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
                        ArrayList<Object> result = (ArrayList<Object>) response.getBody();
                        vendors = searchVendor(result, vendors, "family");
                        response = commons_db.listaCrud("sharedBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
                        result = (ArrayList<Object>) response.getBody();
                        vendors = searchVendor(result, vendors, "shared");
                        response = commons_db.listaCrud("suiteBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
                        result = (ArrayList<Object>) response.getBody();
                        vendors = searchVendor(result, vendors, "suite");
                        for (int j = 0; j < vendors.size(); j++) {
                            BasicDBObject vendor = new BasicDBObject();
                            vendor.putAll((Map) vendors.get(j));
                            BasicDBObject itemCost = new BasicDBObject();
                            itemCost.put("paymentType", "automatic");
                            itemCost.put("vendorType", vendor.get("type"));
                            itemCost.put("vendorId", vendor.get("vendorId"));
                            itemCost.put("accControl", travel.getString("accControl"));
                            itemCost.put("companyId", travel.getString("companyId"));
                            itemCost.put("studentId", studentId);
                            itemCost.put("studentName", student.getString("firstName") + " " + student.getString("lastName"));
                            itemCost.put("invoiceId", invoiceId);
                            itemCost.put("travelId", travelId);
                            itemCost.put("extension", "false");
                            itemCost.put("allocationId", vendor.get("allocationId"));
                            itemCost.put("status", "pending");
                            itemCost.put("debit", "false");
                            itemCost.put("totalDebit", "0.0");
                            itemCost.put("totalDaysDebit", "0");
                            itemCost.put("usedDebit", "0.0");
                            itemCost.put("usedDaysDebit", "0");
                            itemCost.put("payedAmount", "0.0");
                            itemCost.put("payedDays", "0");
                            itemCost.put("number", commons_db.getNumber("numberPayment", "yearNumberPayment"));
                            itemCost.put("destination", travel.get("destination"));
                            itemCost.put("controlDatePayment", vendor.getString("start").substring(0, 10));
                            JSONArray notes = new JSONArray();
                            itemCost.put("item", product.getString("id"));
                            ArrayList dates = (ArrayList) product.get("dates");
                            if (product.get("dates") != null) {
                                ArrayList<BasicDBObject> resultsInterval = calculaDaysVendor(dates, vendor.getString("start").substring(0, 10), vendor.getString("end").substring(0, 10));
                                for (BasicDBObject resultInterval: resultsInterval) {
                                    if (!resultInterval.getString("days").equals("0")) {
                                        itemCost.put("payedDays", "0");
                                        itemCost.put("payedAmount", "0.0");
                                        ArrayList<BasicDBObject> costs = priceTable.getCost(resultInterval.getString("start"), resultInterval.getString("end"), travelId, product.getString("id"), vendor.getString("vendorId"), invoice.getString("netGross"));
                                        for (BasicDBObject cost : costs) {
                                            itemCost.put("cost", cost.get("value"));
                                            itemCost.put("start", cost.getString("start").substring(0, 10));
                                            itemCost.put("end", cost.getString("end").substring(0, 10));
                                            int days = commons.difDate(cost.getString("start").substring(0, 10), cost.getString("end").substring(0, 10));
                                            itemCost.put("lastDayPayment", cost.getString("start").substring(0,10));
                                            if (commons.comparaData(cost.getString("start").substring(0,10), commons.calcNewDate(vendor.getString("start").substring(0, 10), 28) )){
                                                itemCost.put("controlDatePayment", cost.getString("start").substring(0,10));
                                            }
                                            itemCost.put("days", Integer.toString(days));
                                            double value = 0.0;
                                            if (cost.get("value") != null) {
                                                if (!cost.get("value").equals("")) {
                                                    value = Double.parseDouble(cost.getString("value"));
                                                }
                                            }
                                            BigDecimal amountValue = BigDecimal.valueOf(days * value);
                                            amountValue = amountValue.setScale(2, RoundingMode.CEILING);
                                            itemCost.put("itemAmount", amountValue.toString());
                                            itemCost.put("days", Integer.toString(days));
                                            itemCost.put("totalAmount", amountValue.toString());
                                            itemCost.put("notes", notes);
                                            int z = 0;
                                            for (BasicDBObject debit:debits) {
                                                if (debit.get("vendorId").equals(itemCost.get("vendorId"))){
                                                    if ( BigDecimal.valueOf(Double.valueOf(itemCost.getString("totalAmount"))).compareTo(BigDecimal.valueOf(Double.valueOf(debit.getString("totalDebit")) - Double.valueOf(debit.getString("usedDebit")))) < 0){
                                                        itemCost.put("payedAmount", itemCost.getString("totalAmount"));
                                                        itemCost.put("payedDays", itemCost.getString("days"));
                                                        itemCost.put("status", "payed");
                                                        debits.get(z).put("usedDebit", Double.toString(Double.valueOf(itemCost.getString("totalAmount"))) + Double.toString(Double.valueOf(debits.get(z).getString("usedDebit"))));
                                                        debits.get(z).put("usedDaysDebit", Integer.toString(Integer.valueOf(itemCost.getString("days")) + Integer.valueOf(debit.getString("usedDaysDebit"))));
                                                    }else{
                                                        itemCost.put("payedAmount", Double.toString(Double.valueOf(itemCost.getString("totalAmount")) - (Double.valueOf(debit.getString("totalDebit")) - Double.valueOf(debit.getString("usedDebit")))));
                                                        itemCost.put("payedDays", Integer.toString(Integer.valueOf(itemCost.getString("days")) - (Integer.valueOf(debit.getString("totalDaysDebit")) - Integer.valueOf(debit.getString("usedDaysDebit")))));
                                                        itemCost.put("status", "partialPayed");
                                                        debits.get(z).put("usedDebit", debit.getString("totalDebit"));
                                                        debits.get(z).put("usedDaysDebit", debit.getString("totalDaysDebit"));
                                                    }
                                                }
                                                z++;
                                            }
                                            for (BasicDBObject debit:debits) {
                                                String paymentId = debit.getString("_id");
                                                debit.remove("_id");
                                                ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                                                BasicDBObject update = new BasicDBObject();
                                                update.put("field", "documento");
                                                update.put("value", debit);
                                                arrayUpdate.add(update);
                                                response = commons_db.atualizarCrud("payment", arrayUpdate, "_id", paymentId);
                                            }
                                            if (value != 0.0 && amountValue.intValue() > 0) {
                                                itemCost.put("number", commons_db.getNumber("numberPayment", "yearNumberPayment"));
                                                commons_db.incluirCrud("payment", itemCost);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        BasicDBObject itemCost = new BasicDBObject();
                        itemCost.put("paymentType", "automatic");
                        itemCost.put("vendorType", "unique");
                        itemCost.put("vendorId", "");
                        itemCost.put("accControl", travel.getString("accControl"));
                        itemCost.put("studentId", studentId);
                        itemCost.put("invoiceId", invoiceId);
                        itemCost.put("travelId", travelId);
                        itemCost.put("extension", "false");
                        itemCost.put("allocationId", "");
                        itemCost.put("status", "pending");
                        itemCost.put("debit", "false");
                        itemCost.put("totalDebit", "0.0");
                        itemCost.put("totalDaysDebit", "0");
                        itemCost.put("usedDebit", "0.0");
                        itemCost.put("usedDaysDebit", "0");
                        itemCost.put("destination", travel.get("destination"));
                        itemCost.put("controlDatePayment", accomodation.getString("checkIn").substring(0,10));
                        itemCost.put("lastDayPayment", accomodation.getString("checkIn").substring(0,10));
                        JSONArray notes = new JSONArray();
                        itemCost.put("item", product.getString("id"));
                        ArrayList <BasicDBObject> costs = priceTable.getCost(accomodation.getString("checkIn").substring(0,10), accomodation.getString("checkOut").substring(0,10),travelId, product.getString("id"), null, invoice.getString("netGross"));
                        for (BasicDBObject cost:costs) {
                            itemCost.put("cost", cost.get("value"));
                            itemCost.put("start", cost.getString("start").substring(0,10));
                            itemCost.put("end", cost.getString("end").substring(0,10));
                            int days = commons.difDate(cost.getString("start").substring(0,10), cost.getString("end").substring(0,10));
                            itemCost.put("days", "1");
                            double value = 0.0;
                            if (cost.get("value") != null) {
                                if (!cost.get("value").equals("")) {
                                    value = Double.parseDouble(cost.getString("value"));
                                }
                            }
                            double amountValue = value;
                            itemCost.put("itemAmount", Double.toString(amountValue));
                            itemCost.put("totalAmount", Double.toString(amountValue));
                            itemCost.put("notes", notes);
                            itemCost.put("payedDays", "0");
                            itemCost.put("payedAmount", "0.0");
                            if (value != 0.0 && amountValue > 0) {
                                itemCost.put("number", commons_db.getNumber("numberPayment", "yearNumberPayment"));
                                commons_db.incluirCrud("payment", itemCost);
                            }
                        }

                    }
				}
			}
		}
		return payments;
	}

    private ArrayList<BasicDBObject> atualizaPayment(String travelId) throws UnknownHostException {

	    ResponseEntity response = commons_db.listaCrud("payments", "documento.trip", travelId, null, null, null, true);
        ArrayList<Object> payments = new ArrayList<Object>();
        payments = (JSONArray) response.getBody();
        ArrayList<BasicDBObject> debits = new ArrayList<BasicDBObject>();

        if (response != null) {
            for (int i = 0; i < payments.size(); i++) {
                BasicDBObject payment = new BasicDBObject();
                payment.putAll((Map) payments.get(i));
                BasicDBObject paymentDoc = new BasicDBObject();
                paymentDoc = (BasicDBObject) payment.get("documento");
                if (paymentDoc.getString("status").equals("processing")) {
                    removeCycle(payment.getString("_id"));
                    removeBank(payment.getString("_id"));
                }
                if (paymentDoc.getString("payedAmount").equals("0.0")) {
                    commons_db.removerCrud("payment", "_id", payment.getString("_id"), null);
                } else {
                    paymentDoc.put("_id", payment.get("_id"));
                    paymentDoc.put("debit", "true");
                    paymentDoc.put("totalDebit", paymentDoc.get("payedAmount"));
                    paymentDoc.put("totalDaysDebit", paymentDoc.get("payedDays"));
                    paymentDoc.put("usedDebit", "0.0");
                    paymentDoc.put("usedDaysDebit", "0");
                    payment.put("documento", paymentDoc);
                    ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                    BasicDBObject update = new BasicDBObject();
                    update.put("field", "documento");
                    update.put("value", payment);
                    arrayUpdate.add(update);
                    response = commons_db.atualizarCrud("payment", arrayUpdate, "_id", payment.getString("_id"));
                    debits.add(paymentDoc);
                }
            }
        }
        return debits;
    }

    private void removeBank(String paymentId) throws UnknownHostException {

        ResponseEntity response = commons_db.listaCrud("paymentCycle", "documento.payments", paymentId, null, null, null, true);
        ArrayList<Object> paymentsCycles = new ArrayList<Object>();
        paymentsCycles = (JSONArray) response.getBody();

        if (response != null) {
            for (int i = 0; i < paymentsCycles.size(); i++) {
                BasicDBObject paymentCycle = new BasicDBObject();
                paymentCycle.putAll((Map) paymentsCycles.get(i));
                BasicDBObject paymentCycleDoc = new BasicDBObject();
                paymentCycleDoc = (BasicDBObject) paymentCycle.get("documento");
                ArrayList<String> payments = (ArrayList<String>) paymentCycleDoc.get("payments");
                payments = commons.removeString(payments,paymentId);
                paymentCycleDoc.put("payments", payments);
                paymentCycle.put("documento",paymentCycleDoc);
                ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                BasicDBObject update = new BasicDBObject();
                update.put("field", "documento");
                update.put("value", paymentCycle);
                arrayUpdate.add(update);
                response = commons_db.atualizarCrud("paymentCycles", arrayUpdate, "_id", paymentCycle.getString("_id"));
            }
        }
    }

    private void removeCycle(String paymentId) throws UnknownHostException {

        ResponseEntity response = commons_db.listaCrud("paymentBank", "documento.payments", paymentId, null, null, null, true);
        ArrayList<Object> paymentsBank = new ArrayList<Object>();
        paymentsBank = (JSONArray) response.getBody();

        if (response != null) {
            for (int i = 0; i < paymentsBank.size(); i++) {
                BasicDBObject paymentBank = new BasicDBObject();
                paymentBank.putAll((Map) paymentsBank.get(i));
                BasicDBObject paymentBankDoc = new BasicDBObject();
                paymentBankDoc = (BasicDBObject) paymentBank.get("documento");
                ArrayList<String> payments = (ArrayList<String>) paymentBankDoc.get("payments");
                payments = commons.removeString(payments,paymentId);
                paymentBankDoc.put("payments", payments);
                paymentBank.put("documento",paymentBankDoc);
                ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
                BasicDBObject update = new BasicDBObject();
                update.put("field", "documento");
                update.put("value", paymentBank);
                arrayUpdate.add(update);
                response = commons_db.atualizarCrud("paymentBank", arrayUpdate, "_id", paymentBankDoc.getString("_id"));
            }
        }
    }

    private BasicDBObject checaPagamentosEfetuados(BasicDBObject itemCost) {

        return null;
    };

    public ArrayList calculaDaysVendor(ArrayList dates, String start, String end) {
        ArrayList result = new ArrayList();
		for (int i = 0; i < dates.size(); i++) {
			BasicDBObject date = new BasicDBObject();
			date.putAll((Map) dates.get(i));
			if (date.get("start") != null && date.get("end") != null) {
                if (!date.getString("start").equals("") && !date.getString("end").equals("")) {
                    BasicDBObject resultInterval = commons.getDaysInterval(start, end, date.getString("start"), date.getString("end"));
                    if (!resultInterval.getString("days").equals("0")) {
                        result.add(resultInterval);
                    }
                }
            }
		}
		return result;
	}


	@SuppressWarnings({"rawtypes" })
	private ArrayList<Object> searchVendor(ArrayList<Object> vendorArray, ArrayList<Object> resultOutput, String type) throws UnknownHostException {
		
		for (int i = 0; i < vendorArray.size(); i++) {
			BasicDBObject vendor = new BasicDBObject();
			vendor.putAll((Map) vendorArray.get(i));
			BasicDBObject vendorDoc = (BasicDBObject) vendor.get("documento");
            BasicDBObject vendorResult = new BasicDBObject();
            vendorResult.put("start", vendorDoc.getString("start"));
            vendorResult.put("end", vendorDoc.getString("end"));
            vendorResult.put("type", type);
            vendorResult.put("allocationId", vendor.getString("_id"));
			if (vendorDoc.getString("ativo").equals("ativo")) {
                vendorResult.put("vendorId", getVendorId(vendorDoc.getString("resource"), type));
                resultOutput.add(vendorResult);
			}
		}
		return resultOutput;
	}

    private String getVendorId(String resource, String type) throws UnknownHostException {

        if (type.equals("family")) {
            BasicDBObject dorm = commons_db.obterCrudDoc("familyDorm", "documento.id", resource);
            if (dorm != null) {
                BasicDBObject room = commons_db.obterCrudDoc("familyRooms", "_id", dorm.getString("roomId"));
                if (room != null && room.get("familyId") != null){
                    return room.getString("familyId");
                }
            }
        }
        if (type.equals("suite")) {
            BasicDBObject apartament = commons_db.obterCrudDoc("apartment", "documento.id", resource);
            if (apartament != null && apartament.get("vendorId") != null){
                return apartament.getString("vendorId");
            }
        }
        if (type.equals("shared")) {
            BasicDBObject dorm = commons_db.obterCrudDoc("dorm", "documento.id", resource);
            if (dorm != null) {
                BasicDBObject room = commons_db.obterCrudDoc("room", "_id", dorm.getString("roomId"));
                if (room != null) {
                    BasicDBObject apartment = commons_db.obterCrudDoc("apartment", "_id", room.getString("apartmentId"));
                    if (apartment != null && apartment.get("vendorId") != null) {
                        return apartment.getString("vendorId");
                    }
                }
            }
        }
        return null;

    }
}
