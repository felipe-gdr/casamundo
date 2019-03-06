package com.casamundo.rest;

import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
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
		return student.getAllocation(studentId, userId);
	};

	@SuppressWarnings("rawtypes")
    @RequestMapping(value = "/lista", method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public BasicDBObject lista( @RequestParam Map<String, String> params) throws UnknownHostException, MongoException, UnsupportedEncodingException {
		return student.lista(params);
	};

    @RequestMapping(value = "/teste", produces = "application/json")
    public BasicDBObject teste(
            @RequestParam(value = "regex") String regex
                            ) throws UnknownHostException, MongoException {
        ResponseEntity response = commons_db.teste("student", "documento.companyId", "5bb273e7fff5a60c78ae7acf", "5b2bf5859ad9d2a693778f7d", null, null, false, 0,10, regex);
        return null;

    };
};
