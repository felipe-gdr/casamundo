package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.ArrayList;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.casamundo.bean.Agency;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/agency")

public class Rest_Agency {

	Agency agency = new Agency();
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Object> ObterAgencies() throws UnknownHostException, MongoException {

		
		return agency.listaAgency();
	};

}
