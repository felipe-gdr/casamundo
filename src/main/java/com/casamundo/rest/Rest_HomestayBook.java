package com.casamundo.rest;

import java.net.UnknownHostException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.bean.HomestayBook;
import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.MongoException;

@RestController
@RequestMapping("/homestayBook")
public class Rest_HomestayBook {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	HomestayBook homestayBook = new HomestayBook();

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/responseEmail", produces = "application/json")
	public ResponseEntity ObterEmail(@RequestParam("alocationId") String alocationId, @RequestParam("invite") String invite) throws UnknownHostException, MongoException {
		return homestayBook.responseEmail(alocationId, invite);

	}
};
