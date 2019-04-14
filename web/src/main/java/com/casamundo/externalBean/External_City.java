package com.casamundo.externalBean;

import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class External_City {

	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ResponseEntity lista(MongoClient mongo) throws UnknownHostException {
		BasicDBObject setQuery = new BasicDBObject();
		ResponseEntity response = commons_db.listaCrud("school", null, null, null, setQuery, null, false, mongo);
	
		ArrayList<Object> resultList = new ArrayList<Object>();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		arrayList = (JSONArray) response.getBody();
	
		if (arrayList != null) {
			for (int i = 0; i < arrayList.size(); i++) {
				BasicDBObject itemList = new BasicDBObject();
				itemList.putAll((Map) arrayList.get(i));
				BasicDBObject itemListDoc = new BasicDBObject();
				itemListDoc.putAll((Map) itemList.get("documento"));
				BasicDBObject result = new BasicDBObject();
				result.put("_id", itemList.getString("_id"));
				result.put("name", itemListDoc.get("name"));
				resultList.add(result);
			}
		}

		return ResponseEntity.ok().body(resultList);
	
	}

}
