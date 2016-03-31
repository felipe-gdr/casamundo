package com.rcapitol.casamundo;
import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

@Singleton
// @Lock(LockType.READ)
@Path("/student")

public class Rest_Student {

	@Path("/obter")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterStudent(@QueryParam("email") String email) throws UnknownHostException, MongoException {
		Mongo mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection("diagrams");
		BasicDBObject searchQuery = new BasicDBObject("documento.email", email);
		DBObject cursor = collection.findOne(searchQuery);
		JSONObject documento = new JSONObject();
		BasicDBObject obj = (BasicDBObject) cursor.get("documento");
		documento.put("documento", obj);
		mongo.close();
		return documento;
	};


}
