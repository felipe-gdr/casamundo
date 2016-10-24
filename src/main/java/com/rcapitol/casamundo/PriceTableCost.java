package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

import com.rcapitol.casamundo.Student.Documento.Trips;

public class PriceTableCost {

	public Documento documento;

	public PriceTableCost() {

	}

	public PriceTableCost(Documento documento) {
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
		public String type;
		public String idPriceTable;
		public String idVendor;
		public String value;
		public String from;
		public String to;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String id,
				String type,
				String idPriceTable,
				String idVendor,
        		String value,
        		String from,
        		String to
						) {
						this.id = id;
						this.type = type;
						this.idPriceTable = idPriceTable;
						this.idVendor = idVendor; 
		        		this.value = value;
		        		this.from = from;
		        		this.to = to;
		}


		@Override
		public String toString() {
			return new StringBuffer(" IdPriceTable : ").append(this.idPriceTable).toString();
		}
	}
} 