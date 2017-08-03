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
		BasicDBObject setQuery = new BasicDBObject();
		if (value != null) {
			if (key.equals("_id")) {
				ObjectId idObj = new ObjectId(value);
				setQuery = new BasicDBObject(key, idObj);
			}else {
				setQuery = new BasicDBObject(key, value);
			};
			DBObject cursor = collection.findOne(setQuery);
			if (cursor != null) {
				BasicDBObject documento = new BasicDBObject();
				BasicDBObject doc = new BasicDBObject();
				doc.putAll((Map) cursor.get("documento"));
				String id = ((BasicBSONObject) cursor).getString("_id");
				documento.put("documento", doc);
				documento.put("_id", id);
				mongo.close();
				return Response.status(200).entity(documento).build();
			}else {
				mongo.close();
				return Response.status(400).entity(null).build();
			}
		}else {
			mongo.close();
			return Response.status(400).entity(null).build();			
		}
	};

	public Response IncluirCrud(String collectionName, BasicDBObject doc) throws UnknownHostException, MongoException {
		Mongo mongo;		
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		DBObject insert = new BasicDBObject(doc);
		collection.insert(insert);
		doc.put("_id", insert.get( "_id" ).toString());
		mongo.close();
		return Response.status(200).entity(doc).build();
	}

	public Response AtualizarCrud(String collectionName, BasicDBObject documento, String key, String value) throws UnknownHostException, MongoException {
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
		DBObject update = new BasicDBObject(documento);
		collection.findAndModify(setQuery,
                null,
                null,
                false,
                update,
                true,
                false);
		mongo.close();
		if (key.equals("_id")) {
			documento.put("_id", value);
		};
		return Response.status(200).entity(documento).build();
	};

	@SuppressWarnings({ "rawtypes", "unchecked" })
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
		if (cursor != null) {
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				BasicDBObject obj = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				BasicDBObject doc = new BasicDBObject();
				doc.putAll((Map) obj);
				doc.put("_id", obj.get( "_id" ).toString());
				documentos.add(doc);
			};
		    mongo.close();
			return Response.status(200).entity(documentos).build();
		}else {
		    mongo.close();
			return Response.status(400).entity(null).build();			
		}
	};

};

