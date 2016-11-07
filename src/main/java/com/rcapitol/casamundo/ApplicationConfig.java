package com.rcapitol.casamundo;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/rest")
public class ApplicationConfig extends Application {

	@SuppressWarnings("unchecked")
	public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(
        		Rest_Student.class,
        		Rest_Family.class,
        		Rest_Agency.class,
        		Rest_School.class,
        		Rest_Bank.class,
        		Rest_Table.class,
        		Rest_UploadFiles.class,
        		Rest_Email.class,
        		Rest_MainIntersection.class,
        		Rest_Subway.class,
        		Rest_Email.class,
        		Rest_Usuario.class,
        		Rest_PriceTable.class,
        		Rest_PriceTableValue.class,
        		Rest_PriceTableCost.class,
        		Rest_Invoice.class,
        		Rest_Payment.class,
        		Rest_Dorm.class,
        		Rest_Room.class,
        		Rest_Pickup.class,
        		Rest_Setup.class
        		));
    }
}
