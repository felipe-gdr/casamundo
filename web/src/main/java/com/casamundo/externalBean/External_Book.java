package com.casamundo.externalBean;

import com.casamundo.bean.Invoice;
import com.casamundo.commons.Commons;
import com.casamundo.commons.SendEmailHtml;
import com.casamundo.commons.TemplateEmail;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.sun.org.apache.bcel.internal.generic.MONITORENTER;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;

import javax.xml.ws.Response;
import java.io.IOException;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

public class External_Book {

	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();
	Invoice invoice = new Invoice();

	public ResponseEntity getAvailable(String type, String start, String end, String city, JSONObject variables, MongoClient mongo) throws IOException {

		String collectionBase = "";
		String collectionAlloc = type;
		switch(type) {
			case "homestayBook":
				collectionBase = "familyDorm";
				break;
			case "suiteBook":
				collectionBase = "dorm";
				break;
			case "sharedBook":
				collectionBase = "dorm";
				break;
			default:
				// code block
		}


		ResponseEntity response = commons_db.listaCrud(collectionBase, "documento.city", city, null, null, null, true, mongo);
		ArrayList<Object> resources = new ArrayList<Object>();
		resources = (JSONArray) response.getBody();

		if (resources != null) {
			Boolean temRecurso = false;
			for (int i = 0; i < resources.size(); i++) {
				BasicDBObject resource = new BasicDBObject();
				resource.putAll((Map) resources.get(i));
				BasicDBObject resourceDoc = new BasicDBObject();
				resourceDoc.putAll((Map) resource.get("documento"));
				response = commons_db.listaCrud(collectionAlloc, "resource", resourceDoc.getString("id"), null, null, null, true, mongo);
				ArrayList<Object> allocations = new ArrayList<Object>();
				allocations = (JSONArray) response.getBody();
				if (allocations != null) {
					for (int j = 0; j < allocations.size(); j++) {
						BasicDBObject allocation = new BasicDBObject();
						allocation.putAll((Map) allocations.get(j));
						BasicDBObject allocationDoc = new BasicDBObject();
						allocationDoc.putAll((Map) allocation.get("documento"));
						if (commons.getDaysInterval(start, end, allocationDoc.getString("start"), allocationDoc.getString("end")).getInt("days") == 0){
							temRecurso = true;
						}
					}
				}
			}
			ArrayList products = invoice.calculaInvoiceAutomatica(null,null,variables, mongo);
			return ResponseEntity.ok().body(products);
		}
		return ResponseEntity.ok().body("No available resource");



	}

}
