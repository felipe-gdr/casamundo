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
				JSONObject priceValue = getValue(travelId, price.getString("_id"), userId);
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
	public JSONObject getValue(String travelId, String productId, String userId ) throws UnknownHostException {

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
			return resultFirstAgency;				
		}
		if (resultFirstDestiny.get("gross") != null) {
			return resultFirstDestiny;				
		}

		return resultFirst;
	};

	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject getCost(String travelId, String productId, String vendorId) throws UnknownHostException {
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		String destination =  (String) travel.get("destination");

		BasicDBObject setQuery = new BasicDBObject();
		
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
    	if (destination != null) {
    		setQuery.put("documento.destination", destination);
    	}
    	if (vendorId != null) {
    		setQuery.put("documento.vendorId", vendorId);
    	}
    	
		BasicDBObject setSort = new BasicDBObject();
		setSort.put("documento.to", -1);
		ResponseEntity response = commons_db.listaCrud("priceTableCost", null, null, null, setQuery, setSort, true);

		ArrayList<Object> pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		BasicDBObject resultFirstVendor = new BasicDBObject();

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				System.out.println("tem valor datas vendor");
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					resultFirstVendor.put("value", priceListDoc.get("value"));
					System.out.println("achou preco com vendor entre datas vendor - " + priceListDoc.get("value"));
					return resultFirstVendor;
				};
				if (i == 0){
					System.out.println("achou preco com vendor sem datas vendor - " + priceListDoc.get("value"));
					resultFirstVendor.put("value", priceListDoc.get("value"));
				};
			};
		};
				
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
    	if (destination != null) {
    		setQuery.put("documento.destination", destination);
    	};
		response = commons_db.listaCrud("priceTableCost", null, null, null, setQuery, setSort, true);

		pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		BasicDBObject resultFirstDestiny = new BasicDBObject();

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				System.out.println("tem valor datas destiny");
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					System.out.println("tem valor entre datas destination");
					resultFirstDestiny.put("value", priceListDoc.get("value"));
					return resultFirstDestiny;
				};
				if (i == 0){
					System.out.println("achou preco com vendor sem datas destination - " + priceListDoc.get("value"));
					resultFirstDestiny.put("value", priceListDoc.get("value"));
				};
			}
		}
		
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
    	System.out.println("produto - " + productId);
    	System.out.println("query - " + setQuery.toString());
    	response = commons_db.listaCrud("priceTableCost", null, null, null, setQuery, setSort, true);

		pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getBody();

		BasicDBObject resultFirst = new BasicDBObject();

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				System.out.println("tem valor sem  nada");
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					System.out.println("tem valor entre datas sem nada ");
					resultFirst.put("value", priceListDoc.get("value"));
					return resultFirst;
				};
				if (i == 0){
					System.out.println("tem valor sem datas sem nada - " + priceListDoc.get("value")) ;
					resultFirst.put("value", priceListDoc.get("value"));
				};
			}
		}
		if (resultFirstVendor.get("value") != null) {
			System.out.println("mandou valor vendor sem data - " + resultFirstVendor.get("value")) ;
			return resultFirstVendor;				
		}
		if (resultFirstDestiny.get("value") != null) {
			System.out.println("mandou valor destiny sem data - " + resultFirstDestiny.get("value")) ;
			return resultFirstDestiny;				
		}

		System.out.println("mandou valor sem nada sem data - " + resultFirst.get("value")) ;
		return resultFirst;
	};

}
