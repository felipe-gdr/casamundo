package com.casamundo.rest;

import com.casamundo.bean.DayPilot;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;

@RestController
@RequestMapping("/daypilot")
public class Rest_DayPilot {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	DayPilot dayPilot = new DayPilot();

	@RequestMapping(value = "/monta/homestay", produces = "application/json")
	public BasicDBObject montaHomestay(
			@RequestParam(value = "start", required=false) String start,
			@RequestParam(value = "end", required=false) String end,
			@RequestParam(value = "companyId", required=false) String companyId,
			@RequestParam(value = "userId", required=false) String userId,
			@RequestParam(value = "cityId", required=false) String cityId,
			@RequestParam(value = "filtroIdI", required=false) String filtroIdI,
			@RequestParam(value = "filtroIdII", required=false) String filtroIdII
			) throws UnknownHostException, MongoException {

		if (start != null && end != null &&  cityId != null && companyId != null && userId != null && filtroIdI != null && filtroIdII != null) {
			MongoClient mongo = commons_db.getMongoClient();
			BasicDBObject result =  dayPilot.montaHomeStay(companyId, userId, start, end, cityId, filtroIdI, filtroIdII, mongo);
			mongo.close();
			return result;
		}
		return null;

	}

	@RequestMapping(value = "/monta/shared", produces = "application/json")
	public BasicDBObject montaShared(
			@RequestParam(value = "start", required=false) String start,
			@RequestParam(value = "end", required=false) String end,
			@RequestParam(value = "companyId", required=false) String companyId,
			@RequestParam(value = "userId", required=false) String userId,
			@RequestParam(value = "cityId", required=false) String cityId,
			@RequestParam(value = "filtroIdI", required=false) String filtroIdI,
			@RequestParam(value = "filtroIdII", required=false) String filtroIdII,
			@RequestParam(value = "filtroIdIII", required=false) String filtroIdIII,
			@RequestParam(value = "filtroIdIV", required=false) String filtroIdIV
	) throws UnknownHostException, MongoException {

		if (start != null && end != null &&  cityId != null && companyId != null && userId != null && filtroIdI != null && filtroIdII != null && filtroIdIV != null) {
			MongoClient mongo = commons_db.getMongoClient();
			BasicDBObject result =  dayPilot.montaShared(companyId, userId, start, end, cityId, filtroIdI, filtroIdII, filtroIdIII, filtroIdIV, mongo);
			mongo.close();
			return result;
		}
		return null;

	}

	@RequestMapping(value = "/monta/suite", produces = "application/json")
	public BasicDBObject montaSuit(
			@RequestParam(value = "start", required=false) String start,
			@RequestParam(value = "end", required=false) String end,
			@RequestParam(value = "companyId", required=false) String companyId,
			@RequestParam(value = "userId", required=false) String userId,
			@RequestParam(value = "cityId", required=false) String cityId,
			@RequestParam(value = "filtroIdI", required=false) String filtroIdI,
			@RequestParam(value = "filtroIdII", required=false) String filtroIdII,
			@RequestParam(value = "filtroIdIII", required=false) String filtroIdIII,
			@RequestParam(value = "filtroIdIV", required=false) String filtroIdIV
	) throws UnknownHostException, MongoException {

		if (start != null && end != null && cityId != null && companyId != null && userId != null && filtroIdI != null && filtroIdII != null && filtroIdIV != null) {
			MongoClient mongo = commons_db.getMongoClient();
			BasicDBObject result =  dayPilot.montaSuite(companyId, userId, start, end, cityId, filtroIdI, filtroIdII, filtroIdIII, filtroIdIV, mongo);
			mongo.close();
			return result;
		}
		return null;

	}

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/resize/check/homestay", consumes = "application/json")
	public BasicDBObject resizeCheckHomestay(@RequestBody BasicDBObject params) throws UnknownHostException, MongoException  {

		if (params != null) {
			MongoClient mongo = commons_db.getMongoClient();
			BasicDBObject response = dayPilot.resizeCheck(params, "homestayBook", mongo);
			mongo.close();
			return response;
		};
		BasicDBObject result = new BasicDBObject();
		result.put("allow", "false");
		result.put("reason", "No parameters");
		return result;

	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/resize/check/shared", consumes = "application/json")
	public BasicDBObject resizeCheckShared(@RequestBody BasicDBObject params) throws UnknownHostException, MongoException  {

		if (params != null) {
			MongoClient mongo = commons_db.getMongoClient();
			BasicDBObject response = dayPilot.resizeCheck(params, "sharedBook", mongo);
			mongo.close();
			return response;
		};
		BasicDBObject result = new BasicDBObject();
		result.put("allow", "false");
		result.put("reason", "No parameters");
		return result;

	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/resize/check/suite", consumes = "application/json")
	public BasicDBObject resizeCheckSuite(@RequestBody BasicDBObject params) throws UnknownHostException, MongoException  {

		if (params != null) {
			MongoClient mongo = commons_db.getMongoClient();
			BasicDBObject response = dayPilot.resizeCheck(params, "suiteBook", mongo);
			mongo.close();
			return response;
		};
		BasicDBObject result = new BasicDBObject();
		result.put("allow", "false");
		result.put("reason", "No parameters");
		return result;

	};

};



