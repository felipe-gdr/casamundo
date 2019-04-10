package com.casamundo.externalRest;

import com.casamundo.externalBean.External_Agency;
import com.mongodb.MongoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;


@RestController
@RequestMapping("/external/agency")
public class Rest_External_Agency {

	External_Agency agency = new External_Agency();

	@GetMapping(value = "/lista", produces = "application/json")
	public ResponseEntity ObterAgencies() throws UnknownHostException, MongoException {
		return agency.listaAgency();
	}
}
