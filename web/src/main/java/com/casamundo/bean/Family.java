package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.json.simple.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class Family {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();


	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject lista(Map<String, String> params) throws UnknownHostException {

		BasicDBObject result = new BasicDBObject();
		result.put("draw", params.get("draw"));

        ResponseEntity response = commons_db.listaCrudSkip("family", "documento.companyId", params.get("companyId"), params.get("usuarioId"), null, null, false, Integer.parseInt(params.get("start")),Integer.parseInt(params.get("length")), params);
		BasicDBObject retorno = new BasicDBObject();
		if ((response.getStatusCode() == HttpStatus.OK)) {
			retorno.putAll((Map) response.getBody());
		};

        if (retorno != null) {
            ArrayList<Object> students = (ArrayList<Object>) retorno.get("documentos");
            result.put("data", students);
            result.put("recordsFiltered", retorno.get("countFiltered"));
            result.put("recordsTotal", retorno.get("count"));
            int i = 0;
            while (retorno.get("yadcf_data_" + i) != null){
                result.put("yadcf_data_" + i, retorno.get("yadcf_data_" + i));
                ++i;
            }
        }
        return result;

	}

}
