package com.casamundo.dao;

import com.casamundo.commons.Commons;
import com.mongodb.*;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import org.bson.BasicBSONObject;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.UnknownHostException;
import java.util.*;
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
    public BasicDBObject obterCrudQuery(String collectionName, BasicDBObject setQuery) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

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
            objDocumentoUpdate.put("documento", doc);
            collection.replaceOne(setQuery,objDocumentoUpdate);
        };
        mongo.close();
        return ResponseEntity.ok().body("true");
    };

    @SuppressWarnings({"rawtypes", "unchecked", "unused"})
    public ResponseEntity atualizarCrudTrigger(String collectionName, BasicDBObject doc, BasicDBObject setQuery) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

        doc.put("lastTriggerChange", commons.todaysDate("yyyy-mm-dd"));
        Document docUpdate = new Document();
        docUpdate.putAll((Map) doc);
        collection.replaceOne(setQuery,docUpdate);
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

        if (cursor.first() != null) {
            JSONArray documentos = new JSONArray();
            ArrayList cityUser = (ArrayList) user.get("city");
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.put("documento", docObj);
                doc.put("_id", current.get("_id").toString());
                doc.put("lastChange", current.get("lastChange").toString());
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
                doc = dinamicData(doc,collectionName,montaSetQuery(current));
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
            }
            ++count;
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
        if (cursor.first() != null) {
            JSONArray documentos = new JSONArray();
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
            return ResponseEntity.badRequest().build();
        }
    };


    @SuppressWarnings({"rawtypes", "unchecked"})
    public ResponseEntity teste(int start, int length) throws UnknownHostException, MongoException {
        MongoClient mongo = new MongoClient();
        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection("student");

        BasicDBObject setQuery = new BasicDBObject();

        long count = 0;
        FindIterable<Document> cursor = collection.find(setQuery);
        ArrayList<ArrayList<String>> listas = new ArrayList<>();
        if (cursor.first() != null) {
            for (Document current : cursor) {
                BasicDBObject docObj = new BasicDBObject();
                docObj.putAll((Map) current.get("documento"));
                BasicDBObject doc = new BasicDBObject();
                doc.putAll((Map) current);
                doc = dinamicData(doc,"student",montaSetQuery(current));
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

    private BasicDBObject montaSetQuery(Document current) {

        BasicDBObject setQuery = new BasicDBObject();
        setQuery.put("_id", current.get("_id"));
        return setQuery;

    };

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
    public BasicDBObject dinamicData(BasicDBObject doc, String collectionName, BasicDBObject setQuery) throws UnknownHostException {

        BasicDBObject result = new BasicDBObject();
        switch(collectionName) {
            case "student":
                triggerStudentDinamicData(doc, setQuery);
                break;
            default:
                // code block
        }

        return result;
    }

    private void triggerStudentDinamicData(BasicDBObject doc, BasicDBObject setQuery) throws UnknownHostException {

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));

        Long age = commons.calcAge(docObj.getString("birthday"));

        Boolean atualiza = false;

        if (docObj.getString("age") == null) {
            atualiza = true;
        }else {
            if (docObj.getString("age").equals(age)) {
                atualiza = true;
            }
        }

        if (atualiza){
            docObj.put("age", age);
            doc.put("documento", docObj);
            atualizarCrudTrigger("student", doc, setQuery);
        };
    }

};

