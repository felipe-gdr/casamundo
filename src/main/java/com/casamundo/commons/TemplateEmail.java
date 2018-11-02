package com.casamundo.commons;

public class TemplateEmail {

	public String emailHtml(String familyName, String emailFamily, String studentName, String emailStudent, String subject, String emailBody){
		String email =
		"		<html>" +
		"		<body>" +
		"		    <table width=\"650px\" cellspacing=\"0\" cellpadding=\"0\" border=\"0.2\" color:\"blue\">" +
		"		        <tr>" +
		"		            <td class=\"navbar navbar-inverse\" align=\"center\">" +
		"		                <!-- This setup makes the nav background stretch the whole width of the screen. -->" +
		"		                <table width=\"650px\" cellspacing=\"0\" cellpadding=\"3\" class=\"container\">" +
		"		                    <tr class=\"navbar navbar-inverse\">" +
		"		                        <td colspan=\"4\">" +
		"									<img src=\"http://52.27.128.28:8080/casamundo/img/logo/casatoronto.png\"></img>" + 
		"								</td>" +
		"		                        <td>" +
		"									<ul>" +
		"										<li>" +
		"											<span>+1(416)897-7141</span>" +
		"										</li>" +
		"										<li>" +
		"											<a href=\"mailto:josematheus@casa-toronto.com\">josematheus@casa-toronto.com</a>" +
		"										</li>" +
		"										<li>" +
		"											<a href=\"www.casa-toronto.com\">www.casa-toronto.com</a>" +
		"										</li>" +
		"										<li>" +
		"											<span >153 Beecroft Rd, suite 1512</span>" +
		"										</li>" +
		"										<li>" +
		"											<span >Toronto, ON Canada M2N 7C5</span>" +
		"										</li>" +
		"									</ul>" +
		"								</td>" +
		"		                    </tr>" +
		"		                </table>" +
		"		            </td>" +
		"		        </tr>" +
		"		        <tr>" +
		"		            <td bgcolor=\"white\" align=\"left\">" +
		"	    	            <table width=\"900px\" cellspacing=\"0\" cellpadding=\"3\" align=\"center\">" +
		"	                    <tr>" +
		"	                        <td align=\"left\">" +
		"										<p >" +
		"											<span style=\"font-style: italic;font-size: 20px;\" >Family <small id=\"familyName\" style=\"font-style: italic;font-size: 20px;\">" + familyName + "</small></span>" +
		"										</p>" +
		"										<p >" +
		"											<span style=\"font-style: italic;font-size: 20px;\" >Email <small id=\"emailFamily\" style=\"font-style: italic;font-size: 20px;\">" + emailFamily + "</small></span>" +
		"										</p>" +
		"	                        </td>" +
		"	                    </tr>" +
		"		                </table>" +
		"		            </td>" +
		"		        </tr>" +
		"		        <tr>" +
		"		            <td bgcolor=\"white\" align=\"left\">" +
		"	    	            <table width=\"900px\" cellspacing=\"0\" cellpadding=\"3\" align=\"center\">" +
		"	                    <tr>" +
		"	                        <td align=\"left\">" +
		"										<p >" +
		"											<span style=\"font-style: italic;font-size: 20px;\" >Student <small id=\"studentName\" style=\"font-style: italic;font-size: 20px;\">" + studentName + "</small></span>" +
		"										</p>" +
		"										<p >" +
		"											<span style=\"font-style: italic;font-size: 20px;\" >Email <small id=\"emailStudent\" style=\"font-style: italic;font-size: 20px;\">" + emailStudent + "</small></span>" +
		"										</p>" +
		"	                        </td>" +
		"	                    </tr>" +
		"		                </table>" +
		"		            </td>" +
		"		        </tr>" +
		"               <tr>" +
		"	   	            <table width=\"900px\" cellspacing=\"0\" cellpadding=\"3\" align=\"center\">" +
		"                    <tr>" +
		"						<td align=\"left\">" +
		"							<small style=\"font-size: 15px; font-style: italic;\" ></small><small style=\"color: blue; font-size: 15px;\" >" + emailBody + "</small>" +
		"	                    </td>" +
		"	           		</tr>" +
		"	       			</table>" +
		"	        </tr>" +
		"	    </table>" +
		"	</body>" +
		"	</html>";
					
		return email;
		
	};

	public String emailFamilia(String familyName, String studentName, String start, String end, String msg){
		String email =
				"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n" + 
				"<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" + 
				"	<head>		\n" + 
				"		<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n" + 
				"		<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\n" + 
				"		<title>Casa Toronto</title>\n" + 
				"		<style type=\"text/css\">\n" + 
				"			body{font-family: Arial, \"Helvetica Neue\", Helvetica, sans-serif;}\n" + 
				"			.ExternalClass {width:100%;} /* Força o Hotmail a exibir o email com a largura total */\n" + 
				"			.ExternalClass, .ExternalClass td {line-height: 100%;} /* Força o Hotmail a exibir o espaçamento normal entre linhas */\n" + 
				"			table {border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } /* Remove o espaçamento entorno das tabelas no Outlook 07, 10 */\n" + 
				"			table td {border-collapse: collapse; vertical-align:top;} /* Corrige o padding no Outlook 07, 10 */\n" + 
				"			td {margin: 0; padding: 0; font-size: 0px; line-height: 0px;} /* Zera os espaçamentos */\n" + 
				"			td p{font-size: 15px;margin-left: 15px;margin-right: 15px;margin-top: 10px;margin-bottom: 10px;line-height: 20px;}\n" + 
				"			td h1{margin-left: 15px;margin-right: 15px; margin-top: 10px;margin-bottom: 10px;font-size: 25px;line-height: 25px;}\n" + 
				"			img {display: block; max-width: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}\n" + 
				"			@media only screen and (max-width: 600px) {\n" + 
				"				img[class=\"hide\"] {display:block!important;}\n" + 
				"			}\n" + 
				"			@media only screen and (max-width: 600px) {\n" + 
				"				table[class=\"content-wrap\"] {width: 94%!important;}\n" + 
				"			}\n" + 
				"			p{\n" + 
				"				font-weight:bold;\n" + 
				"			}\n" + 
				"			p > span{\n" + 
				"				font-weight: normal;\n" + 
				"			}\n" + 
				"			p.inverted{\n" + 
				"				font-weight: normal;\n" + 
				"			}\n" + 
				"			p.inverted > span{\n" + 
				"				font-weight:bold;\n" + 
				"			}\n" + 
				"		</style>\n" + 
				"	</head>\n" + 
				"	<body>\n" + 
				"		<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" + 
				"			<tr>\n" + 
				"				<td width=\"100%\">\n" + 
				"					<table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"content-wrap\">\n" + 
				"						<tr>\n" + 
				"							<td width=\"100%\" height=\"130\">\n" + 
				"								<img src=\"http://54.189.197.113/imgemkt/emkt_01.jpg\" alt=\"\" />\n" + 
				"							</td>\n" + 
				"						</tr>\n" + 
				"					</table>\n" + 
				"				</td>\n" + 
				"			</tr>\n" + 
				"		</table>\n" + 
				"		<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" + 
				"			<tr>\n" + 
				"				<td width=\"100%\">\n" + 
				"					<table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"content-wrap\">\n" + 
				"						<tr>\n" + 
				"							<td width=\"50\" bgcolor=\"#eeeeee\"></td>\n" + 
				"							<td width=\"500\" height=\"200\">\n" + 
				"								<img src=\"http://54.189.197.113/imgemkt/emkt_02.jpg\" alt=\"\" />\n" + 
				"							</td>\n" + 
				"							<td width=\"50\" bgcolor=\"#eeeeee\"></td>\n" + 
				"						</tr>\n" + 
				"					</table>\n" + 
				"				</td>\n" + 
				"			</tr>\n" + 
				"		</table>\n" + 
				"		<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" + 
				"			<tr>\n" + 
				"				<td width=\"100%\">\n" + 
				"					<table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"content-wrap\">\n" + 
				"						<tr>\n" + 
				"							<td width=\"50\" bgcolor=\"#eeeeee\"></td>\n" + 
				"							<td width=\"500\">\n" + 
				"								<table width=\"500\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"content-wrap\">\n" + 
				"									<tr>\n" + 
				"										<td width=\"100%\">"	+
						"<p class=\"inverted\">Family " + familyName + " " + msg + " student " + studentName + " for the period of " + start + " to " + end + "</p>"+ 
						"</td>\n" + 
						"									</tr>\n" + 
						"								</table>\n" + 
						"								<table width=\"500\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"content-wrap\">\n" + 
						"									<tr>\n" + 
						"										<td width=\"100%\" height=\"40\">\n" + 
						"											<p align=\"right\">Best regards,<br /> Casa Toronto.</p>\n" + 
						"										</td>\n" + 
						"									</tr>\n" + 
						"								</table>\n" + 
						"							</td>\n" + 
						"							<td width=\"50\" bgcolor=\"#eeeeee\"></td>\n" + 
						"						</tr>\n" + 
						"					</table>\n" + 
						"				</td>\n" + 
						"			</tr>\n" + 
						"		</table>\n" + 
						"		<table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" + 
						"			<tr>\n" + 
						"				<td width=\"100%\">\n" + 
						"					<table width=\"600\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\" class=\"content-wrap\">\n" + 
						"						<tr>\n" + 
						"							<td width=\"100%\" height=\"64\" bgcolor=\"#eeeeee\">\n" + 
						"							</td>\n" + 
						"						</tr>\n" + 
						"					</table>\n" + 
						"				</td>\n" + 
						"			</tr>\n" + 
						"		</table>\n" + 
						"	</body>\n" + 
						"</html>";

					
		return email;
		
	};
}
