package com.rcapitol.casamundo;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.SimpleEmail;

public class SendEmailHtml {
	
	public void sendEmailHtml(String hostName, String userName, String password, String from, String to, String subject, String html ){
	    
		HtmlEmail email = new HtmlEmail();
		
		String newEmail = "<div><h3 style='color: #1c70db;'>NOW $159</h3></div>";

		try {
			email.setHostName(hostName);
			email.setSmtpPort(587);
			email.setAuthenticator(new DefaultAuthenticator(userName, password));
			email.setStartTLSEnabled(true);
			email.setFrom(from);
			email.setSubject(subject);
			email.setHtmlMsg(html);
			email.setTextMsg("Your email client does not support HTML messages");

			email.addTo(to);
			email.send();
		} catch(EmailException ee) {
		    ee.printStackTrace();
		}

	};
};