package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
	public JSONObject ObterEmail(@QueryParam("mail") String mail) {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("student");
			BasicDBObject searchQuery = new BasicDBObject("documento.mail", mail);
			DBObject cursor = collection.findOne(searchQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			documento.put("documento", obj);
			mongo.close();
			String docStudent = obj.toString();
			JSONObject jsonObject; 
			JSONParser parser = new JSONParser(); 
			try {
				jsonObject = (JSONObject) parser.parse(docStudent);
			    Integer tripIndex = Integer.parseInt((String) jsonObject.get("actualTrip"));
			    String familyName = null;
			    if (tripIndex != null){
					List trips = (List) jsonObject.get("trips");
					JSONObject jsonTrip = (JSONObject) trips.get(tripIndex);
					familyName = (String) jsonTrip.get("familyName");
			    };
				if (familyName != null && !familyName.equals("")){
					Mongo mongoFamily = new Mongo();
					DB dbFamily = (DB) mongoFamily.getDB("documento");
					DBCollection collectionSchool = dbFamily.getCollection("family");
					BasicDBObject searchQueryFamily = new BasicDBObject("documento.familyName", familyName);
					DBObject cursorFamily = collectionSchool.findOne(searchQueryFamily);
					BasicDBObject objFamily = (BasicDBObject) cursorFamily.get("documento");
					BasicDBObject objContact = (BasicDBObject) objFamily.get("contact");
					documento.put("contact", objContact);
					List rooms = (List) objFamily.get("rooms");
					documento.put("rooms", rooms);
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
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterStudents(@QueryParam("destination") String destination, @QueryParam("accommodation") String accommodation,@QueryParam("filters") String filters) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			BasicDBObject setQuery = new BasicDBObject();
			String literal = "all";
			if(!destination.equals("all")){
		    	setQuery.put("documento.trips.destination", destination);
		    };
//		    if (accommodation != null){
//		    	setQuery.put("documento.trips.accommodation", accommodation);
//		    };

		    BasicDBObject setSort = new BasicDBObject();
			setSort.put("documento.firstName", 1);

			DBCollection collection = db.getCollection("student");
			
			DBCursor cursor = collection.find(setQuery).sort(setSort);
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objStudent = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objStudent.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
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
				    jsonDocumento.put("actualTrip", jsonObject.get("actualTrip"));
				    jsonDocumento.put("emergencyContactMail", jsonObject.get("emergencyContactMail"));
				    Integer tripIndex = Integer.parseInt((String) jsonObject.get("actualTrip"));
				    String agencyName = null;
				    String schoolName = null;
				    String familyName = null;
				    if (tripIndex != null){
						List trips = (List) jsonObject.get("trips");
						JSONObject jsonTrip = (JSONObject) trips.get(tripIndex);
						jsonDocumento.put("trip", jsonTrip);
						agencyName = (String) jsonTrip.get("agencyName");
						schoolName = (String) jsonTrip.get("schoolName");
						familyName = (String) jsonTrip.get("familyName");
				    };
					if (agencyName != null && !agencyName.equals("")){
						Mongo mongoAgency = new Mongo();
						DB dbAgency = (DB) mongoAgency.getDB("documento");
						DBCollection collectionAgency = dbAgency.getCollection("agency");
						BasicDBObject searchQueryAgency = new BasicDBObject("documento.name", agencyName);
						DBObject cursorAgency = collectionAgency.findOne(searchQueryAgency);
						JSONObject documentoAgency = new JSONObject();
						BasicDBObject obj = (BasicDBObject) cursorAgency.get("documento");
						jsonDocumento.put("agency", obj);
						mongoAgency.close();
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
						Mongo mongoSchool = new Mongo();
						DB dbSchool = (DB) mongoSchool.getDB("documento");
						DBCollection collectionSchool = dbSchool.getCollection("school");
						BasicDBObject searchQuerySchool = new BasicDBObject("documento.name", schoolName);
						DBObject cursorSchool = collectionSchool.findOne(searchQuerySchool);
						JSONObject documentoSchool = new JSONObject();
						BasicDBObject obj = (BasicDBObject) cursorSchool.get("documento");
						jsonDocumento.put("school", obj);
						mongoSchool.close();
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
						Mongo mongoFamily = new Mongo();
						DB dbFamily = (DB) mongoFamily.getDB("documento");
						DBCollection collectionSchool = dbFamily.getCollection("family");
						BasicDBObject searchQueryFamily = new BasicDBObject("documento.familyName", familyName);
						DBObject cursorFamily = collectionSchool.findOne(searchQueryFamily);
						JSONObject documentoFamily = new JSONObject();
						BasicDBObject obj = (BasicDBObject) cursorFamily.get("documento");
						BasicDBObject objContact = (BasicDBObject) obj.get("contact");
						jsonDocumento.put("familyContact", objContact);
						List rooms = (List) obj.get("rooms");
						jsonDocumento.put("rooms", rooms);
						mongoFamily.close();
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
					Boolean filter_ok = checkFilters (filters, jsonDocumento);
					if (filter_ok){
						documentos.add(jsonDocumento);
					};
					mongo.close();
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
		System.out.println("params : " + params);
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
			    Integer tripIndex = Integer.parseInt((String) jsonObject.get("actualTrip"));
			    if (tripIndex != null){
					List trips = (List) jsonObject.get("trips");
					JSONObject jsonTrip = (JSONObject) trips.get(tripIndex);
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
	
	@SuppressWarnings("rawtypes")
	public Boolean checkFilters (String filters, JSONObject objJson){
		JSONObject jsonTrip =  (JSONObject) objJson.get("trip");
		Boolean response = true;
		String array[] = new String[24];
		array = filters.split(",");
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
					if (((String) objJson.get("nationality")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_age_from")){
			    	Long ageFrom = calcAge((String)objJson.get("birthDay"));
					if (ageFrom <= Integer.parseInt((String) element[1])){
						response = false;
					};
			    };
			    if (element[0].equals("filter_age_to")){
			    	Long ageTo = calcAge((String)objJson.get("birthDay"));
					if (ageTo >= Integer.parseInt((String) element[1])){
						response = false;
					};
			    };
			    if (element[0].equals("filter_check_in")){
			    	Long teste1 = calcTime((String)jsonTrip.get("start"));
			    	Long teste2 = calcTime(element[1].replace("-", ""));
			    	System.out.println("in s " + teste1);
			    	System.out.println("in t " + teste2);
					if (calcTime((String)jsonTrip.get("start")) <= calcTime(element[1].replace("-", ""))){
						System.out.println("false");
						response = false;
					};
			    };
			    if (element[0].equals("filter_check_out")){
			    	Long teste3 = calcTime((String)jsonTrip.get("start"));
			    	Long teste4 = calcTime(element[1].replace("-", ""));
			    	System.out.println("out s " + teste3);
			    	System.out.println("out t " + teste4);
					if (calcTime((String)jsonTrip.get("start")) >= calcTime(element[1].replace("-", ""))){
						System.out.println("false");
						response = false;
					};
			    };
			    if (element[0].equals("filter_status")){
					if (((String) jsonTrip.get("status")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_payment")){
					if (((String) jsonTrip.get("payment")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_visa")){
//					if (((String) jsonTrip.get("visa")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
//						response = false;
//					};
			    };
			    if (element[0].equals("filter_flight")){
					if (((String) jsonTrip.get("arrivalFlightNumber")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_pickup")){
					if (((String) jsonTrip.get("pickup")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_dropoff")){
					if (((String) jsonTrip.get("dropoff")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_school")){
					if (((String) jsonTrip.get("schoolName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_agent")){
					if (((String) jsonTrip.get("agencyName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_host")){
					if (((String) jsonTrip.get("familyName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_driver")){
//					if (((String) jsonTrip.get("driver")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
//						response = false;
//					};
			    };
			    if (element[0].equals("filter_occupancy")){
					if (((String) jsonTrip.get("occupancy")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_private_wc")){
					if (((String) jsonTrip.get("privateWashroom")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_dogs")){
					if (((String) jsonTrip.get("liveDogs")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_cats")){
					if (((String) jsonTrip.get("liveCats")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_meals")){
			    	ArrayList arrayListMeals = new ArrayList(); 
			    	arrayListMeals = (ArrayList) jsonTrip.get("mealPlan");
			    	Object arrayMeals[] = arrayListMeals.toArray(); 
					Boolean resultMeals = true;
					int w = 0;
					while (w < arrayMeals.length) {
						if (((String) arrayMeals[w]).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							resultMeals = false;
						};
						++w;
					};
					if (!resultMeals){
						response = false;
					}
			    };
			    if (element[0].equals("filter_diet")){
			    	ArrayList arrayListDiet = new ArrayList(); 
			    	arrayListDiet = (ArrayList) jsonTrip.get("specialDiet");
			    	Object arrayDiet[] = arrayListDiet.toArray(); 
					Boolean resultDiet = true;
					int z = 0;
					while (z < arrayDiet.length) {
						if (((String) arrayDiet[z]).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
							resultDiet = false;
						};
						++z;
					};
					if (!resultDiet){
						response = false;
					}
			    };
			};
			++i;
		};
		return response;
	};
		
	public Long calcAge (String birthDate){
		
		DateFormat df = new SimpleDateFormat ("dd/MM/yyyy");
		try {
			Date d1 = df.parse (convertDateMes (birthDate));
			Date d2 = new Date(System.currentTimeMillis()); 
			long dt = (d2.getTime() - d1.getTime()) + 3600000;
			return ((dt / 86400000L) / 365L);
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return null;
	};
	
	public Long calcTime (String date){
		System.out.println("date=" + date);
		DateFormat df = new SimpleDateFormat ("dd/MM/yyyy");
		try {
			Date d1 = df.parse (convertDateMes (date));
			long dt = d1.getTime();
			return dt;
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return null;
	};

	public String convertDateMes (String strDate){
		String mesNumber = "01";
		String mesAlpha = strDate.substring	(2, 5);
	    if (mesAlpha.equals("Jan")){
	    	mesNumber = "01";
	    };
	    if (mesAlpha.equals("Feb")){
	    	mesNumber = "02";
	    };
	    if (mesAlpha.equals("Mar")){
	    	mesNumber = "03";
	    };
	    if (mesAlpha.equals("Apr")){
	    	mesNumber = "04";
	    };
	    if (mesAlpha.equals("May")){
	    	mesNumber = "05";
	    };
	    if (mesAlpha.equals("Jun")){
	    	mesNumber = "06";
	    };
	    if (mesAlpha.equals("Jul")){
	    	mesNumber = "07";
	    };
	    if (mesAlpha.equals("Aug")){
	    	mesNumber = "08";
	    };
	    if (mesAlpha.equals("Sep")){
	    	mesNumber = "09";
	    };
	    if (mesAlpha.equals("Out")){
	    	mesNumber = "10";
	    };
	    if (mesAlpha.equals("Nov")){
	    	mesNumber = "11";
	    };
	    if (mesAlpha.equals("Dec")){
	    	mesNumber = "12";
	    };
		return strDate.substring(0, 2) + "/" + mesNumber + "/" + strDate.substring(5, 9);
	}
};
