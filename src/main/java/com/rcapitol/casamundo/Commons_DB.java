package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.Iterator;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.bson.BasicBSONObject;
import org.bson.types.ObjectId;
import org.json.simple.JSONArray;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

public class Commons_DB {
	
	@SuppressWarnings({ "rawtypes" })
	public Response ObterCrud(String collectionName, String key, String value) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		BasicDBObject setQuery = new BasicDBObject(key, value);
		DBObject cursor = collection.findOne(setQuery);
		BasicDBObject documento = new BasicDBObject();
		BasicDBObject doc = new BasicDBObject();
		doc.putAll((Map) cursor.get("documento"));
		BasicDBObject obj = new BasicDBObject();
		String id = ((BasicBSONObject) cursor).getString("_id");
		obj.put("id", id);
		documento.put("documento", obj);
		mongo.close();
		return Response.status(200).entity(documento).build();
	};

	public Response IncluirCrud(String collectionName, DBObject documento) throws UnknownHostException, MongoException {
		Mongo mongo;		
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		collection.insert(documento);
		documento.put("id", documento.get( "_id" ).toString());
		mongo.close();
		return Response.status(200).entity(documento).build();
	}

	@SuppressWarnings("rawtypes")
	public Response AtualizarCrud(String collectionName, Object documento, String key, String value) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		BasicDBObject setQuery = new BasicDBObject();
		if (key.equals("_id")) {
			ObjectId idObj = new ObjectId(value);
			setQuery = new BasicDBObject(key, idObj);
		}else {
			setQuery = new BasicDBObject(key, value);
		};
		BasicDBObject docObj = new BasicDBObject();
		docObj.putAll((Map) documento);
		collection.findAndModify(setQuery,
                null,
                null,
                false,
                (DBObject) documento,
                true,
                false);
		mongo.close();
		return Response.status(200).entity(documento).build();
	};

	@SuppressWarnings({ "rawtypes" })
	public Response listaCrud(String collectionName, String key, String value) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		BasicDBObject setQuery = new BasicDBObject();
		if(key != null){
	    	setQuery.put(key, value);
	    };
		
		DBCursor cursor = collection.find(setQuery);
		JSONArray documentos = new JSONArray();
		while (((Iterator<DBObject>) cursor).hasNext()) {
			BasicDBObject obj = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
			BasicDBObject doc = new BasicDBObject();
			doc.putAll((Map) obj.get("documento"));
			doc.put("id", obj.get( "_id" ).toString());			
		};
	    mongo.close();
		return Response.status(200).entity(documentos).build();
	};

};
