package com.casamundo.rest;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;
import java.util.Iterator;

@RestController
@RequestMapping("/school")
public class Rest_School {
	@SuppressWarnings("unchecked")
	@GetMapping(value = "/lista", produces = "application/json")
	public JSONArray ObterAgencies() {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("school");
			
			DBCursor cursor = collection.find();
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objStudent = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objStudent.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("_id", objStudent.getString("_id"));
					jsonDocumento.put("name", jsonObject.get("name"));
					jsonDocumento.put("schoolPhone", jsonObject.get("schoolPhone"));
					jsonDocumento.put("schoolEmail", jsonObject.get("schoolEmail"));
					jsonDocumento.put("nameContact", jsonObject.get("nameContact"));
					jsonDocumento.put("celPhone", jsonObject.get("celPhone"));
					jsonDocumento.put("phone", jsonObject.get("phone"));
					jsonDocumento.put("email", jsonObject.get("email"));
					jsonDocumento.put("address", jsonObject.get("address"));
					jsonDocumento.put("logo", jsonObject.get("logo"));
					jsonDocumento.put("sigla", jsonObject.get("sigla"));
					documentos.add(jsonDocumento);
					mongo.close();
				} catch (ParseException e) {
					e.printStackTrace();
				}
			};
			mongo.close();
			return documentos;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};

}
