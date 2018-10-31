package com.casamundo.bean;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;

public class Student {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject getAllocation(String studentId, String userId) throws UnknownHostException {

		Response response =  commons_db.listaCrud("travel", "documento.studentId", studentId, userId, null, null, false);

		ArrayList<Object> allocationsHomeStay = new ArrayList<Object>();
		ArrayList<Object> allocationsShared = new ArrayList<Object>();
		ArrayList<Object> allocationsSuite = new ArrayList<Object>();
		ArrayList<Object> travels = new ArrayList<Object>();
		travels = (JSONArray) response.getEntity();

		for (int i = 0; i < travels.size(); i++) {
			BasicDBObject travel = new BasicDBObject();
			travel.putAll((Map) travels.get(i));
			String travelId = travel.getString("_id");
			BasicDBObject doc = (BasicDBObject) travel.get("documento");
			String bookType = doc.getString("accControl");
			if (bookType.equals("homestay")){
				response =  commons_db.listaCrud("homestayBook", "documento.studentId", travelId, userId, null, null,false);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getEntity();
				for (int j = 0; j < allocations.size(); j++) {
					BasicDBObject allocation = new BasicDBObject();
					allocation.putAll((Map) allocations.get(j));
					allocationsHomeStay.add(allocation);
				};
			}
			if (bookType.equals("shared")){
				response =  commons_db.listaCrud("sharedBook", "documento.studentId", travelId, userId, null, null, false);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getEntity();
				for (int j = 0; j < allocations.size(); j++) {
					BasicDBObject allocation = new BasicDBObject();
					allocation.putAll((Map) allocations.get(j));
					allocationsShared.add(allocation);
				};
			}
			if (bookType.equals("suite")){
				response =  commons_db.listaCrud("suiteBook", "documento.studentId", travelId, userId, null, null,false);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getEntity();
				for (int j = 0; j < allocations.size(); j++) {
					BasicDBObject allocation = new BasicDBObject();
					allocation.putAll((Map) allocations.get(j));
					allocationsSuite.add(allocation);
				};
			}
		};
		BasicDBObject result = new BasicDBObject();
		result.put("travel", travels);
		result.put("homestayBook", allocationsHomeStay);
		result.put("sharedBook", allocationsShared);
		result.put("suiteBook", allocationsSuite);
		return result;

	};

}
