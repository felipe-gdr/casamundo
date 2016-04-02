package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class School {

	public Documento documento;

	public School() {

	}

	public School(Documento documento) {
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
		public String nameContact;
		public String celPhone;
		public String phone;
		public String email;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String name,
				String nameContact,
				String celPhone,
				String phone,
				String email
						) {
						this.name = name;  
						this.nameContact = nameContact; 
						this.celPhone = celPhone; 
						this.phone = phone; 
						this.email = email; 
		}

		public void setName(String name) {
			this.name = name;
		}
		public String getName() {
			return this.name;
		}
		public void setNameContact(String nameContact) {
			this.nameContact = nameContact;
		}
		public String getNameContact() {
			return this.nameContact;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getEmail() {
			return this.email;
		}
		public void setCelPhone(String celPhone) {
			this.celPhone = celPhone;
		}
		public String getCelPhone() {
			return this.celPhone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		public String getPhone() {
			return this.celPhone;
		}

		@Override
		public String toString() {
			return new StringBuffer(" Email : ").append(this.email).append(" Name : ").append(this.name).toString();
		}
	}
} 