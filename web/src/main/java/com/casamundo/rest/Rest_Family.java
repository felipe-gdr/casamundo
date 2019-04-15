package com.casamundo.rest;

import com.casamundo.bean.Family;
import com.casamundo.bean.Student;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.Map;

@RestController
@RequestMapping("/family")
public class Rest_Family {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Family family = new Family();



	@SuppressWarnings("rawtypes")
    @RequestMapping(value = "/lista", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public BasicDBObject lista( @RequestParam Map<String, String> params) throws UnknownHostException, MongoException, UnsupportedEncodingException {

		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = family.lista(params, mongo);
		mongo.close();
		return response;

	};
};
