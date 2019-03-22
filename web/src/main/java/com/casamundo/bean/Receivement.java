package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class Receivement {

    Commons commons = new Commons();
    Commons_DB commons_db = new Commons_DB();

    public BasicDBObject listaDatatable(Map<String, String> params) throws UnknownHostException {

        if (params.get("companyId") == null || params.get("usuarioId") == null){
            return null;
        }

        if (params.get("companyId").equals("") || params.get("usuarioId").equals("")){
            return null;
        }

        BasicDBObject setQuery = new BasicDBObject();

        BasicDBObject result = new BasicDBObject();
        result.put("draw", params.get("draw"));

        ResponseEntity response = commons_db.listaCrudSkip("receivement", "documento.companyId", params.get("companyId"), params.get("usuarioId"), setQuery, null, false, Integer.parseInt(params.get("start")),Integer.parseInt(params.get("length")), params);
        BasicDBObject retorno = new BasicDBObject();
        if ((response.getStatusCode() == HttpStatus.OK)) {
            retorno.putAll((Map) response.getBody());
        };

        ArrayList<Object> recevements = new ArrayList<>();
        String countFiltered =  "";
        String count =  "";
        int i = 0;
        if (retorno != null) {
            recevements = (ArrayList<Object>) retorno.get("documentos");
            countFiltered =  retorno.getString("countFiltered");
            count =  retorno.getString("count");
            while (retorno.get("yadcf_data_" + i) != null){
                result.put("yadcf_data_" + i, retorno.get("yadcf_data_" + i));
                ++i;
            }
        }
        ArrayList<Object> finalResult = recevements;
        result.put("data", finalResult);
        result.put("recordsFiltered", countFiltered);
        result.put("recordsTotal", count);

        return result;
    }
}
