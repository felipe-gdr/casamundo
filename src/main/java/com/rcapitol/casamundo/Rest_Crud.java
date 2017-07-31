package com.rcapitol.casamundo;

import java.net.UnknownHostException;
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

import org.json.simple.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;


@Singleton
//@Lock(LockType.READ)
@Path("/crud")
public class Rest_Crud {
	
	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();
	
	@Path("/obter")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Obter(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		String key = (String) queryParam.get("key");
		String value = (String) queryParam.get("value");
		if (collection != null && key != null && value != null){
			return commons_db.ObterCrud(collection, key, value);
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@SuppressWarnings("rawtypes")
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Incluir(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) queryParam.get("documento"));
		documento.put("lastchange", String.valueOf(commons.currentTime()));
		if (collection != null ){
			return commons_db.IncluirCrud(collection, documento);
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@SuppressWarnings("rawtypes")
	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Atualizar(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		String key = (String) queryParam.get("key");
		String value = (String) queryParam.get("value");
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) queryParam.get("documento"));
		documento.put("lastchange", String.valueOf(commons.currentTime()));
		if (collection != null ){
			return commons_db.AtualizarCrud(collection, documento, key, value);
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	
	@Path("/lista")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response Lista(@QueryParam("collection") String collection, @QueryParam("key") String key, @QueryParam("value") String value) throws UnknownHostException, MongoException  {
		if (collection != null && key != null && value != null){
			return commons_db.listaCrud(collection, key, value);
		}else{
			return Response.status(400).entity(null).build();	
		}
	};
};
