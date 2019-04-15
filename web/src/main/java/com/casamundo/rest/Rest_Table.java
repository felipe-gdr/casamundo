package com.casamundo.rest;

import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import com.casamundo.bean.Table;
import com.mongodb.*;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;

@RestController
@RequestMapping("/table")
public class Rest_Table {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Table table = new Table();
	
	@SuppressWarnings("unchecked")
	@GetMapping(value = "/obter", produces = "application/json")
	public BasicDBObject Obter() throws UnknownHostException {

		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = table.obterTable(mongo);
		mongo.close();
		return response;
	};

}
