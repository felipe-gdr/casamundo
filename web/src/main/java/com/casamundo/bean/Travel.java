package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.json.simple.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class Travel {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject lista(Map<String, String> params, MongoClient mongo) throws UnknownHostException {

		if (params.get("companyId") == null || params.get("usuarioId") == null || params.get("accControl") == null  || params.get("cityId") == null){
			return null;
		}

		if (params.get("companyId").equals("") || params.get("usuarioId").equals("") || params.get("accControl").equals("") || params.get("cityId").equals("")){
			return null;
		}

		BasicDBObject setQuery = new BasicDBObject();
		setQuery.put("documento.accControl", params.get("accControl"));
        setQuery.put("documento.destination", params.get("cityId"));

		BasicDBObject result = new BasicDBObject();
		result.put("draw", params.get("draw"));



        ResponseEntity response = commons_db.listaCrudSkip("travel", "documento.companyId", params.get("companyId"), params.get("usuarioId"), setQuery, null, false, Integer.parseInt(params.get("start")),Integer.parseInt(params.get("length")), params, mongo);
		BasicDBObject retorno = new BasicDBObject();
		if ((response.getStatusCode() == HttpStatus.OK)) {
			retorno.putAll((Map) response.getBody());
		};

        if (retorno != null) {
            ArrayList<Object> travels = (ArrayList<Object>) retorno.get("documentos");
            result.put("data", travels);
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

    public void revert(BasicDBObject travelDoc, MongoClient mongo) {

    }
}
