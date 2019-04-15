package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.ArrayList;

import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.bean.Agency;
import com.mongodb.MongoException;


@RestController
@RequestMapping("/agency")
public class Rest_Agency {

	Agency agency = new Agency();
	Commons_DB commons_db = new Commons_DB();

	@GetMapping(value = "/lista", produces = "application/json")
	public ArrayList<Object> ObterAgencies() throws UnknownHostException, MongoException {
		MongoClient mongo = commons_db.getMongoClient();
		ArrayList<Object> response = agency.listaAgency(mongo);
		mongo.close();
		return response;
	}
}
