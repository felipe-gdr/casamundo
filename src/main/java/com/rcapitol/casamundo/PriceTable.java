package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class PriceTable {

	public Documento documento;

	public PriceTable() {

	}

	public PriceTable(Documento documento) {
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

		public String id;
		public String name;
		public String description;
		public String valid;
		public String vendorType;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String id,
				String name,
				String description,
				String valid,
				String vendorType

						) {
						this.id = id;  
						this.name = name;  
						this.description = description;
						this.valid = valid;
						this.vendorType = vendorType;
		}

		@Override
		public String toString() {
			return new StringBuffer(" Name : ").append(this.name).append(" Description : ").append(this.description).toString();
		}
	}
} 