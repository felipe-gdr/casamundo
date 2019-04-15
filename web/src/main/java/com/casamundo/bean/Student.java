package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.json.simple.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Array;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class Student {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject getAllocation(String studentId, String userId, MongoClient mongo) throws UnknownHostException {

		ResponseEntity response =  commons_db.listaCrud("travel", "documento.studentId", studentId, userId, null, null, false, mongo);

		ArrayList<Object> allocationsHomeStay = new ArrayList<Object>();
		ArrayList<Object> allocationsShared = new ArrayList<Object>();
		ArrayList<Object> allocationsSuite = new ArrayList<Object>();
		ArrayList<Object> travels = new ArrayList<Object>();
		travels = (JSONArray) response.getBody();

		for (int i = 0; i < travels.size(); i++) {
			BasicDBObject travel = new BasicDBObject();
			travel.putAll((Map) travels.get(i));
			String travelId = travel.getString("_id");
			BasicDBObject doc = new BasicDBObject();
			doc.putAll((Map) travel.get("documento"));
			String bookType = doc.getString("accControl");
			if (bookType.equals("homestay")){
				response =  commons_db.listaCrud("homestayBook", "documento.studentId", travelId, userId, null, null,false, mongo);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getBody();
				for (int j = 0; j < allocations.size(); j++) {
					BasicDBObject allocation = new BasicDBObject();
					allocation.putAll((Map) allocations.get(j));
					allocationsHomeStay.add(allocation);
				};
			}
			if (bookType.equals("shared")){
				response =  commons_db.listaCrud("sharedBook", "documento.studentId", travelId, userId, null, null, false, mongo);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getBody();
				for (int j = 0; j < allocations.size(); j++) {
					BasicDBObject allocation = new BasicDBObject();
					allocation.putAll((Map) allocations.get(j));
					allocationsShared.add(allocation);
				};
			}
			if (bookType.equals("suite")){
				response =  commons_db.listaCrud("suiteBook", "documento.studentId", travelId, userId, null, null,false, mongo);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getBody();
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
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject lista(Map<String, String> params, MongoClient mongo) throws UnknownHostException {

		BasicDBObject result = new BasicDBObject();
		result.put("draw", params.get("draw"));

        ResponseEntity response = commons_db.listaCrudSkip("student", "documento.companyId", params.get("companyId"), params.get("usuarioId"), null, null, false, Integer.parseInt(params.get("start")),Integer.parseInt(params.get("length")), params, mongo);
		BasicDBObject retorno = new BasicDBObject();
		if ((response.getStatusCode() == HttpStatus.OK)) {
			retorno.putAll((Map) response.getBody());
		};

        if (retorno != null) {
            ArrayList<Object> students = (ArrayList<Object>) retorno.get("documentos");
            result.put("data", students);
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
