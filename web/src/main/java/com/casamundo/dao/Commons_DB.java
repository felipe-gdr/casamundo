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
            case "invoice":
                triggerInvoiceDinamicData(doc, setQuery, mongo);
                break;
            case "payment":
                triggerPaymentDinamicData(doc, setQuery, mongo);
                break;
            case "estimated":
                triggerEstimatedDinamicData(doc, setQuery, mongo);
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

    private void triggerEstimatedDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        Boolean atualiza = false;
        if (!atualiza) {
            atualiza = verificaObjeto("student" , "studentId", "firstName", "firstName", docObj);
            verificaObjeto("student", "studentId", "lastName", "lastName", docObj);
            docObj.put("nameStudent", docObj.getString("firstName") + " " + docObj.getString("lastName"));
        }else{
            verificaObjeto("student", "studentId", "firstName", "firstName", docObj);
            verificaObjeto("student", "studentId", "lastName", "lastName", docObj);
            docObj.put("nameStudent", docObj.getString("firstName") + " " + docObj.getString("lastName"));
        }

        if (!atualiza) {
            atualiza = verificaObjeto("city" , "destination", "nameCity", "name", docObj);
        }else{
            verificaObjeto("city" , "destination", "nameCity", "name", docObj);
        }

        if (!atualiza) {
            atualiza = verificaObjeto("invoice" , "invoiceId", "invoiceStatus", "paid", docObj);
        }else{
            verificaObjeto("invoice" , "invoiceId", "invoiceStatus", "paid", docObj);
        }

        if (!atualiza) {
            atualiza = verificaObjeto("invoice" , "invoiceId", "invoiceNumber", "invoiceNumber", docObj);
        }else{
            verificaObjeto("invoice" , "invoiceId", "invoiceNumber", "invoiceNumber", docObj);
        }

        if (docObj.get("tabelType") == null) {
            docObj.put("tabelType", "estimated");
            atualiza = true;
        }else {
            if (!docObj.getString("tabelType").equals("estimated")) {
                docObj.put("tabelType", "estimated");
                atualiza = true;
            }
        }

        if (docObj.get("checkIn") == null) {
            docObj.put("checkIn", "N/A");
            atualiza = true;
        } else {
            if (!docObj.getString("checkIn").equals("N/A")) {
                docObj.put("checkIn", "N/A");
                atualiza = true;
            }
        }

        if (docObj.get("checkOut") == null) {
            docObj.put("checkOut", "N/A");
            atualiza = true;
        } else {
            if (!docObj.getString("checkOut").equals("N/A")) {
                docObj.put("checkOut", "N/A");
                atualiza = true;
            }
        }

        if (docObj.get("occHome") == null) {
            docObj.put("occHome", "N/A");
            atualiza = true;
        } else {
            if (!docObj.getString("occHome").equals("N/A")) {
                docObj.put("occHome", "N/A");
                atualiza = true;
            }
        }

        if (docObj.get("extension") == null) {
            docObj.put("extension", "N/A");
            atualiza = true;
        } else {
            if (!docObj.getString("extension").equals("N/A")) {
                docObj.put("extension", "N/A");
                atualiza = true;
            }
        }

        if (atualiza){
            docObj.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("estimated", doc, setQuery, mongo);
        };
    }

    private void triggerPaymentDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        BasicDBObject travel = new BasicDBObject();
        BasicDBObject accomodation = new BasicDBObject();
        if (docObj.get("travelId") != null){
            travel = obterCrudQuery("travel", "_id", docObj.getString("travelId"));
            if (travel != null) {
                accomodation.putAll((Map) travel.get("accomodation"));
            }
        }

        Boolean atualiza = false;

        if (docObj.get("vendorType") != null && docObj.get("vendorId") != null){
            String collection = "family";
            String objectName = "familyName";
            switch(docObj.getString("vendorType")) {
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
                default:
                    // code block
            }
            if (!atualiza) {
                atualiza = verificaObjeto(collection , "vendorId", "nameVendor", objectName, docObj);
            }else{
                verificaObjeto(collection, "vendorId", "nameVendor", objectName, docObj);
            }
        }

        if (!atualiza) {
            atualiza = verificaObjeto("student" , "studentId", "firstName", "firstName", docObj);
            verificaObjeto("student", "studentId", "lastName", "lastName", docObj);
            docObj.put("nameStudent", docObj.getString("firstName") + " " + docObj.getString("lastName"));
        }else{
            verificaObjeto("student", "studentId", "firstName", "firstName", docObj);
            verificaObjeto("student", "studentId", "lastName", "lastName", docObj);
            docObj.put("nameStudent", docObj.getString("firstName") + " " + docObj.getString("lastName"));
        }

        if (!atualiza) {
            atualiza = verificaObjeto("city" , "destination", "nameCity", "name", docObj);
        }else{
            verificaObjeto("city" , "destination", "nameCity", "name", docObj);
        }

        if (docObj.get("tabelType") == null) {
            docObj.put("tabelType", "payment");
            atualiza = true;
        }else {
            if (!docObj.getString("tabelType").equals("payment")) {
                docObj.put("tabelType", "payment");
                atualiza = true;
            }
        }

        if (accomodation.get("checkIn") != null) {
            if (docObj.get("checkIn") == null) {
                docObj.put("checkIn", accomodation.getString("checkIn"));
                atualiza = true;
            } else {
                if (!docObj.getString("checkIn").equals(accomodation.getString("checkIn"))) {
                    docObj.put("checkIn", accomodation.getString("checkIn"));
                    atualiza = true;
                }
            }
        }

        if (accomodation.get("checkOut") != null) {
            if (docObj.get("checkOut") == null) {
                docObj.put("checkOut", accomodation.getString("checkOut"));
                atualiza = true;
            } else {
                if (!docObj.getString("checkOut").equals(accomodation.getString("checkOut"))) {
                    docObj.put("checkOut", accomodation.getString("checkOut"));
                    atualiza = true;
                }
            }
        }

        if (accomodation.get("occHome") != null) {
            if (docObj.get("occHome") == null) {
                docObj.put("occHome", accomodation.getString("occHome"));
                atualiza = true;
            } else {
                if (!docObj.getString("occHome").equals(accomodation.getString("occHome"))) {
                    docObj.put("occHome", accomodation.getString("occHome"));
                    atualiza = true;
                }
            }
        }

        if (travel.get("extension") != null) {
            if (docObj.get("extension") == null) {
                docObj.put("extension", travel.getString("checkOut"));
                atualiza = true;
            } else {
                if (!docObj.getString("extension").equals(travel.getString("extension"))) {
                    docObj.put("extension", travel.getString("extension"));
                    atualiza = true;
                }
            }
        }

        if (!atualiza) {
            atualiza = verificaObjeto("invoice" , "invoiceId", "invoiceStatus", "paid", docObj);
        }else{
            verificaObjeto("invoice" , "invoiceId", "invoiceStatus", "paid", docObj);
        }

        if (!atualiza) {
            atualiza = verificaObjeto("invoice" , "invoiceId", "invoiceNumber", "invoiceNumber", docObj);
        }else{
            verificaObjeto("invoice" , "invoiceId", "invoiceNumber", "invoiceNumber", docObj);
        }

        if (!atualiza) {
            atualiza = verificaObjeto("priceTable" , "item", "productName", "name", docObj);
        }else{
            verificaObjeto("priceTable" , "item", "productName", "name", docObj);
        }

        if (atualiza){
            docObj.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("payment", doc, setQuery, mongo);
        };
    }

    private void triggerInvoiceDinamicData(BasicDBObject doc, BasicDBObject setQuery, MongoClient mongo) throws UnknownHostException {

        BasicDBObject docObj = new BasicDBObject();
        docObj.putAll((Map) doc.get("documento"));
        docObj.put("_id", doc.get("_id"));

        if (docObj.get("travelId") != null){
            BasicDBObject travel = obterCrudQuery("travel", "_id", docObj.getString("travelId"));
            if (travel != null) {
                docObj.put("studentTripId", travel.getString("studentId"));
                docObj.put("destinationTripId", travel.getString("destination"));
            }
        }

        Boolean atualiza = false;
        atualiza = verificaObjeto("agency", "agency", "nameAgency", "name", docObj);
        if (!atualiza) {
            atualiza = verificaObjeto("student" , "studentTripId", "firstName", "firstName", docObj);
            verificaObjeto("student", "studentTripId", "lastName", "lastName", docObj);
            docObj.put("nameStudent", docObj.getString("firstName") + " " + docObj.getString("lastName"));
        }else{
            verificaObjeto("student", "studentTripId", "firstName", "firstName", docObj);
            verificaObjeto("student", "studentTripId", "lastName", "lastName", docObj);
            docObj.put("nameStudent", docObj.getString("firstName") + " " + docObj.getString("lastName"));
        }

        if (!atualiza) {
            atualiza = verificaObjeto("city" , "destinationTripId", "nameCity", "name", docObj);
        }else{
            verificaObjeto("city" , "destinationTripId", "nameCity", "name", docObj);
        }

        String total= "";
        if (docObj.get("netGross") != null){
            if (docObj.getString("netGross").equals("net")){
                total = docObj.getString("totalNet");
            }else{
                total = docObj.getString("totalGross");
            }
        }
        if (docObj.get("total") == null) {
            docObj.put("total", total);
            atualiza = true;
        }else {
            if (!docObj.getString("total").equals(total)) {
                docObj.put("total", total);
                atualiza = true;
            }
        }
        String balanceDue= "";
        if (docObj.get("total") != null &&  docObj.get("valuePayed") != null){
            balanceDue = Float.toString(Float.valueOf(docObj.getString("total")) - Float.valueOf(docObj.getString("valuePayed")));
        }
        if (docObj.get("balanceDue") == null) {
            docObj.put("balanceDue", balanceDue);
            atualiza = true;
        }else {
            if (!docObj.getString("balanceDue").equals(balanceDue)) {
                docObj.put("balanceDue", balanceDue);
                atualiza = true;
            }
        }

        if (atualiza){
            docObj.remove("_id");
            doc.put("documento", docObj);
            atualizarCrudTrigger("invoice", doc, setQuery, mongo);
        };
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
        BasicDBObject accomodation = new BasicDBObject();
        accomodation.putAll((Map) docObj.get("accomodation"));
        if (accomodation.get("twinEmail") != null){
            if (!accomodation.getString("twinEmail").equals("")){
                docObj.put("twinId", obterCrudQuery("student", "documento.email", accomodation.getString("twinEmail")).get("_id"));
            }
        }

        Boolean atualiza = verificaObjeto("agency","agency","agencyName","name", docObj);
        if (!atualiza) {
            atualiza = verificaObjeto("school", "school", "schoolName", "name", docObj);
        }else{
            verificaObjeto("school", "school", "schoolName", "name", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("city","destination","destinationName","name", docObj);
        }else{
            verificaObjeto("city","destination","destinationName","name", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("student","studentId","firstName","firstName", docObj);
        }else{
            verificaObjeto("student","studentId","firstName","firstName", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("student","studentId","lastName","lastName", docObj);
        }else{
            verificaObjeto("student","studentId","lastName","lastName", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("student","studentId","birthday","birthday", docObj);
        }else{
            verificaObjeto("student","studentId","birthday","birthday", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("student","studentId","gender","gender", docObj);
        }else{
            verificaObjeto("student","studentId","gender","gender", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("student","studentId","nationality","nationality", docObj);
        }else{
            verificaObjeto("student","studentId","nationality","nationality", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("student","studentId","nationality","nationality", docObj);
        }else{
            verificaObjeto("student","studentId","nationality","nationality", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("student","twinId","firstNameTwin","firstName", docObj);
        }else{
            verificaObjeto("student","twinId","firstNameTwin","firstName", docObj);
        }
        if (!atualiza) {
            atualiza = verificaObjeto("student","twinId","lastNameTwin","lastName", docObj);
        }else{
            verificaObjeto("student","twinId","lastNameTwin","lastName", docObj);
        }

        String nameTwin = "noTwin";
        if (docObj.get("firstNameTwin") != null && docObj.get("lastNameTwin") != null){
            nameTwin =  docObj.getString("firstNameTwin") + " " + docObj.get("lastNameTwin");
        }
        if (docObj.get("nameTwin") == null) {
            docObj.put("nameTwin", nameTwin);
            atualiza = true;
        }else {
            if (!docObj.getString("nameTwin").equals(nameTwin)) {
                docObj.put("nameTwin", nameTwin);
                atualiza = true;
            }
        }

        Long age = commons.calcAge(docObj.getString("birthday"));

        if (docObj.get("age") == null) {
            docObj.put("age", Long.toString(age));
            atualiza = true;
        }else {
            if (!docObj.getString("age").equals(Long.toString(age))) {
                docObj.put("age", Long.toString(age));
                atualiza = true;
            }
        }

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

        BasicDBObject dataAllocate = dataAllocate(docObj,collecion, mongo);
        int daysAllocated = dataAllocate.getInt("daysAllocated");
        int allocations = dataAllocate.getInt("allocations");

        int daysTrip = 0;
        if (accomodation.get("checkIn") != null && accomodation.get("checkOut") != null) {
            daysTrip = commons.difDate(accomodation.getString("checkIn"), accomodation.getString("checkOut"));
        };

        String status = "Available";
        String nextCheckIn = "N/A";
        if (daysAllocated >= daysTrip){
            if (allocations > 1) {
                status = "Multiple";
            }else{
                status = dataAllocate.getString("status");
            }
        }else{
            if (daysAllocated != 0){
                status = "Partial";
                nextCheckIn = dataAllocate.getString("nextCheckIn");
            }
        }

        if (docObj.get("nextCheckIn") == null) {
            docObj.put("nextCheckIn", nextCheckIn);
            atualiza = true;
        }else {
            if (!docObj.getString("nextCheckIn").equals(nextCheckIn)) {
                docObj.put("nextCheckIn", nextCheckIn);
                atualiza = true;
            }
        }

        if (docObj.get("uniqueAlocId") == null) {
            docObj.put("uniqueAlocId", dataAllocate.getString("uniqueAlocId"));
            atualiza = true;
        }else {
            if (!docObj.getString("uniqueAlocId").equals(dataAllocate.getString("uniqueAlocId"))) {
                docObj.put("uniqueAlocId", dataAllocate.getString("uniqueAlocId"));
                atualiza = true;
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
                nextCheckIn = allocation.getString("end").substring(0,10);
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
        if(allocation.get("invite")  == null){
            status = "Allocated";
        }else{
            if(allocation.getString("invite").equals("")){
                status = "Allocated";
            }
            if(allocation.getString("invite").equals("pendent")){
                status = "Offered";
            }
            if(allocation.getString("invite").equals("no")){
                status = "Refused";
            }
            if (allocation.getString("invite").equals("yes")) {
                status = "Confirmed";
            }
        }
        if(allocation.get("allocate")  != null) {
            if (allocation.getString("allocate").equals("confirmed")) {
                status = "Confirmed";
            }
        }
        if(allocation.get("emailSent")  != null) {
            if (allocation.getString("emailSent").equals("sent")) {
                status = "Documents";
            }
        }
        if(allocation.get("checkedIn")  != null) {
            if (allocation.getString("checkedIn").equals("true")) {
                status = "Checked in";
            }
        }
        if(allocation.get("checkedOut")  != null) {
            if (allocation.getString("checkedOut").equals("true")) {
                status = "Checked out";
            }
        }
        if(allocation.get("inspection")  != null) {
            if (allocation.getString("inspection").equals("true")) {
                status = "Inspected";
            }
        }
        if(allocation.get("reviewed")  != null) {
            if (allocation.getString("reviewed").equals("true")) {
                status = "Reviewed";
            }
        }
        if(allocation.get("archived")  != null) {
            if (allocation.getString("archived").equals("true")) {
                status = "Archived";
            }
        }
        if(allocation.get("ativo")  != null) {
            if (allocation.getString("ativo").equals("inativo")) {
                status = "Deleted";
            }
        }

        return status;

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

    public ResponseEntity listaCrudTrigger(String collectionName, BasicDBObject setQuery, BasicDBObject setSort,  MongoClient mongo) throws UnknownHostException, MongoException {

        MongoDatabase db = mongo.getDatabase(commons.getProperties().get("database").toString());
        MongoCollection<Document> collection = db.getCollection(collectionName);

        FindIterable<Document> cursor = collection.find(setQuery).sort(setSort);

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

