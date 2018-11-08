package com.casamundo.rest;

import org.apache.commons.mail.EmailException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casamundo.commons.SendEmail;
import com.casamundo.commons.SendEmailHtml;

	
@RestController
@RequestMapping("/email")
public class Rest_Email {

	@GetMapping(value = "/sendSimpleEmail", produces = "application/json")
	public String sendSimpleEmail(
			@PathVariable("hostName") String hostName,
			@PathVariable("userName") String userName,
			@PathVariable("password") String password,
			@PathVariable("from") String from,
			@PathVariable("to") String to,
			@PathVariable("subject") String subject,
			@PathVariable("message") String message
			) throws EmailException {
		SendEmail sendEmail = new SendEmail();
		sendEmail.sendEmail(hostName, userName, password, from, to, subject, message);
		return "success";
	};


	@GetMapping(value = "/sendEmailHtml", produces = "application/json")
	public String sendEmailHtml(
			@PathVariable("hostName") String hostName,
			@PathVariable("userName") String userName,
			@PathVariable("password") String password,
			@PathVariable("from") String from,
			@PathVariable("to") String to,
			@PathVariable("subject") String subject,
			@PathVariable("html") String html
			) throws EmailException {
		SendEmailHtml sendEmailHtml = new SendEmailHtml();
		sendEmailHtml.sendEmailHtml(hostName, userName, password, from, to, subject, html);
		return "success";
	};
};
