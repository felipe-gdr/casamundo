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
		public String number;
		public String dueDate;
		public String totalAmountNet;
		public String totalAmountGross;
		public ItensNet itensNet[];
		public ItensGross itensGross[];
		public Documento() {

		}

		@JsonCreator
		public Documento(
						String id,
						String idStudent,
						String actualTrip,
						String number,
						String dueDate,
						String totalAmountNet,
						String totalAmountGross,
						ItensNet itensNet[],
						ItensGross itensGross[]
								) {
						this.id = id; 
						this.idStudent = idStudent; 
						this.actualTrip = actualTrip; 
						this.number = number; 
						this.dueDate = dueDate; 
						this.totalAmountNet = totalAmountNet; 
						this.totalAmountGross = totalAmountGross; 
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

    		public ItensNet() {

			}
   
            @JsonCreator
            public ItensNet(
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