package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import com.casamundo.bean.PriceTable;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/payment")
public class Rest_Payment {


	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();
	PriceTable priceTable = new PriceTable();

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

	@RequestMapping(value = "/lista/pending", produces = "application/json")
	public ArrayList<BasicDBObject> listaPending(
			@RequestParam(value = "date", required=false) String date, 
			@RequestParam(value = "accControl", required=false) String accControl,
			@RequestParam(value = "userId", required=false) String userId ) throws UnknownHostException, MongoException {
		
		if (date != null && accControl != null && userId != null) {
			return payment.listaPending(date, accControl, userId);
		}else{
			return payment.listaPending(null, accControl, userId);
		}

	}

	@RequestMapping(value = "/lista/processing", produces = "application/json")
	public ArrayList<BasicDBObject> listaPending(
			@RequestParam(value = "userId", required=false) String userId,
			@RequestParam(value = "cycleId", required=false) String cycleId
	) throws UnknownHostException, MongoException {

		if (cycleId != null) {
			return payment.getProcessig(userId, cycleId);
		}
		return null;

	}

	@RequestMapping(value = "/lista", produces = "application/json")
	public ArrayList<BasicDBObject> listaPayment(
			@RequestParam(value = "date", required=false) String date,
			@RequestParam(value = "accControl", required=false) String accControl,
			@RequestParam(value = "userId", required=false) String userId ) throws UnknownHostException, MongoException {

		if (date != null && accControl != null && userId != null) {
			return payment.listaPayment(date, accControl, userId);
		}else{
			return payment.listaPayment(null, accControl, userId);
		}

	}

	@RequestMapping(value = "/getCostDriver", produces = "application/json")
	public String getCostDriver(
			@RequestParam(value = "date", required=false) String date,
			@RequestParam(value = "typeTransfer", required=false) String typeTransfer,
			@RequestParam(value = "driverId", required=false) String vendorId,
            @RequestParam(value = "travelId", required=false) String travelId,
            @RequestParam(value = "netGross", required=false) String netGross

	) throws UnknownHostException, MongoException {

		if (date != null && typeTransfer != null  && vendorId != null && netGross != null) {
            BasicDBObject product = commons_db.obterCrudDoc("priceTable", "documento.transferType", typeTransfer);
            if (product != null) {
                if (product.get("_id") != null) {
                    ArrayList<BasicDBObject> results = priceTable.getCost(date, date, travelId, product.getString("_id"), vendorId, netGross);
                    if (results.size() > 0) {
                        BasicDBObject result = new BasicDBObject();
                        result.putAll((Map) results.get(0));
                        return result.getString("value");
                    }
                }
            }
        }
		return null;

	}

	@RequestMapping(value = "/get/number", produces = "application/json")
	public String numberInvoice() throws UnknownHostException, MongoException{
		return commons_db.getNumber("numberPayment", "yearNumberPayment");

	};
};



