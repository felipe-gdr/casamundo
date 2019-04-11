package com.casamundo.externalBean;

import com.casamundo.commons.Commons;
import com.casamundo.commons.SendEmailHtml;
import com.casamundo.commons.TemplateEmail;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import javax.xml.ws.Response;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

public class External_Book {

	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();

	public ResponseEntity responseEmail(String alocationId, String invite) throws UnknownHostException {
		
		BasicDBObject homestayBook = commons_db.obterCrudDoc("homestayBook", "_id", alocationId);
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
						commons_db.atualizarCrud("homestayBook", arrayUpdate, "_id", alocationId);
						if (invite.equals("yes")) {
							emailFamily(homestayBook.getString("resource"), homestayBook.getString("studentId"), homestayBook.getString("start").substring(0, 10), homestayBook.getString("end").substring(0, 10), "accepted");
							return ResponseEntity.ok().body("Offer successfully accepted.");
						} else {
							emailFamily(homestayBook.getString("resource"), homestayBook.getString("studentId"), homestayBook.getString("start").substring(0, 10), homestayBook.getString("end").substring(0, 10), "recused");
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

	private void emailFamily(String resource, String travelId, String start, String end, String msg) throws UnknownHostException {
		BasicDBObject familyDorm = commons_db.obterCrudDoc("familyDorm", "documento.id", resource);
		if ( !familyDorm.get("roomId").equals(null)) {
			BasicDBObject familyRoom = commons_db.obterCrudDoc("familyRooms", "_id", familyDorm.getString("roomId"));
			BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", travelId);
			if (!familyRoom.get("familyId").equals(null) && !travel.get("studentId").equals(null)) {
				BasicDBObject table = commons_db.obterCrudDoc("table", null, "onlyOneRegister");
				BasicDBObject student = commons_db.obterCrudDoc("student", "_id", travel.getString("studentId"));
				BasicDBObject family = commons_db.obterCrudDoc("family", "_id", familyRoom.getString("familyId"));
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

	public ResponseEntity getAvailable(String type, String start, String end, String city) {


		ArrayList<BasicDBObject> result = new ArrayList<>();

		String collection = "";
		String allocation = "";
		String allocationId = "";
		switch(type) {
			case "homestay":
				collection = "familyDorns";
				allocation = "homestayBook";
				allocationId = "familyRoom";
				break;
			case "suite":
				collection = "room";
				allocation = "suiteBook";
				allocationId = "resource";
				break;
			case "shared":
				collection = "room";
				allocation = "sharedBook";
				allocationId = "resource";
				break;
			default:
				// code block
		}

		ResponseEntity response = commons_db.listaCrud(collection, "documento.city", city, null, null, null, true);
		ArrayList<Object> books = new ArrayList<Object>();
		books = (JSONArray) response.getBody();

		if (books != null) {
			for (int i = 0; i < books.size(); i++) {
				BasicDBObject book = new BasicDBObject();
				book.putAll((Map) books.get(i));
				BasicDBObject bookDoc = new BasicDBObject();
				bookDoc.putAll((Map) book.get("documento"));
			}
		}
		return null;


	}

}
