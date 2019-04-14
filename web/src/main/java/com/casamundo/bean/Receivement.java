package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Receivement {

    Commons commons = new Commons();
    Commons_DB commons_db = new Commons_DB();
    Invoice invoice = new Invoice();

    public BasicDBObject listaDatatable(Map<String, String> params, MongoClient mongo) throws UnknownHostException {

        if (params.get("companyId") == null || params.get("usuarioId") == null){
            return null;
        }

        if (params.get("companyId").equals("") || params.get("usuarioId").equals("")){
            return null;
        }

        BasicDBObject setQuery = new BasicDBObject();

        BasicDBObject result = new BasicDBObject();
        result.put("draw", params.get("draw"));

        ResponseEntity response = commons_db.listaCrudSkip("receivement", "documento.companyId", params.get("companyId"), params.get("usuarioId"), setQuery, null, false, Integer.parseInt(params.get("start")),Integer.parseInt(params.get("length")), params, mongo);
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

    public ResponseEntity atualiza (JSONObject queryParam, MongoClient mongo) throws UnknownHostException {
        List arrayUpdate = (List) queryParam.get("update");

        BasicDBObject receivementAtu = commons_db.obterCrudDoc("receivement", "_id", queryParam.get("value").toString(), mongo);

        ArrayList<Object> invoices = new ArrayList<Object>();

        if (receivementAtu != null) {
            if (receivementAtu.get("invoices") != null) {
                invoices = (ArrayList<Object>) receivementAtu.get("invoices");
                invoice.atualizarReceivementsInvoice(queryParam.get("value").toString(), true, invoices, mongo);
            }
        }

        for (int i = 0; i < arrayUpdate.size(); i++) {
            BasicDBObject setUpdate = new BasicDBObject();
            setUpdate.putAll((Map) arrayUpdate.get(i));
            if (setUpdate.getString("field").equals("invoices")) {
                ArrayList docUpdate = (ArrayList) setUpdate.get("value");
                JSONArray arrayField = new JSONArray();
                for (int j = 0; j < docUpdate.size(); j++) {
                    if (docUpdate.get(j) instanceof String) {
                        invoices.add(docUpdate.get(j));
                    } else {
                        BasicDBObject docUpdateItem = new BasicDBObject();
                        docUpdateItem.putAll((Map) docUpdate.get(j));
                        invoices.add(docUpdateItem);
                    }
                }
            }
        }

        ResponseEntity response = commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString(), mongo);
        if (response.getStatusCode() == HttpStatus.OK) {
            invoice.atualizarReceivementsInvoice(queryParam.get("value").toString(), false, invoices, mongo);
        };
        return ResponseEntity.ok().body("true");
    }
}
