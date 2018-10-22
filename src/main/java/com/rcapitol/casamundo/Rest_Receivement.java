package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/receivement")

public class Rest_Receivement {

	Commons commons = new Commons();
	Rest_Payment payment = new Rest_Payment();
	Commons_DB commons_db = new Commons_DB();
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluir(BasicDBObject documento) throws UnknownHostException, MongoException  {
		
		Response response = commons_db.incluirCrud("receivement", documento);
		if (response.getStatus() == 200) {
			String receiveId = (String) response.getEntity();
			atualizarInvoice(receiveId.toString());
		};
		return response;

	};

	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response atualizar(JSONObject queryParam) throws UnknownHostException, MongoException  {
				
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			Response response = commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
			if (response.getStatus() == 200) {
				atualizarInvoice(queryParam.get("key").toString());
			};
			return Response.status(200).entity("true").build();
		}else{
			return Response.status(400).entity(null).build();	
		}

	};
	
	@SuppressWarnings({ "rawtypes", "unchecked"})
	public void atualizarInvoice(String receivementId) throws UnknownHostException, MongoException {
		

		BasicDBObject receivementAtu = commons_db.obterCrudDoc("receivement", "_id", receivementId);

		ArrayList<Object> invoices = new ArrayList<Object>();
		invoices = (ArrayList<Object>) receivementAtu.get("invoices");

		for (int i = 0; i < invoices.size(); i++) {
			BasicDBObject invoice = new BasicDBObject();
			invoice.putAll((Map) invoices.get(i));
			BasicDBObject invoiceObj = commons_db.obterCrudDoc("invoice", "_id", invoice.getString("id"));
			if (invoiceObj.get("netGross") != null && invoiceObj.get("total") != null ) {
				float total = Float.valueOf(invoiceObj.getString("total"));
				float valuePayedObj = 0;
				if (invoiceObj.get("valuePayed") != null) {
					valuePayedObj = Float.valueOf(invoiceObj.getString("valuePayed"));
				}
				float valuePayed = 0;
				if (invoice.get("valuePayed") != null) {
					valuePayed = Float.valueOf(invoice.getString("valuePayed"));
				}
				if ((valuePayedObj + valuePayed) >= total) {
					invoiceObj.put("valuePayed", Float.toString(total));
					invoiceObj.put("paid","paid");
				}else {
					valuePayedObj = valuePayedObj + valuePayed;						
					invoiceObj.put("valuePayed", Float.toString(valuePayedObj));
					invoiceObj.put("paid","partial");
				}
			}
			ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
			BasicDBObject update = new BasicDBObject(); 
			update.put("field", "documento");
			update.put("value", invoiceObj);
			arrayUpdate.add(update);
			commons_db.atualizarCrud("invoice", arrayUpdate, "_id", invoice.getString("id"));
		}
		String key = "";
		String value = "";
		String collection = "";
		
		if (receivementAtu.getString("agency") != null) {
			key = "documento.agency";
			value = receivementAtu.getString("agency");
			collection = "agency";
		}else {
			key = "documento.student";
			value = receivementAtu.getString("student");
			collection = "student";
		}
		Response response = commons_db.listaCrud("invoice", key, value, null, null, null, true);
		invoices = new ArrayList<Object>();
		invoices = (JSONArray) response.getEntity();

		float paidValueTotal = 0;
		if (response != null) {
			for (int i = 0; i < invoices.size(); i++) {
				BasicDBObject invoice = new BasicDBObject();
				invoice.putAll((Map) invoices.get(i));
				BasicDBObject invoiceObj = (BasicDBObject) invoice.get("documento");
				if (invoiceObj.get("valuePayed") != null) {
					paidValueTotal = paidValueTotal + Float.valueOf(invoiceObj.getString("valuePayed"));
				};
			}
		};

		float receiveValueTotal = 0;
		response = commons_db.listaCrud("receivement", key, value, null, null, null, true);
		ArrayList<Object> receivements = new ArrayList<Object>();
		receivements = (JSONArray) response.getEntity();

		if (response != null) {
			for (int i = 0; i < receivements.size(); i++) {
				BasicDBObject receivement = new BasicDBObject();
				receivement.putAll((Map) receivements.get(i));
				BasicDBObject receivementObj = (BasicDBObject) receivement.get("documento");
				if (receivementObj.get("amount") != null) {
					receiveValueTotal = receiveValueTotal + Float.valueOf(receivementObj.getString("amount"));
				};
			}
		};
		
		float balance = 0;
		if (receiveValueTotal > paidValueTotal) {
			balance = receiveValueTotal - paidValueTotal;
		};
		ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
		BasicDBObject update = new BasicDBObject(); 
		update.put("field", "balance");
		update.put("value", Float.toString(balance));
		arrayUpdate.add(update);
		commons_db.atualizarCrud(collection, arrayUpdate, "_id", value);
		
	};

	@Path("/get/number")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)

	public String number(){
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject obj = new BasicDBObject();
			ObjectId id = new ObjectId(); 
			DBCollection collection = db.getCollection("setup");
			BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", "numberReceive");
			DBObject cursor = collection.findOne(searchQuery);
			int number = 1;
			if (cursor != null){
				obj = (BasicDBObject) cursor.get("documento");
				id = (ObjectId) cursor.get("_id");
				String oldNumber = obj.getString("setupValue");
				number = ((Integer.parseInt(oldNumber) + 1 ));
			};
			searchQuery = new BasicDBObject("documento.setupKey", "yearNumberReceive");
			cursor = collection.findOne(searchQuery);
			String year = "2017";
			if (cursor != null){
				obj = (BasicDBObject) cursor.get("documento");
				year = obj.getString("setupValue");
			};
			//
			// ** atualizar novo numero
			//
			BasicDBObject objUpdate = new BasicDBObject();
			objUpdate.put("documento.setupKey", "numberReceive");
			objUpdate.put("documento.setupValue", Integer.toString(number));
			BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
			BasicDBObject setQuery = new BasicDBObject("_id", id);
			cursor = collection.findAndModify(setQuery,
	                null,
	                null,
	                false,
	                update,
	                true,
	                false);
			mongo.close();

			return Integer.toString(number) + "/" + year;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		};
		return null;
	};
};



