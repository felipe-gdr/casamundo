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
		public String celPhone;
		public String phone;
		public String email;
		public String address;
		public String latitude;
		public String longitude;
		public String destination;
		public String logo;
		public String sigla;
		public Consultants consultants [];
		

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String name,
				String celPhone,
				String phone,
				String email,
				String address,
				String latitude,
				String longitude,
				String destination,
				String logo,
				String sigla,
				Consultants consultants[]
						) {
						this.name = name;  
						this.celPhone = celPhone; 
						this.phone = phone; 
						this.email = email; 
						this.address = address; 
						this.latitude = latitude; 
						this.latitude = latitude; 
						this.destination = destination;
						this.logo = logo;
						this.sigla = sigla;
						this.consultants = consultants; 
		}

		public void setName(String name) {
			this.name = name;
		}
		public String getName() {
			return this.name;
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

		public static final class Consultants {
    		public String name;
    		public String phone;
    		public String celPhone;
    		public String email;

    		public Consultants() {

			}
   
            @JsonCreator
            public Consultants(
            		String name,
            		String phone,
            		String celPhone,
            		String email
            			)
            {
        		this.name = name;
        		this.phone = phone;
        		this.celPhone = celPhone;
        		this.email = email;
            };
		};
	}
} 