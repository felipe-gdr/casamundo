package com.casamundo.externalBean;

import com.casamundo.bean.Invoice;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.*;

public class External_Book {

	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();
	Invoice invoice = new Invoice();

	public ResponseEntity getAvailable(String type, String start, String end, String city, org.json.simple.JSONObject variables, MongoClient mongo) throws IOException {

		String collectionBase = "";
		String collectionAlloc = "";
		switch(type) {
			case "homestay":
				collectionBase = "familyDorm";
				collectionAlloc = "homestayBook";
				break;
			case "suite":
				collectionBase = "dorm";
				collectionAlloc = "suiteBook";
				break;
			case "shared":
				collectionBase = "dorm";
				collectionAlloc = "sharedBook";
				break;
			default:
				// code block
		}


		ResponseEntity response = commons_db.listaCrud(collectionBase, "documento.city", city, null, null, null, true, mongo);
		ArrayList<Object> resources = new ArrayList<Object>();
		resources = (org.json.simple.JSONArray) response.getBody();

		if (resources != null) {
			Boolean temRecurso = false;
			for (int i = 0; i < resources.size(); i++) {
				BasicDBObject resource = new BasicDBObject();
				resource.putAll((Map) resources.get(i));
				BasicDBObject resourceDoc = new BasicDBObject();
				resourceDoc.putAll((Map) resource.get("documento"));
				response = commons_db.listaCrud(collectionAlloc, "resource", resourceDoc.getString("id"), null, null, null, true, mongo);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getBody();
				if (allocations != null) {
					for (int j = 0; j < allocations.size(); j++) {
						BasicDBObject allocation = new BasicDBObject();
						allocation.putAll((Map) allocations.get(j));
						BasicDBObject allocationDoc = new BasicDBObject();
						allocationDoc.putAll((Map) allocation.get("documento"));
						if (commons.getDaysInterval(start, end, allocationDoc.getString("start"), allocationDoc.getString("end")).getInt("days") == 0){
							temRecurso = true;
						}
					}
				}
			}
			ArrayList products = invoice.calculaInvoiceAutomatica(null,null,variables, mongo);
			return ResponseEntity.ok().body(products);
		}
		return ResponseEntity.ok().body("No available resource");
	}

	public ResponseEntity deletar(String idBook) throws UnknownHostException {
		MongoClient mongo = commons_db.getMongoClient();
		if (idBook != null ){
			BasicDBObject book = commons_db.obterCrudDoc("homestayBook", "_id", idBook, mongo);
			if (book != null){
				ResponseEntity result = commons_db.removerCrud("homestayBook","_id",idBook, null, mongo);
				mongo.close();
				return ResponseEntity.ok().body("ok");
			}
			book = commons_db.obterCrudDoc("suiteBook", "_id", idBook, mongo);
			if (book != null){
				if (book != null){
					ResponseEntity result = commons_db.removerCrud("suiteBook","_id",idBook, null, mongo);
					mongo.close();
					return ResponseEntity.ok().body("ok");
				}
			}
			book = commons_db.obterCrudDoc("sharedBook", "_id", idBook, mongo);
			if (book != null){
				if (book != null){
					ResponseEntity result = commons_db.removerCrud("suiteBook","_id",idBook, null, mongo);
					mongo.close();
					return ResponseEntity.ok().body("ok");
				}
			}
		}
		mongo.close();
		return ResponseEntity.badRequest().build();
	}

	public ResponseEntity obter(String idBook, MongoClient mongo) {

		BasicDBObject book = commons_db.obterCrudDoc("homestayBook", "_id", idBook, mongo);
		if (book != null){
			BasicDBObject result = new BasicDBObject();
			result.put("documento", book);
			result.put("collection", "homestayBook");
			return ResponseEntity.ok().body(result);
		}
		book = commons_db.obterCrudDoc("suiteBook", "_id", idBook, mongo);
		if (book != null){
			BasicDBObject result = new BasicDBObject();
			result.put("documento", book);
			result.put("collection", "suiteBook");
			return ResponseEntity.ok().body(result);
		}
		book = commons_db.obterCrudDoc("sharedBook", "_id", idBook, mongo);
		if (book != null){
			BasicDBObject result = new BasicDBObject();
			result.put("documento", book);
			result.put("collection", "sharedBook");
			return ResponseEntity.ok().body(result);
		}
		return ResponseEntity.badRequest().build();
	}

	public ResponseEntity lista(String idCity, MongoClient mongo) {

		BasicDBObject book = commons_db.obterCrudDoc("homestayBook", "documento.city", idCity, mongo);
		if (book != null){
			BasicDBObject result = new BasicDBObject();
			result.put("documento", book);
			result.put("collection", "homestayBook");
			return ResponseEntity.ok().body(result);
		}
		book = commons_db.obterCrudDoc("suiteBook", "documento.city", idCity, mongo);
		if (book != null){
			BasicDBObject result = new BasicDBObject();
			result.put("documento", book);
			result.put("collection", "suiteBook");
			return ResponseEntity.ok().body(result);
		}
		book = commons_db.obterCrudDoc("sharedBook", "documento.city", idCity, mongo);
		if (book != null){
			BasicDBObject result = new BasicDBObject();
			result.put("documento", book);
			result.put("collection", "sharedBook");
			return ResponseEntity.ok().body(result);
		}

		return ResponseEntity.badRequest().build();
	}

	public boolean camposValidos(org.json.simple.JSONObject queryParam, String type, MongoClient mongo) {

		BasicDBObject docObj = commons_db.obterCrudDoc("setup","documento.setupKey",type, mongo);
		ArrayList<String> validFields = new ArrayList<>();
		validFields = (ArrayList) docObj.get("setupValue");

		org.json.JSONObject reader = new org.json.JSONObject(queryParam);
		Iterator  iteratorObj = reader.keys();
		ArrayList<String> al_getAllKeys=new ArrayList<String>();
		while (iteratorObj.hasNext())
			{
				String keyName = (String)iteratorObj.next();
				if (!commons.testaElementoArray(keyName, validFields)){
					return false;
				}
			}
		return true;
	}

	public boolean camposObrigatorios(JSONObject queryParam, String type, MongoClient mongo) {

		BasicDBObject docObj = commons_db.obterCrudDoc("setup","documento.setupKey",type, mongo);
		ArrayList<String> necessaryFields = new ArrayList<>();
		necessaryFields = (ArrayList) docObj.get("setupValue");

		org.json.JSONObject reader = new org.json.JSONObject(queryParam);
		Iterator  iteratorObj = reader.keys();
		ArrayList<String> getAllKeys =new ArrayList<String>();
		while (iteratorObj.hasNext())
		{
			getAllKeys.add((String)iteratorObj.next());
		}
		for (String necessaryField : necessaryFields) {
			if (!commons.testaElementoArray(necessaryField, getAllKeys)) {
				return false;
			}
		}
		return true;
	}
}
