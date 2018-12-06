package com.casamundo.rest;

import java.net.UnknownHostException;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.bean.Receivement;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/receivement")
public class Rest_Receivement {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Payment payment = new Payment();
	Invoice invoice = new Invoice();
	Receivement receivement = new Receivement();
	
	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/incluir", consumes = "application/json")
	public ResponseEntity incluir(@RequestBody BasicDBObject documento) throws UnknownHostException, MongoException  {
		
		ResponseEntity response = commons_db.incluirCrud("receivement", documento);
		if (response.getStatusCode() == HttpStatus.OK) {
			String receiveId = (String) response.getBody();
			invoice.atualizarPaymentsInvoice(receiveId.toString());
		};
		return response;

	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			ResponseEntity response = commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
			if (response.getStatusCode() == HttpStatus.OK) {
				invoice.atualizarPaymentsInvoice(queryParam.get("key").toString());
			};
			return ResponseEntity.ok().body("true");
		}else{
			return ResponseEntity.badRequest().build();
		}

	};

	@RequestMapping(value = "/get/number", produces = "application/json")
	public String numberInvoice() throws UnknownHostException, MongoException{
		return commons_db.getNumber("numberReceivement", "yearNumberReceivement");
	};
};



