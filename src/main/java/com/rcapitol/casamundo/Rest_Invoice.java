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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/invoice")

public class Rest_Invoice {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Rest_PriceTable priceTable = new Rest_PriceTable();
	Rest_Payment payment = new Rest_Payment();
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluir(BasicDBObject documento) throws UnknownHostException, MongoException  {
		
		Response response = commons_db.incluirCrud("invoice", documento);
		if (response.getStatus() == 200) {
			String invoiceId = (String) response.getEntity();
			if (invoiceId != null) {
				payment.criarCosts(invoiceId.toString());
			}
		};
		return response;

	};

	@SuppressWarnings("rawtypes")
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response atualizar(BasicDBObject documento) throws UnknownHostException, MongoException  {
		
		String value = documento.get("_id").toString();
		documento.remove("_id");		
		Response response = commons_db.atualizarCrud("invoice", documento, "_id", value);
		if (response.getStatus() == 200) {
			BasicDBObject doc = new BasicDBObject();
			doc.putAll((Map) response.getEntity());
			ObjectId id = new ObjectId(doc.getString("_id"));
			payment.criarCosts(id.toString());
		};
		return response;

	};

	@Path("/get/number")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)

	public String numberInvoice(){
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			BasicDBObject obj = new BasicDBObject();
			ObjectId id = new ObjectId(); 
			DBCollection collection = db.getCollection("setup");
			BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", "numberInvoice");
			DBObject cursor = collection.findOne(searchQuery);
			int number = 1;
			if (cursor != null){
				obj = (BasicDBObject) cursor.get("documento");
				id = (ObjectId) cursor.get("_id");
				String oldNumber = obj.getString("setupValue");
				number = ((Integer.parseInt(oldNumber) + 1 ));
			};
			searchQuery = new BasicDBObject("documento.setupKey", "yearNumberInvoice");
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
			objUpdate.put("documento.setupKey", "numberInvoice");
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
	

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Path("/itensinvoiceautomatica")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList calculaInvoiceAutomatica(@QueryParam("travelId") String travelId, @QueryParam("userId") String userId) throws UnknownHostException, MongoException {

		if (travelId.equals(null)) {
			return null;
		}

		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
		
		if (travel == null) {
			return null;
		}

		ArrayList<BasicDBObject> result = new ArrayList<BasicDBObject>();

		BasicDBObject item = new BasicDBObject();
		item.putAll((Map) travel.get("accomodation"));

		ArrayList<BasicDBObject> priceTableList = (ArrayList<BasicDBObject>) commons_db.listaCrud("priceTable", null, null, userId, null, null, false).getEntity();
		
		for (BasicDBObject priceTable : priceTableList) {
			ArrayList<BasicDBObject> priceTableValueList = (ArrayList<BasicDBObject>) commons_db.listaCrud("priceTableValue", "documento.idPriceTable", priceTable.getString("_id"), userId, null, null, false).getEntity();
			for (BasicDBObject priceTableValue : priceTableValueList) {
				System.out.println("valor:" + priceTableValue.getInt("value"));		
			}
			
		}
		
		return result;
	};
};



