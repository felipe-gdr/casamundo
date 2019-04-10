package com.casamundo.externalRest;

import com.casamundo.externalBean.Agency;
import com.mongodb.MongoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;


@RestController
@RequestMapping("/external/agency")
public class Rest_Agency {

	com.casamundo.externalBean.Agency agency = new Agency();

	@GetMapping(value = "/lista", produces = "application/json")
	public ResponseEntity ObterAgencies() throws UnknownHostException, MongoException {
		return agency.listaAgency();
	}
}
