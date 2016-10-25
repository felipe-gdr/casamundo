package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

import com.rcapitol.casamundo.Family.Documento.Payment;

public class Pickup {

	public Documento documento;

	public Pickup() {

	}

	public Pickup(Documento documento) {
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
		public String destination;
		public Payment payment;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String id,
				String name,
				String destination,
				Payment payment						
						) {
						this.id = id;
						this.name = name;
						this.destination = destination;
						this.payment = payment;
		}

		@Override
		public String toString() {
			return new StringBuffer(" Name : ").append(this.name).toString();
		}

		public static final class Payment {
			public String financialInstitution;
			public String bankNumber;
			public String branchNumber;
			public String accountNumber;

			public Payment() {

			}

			@JsonCreator
			public Payment(
					String financialInstitution,
					String bankNumber,
					String branchNumber,
					String accountNumber
			){
				this.financialInstitution = financialInstitution;
				this.bankNumber = bankNumber;
				this.branchNumber = branchNumber;
				this.accountNumber = accountNumber;
			}

		}
	}
} 