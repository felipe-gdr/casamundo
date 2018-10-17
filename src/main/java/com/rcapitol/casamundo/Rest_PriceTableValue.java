package com.rcapitol.casamundo;

import javax.inject.Singleton;
import javax.ws.rs.Path;

	
@Singleton
// @Lock(LockType.READ)
@Path("/pricetablevalue")

public class Rest_PriceTableValue {

	Commons commons = new Commons();
	Commons_DB commons_db = new Commons_DB();

}
