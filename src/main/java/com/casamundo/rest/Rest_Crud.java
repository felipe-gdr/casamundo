package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/crud")
public class Rest_Crud {
	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/obter", consumes = "application/json")
	public ResponseEntity Obter(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		String collection = (String) queryParam.get("collection");
		String key = (String) queryParam.get("key");
		String value = (String) queryParam.get("value");
		if (collection != null && key != null && value != null){
			return commons_db.obterCrud(collection, key, value);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/obter-get", produces = "application/json")
	public ResponseEntity obterGet(
			@RequestParam(value = "collection", required=false) String collection, 
			@RequestParam(value = "key", required=false) String key, @RequestParam(
			"value") String value) throws UnknownHostException, MongoException  {

		if (collection != null && key != null && value != null){
			return commons_db.obterCrud(collection, key, value);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/obter-id", produces = "application/json")
	public ResponseEntity obterGet(@RequestParam("collection") String collection) throws UnknownHostException, MongoException  {

		if (collection != null){
			return commons_db.obterId(collection);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/incluir", consumes = "application/json")
	public ResponseEntity incluir(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		String collection = (String) queryParam.get("collection");
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) queryParam.get("documento"));
		if (collection != null ){
			return commons_db.incluirCrud(collection, documento);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity Atualizar(JSONObject queryParam) throws UnknownHostException, MongoException  {

		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			return commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@PostMapping(value = "/multiploatualizar", consumes = "application/json")
	public ResponseEntity multiploAtualizar(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			ArrayList<Object> values = (ArrayList<Object>) queryParam.get("values");
			for (int i = 0; i < values.size(); i++) {
				commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), values.get(i).toString(), queryParam.get("value").toString());
			}
			return ResponseEntity.ok().body(true);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lista", produces = "application/json")
	public ResponseEntity Lista(
			@RequestParam(value = "collection", required=false) String collection, 
			@RequestParam(value = "key", required=false) String key, 
			@RequestParam(value = "value", required=false) String value, 
			@RequestParam(value = "userId", required=false) String userId) throws UnknownHostException, MongoException  {
		if (collection != null ){
			return commons_db.listaCrud(collection, key, value, userId, null, null, false);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@SuppressWarnings("rawtypes")
	@PostMapping(value = "/array", consumes = "application/json")
	public ResponseEntity Array(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			return commons_db.arrayCrud(queryParam.get("collection").toString(), queryParam.get("key").toString(), queryParam.get("value").toString(), queryParam.get ("type").toString(), queryParam.get("field").toString(), queryParam.get ("index").toString(), queryParam.get("item"));
		}else{
			return ResponseEntity.badRequest().build();
		}
	};


	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/atualizaElemento", produces = "application/json")
	public ResponseEntity ObterEmail(
			@RequestParam(value = "collection", required=false) String collection, 
			@RequestParam(value = "key", required=false) String key, 
			@RequestParam(value = "keyValue", required=false) String keyValue, 
			@RequestParam(value = "field", required=false) String field, 
			@RequestParam(value = "value", required=false) String value) throws UnknownHostException, MongoException {

		if ( !collection.equals(null) && !key.equals(null) && !keyValue.equals(null)&& !field.equals(null) && !value.equals(null)) {
			ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
			BasicDBObject update = new BasicDBObject();
			update.put("field", field);
			update.put("value", value);
			arrayUpdate.add(update);
			commons_db.atualizarCrud(collection, arrayUpdate, key, keyValue);
			return ResponseEntity.ok().body("true");
		}
		return ResponseEntity.ok().body("false");
	};

};
