package com.casamundo.rest;

import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/usuario")
public class Rest_Usuario {

	Commons_DB commons_db = new Commons_DB();
	
	@GetMapping(value = "/obter", produces = "application/json")
	public BasicDBObject ObterUsuarioName(@PathParam("email") String email) throws UnknownHostException, MongoException {
		return commons_db.obterCrudDoc("usuarios", "documento.email", email);
	};
};
