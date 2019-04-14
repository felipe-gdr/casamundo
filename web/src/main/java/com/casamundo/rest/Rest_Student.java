package com.casamundo.rest;

import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.Map;

import com.mongodb.MongoClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.casamundo.bean.Student;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/student")
public class Rest_Student {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Student student = new Student();

	@RequestMapping(value = "/getAllocation", produces = "application/json")
	public BasicDBObject getAllocation(
			@RequestParam(value = "studentId") String studentId, 
			@RequestParam(value = "userId", required=false) String userId) throws UnknownHostException, MongoException {
		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = student.getAllocation(studentId, userId, mongo);
		mongo.close();
		return response;
	};

	@SuppressWarnings("rawtypes")
    @RequestMapping(value = "/lista", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public BasicDBObject lista( @RequestParam Map<String, String> params) throws UnknownHostException, MongoException, UnsupportedEncodingException {

		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = student.lista(params, mongo);
		mongo.close();
		return response;

	};
};
