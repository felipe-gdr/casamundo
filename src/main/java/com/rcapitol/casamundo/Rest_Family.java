package com.rcapitol.casamundo;

import java.io.IOException;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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
@Path("/family")

public class Rest_Family {

	@SuppressWarnings("unchecked")
	@Path("/obterFamilyName")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject ObterName(@QueryParam("familyName") String familyName) {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("family");
			BasicDBObject searchQuery = new BasicDBObject("documento.familyName", familyName);
			DBObject cursor = collection.findOne(searchQuery);
			JSONObject documento = new JSONObject();
			BasicDBObject obj = (BasicDBObject) cursor.get("documento");
			documento.put("documento", obj);
			mongo.close();
			return documento;
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
	public Response IncluirFamily(Family family	)  {
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("family");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(family);
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
	@SuppressWarnings("unchecked")
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response AtualizarDocumento(Family doc) {
		String familyName = doc.documento.familyName;
		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");
			DBCollection collection = db.getCollection("family");
			Gson gson = new Gson();
			String jsonDocumento = gson.toJson(doc);
			Map<String,String> mapJson = new HashMap<String,String>();
			ObjectMapper mapper = new ObjectMapper();
			try {
				mapJson = mapper.readValue(jsonDocumento, HashMap.class);
				JSONObject documento = new JSONObject();
				documento.putAll(mapJson);
				BasicDBObject update = new BasicDBObject("$set", new BasicDBObject(documento));
				BasicDBObject searchQuery = new BasicDBObject("documento.familyName", familyName);
				@SuppressWarnings("unused")
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
	@SuppressWarnings("unchecked")
	@Path("/lista")	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public JSONArray ObterFamilies(@QueryParam("destination") String destination,@QueryParam("filters") String filters) {

		Mongo mongo;
		try {
			mongo = new Mongo();
			DB db = (DB) mongo.getDB("documento");

			BasicDBObject setQuery = new BasicDBObject();
			if (destination != null){
				if(!destination.equals("all")){
			    	setQuery.put("documento.address.destination", destination);
			    };
			};
			BasicDBObject setSort = new BasicDBObject();
			setSort.put("documento.familyName", 1);

			DBCollection collection = db.getCollection("family");
			
			DBCursor cursor = collection.find(setQuery).sort(setSort);;
			JSONArray documentos = new JSONArray();
			while (((Iterator<DBObject>) cursor).hasNext()) {
				JSONParser parser = new JSONParser(); 
				BasicDBObject objFamily = (BasicDBObject) ((Iterator<DBObject>) cursor).next();
				String documento = objFamily.getString("documento");
				try {
					JSONObject jsonObject; 
					jsonObject = (JSONObject) parser.parse(documento);
					JSONObject jsonDocumento = new JSONObject();
					jsonDocumento.put("_id", objFamily.getString("_id"));
					jsonDocumento.put("familyName", jsonObject.get("familyName"));
					jsonDocumento.put("type", jsonObject.get("type"));
					jsonDocumento.put("numbersBedroom", jsonObject.get("numbersBedroom"));
					jsonDocumento.put("numbersStudentsBedroom", jsonObject.get("numbersStudentsBedroom"));
					jsonDocumento.put("numberPrivateWashroom", jsonObject.get("numberPrivateWashroom"));
					jsonDocumento.put("offerInternet", jsonObject.get("offerInternet"));
					jsonDocumento.put("haveDogs", jsonObject.get("haveDogs"));
					jsonDocumento.put("haveCats", jsonObject.get("numbersStudentsBedroom"));
					jsonDocumento.put("haveOtherPet", jsonObject.get("haveOtherPet"));
					jsonDocumento.put("background", jsonObject.get("background"));
					jsonDocumento.put("howLongHaveYouBeen", jsonObject.get("howLongHaveYouBeen"));
					jsonDocumento.put("acceptSmokeInsideHome", jsonObject.get("acceptSmokeInsideHome"));
					jsonDocumento.put("preferAgeStudent", jsonObject.get("preferAgeStudent"));
					jsonDocumento.put("preferGenderStudent", jsonObject.get("preferGenderStudent"));
					jsonDocumento.put("mealPlan", jsonObject.get("mealPlan"));
					jsonDocumento.put("specialDiet", jsonObject.get("specialDiet"));
					jsonDocumento.put("dontHostNationality", jsonObject.get("dontHostNationality"));
				    jsonDocumento.put("contact", jsonObject.get("contact"));
				    jsonDocumento.put("address", jsonObject.get("address"));
				    jsonDocumento.put("notes", jsonObject.get("notes"));
			    	if (destination != null){
					    jsonDocumento.put("mealPlan", jsonObject.get("mealPlan"));
					    jsonDocumento.put("specialDiet", jsonObject.get("specialDiet"));
					    jsonDocumento.put("haveDogs", jsonObject.get("haveDogs"));
					    jsonDocumento.put("haveCats", jsonObject.get("haveCats"));
					    jsonDocumento.put("preferGenderStudent", jsonObject.get("preferGenderStudent"));
					    jsonDocumento.put("acceptSmokeStudent", jsonObject.get("acceptSmokeStudent"));
					    jsonDocumento.put("dontHostNationality", jsonObject.get("dontHostNationality"));
					    jsonDocumento.put("preferAgeStudent", jsonObject.get("preferAgeStudent"));
					    jsonDocumento.put("rooms", jsonObject.get("rooms"));
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
	
	@SuppressWarnings("rawtypes")
	public Boolean checkFilters (String filters, JSONObject objJson){
		Boolean response = true;
		String array[] = new String[24];
		array = filters.split(",");
		int i = 0;
		while (i < array.length) {
			String element[] = new String[2];
			element = array[i].split (":");
			if (element.length > 1){
			    if (element[0].equals("filter_family")){
					if (((String) objJson.get("familyName")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    
			    if (element[0].equals("filter_mainIntersection")){
			    	JSONObject jsonAddress =  (JSONObject) objJson.get("address");
			    	if (((String) jsonAddress.get("mainIntersection")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_subway")){
			    	JSONObject jsonAddress =  (JSONObject) objJson.get("address");
			    	if (((String) jsonAddress.get("subwayStation")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_internet")){
			    	if (((String) objJson.get("offerInternet")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_dogs")){
			    	if (((String) objJson.get("haveDogs")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_cats")){
			    	if (((String) objJson.get("haveCats")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_other")){
			    	if (((String) objJson.get("haveOtherPet")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_background")){
			    	if (((String) objJson.get("background")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_inCanada")){
			    	if (((String) objJson.get("howLongHaveYouBeen")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_smoke")){
			    	if (((String) objJson.get("acceptSmokeStudent")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_type")){
			    	if (((String) objJson.get("type")).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						response = false;
					};
			    };
			    if (element[0].equals("filter_police")){
			    	JSONObject jsonContact =  (JSONObject) objJson.get("contact");
			    	String police = "No";
					if (calcTime((String)jsonContact.get("docDate")) >= currentTime()){
						police = "Yes";
					};
			    	if ((police.toLowerCase().indexOf(element[1].toLowerCase()) < 0)){
						response = false;
					};
			    };
			    if (element[0].equals("filter_ageFrom")){
			    	ArrayList arrayListAges = new ArrayList(); 
			    	arrayListAges = (ArrayList) objJson.get("preferAgeStudent");
			    	Object arrayAges[] = arrayListAges.toArray(); 
					Boolean resultAges = false;
					int w = 0;
					if (arrayAges.length == 0 ){
						resultAges = true;
					};
					while (w < arrayAges.length) {
						if ((arrayAges[w]).equals("35+")){
							if ((Integer.parseInt((String) element[1]) <= 35)){
								resultAges = true;
							};
						};
						if ((arrayAges[w]).equals("25-35")){
							if ((Integer.parseInt((String) element[1]) <= 35)){
								resultAges = true;
							};
						};
						if ((arrayAges[w]).equals("18-25")){
							if ((Integer.parseInt((String) element[1]) <= 25)){
								resultAges = true;
							};
						};
						if ((arrayAges[w]).equals("15-18")){
							if ((Integer.parseInt((String) element[1]) <= 18)){
								resultAges = true;
							};
						};
						if ((arrayAges[w]).equals("10-15")){
							if ((Integer.parseInt((String) element[1]) <= 15)){
								resultAges = true;
							};
						};
						++w;
					};
					if (!resultAges){
						response = false;
					}
			    };
			    if (element[0].equals("filter_ageTo")){
			    	ArrayList arrayListAges = new ArrayList(); 
			    	arrayListAges = (ArrayList) objJson.get("preferAgeStudent");
			    	Object arrayAges[] = arrayListAges.toArray(); 
					Boolean resultAges = false;
					int w = 0;
					while (w < arrayAges.length) {
						if ((arrayAges[w]).equals("35+")){
							if ((Integer.parseInt((String) element[1]) >= 35)){
								resultAges = true;
							};
						};
						if ((arrayAges[w]).equals("25-35")){
							if ((Integer.parseInt((String) element[1]) >= 25)){
								resultAges = true;
							};
						};
						if ((arrayAges[w]).equals("18-25")){
							if ((Integer.parseInt((String) element[1]) >= 18)){
								resultAges = true;
							};
						};
						if ((arrayAges[w]).equals("15-18")){
							if ((Integer.parseInt((String) element[1]) >= 15)){
								resultAges = true;
							};
						};
						if ((arrayAges[w]).equals("10-15")){
							if ((Integer.parseInt((String) element[1]) <= 10)){
								resultAges = true;
							};
						};
						++w;
					};
					if (!resultAges){
						response = false;
					}
			    };
			    if (element[0].equals("filter_gender")){
			    	ArrayList arrayListGender = new ArrayList(); 
			    	arrayListGender = (ArrayList) objJson.get("preferGenderStudent");
			    	Object arrayGender[] = arrayListGender.toArray(); 
					Boolean resultGender = false;
					int w = 0;
					while (w < arrayGender.length) {
						if (((String) arrayGender[w]).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						}else{
							resultGender = true;
						};
						++w;
					};
					if (!resultGender){
						response = false;
					}
			    };
			    if (element[0].equals("filter_meals")){
			    	ArrayList arrayListMeals = new ArrayList(); 
			    	arrayListMeals = (ArrayList) objJson.get("mealPlan");
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
			    };
			    if (element[0].equals("filter_diet")){
			    	ArrayList arrayListDiet = new ArrayList(); 
			    	arrayListDiet = (ArrayList) objJson.get("specialDiet");
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
			    };
			    if (element[0].equals("filter_dontHost")){
			    	ArrayList arrayListDontHost = new ArrayList(); 
			    	arrayListDontHost = (ArrayList) objJson.get("dontHostNationality");
			    	Object arrayDontHost[] = arrayListDontHost.toArray(); 
					Boolean resultDontHost = false;
					int z = 0;
					while (z < arrayDontHost.length) {
						if (((String) arrayDontHost[z]).toLowerCase().indexOf(element[1].toLowerCase()) < 0){
						}else{
							resultDontHost = true;
						};
						++z;
					};
					if (!resultDontHost){
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
		
	public Long currentTime (){		
		Date d2 = new Date(System.currentTimeMillis()); 
		return d2.getTime();
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
	};
};
