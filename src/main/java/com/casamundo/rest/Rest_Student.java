package com.casamundo.rest;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.casamundo.bean.Student;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/student")

public class Rest_Student {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Student student = new Student();

	@Path("/getAllocation")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public BasicDBObject getAllocation(@QueryParam("studentId") String studentId, @QueryParam("userId") String userId) throws UnknownHostException, MongoException {

		return student.getAllocation(studentId, userId);

	};

};
