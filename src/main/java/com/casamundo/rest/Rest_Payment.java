package com.casamundo.rest;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/payment")

public class Rest_Payment {


	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();

	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluir(BasicDBObject doc) throws UnknownHostException, MongoException  {
				
		return invoice.incluir(doc);

	};

	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response atualizar(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
			return Response.status(200).entity("true").build();
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray listaPayment(@QueryParam("date") String date, @QueryParam("occHome") String occHome, @QueryParam("userId") String userId ) throws UnknownHostException, MongoException {
		
		if (date != null && occHome != null && userId != null) {
			return payment.listaPayment(date, occHome, userId);
		}
		
		return null;

	}	

	@Path("/get/number")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)

	public String numberInvoice() throws UnknownHostException, MongoException{
		 
		return commons_db.getNumber("numberPayment", "yearNumberPayment");

	};
};



