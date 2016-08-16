package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class StudentFilters {

	public Documento documento;

	public StudentFilters() {

	}

	public StudentFilters(Documento documento) {
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

		public String filter_student;
		public String filter_gender;
		public String filter_nationality;
		public String filter_age_from;
		public String filter_age_to;
		public String filter_check_in;
		public String filter_check_out;
		public String filter_status;
		public String filter_payment;
		public String filter_visa;
		public String filter_flight;
		public String filter_pickup;
		public String filter_dropoff;
		public String filter_school;
		public String filter_agent;
		public String filter_host;
		public String filter_driver;
		public String filter_occupancy;
		public String filter_private_wc;
		public String filter_dogs;
		public String filter_cats;
		public String filter_meals;
		public String filter_comments;

		public Documento() {

		}

		@JsonCreator
		public Documento(
				String filter_student,
				String filter_gender,
				String filter_nationality,
				String filter_age_from,
				String filter_age_to,
				String filter_check_in,
				String filter_check_out,
				String filter_status,
				String filter_payment,
				String filter_visa,
				String filter_flight,
				String filter_pickup,
				String filter_dropoff,
				String filter_school,
				String filter_agent,
				String filter_host,
				String filter_driver,
				String filter_occupancy,
				String filter_private_wc,
				String filter_dogs,
				String filter_cats,
				String filter_meals,
				String filter_comments
						) {
						this.filter_student = filter_student;
						this.filter_gender = filter_gender;
						this.filter_nationality = filter_nationality;
						this.filter_age_from = filter_age_from;
						this.filter_age_to = filter_age_to;
						this.filter_check_in = filter_check_in;
						this.filter_check_out = filter_check_out;
						this.filter_status = filter_status;
						this.filter_payment = filter_payment;
						this.filter_visa = filter_visa;
						this.filter_flight = filter_flight;
						this.filter_pickup = filter_pickup;
						this.filter_dropoff = filter_dropoff;
						this.filter_school = filter_school;
						this.filter_agent = filter_agent;
						this.filter_host = filter_host;
						this.filter_driver = filter_driver;
						this.filter_occupancy = filter_occupancy;
						this.filter_private_wc = filter_private_wc;
						this.filter_dogs = filter_dogs;
						this.filter_cats = filter_cats;
						this.filter_meals = filter_meals;
						this.filter_comments = filter_comments;
		};

		@Override
		public String toString() {
			return new StringBuffer(" Student : ").append(this.filter_student).append(" Gender : ").append(this.filter_gender).toString();
		}
	}
} 