package com.casamundo.dao;

import com.casamundo.commons.Commons;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;
import org.bson.BasicBSONObject;
import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class Commons_DB {

    Commons commons = new Commons();

    @SuppressWarnings({"rawtypes"})
    public ResponseEntity obterCrud(String collectionName, String key, String value) throws UnknownHostException, MongoException {
        Mongo mongo;
        mongo = new Mongo();
        DB db = (DB) mongo.getDB("documento");
        DBCollection collection = db.getCollection(collectionName);
        BasicDBObject setQuery = new BasicDBObject();

        if (value != null) {
            if (key.equals("_id")) {
                ObjectId idObj = new ObjectId(value);
                setQuery = new BasicDBObject(key, idObj);
            } else {
                setQuery = new BasicDBObject(key, value);
            };
            DBObject cursor = collection.findOne(setQuery);
            if (cursor != null) {
                BasicDBObject documento = new BasicDBObject();
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) cursor.get("documento"));
                String id = ((BasicBSONObject) cursor).getString("_id");
                documento.put("documento", doc);
                documento.put("_id", id);
                mongo.close();
                return ResponseEntity.ok().body(documento);
            } else {
                mongo.close();
                return ResponseEntity.badRequest().build();
            }
        } else {
            mongo.close();
            return ResponseEntity.badRequest().build();
        }
    };

    @SuppressWarnings({})
    public ResponseEntity obterId(String collectionName) throws UnknownHostException, MongoException {
        Mongo mongo;
        mongo = new Mongo();
        DB db = (DB) mongo.getDB("documento");
        DBCollection collection = db.getCollection(collectionName);

        if (collection != null) {
            int id = collection.find().count();
            id = id++;
            String idS = '"' + Integer.toString(id) + '"';
            mongo.close();
            return ResponseEntity.ok().body(idS);
        } else {
            mongo.close();
            return ResponseEntity.badRequest().build();
        }
    };

    @SuppressWarnings({"rawtypes"})
    public BasicDBObject obterCrudDoc(String collectionName, String key, String value) throws UnknownHostException, MongoException {
        Mongo mongo;
        mongo = new Mongo();
        DB db = (DB) mongo.getDB("documento");
        DBCollection collection = db.getCollection(collectionName);
        BasicDBObject setQuery = new BasicDBObject();
        if (key.equals("_id")) {
            ObjectId idObj = new ObjectId(value);
            setQuery = new BasicDBObject(key, idObj);
        } else {
            if (value.equals("onlyOneRegister")) {
                DBObject cursor = collection.findOne(setQuery);
                if (cursor != null) {
                    BasicDBObject documento = new BasicDBObject();
                    documento.putAll((Map) cursor.get("documento"));
                    String id = ((BasicBSONObject) cursor).getString("_id");
                    documento.put("_id", id);
                    mongo.close();
                    return documento;
                }
            } else {
                setQuery = new BasicDBObject(key, value);
            }
        };
        DBObject cursor = collection.findOne(setQuery);
        if (cursor != null) {
            BasicDBObject documento = new BasicDBObject();
            documento.putAll((Map) cursor.get("documento"));
            String id = ((BasicBSONObject) cursor).getString("_id");
            documento.put("_id", id);
            mongo.close();
            return documento;
        }
        mongo.close();
        return null;
    };

    @SuppressWarnings("rawtypes")
    public ResponseEntity incluirCrud(String collectionName, BasicDBObject doc) throws UnknownHostException, MongoException {
        Mongo mongo;
        mongo = new Mongo();
        DB db = (DB) mongo.getDB("documento");
        DBCollection collection = db.getCollection(collectionName);

        int id = collection.find().count();

        BasicDBObject documento = new BasicDBObject();
        documento.putAll((Map) doc);
        documento.put("id", Integer.toString(id++));
        BasicDBObject documentoFinal = new BasicDBObject();
        documentoFinal.put("documento", documento);
        documentoFinal.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));
        DBObject insert = new BasicDBObject(documentoFinal);
        collection.insert(insert);
        documentoFinal.put("_id", insert.get("_id").toString());
        mongo.close();
        return ResponseEntity.ok().body(insert.get("_id").toString());
    }

    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity atualizarCrud(String collectionName, Object updateInput, String key, String valueInp) throws UnknownHostException, MongoException {
        Mongo mongo;
        mongo = new Mongo();
        DB db = (DB) mongo.getDB("documento");
        DBCollection collection = db.getCollection(collectionName);

        BasicDBObject objDocumento = new BasicDBObject();
        ResponseEntity response = obterCrud(collectionName, key, valueInp);
        if ((response.getStatusCode() == HttpStatus.OK)) {
            BasicDBObject cursor = new BasicDBObject();
            cursor.putAll((Map) response.getBody());
            if (cursor != null) {
                objDocumento.putAll((Map) cursor.get("documento"));
            } else {
                mongo.close();
                return ResponseEntity.ok().body("false");
            }
        } else {
            mongo.close();
            return ResponseEntity.ok().body("false");
        }

        if (objDocumento != null) {
            String companyId = (String) objDocumento.get("companyId");
            List arrayUpdate = (List) updateInput;
            for (int i = 0; i < arrayUpdate.size(); i++) {
                BasicDBObject setUpdate = new BasicDBObject();
                setUpdate.putAll((Map) arrayUpdate.get(i));
                Object value = setUpdate.get("value");
                if (value instanceof String) {
                    String docUpdate = setUpdate.get("value").toString();
                    objDocumento.remove(setUpdate.get("field"));
                    objDocumento.put((String) setUpdate.get("field"), docUpdate);
                } else {
                    if (value instanceof ArrayList) {
                        ArrayList docUpdate = (ArrayList) setUpdate.get("value");
                        objDocumento.remove(setUpdate.get("field"));
                        JSONArray arrayField = new JSONArray();
                        for (int j = 0; j < docUpdate.size(); j++) {
                            if (docUpdate.get(j) instanceof String) {
                                arrayField.add(docUpdate.get(j));
                            } else {
                                BasicDBObject docUpdateItem = new BasicDBObject();
                                docUpdateItem.putAll((Map) docUpdate.get(j));
                                arrayField.add(docUpdateItem);
                            };
                        };
                        objDocumento.put((String) setUpdate.get("field"), arrayField);
                    } else {
                        BasicDBObject docUpdate = new BasicDBObject();
                        docUpdate.putAll((Map) setUpdate.get("value"));
                        if (setUpdate.get("field").equals("documento")) {
                            objDocumento.clear();
                            objDocumento.putAll((Map) docUpdate);
                        } else {
                            objDocumento.remove(setUpdate.get("field"));
                            objDocumento.put((String) setUpdate.get("field"), docUpdate);
                        };
                    };
                };
            };
            BasicDBObject doc = new BasicDBObject();

            objDocumento.put("companyId", companyId);
            doc.put("documento", objDocumento);
            doc.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));
            BasicDBObject setQuery = new BasicDBObject();
            if (key.equals("_id")) {
                ObjectId idObj = new ObjectId(valueInp);
                setQuery = new BasicDBObject(key, idObj);
            } else {
                setQuery = new BasicDBObject(key, valueInp);
            };

            DBObject update = new BasicDBObject(doc);
            collection.findAndModify(setQuery, null, null, false, update, true, false);
        };
        mongo.close();
        return ResponseEntity.ok().body("true");
    };

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity listaCrud(String collectionName, String key, String value, String userId, BasicDBObject setQueryInput, BasicDBObject setSortInput, Boolean onlyPrivate) throws UnknownHostException, MongoException {
        Mongo mongo;
        mongo = new Mongo();
        DB db = (DB) mongo.getDB("documento");
        DBCollection collection = db.getCollection(collectionName);
        BasicDBObject setQuery = new BasicDBObject();
        if (key != null) {
            setQuery.put(key, value);
        }

        if (setQueryInput != null) {
            setQuery = setQueryInput;
        }
        BasicDBObject setSort = new BasicDBObject();
        setSort.put("lastChange", -1);

        if (setSortInput != null) {
            setSort = setSortInput;
        }

        BasicDBObject setup = obterCrudDoc("setup", "documento.setupKey", collectionName);

        BasicDBObject user = new BasicDBObject();
        if (setup != null && !onlyPrivate) {
            if (userId == null) {
                mongo.close();
                return null;
            }
            user = obterCrudDoc("usuarios", "_id", userId);
            if (user == null) {
                mongo.close();
                return null;
            }
            if (user.get("company") == null) {
                mongo.close();
                return null;
            }
            if (user.get("city") == null) {
                mongo.close();
                return null;
            }
        };

        BasicDBObject setupValue = new BasicDBObject();
        String companyTable = null;
        String cityTable = null;

        if (setup != null) {
            setupValue = (BasicDBObject) setup.get("setupValue");
            companyTable = (String) setupValue.get("company");
            cityTable = (String) setupValue.get("city");
        }

        if (companyTable != null) {
            setQuery.put("documento." + companyTable, user.get("company"));
        }

        DBCursor cursor = collection.find(setQuery).sort(setSort);
        if (cursor != null) {
            JSONArray documentos = new JSONArray();
            ArrayList cityUser = (ArrayList) user.get("city");
            while (((Iterator<DBObject>) cursor).hasNext()) {
                BasicDBObject obj = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
                BasicDBObject docObj = (BasicDBObject) obj.get("documento");
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) obj);
                doc.put("_id", obj.get("_id").toString());
                if (cityTable != null) {
                    Object object = docObj.get(cityTable);
                    if (object != null) {
                        if (object instanceof String) {
                            if (commons.testaElementoArray(object.toString(), cityUser)) {
                                documentos.add(doc);
                            }
                        } else {
                            if (object instanceof ArrayList) {
                                ArrayList cityDoc = (ArrayList) docObj.get(cityTable);
                                if (commons.testaArray(cityUser, cityDoc)) {
                                    documentos.add(doc);
                                }
                            } else {
                                documentos.add(doc);
                            };
                        };
                    }
                } else {
                    documentos.add(doc);
                };
            };
            mongo.close();
            return ResponseEntity.ok().body(documentos);
        } else {
            mongo.close();
            return ResponseEntity.badRequest().build();
        }
    };

    @SuppressWarnings({})
    public ResponseEntity removerCrud(String collectionName, String key, String value, BasicDBObject setQueryInput) throws UnknownHostException, MongoException {
        Mongo mongo;
        mongo = new Mongo();
        DB db = (DB) mongo.getDB("documento");
        DBCollection collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put(key, value);

        if (setQueryInput != null) {
            setQuery = setQueryInput;
        }
        collection.remove(setQuery);

        mongo.close();

        return ResponseEntity.ok().body("true");
    };

    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity arrayCrud(String collectionName, String key, String value, String type, String field, String indexInp, Object item) throws UnknownHostException, MongoException {
        Mongo mongo;
        mongo = new Mongo();
        DB db = (DB) mongo.getDB("documento");
        DBCollection collection = db.getCollection(collectionName);

        BasicDBObject objDocumento = new BasicDBObject();

        if ((type.equals("update") || type.equals("in")) && item.equals(null)) {
            mongo.close();
            return ResponseEntity.ok().body("false");
        }
        if ((type.equals("update") || type.equals("out")) && indexInp.equals(null)) {
            mongo.close();
            return ResponseEntity.ok().body("false");
        }
        ResponseEntity response = obterCrud(collectionName, key, value);
        if ((response.getStatusCode() == HttpStatus.OK)) {
            BasicDBObject cursor = new BasicDBObject();
            cursor.putAll((Map) response.getBody());
            if (cursor != null) {
                objDocumento.putAll((Map) cursor.get("documento"));
            } else {
                mongo.close();
                return ResponseEntity.ok().body("false");
            }
        } else {
            mongo.close();
            return ResponseEntity.ok().body("false");
        }

        int index = 0;
        if (!indexInp.equals(null)) {
            index = Integer.parseInt(indexInp);
        };
        if (objDocumento != null) {
            if (objDocumento.get(field) instanceof ArrayList) {
                ArrayList docUpdate = (ArrayList) objDocumento.get(field);
                if (!indexInp.equals(null)) {
                    if (index > docUpdate.size()) {
                        mongo.close();
                        return ResponseEntity.ok().body("false");
                    }
                }
                objDocumento.remove(field);
                JSONArray arrayField = new JSONArray();
                for (int j = 0; j < docUpdate.size(); j++) {
                    if (docUpdate.get(j) instanceof String) {
                        if (type.equals("update") && index == j) {
                            arrayField.add(item);
                        } else {
                            if (type.equals("out") && index == j) {
                            } else {
                                arrayField.add(docUpdate.get(j));
                            }
                        }
                    } else {
                        BasicDBObject docUpdateItem = new BasicDBObject();
                        docUpdateItem.putAll((Map) docUpdate.get(j));
                        if (type.equals("update") && index == j) {
                            arrayField.add(item);
                        } else {
                            if (type.equals("out") && index == j) {
                            } else {
                                arrayField.add(docUpdateItem);
                            }
                        }
                    };
                };
                if (type.equals("in")) {
                    arrayField.add(item);
                }
                objDocumento.put(field, arrayField);
                BasicDBObject doc = new BasicDBObject();
                doc.put("documento", objDocumento);
                doc.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));
                BasicDBObject setQuery = new BasicDBObject();
                if (key.equals("_id")) {
                    ObjectId idObj = new ObjectId(value);
                    setQuery = new BasicDBObject(key, idObj);
                } else {
                    setQuery = new BasicDBObject(key, value);
                };

                DBObject update = new BasicDBObject(doc);
                collection.findAndModify(setQuery, null, null, false, update, true, false);
            };
        };
        mongo.close();
        return ResponseEntity.ok().body("true");
    };

    public String getNumber(String nameNumber, String nameYear) throws UnknownHostException, MongoException {

        BasicDBObject obj = obterCrudDoc("setup", "documento.setupKey", nameNumber);
        int number = 1;
        if (obj != null) {
            String oldNumber = obj.getString("setupValue");
            number = ((Integer.parseInt(oldNumber) + 1));
        };
        String year = "2017";
        obj = obterCrudDoc("setup", "documento.setupKey", nameYear);
        if (obj != null) {
            year = obj.getString("setupValue");
        };
        ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
        BasicDBObject update = new BasicDBObject();
        update.put("field", "setupValue");
        update.put("value", Integer.toString(number));
        arrayUpdate.add(update);
        atualizarCrud("setup", arrayUpdate, "documento.setupKey", nameNumber);
        String result = Integer.toString(number) + "/" + year;
        return result;

    };

};

