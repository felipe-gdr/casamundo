package com.rcapitol.casamundo;

import java.lang.reflect.Array;

import javax.ws.rs.QueryParam;

import org.codehaus.jackson.annotate.JsonCreator;

public class Dorm {

	public Documento documento;

	public Dorm() {

	}

	public Dorm(Documento documento) {
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
		public String type;
		public String description;
		public String destination;
		public String keyDoor;
		public Contact contact;
		public Address address;
		public Fotos fotos[];
		public Floors floors[];
		public Visits visits[];
		public Comments comments[];
		public Documento() {

		}

		@JsonCreator
		public Documento(
						String id,
						String name,
						String type,
						String description,
						String destination,
						String keyDoor,
						Contact contact,
						Address address,
						Fotos fotos[],						
						Floors floors[],
						Visits visits[],						
						Comments comments[]
								) {
						this.id = id;
						this.name = name; 
						this.type = type; 
						this.description = description;
						this.destination = destination;
						this.keyDoor = keyDoor;
						this.contact = contact; 
						this.address = address; 
						this.fotos = fotos;
						this.floors = floors;
						this.visits = visits;
						this.comments = comments;
		}


		@Override
		public String toString() {
			return new StringBuffer(" Name : ").append(this.name).append(" Type : ").append(this.type).toString();
		}

		public static final class Contact {
			public String firstName;
			public String lastName;
			public String gender;
			public String email;
			public String phoneNumber;
			public String mobilePhoneNumber;
			public String workPhoneNumber;

			public Contact() {

			}

			@JsonCreator
			public Contact(
					String firstName,
					String lastName,
					String gender,
					String email,
					String phoneNumber,
					String mobilePhoneNumber,
					String workPhoneNumber
			){
				this.firstName = firstName;
				this.lastName = lastName;
				this.gender = gender;
				this.email = email;
				this.phoneNumber = phoneNumber;
				this.mobilePhoneNumber = mobilePhoneNumber;
				this.workPhoneNumber = workPhoneNumber;
			}

		}

		public static final class Address {
			public String street;
			public String number;
			public String city;
			public String state;
			public String postalCode;
			public String complement;
			public String mainIntersection;
			public String nearestSubwayStation;
			public String timeSubwayStation;
			public String subwayStation;
			public String latitude;
			public String longitude;
			public String destination;

			public Address() {

			}

			@JsonCreator
			public Address(
					String street,
					String number,
					String city,
					String state,
					String postalCode,
					String complement,
					String mainIntersection,
					String nearestSubwayStation,
					String timeSubwayStation,
					String subwayStation,
					String latitude,
					String longitude,
					String destination
			){
				this.street = street ;
				this.number = number; 
				this.city = city; 
				this.state = state; 
				this.postalCode = postalCode;
				this.complement = complement;
				this.mainIntersection = mainIntersection; 
				this.nearestSubwayStation = nearestSubwayStation; 
				this.timeSubwayStation = timeSubwayStation;
				this.subwayStation = subwayStation; 
				this.latitude = latitude; 
				this.latitude = latitude; 
				this.destination = destination; 
			}

		}

		public static final class Fotos {
			public String fileName;

			public Fotos() {

			}

			@JsonCreator
			public Fotos(
					String fileName
			){
				this.fileName = fileName;
			}

		}

		public static final class Floors {
			public String id;
			public String name;
			public String description;
			public String keyDoor;

			public Floors() {

			}

			@JsonCreator
			public Floors(
					String id,
					String name,
					String description,
					String keyDoor
			){
				this.id = id;
				this.name = name;
				this.description = description;
				this.keyDoor = keyDoor; 
			}

		}


		public static final class Visits {
    		public String date;
    		public String user;
    		public String comments;

    		public Visits() {

			}
   
            @JsonCreator
            public Visits(
            			String date,
            			String user,
            			String comments
            			)
            {
	    		this.date = date;
	    		this.user = user;
	    		this.comments = comments;
            };
		};

		public static final class Comments {
    		public String date;
    		public String user;
    		public String comments;

    		public Comments() {

			}
   
            @JsonCreator
            public Comments(
            			String date,
            			String user,
            			String comments
            			)
            {
	    		this.date = date;
	    		this.user = user;
	    		this.comments = comments;
            };
		};
	};
}; 