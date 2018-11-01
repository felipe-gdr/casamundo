package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/book")

public class Rest_Book {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();

	@SuppressWarnings({ "rawtypes" })
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluir(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) queryParam.get("documento"));
		String travelId = documento.getString("studentId");
		if (collection != null ){
			Response response = commons_db.incluirCrud(collection, documento);
			BasicDBObject entity = new BasicDBObject();
			entity.putAll((Map) response.getEntity());
			payment.managementCostsBooking(travelId, entity.toString());
			return response;
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@SuppressWarnings("rawtypes")
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Atualizar(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		if (queryParam.get("collection") != null ){
			Response result = commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
			BasicDBObject docUpdate = new BasicDBObject();
			docUpdate = (BasicDBObject) queryParam.get("update");
			BasicDBObject objDocumento = new BasicDBObject();
			objDocumento.putAll((Map) docUpdate);
			BasicDBObject doc = (BasicDBObject) objDocumento.get("documento");
			payment.managementCostsBooking(doc.getString("studentId"), queryParam.get("value").toString());
			return result;
		}else{
			return Response.status(400).entity(null).build();	
		}
	};
		
};



