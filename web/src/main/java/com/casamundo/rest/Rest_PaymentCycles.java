package com.casamundo.rest;

import com.casamundo.bean.PaymentCycles;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;

@RestController
@RequestMapping("/paymentCycles")
public class Rest_PaymentCycles {


	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PaymentCycles paymentCycles = new PaymentCycles();

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/incluir", consumes = "application/json")
	public ResponseEntity incluir(@RequestBody BasicDBObject doc) throws UnknownHostException, MongoException  {

		MongoClient mongo = new MongoClient();

		ResponseEntity response = paymentCycles.incluir(doc, mongo);
		mongo.close();
        return response;
	};

    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/atualizar", consumes = "application/json")
    public ResponseEntity atualizar(@RequestBody BasicDBObject doc) throws UnknownHostException, MongoException  {

		MongoClient mongo = commons_db.getMongoClient();
		ResponseEntity response = paymentCycles.atualiza(doc, mongo);
		mongo.close();
        return response;
    };

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/delete", produces = "application/json")
	public ResponseEntity delete(
			@RequestParam("paymentCycleId") String paymentCycleId) throws IOException, MongoException {
		MongoClient mongo = commons_db.getMongoClient();
		ResponseEntity response = paymentCycles.delete(paymentCycleId, mongo);
		mongo.close();
		return response;
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lista/status", produces = "application/json")
	public ArrayList lista(
			@RequestParam("status") String status,
			@RequestParam("userId") String userId) throws IOException, MongoException {
		MongoClient mongo = commons_db.getMongoClient();
		ArrayList response = paymentCycles.listaStatus(status, userId, mongo);
		mongo.close();
		return response;
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/historicos", produces = "application/json")
	public BasicDBObject historicos(
			@RequestParam("vendorId") String vendorId
												) throws IOException, MongoException {

		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = paymentCycles.historico(vendorId, mongo);
		mongo.close();
		return response;
	};
};



