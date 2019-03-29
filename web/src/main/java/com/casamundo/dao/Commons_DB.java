package com.casamundo.dao;

import com.casamundo.commons.Commons;
import com.mongodb.*;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public class Commons_DB {

    private final Commons commons = new Commons();

    private static final String HOST = System.getProperty("mongodb.host");

    @SuppressWarnings({"rawtypes"})
    public ResponseEntity obterCrud(String collectionName, String key, String value) throws UnknownHostException, MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();

        if (value != null) {
            if (key.equals("_id")) {
                ObjectId idObj = new ObjectId(value);
                setQuery = new BasicDBObject(key, idObj);
            } else {
                setQuery = new BasicDBObject(key, value);
            }

            FindIterable<Document> cursor = collection.find(setQuery);
            if (cursor.first() != null) {
                BasicDBObject documento = new BasicDBObject();
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) cursor.first().get("documento"));
                documento.put("documento", doc);
                documento.put("_id", cursor.first().get("_id").toString());
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
    }

    public ResponseEntity obterId(String collectionName) throws UnknownHostException, MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        if (collection != null) {
            long id = collection.count();
            id = id++;
            String idS = '"' + Long.toString(id) + '"';
            mongo.close();
            return ResponseEntity.ok().body(idS);
        } else {
            mongo.close();
            return ResponseEntity.badRequest().build();
        }
    }

    @SuppressWarnings({"rawtypes"})
    public BasicDBObject obterCrudDoc(String collectionName, String key, String value) throws MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();
        if (key.equals("_id")) {
            ObjectId idObj = new ObjectId(value);
            setQuery = new BasicDBObject(key, idObj);
        } else {
            if (value.equals("onlyOneRegister")) {
                FindIterable<Document> cursor = collection.find(setQuery);
                if (cursor.first() != null) {
                    BasicDBObject documento = new BasicDBObject();
                    documento.putAll((Map) cursor.first().get("documento"));
                    documento.put("_id", cursor.first().get("_id").toString());
                    mongo.close();
                    return documento;
                }
            } else {
                setQuery = new BasicDBObject(key, value);
            }
        }

        FindIterable<Document> cursor = collection.find(setQuery);
        if (cursor.first() != null) {
            BasicDBObject documento = new BasicDBObject();
            documento.putAll((Map) cursor.first().get("documento"));
            documento.put("_id", cursor.first().get("_id").toString());
            mongo.close();
            return documento;
        }
        mongo.close();
        return null;
    }

    @SuppressWarnings({"rawtypes"})
    public BasicDBObject obterCrudDocQuery(String collectionName, String key, String value, MongoClient mongo) throws UnknownHostException, MongoException {
        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
            fechaMongo= true;
        }
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();
        if (key.equals("_id")) {
            ObjectId idObj = new ObjectId(value);
            setQuery = new BasicDBObject(key, idObj);
        } else {
            if (value.equals("onlyOneRegister")) {
                FindIterable<Document> cursor = collection.find(setQuery);
                if (cursor.first() != null) {
                    BasicDBObject documento = new BasicDBObject();
                    documento.putAll((Map) cursor.first().get("documento"));
                    documento.put("_id", cursor.first().get("_id").toString());
                    if (fechaMongo){
                        mongo.close();
                    }
                    return documento;
                }
            } else {
                setQuery = new BasicDBObject(key, value);
            }
        };
        FindIterable<Document> cursor = collection.find(setQuery);
        if (cursor.first() != null) {
            BasicDBObject documento = new BasicDBObject();
            documento.putAll((Map) cursor.first().get("documento"));
            documento.put("_id", cursor.first().get("_id").toString());
            if (fechaMongo){
                mongo.close();
            }
            return documento;
        }
        if (fechaMongo){
            mongo.close();
        }
        return null;
    };

    @SuppressWarnings({"rawtypes"})
    public BasicDBObject obterCrudQuery(String collectionName, String key, String value, MongoClient mongo) throws UnknownHostException, MongoException {
        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
            fechaMongo = true;
        }
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();
        if (key.equals("_id")) {
            ObjectId idObj = new ObjectId(value);
            setQuery = new BasicDBObject("_id", idObj);
        } else {
            setQuery = new BasicDBObject(key, value);
        }


        FindIterable<Document> cursor = collection.find(setQuery);
        if (cursor.first() != null) {
            BasicDBObject documento = new BasicDBObject();
            documento.putAll((Map) cursor.first().get("documento"));
            documento.put("_id", cursor.first().get("_id").toString());
            if (fechaMongo) {
                mongo.close();
            }
            return documento;
        }
        if (fechaMongo) {
            mongo.close();
        }
        return null;
    }

    @SuppressWarnings("rawtypes")
    public ResponseEntity incluirCrud(String collectionName, BasicDBObject doc) throws MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        long id = collection.count();

        BasicDBObject documento = new BasicDBObject();
        documento.putAll((Map) doc);
        documento.put("id", Long.toString(id++));
        BasicDBObject documentoFinal = new BasicDBObject();
        documentoFinal.put("documento", documento);
        documentoFinal.put("lastChange", commons.todaysDate("yyyy-mm-dd-time"));
        Document insert = new Document();
        insert.putAll((Map) documentoFinal);
        collection.insertOne(insert);
        insert.put("_id", insert.get("_id").toString());
        mongo.close();
        return ResponseEntity.ok().body(insert.get("_id").toString());
    }

    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity atualizarCrud(String collectionName, Object updateInput, String key, String valueInp) throws UnknownHostException, MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

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
                            }
                        }

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
                        }
                    }
                }
            }

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
            }
            Document objDocumentoUpdate = new Document();
            objDocumentoUpdate.putAll((Map) doc);
            collection.replaceOne(setQuery, objDocumentoUpdate);
        }
        mongo.close();
        return ResponseEntity.ok().body("true");
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity listaCrud(String collectionName, String key, String value, String userId, BasicDBObject setQueryInput, BasicDBObject setSortInput, Boolean onlyPrivate) throws MongoException {

        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

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
        }

        String companyTable = null;
        String cityTable = null;

        if (setup != null) {
            companyTable = (String) setup.get("company");
            cityTable = (String) setup.get("city");
        }

        if (companyTable != null) {
            setQuery.put("documento." + companyTable, user.get("company"));
        }

        FindIterable<Document> cursor = collection.find(setQuery).sort(setSort);

        JSONArray documentos = new JSONArray();
        if (cursor.first() != null) {
            ArrayList cityUser = (ArrayList) user.get("city");
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.put("documento", docObj);
                doc.put("_id", current.get("_id").toString());
                if (current.get("lastChange") != null) {
                    doc.put("lastChange", current.get("lastChange").toString());
                }
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
                            }
                        }
                    }
                } else {
                    documentos.add(doc);
                }
            }
            mongo.close();
            return ResponseEntity.ok().body(documentos);
        } else {
            mongo.close();
            return ResponseEntity.ok().body(documentos);
        }
    };

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity listaCrudQuery(String collectionName, String key, String value, String userId, BasicDBObject setQueryInput, BasicDBObject setSortInput, Boolean onlyPrivate, MongoClient mongo) throws UnknownHostException, MongoException {

        Boolean fechaMongo = false;
        if (mongo == null){
            mongo = getMongoClient();
            fechaMongo = true;
        }
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

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

        BasicDBObject setup = obterCrudDocQuery("setup", "documento.setupKey", collectionName, mongo);

        BasicDBObject user = new BasicDBObject();
        if (setup != null && !onlyPrivate) {
            if (userId == null) {
                if (fechaMongo) {
                    mongo.close();
                }
                return null;
            }
            user = obterCrudDoc("usuarios", "_id", userId);
            if (user == null) {
                if (fechaMongo) {
                    mongo.close();
                }
                return null;
            }
            if (user.get("company") == null) {
                if (fechaMongo) {
                    mongo.close();
                }
                return null;
            }
            if (user.get("city") == null) {
                if (fechaMongo) {
                    mongo.close();
                }
                return null;
            }
        };

        String companyTable = null;
        String cityTable = null;

        if (setup != null) {
            companyTable = (String) setup.get("company");
            cityTable = (String) setup.get("city");
        }

        if (companyTable != null) {
            setQuery.put("documento." + companyTable, user.get("company"));
        }

        FindIterable<Document> cursor = collection.find(setQuery).sort(setSort);

        JSONArray documentos = new JSONArray();
        if (cursor.first() != null) {
            ArrayList cityUser = (ArrayList) user.get("city");
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.put("documento", docObj);
                doc.put("_id", current.get("_id").toString());
                if (current.get("lastChange") != null) {
                    doc.put("lastChange", current.get("lastChange").toString());
                }
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
            if (fechaMongo) {
                mongo.close();
            }
            return ResponseEntity.ok().body(documentos);
        } else {
            if (fechaMongo) {
                mongo.close();
            }
            return ResponseEntity.ok().body(documentos);
        }
    };

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity listaCrudSkip(String collectionName, String key, String value, String userId, BasicDBObject setQueryInput, BasicDBObject setSortInput, Boolean onlyPrivate, Integer start, Integer length, Map<String, String> params) throws UnknownHostException, MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();
        if (key != null) {
            setQuery.put(key, value);
        }

        if (setQueryInput != null) {
            setQuery = setQueryInput;
        }
        BasicDBObject setSort = new BasicDBObject();

//        if (setSortInput != null) {
//            setSort = setSortInput;
//        }

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
        }

        String companyTable = null;
        String cityTable = null;

        if (setup != null) {
            companyTable = (String) setup.get("company");
            cityTable = (String) setup.get("city");
        }

        if (companyTable != null) {
            setQuery.put("documento." + companyTable, user.get("company"));
        }

        long count = 0;
        FindIterable<Document> cursor = collection.find(setQuery).sort(setSort);
        ArrayList<ArrayList<String>> listas = new ArrayList<>();
        if (cursor.first() != null) {
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) current);
                doc = triggerDinamicData(doc, collectionName, montaSetQuery(doc.getString("_id")), mongo);
                int i = 0;
                while (params.get("columns[" + i + "][data]") != null) {
                    if (listas.size() < (i + 1)) {
                        listas.add(new ArrayList<>());
                    }
                    if (params.get("columns[" + i + "][data]").length() > 9 && !params.get("columns[" + i + "][name]").equals("notPop")) {
                        String a = params.get("columns[" + i + "][data]").substring(10);
                        if (docObj.get(params.get("columns[" + i + "][data]").substring(10)) != null) {
                            if (!commons.testaElementoArray(docObj.getString(params.get("columns[" + i + "][data]").substring(10)), listas.get(i))) {
                                if (!docObj.getString(params.get("columns[" + i + "][data]").substring(10)).equals("")) {
                                    listas.get(i).add(docObj.getString(params.get("columns[" + i + "][data]").substring(10)));
                                }
                            }
                        }
                        if (collectionName.equals("travel")) {
                            BasicDBObject accomodation = new BasicDBObject();
                            if (docObj.get("accomodation") != null) {
                                accomodation.putAll((Map) docObj.get("accomodation"));
                                if (params.get("columns[" + i + "][data]").length() > 23) {
                                    if (accomodation.get(params.get("columns[" + i + "][data]").substring(23)) != null) {
                                        if (!commons.testaElementoArray(accomodation.getString(params.get("columns[" + i + "][data]").substring(23)), listas.get(i))) {
                                            if (!accomodation.getString(params.get("columns[" + i + "][data]").substring(23)).equals("")) {
                                                listas.get(i).add(accomodation.getString(params.get("columns[" + i + "][data]").substring(23)));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    ++i;
                }
                ++count;
            }
        }

        BasicDBList or = new BasicDBList();
        int i = 0;
        Boolean temClause = false;
        while (params.get("columns[" + i + "][data]") != null) {
            if (params.get("columns[" + i + "][searchable]").equals("true")) {
                if (params.get("search[value]") != null) {
                    if (!params.get("search[value]").equals("")) {
                        Pattern regex = Pattern.compile(params.get("search[value]"), Pattern.CASE_INSENSITIVE);
                        DBObject clause = new BasicDBObject(params.get("columns[" + i + "][data]"), regex);
                        or.add(clause);
                        temClause = true;
                    }
                }
                if (params.get("columns[" + i + "][search][value]") != null) {
                    int pos = params.get("columns[" + i + "][search][value]").indexOf("-yadcf_delim-");
                    if (!params.get("columns[" + i + "][search][value]").equals("") && pos < 0) {
                        Pattern regex = Pattern.compile(params.get("columns[" + i + "][search][value]"), Pattern.CASE_INSENSITIVE);
                        setQuery.put(params.get("columns[" + i + "][data]"), regex);
                    } else {
                        if (pos >= 0) {
                            String from = "0";
                            String to = "99999999999999999999999";
                            if (pos > 0) {
                                from = params.get("columns[" + i + "][search][value]").substring(0, pos);
                            }
                            if (pos + 13 < params.get("columns[" + i + "][search][value]").length()) {
                                to = params.get("columns[" + i + "][search][value]").substring(pos + 13);
                            }
                            BasicDBObject setCondition = new BasicDBObject();
                            setCondition.put("$gte", from);
                            setCondition.put("$lte", to);
                            setQuery.put(params.get("columns[" + i + "][data]"), setCondition);
                        }
                    }
                }
            }
            ++i;
        }
        if (temClause) {
            setQuery.put("$or", or);
        }

        if (params.get("order[0][column]") != null) {
            if (params.get("order[0][dir]").equals("asc")) {
                setSort.put(params.get("columns[" + params.get("order[0][column]") + "][data]"), 1);
            } else {
                setSort.put(params.get("columns[" + params.get("order[0][column]") + "][data]"), -1);
            }
        }

        long countFiltered = collection.countDocuments(setQuery);

        cursor = collection.find(setQuery).sort(setSort);
        if (length != -1) {
            cursor.skip(start);
            cursor.limit(length);
        }
        JSONArray documentos = new JSONArray();
        if (cursor.first() != null) {
            ArrayList cityUser = (ArrayList) user.get("city");
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) current);
                doc.put("_id", current.get("_id").toString());
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
                            }
                        }
                    }
                } else {
                    documentos.add(doc);
                }
            }
            mongo.close();
            BasicDBObject result = new BasicDBObject();
            result.put("count", count);
            result.put("countFiltered", countFiltered);
            i = 0;
            for (ArrayList lista : listas) {
                result.put("yadcf_data_" + i, lista);
                ++i;
            }
            result.put("documentos", documentos);
            return ResponseEntity.ok().body(result);
        } else {
            mongo.close();
            BasicDBObject result = new BasicDBObject();
            result.put("count", count);
            result.put("countFiltered", countFiltered);
            i = 0;
            for (ArrayList lista : listas) {
                result.put("yadcf_data_" + i, lista);
                ++i;
            }
            result.put("documentos", documentos);
            return ResponseEntity.ok().body(result);
        }
    }


    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity teste(int start, int length, String collectionName) throws UnknownHostException, MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();

        long count = 0;
        FindIterable<Document> cursor = collection.find(setQuery);
        if (cursor.first() != null) {
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) current);
                doc = triggerDinamicData(doc, collectionName, montaSetQuery(doc.getString("_id")), mongo);
                ++count;
            }
        }

        long countFiltered = collection.countDocuments(setQuery);

        cursor = collection.find(setQuery);
        if (length != -1) {
            cursor.skip(start);
            cursor.limit(length);
        }
        if (cursor.first() != null) {
            JSONArray documentos = new JSONArray();
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) current);
                doc.put("_id", current.get("_id").toString());
                documentos.add(doc);
            }

            mongo.close();
            BasicDBObject result = new BasicDBObject();
            result.put("count", count);
            result.put("countFiltered", countFiltered);
            result.put("documentos", documentos);
            return ResponseEntity.ok().body(result);
        } else {
            mongo.close();
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity removerCrud(String collectionName, String key, String value, BasicDBObject setQueryInput) throws UnknownHostException, MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put(key, value);

        if (setQueryInput != null) {
            setQuery = setQueryInput;
        }
        collection.deleteMany(setQuery);

        mongo.close();

        return ResponseEntity.ok().body("true");
    }


    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity arrayCrud(String collectionName, String key, String value, String type, String field, String indexInp, Object item) throws UnknownHostException, MongoException {
        MongoClient mongo = getMongoClient();
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

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
        }

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
                    }

                }

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
                }

                Document objDocumentoUpdate = new Document();
                objDocumentoUpdate.put("documento", doc);
                collection.replaceOne(setQuery, objDocumentoUpdate);
            }

        }

        mongo.close();
        return ResponseEntity.ok().body("true");
    }


    public String getNumber(String nameNumber, String nameYear) throws UnknownHostException, MongoException {

        BasicDBObject obj = obterCrudDoc("setup", "documento.setupKey", nameNumber);
        int number = 1;
        if (obj != null) {
            String oldNumber = obj.getString("setupValue");
            number = ((Integer.parseInt(oldNumber) + 1));
        }

        String year = "2017";
        obj = obterCrudDoc("setup", "documento.setupKey", nameYear);
        if (obj != null) {
            year = obj.getString("setupValue");
        }

        ArrayList<BasicDBObject> arrayUpdate = new ArrayList<BasicDBObject>();
        BasicDBObject update = new BasicDBObject();
        update.put("field", "setupValue");
        update.put("value", Integer.toString(number));
        arrayUpdate.add(update);
        atualizarCrud("setup", arrayUpdate, "documento.setupKey", nameNumber);
        String result = Integer.toString(number) + "/" + year;
        return result;

    }


    @SuppressWarnings({"unchecked", "rawtypes"})
    public BasicDBObject triggerDinamicData(BasicDBObject doc, String collectionName, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {
        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }
        BasicDBObject result = new BasicDBObject();
        switch (collectionName) {
            case "student":
                result = triggerStudentDinamicData(doc, setQuery, mongo);
                break;
            case "travel":
                result = triggerTravelDinamicData(doc, setQuery, mongo);
                break;
            case "invoice":
                result = triggerInvoiceDinamicData(doc, setQuery, mongo);
                break;
            case "payment":
                result = triggerPaymentDinamicData(doc, setQuery, mongo);
                break;
            case "estimated":
                result = triggerEstimatedDinamicData(doc, setQuery, mongo);
                break;
            case "familyDorm":
                result = triggerFamilyDormDinamicData(doc, setQuery, mongo);
                break;
            case "dorm":
                result = triggerDormDinamicData(doc, setQuery, mongo);
                break;
            case "apartment":
                result = triggerApartmentDinamicData(doc, setQuery, mongo);
                break;
            case "homestayBook":
                result = triggerHomeStayDinamicData(doc, setQuery, mongo);
                break;
            case "sharedBook":
                result = triggerSharedDinamicData(doc, setQuery, mongo);
                break;
            case "unSharedBook":
                result = triggerUnSharedDinamicData(doc, setQuery, mongo);
                break;
            case "suiteBook":
                result = triggerSuiteDinamicData(doc, setQuery, mongo);
                break;
            case "receivement":
                result = triggerReceivementDinamicData(doc, setQuery, mongo);
                break;
            default:
                // code block
        }
        if (fechaMongo) {
            mongo.close();
        }
        return result;
    }

    private BasicDBObject triggerApartmentDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = false;
        atualiza = triggerObjeto("building", null,"buildingId","buildName","name", docObj, atualiza, mongo);
        atualiza = triggerObjeto("building", null,"buildingId","city","city", docObj, atualiza, mongo);
        atualiza = triggerObjeto("vendor", null,"vendorId","vendorName","name", docObj, atualiza, mongo);

        if (atualiza) {
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("apartment", doc, setQuery, mongo);
            if (fechaMongo){
                mongo.close();
            }
            return docObj;
        }
        ;
        if (fechaMongo) {
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerSuiteDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));


        Boolean atualiza = false;
        atualiza = triggerObjeto("travel", "accomodation", "studentId", "occHome", "occHome", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "studentIdTravel", "studentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "studentIdTravel", "studentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "city", "destination", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null, "studentIdTravel", "gender", "gender", docObj, atualiza, mongo);

        if (atualiza){
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("suiteBook", doc, setQuery, mongo);
            if (fechaMongo){
                mongo.close();
            }
            return docObj;
        };
        if (fechaMongo){
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerSharedDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = false;
        atualiza = triggerObjeto("travel", "accomodation", "studentId", "occHome", "occHome", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "studentIdTravel", "studentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "studentIdTravel", "studentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "city", "destination", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null, "studentIdTravel", "gender", "gender", docObj, atualiza, mongo);

        if (atualiza){
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("sharedBook", doc, setQuery, mongo);
            if (fechaMongo){
                mongo.close();
            }
            return docObj;
        };
        if (fechaMongo){
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerUnSharedDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));


        Boolean atualiza = false;
        atualiza = triggerObjeto("travel", "accomodation", "studentId", "occHome", "occHome", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "studentIdTravel", "studentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "studentIdTravel", "studentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "city", "destination", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null, "studentIdTravel", "gender", "gender", docObj, atualiza, mongo);

        if (atualiza){
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("unSharedBook", doc, setQuery, mongo);
            if (fechaMongo){
                mongo.close();
            }
            return docObj;
        };
        if (fechaMongo){
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerReceivementDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = false;

        String payerId = "";
        String agencyAux = "agency";
        if (docObj.getString("payerType").equals(agencyAux)) {
            atualiza = triggerObjeto("agency", null, "agencyId", "payerName", "name", docObj, atualiza, mongo);
            payerId = docObj.getString("agencyId");
        }else{
            atualiza = triggerObjeto("student", null, "studentId", "firstName", "firstName", docObj, atualiza, mongo);
            atualiza = triggerObjeto("student", null, "studentId", "lastName", "lastName", docObj, atualiza, mongo);
            docObj.put("payerName", docObj.get("firstName") + " " + docObj.get("lastName"));
            payerId = docObj.getString("studentId");
        }

        if (docObj.get("payerId") == null) {
            docObj.put("payerId", payerId);
            atualiza = true;
        }else {
            if (!docObj.getString("payerId").equals(payerId)) {
                docObj.put("payerId", payerId);
                atualiza = true;
            }
        }

        if (atualiza){
            docObj.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("receivement", doc, setQuery, mongo);
            if (fechaMongo){
                mongo.close();
            }
            return docObj;
        };
        if (fechaMongo){
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerHomeStayDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));


        Boolean atualiza = false;
        atualiza = triggerObjeto("travel", "accomodation", "studentId", "occHome", "occHome", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "studentIdTravel", "studentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "studentIdTravel", "studentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("travel", null, "studentId", "city", "destination", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null, "studentIdTravel", "gender", "gender", docObj, atualiza, mongo);
        atualiza = triggerObjeto("family", null, "studentIdTravel", "gender", "gender", docObj, atualiza, mongo);

        if (atualiza){
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("homestayBook", doc, setQuery, mongo);
            if (fechaMongo){
                mongo.close();
            }
            return docObj;
        };
        if (fechaMongo){
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerEstimatedDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {
        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = false;
        atualiza = triggerObjeto("student", null, "studentId", "firstName", "firstName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null, "studentId", "lastName", "lastName", docObj, atualiza, mongo);
        docObj.put("nameStudent", docObj.getString("firstName") + " " + docObj.getString("lastName"));
        atualiza = triggerObjeto("city", null, "destination", "nameCity", "name", docObj, atualiza, mongo);
        atualiza = triggerObjeto("invoice", null, "invoiceId", "invoiceStatus", "paid", docObj, atualiza, mongo);
        atualiza = triggerObjeto("invoice", null, "invoiceId", "invoiceNumber", "invoiceNumber", docObj, atualiza, mongo);
        atualiza = setObjeto(docObj,"tabelType","estimated", atualiza);
        atualiza = setObjeto(docObj,"checkIn","N/A", atualiza);
        atualiza = setObjeto(docObj,"checkOut","N/A", atualiza);
        atualiza = setObjeto(docObj,"occHome","N/A", atualiza);
        atualiza = setObjeto(docObj,"extension","N/A", atualiza);

        if (atualiza) {
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("estimated", doc, setQuery, mongo);
            if (fechaMongo) {
                mongo.close();
            }
            return docObj;
        }
        ;
        if (fechaMongo) {
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerPaymentDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {
        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        BasicDBObject travel = new BasicDBObject();
        BasicDBObject accomodation = new BasicDBObject();
        if (docObj.get("travelId") != null) {
            travel = obterCrudQuery("travel", "_id", docObj.getString("travelId"), mongo);
            if (travel != null) {
                accomodation.putAll((Map) travel.get("accomodation"));
            }
        }

        Boolean atualiza = false;

        if (docObj.get("vendorType") != null && docObj.get("vendorId") != null) {
            String collection = "family";
            String objectName = "familyName";
            switch (docObj.getString("vendorType")) {
                case "family":
                    collection = "family";
                    objectName = "familyName";
                    break;
                case "travel":
                    collection = "vendor";
                    objectName = "name";
                    break;
                case "invoice":
                    collection = "driver";
                    objectName = "name";
                    break;
                case "service":
                    collection = "vendor";
                    objectName = "name";
                    break;
                case "shared":
                    collection = "vendor";
                    objectName = "name";
                    break;
                case "suite":
                    collection = "vendor";
                    objectName = "name";
                    break;

                default:
                    // code block
            }
            atualiza = triggerObjeto(collection, null, "vendorId", "nameVendor", objectName, docObj, atualiza, mongo);
        }

        atualiza = triggerObjeto("student", null, "studentId", "studentFirstName", "firstName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null, "studentId", "studentLastName", "lastName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("city", null, "destination", "nameCity", "name", docObj, atualiza, mongo);

        String hasNotes= "no";
        if (docObj.get("notes") != null){
            ArrayList<Object> notes = new ArrayList<>();
            notes = (ArrayList<Object>) docObj.get("notes");
            if (notes.size() > 0 ){
                hasNotes= "yes";
            }
        }
        atualiza = setObjeto(docObj,"hasNotes", hasNotes, atualiza);
        atualiza = setObjeto(docObj,"tabelType", "payment", atualiza);
        atualiza = setObjeto(docObj,"checkIn",accomodation.getString("checkIn"), atualiza);
        atualiza = setObjeto(docObj,"checkOut",accomodation.getString("checkOut"), atualiza);
        atualiza = setObjeto(docObj,"occHome",accomodation.getString("occHome"), atualiza);
        atualiza = setObjeto(docObj,"extension",travel.getString("extension"), atualiza);

        atualiza = triggerObjeto("invoice", null, "invoiceId", "invoiceStatus", "paid", docObj, atualiza, mongo);
        atualiza = triggerObjeto("invoice", null, "invoiceId", "invoiceNumber", "invoiceNumber", docObj, atualiza, mongo);
        atualiza = triggerObjeto("priceTable", null, "item", "productName", "name", docObj, atualiza, mongo);

        if (atualiza) {
            docObj.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("payment", doc, setQuery, mongo);
            if (fechaMongo) {
                mongo.close();
            }
            return docObj;
        }
        ;
        if (fechaMongo) {
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerInvoiceDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {
        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        if (docObj.get("trip") != null) {
            BasicDBObject travel = obterCrudQuery("travel", "_id", docObj.getString("trip"), mongo);
            if (travel != null) {
                docObj.put("studentTripId", travel.getString("studentId"));
                docObj.put("destinationTripId", travel.getString("destination"));
                docObj.put("agency", travel.getString("agency"));
            }
        }

        Boolean atualiza = false;
        atualiza = triggerObjeto("agency", null,"agency","nameAgency","name", docObj, atualiza, mongo);
        if (docObj.get("nameAgency") == null){
            docObj.put("nameAgency","no agency");
            atualiza = true;
        }
        atualiza = triggerObjeto("agency", null, "agency", "nameAgency", "name", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null, "studentTripId", "studentFirstName", "firstName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null, "studentTripId", "studentLastName", "lastName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("city", null, "destinationTripId", "nameCity", "name", docObj, atualiza, mongo);

        String total = "";
        if (docObj.get("netGross") != null) {
            if (docObj.getString("netGross").equals("net")) {
                total = docObj.getString("totalNet");
            } else {
                total = docObj.getString("totalGross");
            }
        }
        atualiza = setObjeto(docObj, "total", total, atualiza);

        String balanceDue= "";
        if (docObj.get("total") != null &&  docObj.get("valuePayed") != null){
            balanceDue = Float.toString(Float.valueOf(docObj.getString("total")) - Float.valueOf(docObj.getString("valuePayed")));
        }
        atualiza = setObjeto(docObj, "balanceDue", total, atualiza);

        if (atualiza) {
            docObj.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("invoice", doc, setQuery, mongo);
            if (fechaMongo) {
                mongo.close();
            }
            return docObj;
        }
        ;
        if (fechaMongo) {
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerStudentDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
            fechaMongo = true;
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));

        Boolean atualiza = false;

        Long age = commons.calcAge(docObj.getString("birthday"));
        atualiza = setObjeto(docObj,"age", Long.toString(age), atualiza);

        if (atualiza){
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("student", doc, setQuery, mongo);
            if (fechaMongo) {
                mongo.close();
            }
            return docObj;
        }

        if (fechaMongo) {
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerTravelDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
            fechaMongo = true;
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));
        BasicDBObject accomodation = new BasicDBObject();
        accomodation.putAll((Map) docObj.get("accomodation"));
        if (accomodation.get("twinEmail") != null) {
            if (!accomodation.getString("twinEmail").equals("")) {
                docObj.put("twinId", obterCrudQuery("student", "documento.email", accomodation.getString("twinEmail"), mongo).get("_id"));
            }
        }

        Boolean atualiza = false;
        atualiza = triggerObjeto("agency", null,"agency","agencyName","name", docObj, atualiza, mongo);
        if (docObj.get("agencyName") == null){
            docObj.put("agencyName","no agency");
            atualiza = true;
        }
        atualiza = triggerObjeto("school", null, "school", "schoolName", "name", docObj, atualiza, mongo);
        if (docObj.get("schoolName") == null){
            docObj.put("schoolName","no school");
            atualiza = true;
        }
        atualiza = triggerObjeto("city", null,"destination","destinationName","name", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null,"studentId","firstName","firstName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null,"studentId","lastName","lastName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null,"studentId","birthday","birthday", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null,"studentId","gender","gender", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null,"studentId","nationality","nationality", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null,"twinId","firstNameTwin","firstName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("student", null,"twinId","lastNameTwin","lastName", docObj, atualiza, mongo);

        String nameTwin = "noTwin";
        if (docObj.get("firstNameTwin") != null && docObj.get("lastNameTwin") != null) {
            nameTwin = docObj.getString("firstNameTwin") + " " + docObj.get("lastNameTwin");
        }
        atualiza = setObjeto(docObj,"nameTwin", nameTwin, atualiza);

        Long age = commons.calcAge(docObj.getString("birthday"));

        atualiza = setObjeto(docObj,"age",Long.toString(age), atualiza);

        String collecion = "homebook";
        switch (docObj.getString("accControl")) {
            case "homestay":
                collecion = "homestayBook";
                break;
            case "shared":
                collecion = "sharedBook";
                break;
            case "suite":
                collecion = "suiteBook";
                break;
            default:
                collecion = "homestayBook";
        }

        BasicDBObject dataAllocate = dataAllocate(docObj, collecion, mongo);
        int daysAllocated = dataAllocate.getInt("daysAllocated");
        int allocations = dataAllocate.getInt("allocations");

        int daysTrip = 0;
        if (accomodation.get("checkIn") != null && accomodation.get("checkOut") != null) {
            daysTrip = commons.difDate(accomodation.getString("checkIn"), accomodation.getString("checkOut"));
        }


        String status = "Available";
        String nextCheckIn = "N/A";
        if (daysAllocated >= daysTrip) {
            if (allocations > 1) {
                status = "Multiple";
            } else {
                status = dataAllocate.getString("status");
            }
        } else {
            if (daysAllocated != 0) {
                status = "Partial";
                nextCheckIn = dataAllocate.getString("nextCheckIn");
            }
        }
        atualiza = setObjeto(docObj,"status", status, atualiza);
        atualiza = setObjeto(docObj,"nextCheckIn", nextCheckIn, atualiza);
        atualiza = setObjeto(docObj,"uniqueAlocId", dataAllocate.getString("uniqueAlocId"), atualiza);

        if (atualiza) {
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("travel", doc, setQuery, mongo);
            if (fechaMongo) {
                mongo.close();
            }
            return docObj;
        }
        ;
        if (fechaMongo) {
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject triggerFamilyDormDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = false;
        atualiza = triggerObjeto("familyRooms", null,"roomId", "familyId", "familyId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("familyRooms", null,"roomId","roomNumber","roomNumber", docObj, atualiza, mongo);
        atualiza = triggerObjeto("family", null,"familyId","city","city", docObj, atualiza, mongo);
        atualiza = triggerObjeto("family", null,"familyId","familyName","familyName", docObj, atualiza, mongo);
        atualiza = triggerObjeto("family", null,"familyId","contractIssue","contractIssue", docObj, atualiza, mongo);

        if (atualiza) {
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("familyDorm", doc, setQuery, mongo);
            if (fechaMongo) {
                mongo.close();
            }
            return docObj;
        }
        ;
        if (fechaMongo) {
            mongo.close();
        }
        return docObj;

    }

    private BasicDBObject triggerDormDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = getMongoClient();
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = false;
        atualiza = triggerObjeto("room", null,"roomId", "apartmentId", "apartmentId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("room", null,"roomId","roomNumber","roomNumber", docObj, atualiza, mongo);
        atualiza = triggerObjeto("apartment", null,"apartmentId","buildingId","buildingId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("apartment", null,"apartmentId","vendorId","vendorId", docObj, atualiza, mongo);
        atualiza = triggerObjeto("apartment", null,"apartmentId","startDate","startDate", docObj, atualiza, mongo);
        atualiza = triggerObjeto("apartment", null,"apartmentId","endDate","endDate", docObj, atualiza, mongo);
        atualiza = triggerObjeto("apartment", null,"apartmentId","unit","unit", docObj, atualiza, mongo);
        atualiza = triggerObjeto("apartment", null,"apartmentId","apType","apType", docObj, atualiza, mongo);
        atualiza = triggerObjeto("building", null,"buildingId","buildName","name", docObj, atualiza, mongo);
        atualiza = triggerObjeto("building", null,"buildingId","city","city", docObj, atualiza, mongo);
        atualiza = triggerObjeto("vendor", null,"vendorId","vendorName","name", docObj, atualiza, mongo);

        if (atualiza){
            docObj.remove("_id");
            doc.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("dorm", doc, setQuery, mongo);
            if (fechaMongo){
                mongo.close();
            }
            return docObj;
        };
        if (fechaMongo){
            mongo.close();
        }
        return docObj;
    }

    private BasicDBObject dataAllocate(BasicDBObject docObj, String collecion, MongoClient mongo) throws UnknownHostException {

        BasicDBObject result = new BasicDBObject();
        int daysAllocated = 0;
        int allocationsNumber = 0;
        String status = "";
        String nextCheckIn = "N/A";
        String uniqueAlocId = "";
        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put("documento.studentId", docObj.getString("_id"));
        setQuery.put("documento.ativo", docObj.getString("ativo"));
        BasicDBObject setSort = new BasicDBObject();
        setSort.put("documento.end", 1);
        ResponseEntity response = listaCrudTrigger(collecion, setQuery, setSort, mongo);
        ArrayList<Object> allocations = new ArrayList<Object>();
        allocations = (JSONArray) response.getBody();
        if ((response.getStatusCode() == HttpStatus.OK)) {
            for (int i = 0; i < allocations.size(); i++) {
                BasicDBObject allocation = new BasicDBObject();
                allocation.putAll((Map) allocations.get(i));
                daysAllocated = daysAllocated + commons.difDate(allocation.getString("start").substring(0, 10), allocation.getString("end").substring(0, 10));
                status = getStatusAllocation(allocation);
                uniqueAlocId = allocation.getString("_id");
                nextCheckIn = allocation.getString("end").substring(0, 10);
                ++allocationsNumber;
            }
        }

        result.put("daysAllocated", daysAllocated);
        result.put("allocations", allocationsNumber);
        result.put("status", status);
        result.put("uniqueAlocId", uniqueAlocId);
        result.put("nextCheckIn", nextCheckIn);
        return result;
    }

    private String getStatusAllocation(BasicDBObject allocation) {

        String status = "";
        if (allocation.get("invite") == null) {
            status = "Allocated";
        } else {
            if (allocation.getString("invite").equals("")) {
                status = "Allocated";
            }
            if (allocation.getString("invite").equals("pendent")) {
                status = "Offered";
            }
            if (allocation.getString("invite").equals("no")) {
                status = "Refused";
            }
            if (allocation.getString("invite").equals("yes")) {
                status = "Confirmed";
            }
        }
        if (allocation.get("allocate") != null) {
            if (allocation.getString("allocate").equals("confirmed")) {
                status = "Confirmed";
            }
        }
        if (allocation.get("emailSent") != null) {
            if (allocation.getString("emailSent").equals("sent")) {
                status = "Documents";
            }
        }
        if (allocation.get("checkedIn") != null) {
            if (allocation.getString("checkedIn").equals("true")) {
                status = "Checked in";
            }
        }
        if (allocation.get("checkedOut") != null) {
            if (allocation.getString("checkedOut").equals("true")) {
                status = "Checked out";
            }
        }
        if (allocation.get("inspection") != null) {
            if (allocation.getString("inspection").equals("true")) {
                status = "Inspected";
            }
        }
        if (allocation.get("reviewed") != null) {
            if (allocation.getString("reviewed").equals("true")) {
                status = "Reviewed";
            }
        }
        if (allocation.get("archived") != null) {
            if (allocation.getString("archived").equals("true")) {
                status = "Archived";
            }
        }
        if (allocation.get("ativo") != null) {
            if (allocation.getString("ativo").equals("inativo")) {
                status = "Deleted";
            }
        }

        return status;

    }

    private Boolean setObjeto(BasicDBObject docObj, String nameColumn, String value, Boolean atualiza) {
        if (docObj.get(nameColumn) == null) {
            docObj.put(nameColumn, value);
            atualiza = true;
        }else {
            if (!docObj.getString(nameColumn).equals(value)) {
                docObj.put(nameColumn, value);
                atualiza = true;
            }
        }
        return atualiza;
    }

    private Boolean triggerObjeto(String collection, String group, String nameId, String nameFinalTable, String nameOriginTable, BasicDBObject docObj, Boolean atualiza, MongoClient mongo) throws UnknownHostException {

        if (!atualiza) {
            atualiza = verificaObjeto(collection, group, nameId, nameFinalTable, nameOriginTable, docObj, mongo);
        } else {
            verificaObjeto(collection, group, nameId, nameFinalTable, nameOriginTable, docObj, mongo);
        }

        return atualiza;
    }

    private Boolean verificaObjeto(String collection, String group, String id, String name, String originalName, BasicDBObject docObj, MongoClient mongo) throws UnknownHostException {

        String objectName = "";
        if (docObj.get(id) != null){
            if (!docObj.getString(id).equals("")){
                BasicDBObject docOriginal = new BasicDBObject();
                if (group != null) {
                    if (group.equals("documento")) {
                        docOriginal = obterCrudQuery(collection, "documento." + id + id, docObj.getString(id), mongo);
                    }else{
                        docOriginal = obterCrudQuery(collection, "_id", docObj.getString(id), mongo);
                    }
                }else {
                    docOriginal = obterCrudQuery(collection, "_id", docObj.getString(id), mongo);
                }
                if (docOriginal != null) {
                    if (docOriginal.get(originalName) != null) {
                        objectName = docOriginal.getString(originalName);
                    }
                    if (group != null) {
                        if (!group.equals("documento")) {
                            BasicDBObject groupOriginal = new BasicDBObject();
                            groupOriginal.putAll((Map) docOriginal.get(group));
                            if (groupOriginal.get(originalName) != null) {
                                objectName = groupOriginal.getString(originalName);
                            }
                        }
                    }
                    if (docObj.get(name) != null) {
                        if (!docObj.getString(name).equals(objectName)) {
                            docObj.put(name, objectName);
                            return true;
                        }
                    } else {
                        docObj.put(name, objectName);
                        return true;
                    }
                }
            }
        }

        return false;

    }


    @SuppressWarnings({"unchecked", "rawtypes"})
    public BasicDBObject triggerInsert(BasicDBObject doc, String collectionName, BasicDBObject setQuery) throws UnknownHostException {

        BasicDBObject result = new BasicDBObject();
        switch (collectionName) {
            case "invoice":
                triggerInsertInvoice(doc, setQuery);
                break;
            default:
                // code block
        }

        return result;
    }

    private void triggerInsertInvoice(BasicDBObject doc, BasicDBObject setQuery) throws UnknownHostException {

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));

        Boolean atualiza = false;

    }

    public BasicDBObject montaSetQuery(String id) {

        BasicDBObject setQuery = new BasicDBObject();
        ObjectId idObj = new ObjectId(id);
        setQuery.put("_id", idObj);
        return setQuery;

    }


    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity atualizarCrudTrigger(String collectionName, BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException, MongoException {
        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);
        doc.put("lastTriggerChange", commons.todaysDate("yyyy-mm-dd"));
        Document docUpdate = new Document();
        docUpdate.putAll((Map) doc);
        collection.replaceOne(setQuery, docUpdate);
        return ResponseEntity.ok().body("true");
    }


    public ResponseEntity listaCrudTrigger(String collectionName, BasicDBObject setQuery, BasicDBObject setSort, MongoClient mongo) throws UnknownHostException, MongoException {

        MongoDatabase db = getDatabase(mongo);
        MongoCollection<Document> collection = db.getCollection(collectionName);

        FindIterable<Document> cursor = collection.find(setQuery).sort(setSort);

        if (cursor.first() != null) {
            JSONArray documentos = new JSONArray();
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                docObj.put("_id", current.get("_id").toString());
                documentos.add(docObj);
            }
            return ResponseEntity.ok().body(documentos);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    public static MongoClient getMongoClient() {
        return new MongoClient(HOST);
    }
    
    private MongoDatabase getDatabase(MongoClient mongo) {
        return mongo.getDatabase(commons.getProperties().get("database").toString());
    }

}
