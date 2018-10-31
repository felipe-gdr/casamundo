package com.casamundo.bean;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;

public class Invoice {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();
	Payment payment = new Payment();
	Estimated estimated = new Estimated();

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Response incluir(BasicDBObject doc) throws UnknownHostException  {
				
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) doc);
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", documento.getString("trip"));
		BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
		BasicDBObject weeksDays = commons.numberWeeks(accomodation.getString("checkIn"), accomodation.getString("checkOut"));
		documento.put("weeks", weeksDays.get("weeks"));
		documento.put("extraNightsEntrada", weeksDays.get("extraNightsEntrada"));
		documento.put("extraNightsSaida", weeksDays.get("extraNightsSaida"));
		documento.put("checkIn", accomodation.get("checkIn"));
		documento.put("checkOut", accomodation.get("checkOut"));
		BasicDBObject numberWeeksDays = commons.numberWeeks(accomodation.getString("checkIn"), accomodation.getString("checkOut"));
		ArrayList<Object> products = (ArrayList<Object>) documento.get("products");
		ArrayList<Object> productsResult = new ArrayList<Object>();

		for (int i = 0; i < products.size(); i++) {
			BasicDBObject product = new BasicDBObject();
			product.putAll((Map) products.get(i));
			BasicDBObject productDoc = commons_db.obterCrudDoc("priceTable", "_id", product.getString("id"));
			ArrayList<Object> dates = new ArrayList<Object>();
			if (productDoc.getString("charging").equals("week")) {
				BasicDBObject date = new BasicDBObject();
				date.put("start", numberWeeksDays.get("startWeeks"));
				date.put("end", numberWeeksDays.get("endWeeks"));
				dates.add(date);
			}
			if (productDoc.getString("charging").equals("eNight")) {
				if (!weeksDays.get("extraNightsEntrada").equals("")) {
					BasicDBObject date = new BasicDBObject();
					date.put("start", numberWeeksDays.get("startExtraNightsEntrada"));
					date.put("end", numberWeeksDays.get("endExtraNightsEntrada"));
					dates.add(date);
				}				
				if (!weeksDays.get("extraNightsSaida").equals("")) {
					BasicDBObject date = new BasicDBObject();
					date.put("start", numberWeeksDays.get("startExtraNightsSaida"));
					date.put("end", numberWeeksDays.get("endExtraNightsSaida"));
					dates.add(date);
				}				
			}
			productDoc.put("dates", dates);
			productsResult.add(productDoc);
		}
		documento.put("products", productsResult);
		Response response = commons_db.incluirCrud("invoice", documento);
		if (response.getStatus() == 200) {
			String invoiceId = (String) response.getEntity();
			if (invoiceId != null) {
				estimated.criarCosts(invoiceId.toString());
			}
		};
		return response;

	};
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ArrayList calculaInvoiceAutomatica(@QueryParam("travelId") String travelId, @QueryParam("userId") String userId) throws UnknownHostException {

		
		if (travelId.equals(null)) {
			return null;
		}

		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		
		if (travel == null) {
			return null;
		}

		ArrayList<BasicDBObject> result = new ArrayList<BasicDBObject>();

		BasicDBObject item = new BasicDBObject();
		item.putAll((Map) travel.get("accomodation"));

		ArrayList<BasicDBObject> priceTableList = (ArrayList<BasicDBObject>) commons_db.listaCrud("priceTable", null, null, userId, null, null, false).getEntity();
		
		for (BasicDBObject priceTable : priceTableList) {
			ArrayList<BasicDBObject> priceTableValueList = (ArrayList<BasicDBObject>) commons_db.listaCrud("priceTableValue", "documento.idPriceTable", priceTable.getString("_id"), userId, null, null, false).getEntity();
			for (BasicDBObject priceTableValue : priceTableValueList) {
				System.out.println("valor:" + priceTableValue.getInt("value"));		
			}
			
		}
		
		return result;

	};
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void atualizarInvoice(String receivementId) throws UnknownHostException {
		

		BasicDBObject receivementAtu = commons_db.obterCrudDoc("receivement", "_id", receivementId);

		ArrayList<Object> invoices = new ArrayList<Object>();
		invoices = (ArrayList<Object>) receivementAtu.get("invoices");

		for (int i = 0; i < invoices.size(); i++) {
			BasicDBObject invoice = new BasicDBObject();
			invoice.putAll((Map) invoices.get(i));
			BasicDBObject invoiceObj = commons_db.obterCrudDoc("invoice", "_id", invoice.getString("id"));
			if (invoiceObj.get("netGross") != null && invoiceObj.get("total") != null ) {
				float total = Float.valueOf(invoiceObj.getString("total"));
				float valuePayedObj = 0;
				if (invoiceObj.get("valuePayed") != null) {
					valuePayedObj = Float.valueOf(invoiceObj.getString("valuePayed"));
				}
				float valuePayed = 0;
				if (invoice.get("valuePayed") != null) {
					valuePayed = Float.valueOf(invoice.getString("valuePayed"));
				}
				if ((valuePayedObj + valuePayed) >= total) {
					invoiceObj.put("valuePayed", Float.toString(total));
					invoiceObj.put("paid","paid");
				}else {
					valuePayedObj = valuePayedObj + valuePayed;						
					invoiceObj.put("valuePayed", Float.toString(valuePayedObj));
					invoiceObj.put("paid","partial");
				}
			}
			ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
			BasicDBObject update = new BasicDBObject(); 
			update.put("field", "documento");
			update.put("value", invoiceObj);
			arrayUpdate.add(update);
			commons_db.atualizarCrud("invoice", arrayUpdate, "_id", invoice.getString("id"));
		}
		String key = "";
		String value = "";
		String collection = "";
		
		if (receivementAtu.getString("agency") != null) {
			key = "documento.agency";
			value = receivementAtu.getString("agency");
			collection = "agency";
		}else {
			key = "documento.student";
			value = receivementAtu.getString("student");
			collection = "student";
		}
		Response response = commons_db.listaCrud("invoice", key, value, null, null, null, true);
		invoices = new ArrayList<Object>();
		invoices = (JSONArray) response.getEntity();

		float paidValueTotal = 0;
		if (response != null) {
			for (int i = 0; i < invoices.size(); i++) {
				BasicDBObject invoice = new BasicDBObject();
				invoice.putAll((Map) invoices.get(i));
				BasicDBObject invoiceObj = (BasicDBObject) invoice.get("documento");
				if (invoiceObj.get("valuePayed") != null) {
					paidValueTotal = paidValueTotal + Float.valueOf(invoiceObj.getString("valuePayed"));
				};
			}
		};

		float receiveValueTotal = 0;
		response = commons_db.listaCrud("receivement", key, value, null, null, null, true);
		ArrayList<Object> receivements = new ArrayList<Object>();
		receivements = (JSONArray) response.getEntity();

		if (response != null) {
			for (int i = 0; i < receivements.size(); i++) {
				BasicDBObject receivement = new BasicDBObject();
				receivement.putAll((Map) receivements.get(i));
				BasicDBObject receivementObj = (BasicDBObject) receivement.get("documento");
				if (receivementObj.get("amount") != null) {
					receiveValueTotal = receiveValueTotal + Float.valueOf(receivementObj.getString("amount"));
				};
			}
		};
		
		float balance = 0;
		if (receiveValueTotal > paidValueTotal) {
			balance = receiveValueTotal - paidValueTotal;
		};
		ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
		BasicDBObject update = new BasicDBObject(); 
		update.put("field", "balance");
		update.put("value", Float.toString(balance));
		arrayUpdate.add(update);
		commons_db.atualizarCrud(collection, arrayUpdate, "_id", value);
		
	};

}
