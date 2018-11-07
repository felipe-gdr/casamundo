package com.casamundo.rest;

import com.casamundo.bean.PriceTable;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;
import org.json.simple.JSONArray;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/pricetable")
public class Rest_PriceTable {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();
	@GetMapping(value = "/lista", produces = "application/json")
	public JSONArray listaProdutos(@PathParam("travelId") String travelId, @PathParam("userId") String userId ) throws UnknownHostException, MongoException {

		if (travelId != null && userId != null) {
			return priceTable.listaProdutos(travelId, userId);
		}
		return null;
	}
}
