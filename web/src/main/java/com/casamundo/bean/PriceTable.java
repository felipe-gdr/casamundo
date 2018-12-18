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

public class PriceTable {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public JSONArray listaProdutos(String travelId, String userId ) throws UnknownHostException {

		JSONArray result = new JSONArray();

		BasicDBObject setQuery = new BasicDBObject();
		BasicDBObject setSort = new BasicDBObject();
		setSort.put("documento.name", -1);
		ResponseEntity response = commons_db.listaCrud("priceTable", null, null, userId, setQuery, setSort, false);
		ArrayList<Object> prices = new ArrayList<Object>();
		prices = (JSONArray) response.getBody();

		if (response != null) {
			for (int i = 0; i < prices.size(); i++) {
				BasicDBObject price = new BasicDBObject();
				price.putAll((Map) prices.get(i));
				BasicDBObject priceDoc = (BasicDBObject) price.get("documento");
				JSONObject priceValue = getDataValue(travelId, price.getString("_id"), userId);
				BasicDBObject jsonResult = new BasicDBObject();
				jsonResult.put("_id", price.get("_id"));
				jsonResult.put("name", priceDoc.get("name"));
				jsonResult.put("gross", priceValue.get("gross"));
				jsonResult.put("net", priceValue.get("net"));
				jsonResult.put("status", priceValue.get("status"));
				if (priceValue.get("net") != null) {
					result.add(jsonResult);
				};
			}
		}
		return result;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public JSONObject getDataValue(String travelId, String productId, String userId ) throws UnknownHostException {

		JSONObject result = new JSONObject();
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		String destination =  (String) travel.get("destination");
		String agencyId  = (String) travel.get("agency");

		BasicDBObject setQuery = new BasicDBObject();
    	setQuery.put("documento.trip", travelId);
    	setQuery.put("documento.products.id", productId);
    	
		ResponseEntity response = commons_db.listaCrud("invoice", null, null, userId, setQuery, null, false);

		ArrayList<Object> invoice = new ArrayList<Object>();
		invoice = (JSONArray) response.getBody();
		
		String cobrado = "naocobrado";
		if (invoice.size() != 0 ) {
			cobrado = "cobrado";			
		}
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
    	if (destination != null) {
    		setQuery.put("documento.destination", destination);
    	}
    	if (agencyId != null) {
    		setQuery.put("documento.agency", agencyId);
    	}
    	
		BasicDBObject setSort = new BasicDBObject();
		setSort.put("documento.to", -1);
		response = commons_db.listaCrud("priceTableValue", null, null, userId, setQuery, setSort, false);

		ArrayList<Object> pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		JSONObject resultFirstAgency = new JSONObject();

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					result.put("from", priceListDoc.get("from"));
					result.put("to", priceListDoc.get("to"));
					result.put("gross", priceListDoc.get("gross"));
					result.put("net", priceListDoc.get("net"));
					result.put("status", cobrado);
					return result;
				};
				if (i == 0){
					resultFirstAgency.put("from", priceListDoc.get("from"));
					resultFirstAgency.put("to", "9999-99-99");
					resultFirstAgency.put("gross", priceListDoc.get("gross"));
					resultFirstAgency.put("net", priceListDoc.get("net"));
					resultFirstAgency.put("status", cobrado);
				};
			}
		}
				
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
    	if (destination != null) {
    		setQuery.put("documento.destination", destination);
            setQuery.put("documento.agency", "");
    	}
		response = commons_db.listaCrud("priceTableValue", null, null, userId, setQuery, setSort, false);

		pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		JSONObject resultFirstDestiny = new JSONObject();
		resultFirstDestiny.put("values", pricesList);

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					result.put("from", priceListDoc.get("from"));
					result.put("to", priceListDoc.get("to"));
					result.put("gross", priceListDoc.get("gross"));
					result.put("net", priceListDoc.get("net"));
					result.put("status", cobrado);
					return result;
				};
				if (i == 0){
					resultFirstDestiny.put("from", priceListDoc.get("from"));
					resultFirstDestiny.put("to", "9999-99-99");
					resultFirstDestiny.put("gross", priceListDoc.get("gross"));
					resultFirstDestiny.put("net", priceListDoc.get("net"));
					resultFirstDestiny.put("status", cobrado);
				};
			}
		}
		
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
        setQuery.put("documento.destination", "");
        setQuery.put("documento.agency", "");
		response = commons_db.listaCrud("priceTableValue", null, null, userId, setQuery, setSort, false);

		pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		JSONObject resultFirst = new JSONObject();
		resultFirst.put("values", pricesList);
		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					result.put("from", priceListDoc.get("from"));
					result.put("to", priceListDoc.get("to"));
					result.put("gross", priceListDoc.get("gross"));
					result.put("net", priceListDoc.get("net"));
					result.put("status", cobrado);
					return result;
				};
				if (i == 0){
					resultFirst.put("from", priceListDoc.get("from"));
					resultFirst.put("to", "9999-99-99");
					resultFirst.put("gross", priceListDoc.get("gross"));
					resultFirst.put("net", priceListDoc.get("net"));
					resultFirst.put("status", cobrado);
				};
			}
		}
		if (resultFirstAgency.get("gross") != null) {
            resultFirstAgency.put("value", "0.0");
			return resultFirstAgency;
		}
		if (resultFirstDestiny.get("gross") != null) {
            resultFirstDestiny.put("value", "0.0");
			return resultFirstDestiny;
		}

        resultFirst.put("value", "0.0");
		return resultFirst;
	};

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ArrayList getCost(String start, String end, String travelId, String productId, String vendorId) throws UnknownHostException {

	    ArrayList result = new ArrayList();
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		String destination =  (String) travel.get("destination");

		BasicDBObject setQuery = new BasicDBObject();
		
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
    	if (destination != null) {
    		setQuery.put("documento.destination", destination);
    	}
    	if (vendorId != null) {
    		setQuery.put("documento.idVendor", vendorId);
    	}else{
            setQuery.put("documento.idVendor", "");
        }
    	
		BasicDBObject setSort = new BasicDBObject();
		setSort.put("documento.from", 1);
		ResponseEntity response = commons_db.listaCrud("priceTableCost", null, null, null, setQuery, setSort, true);

		ArrayList<Object> pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				if (commons.verifyInterval (start, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
                    BasicDBObject resultItem = new BasicDBObject();
                    resultItem.put("value", priceListDoc.get("value"));
                    resultItem.put("start", start);
                    resultItem.put("end", end);
                    if (commons.convertDateInt(priceListDoc.getString("to")) < commons.convertDateInt(end)){
                        start = commons.calcNewDate((String) priceListDoc.get("to"), 1);
                        resultItem.put("end", commons.calcNewDate((String) priceListDoc.get("to"), 1));
                    }
					result.add(resultItem);
				};
			};
		};

		if (result.size() > 0){
            return result;
        }
				
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
    	if (destination != null) {
    		setQuery.put("documento.destination", destination);
            setQuery.put("documento.idVendor", "");
    	};
		response = commons_db.listaCrud("priceTableCost", null, null, null, setQuery, setSort, true);

		pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		BasicDBObject resultFirstDestiny = new BasicDBObject();


        if (response != null) {
            for (int i = 0; i < pricesList.size(); i++) {
                BasicDBObject priceList = new BasicDBObject();
                priceList.putAll((Map) pricesList.get(i));
                BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
                if (commons.verifyInterval (start, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
                    BasicDBObject resultItem = new BasicDBObject();
                    resultItem.put("value", priceListDoc.get("value"));
                    resultItem.put("start", start);
                    resultItem.put("end", end);
                    if (commons.convertDateInt(priceListDoc.getString("to")) < commons.convertDateInt(end)){
                        start = commons.calcNewDate((String) priceListDoc.get("to"), 1);
                        resultItem.put("end", commons.calcNewDate((String) priceListDoc.get("to"), 1));
                    }
                    result.add(resultItem);
                };
            };
        };

        if (result.size() > 0){
            return result;
        }
		
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
        setQuery.put("documento.destination", "");
        setQuery.put("documento.idVendor", "");
    	response = commons_db.listaCrud("priceTableCost", null, null, null, setQuery, setSort, true);

		pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		BasicDBObject resultFirst = new BasicDBObject();


        if (response != null) {
            for (int i = 0; i < pricesList.size(); i++) {
                BasicDBObject priceList = new BasicDBObject();
                priceList.putAll((Map) pricesList.get(i));
                BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
                if (commons.verifyInterval (start, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
                    BasicDBObject resultItem = new BasicDBObject();
                    resultItem.put("value", priceListDoc.get("value"));
                    resultItem.put("start", start);
                    resultItem.put("end", end);
                    if (commons.convertDateInt(priceListDoc.getString("to")) < commons.convertDateInt(end)){
                        start = commons.calcNewDate((String) priceListDoc.get("to"), 1);
                        resultItem.put("end", commons.calcNewDate((String) priceListDoc.get("to"), 1));
                    }
                    result.add(resultItem);
                };
            };
        };

        return result;
	};

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ArrayList getSeasons(String start, String end, String travelId, String productId, String vendorId) throws UnknownHostException {

        ArrayList result = new ArrayList();
        BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
        String destination =  (String) travel.get("destination");

        BasicDBObject setQuery = new BasicDBObject();

        setQuery = new BasicDBObject();
        setQuery.put("documento.idPriceTable", productId);
        if (destination != null) {
            setQuery.put("documento.destination", destination);
        }
        if (vendorId != null) {
            setQuery.put("documento.agency", vendorId);
        }

        BasicDBObject setSort = new BasicDBObject();
        setSort.put("documento.from", 1);
        ResponseEntity response = commons_db.listaCrud("priceTableValue", null, null, null, setQuery, setSort, true);

        ArrayList<Object> pricesList = new ArrayList<Object>();
        pricesList = (JSONArray) response.getBody();

        if (response != null) {
            for (int i = 0; i < pricesList.size(); i++) {
                BasicDBObject priceList = new BasicDBObject();
                priceList.putAll((Map) pricesList.get(i));
                BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
                if (commons.verifyInterval (start, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
                    BasicDBObject resultItem = new BasicDBObject();
                    resultItem.put("value", priceListDoc.get("net"));
                    resultItem.put("start", start);
                    resultItem.put("end", end);
                    if (commons.convertDateInt(priceListDoc.getString("to")) < commons.convertDateInt(end)){
                        start = commons.calcNewDate((String) priceListDoc.get("to"), 1);
                        resultItem.put("end", commons.calcNewDate((String) priceListDoc.get("to"), 1));
                    }
                    result.add(resultItem);
                }else{
                    if (commons.verifyInterval (end, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))) {
                        BasicDBObject resultItem = new BasicDBObject();
                        resultItem.put("value", priceListDoc.get("net"));
                        resultItem.put("start", start);
                        resultItem.put("end", end);
                        if (commons.convertDateInt(priceListDoc.getString("from")) > commons.convertDateInt(start)) {
                            start = commons.calcNewDate((String) priceListDoc.get("from"), 1);
                            resultItem.put("start", (String) priceListDoc.get("from"));
                        }
                        result.add(resultItem);
                    }
                }
            };
        };

        if (result.size() > 0){
            return result;
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.idPriceTable", productId);
        if (destination != null) {
            setQuery.put("documento.destination", destination);
        };
        response = commons_db.listaCrud("priceTableValue", null, null, null, setQuery, setSort, true);

        pricesList = new ArrayList<Object>();
        pricesList = (JSONArray) response.getBody();

        BasicDBObject resultFirstDestiny = new BasicDBObject();


        if (response != null) {
            for (int i = 0; i < pricesList.size(); i++) {
                BasicDBObject priceList = new BasicDBObject();
                priceList.putAll((Map) pricesList.get(i));
                BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
                if (commons.verifyInterval (start, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
                    BasicDBObject resultItem = new BasicDBObject();
                    resultItem.put("value", priceListDoc.get("net"));
                    resultItem.put("start", start);
                    resultItem.put("end", end);
                    if (commons.convertDateInt(priceListDoc.getString("to")) < commons.convertDateInt(end)){
                        start = commons.calcNewDate((String) priceListDoc.get("to"), 1);
                        resultItem.put("end", commons.calcNewDate((String) priceListDoc.get("to"), 1));
                    }
                    result.add(resultItem);
                }else{
                    if (commons.verifyInterval (end, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))) {
                        BasicDBObject resultItem = new BasicDBObject();
                        resultItem.put("value", priceListDoc.get("net"));
                        resultItem.put("start", start);
                        resultItem.put("end", end);
                        if (commons.convertDateInt(priceListDoc.getString("from")) > commons.convertDateInt(start)) {
                            start = commons.calcNewDate((String) priceListDoc.get("from"), 1);
                            resultItem.put("start", (String) priceListDoc.get("from"));
                        }
                        result.add(resultItem);
                    }
                };
            };
        };

        if (result.size() > 0){
            return result;
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.idPriceTable", productId);
        response = commons_db.listaCrud("priceTableValue", null, null, null, setQuery, setSort, true);

        pricesList = new ArrayList<Object>();
        pricesList = (JSONArray) response.getBody();

        BasicDBObject resultFirst = new BasicDBObject();


        if (response != null) {
            for (int i = 0; i < pricesList.size(); i++) {
                BasicDBObject priceList = new BasicDBObject();
                priceList.putAll((Map) pricesList.get(i));
                BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
                if (commons.verifyInterval (start, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
                    BasicDBObject resultItem = new BasicDBObject();
                    resultItem.put("value", priceListDoc.get("net"));
                    resultItem.put("start", start);
                    resultItem.put("end", end);
                    if (commons.convertDateInt(priceListDoc.getString("to")) < commons.convertDateInt(end)){
                        start = commons.calcNewDate((String) priceListDoc.get("to"), 1);
                        resultItem.put("end", commons.calcNewDate((String) priceListDoc.get("to"), 1));
                    }
                    result.add(resultItem);
                }else{
                    if (commons.verifyInterval (end, (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))) {
                        BasicDBObject resultItem = new BasicDBObject();
                        resultItem.put("value", priceListDoc.get("net"));
                        resultItem.put("start", start);
                        resultItem.put("end", end);
                        if (commons.convertDateInt(priceListDoc.getString("from")) > commons.convertDateInt(start)) {
                            start = commons.calcNewDate((String) priceListDoc.get("from"), 1);
                            resultItem.put("start", (String) priceListDoc.get("from"));
                        }
                        result.add(resultItem);
                    }
                };
            };
        };

        return result;
    };

}
