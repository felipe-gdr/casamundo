package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

import com.rcapitol.casamundo.Student.Documento.Trips;

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
		public String agencyPhone;
		public String agencyEmail;
		public String logo;
		public String sigla;
		public Consulters consulters [];

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String name,
				String agencyPhone,
				String agencyEmail,
				String logo,
				String sigla,
				Consulters consulters[]
						) {
						this.name = name;  
						this.agencyPhone = agencyPhone; 
						this.agencyEmail = agencyEmail;
						this.logo = logo;
						this.sigla = sigla;
						this.consulters = consulters; 
		}

		public void setName(String name) {
			this.name = name;
		}
		public String getName() {
			return this.name;
		}

		@Override
		public String toString() {
			return new StringBuffer(" Name : ").append(this.name).append(" Name : ").toString();
		}

		public static final class Consulters {
    		public String name;
    		public String phone;
    		public String celPhone;
    		public String email;

    		public Consulters() {

			}
   
            @JsonCreator
            public Consulters(
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

		}
	}
} 