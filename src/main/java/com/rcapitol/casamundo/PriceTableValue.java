package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class PriceTableValue {

	public Documento documento;

	public PriceTableValue() {

	}

	public PriceTableValue(Documento documento) {
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
		public String agency;
		public String destination;
		public String gross;
		public String net;
		public String from;
		public String to;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String id,
				String type,
				String idPriceTable,
				String agency,
				String destination,
        		String gross,
        		String net,
        		String from,
        		String to
						) {
						this.id = id;
						this.type = type;
						this.idPriceTable = idPriceTable;
						this.agency = agency; 
						this.destination = destination;
		        		this.gross = gross;
		        		this.net = net;
		        		this.from = from;
		        		this.to = to;
		}


		@Override
		public String toString() {
			return new StringBuffer(" IdPriceTable : ").append(this.idPriceTable).toString();
		}
	}
} 