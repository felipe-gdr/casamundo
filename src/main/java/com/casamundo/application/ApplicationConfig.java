package com.casamundo.application;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import com.casamundo.rest.Rest_Agency;
import com.casamundo.rest.Rest_Book;
import com.casamundo.rest.Rest_Crud;
import com.casamundo.rest.Rest_Email;
import com.casamundo.rest.Rest_HomestayBook;
import com.casamundo.rest.Rest_Invoice;
import com.casamundo.rest.Rest_Payment;
import com.casamundo.rest.Rest_PriceTable;
import com.casamundo.rest.Rest_Receivement;
import com.casamundo.rest.Rest_School;
import com.casamundo.rest.Rest_Student;
import com.casamundo.rest.Rest_Table;
import com.casamundo.rest.Rest_UploadFiles;
import com.casamundo.rest.Rest_Usuario;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/rest")
public class ApplicationConfig extends Application {

	@SuppressWarnings("unchecked")
	public Set<Class<?>> getClasses() {
        return new HashSet<Class<?>>(Arrays.asList(
        		Rest_Student.class,
        		Rest_Agency.class,
        		Rest_Book.class,
        		Rest_School.class,
        		Rest_Table.class,
        		Rest_UploadFiles.class,
        		Rest_Email.class,
        		Rest_Email.class,
        		Rest_Usuario.class,
        		Rest_PriceTable.class,
        		Rest_Invoice.class,
        		Rest_Payment.class,
        		Rest_Crud.class,
        		Rest_HomestayBook.class,
        		Rest_Receivement.class
        		));
    }
}
