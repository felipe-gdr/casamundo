package com.rcapitol.casamundo;

import java.net.UnknownHostException;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

public class CrudFamily {
	
	@SuppressWarnings({ })
	public void updateRoom(String familyName, String emailStudent, String occupancy, int roomSingle, int roomCouple, int start, int end, String roomNumber)  {
		JSONParser parser = new JSONParser(); 
		JSONObject jsonObject; 
		String literal = "Single";
		if (occupancy.equals(literal)){
			try {
				jsonObject = (JSONObject) parser.parse("{\"documento.rooms." + roomSingle + ".occupancySingleBed\":{\"emailStudent\":\"" + emailStudent + "\",\"startOccupancy\":\"" + start + "\",\"endOccupancy\":\"" + end + "\"}}");
				pushFamily (familyName, jsonObject, roomNumber);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		};
		literal = "Couple";
		if (occupancy.equals(literal)){
			try {
				jsonObject = (JSONObject) parser.parse("{\"documento.rooms." + roomCouple + ".occupancyCoupleBed\":{\"emailStudent\":\"" + emailStudent + "\",\"startOccupancy\":\"" + start + "\",\"endOccupancy\":\"" + end + "\"}}");
				pushFamily (familyName, jsonObject, roomNumber);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		};
	};	

	@SuppressWarnings("unused")
	public void pushFamily(String familyName, JSONObject jsonObject, String roomNumber) {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("family");
				JSONObject documento = new JSONObject();
				BasicDBObject update = new BasicDBObject("$push", new BasicDBObject(jsonObject));
				BasicDBObject searchQuery = new BasicDBObject("documento.familyName", familyName);
				DBObject cursor = collection.findAndModify(searchQuery,
		                null,
		                null,
		                false,
		                update,
		                true,
		                false);
			mongo.close();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
	};
};
