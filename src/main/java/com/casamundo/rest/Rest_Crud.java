package com.casamundo.rest;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.json.simple.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/crud")
public class Rest_Crud {
	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();

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

	@GetMapping(value = "/obter-get", produces = "application/json")
	public ResponseEntity obterGet(@PathParam("collection") String collection, @PathParam("key") String key, @PathParam(
			"value") String value) throws UnknownHostException, MongoException  {

		if (collection != null && key != null && value != null){
			return commons_db.obterCrud(collection, key, value);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@GetMapping(value = "/obter-id", produces = "application/json")
	public ResponseEntity obterGet(@PathParam("collection") String collection) throws UnknownHostException, MongoException  {

		if (collection != null){
			return commons_db.obterId(collection);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

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

	@PostMapping(value = "/atualizar", consumes = "application/json")
	public ResponseEntity Atualizar(JSONObject queryParam) throws UnknownHostException, MongoException  {

		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			return commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

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

	@GetMapping(value = "/lista", produces = "application/json")
	public ResponseEntity Lista(@PathParam("collection") String collection, @PathParam("key") String key, @PathParam("value") String value, @PathParam("userId") String userId) throws UnknownHostException, MongoException  {
		if (collection != null ){
			return commons_db.listaCrud(collection, key, value, userId, null, null, false);
		}else{
			return ResponseEntity.badRequest().build();
		}
	};

	@PostMapping(value = "/array", consumes = "application/json")
	public ResponseEntity Array(@RequestBody JSONObject queryParam) throws UnknownHostException, MongoException  {

		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			return commons_db.arrayCrud(queryParam.get("collection").toString(), queryParam.get("key").toString(), queryParam.get("value").toString(), queryParam.get ("type").toString(), queryParam.get("field").toString(), queryParam.get ("index").toString(), queryParam.get("item"));
		}else{
			return ResponseEntity.badRequest().build();
		}
	};


	@GetMapping(value = "/atualizaElemento", produces = "application/json")
	public ResponseEntity ObterEmail(@PathParam("collection") String collection, @PathParam("key") String key, @PathParam("keyValue") String keyValue, @PathParam("field") String field, @PathParam("value") String value) throws UnknownHostException, MongoException {

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
