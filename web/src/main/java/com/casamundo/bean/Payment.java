package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

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
		setSort.put("documento.lastDayPayment", -1);
		setQuery.put("documento.accControl", accControl);
		BasicDBObject setCondition = new BasicDBObject();
        int daysPeriodStart = 0;
        int daysPeriodEnd = 0;
		if (date != null) {
            daysPeriodStart = -19;
            daysPeriodEnd = -5;
            if (!accControl.equals("homestay")) {
                daysPeriodStart = commons.convertDateInt(commons.setDay(commons.calcNewMonth(date,-1),"01"));
                daysPeriodEnd = commons.convertDateInt(commons.lastDayMonth(commons.calcNewMonth(date, -1)));
            }
            if (commons.getDay(date) < 19){
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
            setCondition.put("$gte", "1900-01-01");
            setCondition.put("$lte", "9999-12-31");
        }
		setQuery.put("documento.lastDayPayment", setCondition);

		setQuery.put("documento.extension", "false");
        setQuery.put("documento.status", "pending");

		ArrayList result = new JSONArray();
		result = getPayments(userId, setQuery, setSort, result, date);

		setQuery.put("documento.extension", "true");
		
		daysPeriodStart = daysPeriodStart - 5;
		daysPeriodEnd = daysPeriodEnd - 5;
        if (date != null) {
            setCondition.put("$gte", commons.calcNewDate(date, daysPeriodStart));
            setCondition.put("$lte", commons.calcNewDate(date, daysPeriodEnd));
        }
		setQuery.put("documento.lastDayPayment", setCondition);

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
                    if (paymentDoc.get("accControl").equals("homestay")) {
                        paymentDoc = calcPaymentHomestay(paymentDoc, payment.getString("_id"), date);
                        payment.put("documento", paymentDoc);
                        result.add(payment);
                    }
                    String lastDayMonthBefore = commons.lastDayMonth(paymentDoc.getString("lastDayPayment"));
                    if (!paymentDoc.get("accControl").equals("homestay")) {
                        paymentDoc = calcPaymentDorms(paymentDoc, lastDayMonthBefore, payment.getString("_id"));
                        payment.put("documento", paymentDoc);
                        result.add(payment);
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
					if (paymentDoc.get("accControl").equals("homestay") && commons.convertDateInt(paymentDoc.getString("start")) < commons.convertDateInt(commons.calcNewDate(paymentDoc.getString("lastDayPayment"), 28))) {
                        paymentDoc = calcPaymentHomestay(paymentDoc, payment.getString("_id"), baseDate);
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
                    if (!paymentDoc.get("accControl").equals("homestay") && commons.convertDateInt(paymentDoc.getString("start")) < commons.convertDateInt(lastDayMonthBefore)) {
                        paymentDoc = calcPaymentDorms(paymentDoc, lastDayMonthBefore, payment.getString("_id"));
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
		
		return result;
	}

    private BasicDBObject calcPaymentHomestay(BasicDBObject paymentDoc, String paymentId, String baseDate) throws UnknownHostException {

	    BasicDBObject paymentCycle = new BasicDBObject();
        ArrayList  paymentsCycle = new ArrayList();

        BasicDBObject setQuery =  new BasicDBObject();
        if (setQuery.getString("documento.cycleId") != null) {
            paymentCycle = commons_db.obterCrudDoc("paymentCycles", "_id", setQuery.getString("documento.cycleId"));
            paymentsCycle = (ArrayList) paymentCycle.get("payments");
        }
        String startDate = paymentDoc.getString("start");
        String endDate = paymentDoc.getString("end");
        if (commons.convertDateInt(paymentDoc.getString("start")) < commons.convertDateInt(paymentDoc.getString("lastDayPayment"))) {
            startDate = paymentDoc.getString("lastDayPayment");
        }
        if (commons.convertDateInt(paymentDoc.getString("end")) > commons.convertDateInt(commons.calcNewDate(paymentDoc.getString("lastDayPayment"), 28))){
            endDate = commons.calcNewDate(baseDate, 28);
        }
        int paymentDays = commons.difDate(startDate, endDate);
        int payedDays = Integer.parseInt(paymentDoc.getString("payedDays"));
        int payDays = 0;
        if ((paymentDays - payedDays) > 28) {
            payedDays = payedDays + 28;
            payDays = 28;
        }else {
            payDays = paymentDays - payedDays;
        }
        paymentDoc.put("payDays", payDays);
        Double payValue = (Double.parseDouble(paymentDoc.getString("totalAmount")) / Integer.parseInt(paymentDoc.getString("days")) * payDays);
        if ((payedDays + payDays)  == paymentDays ) {
            payValue = Double.parseDouble(paymentDoc.getString("totalAmount")) - Double.parseDouble(paymentDoc.getString("payedAmount"));
        }
        paymentDoc.put("sugestPayValue", payValue);
        paymentDoc.put("sugestLastDatePayment", commons.calcNewDate(paymentDoc.getString("lastDayPayment"), 28));
        paymentDoc.put("payValue", "0.00");
        if (setQuery.getString("documento.cycleId") != null) {
            for (int j = 0; j < paymentsCycle.size() ; j++) {
                BasicDBObject paymentCycleDoc = new BasicDBObject();
                paymentCycleDoc.putAll((Map) paymentsCycle.get(j));
                if (paymentCycleDoc.getString("id").equals(paymentId)){
                    paymentDoc.put("payValue", paymentCycleDoc.getString("payValue"));
                }
            }
        }
        paymentDoc.put("payValue", paymentDoc.get("payValue"));
        paymentDoc.put("name", payValue);
        BasicDBObject product = commons_db.obterCrudDoc("priceTable", "_id",paymentDoc.getString("item"));
        paymentDoc.put("name", product.get("name"));
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

    private BasicDBObject calcPaymentDorms(BasicDBObject paymentDoc, String lastDayMonthBefore, String paymentId) throws UnknownHostException {

        BasicDBObject paymentCycle = new BasicDBObject();
        ArrayList  paymentsCycle = new ArrayList();

        BasicDBObject setQuery =  new BasicDBObject();
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
            endDate = commons.lastDayMonth(paymentDoc.getString("lastDayPayment"));
        }
        int paymentDays = commons.difDate(startDate, endDate);
        int payedDays = Integer.parseInt(paymentDoc.getString("payedDays"));
        int payDays = paymentDays - payedDays;
        paymentDoc.put("payDays", payDays);
        Double payValue = (Double.parseDouble(paymentDoc.getString("totalAmount")) / Integer.parseInt(paymentDoc.getString("days")) * payDays);
        if ((payedDays + payDays) == paymentDays) {
            payValue = Double.parseDouble(paymentDoc.getString("totalAmount")) - Double.parseDouble(paymentDoc.getString("payedAmount"));
        }
        paymentDoc.put("sugestPayValue", payValue);
        paymentDoc.put("sugestLastDatePayment", commons.lastDayMonth(paymentDoc.getString("lastDayPayment")));
        paymentDoc.put("payValue", "0.00");
        if (setQuery.getString("documento.cycleId") != null) {
            for (int j = 0; j < paymentsCycle.size(); j++) {
                BasicDBObject paymentCycleDoc = new BasicDBObject();
                paymentCycleDoc.putAll((Map) paymentsCycle.get(j));
                if (paymentCycleDoc.getString("id").equals(paymentId)) {
                    paymentDoc.put("payValue", paymentCycleDoc.getString("payValue"));
                }
            }
        }
        paymentDoc.put("payValue", paymentDoc.get("payValue"));
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

			commons_db.removerCrud("payment", "documento.travelId" , travelId, setQuery);

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
                            itemCost.put("number", commons_db.getNumber("numberPayment", "yearNumberPayment"));
                            itemCost.put("destination", travel.get("destination"));
                            itemCost.put("lastDayPayment", vendor.getString("start").substring(0,10));
                            if (vendor.get("extension") != null) {
                                if (vendor.getString("extension").equals("true")) {
                                    itemCost.put("lastDayPayment", commons.calcNewDate(vendor.getString("start").substring(0,10), -5));
                                }
                            }
                            JSONArray notes = new JSONArray();
                            itemCost.put("item", product.getString("id"));
                            ArrayList dates = (ArrayList) product.get("dates");
                            if (product.get("dates") != null) {
                                ArrayList<BasicDBObject> resultsInterval = calculaDaysVendor(dates, vendor.getString("start").substring(0, 10), vendor.getString("end").substring(0, 10));
                                for (BasicDBObject resultInterval: resultsInterval) {
                                    if (!resultInterval.getString("days").equals("0")) {
                                        itemCost.put("payedDays", "0");
                                        itemCost.put("payedAmount", "0.0");
                                        ArrayList<BasicDBObject> costs = priceTable.getCost(resultInterval.getString("start"), resultInterval.getString("end"), travelId, product.getString("id"), vendor.getString("vendorId"));
                                        for (BasicDBObject cost : costs) {
                                            itemCost.put("cost", cost.get("value"));
                                            itemCost.put("start", cost.getString("start").substring(0, 10));
                                            itemCost.put("end", cost.getString("end").substring(0, 10));
                                            int days = commons.difDate(cost.getString("start").substring(0, 10), cost.getString("end").substring(0, 10));
                                            itemCost.put("days", Integer.toString(days));
                                            double value = 0.0;
                                            if (cost.get("value") != null) {
                                                if (!cost.get("value").equals("")) {
                                                    value = Double.parseDouble(cost.getString("value"));
                                                }
                                            }
                                            double amountValue = days * value;
                                            itemCost.put("itemAmount", Double.toString(amountValue));
                                            itemCost.put("days", Integer.toString(days));
                                            itemCost.put("totalAmount", Double.toString(amountValue));
                                            itemCost.put("notes", notes);
                                            if (value != 0.0 && amountValue > 0) {
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
                        itemCost.put("destination", travel.get("destination"));
                        itemCost.put("lastDayPayment", accomodation.getString("checkIn").substring(0,10));
                        JSONArray notes = new JSONArray();
                        itemCost.put("item", product.getString("id"));
                        ArrayList <BasicDBObject> costs = priceTable.getCost(accomodation.getString("checkIn").substring(0,10), accomodation.getString("checkOut").substring(0,10),travelId, product.getString("id"), null);
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
                    int days = commons.difDate(date.getString("start").substring(0, 10), date.getString("end").substring(0, 10));
                    resultInterval.put("start", date.getString("start").substring(0, 10));
                    resultInterval.put("end",date.getString("end").substring(0, 10));
                    resultInterval.put("days",days);
                    result.add(resultInterval);
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
