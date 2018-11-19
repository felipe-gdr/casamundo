package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class Payment {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();

	public JSONArray listaPayment(String date, String occHome, String userId ) throws UnknownHostException {
		
		BasicDBObject setQuery = new BasicDBObject();
		BasicDBObject setSort = new BasicDBObject();
		setSort.put("documento.lastDayPayment", -1);
		setQuery.put("documento.occHome", occHome);
		BasicDBObject setCondition = new BasicDBObject();
		int daysPeriodStart = -20;
		int daysPeriodEnd = -5;
		if (!occHome.equals("homestay")) {
			daysPeriodStart = -50;
			daysPeriodEnd = -20;
		}
		if (commons.getMonth(date) == 4 || commons.getMonth(date) == 6 || commons.getMonth(date) == 8 || commons.getMonth(date) == 9 || commons.getMonth(date) == 11) {
			daysPeriodStart++;
			daysPeriodEnd++;				
		}
		if (commons.getMonth(date) == 3) {
			if (commons.anoBissexto(date)) {
				daysPeriodStart--;
				daysPeriodEnd++;				
			}else {
				daysPeriodStart = daysPeriodStart - 2;
				daysPeriodEnd = daysPeriodEnd - 2;								
			}
		}
		setCondition.put("$gte", commons.calcNewDate(date, daysPeriodStart));
		setCondition.put("$lte", commons.calcNewDate(date, daysPeriodEnd));			
		setQuery.put("documento.lastDayPayment", setCondition);

		setQuery.put("documento.extension", "false");
		
		JSONArray result = new JSONArray();
		result = getPayments(userId, setQuery, setSort, result);

		setQuery.put("documento.extension", "true");
		
		daysPeriodStart = daysPeriodStart - 5;
		daysPeriodEnd = daysPeriodEnd - 5;								
		setCondition.put("$gte", commons.calcNewDate(date, daysPeriodStart));
		setCondition.put("$lte", commons.calcNewDate(date, daysPeriodEnd));			
		setQuery.put("documento.lastDayPayment", setCondition);
		
		result = getPayments(userId, setQuery, setSort, result);
		
		return result;

	}	
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public JSONArray getPayments(String userId, BasicDBObject setQuery, BasicDBObject setSort, JSONArray result) throws UnknownHostException {

		ResponseEntity response = commons_db.listaCrud("payment", null, null, userId, setQuery, setSort, false);
		ArrayList<Object> payments = new ArrayList<Object>();
		payments = (JSONArray) response.getBody();

		if (response != null) {
			for (int i = 0; i < payments.size(); i++) {
				BasicDBObject payment = new BasicDBObject();
				payment.putAll((Map) payments.get(i));
				BasicDBObject paymentDoc = new BasicDBObject();
				paymentDoc = (BasicDBObject) payment.get("documento");
				if (paymentDoc.get("occHome") != null) {
					if (paymentDoc.get("occHome").equals("homestay")) {
						int paymentDays = commons.difDate(paymentDoc.getString("start"), paymentDoc.getString("end"));
						int payedDays = payment.getInt("payedDays");
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
						paymentDoc.put("payValue", payValue);
						payment.put("documento", paymentDoc);
						if (payment != null) {
							result.add(payment);
						};
					}					
				}
			}
		}
		
		return result;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void managementCostsBooking(String travelId) throws UnknownHostException {
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		BasicDBObject invoice = commons_db.obterCrudDoc("invoice", "documento.trip", travelId);
		
		if (invoice != null && travel != null) {
			System.out.println("achou invoice");
			String studentId =  (String) travel.get("studentId");
			String invoiceId =  (String) invoice.get("_id");
	
			commons_db.removerCrud("payment", "documento.travelId" , travelId, null);
			
			if (invoice.get("products") != null) {
				System.out.println("achou produto");
				
				ArrayList<Object> products = new ArrayList<Object>();
				products = (ArrayList) invoice.get("products");

				for (int i = 0; i < products.size(); i++) {
					System.out.println("tem produto");
					BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
					BasicDBObject product = new BasicDBObject();
					product.putAll((Map) products.get(i));
                    BasicDBObject productDoc = commons_db.obterCrudDoc("priceTable", "_id", product.getString("id"));
                    if (productDoc.getString("charging").equals("eNight") || productDoc.getString("charging").equals("week")) {
                        ArrayList<Object> vendors = new ArrayList<Object>();
                        ResponseEntity response = commons_db.listaCrud("homestayBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
                        ArrayList<Object> result = (ArrayList<Object>) response.getBody();
                        vendors = searchVendor(result, vendors, travel, "familyId", "familyDorm", "familyRooms", "family");
                        response = commons_db.listaCrud("sharedBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
                        result = (ArrayList<Object>) response.getBody();
                        vendors = searchVendor(result, vendors, travel, "vendorId", "dorm", "room", "shared");
                        response = commons_db.listaCrud("suiteBook", "documento.studentId", travel.getString("_id"), null, null, null, true);
                        result = (ArrayList<Object>) response.getBody();
                        vendors = searchVendor(result, vendors, travel, "vendorId", "dorm", "room", "suite");
                        for (int j = 0; j < vendors.size(); j++) {
                            System.out.println("achou alocacoes");
                            BasicDBObject vendor = new BasicDBObject();
                            vendor.putAll((Map) vendors.get(j));
                            BasicDBObject itemCost = new BasicDBObject();
                            itemCost.put("paymentType", "automatic");
                            itemCost.put("vendorType", vendor.get("type"));
                            itemCost.put("vendorId", vendor.get("vendorId"));
                            itemCost.put("occHome", accomodation.getString("occHome"));
                            itemCost.put("studentId", studentId);
                            itemCost.put("invoiceId", invoiceId);
                            itemCost.put("travelId", travelId);
                            itemCost.put("allocationId", vendor.get("allocationId"));
                            itemCost.put("status", "to approve");
                            itemCost.put("number", commons_db.getNumber("numberPayment", "yearNumberPayment"));
                            itemCost.put("destination", travel.get("destination"));
                            itemCost.put("lastDayPayment", vendor.getString("start"));
                            if (vendor.get("extension") != null) {
                                if (vendor.getString("extension").equals("true")) {
                                    itemCost.put("lastDayPayment", commons.calcNewDate(vendor.getString("start"), -5));
                                }
                            }
                            JSONArray notes = new JSONArray();
                            itemCost.put("item", product.getString("id"));
                            ArrayList dates = (ArrayList) product.get("dates");
                            BasicDBObject resultInterval = calculaDaysVendor(dates, vendor.getString("start"), vendor.getString("end"));
                            int days = resultInterval.getInt("days");
                            itemCost.put("start", resultInterval.getString("start"));
                            itemCost.put("end", resultInterval.getString("end"));
                            itemCost.put("days", Integer.toString(days));
                            itemCost.put("payedDays", "0");
                            itemCost.put("payedAmount", "0.0");
                            System.out.println("Procura custo");
                            BasicDBObject cost = priceTable.getCost(travelId, product.getString("id"), vendor.getString("vendorId"));
                            itemCost.put("cost", cost.get("value"));
                            double value = 0.0;
                            if (cost.get("value") != null) {
                                if (!cost.get("value").equals("")) {
                                    value = Double.parseDouble(cost.getString("value"));
                                }
                            }
                            double amountValue = days * value;
                            itemCost.put("itemAmount", Double.toString(amountValue));
                            itemCost.put("days", Integer.toString(days));
                            System.out.println("valor payment" + Double.toString(amountValue));
                            System.out.println("criar payment");
                            itemCost.put("totalAmount", Double.toString(amountValue));
                            itemCost.put("notes", notes);
                            if (value != 0.0 && amountValue > 0) {
                                commons_db.incluirCrud("payment", itemCost);
                            }
                        }
                    }
				}
			}
		}
	}

	public BasicDBObject calculaDaysVendor(ArrayList dates, String start, String end) {
        BasicDBObject result = new BasicDBObject();
        result.put ("days",0);
        result.put("start", start);
        result.put("end",end);
        int days = 0;
		for (int i = 0; i < dates.size(); i++) {
			BasicDBObject date = new BasicDBObject();
			date.putAll((Map) dates.get(i));
			if (date.get("start") != null && date.get("end") != null) {
                if (!date.getString("start").equals("") && !date.getString("end").equals("")) {
                    BasicDBObject resultInterval = commons.getDaysInterval(start, end, date.getString("start"), date.getString("end"));
                    if (resultInterval.getInt("days") != 0) {
                        result.put("start", resultInterval.getString("start").substring(0, 10));
                        result.put("end", resultInterval.getString("end").substring(0, 10));
                        days = days + resultInterval.getInt("days");
                    }
                }
            }
		}
        result.put("days",days);
		return result;
	}


	@SuppressWarnings({"rawtypes" })
	private ArrayList<Object> searchVendor(ArrayList<Object> vendorArray, ArrayList<Object> resultOutput, BasicDBObject travel, String nameId, String collectionDorm, String collectionRoom, String type) throws UnknownHostException {
		
		for (int i = 0; i < vendorArray.size(); i++) {
			BasicDBObject vendor = new BasicDBObject();
			vendor.putAll((Map) vendorArray.get(i));
			BasicDBObject vendorDoc = (BasicDBObject) vendor.get("documento");
			if (vendorDoc.getString("ativo").equals("ativo")) {
				BasicDBObject vendorResult = new BasicDBObject();
				BasicDBObject dorm = commons_db.obterCrudDoc(collectionDorm, "documento.id", vendorDoc.getString("resource"));
				if (dorm != null) {
					BasicDBObject room = commons_db.obterCrudDoc(collectionRoom, "_id", dorm.getString("roomId"));
					if (room != null) {
						vendorResult.put("vendorId", room.getString(nameId));
						vendorResult.put("start", vendorDoc.getString("start"));
						vendorResult.put("end", vendorDoc.getString("end"));
						vendorResult.put("type", type);
                        vendorResult.put("allocationId", vendor.getString("_id"));
						resultOutput.add(vendorResult);
					};
				};
			};
		};
		return resultOutput;
	};
}
