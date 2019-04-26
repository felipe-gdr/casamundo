package com.casamundo.externalRest;

import com.casamundo.dao.Commons_DB;
import com.casamundo.externalBean.External_Agency;
import com.casamundo.externalBean.External_Student;
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.UnknownHostException;


@RestController
@RequestMapping("/external/student")
public class Rest_External_Student {

	External_Student student = new External_Student();
	Commons_DB commons_db = new Commons_DB();

	@GetMapping(value = "/getList", produces = "application/json")
	public ResponseEntity ObterAgencies() throws UnknownHostException, MongoException {
		MongoClient mongo = commons_db.getMongoClient();
		ResponseEntity response = student.listaStudent(mongo);
		mongo.close();
		return response;
	}
}
