package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/pricetable")

public class Rest_PriceTable {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray listaProdutos(@QueryParam("travelId") String travelId, @QueryParam("userId") String userId ) throws UnknownHostException, MongoException {

		JSONArray result = new JSONArray();

		BasicDBObject setQuery = new BasicDBObject();
		BasicDBObject setSort = new BasicDBObject();
		setSort.put("documento.name", -1);
		Response response = commons_db.listaCrud("priceTable", null, null, userId, setQuery, setSort);
		ArrayList<Object> prices = new ArrayList<Object>();
		prices = (JSONArray) response.getEntity();

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
	public JSONObject getValue(String travelId, String productId, String userId ) throws UnknownHostException, MongoException {

		JSONObject result = new JSONObject();
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		String destination =  (String) travel.get("destination");
		String agencyId  = (String) travel.get("agency");

		BasicDBObject setQuery = new BasicDBObject();
    	setQuery.put("documento.trip", travelId);
    	setQuery.put("documento.products.id", productId);
    	
		Response response = commons_db.listaCrud("invoice", null, null, userId, setQuery, null);

		ArrayList<Object> invoice = new ArrayList<Object>();
		invoice = (JSONArray) response.getEntity();
		
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
		response = commons_db.listaCrud("priceTableValue", null, null, userId, setQuery, setSort);

		ArrayList<Object> pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getEntity();

		JSONObject resultFirstAgency = new JSONObject();

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					result.put("gross", priceListDoc.get("gross"));
					result.put("net", priceListDoc.get("net"));
					result.put("status", cobrado);
					return result;
				};
				if (i == 0){
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
		response = commons_db.listaCrud("priceTableValue", null, null, userId, setQuery, setSort);

		pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getEntity();

		JSONObject resultFirstDestiny = new JSONObject();

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					result.put("gross", priceListDoc.get("gross"));
					result.put("net", priceListDoc.get("net"));
					result.put("status", cobrado);
					return result;
				};
				if (i == 0){
					resultFirstDestiny.put("gross", priceListDoc.get("gross"));
					resultFirstDestiny.put("net", priceListDoc.get("net"));
					resultFirstDestiny.put("status", cobrado);
				};
			}
		}
		
		setQuery = new BasicDBObject();
    	setQuery.put("documento.idPriceTable", productId);
		response = commons_db.listaCrud("priceTableValue", null, null, userId, setQuery, setSort);

		pricesList = new ArrayList<Object>();
		pricesList = (JSONArray) response.getEntity();

		JSONObject resultFirst = new JSONObject();

		if (response != null) {
			for (int i = 0; i < pricesList.size(); i++) {
				BasicDBObject priceList = new BasicDBObject();
				priceList.putAll((Map) pricesList.get(i));
				BasicDBObject priceListDoc = (BasicDBObject) priceList.get("documento");
				BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
				if (commons.verifyInterval ((String) accomodation.get("checkIn"), (String) priceListDoc.get("from"), (String) priceListDoc.get("to"))){
					result.put("gross", priceListDoc.get("gross"));
					result.put("net", priceListDoc.get("net"));
					result.put("status", cobrado);
					return result;
				};
				if (i == 0){
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

}
