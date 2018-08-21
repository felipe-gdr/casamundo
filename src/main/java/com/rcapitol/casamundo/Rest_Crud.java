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
	

	@Path("/obter-get")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response obterGet(@QueryParam("collection") String collection, @QueryParam("key") String key, @QueryParam("value") String value) throws UnknownHostException, MongoException  {
		
		if (collection != null && key != null && value != null){
			return commons_db.ObterCrud(collection, key, value);
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@SuppressWarnings({ "rawtypes" })
	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Incluir(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		BasicDBObject documento = new BasicDBObject();
		documento.putAll((Map) queryParam.get("documento"));
		if (collection != null ){
			commons_db.IncluirCrud(collection, documento); 
			return Response.status(200).build();
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Atualizar(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			return commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("key").toString(), queryParam.get("value").toString());
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@Path("/lista")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response Lista(@QueryParam("collection") String collection, @QueryParam("key") String key, @QueryParam("value") String value) throws UnknownHostException, MongoException  {
		if (collection != null ){
			return commons_db.listaCrud(collection, key, value);
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@Path("/array")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Array(JSONObject queryParam) throws UnknownHostException, MongoException  {
		
		String collection = (String) queryParam.get("collection");
		if (collection != null ){
			return commons_db.arrayCrud(queryParam.get("collection").toString(), queryParam.get("key").toString(), queryParam.get("value").toString(), queryParam.get ("type").toString(), queryParam.get("field").toString(), queryParam.get ("index").toString(), queryParam.get("item"));
		}else{
			return Response.status(400).entity(null).build();	
		}
	};
};
