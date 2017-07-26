package com.rcapitol.casamundo;

import java.util.Map;
import javax.inject.Singleton;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;

import com.treserres.Commons;
import com.treserres.Commons_DB;


@Singleton
//@Lock(LockType.READ)
@Path("/crud")

public class Rest_Crud {

	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();
	
	@Path("/obter")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Obter(JSONObject queryParam)  {
		System.out.println("obter:" + queryParam.get ("collection").toString());
		Boolean testaToken = true;
		if (queryParam.get("tipo") != null){
			if (queryParam.get("tipo").toString().equals("login") && queryParam.get("collection").toString().equals("usuarios")){
				testaToken = false;
			};
		};
		if (testaToken){
			if (commons_db.getCollection(queryParam.get("token").toString(), "usuarios", "documento.token") == null){
				return Response.status(401).entity("invalid token").build();	
			};
		};
		if (queryParam.get("keys") != null && queryParam.get ("collection").toString() != null){
			return commons_db.obterCrud(queryParam.get ("collection").toString(), queryParam.get("keys"));
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@Path("/incluir")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Incluir(JSONObject queryParam)  {
		System.out.println("incluir:" + queryParam.get ("collection").toString());
		if (commons_db.getCollection(queryParam.get("token").toString(), "usuarios", "documento.token") == null){
			return Response.status(401).entity("invalid token").build();	
		};
		if (queryParam.get ("insert") != null && queryParam.get ("collection").toString() != null){
			Response response = commons_db.incluirCrud(queryParam.get ("collection").toString(), queryParam.get ("insert")); 
			return response;
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@Path("/atualizar")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Atualizar(JSONObject queryParam)  {
		System.out.println("atualizar:" + queryParam.get ("collection").toString());
		if (commons_db.getCollection(queryParam.get("token").toString(), "usuarios", "documento.token") == null){
			return Response.status(401).entity("invalid token").build();	
		};
		if (queryParam.get("update") != null && queryParam.get ("collection").toString() != null && queryParam.get("keys") != null){
			return commons_db.atualizarCrud(queryParam.get ("collection").toString(), queryParam.get("update"), queryParam.get("keys"));
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	
	@Path("/lista")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Lista(JSONObject queryParam)  {
		System.out.println("lista:" + queryParam.get ("collection").toString());
		if (commons_db.getCollection(queryParam.get("token").toString(), "usuarios", "documento.token") == null){
			return Response.status(401).entity("invalid token").build();	
		};
		if (queryParam.get("keys") != null && queryParam.get ("collection").toString() != null){
			return commons_db.listaCrud(queryParam.get ("collection").toString(), queryParam.get("keys"));
		}else{
			return Response.status(400).entity(null).build();	
		}
	};

	@Path("/remover/all")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response Remover(JSONObject queryParam)  {
		if (commons_db.getCollection(queryParam.get("token").toString(), "usuarios", "documento.token") == null){
			return Response.status(401).entity("invalid token").build();	
		};
		if (queryParam.get ("collection").toString() != null){
			return commons_db.removerAllCrud(queryParam.get ("collection").toString());
		}else{
			return Response.status(400).entity(null).build();	
		}
	};
}
