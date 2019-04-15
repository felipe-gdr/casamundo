package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Iterator;

import com.casamundo.bean.School;
import com.casamundo.dao.Commons_DB;
import com.mongodb.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/school")
public class Rest_School {

	School school = new School();
	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/lista", produces = "application/json")
	public ArrayList<Object> ObterAgencies() throws UnknownHostException {
		MongoClient mongo = commons_db.getMongoClient();
		ArrayList<Object> response = school.lista(mongo);
		mongo.close();
		return response;

	}
}
