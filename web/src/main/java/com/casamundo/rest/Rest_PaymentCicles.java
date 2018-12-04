package com.casamundo.rest;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.bean.PaymentCicles;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.bson.BSONObject;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.ArrayList;

@RestController
@RequestMapping("/paymentCicles")
public class Rest_PaymentCicles {


	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PaymentCicles paymentCicles = new PaymentCicles();

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/incluir", consumes = "application/json")
	public ResponseEntity incluir(@RequestBody BasicDBObject doc) throws UnknownHostException, MongoException  {

        return paymentCicles.incluir(doc);
	};
};



