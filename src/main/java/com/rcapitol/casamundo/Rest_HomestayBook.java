package com.rcapitol.casamundo;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.text.SimpleDateFormat;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/homestayBook")

public class Rest_HomestayBook {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();

	@Path("/responseEmail")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response ObterEmail(@QueryParam("alocationId") String alocationId, @QueryParam("invite") String invite) throws UnknownHostException, MongoException {

		BasicDBObject homestayBook = commons_db.ObterCrudDoc("homestayBook", "_id", alocationId);
		if ( !homestayBook.get("ativo").equals(null) && !homestayBook.get("invite").equals("null") ) {
			if ( homestayBook.getString("ativo").equals("ativo") ) {
				if(homestayBook.getString("invite").equals("pendent")) {
					ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
					BasicDBObject update = new BasicDBObject(); 
					update.put("field", "invite");
					update.put("value",invite);
					arrayUpdate.add(update);
					if (invite.equals("no")) {
						update = new BasicDBObject(); 
						update.put("field", "ativo");
						update.put("value","inativo");
						arrayUpdate.add(update);
					}
					update = new BasicDBObject(); 
					update.put("field", "confirmWho");
					update.put("value","family");
					arrayUpdate.add(update);
					Date today = new Date();
					SimpleDateFormat datePattern = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
					update = new BasicDBObject(); 
					update.put("field", "confirmWhen");
					update.put("value",datePattern.format(today));
					arrayUpdate.add(update);
					commons_db.atualizarCrud("homestayBook", arrayUpdate, "_id", alocationId);
					if (invite.equals("yes")) {
						return Response.status(200).entity("Offer successfull accepted.").build();
					}
					else {
						return Response.status(200).entity("Offer successfull recused.").build();
					}
				}
				else {
					if (invite.equals("yes")) {
						return Response.status(200).entity("Offer already accepted.").build();
					}
					else {
						return Response.status(200).entity("Offer already recused.").build();
					}
				}
			}
			else {
				return Response.status(200).entity("Offer canceled.").build();
			}
		}
		return Response.status(200).entity("Error.").build();
	};
	
};
