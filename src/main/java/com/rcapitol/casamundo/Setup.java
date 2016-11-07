package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class Setup {

	public Documento documento;

	public Setup() {

	}

	public Setup(Documento documento) {
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

		public String setupKey;
		public String setupValue;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String setupKey,
				String setupValue
						) {
						this.setupKey = setupKey;  
						this.setupValue = setupValue; 
		}

		@Override
		public String toString() {
			return new StringBuffer(" setupKey : ").append(this.setupKey).append(" setupValue : ").append(this.setupValue).toString();
		}
	}
} 