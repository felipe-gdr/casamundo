package com.casamundo.rest;

import com.casamundo.bean.Travel;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.Map;

@RestController
@RequestMapping("/travel")
public class Rest_Travel {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Travel travel = new Travel();

	@SuppressWarnings("rawtypes")
    @RequestMapping(value = "/lista", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public BasicDBObject lista( @RequestParam Map<String, String> params) throws UnknownHostException, MongoException, UnsupportedEncodingException {

		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = travel.lista(params, mongo);
		mongo.close();
		return response;

	};

	@RequestMapping(value = "/revert", produces = "application/json")
	@PostMapping(value = "/resize/check/homestay", consumes = "application/json")
	public BasicDBObject transfer(@RequestBody BasicDBObject doc
	) throws  MongoException  {

		MongoClient mongo = commons_db.getMongoClient();
		if (doc != null ) {
			return null;
		}
		mongo.close();
		return null;
	}

};
