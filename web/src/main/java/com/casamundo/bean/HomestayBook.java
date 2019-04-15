package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.commons.SendEmailHtml;
import com.casamundo.commons.TemplateEmail;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class HomestayBook {

	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();

	public ResponseEntity responseEmail(String alocationId, String invite, MongoClient mongo) throws UnknownHostException {
		
		BasicDBObject homestayBook = commons_db.obterCrudDoc("homestayBook", "_id", alocationId, mongo);
		if (homestayBook != null) {
			if (!homestayBook.get("ativo").equals(null) && !homestayBook.get("invite").equals("null")) {
				if (homestayBook.getString("ativo").equals("ativo")) {
					if (homestayBook.getString("invite").equals("pendent")) {
						ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
						BasicDBObject update = new BasicDBObject();
						update.put("field", "invite");
						update.put("value", invite);
						arrayUpdate.add(update);
						if (invite.equals("no")) {
							update = new BasicDBObject();
							update.put("field", "ativo");
							update.put("value", "inativo");
							arrayUpdate.add(update);
						}
						update = new BasicDBObject();
						update.put("field", "confirmWho");
						update.put("value", "family");
						arrayUpdate.add(update);
						Date today = new Date();
						SimpleDateFormat datePattern = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
						update = new BasicDBObject();
						update.put("field", "confirmWhen");
						update.put("value", datePattern.format(today));
						arrayUpdate.add(update);
						commons_db.atualizarCrud("homestayBook", arrayUpdate, "_id", alocationId, mongo);
						if (invite.equals("yes")) {
							emailFamily(homestayBook.getString("resource"), homestayBook.getString("studentId"), homestayBook.getString("start").substring(0, 10), homestayBook.getString("end").substring(0, 10), "accepted", mongo);
							return ResponseEntity.ok().body("Offer successfully accepted.");
						} else {
							emailFamily(homestayBook.getString("resource"), homestayBook.getString("studentId"), homestayBook.getString("start").substring(0, 10), homestayBook.getString("end").substring(0, 10), "recused", mongo);
							return ResponseEntity.ok().body("Offer successfully refused.");
						}
					} else {
						if (homestayBook.getString("invite").equals("yes")) {
							return ResponseEntity.ok().body("Offer already accepted.");
						} else {
							return ResponseEntity.ok().body("Offer already refused.");
						}
					}
				} else {
					return ResponseEntity.ok().body("Offer canceled.");
				}
			}
		}
		return ResponseEntity.ok().body("The trip does not exist or invalid.");
	}

	private void emailFamily(String resource, String travelId, String start, String end, String msg, MongoClient mongo) throws UnknownHostException {
		BasicDBObject familyDorm = commons_db.obterCrudDoc("familyDorm", "documento.id", resource, mongo);
		if ( !familyDorm.get("roomId").equals(null)) {
			BasicDBObject familyRoom = commons_db.obterCrudDoc("familyRooms", "_id", familyDorm.getString("roomId"), mongo);
			BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId, mongo);
			if (!familyRoom.get("familyId").equals(null) && !travel.get("studentId").equals(null)) {
				BasicDBObject table = commons_db.obterCrudDoc("table", null, "onlyOneRegister", mongo);
				BasicDBObject student = commons_db.obterCrudDoc("student", "_id", travel.getString("studentId"), mongo);
				BasicDBObject family = commons_db.obterCrudDoc("family", "_id", familyRoom.getString("familyId"), mongo);
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
						"Offer answered", 
						templateEmail.emailFamilia(family.getString("familyName"), student.getString("firstName")+' '+student.getString("lastName"), start, end, msg)
						);					
				}
			
			}
		}
	};

}
