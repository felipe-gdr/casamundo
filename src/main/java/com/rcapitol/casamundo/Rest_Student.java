package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoException;

	
@Singleton
// @Lock(LockType.READ)
@Path("/student")

public class Rest_Student {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/obterEmail")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterEmail(@QueryParam("mail") String mail, @QueryParam("actualTrip") String actualTripParam, @QueryParam("idStudent") String idStudentParam, @QueryParam("complementaDados") Boolean complementaDados) {
		Rest_Room rest_room = new Rest_Room();
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			BasicDBObject setQuery = new BasicDBObject();
			if (mail != null && !mail.equals("null")){
		    	setQuery.put("documento.mail", mail);
		    };
			if (idStudentParam != null && !idStudentParam.equals("null")){
				ObjectId idObjectStudent = new ObjectId(idStudentParam);
		    	setQuery.put("_id", idObjectStudent);
		    };
			DBObject cursor = collection.findOne(setQuery);
			JSONObject documento = new JSONObject();
			if (cursor == null){
				mongo.close();
				return null;
			};
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			ObjectId studentObject = (ObjectId) cursor.get("_id");
			String idStudent = studentObject.toString();
			documento.put("_id", idStudent);
			documento.put("documento", obj);
			mongo.close();
			String docStudent = obj.toString();
			JSONObject jsonObject; 
			JSONParser parser = new JSONParser(); 
			try {
				jsonObject = (JSONObject) parser.parse(docStudent);
			    Integer actualTrip = Integer.parseInt((String) jsonObject.get("actualTrip"));
			    String familyName = null;
			    String idRoom = null;
			    if (actualTrip != null){
					List trips = (List) jsonObject.get("trips");
					JSONObject jsonTrip = (JSONObject) trips.get(actualTrip);
					familyName = (String) jsonTrip.get("familyName");
					idRoom = (String) jsonTrip.get("idRoom");
			    };
				if (familyName != null && !familyName.equals("")){
					Mongo mongoFamily = new Mongo();
					DB dbFamily = (DB) mongoFamily.getDB("documento");
					DBCollection collectionFamily = dbFamily.getCollection("family");
					BasicDBObject searchQueryFamily = new BasicDBObject("documento.familyName", familyName);
					DBObject cursorFamily = collectionFamily.findOne(searchQueryFamily);
					if (cursorFamily != null){
						BasicDBObject objFamily = (BasicDBObject) cursorFamily.get("documento");
						BasicDBObject objContact = (BasicDBObject) objFamily.get("contact");
						documento.put("contact", objContact);
						List rooms = (List) objFamily.get("rooms");
						documento.put("rooms", rooms);
					}else{
		    			JSONObject docFamily = new JSONObject();
						docFamily.put("contact.firstName", "");
						docFamily.put("contact.lastName", "");
						docFamily.put("contact.gender", "");
						docFamily.put("contact.email", "");
						docFamily.put("contact.phoneNumber", "");
						docFamily.put("contact.mobilePhoneNumber", "");						
						documento.put("rooms", "");
						documento.put("family", docFamily);						
					}
					mongoFamily.close();
				}else{
	    			JSONObject docFamily = new JSONObject();
					docFamily.put("contact.firstName", "");
					docFamily.put("contact.lastName", "");
					docFamily.put("contact.gender", "");
					docFamily.put("contact.email", "");
					docFamily.put("contact.phoneNumber", "");
					docFamily.put("contact.mobilePhoneNumber", "");						
					documento.put("family", docFamily);
					documento.put("rooms", "");
				};
				if (idRoom != null && !idRoom.equals("")){
					Mongo mongoRoom = new Mongo();
					DB dbRoom = (DB) mongoRoom.getDB("documento");
					DBCollection collectionRoom = dbRoom.getCollection("room");
					BasicDBObject searchQueryRoom = new BasicDBObject("documento.beds.occupancies.idStudent", idStudent);
					DBCursor cursorRoom = collectionRoom.find(searchQueryRoom);
					JSONArray rooms = new JSONArray();
					if (cursorRoom != null){
						while (((Iterator<DBObject>) cursorRoom).hasNext()) {
							BasicDBObject objRoom = (BasicDBObject) ((Iterator<DBObject>) cursorRoom).next();
							rooms.add(objRoom);
						};
					};
					documento.put("rooms", rooms);
				};
				if (actualTripParam != null){
					JSONArray objOccupancy = rest_room.carregaAlocacoes(idStudent, actualTripParam, "", "");
					documento.put("rooms_actualTrip", objOccupancy);
				};
				if (complementaDados != null){
					JSONArray objOccupancy_all = rest_room.carregaAlocacoes(idStudent, "" , "", "");
					List trips = (List) jsonObject.get("trips");
					BasicDBObject newDocumento = (BasicDBObject) documento.get("documento");
					newDocumento.remove("trips");
					JSONArray newTrips = new JSONArray();
					int y = 0;
					while (y < trips.size()) {
						JSONObject jsonTrip = (JSONObject) trips.get(y);
						String agencyName = (String) jsonTrip.get("agencyName");
						if (agencyName != null && !agencyName.equals("")){
							JSONObject agencyData = agencyData(agencyName);
							if (agencyData != null){
								jsonTrip.put("agency", agencyData);
							};
						};
						String schoolName = (String) jsonTrip.get("schoolName");
						if (schoolName != null && !schoolName.equals("")){
							JSONObject schoolData = schoolData(schoolName);
							if (schoolData != null){
								jsonTrip.put("school", schoolData);
							};
						};
						newTrips.add(jsonTrip);
						if (jsonTrip.get("familyName") != null && !jsonTrip.get("familyName").equals("")){
							JSONObject jsonOccupancy = new JSONObject();
							JSONObject occupancy = new JSONObject();
							occupancy.put ("idStudent", idStudent);
							occupancy.put ("actualTrip", y);
							occupancy.put ("startOccupancy", jsonTrip.get("start"));
							occupancy.put ("endOccupancy", jsonTrip.get("end"));
							occupancy.put ("local", "family");
							occupancy.put ("local", "family");
							occupancy.put ("local", "family");
							occupancy.put ("local", "family");
							occupancy.put ("dorm", "");
							occupancy.put ("unit", "");
							occupancy.put ("room", "");
							occupancy.put ("bed", "");
							occupancy.put ("familyName", jsonTrip.get("familyName"));
							jsonOccupancy.put("occupancy_all", occupancy);
							objOccupancy_all.add(jsonOccupancy);
						};
						++y;
					};
					documento.put("accommodations", objOccupancy_all);
					newDocumento.put("trips", newTrips);
					documento.put("documento", newDocumento);
				};
				return documento;
			} catch (ParseException e) {
				e.printStackTrace();
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};

	@SuppressWarnings("unchecked")
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluirStudent(Student student)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(student);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			mapJson = mapper.readValue(jsonDocumento, HashMap.class);
			JSONObject documento = new JSONObject();
			documento.putAll(mapJson);
			DBObject insert = new BasicDBObject(documento);
			collection.insert(insert);
			mongo.close();
			return Response.status(200).entity(documento).build();
		} catch (UnknownHostException e) {
			System.out.println("UnknownHostException");
			e.printStackTrace();
		} catch (MongoException e) {
			System.out.println("MongoException");
			e.printStackTrace();
		} catch (JsonMappingException e) {
			System.out.println("JsonMappingException");
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("IOException");
			e.printStackTrace();
		}
		return Response.status(500).build();
		
	};
	@SuppressWarnings({ "unchecked", "unused" })
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AtualizarDocumento(Student doc)  {
		String mail = doc.documento.mail;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(doc);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			try {
				mapJson = mapper.readValue(jsonDocumento, HashMap.class);
				JSONObject documento = new JSONObject();
				documento.putAll(mapJson);
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
				BasicDBObject searchQuery = new BasicDBObject("documento.mail", mail);
				DBObject cursor = collection.findAndModify(searchQuery,
		                null,
		                null,
		                false,
		                update,
		                true,
		                false);
				mongo.close();
				return Response.status(200).build();
			} catch (JsonParseException e) {
				e.printStackTrace();
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};
	
	@SuppressWarnings({ "unchecked", "unused", "rawtypes" })
	@Path("/incluirNewTrip")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response IncluiTrip(JSONObject newTrip)  {
		String idStudentString = (String) newTrip.get("idStudent");
		ObjectId idStudent = new ObjectId(idStudentString);
		Mongo mongo;
			try {
				mongo = new Mongo();
				DB db = (DB) mongo.getDB("documento");
				DBCollection collection = db.getCollection("student");
				BasicDBObject searchQuery = new BasicDBObject("_id", idStudent);
				DBObject cursor = collection.findOne(searchQuery);
				BasicDBObject obj = (BasicDBObject) cursor.get("documento");
				if (cursor == null){
					mongo.close();
					return null;
				};
				JSONParser parser = new JSONParser(); 
				List trips = (List) obj.get("trips");
				String documento = JSONObject.toJSONString(newTrip);
				try {
					JSONObject trip = (JSONObject) parser.parse(documento);
					trips.add(trip.get("trip"));
					obj.remove("trips");
					obj.put("trips", trips);
					obj.put("actualTrip", Integer.toString(trips.size() - 1));
					BasicDBObject objUpdate = new BasicDBObject();
					objUpdate.put ("documento", obj);
					BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(objUpdate));
					searchQuery = new BasicDBObject("_id", idStudent);
					cursor = collection.findAndModify(searchQuery,
			                null,
			                null,
			                false,
			                update,
			                true,
			                false);
					mongo.close();
					return Response.status(200).build();
				} catch (ParseException e) {
					e.printStackTrace();
				}
			} catch (UnknownHostException e) {
				e.printStackTrace();
			} catch (MongoException e) {
				e.printStackTrace();
			};
			return null;
	};
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterStudents(@QueryParam("destination") String destination, @QueryParam("accommodation") String accommodation,@QueryParam("filters") String filters) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			BasicDBObject setQuery = new BasicDBObject();
			if(!destination.equals("all")){
		    	setQuery.put("documento.trips.destination", destination);
		    };
		    if (accommodation != null){
				if(!accommodation.equals("all")){
			    	setQuery.put("documento.trips.accommodation", accommodation);
			    };
			};

			BasicDBObject setSort = new BasicDBObject();
			setSort.put("documento.firstName", 1);

			DBCollection collection = db.getCollection("student");
			
			DBCursor cursor = collection.find(setQuery).sort(setSort);
			JSONArray documentos = new JSONArray();
			int i = 0;
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objStudent = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objStudent.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
				    Integer actualTrip = Integer.parseInt((String) jsonObject.get("actualTrip"));
					List trips = (List) jsonObject.get("trips");
				    if (actualTrip != null){
						int y = 0;
						while (y < trips.size()) {
							JSONObject jsonTrip = (JSONObject) trips.get(y);
							JSONObject jsonDocumento = new JSONObject();
							jsonDocumento.put("_id", objStudent.getString("_id"));
							jsonDocumento.put("lastDestination", jsonObject.get("lastDestination"));
						    jsonDocumento.put("mail", jsonObject.get("mail"));
						    jsonDocumento.put("celPhone", jsonObject.get("celPhone"));
						    jsonDocumento.put("phone", jsonObject.get("phone")); 
						    jsonDocumento.put("lastName", jsonObject.get("lastName")); 
						    jsonDocumento.put("firstName", jsonObject.get("firstName"));
						    jsonDocumento.put("birthDay", jsonObject.get("birthDay")); 
						    jsonDocumento.put("gender", jsonObject.get("gender")); 
						    jsonDocumento.put("nationality", jsonObject.get("nationality"));
						    jsonDocumento.put("firstLanguage", jsonObject.get("firstLanguage"));
						    jsonDocumento.put("profession", jsonObject.get("profession"));
						    jsonDocumento.put("englishLevel", jsonObject.get("englishLevel"));
						    jsonDocumento.put("streetNumber", jsonObject.get("streetNumber"));
						    jsonDocumento.put("streetName", jsonObject.get("streetName"));
						    jsonDocumento.put("state", jsonObject.get("state"));
						    jsonDocumento.put("postalCode", jsonObject.get("postalCode"));
						    jsonDocumento.put("city", jsonObject.get("city"));
						    jsonDocumento.put("country", jsonObject.get("country"));
						    jsonDocumento.put("secondaryTelephone", jsonObject.get("secondaryTelephone"));
						    jsonDocumento.put("emergencyContactName", jsonObject.get("emergencyContactName"));
						    jsonDocumento.put("emergencyContactPhone", jsonObject.get("emergencyContactPhone"));
						    jsonDocumento.put("emergencyContactMail", jsonObject.get("emergencyContactMail"));
						    jsonDocumento.put("emergencyContactMail", jsonObject.get("emergencyContactMail"));
							jsonDocumento.put("notes", jsonObject.get("notes"));
						    jsonDocumento.put("actualTrip", y);
						    jsonDocumento.put("invoices", addInvoice (objStudent.getString("_id"), y));
							if (addTrip (jsonTrip, jsonDocumento, filters)){
								documentos.add(jsonDocumento);
								++i;
							};
							++y;
						};
				    };
					if (i > 21){
						break;
					};
				} catch (ParseException e) {
					e.printStackTrace();
				}
			};
			mongo.close();
			return documentos;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;
	};

	@SuppressWarnings({ "unchecked", "unused", "rawtypes" })
	@Path("/changeStatus")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String ChangeStatus(@QueryParam("params") String params)  {
		String array[] = new String[6];
		array = params.split("/");
		String mail = array [0].split(":")[1]; 
		Integer indexTrip = Integer.parseInt((String) array [1].split(":")[1]); 
		String status = array [2].split(":")[1];
		String familyName = array [3].split(":")[1];
		String emailFamily = array [4].split(":")[1];
		Integer roomSingle = Integer.parseInt((String) array [5].split(":")[1]);
		Integer roomCouple = Integer.parseInt((String) array [6].split(":")[1]);
		String reason = array [7].split(":")[1];
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			BasicDBObject searchQuery = new BasicDBObject("documento.mail", mail);
			DBObject cursor = collection.findOne(searchQuery);
			JSONParser parser = new JSONParser(); 
			BasicDBObject objStudent = (BasicDBObject) cursor;
			String documento = objStudent.getString("documento");
			JSONObject jsonObject; 
		    String occupancy = null;
		    int start = 0;
		    int end = 0;
			try {
				jsonObject = (JSONObject) parser.parse(documento);
			    Integer actualTrip = Integer.parseInt((String) jsonObject.get("actualTrip"));
			    if (actualTrip != null){
					List trips = (List) jsonObject.get("trips");
					JSONObject jsonTrip = (JSONObject) trips.get(actualTrip);
					occupancy = (String) jsonTrip.get("occupancy");
				    start = Integer.parseInt((String) jsonTrip.get("start"));
				    end = Integer.parseInt((String) jsonTrip.get("end"));
			    };
			} catch (ParseException e1) {
				e1.printStackTrace();
			};
			try {
				jsonObject = (JSONObject) parser.parse("{\"documento.trips." + indexTrip + ".status\":\"" + status + "\"}");
				String jsonDocumento = documento;
				Map<String,String> mapJson = new HashMap<String,String>();
				ObjectMapper mapper = new ObjectMapper();
				try {
					mapJson = mapper.readValue(jsonDocumento, HashMap.class);
					JSONObject docJson = new JSONObject();
					docJson.putAll(mapJson);
					BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(jsonObject));
					BasicDBObject searchQueryUpdate = new BasicDBObject("documento.mail", mail);
					DBObject cursorUpdate = collection.findAndModify(searchQueryUpdate,
			                null,
			                null,
			                false,
			                update,
			                true,
			                false);
					mongo.close();
					String literal = "Confirmed";
					if (status.equals(literal)){
						CrudFamily crudFamily = new CrudFamily();
//						crudFamily.updateRoom(familyName, mail, occupancy, roomSingle, roomCouple, start, end);
					};
					TemplateEmail template = new TemplateEmail(); 
					String studentName = (String) docJson.get("firstName") + " " + (String) docJson.get("lastName");
					String emailStudent = (String) docJson.get("mail");
					SendEmailHtml sendEmailHtml = new SendEmailHtml();
					String message = "";
					String subject = "";
					if (reason.equals("Accept")){
						message = "Family " + familyName + " confirm offer of student " + studentName;
						subject = "Family "  + familyName + " confirm offer";
					};
					if (reason.equals("NoRoom")){
						message = "Family " + familyName + " decline offer because don't have room available for student " + studentName;
						subject = "Family "  + familyName + " don't have room";
					};
					if (reason.equals("Refuse")){
						message = "Family " + familyName + " don't accept student " + studentName;
						subject = "Family "  + familyName + " don't accept student";
					};
					if (reason.equals("DocsOk")){
						message = "Confirmation letter sent to a sutdent " + studentName;
						subject = "Confirmation letter sent to a sutdent " + studentName;
					};
					if (reason.equals("InHouse")){
						message = "Student " + studentName + " arrived and he is in house";
						subject = "Student " + studentName + " in house";
					};
					if (reason.equals("Cancel")){
						message = "Student " + studentName + " cancel accommodation";
						subject = "Student " + studentName + " cancel";
					};
					if (reason.equals("Terminated")){
						message = "Student " + studentName + " finished accommodation";
						subject = "Student " + studentName + " finished";
					};
					sendEmailHtml.sendEmailHtml("smtp.gmail.com", 
							"grenneglr@gmail.com", 
							"Hefega0701", 
							"grenneglr@gmail.com", 
							"grenneglr@gmail.com", 
							subject, 
							template.emailHtml(
									familyName, 
									emailFamily, 
									studentName, 
									emailStudent, 
									subject, 
									message));

					return "Thanks for your decision";
				} catch (JsonParseException e) {
					e.printStackTrace();
				} catch (JsonMappingException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
			} catch (ParseException e) {
				e.printStackTrace();
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}
		return null;		
	};
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private Boolean addTrip (JSONObject jsonTrip, JSONObject jsonDocumento, String filters){
	    String agencyName = null;
	    String schoolName = null;
	    String agencySigla = null;
	    String schoolSigla = null;
	    String familyName = null;
	    String status = null;

	    jsonDocumento.remove("trip");
	    jsonDocumento.put("trip", jsonTrip);
		status = (String) jsonTrip.get("status");
		agencyName = (String) jsonTrip.get("agencyName");
		schoolName = (String) jsonTrip.get("schoolName");
		familyName = (String) jsonTrip.get("familyName");
		if (agencyName != null && !agencyName.equals("")){
			Mongo mongoAgency;
			try {
				mongoAgency = new Mongo();
				DB dbAgency = (DB) mongoAgency.getDB("documento");
				DBCollection collectionAgency = dbAgency.getCollection("agency");
				BasicDBObject searchQueryAgency = new BasicDBObject("documento.name", agencyName);
				DBObject cursorAgency = collectionAgency.findOne(searchQueryAgency);
				if (cursorAgency != null){
					BasicDBObject obj = (BasicDBObject) cursorAgency.get("documento");
					agencySigla = (String) obj.get("agencySigla");
					jsonDocumento.put("agency", obj);
				}else{
	    			JSONObject docAgency = new JSONObject();
					docAgency.put("name", agencyName);
					docAgency.put("agencySigla", agencyName);
					docAgency.put("celPhone", "");
					docAgency.put("phone", "");
					docAgency.put("email", "");						
					jsonDocumento.put("agency", docAgency);
				};
				mongoAgency.close();
			} catch (UnknownHostException e) {
				e.printStackTrace();
			} catch (MongoException e) {
				e.printStackTrace();
			}
		}else{
			JSONObject docAgency = new JSONObject();
			docAgency.put("name", "");
			docAgency.put("agencySigla", "");
			docAgency.put("celPhone", "");
			docAgency.put("phone", "");
			docAgency.put("email", "");						
			jsonDocumento.put("agency", docAgency);
		};
		if (schoolName != null && !schoolName.equals("")){
			Mongo mongoSchool;
			try {
				mongoSchool = new Mongo();
				DB dbSchool = (DB) mongoSchool.getDB("documento");
				DBCollection collectionSchool = dbSchool.getCollection("school");
				BasicDBObject searchQuerySchool = new BasicDBObject("documento.name", schoolName);
				DBObject cursorSchool = collectionSchool.findOne(searchQuerySchool);
				if (cursorSchool != null){
					BasicDBObject obj = (BasicDBObject) cursorSchool.get("documento");
					schoolSigla = (String) obj.get("sigla");
					jsonDocumento.put("school", obj);
				}else{
	    			JSONObject docSchool = new JSONObject();
					docSchool.put("name", schoolName);
					docSchool.put("sigla", schoolName);
					docSchool.put("celPhone", "");
					docSchool.put("phone", "");
					docSchool.put("email", "");						
					jsonDocumento.put("school", docSchool);							
				}
				mongoSchool.close();
			} catch (UnknownHostException e) {
				e.printStackTrace();
			} catch (MongoException e) {
				e.printStackTrace();
			}
		}else{
			JSONObject docSchool = new JSONObject();
			docSchool.put("name", "");
			docSchool.put("sigla", "");
			docSchool.put("celPhone", "");
			docSchool.put("phone", "");
			docSchool.put("email", "");						
			jsonDocumento.put("school", docSchool);
		};
		if (familyName != null && !familyName.equals("")){
			Mongo mongoFamily;
			try {
				mongoFamily = new Mongo();
				DB dbFamily = (DB) mongoFamily.getDB("documento");
				DBCollection collectionSchool = dbFamily.getCollection("family");
				BasicDBObject searchQueryFamily = new BasicDBObject("documento.familyName", familyName);
				DBObject cursorFamily = collectionSchool.findOne(searchQueryFamily);
				if (cursorFamily != null){
					BasicDBObject obj = (BasicDBObject) cursorFamily.get("documento");
					BasicDBObject objContact = (BasicDBObject) obj.get("contact");
					jsonDocumento.put("familyContact", objContact);
					List rooms = (List) obj.get("rooms");
					jsonDocumento.put("rooms", rooms);
				}else{
	    			JSONObject docFamily = new JSONObject();
	    			JSONObject docRooms = new JSONObject();
					docFamily.put("firstName", "");
					docFamily.put("lastName", "");
					docFamily.put("gender", "");
					docFamily.put("email", "");
					docFamily.put("phoneNumber", "");
					docFamily.put("mobilePhoneNumber", "");						
					jsonDocumento.put("familyContact", docFamily);
					jsonDocumento.put("rooms", docRooms);							
				}
				mongoFamily.close();
			} catch (UnknownHostException e) {
				e.printStackTrace();
			} catch (MongoException e) {
				e.printStackTrace();
			}
		}else{
			JSONObject docFamily = new JSONObject();
			JSONObject docRooms = new JSONObject();
			docFamily.put("firstName", "");
			docFamily.put("lastName", "");
			docFamily.put("gender", "");
			docFamily.put("email", "");
			docFamily.put("phoneNumber", "");
			docFamily.put("mobilePhoneNumber", "");						
			jsonDocumento.put("contact", docFamily);
			jsonDocumento.put("rooms", docRooms);
		};
		if (!filters.equals("null")){
			Boolean filter_ok = checkFilters (filters, jsonDocumento, agencySigla, schoolSigla);
			if (filter_ok){
				return true;
			};
		}else{
			if (!status.equals("Checked out")){
				return true;
			};
		};

		return false;
		
	};
		
	@SuppressWarnings({ "unchecked" })
	private JSONObject agencyData (String agencyName){

		Mongo mongoAgency;
		try {
			JSONObject docAgency = new JSONObject();
			mongoAgency = new Mongo();
			DB dbAgency = (DB) mongoAgency.getDB("documento");
			DBCollection collectionAgency = dbAgency.getCollection("agency");
			BasicDBObject searchQueryAgency = new BasicDBObject("documento.name", agencyName);
			DBObject cursorAgency = collectionAgency.findOne(searchQueryAgency);
			if (cursorAgency != null){
				BasicDBObject obj = (BasicDBObject) cursorAgency.get("documento");
				docAgency.put("name", (String) obj.get("name"));
				docAgency.put("sigla", (String) obj.get("agencySigla"));
				docAgency.put("phone", (String) obj.get("agencyPhone"));
				docAgency.put("email", (String) obj.get("agencyEmail"));						
			};
			mongoAgency.close();
			return docAgency;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		};
		return null;
		
	};
	
@SuppressWarnings({ "unchecked" })
private JSONObject schoolData (String schoolName){

	Mongo mongoSchool;
	try {
		mongoSchool = new Mongo();
		DB dbSchool = (DB) mongoSchool.getDB("documento");
		DBCollection collectionSchool = dbSchool.getCollection("school");
		BasicDBObject searchQuerySchool = new BasicDBObject("documento.name", schoolName);
		DBObject cursorSchool = collectionSchool.findOne(searchQuerySchool);
		JSONObject docSchool = new JSONObject();
		if (cursorSchool != null){
			BasicDBObject obj = (BasicDBObject) cursorSchool.get("documento");
			docSchool.put("name", (String) obj.get("name"));
			docSchool.put("sigla", (String) obj.get("sigla"));
			docSchool.put("celPhone", (String) obj.get("celPhone"));
			docSchool.put("phone", (String) obj.get("phone"));
			docSchool.put("email", (String) obj.get("email"));						
		}
		mongoSchool.close();
		return docSchool;
	} catch (UnknownHostException e) {
		e.printStackTrace();
	} catch (MongoException e) {
		e.printStackTrace();
	};
	return null;
	
};

	@SuppressWarnings("rawtypes")
	public Boolean checkFilters (String filters, JSONObject objJson, String agencySigla, String schoolSigla){
		JSONObject jsonTrip =  (JSONObject) objJson.get("trip");
		Boolean response = true;
		String array[] = new String[24];
		array = filters.split(",");
		Commons commons = new Commons();
		int i = 0;
		while (i < array.length) {
			String element[] = new String[2];
			element = array[i].split (":");
			if (element.length > 1){
			    if (element[0].equals("filter_student")){
					if (((String) objJson.get("firstName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						if (((String) objJson.get("lastName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
					};
			    };
			    if (element[0].equals("filter_gender")){
					if (element[1].toLowerCase().equals("male") ){
						if (!((String) objJson.get("gender")).toLowerCase().equals("male")){
							response = false;
						};
					}else{
						if (element[1].toLowerCase().equals("female") ){
							if (!((String) objJson.get("gender")).toLowerCase().equals("female")){
								response = false;
							};
						}else{
							response = false;
						};
					};
			    };
			    if (element[0].equals("filter_nationality")){
				    if (objJson.get("nationality") != null) {
						if (((String) objJson.get("nationality")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_age_from")){
			    	Long ageFrom = commons.calcAge((String)objJson.get("birthDay"));
					if (ageFrom <= Integer.parseInt((String) element[1])){
						response = false;
					};
			    };
			    if (element[0].equals("filter_age_to")){
			    	Long ageTo = commons.calcAge((String)objJson.get("birthDay"));
					if (ageTo >= Integer.parseInt((String) element[1])){
						response = false;
					};
			    };
			    if (element[0].equals("filter_check_in")){
					if (commons.convertToCalendar((String)jsonTrip.get("start")).before(commons.convertToCalendar(element[1].replace("-", ""))) ){
						response = false;
					};
			    };
			    if (element[0].equals("filter_check_out")){
					if (commons.convertToCalendar((String)jsonTrip.get("start")).after(commons.convertToCalendar(element[1].replace("-", ""))) ){
						response = false;
					};
			    };
			    if (element[0].equals("filter_status")){
				    if (jsonTrip.get("status") != null) {
						if (((String) jsonTrip.get("status")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_payment")){
				    if (jsonTrip.get("payment") != null) {
						if (((String) jsonTrip.get("payment")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_visa")){
//					if (((String) jsonTrip.get("visa")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
//						response = false;
//					};
			    };
			    if (element[0].equals("filter_flight")){
				    if (jsonTrip.get("arrivalFlightNumber") != null) {
						if (((String) jsonTrip.get("arrivalFlightNumber")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_pickup")){
				    if (jsonTrip.get("pickup") != null) {
						if (((String) jsonTrip.get("pickup")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_dropoff")){
				    if (jsonTrip.get("dropoff") != null) {
						if (((String) jsonTrip.get("dropoff")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_school")){
				    if (schoolSigla != null) {
						if (schoolSigla.toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_agent")){
				    if (agencySigla != null) {
						if (agencySigla.toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_host")){
				    if (jsonTrip.get("familyName") != null) {
						if (((String) jsonTrip.get("familyName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_dorm")){
				    if (jsonTrip.get("doorName") != null) {
						if (((String) jsonTrip.get("doorName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_unit")){
				    if (jsonTrip.get("unitName") != null) {
						if (((String) jsonTrip.get("unitName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_room")){
				    if (jsonTrip.get("roomName") != null) {
						if (((String) jsonTrip.get("roomName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_driver")){
//					if (((String) jsonTrip.get("driver")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
//						response = false;
//					};
			    };
			    if (element[0].equals("filter_occupancy")){
				    if (jsonTrip.get("occupancy") != null) {
						if (((String) jsonTrip.get("occupancy")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_private_wc")){
				    if (jsonTrip.get("privateWashroom") != null) {
						if (((String) jsonTrip.get("privateWashroom")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_dogs")){
				    if (jsonTrip.get("liveDogs") != null) {
						if (((String) jsonTrip.get("liveDogs")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_cats")){
				    if (jsonTrip.get("liveCats") != null) {
						if (((String) jsonTrip.get("liveCats")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							response = false;
						};
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_meals")){
				    if (jsonTrip.get("mealPlan") != null) {
				    	ArrayList arrayListMeals = new ArrayList(); 
				    	arrayListMeals = (ArrayList) jsonTrip.get("mealPlan");
				    	Object arrayMeals[] = arrayListMeals.toArray(); 
						Boolean resultMeals = false;
						int w = 0;
						while (w < arrayMeals.length) {
							if (((String) arrayMeals[w]).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							}else{
								resultMeals = true;
							};
							++w;
						};
						if (!resultMeals){
							response = false;
						}
				    }else{
				    	response = false;
				    };
			    };
			    if (element[0].equals("filter_diet")){
				    if (jsonTrip.get("specialDiet") != null) {
				    	ArrayList arrayListDiet = new ArrayList(); 
				    	arrayListDiet = (ArrayList) jsonTrip.get("specialDiet");
				    	Object arrayDiet[] = arrayListDiet.toArray(); 
						Boolean resultDiet = false;
						int z = 0;
						while (z < arrayDiet.length) {
							if (((String) arrayDiet[z]).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							}else{
								resultDiet = true;
							};
							++z;
						};
						if (!resultDiet){
							response = false;
						}
				    }else{
				    	response = false;
				    };
			    };
			};
			++i;
		};
		return response;
	};
	
	@SuppressWarnings("unchecked")
	public JSONArray addInvoice (String idStudent, int actualTrip){
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			BasicDBObject setQuery = new BasicDBObject();
			String actualTripString = String.valueOf(actualTrip);
	    	setQuery.put("documento.idStudent", idStudent);
	    	setQuery.put("documento.actualTrip", actualTripString);

			DBCollection collection = db.getCollection("invoice");
			
			if (idStudent.equals("57e31827c6664a9c60ac0b5d")){
				System.out.println("aqui");
			};
			DBCursor cursor = collection.find(setQuery);
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objStudent = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objStudent.getString("documento");
				JSONObject jsonInvoice; 
				try {
					jsonInvoice = (JSONObject) parser.parse(documento);
					documentos.add(jsonInvoice);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			};
			return documentos;
		} catch (UnknownHostException e) {
			e.printStackTrace();
		} catch (MongoException e) {
			e.printStackTrace();
		}

		return null;
		
	};
	
};
