package com.casamundo.externalRest;

import com.casamundo.dao.Commons_DB;
import com.casamundo.externalBean.External_City;
import com.mongodb.MongoClient;
import com.sun.org.apache.bcel.internal.generic.MONITORENTER;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;

@RestController
@RequestMapping("/external/city")
public class Rest_External_City {

	External_City city = new External_City();
	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/lista", produces = "application/json")
	public ResponseEntity ObterAgencies() throws UnknownHostException {
		MongoClient mongo = commons_db.getMongoClient();
		ResponseEntity response = city.lista(mongo);
		mongo.close();
		return response;

	}
}
