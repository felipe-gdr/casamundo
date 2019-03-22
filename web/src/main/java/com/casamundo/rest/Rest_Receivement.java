package com.casamundo.rest;

import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
			invoice.atualizarReceivementsInvoice(receiveId.toString(), false, documento);
		};
		return response;

	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
            List arrayUpdate = (List) queryParam.get("update");
            BasicDBObject setUpdate = new BasicDBObject();
            setUpdate.putAll((Map) arrayUpdate.get(0));
            BasicDBObject receivement = new BasicDBObject();
            receivement.putAll((Map) setUpdate.get("value"));
			invoice.atualizarReceivementsInvoice(queryParam.get("value").toString(), true, receivement);
			ResponseEntity response = commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
			if (response.getStatusCode() == HttpStatus.OK) {
				invoice.atualizarReceivementsInvoice(queryParam.get("value").toString(), false, receivement);
			};
			return ResponseEntity.ok().body("true");
		}else{
			return ResponseEntity.badRequest().build();
		}

	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lista/datatable", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public BasicDBObject listaDatatable( @RequestParam Map<String, String> params) throws UnknownHostException, MongoException, UnsupportedEncodingException {

		return receivement.listaDatatable(params);

	};

	@RequestMapping(value = "/get/number", produces = "application/json")
	public String numberInvoice() throws UnknownHostException, MongoException{
		return commons_db.getNumber("numberReceivement", "yearNumberReceivement");
	};
};



