package com.casamundo.bean;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import com.mongodb.BasicDBObject;

import java.net.UnknownHostException;

public class Table {


    Commons_DB commons_db = new Commons_DB();
    Commons commons = new Commons();

    public BasicDBObject obterTable() throws UnknownHostException {

        BasicDBObject table = commons_db.obterCrudDoc("table", "", "onlyOneRegister");

        BasicDBObject result = new BasicDBObject();
        result.put("_id", table.get("_id"));
        result.put("documento", table);
        return result;
    }

}
