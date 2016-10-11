package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class Invoice {

	public Documento documento;

	public Invoice() {

	}

	public Invoice(Documento documento) {
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
		public String idStudent;
		public String actualTrip;
		public String status;
		public String number;
		public String dueDate;
		public String amountNet;
		public String amountGross;
		public String destination;
		public ItensNet itensNet[];
		public ItensGross itensGross[];
		public Documento() {

		}

		@JsonCreator
		public Documento(
						String id,
						String idStudent,
						String actualTrip,
						String status,
						String number,
						String dueDate,
						String amountNet,
						String amountGross,
						String destination,
						ItensNet itensNet[],
						ItensGross itensGross[]
								) {
						this.id = id; 
						this.idStudent = idStudent; 
						this.actualTrip = actualTrip;
						this.status = status; 
						this.number = number; 
						this.dueDate = dueDate; 
						this.amountNet = amountNet; 
						this.amountGross = amountGross;
						this.destination = destination;
						this.itensNet = itensNet;
						this.itensGross = itensGross;
		}


		@Override
		public String toString() {
			return new StringBuffer(" Number : ").append(this.number).append(" Due date : ").append(this.dueDate).toString();
		}

		public static final class ItensNet {
    		public String item;
    		public String value;
    		public String amount;
    		public String description;

    		public ItensNet() {

			}
   
            @JsonCreator
            public ItensNet(
            			String item,
            			String value,
            			String amount,
            			String description
            			)
            {
	    		this.item = item;
	    		this.value = value;
	    		this.amount = amount;
	    		this.description = description;
            };
		};
		public static final class ItensGross {
    		public String item;
    		public String value;
    		public String amount;

    		public ItensGross() {

			}
   
            @JsonCreator
            public ItensGross(
            			String item,
            			String value,
            			String amount
            			)
            {
	    		this.item = item;
	    		this.value = value;
	    		this.amount = amount;
            };
		};
	};
}; 