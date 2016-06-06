package com.rcapitol.casamundo;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/rest")
public class ApplicationConfig extends Application {

    public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(
        		Rest_Student.class,
        		Rest_Family.class,
        		Rest_Agency.class,
        		Rest_School.class,
        		Rest_Table.class,
        		Rest_UploadFiles.class,
        		Rest_Email.class
        		));
    }
}
