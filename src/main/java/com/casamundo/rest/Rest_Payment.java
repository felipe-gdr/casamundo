package com.casamundo.rest;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONArray;

import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/payment")

public class Rest_Payment {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Payment payment = new Payment();

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



