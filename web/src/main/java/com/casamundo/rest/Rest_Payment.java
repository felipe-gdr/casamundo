package com.casamundo.rest;

import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import com.casamundo.bean.PriceTable;
import com.mongodb.MongoClient;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
		MongoClient mongo = new MongoClient();
		ResponseEntity response = invoice.incluir(doc, mongo);
		mongo.close();
		return response;
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity atualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			MongoClient mongo = commons_db.getMongoClient();
			commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString(), mongo);
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
		
		MongoClient mongo = commons_db.getMongoClient();
		if (date != null && accControl != null && userId != null) {
			ArrayList<BasicDBObject> response = payment.listaPending(date, accControl, userId, mongo);
			mongo.close();
			return response;
		}else{
			ArrayList<BasicDBObject> response = payment.listaPending(null, accControl, userId, mongo);
			mongo.close();
			return response;
		}

	}

	@RequestMapping(value = "/lista/processing", produces = "application/json")
	public ArrayList<BasicDBObject> listaPending(
			@RequestParam(value = "userId", required=false) String userId,
			@RequestParam(value = "cycleId", required=false) String cycleId
	) throws UnknownHostException, MongoException {

		if (cycleId != null) {
			MongoClient mongo = commons_db.getMongoClient();
			ArrayList<BasicDBObject> response = payment.getProcessing(userId, cycleId, mongo);
			return response;
		}
		return null;

	}

	@RequestMapping(value = "/lista", produces = "application/json")
	public ArrayList<BasicDBObject> listaPayment(
			@RequestParam(value = "date", required=false) String date,
			@RequestParam(value = "accControl", required=false) String accControl,
			@RequestParam(value = "userId", required=false) String userId ) throws UnknownHostException, MongoException {

		MongoClient mongo = commons_db.getMongoClient();
		if (date != null && accControl != null && userId != null) {
			ArrayList<BasicDBObject> response = payment.listaPayment(date, accControl, userId, mongo);
			mongo.close();
			return response;
		}else{
			ArrayList<BasicDBObject> response = payment.listaPayment(null, accControl, userId, mongo);
			mongo.close();
			return response;
		}

	}

	@RequestMapping(value = "/getCostDriver", produces = "application/json")
	public BasicDBObject getCostDriver(
			@RequestParam(value = "driverId", required=false) String driverId,
            @RequestParam(value = "transferId", required=false) String transferId,
            @RequestParam(value = "netGross", required=false) String netGross

	) throws UnknownHostException, MongoException {

		MongoClient mongo = commons_db.getMongoClient();
		if (transferId != null  && driverId != null && netGross != null) {
            BasicDBObject transfer = commons_db.obterCrudDoc("transfers", "_id", transferId, mongo);
            if (transfer != null) {
                BasicDBObject travel = commons_db.obterCrudDoc("travel", "_id", transfer.getString("travelId"), mongo);
                BasicDBObject product = commons_db.obterCrudDoc("priceTable", "documento.transferType", transfer.getString("transferType"), mongo);
                if (product != null && travel != null) {
                    if (product.get("_id") != null) {
                        BasicDBObject student = commons_db.obterCrudDoc("student", "_id", travel.getString("studentId"), mongo);
                        ArrayList<BasicDBObject> costs = priceTable.getCost(transfer.getString("date"), transfer.getString("date"), transfer.getString("travelId"), product.getString("_id"), driverId, netGross, mongo);
                        if (costs.size() > 0) {
                            BasicDBObject cost = new BasicDBObject();
                            cost.putAll((Map) costs.get(0));
                            BasicDBObject result = new BasicDBObject();
                            result.put("amount",cost.get("value"));
                            result.put("date",cost.get("start"));
                            result.put("destinationId",travel.get("destination"));
                            result.put("studentName",student.get("firstName") + " "  + student.get("lastName"));
                            mongo.close();
                            return result;
                        }
                    }
                }
            }
        }
		mongo.close();
		return null;

	}

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lista/datatable", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public BasicDBObject listaDatatable( @RequestParam Map<String, String> params) throws UnknownHostException, MongoException, UnsupportedEncodingException {

		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = payment.listaDatatable(params, mongo);
		mongo.close();
		return response;

	};

	@RequestMapping(value = "/get/number", produces = "application/json")
	public String numberInvoice() throws UnknownHostException, MongoException{
		MongoClient mongo = commons_db.getMongoClient();
		String response = commons_db.getNumber("numberPayment", "yearNumberPayment", mongo);
		mongo.close();
		return response;

	};
};



