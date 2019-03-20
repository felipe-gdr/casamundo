package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class DayPilot {

    Commons commons = new Commons();
    Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject montaDorm(String companyId, String userId, String start, String end, String city) throws UnknownHostException {

		BasicDBObject setQuery = new BasicDBObject();
		setQuery.put("documento.companyId", companyId );
        setQuery.put("city", city );
		ResponseEntity response = commons_db.listaCrud("familyDorm", null, null, userId, setQuery, null, false);

        ArrayList<Object> arrayList = new ArrayList<Object>();
		if (arrayList != null) {
			for (int i = 0; i < arrayList.size(); i++) {
				BasicDBObject doc = new BasicDBObject();
				doc.putAll((Map) arrayList.get(i));
				BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                MongoClient mongo = new MongoClient();
				docObj = commons_db.triggerDinamicData(doc, "familyDorm", commons_db.montaSetQuery(doc.getString("_id")),mongo);
                mongo.close();
			}
		}
        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("city", city );
        response = commons_db.listaCrud("familyDorm", null, null, userId, setQuery, null, false);

        ArrayList<BasicDBObject> resultListDorm = new ArrayList<BasicDBObject>();
        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                MongoClient mongo = new MongoClient();
                docObj = commons_db.triggerDinamicData(doc, "familyDorm", commons_db.montaSetQuery(doc.getString("_id")),mongo);
                mongo.close();
                BasicDBObject result = new BasicDBObject();
                result.put("dorm",docObj.get("bedNumber"));
                result.put("room",docObj.get("roomNumber"));
                result.put("fName",docObj.get("familyName"));
                result.put("id",docObj.get("id"));
                result.put("name","<a href=\"#\" data-toggle=\"modal\" data-target=\"#famHist\" data-item=\"" + docObj.get("familyId") + "\">" + docObj.get("familyName") + "</a>");
                result.put("_id",docObj.get("familyId"));
                result.put("familyName",docObj.get("familyName"));
                ArrayList columns = new ArrayList();
                BasicDBObject column = new BasicDBObject();
                column.put("roomNumber",docObj.get("roomNumber"));
                column.put("bedNumber",docObj.get("bedNumber"));
                columns.add(column);
                resultListDorm.add(result);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        BasicDBObject setConditionStart = new BasicDBObject();
        setConditionStart.put("$gte", start);
        BasicDBObject setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.start", setConditionStart);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrud("homeStayBook", null, null, userId, setQuery, null, false);

        ArrayList<BasicDBObject> resultListBook = new ArrayList<BasicDBObject>();
        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                MongoClient mongo = new MongoClient();
                docObj = commons_db.triggerDinamicData(doc, "homeStayBook", commons_db.montaSetQuery(doc.getString("_id")),mongo);
                mongo.close();
                BasicDBObject result = new BasicDBObject();
                result.put("start",docObj.get("start"));
                result.put("end",docObj.get("end"));
                result.put("id",docObj.get("id"));
                result.put("resource",docObj.get("recource"));
                result.put("text",docObj.get("text"));
                result.put("invite",docObj.get("invite"));
                result.put("resizeDisabled ","false");
                result.put("moveVDisabled ","false");
                result.put("moveHDisabled ","false");
                result.put("deleteDisabled ","false");
                result.put("studentId ",docObj.get("studentId "));
                result.put("barHidden ","true");
                result.put("backColor ",montabackColor(docObj));
                result.put("allocate ",docObj.get("allocate "));
                resultListDorm.add(result);
            }
        }


        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("city", city );
        setConditionStart = new BasicDBObject();
        setConditionStart.put("$gte", start);
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.unavailables.start", setConditionStart);
        setQuery.put("documento.unavailables.end", setConditionEnd);
        response = commons_db.listaCrud("familyDorm", null, null, userId, setQuery, null, false);

        ArrayList<BasicDBObject> resultListEventI = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventII = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventIII = new ArrayList<BasicDBObject>();
        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                MongoClient mongo = new MongoClient();
                docObj = commons_db.triggerDinamicData(doc, "familyDorm", commons_db.montaSetQuery(doc.getString("_id")),mongo);
                mongo.close();
                ArrayList  unavailables = new ArrayList();
                unavailables = (ArrayList) docObj.get("unavailables");
                if (unavailables != null) {
                    for (int j = 0; j < unavailables.size(); i++) {
                        BasicDBObject unavailable = new BasicDBObject();
                        unavailable.putAll((Map) unavailables.get(j));
                        BasicDBObject result = new BasicDBObject();
                        result.put("start",unavailable.get("start"));
                        result.put("end",unavailable.get("end"));
                        result.put("id","Unavailable");
                        result.put("text",docObj.get("roomNumber"));
                        result.put("resizeDisabled ","true");
                        result.put("moveVDisabled ","true");
                        result.put("moveHDisabled ","true");
                        result.put("deleteDisabled ","true");
                        result.put("backColor ","#8e8e8e");
                        result.put("fontColor","#ffffff");
                        resultListEventI.add(result);
                    }
                    if (commons.comparaData(docObj.getString("contractIssue"), start)){
                        BasicDBObject result = new BasicDBObject();
                        result.put("start",start + "T00:00:00");
                        result.put("end",docObj.getString("contractIssue") + "T00:00:00");
                        result.put("id",docObj.get("id"));
                        result.put("resource",docObj.get("id"));
                        result.put("text","Out of contract");
                        result.put("resizeDisabled ","true");
                        result.put("moveVDisabled ","true");
                        result.put("moveHDisabled ","true");
                        result.put("deleteDisabled ","true");
                        result.put("backColor ","#8e8e8e");
                        result.put("fontColor","#ffffff");
                        resultListEventII.add(result);
                    }
                    if (commons.comparaData(commons.calcNewDate(docObj.getString("contractIssue"),730), end)){
                        BasicDBObject result = new BasicDBObject();
                        result.put("start",commons.calcNewDate(docObj.getString("contractIssue"),730) + "T00:00:00");
                        result.put("end",commons.calcNewDate(docObj.getString("contractIssue"),commons.difDate(end, start)) + "T00:00:00");
                        result.put("id",docObj.get("id"));
                        result.put("resource",docObj.get("id"));
                        result.put("text","Out of contract");
                        result.put("resizeDisabled ","true");
                        result.put("moveVDisabled ","true");
                        result.put("moveHDisabled ","true");
                        result.put("deleteDisabled ","true");
                        result.put("backColor ","#8e8e8e");
                        result.put("fontColor","#ffffff");
                        resultListEventIII.add(result);
                    }
                }
            }
        }

        BasicDBObject result = new BasicDBObject();
        result.put("listDorms", resultListDorm);
        result.put("listBook", resultListBook);
        result.put("listEventI", resultListEventI);
        result.put("listEventII", resultListEventII);
        result.put("listEventIII", resultListEventIII);
		return null;

	
	}

    private String montabackColor(BasicDBObject docObj) {
	    String backColor = "#ff8b2c";;

        if(docObj.getString("occTrip").equals("twin")){
            backColor = "#ff8b2c";
        }else{
            if(docObj.getString("gender").equals("Male")){
                if(docObj.getString("occTrip").equals("shared")){
                    backColor = "#D5E6F9";
                }else{
                    backColor = "#D5F9D5";
                }
            }else{
                if(docObj.getString("occTrip").equals("shared")){
                    backColor =  "#ffc0c0";
                }else{
                    backColor =  "#f00";
                }
            }
        }
        if(docObj.getString("invite").equals("pendent")){
            backColor = "#c6a2ff";
        }
        if(docObj.getString("invite").equals("pendent")){
            backColor = "#eeeeee";
        }

        return backColor;

    }

}
