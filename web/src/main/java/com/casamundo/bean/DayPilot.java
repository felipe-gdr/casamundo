package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Map;

public class DayPilot {

    Commons commons = new Commons();
    Commons_DB commons_db = new Commons_DB();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public BasicDBObject montaHomeStay(String companyId, String userId, String start, String end, String city, String filtroIdI, String filtroIdII, MongoClient mongo) throws UnknownHostException {

        ArrayList<BasicDBObject> resultListBook = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventI = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventII = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventIII = new ArrayList<BasicDBObject>();

        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );

        setQuery = montaFiltroHomeStay(filtroIdI, filtroIdII, setQuery);

        ResponseEntity response = commons_db.listaCrudQuery("familyDorm", null, null, userId, setQuery, null, false, mongo);

        ArrayList<Object> arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                docObj = commons_db.triggerDinamicData(doc, "familyDorm", commons_db.montaSetQuery(doc.getString("_id")),mongo);
            }
        }
        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.city", city );

        setQuery = montaFiltroHomeStay(filtroIdI, filtroIdII, setQuery);

        BasicDBObject setSort = new BasicDBObject();
        setSort.put("documento.familyName", 1);
        setSort.put("documento.roomNumber", -1);
        setSort.put("documento.bedNumber", -1);
        response = commons_db.listaCrudQuery("familyDorm", null, null, userId, setQuery, setSort, false, mongo);

        ArrayList<BasicDBObject> resultListDorm = new ArrayList<BasicDBObject>();
        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                BasicDBObject result = new BasicDBObject();
                ArrayList<Object> contracts = (ArrayList<Object>) docObj.get("contracts");
                BasicDBObject outOffContractsDoc = new BasicDBObject();
                ArrayList<Object> outOffContracts = new ArrayList<>();
                if (contracts != null) {
                    outOffContractsDoc = getOutOffContract(start, end, contracts);
                    outOffContracts = (ArrayList<Object>) outOffContractsDoc.get("outOffContracts");
                    for (int j = 0; j < outOffContracts.size(); j++) {
                        BasicDBObject outOffContract = new BasicDBObject();
                        outOffContract.putAll((Map) outOffContracts.get(j));
                        resultListEventII = montaEventSuit(resultListEventII, docObj, outOffContract.getString("start"), outOffContract.getString("end"), "Out of contract", "O");
                    }
                    result.put("dorm",docObj.getString("bedNumber"));
                    result.put("room",docObj.getString("roomNumber"));
                    result.put("fName",docObj.getString("familyName"));
                    result.put("id",docObj.getString("id"));
                    result.put("name","<a href=\"#\" data-toggle=\"modal\" data-target=\"#famHist\" data-item=\"" + docObj.get("familyId") + "\">" + docObj.get("familyName") + "</a>");
                    result.put("_id",docObj.getString("familyId"));
                    result.put("familyName",docObj.getString("familyName"));
                    ArrayList columns = new ArrayList();
                    BasicDBObject column = new BasicDBObject();
                    column.put("html",docObj.getString("roomNumber"));
                    columns.add(column);
                    column = new BasicDBObject();
                    column.put("html",docObj.getString("bedNumber"));
                    columns.add(column);
                    result.put("columns",columns);
                    resultListDorm.add(result);
                }
                ArrayList<Object> ouOffContracts = (ArrayList<Object>) docObj.get("outOfContracts");
                for (int j = 0; j < ouOffContracts.size(); j++) {
                    BasicDBObject outOffContract = new BasicDBObject();
                    outOffContract.putAll((Map) ouOffContracts.get(j));
                    resultListEventII = montaEventSuit(resultListEventII, docObj, outOffContract.getString("start"), outOffContract.getString("end"), "Out of contract", "O");
                }
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        BasicDBObject setConditionStart = new BasicDBObject();
        setConditionStart.put("$gte", start + "T12:00:00");
        BasicDBObject setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.start", setConditionStart);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("homestayBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                docObj = commons_db.triggerDinamicData(doc, "homestayBook", commons_db.montaSetQuery(doc.getString("_id")),mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionStart = new BasicDBObject();
        setConditionStart.put("$gte", start + "T12:00:00");
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.start", setConditionStart);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("homestayBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookHomeStay(resultListDorm, resultListBook,docObj,mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", start);
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("homestayBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookHomeStay(resultListDorm, resultListBook,docObj,mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", start);
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.start", setConditionEnd);

        response = commons_db.listaCrudQuery("homestayBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookHomeStay(resultListDorm, resultListBook,docObj,mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionStart = new BasicDBObject();
        setConditionStart.put("$lte", start + "T12:00:00");
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", end);
        setQuery.put("documento.start", setConditionStart);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("homestayBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookHomeStay(resultListDorm, resultListBook,docObj,mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionStart = new BasicDBObject();
        setConditionStart.put("$gte", start + "T12:00:00");
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.unavailables.start", setConditionStart);
        setQuery.put("documento.unavailables.end", setConditionEnd);

        setQuery = montaFiltroHomeStay(filtroIdI, filtroIdII, setQuery);

        response = commons_db.listaCrudQuery("familyDorm", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                ArrayList  unavailables = new ArrayList();
                unavailables = (ArrayList) docObj.get("unavailables");
                if (unavailables != null) {
                    for (int j = 0; j < unavailables.size(); j++) {
                        BasicDBObject unavailable = new BasicDBObject();
                        unavailable.putAll((Map) unavailables.get(j));
                        Boolean existeId = false;
                        for (BasicDBObject listDorm: resultListDorm){
                            if (listDorm.get("id").equals(unavailable.get("id"))){
                                existeId = true;
                                break;
                            }
                        }
                        if (existeId) {
                            BasicDBObject result = new BasicDBObject();
                            result.put("resource", docObj.get("id"));
                            result.put("start", unavailable.get("start"));
                            result.put("end", unavailable.get("end"));
                            result.put("id", unavailable.get("id"));
                            result.put("text", "Unavailable");
                            result.put("resizeDisabled", true);
                            result.put("moveDisabled", true);
                            result.put("deleteDisabled", true);
                            result.put("barHidden", true);
                            result.put("backColor", "#8e8e8e");
                            result.put("fontColor", "#ffffff");
                            resultListEventI.add(result);
                        }
                    }
                }
            }
        }

        BasicDBObject result = new BasicDBObject();
        result.put("resources", resultListDorm);

        ArrayList<BasicDBObject> finalResult = resultListBook;
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventI);
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventII);
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventIII);
        result.put("events", finalResult);
        return result;
	}

    private BasicDBObject getOutOffContract(String start, String end, ArrayList<Object> contracts) {
	    ArrayList<BasicDBObject> resultArray = new ArrayList<>();
        String startCompare = start;
        String endCompare = end;

        BasicDBObject contractStart = new BasicDBObject();
        if (contracts.size() > 0) {
            contractStart.putAll((Map) contracts.get(0));
        };
        BasicDBObject contractEnd = new BasicDBObject();
        if (contracts.size() > 1) {
            contractEnd.putAll((Map) contracts.get(contracts.size() - 1));
        }else {
            if (contracts.size() > 0) {
                contractEnd.putAll((Map) contracts.get(0));
            }
        }
        if (contracts.size() == 1) {
            if (contractStart.get("start") != null && contractStart.get("end") != null) {
                if (commons.comparaData(startCompare, contractStart.getString("end")) || commons.comparaData(contractStart.getString("start"), endCompare)) {
                    BasicDBObject outOffContract = new BasicDBObject();
                    outOffContract.put("start", startCompare);
                    outOffContract.put("end", endCompare);
                    resultArray.add(outOffContract);
                    BasicDBObject result = new BasicDBObject();
                    result.put("outOffContracts", resultArray);
                    return result;
                }
            }
        }
        if (contractStart.get("start") != null && contractStart.get("end") != null) {
            if (commons.comparaData(contractStart.getString("start"), startCompare)) {
                BasicDBObject outOffContract = new BasicDBObject();
                outOffContract.put("start", startCompare);
                outOffContract.put("end", contractStart.getString("start"));
                resultArray.add(outOffContract);
            }
        }
        if (contractEnd.get("start") != null && contractEnd.get("end") != null) {
            if (commons.comparaData(endCompare, contractEnd.getString("end"))) {
                BasicDBObject outOffContract = new BasicDBObject();
                outOffContract.put("start", commons.calcNewDate(contractEnd.getString("end"), 1));
                outOffContract.put("end", end);
                resultArray.add(outOffContract);
            }
        }

        BasicDBObject result = new BasicDBObject();
        result.put("outOffContracts", resultArray);
	    return result;
    }

    private Boolean comparaIntervalo(String start, String end, String start1, String end1) {



	    return true;
    }

    private BasicDBObject montaFiltroHomeStay(String filtroIdI, String filtroIdII, BasicDBObject setQuery){

        if (!filtroIdI.equals("") && !filtroIdII.equals("")) {
            BasicDBList or = new BasicDBList();
            DBObject clause = new BasicDBObject("documento.familyId", filtroIdI);
            or.add(clause);
            clause = new BasicDBObject("documento.familyId", filtroIdII);
            or.add(clause);
            setQuery.put("$or", or);
        }else{
            if (!filtroIdI.equals("")) {
                setQuery.put("documento.familyId", filtroIdI );
            }
        }
        return  setQuery;

    }
    private ArrayList<BasicDBObject> montaBookHomeStay(ArrayList<BasicDBObject> resultListDorm, ArrayList<BasicDBObject> resultListBook, BasicDBObject docObj, MongoClient mongo) throws UnknownHostException {
//
//	    Boolean existeId = false;
//        for (BasicDBObject listDorm: resultListDorm){
//            if (listDorm.get("id").equals(docObj.get("resource"))){
//                existeId = true;
//                break;
//            }
//        }
//        if (!existeId){
//            return resultListBook;
//        }
	    BasicDBObject travel = new BasicDBObject();
        BasicDBObject accomodation = new BasicDBObject();
        if (docObj.get("studentId") != null) {
            travel = commons_db.obterCrudDocQuery("travel", "_id", docObj.getString("studentId"), mongo);
            if (travel != null){
                accomodation.putAll((Map) travel.get("accomodation"));
            }
        }
        BasicDBObject result = new BasicDBObject();
        result.put("start",docObj.get("start"));
        result.put("end",docObj.get("end"));
        result.put("id",docObj.get("id"));
        result.put("resource",docObj.get("resource"));
        result.put("text",docObj.get("text"));
        result.put("invite",docObj.get("invite"));
        result.put("resizeDisabled",false);
        result.put("moveVDisabled",false);
        result.put("moveHDisabled",false);
        result.put("deleteDisabled",false);
        result.put("studentId",docObj.get("studentId"));
        result.put("barHidden",true);
        result.put("backColor",montabackColor(docObj));
        result.put("studentIdTravel",docObj.get("studentIdTravel"));
        if (accomodation != null){
            result.put("checkIn",accomodation.get("checkIn"));
            result.put("checkOut",accomodation.get("checkOut"));
        }
        result.put("studentIdTravel",docObj.get("studentIdTravel"));
        if (docObj.get("allocate") != null) {
            result.put("allocate", docObj.get("allocate"));
        }else{
            result.put("allocate", "");
        }
        if (docObj.get("invite") != null) {
            result.put("invite", docObj.get("invite"));
        }else{
            result.put("invite", "");
        }
        if (!commons.testaElementoArrayObject(result,resultListBook)) {
            resultListBook.add(result);
        }
        return  resultListBook;
    }

    public BasicDBObject montaShared(String companyId, String userId, String start, String end, String city, String filtroIdI, String filtroIdII, String filtroIdIII, String filtroIdIV, MongoClient mongo) throws UnknownHostException {

        ArrayList<BasicDBObject> resultListBook = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventI = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventII = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventIII = new ArrayList<BasicDBObject>();

        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );

        setQuery = montafiltroShared(filtroIdI, filtroIdII, filtroIdIII, filtroIdIV, setQuery);

        ResponseEntity response = commons_db.listaCrudQuery("dorm", null, null, userId, setQuery, null, false, mongo);

        ArrayList<Object> arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                docObj = commons_db.triggerDinamicData(doc, "dorm", commons_db.montaSetQuery(doc.getString("_id")),mongo);
            }
        }

        response = commons_db.listaCrudQuery("sharedBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                docObj = commons_db.triggerDinamicData(doc, "sharedBook", commons_db.montaSetQuery(doc.getString("_id")),mongo);
            }
        }

        response = commons_db.listaCrudQuery("unSharedBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                docObj = commons_db.triggerDinamicData(doc, "unSharedBook", commons_db.montaSetQuery(doc.getString("_id")),mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.city", city );

        setQuery = montafiltroShared(filtroIdI, filtroIdII, filtroIdIII, filtroIdIV, setQuery);

        BasicDBObject setSort = new BasicDBObject();
        setSort.put("documento.buildName", 1);
        setSort.put("documento.unit", 1);
        setSort.put("documento.roomNumber", 1);
        setSort.put("documento.bedNumber", 1);

        response = commons_db.listaCrudQuery("dorm", null, null, userId, setQuery, setSort, false, mongo);

        ArrayList<BasicDBObject> resultListDorm = new ArrayList<BasicDBObject>();
        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                BasicDBObject result = new BasicDBObject();
                ArrayList<Object> contracts = (ArrayList<Object>) docObj.get("contracts");
                BasicDBObject outOffContractsDoc = new BasicDBObject();
                ArrayList<Object> outOffContracts = new ArrayList<>();
                if (contracts != null) {
                    outOffContractsDoc = getOutOffContract(start, end, contracts);
                    outOffContracts = (ArrayList<Object>) outOffContractsDoc.get("outOffContracts");
                    for (int j = 0; j < outOffContracts.size(); j++) {
                        BasicDBObject outOffContract = new BasicDBObject();
                        outOffContract.putAll((Map) outOffContracts.get(j));
                        resultListEventII = montaEventSuit(resultListEventII, docObj, outOffContract.getString("start"), outOffContract.getString("end"), "Out of contract", "O");
                    }
                    result.put("id", docObj.getString("id"));
                    result.put("buildName", docObj.getString("buildName"));
                    result.put("unit", docObj.getString("unit"));
                    result.put("room", docObj.getString("roomNumber"));
                    result.put("dorm", docObj.getString("bedNumber"));
                    result.put("name", docObj.getString("buildName"));
                    result.put("resource", docObj.getString("id"));
                    result.put("resourceType", docObj.getString("bed"));
                    result.put("_id", docObj.get("_id"));
                    result.put("vendorName", docObj.getString("vendorName"));
                    ArrayList columns = new ArrayList();
                    BasicDBObject column = new BasicDBObject();
                    column.put("html", docObj.getString("unit"));
                    columns.add(column);
                    column = new BasicDBObject();
                    column.put("html", docObj.getString("apType"));
                    columns.add(column);
                    column = new BasicDBObject();
                    column.put("html", docObj.getString("roomNumber"));
                    columns.add(column);
                    column = new BasicDBObject();
                    column.put("html", docObj.getString("bedNumber"));
                    columns.add(column);
                    result.put("columns", columns);
                    resultListDorm.add(result);

                    ArrayList suitePeriods = new ArrayList();
                    BasicDBObject apartment = commons_db.obterCrudDocQuery("apartment", "_id", docObj.getString("apartmentId"), mongo);
                    if (apartment.get("suitePeriods") != null) {
                        suitePeriods = (ArrayList) apartment.get("suitePeriods");
                        for (Object suitePeriod : suitePeriods) {
                            BasicDBObject suitePeriodObj = new BasicDBObject();
                            suitePeriodObj.putAll((Map) suitePeriod);
                            resultListEventI = montaEventShared(resultListEventI, docObj, suitePeriodObj.getString("start"), suitePeriodObj.getString("end"), "Suite Period", "P");
                        }
                    }
                }
                BasicDBObject apartment = commons_db.obterCrudDoc("apartment", "_id", docObj.getString("apartmentId"), mongo);
                ArrayList<Object> ouOffContracts = (ArrayList<Object>) apartment.get("outOfContracts");
                for (int j = 0; j < ouOffContracts.size(); j++) {
                    BasicDBObject outOffContract = new BasicDBObject();
                    outOffContract.putAll((Map) ouOffContracts.get(j));
                    resultListEventII = montaEventSuit(resultListEventII, docObj, outOffContract.getString("start"), outOffContract.getString("end"), "Out of contract", "O");
                }
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        BasicDBObject setConditionStart = new BasicDBObject();
        setConditionStart.put("$gte", start + "T12:00:00");
        BasicDBObject setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.start", setConditionStart);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("sharedBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookShared(resultListDorm, resultListBook, docObj, mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", start);
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("sharedBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookShared(resultListDorm, resultListBook, docObj, mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", start);
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.start", setConditionEnd);

        response = commons_db.listaCrudQuery("sharedBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookShared(resultListDorm, resultListBook, docObj, mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionStart = new BasicDBObject();
        setConditionStart.put("$lte", start + "T12:00:00");
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", end);
        setQuery.put("documento.start", setConditionStart);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("sharedBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookShared(resultListDorm, resultListBook, docObj, mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );

        response = commons_db.listaCrudQuery("unSharedBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                Boolean existeId = false;
                for (BasicDBObject listDorm: resultListDorm){
                        if (listDorm.get("id").equals(docObj.get("id"))){
                        existeId = true;
                        break;
                    }
                }
                if (existeId) {
                    BasicDBObject result = new BasicDBObject();
                    result.put("resource", docObj.get("resource"));
                    result.put("resourceType", docObj.get("resourceType"));
                    result.put("start", docObj.get("start"));
                    result.put("end", docObj.get("end"));
                    result.put("id", "u" + docObj.get("id"));
                    result.put("text", "Unavailable");
                    result.put("resizeDisabled", false);
                    result.put("moveDisabled", false);
                    result.put("deleteDisabled", false);
                    result.put("barHidden", true);
                    result.put("backColor", "#8e8e8e");
                    result.put("fontColor", "#ffffff");
                    resultListEventIII.add(result);
                }
            }
        }

        BasicDBObject result = new BasicDBObject();
        result.put("resources", resultListDorm);

        ArrayList<BasicDBObject> finalResult = resultListBook;
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventI);
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventII);
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventIII);
        result.put("events", finalResult);
        return result;
    }

    private BasicDBObject montafiltroShared(String filtroIdI, String filtroIdII, String filtroIdIII, String filtroIdIV, BasicDBObject setQuery){

        BasicDBList or = new BasicDBList();
        DBObject clause = new BasicDBObject();
        if (!filtroIdI.equals("") && filtroIdII.equals("")) {
            clause = new BasicDBObject("documento.buildingId", filtroIdI);
            or.add(clause);
        }
        if (!filtroIdII.equals("")) {
            clause = new BasicDBObject("documento.apartmentId", filtroIdII);
            or.add(clause);
        }
        if (!filtroIdIII.equals("")  && filtroIdIV.equals("")) {
            clause = new BasicDBObject("documento.buildingId", filtroIdIII);
            or.add(clause);
        }
        if (!filtroIdIV.equals("")) {
            clause = new BasicDBObject("documento.apartmentId", filtroIdIV);
            or.add(clause);
        }
        if (or.size() > 0) {
            setQuery.put("$or", or);
        }
        return setQuery;

    }
    private ArrayList<BasicDBObject> montaBookShared(ArrayList<BasicDBObject> resultListDorm, ArrayList<BasicDBObject> resultListBook, BasicDBObject docObj, MongoClient mongo) throws UnknownHostException {
//
//        Boolean existeId = false;
//        for (BasicDBObject listDorm: resultListDorm){
//            if (listDorm.get("id").equals(docObj.get("resource"))){
//                existeId = true;
//                break;
//            }
//        }
//        if (existeId) {
//            return resultListBook;
//        }
        BasicDBObject travel = new BasicDBObject();
        BasicDBObject accomodation = new BasicDBObject();
        if (docObj.get("studentId") != null) {
            travel = commons_db.obterCrudDocQuery("travel", "_id", docObj.getString("studentId"), mongo);
            if (travel != null){
                accomodation.putAll((Map) travel.get("accomodation"));
            }
        }
        BasicDBObject result = new BasicDBObject();
        result.put("start",docObj.get("start"));
        result.put("end",docObj.get("end"));
        result.put("id",docObj.get("id"));
        result.put("resource",docObj.get("resource"));
        result.put("text",docObj.get("text"));
        result.put("invite",docObj.get("invite"));
        result.put("resizeDisabled",false);
        result.put("moveVDisabled",false);
        result.put("moveHDisabled",false);
        result.put("deleteDisabled",false);
        result.put("studentId",docObj.get("studentId"));
        result.put("barHidden",true);
        result.put("backColor",montabackColor(docObj));
        result.put("studentIdTravel",docObj.get("studentIdTravel"));
        if (accomodation != null){
            result.put("checkIn",accomodation.get("checkIn"));
            result.put("checkOut",accomodation.get("checkOut"));
        }
        if (docObj.get("allocate") != null) {
            result.put("allocate", docObj.get("allocate"));
        }else{
            result.put("allocate", "");
        }
        if (docObj.get("invite") != null) {
            result.put("invite", docObj.get("invite"));
        }else{
            result.put("invite", "");
        }
        if (!commons.testaElementoArrayObject(result,resultListBook)) {
            resultListBook.add(result);
        }
        return resultListBook;
    }

    private ArrayList<BasicDBObject> montaEventShared(ArrayList<BasicDBObject> resultListEventII, BasicDBObject docObj, String start, String end, String text, String letter) {

	    BasicDBObject result = new BasicDBObject();
        result.put("resource", docObj.get("id"));
        result.put("start", start);
        result.put("end", end);
        result.put("id", letter + docObj.get("id"));
        result.put("text", text);
        result.put("resizeDisabled", true);
        result.put("moveDisabled", true);
        result.put("deleteDisabled", true);
        result.put("barHidden", true);
        result.put("backColor", "#8e8e8e");
        result.put("fontColor", "#ffffff");
        resultListEventII.add(result);

        return resultListEventII;
    }

    private boolean contratoValido(BasicDBObject docObj, String start, String end) {
	    Boolean result = true;
        if (docObj.get("endDate") != null) {
            if (commons.comparaData(start, docObj.getString("endDate"))) {
                result = false;
            }
        }
        if (docObj.get("startDate") != null) {
            if (commons.comparaData(docObj.getString("startDate"), end)) {
                result = false;
            }
        }
        return result;
    }

    public BasicDBObject montaSuite(String companyId, String userId, String start, String end, String city, String filtroIdI, String filtroIdII, String filtroIdIII, String filtroIdIV, MongoClient mongo) throws UnknownHostException {

        ArrayList<BasicDBObject> resultListBook = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventI = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventII = new ArrayList<BasicDBObject>();
        ArrayList<BasicDBObject> resultListEventIII = new ArrayList<BasicDBObject>();

        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );

        setQuery = montafiltroSuite(filtroIdI, filtroIdII, filtroIdIII, filtroIdIV, setQuery);

        ResponseEntity response = commons_db.listaCrudQuery("apartment", null, null, userId, setQuery, null, false, mongo);

        ArrayList<Object> arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                docObj = commons_db.triggerDinamicData(doc, "apartment", commons_db.montaSetQuery(doc.getString("_id")),mongo);
            }
        }

        response = commons_db.listaCrudQuery("suiteBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                docObj = commons_db.triggerDinamicData(doc, "suiteBook", commons_db.montaSetQuery(doc.getString("_id")),mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.city", city );

        setQuery = montafiltroSuite(filtroIdI, filtroIdII, filtroIdIII, filtroIdIV, setQuery);

        BasicDBObject setSort = new BasicDBObject();
        setSort.put("documento.buildName", 1);
        setSort.put("documento.unit", 1);
        setSort.put("documento.roomNumber", 1);
        setSort.put("documento.bedNumber", 1);
        response = commons_db.listaCrudQuery("apartment", null, null, userId, setQuery, setSort, false, mongo);

        ArrayList<BasicDBObject> resultListDorm = new ArrayList<BasicDBObject>();
        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                BasicDBObject result = new BasicDBObject();
                ArrayList<Object> contracts = (ArrayList<Object>) docObj.get("contracts");
                BasicDBObject outOffContractsDoc = new BasicDBObject();
                ArrayList<Object> outOffContracts = new ArrayList<>();
                if (contracts != null) {
                    outOffContractsDoc = getOutOffContract(start, end, contracts);
                    outOffContracts = (ArrayList<Object>) outOffContractsDoc.get("outOffContracts");
                    for (int j = 0; j < outOffContracts.size(); j++) {
                        BasicDBObject outOffContract = new BasicDBObject();
                        outOffContract.putAll((Map) outOffContracts.get(j));
                        resultListEventII = montaEventSuit(resultListEventII, docObj, outOffContract.getString("start"), outOffContract.getString("end"), "Out of contract", "O");
                    }
                    result.put("id", docObj.getString("id"));
                    result.put("buildName", docObj.getString("buildName"));
                    result.put("name", docObj.getString("buildName"));
                    result.put("unit", docObj.getString("unit"));
                    result.put("resource", docObj.getString("id"));
                    result.put("resourceType", "ap");
                    result.put("_id", doc.get("_id"));
                    result.put("vendorName", docObj.getString("vendorName"));
                    ArrayList columns = new ArrayList();
                    BasicDBObject column = new BasicDBObject();
                    column.put("html", docObj.getString("unit"));
                    columns.add(column);
                    column = new BasicDBObject();
                    column.put("html", docObj.getString("apType"));
                    columns.add(column);
                    result.put("columns", columns);
                    resultListDorm.add(result);

                    ArrayList<BasicDBObject> sharedPeriods = new ArrayList();
                    sharedPeriods = (ArrayList) docObj.get("sharedPeriods");
                    for (Object sharedPeriod : sharedPeriods) {
                        BasicDBObject sharedPeriodObj = new BasicDBObject();
                        sharedPeriodObj.putAll((Map) sharedPeriod);
                        resultListEventI = montaEventSuit(resultListEventI, docObj, sharedPeriodObj.getString("start"), sharedPeriodObj.getString("end"), "Shared Period", "P");
                    }
                }
                ArrayList<Object> ouOffContracts = (ArrayList<Object>) docObj.get("outOfContracts");
                for (int j = 0; j < ouOffContracts.size(); j++) {
                    BasicDBObject outOffContract = new BasicDBObject();
                    outOffContract.putAll((Map) ouOffContracts.get(j));
                    resultListEventII = montaEventSuit(resultListEventII, docObj, outOffContract.getString("start"), outOffContract.getString("end"), "Out of contract", "O");
                }
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        BasicDBObject setConditionStart = new BasicDBObject();
        setConditionStart.put("$gte", start + "T12:00:00");
        BasicDBObject setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.start", setConditionStart);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("suiteBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookSuit(resultListDorm, resultListBook, docObj, mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", start);
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("suiteBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookSuit(resultListDorm, resultListBook, docObj, mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", start);
        setConditionEnd.put("$lte", end);
        setQuery.put("documento.start", setConditionEnd);

        response = commons_db.listaCrudQuery("suiteBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookSuit(resultListDorm, resultListBook, docObj, mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );
        setConditionStart = new BasicDBObject();
        setConditionStart.put("$lte", start + "T12:00:00");
        setConditionEnd = new BasicDBObject();
        setConditionEnd.put("$gte", end);
        setQuery.put("documento.start", setConditionStart);
        setQuery.put("documento.end", setConditionEnd);

        response = commons_db.listaCrudQuery("suiteBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                resultListBook = montaBookShared(resultListDorm, resultListBook, docObj, mongo);
            }
        }

        setQuery = new BasicDBObject();
        setQuery.put("documento.companyId", companyId );
        setQuery.put("documento.ativo", "ativo" );
        setQuery.put("documento.city", city );

        response = commons_db.listaCrudQuery("unSuiteBook", null, null, userId, setQuery, null, false, mongo);

        arrayList = new ArrayList<Object>();
        arrayList = (JSONArray) response.getBody();

        if (arrayList != null) {
            for (int i = 0; i < arrayList.size(); i++) {
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) arrayList.get(i));
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) doc.get("documento"));
                Boolean existeId = false;
                for (BasicDBObject listDorm: resultListDorm){
                    if (listDorm.get("id").equals(docObj.get("id"))){
                        existeId = true;
                        break;
                    }
                }
                if (existeId) {
                    BasicDBObject result = new BasicDBObject();
                    result.put("resource", docObj.get("resource"));
                    result.put("resourceType", docObj.get("resourceType"));
                    result.put("start", docObj.get("start"));
                    result.put("end", docObj.get("end"));
                    result.put("id", "u" + docObj.get("id"));
                    result.put("text", "Unavailable");
                    result.put("resizeDisabled", false);
                    result.put("moveDisabled", false);
                    result.put("deleteDisabled", false);
                    result.put("barHidden", true);
                    result.put("backColor", "#8e8e8e");
                    result.put("fontColor", "#ffffff");
                    resultListEventI.add(result);
                }
            }
        }

        BasicDBObject result = new BasicDBObject();
        result.put("resources", resultListDorm);

        ArrayList<BasicDBObject> finalResult = resultListBook;
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventI);
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventII);
        finalResult = commons.addArrayBasicDBObject(finalResult, resultListEventIII);
        result.put("events", finalResult);
        return result;
    }

    private BasicDBObject montafiltroSuite(String filtroIdI, String filtroIdII, String filtroIdIII, String filtroIdIV, BasicDBObject setQuery){

        BasicDBList or = new BasicDBList();
        DBObject clause = new BasicDBObject();
        if (!filtroIdI.equals("") && filtroIdII.equals("")) {
            clause = new BasicDBObject("documento.buildingId", filtroIdI);
            or.add(clause);
        }
        if (!filtroIdII.equals("")) {
            ObjectId filtroIdIIObj = new ObjectId(filtroIdII);
            clause = new BasicDBObject("_id", filtroIdIIObj);
            or.add(clause);
        }
        if (!filtroIdIII.equals("")  && filtroIdIV.equals("")) {
            clause = new BasicDBObject("documento.buildingId", filtroIdIII);
            or.add(clause);
        }
        if (!filtroIdIV.equals("")) {
            ObjectId filtroIdIVObj = new ObjectId(filtroIdIV);
            clause = new BasicDBObject("_id", filtroIdIVObj);
            or.add(clause);
        }
        if (or.size() > 0) {
            setQuery.put("$or", or);
        }
        return setQuery;

    }

    private ArrayList<BasicDBObject> montaBookSuit(ArrayList<BasicDBObject> resultListDorm, ArrayList<BasicDBObject> resultListBook, BasicDBObject docObj, MongoClient mongo) throws UnknownHostException {
//
//        Boolean existeId = false;
//        for (BasicDBObject listDorm: resultListDorm){
//            if (listDorm.get("id").equals(docObj.get("resource"))){
//                existeId = true;
//                break;
//            }
//        }
//        if (existeId) {
//            return resultListBook;
//        }
        BasicDBObject travel = new BasicDBObject();
        BasicDBObject accomodation = new BasicDBObject();
        if (docObj.get("studentId") != null) {
            travel = commons_db.obterCrudDocQuery("travel", "_id", docObj.getString("studentId"), mongo);
            if (travel != null){
                accomodation.putAll((Map) travel.get("accomodation"));
            }
        }
        BasicDBObject result = new BasicDBObject();
        result.put("start",docObj.get("start"));
        result.put("end",docObj.get("end"));
        result.put("id",docObj.get("id"));
        result.put("resource",docObj.get("resource"));
        result.put("text",docObj.get("text"));
        result.put("invite",docObj.get("invite"));
        result.put("resizeDisabled",false);
        result.put("moveVDisabled",false);
        result.put("moveHDisabled",false);
        result.put("deleteDisabled",false);
        result.put("studentId",docObj.get("studentId"));
        result.put("barHidden",true);
        result.put("backColor",montabackColorSuite(docObj));
        result.put("studentIdTravel",docObj.get("studentIdTravel"));
        if (accomodation != null){
            result.put("checkIn",accomodation.get("checkIn"));
            result.put("checkOut",accomodation.get("checkOut"));
        }
        if (docObj.get("allocate") != null) {
            result.put("allocate", docObj.get("allocate"));
        }else{
            result.put("allocate", "");
        }
        if (docObj.get("invite") != null) {
            result.put("invite", docObj.get("invite"));
        }else{
            result.put("invite", "");
        }
        if (!commons.testaElementoArrayObject(result,resultListBook)) {
            resultListBook.add(result);
        }
        return resultListBook;
    }

    private ArrayList<BasicDBObject> montaEventSuit(ArrayList<BasicDBObject> resultListEvent, BasicDBObject docObj, String start, String end, String text, String letter) {

        BasicDBObject result = new BasicDBObject();
        result.put("resource", docObj.get("id"));
        result.put("start", start);
        result.put("end", end);
        result.put("id", letter + docObj.get("id"));
        result.put("text", text);
        result.put("resizeDisabled", true);
        result.put("moveDisabled", true);
        result.put("deleteDisabled", true);
        result.put("barHidden", true);
        result.put("backColor", "#8e8e8e");
        result.put("fontColor", "#ffffff");
        resultListEvent.add(result);

        return resultListEvent;
    }

    private String montabackColor(BasicDBObject docObj) {

	    String backColor = "#ff8b2c";;

        if(docObj.getString("occHome").equals("twin")){
            backColor = "#ff8b2c";
        }else{
            if (docObj.get("gender") != null) {
                if (docObj.getString("gender").equals("Male")) {
                    if (docObj.getString("occHome").equals("shared")) {
                        backColor = "#D5E6F9";
                    } else {
                        backColor = "#D5F9D5";
                    }
                } else {
                    if (docObj.getString("occHome").equals("shared")) {
                        backColor = "#ffc0c0";
                    } else {
                        backColor = "#f00";
                    }
                }
            }else{
                if (docObj.getString("occHome").equals("shared")) {
                    backColor = "#D5E6F9";
                } else {
                    backColor = "#D5F9D5";
                }
            }
        }
        if(docObj.get("invite") != null) {
            if (docObj.getString("invite").equals("pendent")) {
                backColor = "#c6a2ff";
            }
        }
        if(docObj.get("allocate") != null) {
            if (docObj.getString("allocate").equals("")) {
                backColor = "#eeeeee";
            }
        }

        return backColor;

    }

    private String montabackColorSuite(BasicDBObject docObj) {

        String backColor = "#ffc0c0";;

        if(docObj.getString("gender").equals("Male")){
            backColor = "#D5E6F9";
        }

        return backColor;

    }

    public BasicDBObject resizeCheck(BasicDBObject paramsInput, String collection, MongoClient mongo) throws UnknownHostException {

	    BasicDBObject data = new BasicDBObject();
        if (paramsInput.get("data") != null) {
            data.putAll((Map) paramsInput.get("data"));
        };
        BasicDBObject params = new BasicDBObject();
        if (paramsInput.get("args") != null) {
            params.putAll((Map) paramsInput.get("args"));
        };

        String id = "";
        if (data.get("id") != null) {
            id = data.getString("id");
            BasicDBObject setQuery = new BasicDBObject();
            setQuery.put("documento.companyId", params.getString("companyId"));
            setQuery.put("documento.ativo", "ativo");
            setQuery.put("documento.id", id);
            BasicDBObject setCondition = new BasicDBObject();
            setCondition.put("$gt", params.getString("newStart"));
            setCondition.put("$lt", params.getString("newEnd"));
            setQuery.put("documento.start", setCondition);

            ResponseEntity response = commons_db.listaCrud(collection, null, null, params.getString("userId"), setQuery, null, false, mongo);

            ArrayList arrayList = new ArrayList<Object>();
            arrayList = (JSONArray) response.getBody();

            if (arrayList != null) {
                for (int i = 0; i < arrayList.size(); i++) {
                    BasicDBObject doc = new BasicDBObject();
                    doc.putAll((Map) arrayList.get(i));
                    BasicDBObject docObj = new BasicDBObject();
                    docObj.putAll((Map) doc.get("documento"));
                    if (!docObj.getString("id").equals(id)) {
                        BasicDBObject result = new BasicDBObject();
                        result.put("allow", "false");
                        result.put("reason", "Bed occupied");
                        return result;
                    }
                }
            }
            setQuery = new BasicDBObject();
            setQuery.put("documento.companyId", params.getString("companyId"));
            setQuery.put("documento.ativo", "ativo");
            setQuery.put("documento.id", id);
            setCondition = new BasicDBObject();
            setCondition.put("$gt", params.getString("newStart"));
            setCondition.put("$lt", params.getString("newEnd"));
            setQuery.put("documento.end", setCondition);

            response = commons_db.listaCrud(collection, null, null, params.getString("userId"), setQuery, null, false, mongo);

            arrayList = new ArrayList<Object>();
            arrayList = (JSONArray) response.getBody();

            if (arrayList != null) {
                for (int i = 0; i < arrayList.size(); i++) {
                    BasicDBObject doc = new BasicDBObject();
                    doc.putAll((Map) arrayList.get(i));
                    BasicDBObject docObj = new BasicDBObject();
                    docObj.putAll((Map) doc.get("documento"));
                    if (!docObj.getString("id").equals(id)) {
                        BasicDBObject result = new BasicDBObject();
                        result.put("allow", "false");
                        result.put("reason", "Bed occupied");
                        return result;
                    }
                }
            }
        }
        if (data.get("studentIdTravel") != null){
            String studentIdTravel = data.getString("studentIdTravel");
            BasicDBObject setQuery = new BasicDBObject();
            setQuery.put("documento.companyId", params.getString("companyId"));
            setQuery.put("documento.ativo", "ativo");
            setQuery.put("documento.studentIdTravel", studentIdTravel);
            BasicDBObject setCondition = new BasicDBObject();
            setCondition.put("$gt", params.getString("newStart"));
            setCondition.put("$lt", params.getString("newEnd"));
            setQuery.put("documento.start", setCondition);

            ResponseEntity response = commons_db.listaCrud(collection, null, null, params.getString("userId"), setQuery, null, false, mongo);

            ArrayList arrayList = new ArrayList<Object>();
            arrayList = (JSONArray) response.getBody();

            if (arrayList != null) {
                for (int i = 0; i < arrayList.size(); i++) {
                    BasicDBObject doc = new BasicDBObject();
                    doc.putAll((Map) arrayList.get(i));
                    BasicDBObject docObj = new BasicDBObject();
                    docObj.putAll((Map) doc.get("documento"));
                    if (!docObj.getString("id").equals(id)){
                        BasicDBObject result = new BasicDBObject();
                        result.put("allow", "false");
                        result.put("reason", "Student already allocated in this interval");
                        return result;
                    }
                }
            }
            setQuery = new BasicDBObject();
            setQuery.put("documento.companyId", params.getString("companyId"));
            setQuery.put("documento.ativo", "ativo");
            setQuery.put("documento.studentIdTravel", studentIdTravel);
            setCondition = new BasicDBObject();
            setCondition.put("$lte", params.getString("newStart"));
            setQuery.put("documento.start", setCondition);
            setCondition = new BasicDBObject();
            setCondition.put("$gte", params.getString("newEnd"));
            setQuery.put("documento.end", setCondition);

            response = commons_db.listaCrud(collection, null, null, params.getString("userId"), setQuery, null, false, mongo);

            arrayList = new ArrayList<Object>();
            arrayList = (JSONArray) response.getBody();

            if (arrayList != null) {
                for (int i = 0; i < arrayList.size(); i++) {
                    BasicDBObject doc = new BasicDBObject();
                    doc.putAll((Map) arrayList.get(i));
                    BasicDBObject docObj = new BasicDBObject();
                    docObj.putAll((Map) doc.get("documento"));
                    if (!docObj.getString("id").equals(id)) {
                        BasicDBObject result = new BasicDBObject();
                        result.put("allow", "false");
                        result.put("reason", "Bed occupied");
                        return result;
                    }
                }
            }
            studentIdTravel = data.getString("studentIdTravel");
            setQuery = new BasicDBObject();
            setQuery.put("documento.companyId", params.getString("companyId"));
            setQuery.put("documento.ativo", "ativo");
            setQuery.put("documento.studentIdTravel", studentIdTravel);
            setCondition = new BasicDBObject();
            setCondition.put("$gt", params.getString("newStart"));
            setCondition.put("$lt", params.getString("newEnd"));
            setQuery.put("documento.end", setCondition);

            response = commons_db.listaCrud(collection, null, null, params.getString("userId"), setQuery, null, false, mongo);

            arrayList = new ArrayList<Object>();
            arrayList = (JSONArray) response.getBody();

            if (arrayList != null) {
                for (int i = 0; i < arrayList.size(); i++) {
                    BasicDBObject doc = new BasicDBObject();
                    doc.putAll((Map) arrayList.get(i));
                    BasicDBObject docObj = new BasicDBObject();
                    docObj.putAll((Map) doc.get("documento"));
                    if (!docObj.getString("id").equals(id)){
                        BasicDBObject result = new BasicDBObject();
                        result.put("allow", "false");
                        result.put("reason", "Student already allocated in this interval");
                        return result;
                    }
                }
            }
            if (commons.comparaDataTime(data.getString("checkIn") +  "T00:00:00",params.getString("newStart"))){
                BasicDBObject result = new BasicDBObject();
                result.put("allow", "false");
                result.put("reason", "Date start less then check in date");
                return result;
            }
            if (commons.comparaDataTime(params.getString("newEnd"),commons.calcNewDate(data.getString("checkOut"),1)  + "T00:00:00")){
                BasicDBObject result = new BasicDBObject();
                result.put("allow", "false");
                result.put("reason", "Date end greater then check in date");
                return result;
            }
            BasicDBObject result = new BasicDBObject();
            result.put("allow", "true");
            result.put("reason", "");
            return result;
        }

        BasicDBObject result = new BasicDBObject();
        result.put("allow", "false");
        result.put("reason", "Bad parameters");
        return result;
	}

}
