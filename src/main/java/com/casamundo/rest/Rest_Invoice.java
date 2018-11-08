package com.casamundo.rest;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.net.UnknownHostException;
import java.util.ArrayList;

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
		return invoice.incluir(doc);
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
			return ResponseEntity.ok().body("true");
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@GetMapping(value = "/get/number", produces = "application/json")
	public String numberInvoice() throws UnknownHostException, MongoException{
		return commons_db.getNumber("numberInvoice", "yearNumberInvoice");
	};

	@GetMapping(value = "/testadata", produces = "application/json")
	public BasicDBObject testaData(@PathParam("start") String start, @PathParam("end") String end) throws UnknownHostException, MongoException {
		return commons.numberWeeks(start, end);
	};
	

	@SuppressWarnings("rawtypes")
	@GetMapping(value = "/itensinvoiceautomatica", produces = "application/json")
	public ArrayList calculaInvoiceAutomatica(@PathParam("travelId") String travelId, @PathParam("userId") String userId) throws UnknownHostException, MongoException {
		return invoice.calculaInvoiceAutomatica(travelId, userId);
	};
		
};



