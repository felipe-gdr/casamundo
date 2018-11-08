package com.casamundo.rest;

import java.net.UnknownHostException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@RequestMapping(value = "/getAllocation", produces = "application/json")
	public BasicDBObject getAllocation(@RequestParam("studentId") String studentId, @RequestParam("userId") String userId) throws UnknownHostException, MongoException {
		return student.getAllocation(studentId, userId);
	};

};
