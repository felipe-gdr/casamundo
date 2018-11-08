package com.casamundo.rest;

import org.apache.commons.mail.EmailException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.commons.SendEmail;
import com.casamundo.commons.SendEmailHtml;

	
@RestController
@RequestMapping("/email")
public class Rest_Email {

	@RequestMapping(value = "/sendSimpleEmail", produces = "application/json")
	public String sendSimpleEmail(
			@RequestParam("hostName") String hostName,
			@RequestParam("userName") String userName,
			@RequestParam("password") String password,
			@RequestParam("from") String from,
			@RequestParam("to") String to,
			@RequestParam("subject") String subject,
			@RequestParam("message") String message
			) throws EmailException {
		SendEmail sendEmail = new SendEmail();
		sendEmail.sendEmail(hostName, userName, password, from, to, subject, message);
		return "success";
	};


	@RequestMapping(value = "/sendEmailHtml", produces = "application/json")
	public String sendEmailHtml(
			@RequestParam("hostName") String hostName,
			@RequestParam("userName") String userName,
			@RequestParam("password") String password,
			@RequestParam("from") String from,
			@RequestParam("to") String to,
			@RequestParam("subject") String subject,
			@RequestParam("html") String html
			) throws EmailException {
		SendEmailHtml sendEmailHtml = new SendEmailHtml();
		sendEmailHtml.sendEmailHtml(hostName, userName, password, from, to, subject, html);
		return "success";
	};
};
