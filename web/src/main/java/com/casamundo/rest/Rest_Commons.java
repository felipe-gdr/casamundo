package com.casamundo.rest;

import com.casamundo.bean.Invoice;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.json.simple.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.util.Map;

@RestController
@RequestMapping("/commons")
public class Rest_Commons {
	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();
	Invoice invoice = new Invoice();

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lastDayMonth", produces = "application/json")
	public String lastDayMonth(@RequestParam("date") String date) {

		return commons.lastDayMonth(date);
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/diferenceDate", produces = "application/json")
	public int lastDayMonth(@RequestParam("start") String start, @RequestParam("end") String end ) {

		return commons.difDate(start, end);
	};

    @SuppressWarnings("rawtypes")
    @RequestMapping(value = "/calcNewMonth", produces = "application/json")
    public String calcNewMonth(@RequestParam("date") String date, @RequestParam("months") int months ) {

        return commons.calcNewMonth(date, months);
    };

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/testaformula", consumes = "application/json")
	public Double testaFormula(@RequestBody JSONObject queryParam) throws IOException, MongoException {

		String formula = (String) queryParam.get("formula");
		BasicDBObject variaveis = new BasicDBObject();
		variaveis.putAll((Map) queryParam.get("variaveis"));
		return invoice.testaFormla(formula,variaveis);
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/listadatatable", consumes = "application/json")
	public BasicDBObject listadatatable(@RequestBody BasicDBObject params) throws UnknownHostException, MongoException, UnsupportedEncodingException {

		MongoClient mongo = commons_db.getMongoClient();
		BasicDBObject response = commons.listaDatatable(params,mongo);
		mongo.close();
		return response;

	};

};
