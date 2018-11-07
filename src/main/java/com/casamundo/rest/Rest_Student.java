package com.casamundo.rest;

import com.casamundo.bean.Student;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/student")
public class Rest_Student {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Student student = new Student();

	@GetMapping(value = "/getAllocation", produces = "application/json")
	public BasicDBObject getAllocation(@PathParam("studentId") String studentId, @PathParam("userId") String userId) throws UnknownHostException, MongoException {
		return student.getAllocation(studentId, userId);
	};

};
