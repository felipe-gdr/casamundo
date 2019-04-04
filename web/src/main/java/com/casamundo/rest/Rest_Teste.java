package com.casamundo.rest;

import com.casamundo.bean.Table;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import org.bson.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/teste", produces = "application/json")
	public void teste() {
		MongoClient mongoClient = Commons_DB.getMongoClient();
		MongoDatabase database = mongoClient.getDatabase("documento");
		MongoCollection<Document> collection = database.getCollection("student");
		collection.aggregate(Arrays.asList(Aggregates.match(Filters.eq("documento.gender", "Male"))
                )
        ).forEach(printBlock);
	};

    @SuppressWarnings("unchecked")
    @GetMapping(value = "/teste2", produces = "application/json")
    public ResponseEntity teste2(
			@RequestParam(value = "collectionName") String collectionName

			) throws UnknownHostException {
        MongoClient mongoClient = Commons_DB.getMongoClient();
        MongoDatabase database = mongoClient.getDatabase("documento");
        MongoCollection<Document> collection = database.getCollection(collectionName);

        return commons_db.teste(0, 50,collectionName);
    };

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/trigger", produces = "application/json")
	public ResponseEntity trigger(
			@RequestParam(value = "collectionName") String collectionName,
			@RequestParam(value = "id") String id


	) throws UnknownHostException {
		MongoClient mongoClient = Commons_DB.getMongoClient();

		commons_db.trigger(collectionName, id,mongoClient);
		mongoClient.close();
		return null;
	};

	Block<Document> printBlock = new Block<Document>() {
		@Override
		public void apply(final Document document) {
			System.out.println(document.toJson());
		}
	};

}