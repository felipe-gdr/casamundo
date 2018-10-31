package com.casamundo.bean;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;

import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;

public class Agency {

	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ArrayList<Object> listaAgency() throws UnknownHostException{

		BasicDBObject setQuery = new BasicDBObject();
		Response response = commons_db.listaCrud("agency", null, null, null, setQuery, null, false);

		ArrayList<Object> resultList = new ArrayList<Object>();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		arrayList = (JSONArray) response.getEntity();

		if (response != null) {
			for (int i = 0; i < arrayList.size(); i++) {
				BasicDBObject itemList = new BasicDBObject();
				itemList.putAll((Map) arrayList.get(i));
				BasicDBObject itemListDoc = (BasicDBObject) itemList.get("documento");
				BasicDBObject result = new BasicDBObject();
				result.put("_id", itemList.getString("_id"));
				result.put("name", itemListDoc.get("name"));
				result.put("agencyPhone", itemListDoc.get("agencyPhone"));
				result.put("agencyEmail", itemListDoc.get("agencyEmail"));
				result.put("agencyLogo", itemListDoc.get("agencyLogo"));
				result.put("agencySigla", itemListDoc.get("agencySigla"));
				result.put("consultants", itemListDoc.get("consultants"));
				resultList.add(result);
			}
		}
		return resultList;
	}

}
