package com.casamundo.rest;

import java.net.UnknownHostException;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/table")
public class Rest_Table {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	
	@SuppressWarnings("unchecked")
	@GetMapping(value = "/obter", produces = "application/json")
	public JSONObject Obter() {
		
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("table");
			BasicDBObject searchQuery = new BasicDBObject();
			DBObject cursor = collection.findOne(searchQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			documento.put("documento", obj);
			mongo.close();
			return documento;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};

}
