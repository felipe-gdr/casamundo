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

    Commons commons = new Commons();

    @SuppressWarnings({"rawtypes"})
    public ResponseEntity obterCrud(String collectionName, String key, String value) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();

        if (value != null) {
            if (key.equals("_id")) {
                ObjectId idObj = new ObjectId(value);
                setQuery = new BasicDBObject(key, idObj);
            } else {
                setQuery = new BasicDBObject(key, value);
            };
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
    };

    @SuppressWarnings({})
    public ResponseEntity obterId(String collectionName) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
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
    };

    @SuppressWarnings({"rawtypes"})
    public BasicDBObject obterCrudDoc(String collectionName, String key, String value) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
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
                    mongo.close();
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
            mongo.close();
            return documento;
        }
        mongo.close();
        return null;
    };

    @SuppressWarnings({"rawtypes"})
    public BasicDBObject obterCrudQuery(String collectionName, String key, String value) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();
        if (key.equals("_id")) {
            ObjectId idObj = new ObjectId(value);
            setQuery = new BasicDBObject("_id", idObj);
        }else{
            setQuery = new BasicDBObject(key, value);
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
    };

    @SuppressWarnings("rawtypes")
    public ResponseEntity incluirCrud(String collectionName, BasicDBObject doc) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
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
        insert.put("_id", insert.get( "_id" ).toString());
        mongo.close();
        return ResponseEntity.ok().body(insert.get("_id").toString());
    }

    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity atualizarCrud(String collectionName, Object updateInput, String key, String valueInp) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
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
            Document objDocumentoUpdate = new Document();
            objDocumentoUpdate.putAll((Map) doc);
            collection.replaceOne(setQuery,objDocumentoUpdate);
        };
        mongo.close();
        return ResponseEntity.ok().body("true");
    };

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity listaCrud(String collectionName, String key, String value, String userId, BasicDBObject setQueryInput, BasicDBObject setSortInput, Boolean onlyPrivate) throws UnknownHostException, MongoException {

        MongoClient mongo = new MongoClient();
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
            mongo.close();
            return ResponseEntity.ok().body(documentos);
        } else {
            mongo.close();
            return ResponseEntity.ok().body(documentos);
        }
    };

    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity listaCrudSkip(String collectionName, String key, String value, String userId, BasicDBObject setQueryInput, BasicDBObject setSortInput, Boolean onlyPrivate, Integer start, Integer length, Map<String, String> params) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
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

        long count = 0;
        FindIterable<Document> cursor = collection.find(setQuery).sort(setSort);
        ArrayList<ArrayList<String>> listas = new ArrayList<>();
        if (cursor.first() != null) {
            ArrayList cityUser = (ArrayList) user.get("city");
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) current);
                doc = triggerDinamicData(doc,collectionName,montaSetQuery(doc.getString("_id")), mongo);
                int i = 0;
                while (params.get("columns[" + i + "][data]") != null) {
                    if (listas.size() < (i + 1)){
                        listas.add(new ArrayList<>());
                    }
                    if (params.get("columns[" + i + "][data]").length() > 9 && !params.get("columns[" + i + "][name]").equals("notPop"))  {
                        String a = params.get("columns[" + i + "][data]").substring(10);
                        if (docObj.get(params.get("columns[" + i + "][data]").substring(10)) != null) {
                            if (!commons.testaElementoArray(docObj.getString(params.get("columns[" + i + "][data]").substring(10)), listas.get(i))) {
                                if (!docObj.getString(params.get("columns[" + i + "][data]").substring(10)).equals("")) {
                                    listas.get(i).add(docObj.getString(params.get("columns[" + i + "][data]").substring(10)));
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
                if (params.get("search[value]") != null){
                    if (!params.get("search[value]").equals("")) {
                        Pattern regex = Pattern.compile(params.get("search[value]"), Pattern.CASE_INSENSITIVE);
                        DBObject clause = new BasicDBObject(params.get("columns[" + i + "][data]"), regex);
                        or.add(clause);
                        temClause = true;
                    }
                }
                if (params.get("columns[" + i + "][search][value]") != null) {
                    int pos = params.get("columns[" + i + "][search][value]").indexOf("-yadcf_delim-");
                    if (!params.get("columns[" + i + "][search][value]").equals("") && pos < 0){
                        Pattern regex = Pattern.compile(params.get("columns[" + i + "][search][value]"), Pattern.CASE_INSENSITIVE);
                        setQuery.put(params.get("columns[" + i + "][data]"), regex);
                    }else{
                        if (pos >= 0) {
                            String from = "0";
                            String to = "99999999999999999999999";
                            if (pos > 0){
                                from = params.get("columns[" + i + "][search][value]").substring(0, pos);
                            }
                            if (pos + 13 <  params.get("columns[" + i + "][search][value]").length()) {
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
        };

        if (params.get("order[0][column]") != null) {
            if (params.get("order[0][dir]").equals("asc")) {
                setSort.put(params.get("columns[" + params.get("order[0][column]") + "][data]"), 1);
            } else {
                setSort.put(params.get("columns[" + params.get("order[0][column]") + "][data]"), -1);
            }
        }

        long countFiltered = collection.countDocuments(setQuery);;
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
                            };
                        };
                    }
                } else {
                    documentos.add(doc);
                };
            };
            mongo.close();
            BasicDBObject result = new BasicDBObject();
            result.put("count", count);
            result.put("countFiltered", countFiltered);
            i = 0;
            for (ArrayList lista : listas) {
                result.put("yadcf_data_" + i, lista);
                ++i;
            }
            result.put("documentos", documentos );
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
            result.put("documentos", documentos );
            return ResponseEntity.ok().body(result);
        }
    };


    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity teste(int start, int length, String collectionName) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
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
                doc = triggerDinamicData(doc,collectionName,montaSetQuery(doc.getString("_id")), mongo );
                ++count;
            }
        }

        long countFiltered = collection.countDocuments(setQuery);;
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
            };
            mongo.close();
            BasicDBObject result = new BasicDBObject();
            result.put("count", count);
            result.put("countFiltered", countFiltered);
            result.put("documentos", documentos );
            return ResponseEntity.ok().body(result);
        } else {
            mongo.close();
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity removerCrud(String collectionName, String key, String value, BasicDBObject setQueryInput) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put(key, value);

        if (setQueryInput != null) {
            setQuery = setQueryInput;
        }
        collection.deleteMany(setQuery);

        mongo.close();

        return ResponseEntity.ok().body("true");
    };

    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity arrayCrud(String collectionName, String key, String value, String type, String field, String indexInp, Object item) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
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
                Document objDocumentoUpdate = new Document();
                objDocumentoUpdate.put("documento", doc);
                collection.replaceOne(setQuery,objDocumentoUpdate);
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


    @SuppressWarnings({ "unchecked", "rawtypes" })
    public BasicDBObject triggerDinamicData(BasicDBObject doc, String collectionName, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {
        Boolean fechaMongo = false;
        if (mongo == null) {
            mongo = new MongoClient();
        }
        BasicDBObject result = new BasicDBObject();
        switch(collectionName) {
            case "student":
                triggerStudentDinamicData(doc, setQuery, mongo);
                break;
            case "travel":
                triggerTravelDinamicData(doc, setQuery, mongo);
                break;
            case "familyDorm":
                triggerFamilyDormDinamicData(doc, setQuery, mongo);
                break;
            default:
                // code block
        }
        if (fechaMongo){
            mongo.close();
        }
        return result;
    }

    private void triggerStudentDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        Boolean fechaMongo = false;

        if (mongo == null) {
            mongo = new MongoClient();
            fechaMongo = true;
        }

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));

        Long age = commons.calcAge(docObj.getString("birthday"));

        Boolean atualiza = false;

        if (docObj.getString("age") == null) {
            docObj.put("age", Long.toString(age));
            atualiza = true;
        }else {
            if (!docObj.getString("age").equals(Long.toString(age))) {
                docObj.put("age", Long.toString(age));
                atualiza = true;
            }
        }

        if (atualiza){
            doc.put("documento", docObj);
            atualizarCrudTrigger("student", doc, setQuery, mongo);
        };

        if (fechaMongo){
            mongo.close();
        }
    }

    private void triggerTravelDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = verificaObjeto("agency","agency","agencyName","name", docObj);
        atualiza = verificaObjeto("school","school","schoolName","name", docObj);
        atualiza = verificaObjeto("city","destination","destinationName","name", docObj);
        atualiza = verificaObjeto("student","studentId","firstName","firstName", docObj);
        atualiza = verificaObjeto("student","studentId","lastName","lastName", docObj);
        atualiza = verificaObjeto("student","studentId","birthday","birthday", docObj);
        atualiza = verificaObjeto("student","studentId","age","age", docObj);
        atualiza = verificaObjeto("student","studentId","gender","gender", docObj);
        atualiza = verificaObjeto("student","studentId","nationality","nationality", docObj);

        Long age = commons.calcAge(docObj.getString("birthday"));

        if (docObj.getString("age") == null) {
            docObj.put("age", Long.toString(age));
            atualiza = true;
        }else {
            if (!docObj.getString("age").equals(Long.toString(age))) {
                docObj.put("age", Long.toString(age));
                atualiza = true;
            }
        }

        BasicDBObject accomodation = new BasicDBObject();

        accomodation.putAll((Map) docObj.get("accomodation"));


        String collecion = "homebook";
        switch(docObj.getString("accControl")) {
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

        int daysAllocated = daysAllocated(docObj,collecion, mongo);

        int daysTrip = 0;
        if (accomodation.get("checkIn") != null && accomodation.get("checkOut") != null) {
            daysTrip = commons.difDate(accomodation.getString("checkIn"), accomodation.getString("checkOut"));
        };

        String status = "Available";
        if (daysTrip == daysAllocated){
            status = "Allocated";
        }else{
            if (daysAllocated != 0){
                status = "Partial";
            }
        }

        if (docObj.get("status") == null){
            docObj.put("status", status);
            atualiza = true;
        }else{
            if (!docObj.getString("status").equals(status)) {
                docObj.put("status", status);
                atualiza = true;
            }
        }

        if (atualiza){
            docObj.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("travel", doc, setQuery, mongo);
        };
    }

    private void triggerFamilyDormDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = verificaObjeto("familyRooms","roomId","familyId","familyId", docObj);
        atualiza = verificaObjeto("family","familyId","city","city", docObj);

        if (atualiza){
            docObj.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("familyDorm", doc, setQuery, mongo);
        };

    }

    private int daysAllocated(BasicDBObject docObj, String collecion, MongoClient mongo) throws UnknownHostException {

        int daysAllocated = 0;

        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put("documento.studentId", docObj.getString("_id"));
        setQuery.put("documento.ativo", docObj.getString("ativo"));
        ResponseEntity response = listaCrudTrigger(collecion, setQuery, mongo);
        ArrayList<Object> allocations = new ArrayList<Object>();
        allocations = (JSONArray) response.getBody();
        if ((response.getStatusCode() == HttpStatus.OK)) {
            for (int i = 0; i < allocations.size(); i++) {
                BasicDBObject allocation = new BasicDBObject();
                allocation.putAll((Map) allocations.get(i));
                daysAllocated = daysAllocated + commons.difDate(allocation.getString("start").substring(0, 10), allocation.getString("end").substring(0, 10));
            }
        }

        return daysAllocated;
    }

    private Boolean verificaObjeto(String collection,String id, String name,String originalName, BasicDBObject docObj) throws UnknownHostException {

        Object objectName = "";
        if (docObj.get(id) != null){
            if (!docObj.getString(id).equals("")){
                BasicDBObject docOriginal = obterCrudQuery(collection, "_id", docObj.getString(id));
                if (docOriginal != null) {
                    if (docOriginal.get(originalName) != null) {
                        objectName = docOriginal.get(originalName);
                    }
                    if (docObj.get(name) != null) {
                        if (docObj.getString(name).equals(objectName)) {
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

    };

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public BasicDBObject triggerInsert(BasicDBObject doc, String collectionName, BasicDBObject setQuery) throws UnknownHostException {

        BasicDBObject result = new BasicDBObject();
        switch(collectionName) {
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

    };

    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity atualizarCrudTrigger(String collectionName, BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException, MongoException {
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);
        doc.put("lastTriggerChange", commons.todaysDate("yyyy-mm-dd"));
        Document docUpdate = new Document();
        docUpdate.putAll((Map) doc);
        collection.replaceOne(setQuery,docUpdate);
        return ResponseEntity.ok().body("true");
    };

    public ResponseEntity listaCrudTrigger(String collectionName, BasicDBObject setQuery,  MongoClient mongo) throws UnknownHostException, MongoException {

        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

        FindIterable<Document> cursor = collection.find(setQuery);

        if (cursor.first() != null) {
            JSONArray documentos = new JSONArray();
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                docObj.put("_id", current.get("_id").toString());
                documentos.add(docObj);
            };
            return ResponseEntity.ok().body(documentos);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

};

