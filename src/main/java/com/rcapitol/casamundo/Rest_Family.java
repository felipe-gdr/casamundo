package com.rcapitol.casamundo;

import javax.inject.Singleton;
import javax.ws.rs.Path;

	
@Singleton
// @Lock(LockType.READ)
@Path("/family")

public class Rest_Family {

	
	Commons commons = new Commons();
	Commons_DB commos_db = new Commons_DB();
};
