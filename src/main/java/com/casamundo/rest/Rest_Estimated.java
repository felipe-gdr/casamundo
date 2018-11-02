package com.casamundo.rest;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/payment")

public class Rest_Estimated {


	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();

	@Path("/get/number")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)

	public String numberInvoice() throws UnknownHostException, MongoException{
		 
		return commons_db.getNumber("numberEstimated", "yearNumberEstimated");

	};
};



