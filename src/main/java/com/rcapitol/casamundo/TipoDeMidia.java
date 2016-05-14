package com.rcapitol.casamundo;

public enum TipoDeMidia {
	MEDIA_TYPE_WILDCARD_DEFAULT("*"),
	WILDCARD_DEFAULT("/"),
	APPLICATION_XML_DEFAULT("application/xml"),
	APPLICATION_ATOM_XML_DEFAULT("application/atom+xml"),
	APPLICATION_XHTML_XML_DEFAULT("application/xhtml+xml"),
	APPLICATION_SVG_XML_DEFAULT("application/svg+xml"),
	APPLICATION_JSON_DEFAULT("application/json"),
	APPLICATION_FORM_URLENCODED_DEFAULT("application/x-www-form-urlencoded"),
	MULTIPART_FORM_DATA_DEFAULT("application/form-data"),
	APPLICATION_OCTET_STREAM_DEFAULT("application/octet-stream"),
	TEXT_PLAIN_DEFAULT("application/plain"),
	TEXT_XML_DEFAULT("application/xml"),
	TEXT_HTML_DEFAULT("application/html");

	private String tipoDeMidia;

	TipoDeMidia(String tipoDeMidia) {
		this.tipoDeMidia = tipoDeMidia;
	}

	public String getValor() {
		return tipoDeMidia;
	}

	/*
	 * As Strings statics finals são utilizadas nos serviços Rest para setar junto o tipo de charset.
	 * Por exemplo: charset = UTF-8
	 */

	/**
	 * The value of a type or subtype wildcard: "*"
	 */
	public static final String MEDIA_TYPE_WILDCARD = "*";

	/**
	 * "*&#47;*"
	 */
	public final static String WILDCARD = "*/*";

	/**
	 * "application/xml"
	 */
	public final static String APPLICATION_XML = "application/xml";

	/**
	 * "application/atom+xml"
	 */
	public final static String APPLICATION_ATOM_XML = "application/atom+xml";

	/**
	 * "application/xhtml+xml"
	 */
	public final static String APPLICATION_XHTML_XML = "application/xhtml+xml";

	/**
	 * "application/svg+xml"
	 */
	public final static String APPLICATION_SVG_XML = "application/svg+xml";

	/**
	 * "application/json;charset=UTF-8"
	 */
	public final static String APPLICATION_JSON = "application/json;charset=UTF-8";

	/**
	 * "application/x-www-form-urlencoded"
	 */
	public final static String APPLICATION_FORM_URLENCODED = "application/x-www-form-urlencoded";

	/**
	 * "multipart/form-data;charset=UTF-8"
	 */
	public final static String MULTIPART_FORM_DATA = "multipart/form-data;charset=UTF-8";
	/**
	 * "application/octet-stream"
	 */
	public final static String APPLICATION_OCTET_STREAM = "application/octet-stream";

	/**
	 * "text/plain"
	 */
	public final static String TEXT_PLAIN = "text/plain";

	/**
	 * "text/xml"
	 */
	public final static String TEXT_XML = "text/xml";

	/**
	 * "text/html"
	 */
	public final static String TEXT_HTML = "text/html";

}
