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
import org.json.simple.JSONObject;

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
	Estimated estimated = new Estimated();

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluir(BasicDBObject doc) throws UnknownHostException, MongoException  {
		
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) doc);
		
		BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", documento.getString("trip"));
		BasicDBObject accomodation = (BasicDBObject) travel.get("accomodation");
		BasicDBObject weeksDays = commons.numberWeeks(accomodation.getString("checkIn"), accomodation.getString("checkOut"));
		documento.put("weeks", weeksDays.get("weeks"));
		documento.put("extraNightsEntrada", weeksDays.get("extraNightsEntrada"));
		documento.put("extraNightsSaida", weeksDays.get("extraNightsSaida"));
		documento.put("checkIn", accomodation.get("checkIn"));
		documento.put("checkOut", accomodation.get("checkOut"));
		BasicDBObject numberWeeksDays = commons.numberWeeks(accomodation.getString("checkIn"), accomodation.getString("checkOut"));
		ArrayList<Object> products = (ArrayList<Object>) documento.get("products");
		ArrayList<Object> productsResult = new ArrayList<Object>();

		for (int i = 0; i < products.size(); i++) {
			BasicDBObject product = new BasicDBObject();
			product.putAll((Map) products.get(i));
			BasicDBObject productDoc = commons_db.obterCrudDoc("priceTable", "_id", product.getString("id"));
			ArrayList<Object> dates = new ArrayList<Object>();
			if (productDoc.getString("charging").equals("week")) {
				BasicDBObject date = new BasicDBObject();
				date.put("start", numberWeeksDays.get("startWeeks"));
				date.put("end", numberWeeksDays.get("endWeeks"));
				dates.add(date);
			}
			if (productDoc.getString("charging").equals("eNight")) {
				if (!weeksDays.get("extraNightsEntrada").equals("")) {
					BasicDBObject date = new BasicDBObject();
					date.put("start", numberWeeksDays.get("startExtraNightsEntrada"));
					date.put("end", numberWeeksDays.get("endExtraNightsEntrada"));
					dates.add(date);
				}				
				if (!weeksDays.get("extraNightsSaida").equals("")) {
					BasicDBObject date = new BasicDBObject();
					date.put("start", numberWeeksDays.get("startExtraNightsSaida"));
					date.put("end", numberWeeksDays.get("endExtraNightsSaida"));
					dates.add(date);
				}				
			}
			productDoc.put("dates", dates);
			productsResult.add(productDoc);
		}
		documento.put("products", productsResult);
		Response response = commons_db.incluirCrud("invoice", documento);
		if (response.getStatus() == 200) {
			String invoiceId = (String) response.getEntity();
			if (invoiceId != null) {
				estimated.criarCosts(invoiceId.toString());
			}
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
				payment.criarCosts(queryParam.get("key").toString());
			};
			return Response.status(200).entity("true").build();
		}else{
			return Response.status(400).entity(null).build();	
		}
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

	@Path("/testadata")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public BasicDBObject testaData(@QueryParam("start") String start, @QueryParam("end") String end) throws UnknownHostException, MongoException {

		
		return commons.numberWeeks(start, end);

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



