package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;

import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

public class Student {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	
	@SuppressWarnings("unchecked")
	public Boolean changeStatus(int indexTrip, String status, String id) throws UnknownHostException, MongoException  {
		
		BasicDBObject student = commons_db.ObterCrudDoc("student", "_id", id);
    ArrayList<JSONObject> trips = (ArrayList<JSONObject>) student.get("trips");
		JSONObject  trip = new JSONObject();
		trip.putAll(trips.get(indexTrip));
    trip.put("status", status);
    
    student.put("trips", commons.atualizaArrayObjeto(trips, trip, indexTrip, true));
    BasicDBObject documento = new BasicDBObject();
    documento.put("documento", student);
    Response result = commons_db.AtualizarCrud("student", documento, "_id", id);
    if (result.getStatus() == 200) {
    	return true;
    };
    return false;
	};
	@SuppressWarnings("unchecked")
	public Boolean allocateFamily(int indexTrip, String familyName, String idFamily, String id) throws UnknownHostException, MongoException  {
		
		BasicDBObject student = commons_db.ObterCrudDoc("student", "_id", id);
    ArrayList<JSONObject> trips = (ArrayList<JSONObject>) student.get("trips");
		JSONObject  trip = new JSONObject();
		trip.putAll(trips.get(indexTrip));
    trip.put("familyName", familyName);
    trip.put("idFamily", idFamily);
    
    student.put("trips", commons.atualizaArrayObjeto(trips, trip, indexTrip, true));
    BasicDBObject documento = new BasicDBObject();
    documento.put("documento", student);
    Response result = commons_db.AtualizarCrud("student", documento, "_id", id);
    if (result.getStatus() == 200) {
    	return true;
    };
    return false;
	};
	@SuppressWarnings("unchecked")
	public Boolean deallocateFamily(int indexTrip, String id) throws UnknownHostException, MongoException  {
		
		BasicDBObject student = commons_db.ObterCrudDoc("student", "_id", id);
    ArrayList<JSONObject> trips = (ArrayList<JSONObject>) student.get("trips");
		JSONObject  trip = new JSONObject();
		trip.putAll(trips.get(indexTrip));
    trip.put("familyName", "");
    trip.put("idFamily", "");
    
    student.put("trips", commons.atualizaArrayObjeto(trips, trip, indexTrip, true));
    BasicDBObject documento = new BasicDBObject();
    documento.put("documento", student);
    Response result = commons_db.AtualizarCrud("student", documento, "_id", id);
    if (result.getStatus() == 200) {
    	return true;
    };
    return false;
	};
};

