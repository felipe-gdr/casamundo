package com.casamundo.externalRest;

import com.casamundo.externalBean.External_School;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;

@RestController
@RequestMapping("/external/school")
public class Rest_External_School {

	External_School school = new External_School();

	@SuppressWarnings("unchecked")
	@GetMapping(value = "/lista", produces = "application/json")
	public ResponseEntity ObterAgencies() throws UnknownHostException {
			return school.lista();

	}
}
