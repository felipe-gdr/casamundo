package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class Agency {

	public Documento documento;

	public Agency() {

	}

	public Agency(Documento documento) {
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
		public String nameConsult;
		public String cellPhone;
		public String phone;
		public String email;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String name,
				String nameConsult,
				String cellPhone,
				String phone,
				String email
						) {
						this.name = name;  
						this.nameConsult = nameConsult; 
						this.cellPhone = cellPhone; 
						this.phone = phone; 
						this.email = email; 
		}

		public void setName(String name) {
			this.name = name;
		}
		public String getName() {
			return this.name;
		}
		public void setNameConsult(String nameConsult) {
			this.nameConsult = nameConsult;
		}
		public String getNameConsult() {
			return this.nameConsult;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getEmail() {
			return this.email;
		}
		public void setCellPhone(String cellPhone) {
			this.cellPhone = cellPhone;
		}
		public String getCellPhone() {
			return this.cellPhone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		public String getPhone() {
			return this.cellPhone;
		}

		@Override
		public String toString() {
			return new StringBuffer(" Email : ").append(this.email).append(" Name : ").append(this.name).toString();
		}
	}
} 