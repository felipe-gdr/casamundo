package com.casamundo.externalRest;

import com.casamundo.externalBean.External_City;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;

@RestController
@RequestMapping("/external/city")
public class Rest_External_City {

	External_City city = new External_City();

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/lista", produces = "application/json")
	public ResponseEntity ObterAgencies() throws UnknownHostException {
			return city.lista();

	}
}
