package com.casamundo.bean;

import com.casamundo.calculator.FormulaCalculator;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.boot.env.SystemEnvironmentPropertySourceEnvironmentPostProcessor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
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
	public ResponseEntity incluir(BasicDBObject doc, MongoClient mongo) throws UnknownHostException {

        BasicDBObject documento = new BasicDBObject();
        documento.putAll((Map) doc);

        documento = completaCampos(documento, mongo);

        ResponseEntity response = commons_db.incluirCrud("invoice", documento, mongo);
        String invoiceId = "";

        if (response.getStatusCode() == HttpStatus.OK) {
            invoiceId = (String) response.getBody();
            if (invoiceId != null) {
                ArrayList<Object> productsResult = new ArrayList<Object>();
                productsResult = (ArrayList) documento.get("products");
                estimated.criarCosts(productsResult, documento.getString("trip"), invoiceId, mongo);
                if (documento.get("typeInvoice") != null){
                    if (documento.getString("typeInvoice").equals("invoice")) {
                        payment.managementCostsBooking(documento.getString("trip"), invoiceId, false, false, mongo);
                    }
                }else{
                        payment.managementCostsBooking(documento.getString("trip"), invoiceId,  false, false, mongo);
                }
            }
        }
        return response;
    }

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ResponseEntity atualiza(JSONObject queryParam, Boolean atualiza, Boolean book, MongoClient mongo) throws UnknownHostException  {


		BasicDBObject documento = commons_db.obterCrudDoc("invoice","_id",queryParam.get("value").toString(),mongo);
        documento = commons_db.montaDocumento(queryParam.get("update"),documento);

		documento = completaCampos(documento, mongo);

        List arrayUpdate = arrayUpdate = new ArrayList<BasicDBObject>();
        BasicDBObject update = new BasicDBObject();
        update.put("field", "documento");
        update.put("value", documento);
        arrayUpdate.add(update);
        ResponseEntity response = commons_db.atualizarCrud("invoice", arrayUpdate, "_id", queryParam.get("value").toString(), mongo);

        if (response.getStatusCode() == HttpStatus.OK) {
            ArrayList<Object> productsResult = new ArrayList<Object>();
            productsResult = (ArrayList) documento.get("products");
            estimated.criarCosts(productsResult, documento.getString("trip"), queryParam.get("value").toString(), mongo);
            if (documento.get("typeInvoice") != null){
                if (documento.getString("typeInvoice").equals("invoice")) {
                    payment.managementCostsBooking(documento.getString("trip"), queryParam.get("value").toString(),  atualiza, book, mongo);
                }
            }else{
                payment.managementCostsBooking(documento.getString("trip"), queryParam.get("value").toString(),  atualiza, book, mongo);
            }
        };
        return response;

	}

    public void estorna(String invoiceId, MongoClient mongo) throws UnknownHostException {

        BasicDBObject docOrigin = commons_db.obterCrudDoc("invoice","_id",invoiceId.toString(),mongo);

        BasicDBObject docNew = docOrigin;
        ArrayList<Object> products = (ArrayList<Object>) docOrigin.get("products");

        for (int i = 0; i < products.size(); i++) {
            BasicDBObject product = new BasicDBObject();
            product.putAll((Map) products.get(i));
            product.put("valueNet", Double.toString(Double.valueOf(product.getString("valueNet")) * -1));
            product.put("valueGross", Double.toString(Double.valueOf(product.getString("valueNet")) * -1));
            products.set(i, product);
        }

        docNew.put("originInvoiceId", docOrigin.get("_id"));
        docNew.put("status", "creditPending");

        ResponseEntity response = commons_db.incluirCrud("invoice", docNew, mongo);

        if (response.getStatusCode() == HttpStatus.OK) {
            invoiceId = (String) response.getBody();
            if (invoiceId != null) {
                ArrayList<Object> productsResult = new ArrayList<Object>();
                productsResult = (ArrayList) docOrigin.get("products");
                estimated.criarCosts(productsResult, docOrigin.getString("trip"), invoiceId, mongo);
                payment.managementCostsBooking(docOrigin.getString("trip"), invoiceId,  false, false, mongo);
            }
        }

    }
    private BasicDBObject completaCampos(BasicDBObject documento, MongoClient mongo) throws UnknownHostException {

        BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", documento.getString("trip"), mongo);

        BasicDBObject accomodation = new BasicDBObject();

        if (travel.get("accomodation") != null) {
            accomodation.putAll((Map) travel.get("accomodation"));
            BasicDBObject weeksDays = commons.numberWeeks(accomodation.getString("checkIn"), accomodation.getString("checkOut"), travel.getString("accControl"));
            documento.put("weeks", weeksDays.get("weeks"));
            documento.put("extraNightsEntrada", weeksDays.get("extraNightsEntrada"));
            documento.put("extraNightsSaida", weeksDays.get("extraNightsSaida"));
            documento.put("checkIn", accomodation.get("checkIn"));
            documento.put("checkOut", accomodation.get("checkOut"));
            documento.put("city", travel.getString("destination"));
            documento.put("nameCity", travel.getString("destinationName"));
            documento.put("nameAgency", travel.getString("agencyName"));
            BasicDBObject numberWeeksDays = commons.numberWeeks(accomodation.getString("checkIn"), accomodation.getString("checkOut"), travel.getString("accControl"));
            ArrayList<Object> products = (ArrayList<Object>) documento.get("products");
            ArrayList<Object> productsResult = new ArrayList<Object>();

            for (int i = 0; i < products.size(); i++) {
                BasicDBObject product = new BasicDBObject();
                product.putAll((Map) products.get(i));
                BasicDBObject productDoc = commons_db.obterCrudDoc("priceTable", "_id", product.getString("id"), mongo);
                ArrayList<Object> dates = new ArrayList<Object>();
                ArrayList<BasicDBObject> seasons = new ArrayList<>();
                if (productDoc.getString("charging").equals("week") && numberWeeksDays.get("startWeeks") != "") {
                    seasons = priceTable.getSeasons(numberWeeksDays.get("startWeeks").toString(), numberWeeksDays.get("endWeeks").toString(), documento.getString("trip"), product.getString("id"), null, mongo);
                    for (BasicDBObject season : seasons) {
                        BasicDBObject date = new BasicDBObject();
                        date.put("start", season.getString("start"));
                        date.put("end", season.getString("end"));
                        dates.add(date);
                    }
                }
                if (productDoc.getString("charging").equals("eNight") && numberWeeksDays.get("startExtraNightsEntrada") != "") {
                    if (!weeksDays.get("extraNightsEntrada").equals("")) {
                        seasons = priceTable.getSeasons(numberWeeksDays.get("startExtraNightsEntrada").toString(), numberWeeksDays.get("endExtraNightsEntrada").toString(), documento.getString("trip"), product.getString("id"), null, mongo);
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
                        seasons = priceTable.getSeasons(numberWeeksDays.get("startExtraNightsSaida").toString(), numberWeeksDays.get("endExtraNightsSaida").toString(), documento.getString("trip"), product.getString("id"), null, mongo);
                        for (BasicDBObject season : seasons) {
                            BasicDBObject date = new BasicDBObject();
                            date.put("start", season.getString("start"));
                            date.put("end", season.getString("end"));
                            dates.add(date);
                        }
                    }
                }
                if (productDoc.getString("charging").equals("unique")) {
                    seasons = priceTable.getSeasons(accomodation.getString("checkIn"), accomodation.getString("checkOut"), documento.getString("trip"), product.getString("id"), null, mongo);
                    for (BasicDBObject season : seasons) {
                        BasicDBObject date = new BasicDBObject();
                        date.put("start", season.getString("start"));
                        date.put("end", season.getString("end"));
                        dates.add(date);
                    }
                }
                product.put("dates", dates);
                product.put("charging", productDoc.getString("charging"));
                productsResult.add(product);
            }
            documento.put("products", productsResult);

        }
        return documento;

    }

    ;

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ArrayList calculaInvoiceAutomatica(String travelId, String userId, JSONObject variables, MongoClient mongo) throws IOException  {

		if (travelId != null && variables != null) {
			return null;
		}
        BasicDBObject travel = new BasicDBObject();
        BasicDBObject student = new BasicDBObject();

        if (variables == null) {
            travel = commons_db.obterCrudDoc("travel", "_id", travelId, mongo);
            student = commons_db.obterCrudDoc("student", "_id", travel.getString("studentId"), mongo);
        }

        BasicDBObject accomodation = new BasicDBObject();
        if (variables == null) {
            accomodation.putAll((Map) travel.get("accomodation"));
        }

        BasicDBObject numberWeeksDays = new BasicDBObject();
        if (variables == null) {
            numberWeeksDays = commons.numberWeeks(accomodation.getString("checkIn"), accomodation.getString("checkOut"), travel.getString("accControl"));
        }else{
            numberWeeksDays = commons.numberWeeks(variables.get("checkIn").toString(), variables.get("checkOut").toString(), variables.get("accControl").toString());
        }

		ArrayList<BasicDBObject> resultArray = new ArrayList<BasicDBObject>();

		ArrayList<BasicDBObject> priceTableList = (ArrayList<BasicDBObject>) commons_db.listaCrud("priceTable", null,
				null, userId, null, null, false, mongo).getBody();
		
		for (BasicDBObject product : priceTableList) {
            BasicDBObject productDoc = new BasicDBObject();
            productDoc.putAll((Map) product.get("documento"));
            ArrayList<BasicDBObject> dates = new ArrayList<BasicDBObject>();
            ArrayList <BasicDBObject> seasons = new ArrayList<>();
            if (productDoc.getString("charging").equals("unique")) {
                if (variables == null) {
                    seasons = priceTable.getSeasons(accomodation.getString("checkIn"), accomodation.getString("checkOut"), travelId, product.getString("_id"), travel.getString("agency"), mongo);
                }else{
                    seasons = priceTable.getSeasons(variables.get("checkIn").toString(), variables.get("checkOut").toString(), null, product.getString("_id"), null, mongo);
                }
                if (seasons.size() > 0){
                    BasicDBObject date = new BasicDBObject();
                    date.put("start", seasons.get(0).getString("start"));
                    date.put("end", seasons.get(0).getString("end"));
                    date.put("value", seasons.get(0).getString("value"));
                    date.put("type", "unique");
                    dates.add(date);
                }
            }
            if (productDoc.getString("charging").equals("week") && numberWeeksDays.get("startWeeks") != "") {
                seasons = priceTable.getSeasons(numberWeeksDays.get("startWeeks").toString(),numberWeeksDays.get("endWeeks").toString(), travelId,product.getString("_id"),travel.getString("agency"), mongo);
                for (BasicDBObject season:seasons) {
                    BasicDBObject date = new BasicDBObject();
                    date.put("start", season.getString("start"));
                    date.put("end", season.getString("end"));
                    date.put("value", season.getString("value"));
					date.put("type", "weeks");
                    dates.add(date);
                }
            }
            if (productDoc.getString("charging").equals("eNight") && numberWeeksDays.get("startExtraNightsEntrada") != "") {
                if (!numberWeeksDays.get("extraNightsEntrada").equals("")) {
                    seasons = priceTable.getSeasons(numberWeeksDays.get("startExtraNightsEntrada").toString(), numberWeeksDays.get("endExtraNightsEntrada").toString(), travelId, product.getString("_id"), travel.getString("agency"), mongo);
                    for (BasicDBObject season : seasons) {
                        BasicDBObject date = new BasicDBObject();
                        date.put("start", season.getString("start"));
                        date.put("end", season.getString("end"));
                        date.put("value", season.getString("value"));
						date.put("type", "extraNights");
                        dates.add(date);
                    }
                }
            }
            if (productDoc.getString("charging").equals("eNight") && numberWeeksDays.get("startExtraNightsSaida") != "") {
                if (!numberWeeksDays.get("extraNightsSaida").equals("") && numberWeeksDays.get("startExtraNightsSaida") != "") {
                    seasons = priceTable.getSeasons(numberWeeksDays.get("startExtraNightsSaida").toString(),numberWeeksDays.get("endExtraNightsSaida").toString(), travelId,product.getString("_id"),travel.getString("agency"), mongo);
                    for (BasicDBObject season:seasons) {
                        BasicDBObject date = new BasicDBObject();
                        date.put("start", season.getString("start"));
                        date.put("end", season.getString("end"));
                        date.put("value", season.getString("value"));
						date.put("type", "extraNights");
                        dates.add(date);
                    }
                }
            };
            BasicDBObject variaveis = new BasicDBObject();
            if (variables == null) {
                variaveis.putAll((Map) travel.get("accomodation"));
            }else{
                variaveis.putAll((Map) variables);
            }

            Integer totalWeeks = 0;
            Integer totalDays = 0;
            Integer totalWeeksUnderage = 0;
            Integer totalDaysUnderage = 0;
            Double totalValue = 0.0;
            String studentAge = "19";
            if (variables == null) {
                studentAge = commons.calcNewYear(student.getString("birthday"), 18);
            }else{
                studentAge = commons.calcNewYear(variables.get("birthday").toString(), 18);
            }
            for (BasicDBObject date:dates) {
                if (date.getString("type").equals("extraNights")) {
                    int days = commons.difDate(date.getString("start"), date.getString("end"));
                    totalDays = days + totalDays;
                    variaveis.put("extraNights", Integer.toString(days));
                }else{
                    variaveis.put("extraNights", "0");
                }
                if (date.getString("type").equals("weeks")) {
                    int weeks = commons.difDate(date.getString("start"), date.getString("end")) / 7;
                    int days = commons.difDate(date.getString("start"), date.getString("end")) % 7;
                    if  (days > 3){
                        weeks++;
                    }
                    totalWeeks = weeks + totalWeeks;
                    variaveis.put("weeks", Integer.toString(weeks));
                }else{
                    variaveis.put("weeks", "0");
                }
                if (variables == null) {
                    variaveis.put("accControl", travel.getString("accControl"));
                    variaveis.put("extension", travel.get("extension"));
                    variaveis.put("airportPickup", travel.getString("airportPickup"));
                    variaveis.put("airportDropoff", travel.getString("airportDropoff"));
                    variaveis.put("echeckIn", travel.getString("echeckIn"));
                    variaveis.put("lcheckOut", travel.getString("lcheckOut"));
                    variaveis.put("value", date.get("value"));
                    if (commons.calcAgeData(student.getString("birthday"), accomodation.getString("checkIn")) < 18){
                        variaveis.put("underage", "yes");
                    }else{
                        variaveis.put("underage", "no");
                    }
                }else{
                    variaveis.put("accControl", variables.get("accControl"));
                    variaveis.put("extension", variables.get("extension"));
                    variaveis.put("airportPickup", variables.get("airportPickup"));
                    variaveis.put("airportDropoff", variables.get("airportDropoff"));
                    variaveis.put("echeckIn", variables.get("echeckIn"));
                    variaveis.put("lcheckOut", variables.get("lcheckOut"));
                    variaveis.put("value", date.get("value"));
                    if (commons.calcAgeData(variables.get("birthday").toString(), variables.get("checkIn").toString()) < 18){
                        variaveis.put("underage", "yes");
                    }else{
                        variaveis.put("underage", "no");
                    }
                }
                variaveis.put("weeksUnderage", "0");
                int daysTrip = commons.difDate(date.getString("start"), date.getString("end"));
                if (daysTrip < 28){
                    variaveis.put("proRate", "1.00");
                }else{
                    BigDecimal proRate = BigDecimal.valueOf(daysTrip / 28);
                    proRate = proRate.setScale(2, RoundingMode.CEILING);
                    variaveis.put("proRate", proRate.toString());
                }
                if (commons.comparaData(studentAge, date.getString("end"))){
                    if (date.getString("type").equals("extraNights")){
                        variaveis.put("extraNightsUnderage", variaveis.getString("extraNights"));
                        totalDaysUnderage = Integer.parseInt(variaveis.getString("extraNights")) + totalDaysUnderage;
                    }
                    if (date.getString("type").equals("weeks")){
                        variaveis.put("weeksUnderage", variaveis.getString("weeks"));
                        totalWeeksUnderage = Integer.parseInt(variaveis.getString("weeks")) + totalWeeksUnderage;
                    }
                }else{
                    if (date.getString("type").equals("extraNights")) {
                        if (commons.comparaData(studentAge, date.getString("start"))) {
                            int days = commons.difDate(date.getString("start"), studentAge);
                            totalDaysUnderage = days + totalDaysUnderage;
                            variaveis.put("extraNightsUnderage", Integer.toString(days));
                        }else{
                            variaveis.put("extraNightsUnderage", variaveis.getString("extraNights"));
                        }
                    }else{
                        variaveis.put("extraNightsUnderage", "0");
                    }
                    if (date.getString("type").equals("weeks")) {
                        if (commons.comparaData(studentAge, date.getString("start"))) {
                            int weeks = commons.difDate(date.getString("start"), studentAge) / 7;
                            int days = commons.difDate(date.getString("start"), studentAge) % 7;
                            if (days > 3) {
                                weeks++;
                            }
                            totalWeeksUnderage = weeks + totalWeeksUnderage;
                            variaveis.put("weeksUnderage", Integer.toString(weeks));
                        }else{
                            variaveis.put("weeksUnderage", variaveis.getString("weeks"));
                        }
                    }else{
                        variaveis.put("weeksUnderage", "0");
                    }
                }
                Double value = 0.0;
                if (productDoc.get("formula") != null ) {
					if (!productDoc.getString("formula").equals("")) {
						Map<String, Object> variablesFormula = variaveis;
						value = new FormulaCalculator(productDoc.getString("formula"), variablesFormula).calculate();
					}
                }
                totalValue = value + totalValue;
                if (value != 0.0) {
                    if (variables == null) {
                        productDoc.put("accControl", travel.getString("accControl"));
                        productDoc.put("airportPickup", travel.getString("airportPickup"));
                        productDoc.put("airportDropoff", travel.getString("airportDropoff"));
                    }else{
                        if (variables.get("accControl") != null ) {
                            productDoc.put("accControl", variables.get("accControl").toString());
                        }
                        if (variables.get("airportPickup") != null){
                            productDoc.put("airportPickup", variables.get("airportPickup").toString());
                        }
                        if (variables.get("airportDropoff") != null){
                            productDoc.put("airportDropoff", variables.get("airportDropoff").toString());
                        }
                    }
                }
            }
            if (totalValue != 0.0) {
                productDoc.put("extraNights", Integer.toString(totalDays));
                productDoc.put("weeks", Integer.toString(totalWeeks));
                if (productDoc.get("underage") != null) {
                    if (productDoc.getString("underage").equals("true")) {
                        productDoc.put("extraNights", Integer.toString(totalDaysUnderage));
                        productDoc.put("weeks", Integer.toString(totalWeeksUnderage));
                    }
                }
                productDoc.put("value", Double.toString(totalValue));
                productDoc.put("dates", dates);
                productDoc.remove("group");
                productDoc.remove("index");
                productDoc.remove("valid");
                productDoc.remove("formula");
                productDoc.remove("companyId");
                productDoc.remove("vendorId");
                productDoc.remove("ativo");
                productDoc.remove("serviceNr");
                product.remove("lastChange");
                product.put("documento", productDoc);
                resultArray.add(product);
            };
        }

		return resultArray;

	};

	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void atualizarReceivementsInvoice(String receivementId, Boolean estorno, ArrayList<Object> invoices, MongoClient mongo) throws UnknownHostException {

        BasicDBObject receivementAtu = commons_db.obterCrudDoc("receivement", "_id", receivementId, mongo);

		for (int i = 0; i < invoices.size(); i++) {
			BasicDBObject invoice = new BasicDBObject();
			invoice.putAll((Map) invoices.get(i));
			BasicDBObject invoiceObj = commons_db.obterCrudDoc("invoice", "_id", invoice.getString("id"), mongo);
			if (invoiceObj.get("netGross") != null ) {
                float total = 0;
			    if (invoiceObj.getString("netGross").equals("net")){
                    total = Float.valueOf(invoiceObj.getString("totalNet"));
                }else{
                    total = Float.valueOf(invoiceObj.getString("totalGross"));
                }
				float valuePayedObj = 0;
				if (invoiceObj.get("valuePayed") != null) {
					valuePayedObj = Float.valueOf(invoiceObj.getString("valuePayed"));
				}
				float valuePayed = 0;
				if (invoice.get("valuePayed") != null) {
					valuePayed = Float.valueOf(invoice.getString("valuePayed"));
				}
				if (estorno){
                    if ((valuePayedObj - valuePayed) == 0.0) {
                        invoiceObj.put("valuePayed", "0.0");
                        invoiceObj.put("paid", "unpaid");
                        invoiceObj.put("balanceDue", Float.toString(total));
                    } else {
                        valuePayedObj = valuePayedObj - valuePayed;
                        invoiceObj.put("valuePayed", Float.toString(valuePayedObj));
                        invoiceObj.put("paid", "partial");
                        invoiceObj.put("balanceDue", Float.toString(total - valuePayedObj));
                    }
                }else {
                   if ((valuePayedObj + valuePayed) >= total) {
                        invoiceObj.put("valuePayed", Float.toString(total));
                        invoiceObj.put("paid", "paid");
                        invoiceObj.put("balanceDue", "0.00");
                    } else {
                        valuePayedObj = valuePayedObj + valuePayed;
                        invoiceObj.put("valuePayed", Float.toString(valuePayedObj));
                        invoiceObj.put("paid", "partial");
                        invoiceObj.put("balanceDue", Float.toString(total - valuePayedObj));
                    }
                }
			}
			ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
			BasicDBObject update = new BasicDBObject(); 
			update.put("field", "documento");
			update.put("value", invoiceObj);
			arrayUpdate.add(update);
			commons_db.atualizarCrud("invoice", arrayUpdate, "_id", invoice.getString("id"), mongo);
		}
		String key = "";
        String keyInvoice = "";
		String value = "";
		String collection = "";
		
		if (receivementAtu.getString("payerType").equals("agency")) {
		    key = "documento.agencyId";
            keyInvoice = "documento.agency";
			value = receivementAtu.getString("agencyId");
			collection = "agency";
		}else {
			key = "documento.studentId";
            keyInvoice = "documento.student";
			value = receivementAtu.getString("studentId");
			collection = "student";
		}
		ResponseEntity response = commons_db.listaCrud("invoice", keyInvoice, value, null, null, null, true, mongo);
		invoices = new ArrayList<Object>();
		invoices = (JSONArray) response.getBody();

		float paidValueTotal = 0;
		if (invoices != null) {
			for (int i = 0; i < invoices.size(); i++) {
				BasicDBObject invoice = new BasicDBObject();
				invoice.putAll((Map) invoices.get(i));
                BasicDBObject invoiceObj = new BasicDBObject();
                invoiceObj.putAll((Map) invoice.get("documento"));
				if (invoiceObj.get("valuePayed") != null) {
					paidValueTotal = paidValueTotal + Float.valueOf(invoiceObj.getString("valuePayed"));
				};
			}
		};

		float receiveValueTotal = 0;
		response = commons_db.listaCrud("receivement", key, value, null, null, null, true, mongo);
		ArrayList<Object> receivements = new ArrayList<Object>();
		receivements = (JSONArray) response.getBody();

		if (receivements != null) {
			for (int i = 0; i < receivements.size(); i++) {
				BasicDBObject receivement = new BasicDBObject();
				receivement.putAll((Map) receivements.get(i));
                BasicDBObject receivementObj = new BasicDBObject();
                receivementObj.putAll((Map) receivement.get("documento"));
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
		commons_db.atualizarCrud(collection, arrayUpdate, "_id", value, mongo);

	};

	public Double testaFormla(String formula, BasicDBObject variaveis)  throws IOException  {
		Map<String, Object> variables = variaveis;
		Double value = 0.0;
		value = new FormulaCalculator(formula, variables).calculate();
		return value;
	};

    public BasicDBObject lista(Map<String, String> params, MongoClient mongo) throws UnknownHostException {

        if (params.get("companyId") == null || params.get("usuarioId") == null){
            return null;
        }

        if (params.get("companyId").equals("") || params.get("usuarioId").equals("")){
            return null;
        }

        BasicDBObject setQuery = new BasicDBObject();

        BasicDBObject result = new BasicDBObject();
        result.put("draw", params.get("draw"));

        ResponseEntity response = commons_db.listaCrudSkip("invoice", "documento.companyId", params.get("companyId"), params.get("usuarioId"), setQuery, null, false, Integer.parseInt(params.get("start")),Integer.parseInt(params.get("length")), params, mongo);
        BasicDBObject retorno = new BasicDBObject();
        if ((response.getStatusCode() == HttpStatus.OK)) {
            retorno.putAll((Map) response.getBody());
        };

        if (retorno != null) {
            ArrayList<Object> invoices = (ArrayList<Object>) retorno.get("documentos");
            result.put("data", invoices);
            result.put("recordsFiltered", retorno.get("countFiltered"));
            result.put("recordsTotal", retorno.get("count"));
            int i = 0;
            while (retorno.get("yadcf_data_" + i) != null){
                result.put("yadcf_data_" + i, retorno.get("yadcf_data_" + i));
                ++i;
            }
        }
        return result;
    }

}
