package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

import com.rcapitol.casamundo.Family.Documento.Notes;

public class Payment {

	public Documento documento;

	public Payment() {

	}

	public Payment(Documento documento) {
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
		public String idVendor;
		public String invoiceId;
		public String invoiceNumber;
		public String actualTrip;
		public String status;
		public String type;
		public String number;
		public String dueDate;
		public String amount;
		public String destination;
		public Installments installments[];
		public Itens itens[];
		public Notes notes[];
		public Documento() {

		}

		@JsonCreator
		public Documento(
						String id,
						String idStudent,
						String idVendor,
						String invoiceId,
						String invoiceNumber,
						String actualTrip,
						String status,
						String type,
						String number,
						String dueDate,
						String amount,
						String destination,
						Installments installments[],
						Itens itens[],
						Notes notes[]
								) {
						this.id = id; 
						this.idStudent = idStudent;
						this.idVendor = idVendor;
						this.invoiceId = invoiceId;
						this.invoiceNumber = invoiceNumber;
						this.actualTrip = actualTrip;
						this.status = status;
						this.type = type;
						this.number = number; 
						this.dueDate = dueDate; 
						this.amount = amount; 
						this.destination = destination;
						this.installments = installments;
						this.itens = itens;
						this.notes = notes;
		}


		@Override
		public String toString() {
			return new StringBuffer(" Number : ").append(this.number).append(" Due date : ").append(this.dueDate).toString();
		}

		public static final class Itens {
    		public String item;
    		public String value;
    		public String amount;
    		public String description;

    		public Itens() {

			}
   
            @JsonCreator
            public Itens(
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

		public static final class Installments {
    		public String value;
    		public String type;
    		public String date;

    		public Installments() {

			}
   
            @JsonCreator
            public Installments(
            			String value,
            			String type,
            			String date
            			)
            {
	    		this.value = value;
	    		this.type = type;
	    		this.date = date;
            };
		};
	};
}; 