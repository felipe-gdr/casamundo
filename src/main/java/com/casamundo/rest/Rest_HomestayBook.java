package com.casamundo.rest;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.casamundo.bean.HomestayBook;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/homestayBook")

public class Rest_HomestayBook {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	HomestayBook homestayBook = new HomestayBook();
	@Path("/responseEmail")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response ObterEmail(@QueryParam("alocationId") String alocationId, @QueryParam("invite") String invite) throws UnknownHostException, MongoException {

		return homestayBook.responseEmail(alocationId, invite);

	}
};
