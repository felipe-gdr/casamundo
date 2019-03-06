package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class Usuario {

    Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public ResponseEntity processaLogin(String email, String password) throws UnknownHostException {

        BasicDBObject usuario = commons_db.obterCrudDoc("usuarios","documento.email", email);
        if ((usuario != null)){
            if (usuario.get("password") != null){
                if (usuario.get("password").toString().equals(password)){
                };
            };
        };
        return null;
    }

	public BasicDBObject getId(String id) throws UnknownHostException {

        BasicDBObject usuarioGet = commons_db.obterCrudDoc("usuarios", "_id", id);

		BasicDBObject usuario = new BasicDBObject();

		if (usuarioGet != null) {
			BasicDBObject usuarioDoc = new BasicDBObject();
			usuarioDoc.putAll((Map) usuarioGet.get("documento"));
			if (usuarioDoc != null) {
				usuario.put("firstName", usuarioDoc.get("firstName"));
				usuario.put("lastName", usuarioDoc.get("lastName"));
				usuario.put("nome", usuarioDoc.get("firstName") + " " + usuarioDoc.get("lastName"));
				usuario.put("email", usuarioDoc.get("email"));
				usuario.put("photo", usuarioDoc.get("photo"));
				usuario.put("id", id);
				return (BasicDBObject) usuario;
			}
		}
		usuario.put("firstName", "");
		usuario.put("lastName", "");
		usuario.put("nome", "");
		usuario.put("email", "");
		usuario.put("photo", "");
		usuario.put("id", id);

		return usuario;

	};

	public BasicDBObject getEmail(String email) throws UnknownHostException {

		BasicDBObject usuarioGet = commons_db.obterCrudDoc("usuarios", "documento.email", email);

		BasicDBObject usuario = new BasicDBObject();

		if (usuarioGet != null) {
			BasicDBObject usuarioDoc = new BasicDBObject();
			usuarioDoc.putAll((Map) usuarioGet.get("documento"));
			if (usuarioDoc != null) {
				usuario.put("firstName", usuarioDoc.get("firstName"));
				usuario.put("lastName", usuarioDoc.get("lastName"));
				usuario.put("nome", usuarioDoc.get("firstName") + " " + usuarioDoc.get("lastName"));
				usuario.put("email", usuario.get("email"));
				usuario.put("id", usuario.get("_id").toString());
				return (BasicDBObject) usuario;
			}
		}
		usuario.put("firstName", "");
		usuario.put("lastName", "");
		usuario.put("nome", "");
		usuario.put("email", "");
		usuario.put("id", "");

		return usuario;

	};
}
