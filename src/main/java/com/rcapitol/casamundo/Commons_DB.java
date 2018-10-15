package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
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
	public Response obterCrud(String collectionName, String key, String value) throws UnknownHostException, MongoException {
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
	@SuppressWarnings({ })
	public Response obterId(String collectionName) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		
		if (collection != null) {
			int id = collection.find().count();
			id = id++;
			String idS = '"'+Integer.toString(id)+'"';
			return Response.status(200).entity(idS).build();
		}else {
			mongo.close();
			return Response.status(400).entity(null).build();			
		}
	};
	@SuppressWarnings({ "rawtypes" })
	public BasicDBObject obterCrudDoc(String collectionName, String key, String value) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		BasicDBObject setQuery = new BasicDBObject();
		if (key.equals("_id")) {
			ObjectId idObj = new ObjectId(value);
			setQuery = new BasicDBObject(key, idObj);
		}else {
			if (value.equals("onlyOneRegister")) {
				DBObject cursor = collection.findOne(setQuery);
				if (cursor != null) {
					BasicDBObject documento = new BasicDBObject();
					documento.putAll((Map) cursor.get("documento"));
					String id = ((BasicBSONObject) cursor).getString("_id");
					documento.put("_id", id);
					mongo.close();
					return documento;				
				}
			}else {
				setQuery = new BasicDBObject(key, value);
			}
		};
		DBObject cursor = collection.findOne(setQuery);
		if (cursor != null) {
			BasicDBObject documento = new BasicDBObject();
			documento.putAll((Map) cursor.get("documento"));
			String id = ((BasicBSONObject) cursor).getString("_id");
			documento.put("_id", id);
			mongo.close();
			return documento;
		}
		return null;
	};

	@SuppressWarnings("rawtypes")
	public Response incluirCrud(String collectionName, BasicDBObject doc) throws UnknownHostException, MongoException {
		Mongo mongo;		
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);

		int id = collection.find().count();
		
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) doc);
		documento.put("id", Integer.toString(id++));
		BasicDBObject documentoFinal = new BasicDBObject();
		documentoFinal.put("documento", documento);
		documentoFinal.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));
		DBObject insert = new BasicDBObject(documentoFinal);
		collection.insert(insert);
		documentoFinal.put("_id", insert.get( "_id" ).toString());
		mongo.close();
		return Response.status(200).entity(insert.get( "_id" ).toString()).build();
	}

	@SuppressWarnings({ "rawtypes", "unchecked", "unused" })
	public Response atualizarCrud(String collectionName, Object updateInput, String key, String valueInp) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		
		BasicDBObject objDocumento = new BasicDBObject();

		Response response = obterCrud(collectionName, key, valueInp);
		if ((response.getStatus() == 200)){
			BasicDBObject cursor = new BasicDBObject();
			cursor.putAll((Map) response.getEntity());
			if (cursor != null){
				objDocumento.putAll((Map) cursor.get("documento"));
			}else {
				return Response.status(200).entity("false").build();
			}
		}else {
			return Response.status(200).entity("false").build();
		}
		
		if (objDocumento != null) {
			List arrayUpdate = (List) updateInput;
			for (int i = 0; i < arrayUpdate.size(); i++) {
				BasicDBObject setUpdate = new BasicDBObject();
				setUpdate.putAll((Map) arrayUpdate.get(i));
				Object value = setUpdate.get("value");
				if (value instanceof String){
					String docUpdate = setUpdate.get("value").toString();
					objDocumento.remove(setUpdate.get("field"));
					objDocumento.put((String) setUpdate.get("field"), docUpdate);
				}else{
					if (value instanceof ArrayList){
						ArrayList docUpdate = (ArrayList) setUpdate.get("value");
						objDocumento.remove(setUpdate.get("field"));
						JSONArray arrayField = new JSONArray();
						for (int j = 0; j < docUpdate.size(); j++) {
							if (docUpdate.get(j) instanceof String){
								arrayField.add(docUpdate.get(j));									
							}else{
								BasicDBObject docUpdateItem = new BasicDBObject();
								docUpdateItem.putAll((Map) docUpdate.get(j));
								arrayField.add(docUpdateItem);
							};
						};
						objDocumento.put((String) setUpdate.get("field"), arrayField);
					}else{
						BasicDBObject docUpdate = new BasicDBObject();
						docUpdate.putAll((Map) setUpdate.get("value"));
						if (setUpdate.get("field").equals("documento")){
							objDocumento.clear();
							objDocumento.putAll((Map) docUpdate);
						}else{
							objDocumento.remove(setUpdate.get("field"));
							objDocumento.put((String) setUpdate.get("field"), docUpdate);
						};
					};
				};
			};
			BasicDBObject doc = new BasicDBObject();
			doc.put("documento", objDocumento);
			doc.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));
			BasicDBObject setQuery = new BasicDBObject();
			if (key.equals("_id")) {
				ObjectId idObj = new ObjectId(valueInp);
				setQuery = new BasicDBObject(key, idObj);
			}else {
				setQuery = new BasicDBObject(key, valueInp);
			};

			DBObject update = new BasicDBObject(doc);
			collection.findAndModify(setQuery,
	                null,
	                null,
	                false,
	                update,
	                true,
	                false);
		};
		mongo.close();
		return Response.status(200).entity("true").build();
	};

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Response listaCrud(String collectionName, String key, String value, String userId, BasicDBObject setQueryInput, BasicDBObject setSortInput, Boolean onlyPrivate) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		BasicDBObject setQuery = new BasicDBObject();
		if(key != null){
	    	setQuery.put(key, value);
	    };

	    if (setQueryInput != null) {
	    	setQuery = setQueryInput; 
	    }
	    BasicDBObject setSort = new BasicDBObject();
		setSort.put("lastChange", -1);

	    if (setQueryInput != null) {
	    	setSort = setSortInput; 
	    }
		
		BasicDBObject setup = obterCrudDoc("setup", "documento.setupKey", collectionName);
		
		BasicDBObject user = new BasicDBObject();
		if (setup != null && !onlyPrivate) {
			if (userId == null) {
				return null;
			}			
			user = obterCrudDoc("usuarios", "_id", userId);
			if (user == null) {
				return null;
			}			
			if (user.get("company") == null) {
				return null;
			}
			if (user.get("city") == null) {
				return null;
			}
		};
				
		BasicDBObject setupValue = new BasicDBObject();
		String companyTable = null;
		String cityTable = null;

		if (setup != null) {
			setupValue = (BasicDBObject) setup.get("setupValue");
			companyTable = (String) setupValue.get("company");
			cityTable = (String) setupValue.get("city");
		}

		if (companyTable != null) {
			setQuery.put("documento." + companyTable, user.get("company"));
		}
		
		DBCursor cursor = collection.find(setQuery).sort(setSort);
		if (cursor != null) {
			JSONArray documentos = new JSONArray();
			ArrayList cityUser = (ArrayList) user.get("city");
			while (((Iterator<DBObject>) cursor).hasNext()) {
				BasicDBObject obj = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				BasicDBObject docObj = (BasicDBObject) obj.get("documento");
				BasicDBObject doc = new BasicDBObject();
				doc.putAll((Map) obj);
				doc.put("_id", obj.get( "_id" ).toString());
				if (cityTable != null) {
					Object object = docObj.get(cityTable);
					if (object != null){
						if (object instanceof String){
							if (commons.testaElementoArray(object.toString(), cityUser)){
								documentos.add(doc);						
							}
						}else{
							if (object instanceof ArrayList){
								ArrayList cityDoc = (ArrayList)docObj.get(cityTable);
								if (commons.testaArray(cityUser, cityDoc)){
									documentos.add(doc);						
								}
							}else{
								documentos.add(doc);						
							};
						};
					}
				}else{
					documentos.add(doc);						
				};
			};
		    mongo.close();
			return Response.status(200).entity(documentos).build();
		}else {
		    mongo.close();
			return Response.status(400).entity(null).build();			
		}
	};
	@SuppressWarnings({ })
	public Response removerCrud(String collectionName, String key, String value, BasicDBObject setQueryInput) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);

		BasicDBObject setQuery = new BasicDBObject();
		setQuery.put(key, value);
		
		if (setQueryInput != null) {
			setQuery = setQueryInput;
		}
		collection.remove(setQuery);
		
		return Response.status(200).entity("true").build();
	};

	@SuppressWarnings({ "rawtypes", "unchecked", "unused" })
	public Response arrayCrud(String collectionName, String key, String value, String type, String field, String indexInp, Object item) throws UnknownHostException, MongoException {
		Mongo mongo;
		mongo = new Mongo();
		DB db = (DB) mongo.getDB("documento");
		DBCollection collection = db.getCollection(collectionName);
		
		BasicDBObject objDocumento = new BasicDBObject();

		if ((type.equals("update") || type.equals("in")) && item.equals(null) ) {
			return Response.status(200).entity("false").build();
		}
		if ((type.equals("update") || type.equals("out")) && indexInp.equals(null) ) {
			return Response.status(200).entity("false").build();
		}
		Response response = obterCrud(collectionName, key, value);
		if ((response.getStatus() == 200)){
			BasicDBObject cursor = new BasicDBObject();
			cursor.putAll((Map) response.getEntity());
			if (cursor != null){
				objDocumento.putAll((Map) cursor.get("documento"));
			}else {
				return Response.status(200).entity("false").build();
			}
		}else {
			return Response.status(200).entity("false").build();
		}
		
		int index = 0;
		if (!indexInp.equals(null)) {
			index = Integer.parseInt(indexInp);
		};
		if (objDocumento != null) {
			if (objDocumento.get(field) instanceof ArrayList){
				ArrayList docUpdate = (ArrayList) objDocumento.get(field);
				if (!indexInp.equals(null)) {
					if (index > docUpdate.size()) {
						return Response.status(200).entity("false").build();						
					}
				}
				objDocumento.remove(field);
				JSONArray arrayField = new JSONArray();
				for (int j = 0; j < docUpdate.size(); j++) {
					if (docUpdate.get(j) instanceof String){
						if (type.equals("update") && index == j) {
							arrayField.add(item);
						}else {
							if (type.equals("out") && index == j) {
							}else {
								arrayField.add(docUpdate.get(j));								
							}
						}
					}else{
						BasicDBObject docUpdateItem = new BasicDBObject();
						docUpdateItem.putAll((Map) docUpdate.get(j));
						if (type.equals("update") && index == j) {
							arrayField.add(item);
						}else {
							if (type.equals("out") && index == j) {
							}else {
								arrayField.add(docUpdateItem);
							}
						}
					};
				};
				if (type.equals("in")) {
					arrayField.add(item);
				}					
				objDocumento.put(field, arrayField);
				BasicDBObject doc = new BasicDBObject();
				doc.put("documento", objDocumento);
				doc.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));
				BasicDBObject setQuery = new BasicDBObject();
				if (key.equals("_id")) {
					ObjectId idObj = new ObjectId(value);
					setQuery = new BasicDBObject(key, idObj);
				}else {
					setQuery = new BasicDBObject(key, value);
				};
	
				DBObject update = new BasicDBObject(doc);
				collection.findAndModify(setQuery,
		                null,
		                null,
		                false,
		                update,
		                true,
		                false);
			};
		};
		mongo.close();
		return Response.status(200).entity("true").build();
	};
};

