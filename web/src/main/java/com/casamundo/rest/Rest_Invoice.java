package com.casamundo.rest;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.json.simple.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/invoice")
public class Rest_Invoice {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/incluir", consumes = "application/json")
	public ResponseEntity incluir(@RequestBody BasicDBObject doc) throws UnknownHostException, MongoException  {
		MongoClient mongo = commons_db.getMongoClient();
		ResponseEntity response = invoice.incluir(doc, mongo);
		mongo.close();
		return response;
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		MongoClient mongo = commons_db.getMongoClient();
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
            List arrayUpdate = (List) queryParam.get("update");
            BasicDBObject update = new BasicDBObject();
            update.putAll((Map) arrayUpdate.get(0));
            BasicDBObject doc = new BasicDBObject();
            doc.putAll((Map) update.get("value"));
            invoice.atualiza(doc, queryParam.get("value").toString(), true, false, mongo);
            mongo.close();
			return ResponseEntity.ok().body("true");
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@RequestMapping(value = "/get/number", produces = "application/json")
	public String numberInvoice() throws UnknownHostException, MongoException{
		MongoClient mongo = commons_db.getMongoClient();
		String response = commons_db.getNumber("numberInvoice", "yearNumberInvoice", mongo);
		mongo.close();
		return response;
	};


	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/itensinvoiceautomatica", produces = "application/json")
	public ArrayList calculaInvoiceAutomatica(
			@RequestParam("travelId") String travelId, 
			@RequestParam("userId") String userId) throws IOException, MongoException {
		MongoClient mongo = commons_db.getMongoClient();
		ArrayList response = invoice.calculaInvoiceAutomatica(travelId, userId, null, mongo);
		mongo.close();
		return response;
	};


	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lista", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public BasicDBObject lista( @RequestParam Map<String, String> params) throws UnknownHostException, MongoException, UnsupportedEncodingException {

		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = invoice.lista(params,mongo);
		mongo.close();
		return response;

	};

	@RequestMapping(value = "/calculanoiteextra", produces = "application/json")
	public BasicDBObject testaData(
			@RequestParam ("start") String start,
			@RequestParam ("end") String end
	) throws UnknownHostException, MongoException {
		return commons.numberWeeks(start, end, "homestay");
	};


};



