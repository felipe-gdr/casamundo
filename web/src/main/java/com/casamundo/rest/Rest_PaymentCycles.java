package com.casamundo.rest;

import com.casamundo.bean.PaymentCycles;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
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

        return paymentCycles.incluir(doc);
	};

    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/atualizar", consumes = "application/json")
    public ResponseEntity atualizar(@RequestBody BasicDBObject doc) throws UnknownHostException, MongoException  {

        return paymentCycles.atualiza(doc);
    };

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/delete", produces = "application/json")
	public ResponseEntity delete(
			@RequestParam("paymentCycleId") String paymentCycleId) throws IOException, MongoException {
		return paymentCycles.delete(paymentCycleId);
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lista/status", produces = "application/json")
	public ArrayList lista(
			@RequestParam("status") String status,
			@RequestParam("userId") String userId) throws IOException, MongoException {
		return paymentCycles.listaStatus(status, userId);
	};
};



