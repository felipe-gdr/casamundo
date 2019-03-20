package com.casamundo.rest;

import com.casamundo.bean.DayPilot;
import com.casamundo.bean.Invoice;
import com.casamundo.bean.Payment;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/daypilot")
public class Rest_DayPilot {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	DayPilot dayPilot = new DayPilot();

	@RequestMapping(value = "/monta/dorm", produces = "application/json")
	public BasicDBObject monta(
			@RequestParam(value = "start", required=false) String start,
			@RequestParam(value = "end", required=false) String end,
			@RequestParam(value = "companyId", required=false) String companyId,
			@RequestParam(value = "userId", required=false) String userId,
			@RequestParam(value = "city", required=false) String city ) throws UnknownHostException, MongoException {

		if (start != null && end != null &&  city != null && companyId != null && userId != null) {
			return dayPilot.montaDorm(companyId, userId, start, end, city);
		}
		return null;

	}

};



