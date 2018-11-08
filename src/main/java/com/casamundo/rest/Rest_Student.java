package com.casamundo.rest;

import java.net.UnknownHostException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	@GetMapping(value = "/getAllocation", produces = "application/json")
	public BasicDBObject getAllocation(@PathVariable("studentId") String studentId, @PathVariable("userId") String userId) throws UnknownHostException, MongoException {
		return student.getAllocation(studentId, userId);
	};

};
