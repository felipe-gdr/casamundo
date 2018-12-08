package com.casamundo.rest;

import com.casamundo.bean.PaymentBank;
import com.casamundo.bean.PaymentCycles;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;
import java.util.ArrayList;

@RestController
@RequestMapping("/paymentBank")
public class Rest_PaymentBank {


	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PaymentBank paymentBank = new PaymentBank();

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/incluir", consumes = "application/json")
	public ArrayList incluir(@RequestBody BasicDBObject doc) throws UnknownHostException, MongoException  {

        return paymentBank.incluir(doc);
	};

    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/atualizar", consumes = "application/json")
    public ResponseEntity atualizar(@RequestBody BasicDBObject doc) throws UnknownHostException, MongoException  {

        return paymentBank.atualiza(doc);
    };
};



