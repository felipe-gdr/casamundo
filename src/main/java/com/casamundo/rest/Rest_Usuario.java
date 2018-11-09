package com.casamundo.rest;

import java.net.UnknownHostException;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/usuario")
public class Rest_Usuario {

	Commons_DB commons_db = new Commons_DB();
	
	@RequestMapping(value = "/obter", produces = "application/json")
	public BasicDBObject ObterUsuarioName(@RequestParam("email") String email) throws UnknownHostException, MongoException {
		return commons_db.obterCrudDoc("usuarios", "documento.email", email);
	};
};
