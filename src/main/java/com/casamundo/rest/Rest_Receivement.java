package com.casamundo.rest;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.bean.Receivement;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/receivement")

public class Rest_Receivement {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Payment payment = new Payment();
	Invoice invoice = new Invoice();
	Receivement receivement = new Receivement();
	
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response incluir(BasicDBObject documento) throws UnknownHostException, MongoException  {
		
		Response response = commons_db.incluirCrud("receivement", documento);
		if (response.getStatus() == 200) {
			String receiveId = (String) response.getEntity();
			invoice.atualizarInvoice(receiveId.toString());
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
				invoice.atualizarInvoice(queryParam.get("key").toString());
			};
			return Response.status(200).entity("true").build();
		}else{
			return Response.status(400).entity(null).build();	
		}

	};

	@Path("/get/number")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)

	public String numberInvoice() throws UnknownHostException, MongoException{
		 
		return commons_db.getNumber("numberReceivement", "yearNumberReceivement");

	};
};



