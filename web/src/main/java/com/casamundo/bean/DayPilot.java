package com.casamundo.bean;

import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class DayPilot {

	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ArrayList<BasicDBObject> monta(String companyId, String userId, String start, String end, String city) throws UnknownHostException {

		BasicDBObject setQuery = new BasicDBObject();
		setQuery.put("documento.companyId", companyId );
		ResponseEntity response = commons_db.listaCrud("familyDorm", null, null, userId, setQuery, null, false);
	
		ArrayList<BasicDBObject> resultList = new ArrayList<BasicDBObject>();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		arrayList = (JSONArray) response.getBody();
	
		if (arrayList != null) {
			for (int i = 0; i < arrayList.size(); i++) {
				BasicDBObject doc = new BasicDBObject();
				doc.putAll((Map) arrayList.get(i));
				BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
				commons_db.triggerDinamicData(doc, "familyDorm", commons_db.montaSetQuery(doc.getString("_id")),null);
			}
		}

        setQuery.put("city", city );
        response = commons_db.listaCrud("familyDorm", null, null, null, setQuery, null, false);
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
            }
        }

		return resultList;
	
	}

}
