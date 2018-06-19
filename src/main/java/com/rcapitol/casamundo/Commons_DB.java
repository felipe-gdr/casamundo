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
	
	Commons commons = new Commons();
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
	@SuppressWarnings({ "rawtypes" })
	public BasicDBObject ObterCrudDoc(String collectionName, String key, String value) throws UnknownHostException, MongoException {
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
				documento.putAll((Map) cursor.get("documento"));
				String id = ((BasicBSONObject) cursor).getString("_id");
				documento.put("_id", id);
				mongo.close();
				return documento;
			}else {
				mongo.close();
				return null;
			}
		}else {
			mongo.close();
			return null;			
		}
	};

	@SuppressWarnings("rawtypes")
	public Response IncluirCrud(String collectionName, BasicDBObject doc) throws UnknownHostException, MongoException {
		Mongo mongo;		
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);

		int id = collection.find().count();
		
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) doc);
		documento.put("id", id++);
		BasicDBObject documentoFinal = new BasicDBObject();
		documentoFinal.put("documento", documento);
		documentoFinal.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));
		DBObject insert = new BasicDBObject(documentoFinal);
		collection.insert(insert);
		documentoFinal.put("_id", insert.get( "_id" ).toString());
		mongo.close();
		return Response.status(200).entity("true").build();
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
		documento.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));

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

	    BasicDBObject setSort = new BasicDBObject();
		setSort.put("lastChange", -1);
		
		DBCursor cursor = collection.find(setQuery).sort(setSort);
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

