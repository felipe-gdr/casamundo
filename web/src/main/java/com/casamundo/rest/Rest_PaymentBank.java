package com.casamundo.rest;

import com.casamundo.bean.PaymentBank;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

        MongoClient mongo = new MongoClient();
        ArrayList response = paymentBank.incluir(doc, mongo);
        mongo.close();
        return response;
	};

    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/atualizar/pagamento", consumes = "application/json")
    public Boolean atualizarPagamento(@RequestBody String paymentBankId) throws UnknownHostException, MongoException  {

        MongoClient mongo = new MongoClient();
        BasicDBObject doc = commons_db.obterCrudDoc("paymentBank", "_id", paymentBankId, mongo);
        Boolean response = false;
        if (doc != null) {
            response = paymentBank.atualizaPagamento(paymentBankId, doc, mongo);
        }
        mongo.close();;
        return response;
    };

    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/atualizar", consumes = "application/json")
    public ResponseEntity atualizar(@RequestBody BasicDBObject doc) throws UnknownHostException, MongoException  {

        MongoClient mongo = commons_db.getMongoClient();
        ResponseEntity response = paymentBank.atualiza(doc, mongo);
        mongo.close();
        return response;
    };

    @SuppressWarnings("rawtypes")
    @RequestMapping(value = "/delete", produces = "application/json")
    public ResponseEntity delete(
            @RequestParam("paymentBankId") String paymentBankId) throws IOException, MongoException {

        MongoClient mongo = commons_db.getMongoClient();
        ResponseEntity response = paymentBank.delete(paymentBankId, mongo);
        mongo.close();
        return response;
    };

    @SuppressWarnings("rawtypes")
    @RequestMapping(value = "/lista", produces = "application/json")
    public ArrayList lista(
            @RequestParam("userId") String userId) throws IOException, MongoException {
        MongoClient mongo = commons_db.getMongoClient();
        ArrayList response = paymentBank.lista(userId, mongo);
        mongo.close();
        return response;
    };

    @SuppressWarnings("rawtypes")
    @RequestMapping(value = "/lista/payments", produces = "application/json")
    public ArrayList listaPayments(
            @RequestParam("paymentBankId") String paymentBankId) throws IOException, MongoException {
        MongoClient mongo = commons_db.getMongoClient();
        ArrayList response = paymentBank.listaPayments(paymentBankId, mongo);
        mongo.close();
        return response;
    };
};



