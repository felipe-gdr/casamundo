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

public class Family {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject lista(Map<String, String> params, MongoClient mongo) throws UnknownHostException {

		BasicDBObject result = new BasicDBObject();
		result.put("draw", params.get("draw"));

        ResponseEntity response = commons_db.listaCrudSkip("family", "documento.companyId", params.get("companyId"), params.get("usuarioId"), null, null, false, Integer.parseInt(params.get("start")),Integer.parseInt(params.get("length")), params, mongo);
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

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public BasicDBObject getAvailable(String familyId, String start, String end, ArrayList<String> geralAllocations, MongoClient mongo) throws UnknownHostException {

        BasicDBObject result = new BasicDBObject();
	    ArrayList<BasicDBObject> resultArray = new ArrayList<BasicDBObject>();

        ResponseEntity response = commons_db.listaCrud("familyDorm", "ddocumento.familyId", familyId, null, null, null, true, mongo);
        
        BasicDBObject setQuery = new BasicDBObject();
        BasicDBObject setCondition = new BasicDBObject();
        setCondition.put("$gte", start);
        setCondition.put("$lte", end);
        setQuery.put("documento.checkIn", setCondition);

        ArrayList<String> allocations = new ArrayList<String>();

        String date = start;
        while (commons.comparaData(end,date)){
            allocations.add("0");
            date = commons.calcNewDate(date, 1);
        }

        ArrayList<Object> dorms = new ArrayList<Object>();
        dorms = (JSONArray) response.getBody();
        HttpStatus a = response.getStatusCode();
        if (dorms != null) {
            for (int i = 0; i < dorms.size(); i++) {
                BasicDBObject dorm = new BasicDBObject();
                dorm.putAll((Map) dorms.get(i));
                BasicDBObject dormDoc = new BasicDBObject();
                dormDoc.putAll((Map) dorm.get("documento"));
                setQuery.put("documento.resource", dormDoc.getString("id") );
                ResponseEntity responseBook = commons_db.listaCrud("hemostayBook", null, null, null, setQuery, null, true, mongo);
                ArrayList<Object> books = new ArrayList<Object>();
                books = (JSONArray) responseBook.getBody();
                if (books != null) {
                    for (int j = 0; j < books.size(); j++) {
                        BasicDBObject book = new BasicDBObject();
                        book.putAll((Map) books.get(j));
                        BasicDBObject bookDoc = new BasicDBObject();
                        bookDoc.putAll((Map) book.get("documento"));
                        date = start;
                        while (commons.comparaData(end,date)){
                            allocations.set(commons.getRelativeDay(date, start), "1");
                            geralAllocations.set(commons.getRelativeDay(date, start), "1");
                            date = commons.calcNewDate(date, 1);
                        }
                    }
                }
            }
        }

        result.put("available", commons.testaElementoArray("0", allocations));
        result.put("allocations", geralAllocations);
        return result;

    }

}
