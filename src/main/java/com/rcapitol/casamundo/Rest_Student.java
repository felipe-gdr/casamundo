package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/student")

public class Rest_Student {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Student student = new Student();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/getAllocation")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public BasicDBObject getAllocation(@QueryParam("studentId") String studentId) throws UnknownHostException, MongoException {

		Response response =  commons_db.listaCrud("travel", "documento.studentId", studentId);

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
				response =  commons_db.listaCrud("homestayBook", "documento.studentId", travelId);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getEntity();
				for (int j = 0; j < allocations.size(); j++) {
					BasicDBObject allocation = new BasicDBObject();
					allocation.putAll((Map) allocations.get(j));
					allocationsHomeStay.add(allocation);
				};
			}
			if (bookType.equals("shared")){
				response =  commons_db.listaCrud("sharedBook", "documento.studentId", travelId);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getEntity();
				for (int j = 0; j < allocations.size(); j++) {
					BasicDBObject allocation = new BasicDBObject();
					allocation.putAll((Map) allocations.get(j));
					allocationsShared.add(allocation);
				};
			}
			if (bookType.equals("suite")){
				response =  commons_db.listaCrud("suiteBook", "documento.studentId", travelId);
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
	
};
