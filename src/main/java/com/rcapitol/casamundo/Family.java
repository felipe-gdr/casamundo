package com.rcapitol.casamundo;

import java.lang.reflect.Array;

import org.codehaus.jackson.annotate.JsonCreator;

public class Family {

	public Documento documento;

	public Family() {

	}

	public Family(Documento documento) {
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

		public String familyName;
		public String type;
		public String numbersBedroom;
		public String numbersStudentsBedroom;
		public String offerPrivateWashroom;
		public String numberPrivateWashroom;
		public String offerInternet;
		public String havePets;
		public String firstLanguage;
		public String othersLanguage[];
		public String acceptSmokeStudent;
		public String preferAgeStudent;
		public String preferGenderStudent;
		public String mealPlan;
		public String hostVegetarianStudent;
		public String hostAnyNationalityStudent;
		public String acceptSmokeInsideHome;
		public Contact contact;
		public Address address;
		public FamilyMembers familyMembers[];
		public Rooms rooms[];

		public Documento() {

		}

		@JsonCreator
		public Documento(
						String familyName,
						String type,
						String numbersBedroom,
						String numbersStudentsBedroom,
						String offerPrivateWashroom,
						String numberPrivateWashroom,
						String offerInternet,
						String havePets,
						String firstLanguage,
						String[] othersLanguage,
						String acceptSmokeStudent,
						String preferAgeStudent,
						String preferGenderStudent,
						String mealPlan,
						String hostVegetarianStudent,
						String hostAnyNationalityStudent,
						String acceptSmokeInsideHome,
						Contact contact,
						Address address,
						FamilyMembers familyMembers[],
						Rooms rooms[]
								) {
						this.familyName = familyName; 
						this.type = type; 
						this.numbersBedroom = numbersBedroom; 
						this.numbersStudentsBedroom = numbersStudentsBedroom; 
						this.offerPrivateWashroom = offerPrivateWashroom; 
						this.numberPrivateWashroom = numberPrivateWashroom; 
						this.offerInternet = offerInternet; 
						this.havePets = havePets; 
						this.firstLanguage = firstLanguage; 
						this.othersLanguage = othersLanguage; 
						this.acceptSmokeStudent = acceptSmokeStudent; 
						this.preferAgeStudent = preferAgeStudent; 
						this.preferGenderStudent = preferGenderStudent; 
						this.mealPlan = mealPlan; 
						this.hostVegetarianStudent = hostVegetarianStudent; 
						this.hostAnyNationalityStudent = hostAnyNationalityStudent; 
						this.acceptSmokeInsideHome = acceptSmokeInsideHome; 
						this.contact = contact; 
						this.address = address; 
						this.familyMembers = familyMembers;
						this.rooms = rooms;
		}


		@Override
		public String toString() {
			return new StringBuffer(" Family Name : ").append(this.familyName).append(" Last name : ").append(this.type).toString();
		}

		public static final class Contact {
			public String firstName;
			public String lastName;
			public String gender;
			public String birthDate;
			public String ocuppation;
			public String employer;
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
					String birthDate,
					String ocuppation,
					String employer,
					String email,
					String phoneNumber,
					String mobilePhoneNumber,
					String workPhoneNumber
			){
				this.firstName = firstName;
				this.lastName = lastName;
				this.gender = gender;
				this.birthDate = birthDate;
				this.ocuppation = ocuppation;
				this.employer = employer;
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
			public String mainIntersection;
			public String nearestSubwayStation;
			public String walkingTimeSubwayStation;
			public String nearestBusStop;
			public String walkingTimeBusStation;

			public Address() {

			}

			@JsonCreator
			public Address(
					String street,
					String number,
					String city,
					String state,
					String postalCode,
					String mainIntersection,
					String nearestSubwayStation,
					String walkingTimeSubwayStation,
					String nearestBusStop,
					String walkingTimeBusStation
			){
				this.street = street ;
				this.number = number; 
				this.city = city; 
				this.state = state; 
				this.postalCode = postalCode; 
				this.mainIntersection = mainIntersection; 
				this.nearestSubwayStation = nearestSubwayStation; 
				this.walkingTimeSubwayStation = walkingTimeSubwayStation; 
				this.nearestBusStop = nearestBusStop; 
				this.walkingTimeBusStation = walkingTimeBusStation; 
			}

		}

		public static final class FamilyMembers {
    		public String name;
    		public String gender;
    		public String relationship;
    		public String birthDate;
    		public String mobilePhone;

    		public FamilyMembers() {

			}
   
            @JsonCreator
            public FamilyMembers(
            			String name,
            			String gender,
            			String relationship,
            			String birthDate,
            			String mobilePhone
            		)
            {
	    		this.name = name;
	    		this.gender = gender;
	    		this.relationship = relationship;
	    		this.birthDate = birthDate;
	    		this.mobilePhone = mobilePhone;
            }

		}

		public static final class Rooms {
    		public String number;
    		public String singleBed;
    		public String coupleBed;
    		public String privateWashroom;

    		public Rooms() {

			}
   
            @JsonCreator
            public Rooms(
            			String number,
            			String singleBed,
            			String coupleBed,
            			String privateWashroom
            		)
            {
	    		this.number = number;
	    		this.singleBed = singleBed;
	    		this.coupleBed = coupleBed;
	    		this.privateWashroom = privateWashroom;
            }

		}
	}
} 