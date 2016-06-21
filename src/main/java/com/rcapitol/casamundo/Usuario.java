package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class Usuario {

	public Documento documento;

	public Usuario() {

	}

	public Usuario(Documento documento) {
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

		public String email;
		public String firstName;
		public String lastName;
		public String perfil;
		public String city;
		public String password;
		public String gender;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String email,
				String firstName,
				String lastName,
				String perfil,
				String city,
				String password,
				String gender
						) {
						this.email = email; 
						this.firstName = firstName;  
						this.lastName = lastName; 
						this.perfil = perfil; 
						this.city = city; 
						this.password = password; 
						this.gender = gender; 
		}

		@Override
		public String toString() {
			return new StringBuffer(" Email : ").append(this.email).append(" Name : ").append(this.firstName).toString();
		}
	}
} 