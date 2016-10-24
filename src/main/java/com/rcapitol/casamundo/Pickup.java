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

		public String name;
		public Payment payment;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String name,
				Payment payment						
						) {
						this.name = name;  
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