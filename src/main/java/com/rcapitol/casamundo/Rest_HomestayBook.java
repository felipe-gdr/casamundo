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
						emailFamily(homestayBook.getString("resource"), homestayBook.getString("studentId"), homestayBook.getString("start").substring(10), homestayBook.getString("end").substring(10), "accepted" );
						return Response.status(200).entity("Offer successfull accepted.").build();
					}
					else {
						emailFamily(homestayBook.getString("resource"), homestayBook.getString("studentId"), homestayBook.getString("start").substring(10), homestayBook.getString("end").substring(10), "recused" );
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
	}

	private void emailFamily(String resource, String travelId, String start, String end, String msg) throws UnknownHostException, MongoException {
		BasicDBObject familyDorm = commons_db.ObterCrudDoc("familyDorm", "documento.id", resource);
		if ( !familyDorm.get("roomid").equals(null)) {
			BasicDBObject familyRoom = commons_db.ObterCrudDoc("familyRoom", "_id", familyDorm.getString("roomid"));
			BasicDBObject travel = commons_db.ObterCrudDoc("travel", "_id", travelId);
			if (!familyRoom.get("familyRooms").equals(null) && !travel.get("studentId").equals(null)) {
				BasicDBObject table = commons_db.ObterCrudDoc("table", null, "onlyOneRegister");
				BasicDBObject student = commons_db.ObterCrudDoc("student", "_id", travel.getString("studentId"));
				BasicDBObject family = commons_db.ObterCrudDoc("family", "_id", familyRoom.getString("familyId"));
				TemplateEmail templateEmail = new TemplateEmail();
				SendEmailHtml sendEmail = new SendEmailHtml();
				@SuppressWarnings("unchecked")
				ArrayList<String> toArray = (ArrayList<String>) table.get("emailsHomestay");
				for (String to : toArray) {
					sendEmail.sendEmailHtml(
							"smtp.gmail.com", 
							"noreply@casa-toronto.com", 
							"Casatoronto1q2w3e", 
							"noreply@casa-toronto.com", 
							to,
							"	Family " + family.getString("name") + " " + msg + " student " + student.getString("name") + " for the period of " + start + " to " + end, 
							templateEmail.emailFamilia(family.getString("name"), student.getString("name"), start, end, msg)
							);					
				}
			
			}
		}
	};
	
};
