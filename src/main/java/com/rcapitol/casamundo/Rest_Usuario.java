package com.rcapitol.casamundo;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/usuario")

public class Rest_Usuario {

	Commons_DB commons_db = new Commons_DB();
	
	@Path("/obter")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public BasicDBObject ObterUsuarioName(@QueryParam("email") String email) throws UnknownHostException, MongoException {

		return commons_db.obterCrudDoc("usuarios", "documento.email", email);

	};

};
