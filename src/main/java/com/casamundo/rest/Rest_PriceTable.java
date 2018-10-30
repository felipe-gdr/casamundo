package com.casamundo.rest;

import java.net.UnknownHostException;

import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONArray;

import com.casamundo.bean.PriceTable;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/pricetable")

public class Rest_PriceTable {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	PriceTable priceTable = new PriceTable();
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray listaProdutos(@QueryParam("travelId") String travelId, @QueryParam("userId") String userId ) throws UnknownHostException, MongoException {

		if (travelId != null && userId != null) {
			return priceTable.listaProdutos(travelId, userId);
		}
		return null;
	}
}
