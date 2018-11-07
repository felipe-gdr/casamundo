package com.casamundo.rest;

import com.casamundo.commons.SendEmail;
import com.casamundo.commons.SendEmailHtml;
import org.apache.commons.mail.EmailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;

	
@RestController
@RequestMapping("/email")
public class Rest_Email {

	@GetMapping(value = "/sendSimpleEmail", produces = "application/json")
	public String sendSimpleEmail(
			@PathParam("hostName") String hostName,
			@PathParam("userName") String userName,
			@PathParam("password") String password,
			@PathParam("from") String from,
			@PathParam("to") String to,
			@PathParam("subject") String subject,
			@PathParam("message") String message
			) throws EmailException {
		SendEmail sendEmail = new SendEmail();
		sendEmail.sendEmail(hostName, userName, password, from, to, subject, message);
		return "success";
	};


	@GetMapping(value = "/sendEmailHtml", produces = "application/json")
	public String sendEmailHtml(
			@PathParam("hostName") String hostName,
			@PathParam("userName") String userName,
			@PathParam("password") String password,
			@PathParam("from") String from,
			@PathParam("to") String to,
			@PathParam("subject") String subject,
			@PathParam("html") String html
			) throws EmailException {
		SendEmailHtml sendEmailHtml = new SendEmailHtml();
		sendEmailHtml.sendEmailHtml(hostName, userName, password, from, to, subject, html);
		return "success";
	};
};
