package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.Iterator;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/agency")

public class Rest_Agency {

	@SuppressWarnings("unchecked")
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterAgencies() {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			DBCollection collection = db.getCollection("agency");
			
			DBCursor cursor = collection.find();
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objAgency = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objAgency.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("_id", objAgency.getString("_id"));
					jsonDocumento.put("name", jsonObject.get("name"));
					jsonDocumento.put("agencyPhone", jsonObject.get("agencyPhone"));
					jsonDocumento.put("agencyEmail", jsonObject.get("agencyEmail"));
					jsonDocumento.put("agencyLogo", jsonObject.get("agencyLogo"));
					jsonDocumento.put("agencySigla", jsonObject.get("agencySigla"));
					jsonDocumento.put("consultants", jsonObject.get("consultants"));
					documentos.add(jsonDocumento);
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
