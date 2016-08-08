package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class MainIntersection {

	public Documento documento;

	public MainIntersection() {

	}

	public MainIntersection(Documento documento) {
		this.documento = documento;
	}

	public void setDocumento( Documento documento) {
		this.documento = documento;
	}

	public Documento getDocumento() {
		return this.documento;
	}

	@Override
	public String toString() {
		return new StringBuffer(" Documento : ").append(this.documento).toString();
	}

	public static final class Documento {

		public String name;
		public String destination;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String name,
				String number
						) {
						this.name = name;  
						this.destination = destination; 
		}

		@Override
		public String toString() {
			return new StringBuffer(" Name : ").append(this.name).append(" Destination : ").append(this.destination).toString();
		}
	}
} 