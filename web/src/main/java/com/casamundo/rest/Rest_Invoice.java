package com.casamundo.rest;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
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
		return invoice.incluir(doc);
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
            List arrayUpdate = (List) queryParam.get("update");
            BasicDBObject update = new BasicDBObject();
            update.putAll((Map) arrayUpdate.get(0));
            BasicDBObject doc = new BasicDBObject();
            doc.putAll((Map) update.get("value"));
            invoice.atualiza(doc, queryParam.get("value").toString(), true, false);
			return ResponseEntity.ok().body("true");
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@RequestMapping(value = "/get/number", produces = "application/json")
	public String numberInvoice() throws UnknownHostException, MongoException{
		return commons_db.getNumber("numberInvoice", "yearNumberInvoice");
	};

	@RequestMapping(value = "/testadata", produces = "application/json")
	public BasicDBObject testaData(
			@RequestParam ("start") String start,
			@RequestParam ("end") String end
			) throws UnknownHostException, MongoException {
		return commons.numberWeeks(start, end, "homestay");
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/testadatavendor", consumes = "application/json")
	public ArrayList testaDataVendor(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		ArrayList<Object> dates = new ArrayList<Object>();
		dates = (ArrayList) queryParam.get("dates");
		String start = (String) queryParam.get("start");
		String end = (String) queryParam.get("end");
		return payment.calculaDaysVendor(dates,start,end);
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/itensinvoiceautomatica", produces = "application/json")
	public ArrayList calculaInvoiceAutomatica(
			@RequestParam("travelId") String travelId, 
			@RequestParam("userId") String userId) throws IOException, MongoException {
		return invoice.calculaInvoiceAutomatica(travelId, userId);
	};


	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lista", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public BasicDBObject lista( @RequestParam Map<String, String> params) throws UnknownHostException, MongoException, UnsupportedEncodingException {

		return invoice.lista(params);

	};

};



