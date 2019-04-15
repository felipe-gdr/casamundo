package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.Map;

import com.mongodb.MongoClient;
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

		MongoClient mongo = new MongoClient();
		String collection = (String) queryParam.get("collection");
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) queryParam.get("documento"));
		String travelId = documento.getString("studentId");
		if (collection != null ){
			ResponseEntity response = commons_db.incluirCrud(collection, documento, mongo);
			payment.managementCostsBooking(travelId, null, false, true, mongo);
			mongo.close();;
			return response;
		}else{
			mongo.close();;
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity Atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		MongoClient mongo = new MongoClient();
		if (queryParam.get("collection") != null ){
			ResponseEntity result = commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get(
					"update"), queryParam.get("key").toString(), queryParam.get("value").toString(), mongo);
			BasicDBObject book = commons_db.obterCrudDoc(queryParam.get ("collection").toString(), queryParam.get("key").toString(), queryParam.get("value").toString(), mongo);
			if (book != null) {
				payment.managementCostsBooking(book.getString("studentId"), null, false, true, mongo);
			}
			mongo.close();
			return result;
		}else{
			mongo.close();
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getbook", produces = "application/json")
	public BasicDBObject getBook(@RequestParam("idBook") String idBook) {

		MongoClient mongo = commons_db.getMongoClient();
		if (idBook != null ){
			BasicDBObject book = commons_db.obterCrudDoc("homestayBook", "_id", idBook, mongo);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "homestayBook");
				mongo.close();
				return result;
			}
			book = commons_db.obterCrudDoc("suiteBook", "_id", idBook, mongo);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "suiteBook");
				mongo.close();
				return result;
			}
			book = commons_db.obterCrudDoc("sharedBook", "_id", idBook, mongo);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "sharedBook");
				mongo.close();
				return result;
			}
			BasicDBObject result = new BasicDBObject();
			result.put("documento", null);
			result.put("collection", null);
			mongo.close();
			return result;
		}else{
			BasicDBObject result = new BasicDBObject();
			result.put("documento", null);
			result.put("collection", null);
			mongo.close();
			return result;
		}
	};

};



