package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/book")
public class Rest_Book {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();

	@SuppressWarnings({ "rawtypes" })
	@PostMapping(value = "/incluir", consumes = "application/json")
	public ResponseEntity incluir(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) queryParam.get("documento"));
		String travelId = documento.getString("studentId");
		if (collection != null ){
			ResponseEntity response = commons_db.incluirCrud(collection, documento);
			payment.managementCostsBooking(travelId, null, false, true);
			return response;
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity Atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		if (queryParam.get("collection") != null ){
			ResponseEntity result = commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get(
					"update"), queryParam.get("key").toString(), queryParam.get("value").toString());
			BasicDBObject book = commons_db.obterCrudDoc(queryParam.get ("collection").toString(), queryParam.get("key").toString(), queryParam.get("value").toString());
			if (book != null) {
				payment.managementCostsBooking(book.getString("studentId"), null, false, true);
			}
			return result;
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getbook", produces = "application/json")
	public BasicDBObject getBook(@RequestParam("idBook") String idBook) {

		if (idBook != null ){
			BasicDBObject book = commons_db.obterCrudDoc("homestayBook", "_id", idBook);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "homestayBook");
				return result;
			}
			book = commons_db.obterCrudDoc("suiteBook", "_id", idBook);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "suiteBook");
				return result;
			}
			book = commons_db.obterCrudDoc("sharedBook", "_id", idBook);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "sharedBook");
				return result;
			}
			BasicDBObject result = new BasicDBObject();
			result.put("documento", null);
			result.put("collection", null);
			return result;
		}else{
			BasicDBObject result = new BasicDBObject();
			result.put("documento", null);
			result.put("collection", null);
			return result;
		}
	};

};



