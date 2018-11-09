package com.casamundo.rest;

import java.net.UnknownHostException;

import org.json.simple.JSONArray;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.bean.PriceTable;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/pricetable")
public class Rest_PriceTable {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();
	@RequestMapping(value = "/lista", produces = "application/json")
	public JSONArray listaProdutos(
			@RequestParam("travelId") String travelId, 
			@RequestParam("userId") String userId ) throws UnknownHostException, MongoException {

		if (travelId != null && userId != null) {
			return priceTable.listaProdutos(travelId, userId);
		}
		return null;
	}
}
