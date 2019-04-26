package com.casamundo.externalRest;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.casamundo.externalBean.External_Book;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.bson.types.ObjectId;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.Map;

@RestController
@RequestMapping("/external/book")
public class Rest_External_Book {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();
	External_Book book = new External_Book();

	@SuppressWarnings({ "rawtypes" })
	@PostMapping(value = "/insert", consumes = "application/json")
	public ResponseEntity incluir(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		if (queryParam.get("city") == null || queryParam.get("checkIn") == null || queryParam.get("checkOut") == null || queryParam.get("accControl") == null  || queryParam.get("birthday") == null){
			return ResponseEntity.badRequest().body("missing fields");
		}
		MongoClient mongo = commons_db.getMongoClient();
		String collection = (String) queryParam.get("collection");
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) queryParam.get("documento"));
		String travelId = documento.getString("studentId");
		if (collection != null ){
			ResponseEntity response = commons_db.incluirCrud(collection, documento, mongo);
			payment.managementCostsBooking(travelId, null, false, true, mongo);
			mongo.close();
			return response;
		}else{
			mongo.close();
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/update", consumes = "application/json")
	public ResponseEntity atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {


		if (queryParam.get("idTravel") == null ) {
			return ResponseEntity.badRequest().body("missing travel key");
		}

		MongoClient mongo = commons_db.getMongoClient();
		if (!book.camposValidos(queryParam,"validFieldsTrip", mongo)){
			mongo.close();
			return ResponseEntity.badRequest().body("invalid fields");
		}

		ResponseEntity result = book.atualizar(queryParam, mongo);
		mongo.close();
		return result;
	};


	@GetMapping(value = "/delete", consumes = "application/json")
	public ResponseEntity deletar(@RequestParam("idBook") String idBook) throws UnknownHostException, MongoException  {

		MongoClient mongo = commons_db.getMongoClient();
		if (idBook != null ){
			ResponseEntity result = book.deletar(idBook);
			mongo.close();
			return result;
		}else{
			mongo.close();
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/get", produces = "application/json")
	public ResponseEntity getBook(@RequestParam("idBook") String idBook) {

		MongoClient mongo = commons_db.getMongoClient();
		if (idBook != null ) {
			ResponseEntity result = book.obter(idBook, mongo);
			mongo.close();
			return result;
		}else {
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/getlist", produces = "application/json")
	public ResponseEntity getListBook(@RequestParam("idCity") String idCity) {

		MongoClient mongo = commons_db.getMongoClient();
		if (idCity == null ) {
			return ResponseEntity.badRequest().body("city not informed");
		}

		try {
			ObjectId idObj = new ObjectId(idCity);
		}catch (Exception ex){
			return ResponseEntity.badRequest().body("city must be id object");
		};

		if (commons_db.obterCrudDoc("city","_id", idCity, mongo) == null){
				mongo.close();
				return ResponseEntity.badRequest().body("inexistent city");
		}
		ResponseEntity result = book.lista(idCity, mongo);
		mongo.close();
		return result;
	};

	@SuppressWarnings("rawtypes")

	@PostMapping(value = "/getAvailable", consumes = "application/json")
	public ResponseEntity getAvailable(@RequestBody JSONObject queryParam) throws IOException, MongoException  {


		if (queryParam.get("city") == null || queryParam.get("checkIn") == null || queryParam.get("checkOut") == null || queryParam.get("accControl") == null  || queryParam.get("birthday") == null){
			return ResponseEntity.badRequest().body("missing fields");
		}

		try {
			ObjectId idObj = new ObjectId(queryParam.get("city").toString());
		}catch (Exception ex){
			return ResponseEntity.badRequest().body("city must be id object");
		};

		MongoClient mongo = commons_db.getMongoClient();
		if (!book.camposValidos(queryParam,"validFieldsTrip", mongo)){
			mongo.close();
			return ResponseEntity.badRequest().body("invalid fields");
		}
		if (!book.camposObrigatorios(queryParam, "necessaryFieldsTrip", mongo)){
			mongo.close();
			return ResponseEntity.badRequest().body("missing fields");
		}
		if (commons_db.obterCrudDoc("city","_id", queryParam.get("city").toString(), mongo) == null){
			mongo.close();
			return ResponseEntity.badRequest().body("inexistent city");
		}

		ResponseEntity response = book.getAvailable(queryParam.get("accControl").toString(), queryParam.get("checkIn").toString(), queryParam.get("checkIn").toString(), queryParam.get("city").toString(), queryParam, mongo);

		mongo.close();
		return response;
	};

	@PostMapping(value = "/insertBookStudent", consumes = "application/json")
	public ResponseEntity insertBookStudent(@RequestBody JSONObject queryParam) throws IOException, MongoException  {

		if (queryParam.get("city") == null || queryParam.get("checkIn") == null || queryParam.get("checkOut") == null || queryParam.get("accControl") == null  || queryParam.get("birthday") == null){
			return ResponseEntity.badRequest().body("missing fields");
		}

		try {
			ObjectId idObj = new ObjectId(queryParam.get("city").toString());
		}catch (Exception ex){
			return ResponseEntity.badRequest().body("city must be id object");
		};

		MongoClient mongo = commons_db.getMongoClient();

		if (!book.camposValidos(queryParam,"validFieldsTrip", mongo)){
			mongo.close();
			return ResponseEntity.badRequest().body("invalid fields");
		}
		if (!book.camposObrigatorios(queryParam, "necessaryFieldsTrip", mongo)){
			mongo.close();
			return ResponseEntity.badRequest().body("missing fields trip");
		}
		if (!book.camposValidos(queryParam,"validFieldsStudent", mongo)){
			mongo.close();
			return ResponseEntity.badRequest().body("invalid fields");
		}
		if (!book.camposObrigatorios(queryParam, "necessaryFieldsStudent", mongo)){
			mongo.close();
			return ResponseEntity.badRequest().body("missing fields student");
		}

		if (commons_db.obterCrudDoc("city","_id", queryParam.get("city").toString(), mongo) == null){
			mongo.close();
			return ResponseEntity.badRequest().body("inexistent city");
		}


		mongo.close();
		return null;
	};

};



