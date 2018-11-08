package com.casamundo.rest;

import java.net.UnknownHostException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;

@RestController
//TODO: estava mapeado como "/payment", resultando em um conflito no endpoint "/payment/get/number" declarado em
// Rest_Estimated#numberInvoice(). Verificar se pode ser alterado mesmo para "/estimated"
@RequestMapping("/estimated")
public class Rest_Estimated {
	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Invoice invoice = new Invoice();
	Payment payment = new Payment();

	@RequestMapping(value = "/get/number", produces = "application/json")
	public String numberInvoice() throws UnknownHostException, MongoException{
		 
		return commons_db.getNumber("numberEstimated", "yearNumberEstimated");

	};
};



