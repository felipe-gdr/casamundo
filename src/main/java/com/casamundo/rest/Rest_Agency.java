package com.casamundo.rest;

import java.net.UnknownHostException;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.bean.Agency;
import com.mongodb.MongoException;


@RestController
@RequestMapping("/agency")
public class Rest_Agency {

	Agency agency = new Agency();

	@GetMapping(value = "/lista", produces = "application/json")
	public ArrayList<Object> ObterAgencies() throws UnknownHostException, MongoException {
		return agency.listaAgency();
	}
}
