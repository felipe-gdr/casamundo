package com.casamundo.externalRest;

import com.casamundo.dao.Commons_DB;
import com.casamundo.externalBean.External_School;
import com.mongodb.MongoClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;

@RestController
@RequestMapping("/external/school")
public class Rest_External_School {

	External_School school = new External_School();
	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/getList", produces = "application/json")
	public ResponseEntity obterEscolas(@RequestParam("idCity") String idCity) throws UnknownHostException {
		MongoClient mongo = commons_db.getMongoClient();
		ResponseEntity response = school.lista(mongo);
		mongo.close();
		return response;

	}
}
