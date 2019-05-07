package com.casamundo.rest;

import com.casamundo.bean.Table;
import com.casamundo.commons.Commons;
import com.casamundo.externalBean.External_Book;
import com.casamundo.geolocalization.GeocodingException;
import com.casamundo.geolocalization.GeocodingImpl;
import com.casamundo.dao.Commons_DB;
import com.google.gson.JsonObject;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.bson.Document;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.Arrays;

import com.mongodb.Block;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;

@RestController
@RequestMapping("/teste")
public class Rest_Teste {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	Table table = new Table();
	External_Book book = new External_Book();
	GeocodingImpl geocoding = new GeocodingImpl();

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/teste", produces = "application/json")
	public void teste() {
		MongoClient mongoClient = commons_db.getMongoClient();
		MongoDatabase database = mongoClient.getDatabase("documento");
		MongoCollection<Document> collection = database.getCollection("student");
		collection.aggregate(Arrays.asList(Aggregates.match(Filters.eq("documento.gender", "Male"))
                )
        ).forEach(printBlock);
	};

    @SuppressWarnings("unchecked")
    @GetMapping(value = "/teste2", produces = "application/json")
    public int teste2(
			@RequestParam(value = "date1") String date1,
			@RequestParam(value = "date2") String date2

			) throws UnknownHostException {

        return commons.getRelativeDay(date1,date2);
    };

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/getCoordinates", produces = "application/json")
	public BasicDBObject getCoordinates(
			@RequestParam(value = "address") String address


	) throws GeocodingException {

		JsonObject result = geocoding.getLatLng(address);


		return null;

	};
	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/testejson", consumes = "application/json")
	public ResponseEntity testaJson(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException {

		MongoClient mongo = commons_db.getMongoClient();
		Boolean result = book.camposObrigatorios(queryParam, "necessaryFieldsTrip", mongo);
		mongo.close();
		return ResponseEntity.ok().body(result);
	};

	Block<Document> printBlock = new Block<Document>() {
		@Override
		public void apply(final Document document) {
			System.out.println(document.toJson());
		}
	};

}
