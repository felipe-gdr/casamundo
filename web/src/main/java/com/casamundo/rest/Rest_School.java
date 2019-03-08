package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Iterator;

import com.casamundo.bean.School;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/school")
public class Rest_School {

	School school = new School();

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/lista", produces = "application/json")
	public ArrayList<Object> ObterAgencies() throws UnknownHostException {
			return school.lista();

	}
}
