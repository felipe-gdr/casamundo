package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class Bank {

	public Documento documento;

	public Bank() {

	}

	public Bank(Documento documento) {
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
		public String number;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String name,
				String number
						) {
						this.name = name;  
						this.number = number; 
		}

		@Override
		public String toString() {
			return new StringBuffer(" Name : ").append(this.name).append(" Number : ").append(this.number).toString();
		}
	}
} 