package com.casamundo.rest;

import com.casamundo.bean.HomestayBook;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.net.UnknownHostException;

@RestController
@RequestMapping("/homestayBook")
public class Rest_HomestayBook {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	HomestayBook homestayBook = new HomestayBook();

	@SuppressWarnings("rawtypes")
	@GetMapping(value = "/responseEmail", produces = "application/json")
	public ResponseEntity ObterEmail(@PathParam("alocationId") String alocationId, @PathParam("invite") String invite) throws UnknownHostException, MongoException {
		return homestayBook.responseEmail(alocationId, invite);

	}
};
