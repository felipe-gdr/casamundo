package com.casamundo.externalRest;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.casamundo.externalBean.Book;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.bson.types.ObjectId;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.Map;

@RestController
@RequestMapping("/external/book")
public class Rest_Book {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();
	Book book = new Book();

	@SuppressWarnings({ "rawtypes" })
	@PostMapping(value = "/insert", consumes = "application/json")
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
	@PostMapping(value = "/update", consumes = "application/json")
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
	public ResponseEntity getBook(@RequestParam("idBook") String idBook) {

		if (idBook != null ){
			BasicDBObject book = commons_db.obterCrudDoc("homestayBook", "_id", idBook);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "homestayBook");
				return ResponseEntity.ok().body(result);
			}
			book = commons_db.obterCrudDoc("suiteBook", "_id", idBook);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "suiteBook");
				return ResponseEntity.ok().body(result);
			}
			book = commons_db.obterCrudDoc("sharedBook", "_id", idBook);
			if (book != null){
				BasicDBObject result = new BasicDBObject();
				result.put("documento", book);
				result.put("collection", "sharedBook");
				return ResponseEntity.ok().body(result);
			}
		}
		return ResponseEntity.badRequest().build();
	};

	@SuppressWarnings("rawtypes")
	/* 	format start/end aaaa-mm-dd
		type = "homestayBook", "suiteBook" or "sharedBook"
	*/

	@RequestMapping(value = "/getAvailable", produces = "application/json")
	public ResponseEntity getBook(@RequestParam("type") String type,
								  @RequestParam("start") String start,
								  @RequestParam("end") String end,
								  @RequestParam("city") String city
								 ) {

		if (!type.equals("homestayBook") && !type.equals("suiteBook") && !type.equals("sharedBook") ){
			return ResponseEntity.badRequest().build();
		}
		if (!commons.checkData(start) || !commons.checkData(end) ){
			return ResponseEntity.badRequest().build();
		}
		if (!commons.comparaData(end, start)){
			return ResponseEntity.badRequest().build();
		}

		try {
			ObjectId idObj = new ObjectId(city);
		}catch (Exception ex){
			return ResponseEntity.badRequest().build();
		};

		if (commons_db.obterCrudDoc("city","_id", city) == null){
			return ResponseEntity.badRequest().build();
		}

		return book.getAvailable(type, start, end,city);
	};

};



