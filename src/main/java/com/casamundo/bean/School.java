package com.casamundo.bean;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;

import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;

public class School {

	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ArrayList<Object> lista() throws UnknownHostException {
		BasicDBObject setQuery = new BasicDBObject();
		Response response = commons_db.listaCrud("school", null, null, null, setQuery, null, false);
	
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
				result.put("schoolPhone", itemListDoc.get("schoolPhone"));
				result.put("schoolEmail", itemListDoc.get("schoolEmail"));
				result.put("nameContact", itemListDoc.get("nameContact"));
				result.put("celPhone", itemListDoc.get("celPhone"));
				result.put("phone", itemListDoc.get("phone"));
				result.put("email", itemListDoc.get("email"));
				result.put("address", itemListDoc.get("address"));
				result.put("logo", itemListDoc.get("logo"));
				result.put("sigla", itemListDoc.get("sigla"));
				resultList.add(result);
			}
		}
		
		return resultList;
	
	}

}
