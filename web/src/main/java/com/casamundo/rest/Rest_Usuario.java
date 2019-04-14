package com.casamundo.rest;

import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class Rest_Usuario {

    Commons_DB commons_db = new Commons_DB();

    @RequestMapping(value = "/obter", produces = "application/json")
    public BasicDBObject ObterUsuarioName(@RequestParam("email") String email) throws MongoException {
        MongoClient mongo = commons_db.getMongoClient();
        BasicDBObject response = commons_db.obterCrudDoc("usuarios", "documento.email", email, mongo);
        response.remove("password");
        return response;
    }

}
