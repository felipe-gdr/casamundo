package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

import com.rcapitol.casamundo.Student.Documento.Trips;

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

		public String idPriceTable;
		public String agency;
		public String family;
		public String destination;
		public Values values [];

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String idPriceTable,
				String agency,
				String family,
				String destination,
				Values values[]
						) {
						this.idPriceTable = idPriceTable;  
						this.agency = agency; 
						this.family = family;
						this.destination = destination;
						this.values = values; 
		}


		@Override
		public String toString() {
			return new StringBuffer(" IdPriceTable : ").append(this.idPriceTable).toString();
		}

		public static final class Values {
    		public Long value;
    		public String from;

    		public Values() {

			}
   
            @JsonCreator
            public Values(
            		Long value,
            		String from
            			)
            {
        		this.value = value;
        		this.from = from;
            };

		}
	}
} 