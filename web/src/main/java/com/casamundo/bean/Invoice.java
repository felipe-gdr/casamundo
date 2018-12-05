package com.casamundo.bean;

import com.casamundo.calculator.FormulaCalculator;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class Invoice {

    private Commons commons;
    private Commons_DB commons_db;
	private PriceTable priceTable;
    private Payment payment;
    private Estimated estimated;

    public Invoice() {
        commons_db = new Commons_DB();
        commons = new Commons();
        priceTable = new PriceTable();
        payment = new Payment();
        estimated = new Estimated();
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
	public ResponseEntity incluir(BasicDBObject doc) throws UnknownHostException  {
				
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) doc);
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", documento.getString("trip"));
		BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");

		if (travel.get("accomodation") != null){
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
				ArrayList<BasicDBObject> seasons = new ArrayList<>();
				if (productDoc.getString("charging").equals("week") && numberWeeksDays.get("startWeeks") != "") {
					seasons = priceTable.getSeasons(numberWeeksDays.get("startWeeks").toString(), numberWeeksDays.get("endWeeks").toString(), documento.getString("trip"), product.getString("id"), null);
					for (BasicDBObject season : seasons) {
						BasicDBObject date = new BasicDBObject();
						date.put("start", season.getString("start"));
						date.put("end", season.getString("end"));
						dates.add(date);
					}
				}
				if (productDoc.getString("charging").equals("eNight") && numberWeeksDays.get("startExtraNightsEntrada") != "") {
					if (!weeksDays.get("extraNightsEntrada").equals("")) {
						seasons = priceTable.getSeasons(numberWeeksDays.get("startExtraNightsEntrada").toString(), numberWeeksDays.get("endExtraNightsEntrada").toString(), documento.getString("trip"), product.getString("id"), null);
						for (BasicDBObject season : seasons) {
							BasicDBObject date = new BasicDBObject();
							date.put("start", season.getString("start"));
							date.put("end", season.getString("end"));
							dates.add(date);
						}
					}
				}
				if (productDoc.getString("charging").equals("eNight") && numberWeeksDays.get("startExtraNightsSaida") != "") {
					if (!weeksDays.get("extraNightsSaida").equals("") && numberWeeksDays.get("startExtraNightsSaida") != "") {
						seasons = priceTable.getSeasons(numberWeeksDays.get("startExtraNightsSaida").toString(), numberWeeksDays.get("endExtraNightsSaida").toString(), documento.getString("trip"), product.getString("id"), null);
						for (BasicDBObject season : seasons) {
							BasicDBObject date = new BasicDBObject();
							date.put("start", season.getString("start"));
							date.put("end", season.getString("end"));
							dates.add(date);
						}
					}
				}
                if (productDoc.getString("charging").equals("unique")) {
                    seasons = priceTable.getSeasons(accomodation.getString("checkIn"), accomodation.getString("checkOut"), documento.getString("trip"), product.getString("id"), null);
                    for (BasicDBObject season : seasons) {
                        BasicDBObject date = new BasicDBObject();
                        date.put("start", season.getString("start"));
                        date.put("end", season.getString("end"));
                        dates.add(date);
                    }
                }
				product.put("dates", dates);
				productsResult.add(product);
			}
            documento.put("products", productsResult);
            ResponseEntity response = commons_db.incluirCrud("invoice", documento);
            if (response.getStatusCode() == HttpStatus.OK) {
                String invoiceId = (String) response.getBody();
                if (invoiceId != null) {
                    estimated.criarCosts(productsResult, documento.getString("trip"), invoiceId);
                    payment.managementCostsBooking(documento.getString("trip"));
                }
            };
            return response;
		}

		return null;

	};

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ArrayList calculaInvoiceAutomatica(String travelId, String userId) throws IOException  {


		if (travelId.equals(null)) {
			return null;
		}
        BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
        BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");

        BasicDBObject numberWeeksDays = commons.numberWeeks(accomodation.getString("checkIn"), accomodation.getString("checkOut"));

		ArrayList<BasicDBObject> resultArray = new ArrayList<BasicDBObject>();

		ArrayList<BasicDBObject> priceTableList = (ArrayList<BasicDBObject>) commons_db.listaCrud("priceTable", null,
				null, userId, null, null, false).getBody();
		
		for (BasicDBObject product : priceTableList) {
            BasicDBObject productDoc = (BasicDBObject) product.get("documento");
            ArrayList<BasicDBObject> dates = new ArrayList<BasicDBObject>();
            ArrayList <BasicDBObject> seasons = new ArrayList<>();
            if (productDoc.getString("charging").equals("week") && numberWeeksDays.get("startWeeks") != "") {
                seasons = priceTable.getSeasons(numberWeeksDays.get("startWeeks").toString(),numberWeeksDays.get("endWeeks").toString(), travelId,product.getString("_id"),null);
                for (BasicDBObject season:seasons) {
                    BasicDBObject date = new BasicDBObject();
                    date.put("start", season.getString("start"));
                    date.put("end", season.getString("end"));
                    date.put("value", season.getString("value"));
                    dates.add(date);
                }
            }
            if (productDoc.getString("charging").equals("eNight") && numberWeeksDays.get("startExtraNightsEntrada") != "") {
                if (!numberWeeksDays.get("extraNightsEntrada").equals("")) {
                    seasons = priceTable.getSeasons(numberWeeksDays.get("startExtraNightsEntrada").toString(), numberWeeksDays.get("endExtraNightsEntrada").toString(), travelId, product.getString("id"), null);
                    for (BasicDBObject season : seasons) {
                        BasicDBObject date = new BasicDBObject();
                        date.put("start", season.getString("start"));
                        date.put("end", season.getString("end"));
                        date.put("value", season.getString("value"));
                        dates.add(date);
                    }
                }
            }
            if (productDoc.getString("charging").equals("eNight") && numberWeeksDays.get("startExtraNightsSaida") != "") {
                if (!numberWeeksDays.get("extraNightsSaida").equals("") && numberWeeksDays.get("startExtraNightsSaida") != "") {
                    seasons = priceTable.getSeasons(numberWeeksDays.get("startExtraNightsSaida").toString(),numberWeeksDays.get("endExtraNightsSaida").toString(), travelId,product.getString("id"),null);
                    for (BasicDBObject season:seasons) {
                        BasicDBObject date = new BasicDBObject();
                        date.put("start", season.getString("start"));
                        date.put("end", season.getString("end"));
                        date.put("value", season.getString("value"));
                        dates.add(date);
                    }
                }
            };
            BasicDBObject variaveis = (BasicDBObject) travel.get("accomodation");
            for (BasicDBObject date:dates) {
                if (productDoc.getString("charging").equals("eNight")) {
                    int days = commons.difDate(date.getString("start"), date.getString("end"));
                    variaveis.put("extraNights", Integer.toString(days));
                }else{
                    variaveis.put("extraNights", "0");
                }
                if (productDoc.getString("charging").equals("week")) {
                    int weeks = commons.difDate(date.getString("start"), date.getString("end")) / 7;
                    int days = commons.difDate(date.getString("start"), date.getString("end")) % 7;
                    if  (days > 3){
                        weeks++;
                    }
                    variaveis.put("weeks", Integer.toString(weeks));
                }else{
                    variaveis.put("weeks", "0");
                }
                variaveis.put("value", date.get("value"));
                Double value = 0.0;
                if (productDoc.get("formula") != null ) {
                    Map<String, Object> variables = variaveis;
                    value = new FormulaCalculator(productDoc.getString("formula"), variables).calculate();
                }
                if (value != 0.0) {
                    productDoc.put("date", date);
                    productDoc.put("extraNights", variaveis.getString("extraNights"));
                    productDoc.put("weeks", variaveis.getString("weeks"));
                    productDoc.put("value", value);
                    resultArray.add(product);
                }

            }
		}
		
		return resultArray;

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
            ArrayList<Object> products = new ArrayList<Object>();
            products = (ArrayList) invoice.get("products");
            estimated.criarCosts(products, invoice.getString("trip"), invoice.getString("id"));
            payment.managementCostsBooking(invoice.getString("trip"));
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
		ResponseEntity response = commons_db.listaCrud("invoice", key, value, null, null, null, true);
		invoices = new ArrayList<Object>();
		invoices = (JSONArray) response.getBody();

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
		receivements = (JSONArray) response.getBody();

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
