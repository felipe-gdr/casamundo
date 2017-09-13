package com.rcapitol.casamundo;

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
		public String haveDogs;
		public String haveCats;
		public String haveOtherPet;
		public String otherPet;
		public String firstLanguage;
		public String background;
		public String othersLanguage[];
		public String acceptSmokeStudent;
		public String preferAgeStudent[];
		public String preferGenderStudent[];
		public String mealPlan[];       
		public String specialDiet[];
		public String dontHostNationality[];
		public String acceptSmokeInsideHome;
		public String howLongHaveYouBeen;
		public String description;
		public String uploadContract;
		public Contact contact;
		public Address address;
		public Payment payment;
		public Fotos fotos;
		public Docs docs;
		public FamilyMembers familyMembers[];
		public Rooms rooms[];
		public Notes notes[];
		public Visits visits[];
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
						String haveDogs,
						String haveCats,
						String haveOtherPet,
						String otherPet,
						String firstLanguage,
						String background,
						String[] othersLanguage,
						String acceptSmokeStudent,
						String[] preferAgeStudent,
						String[] preferGenderStudent,
						String[] mealPlan,
						String[] specialDiet,
						String[] dontHostNationality,
						String acceptSmokeInsideHome,
						String howLongHaveYouBeen,
						String description,
						String uploadContract,
						Contact contact,
						Address address,
						Payment payment,						
						Fotos fotos,
						Docs docs,
						FamilyMembers familyMembers[],
						Rooms rooms[],
						Notes notes[],
						Visits visits[]						
								) {
						this.familyName = familyName; 
						this.type = type; 
						this.numbersBedroom = numbersBedroom; 
						this.numbersStudentsBedroom = numbersStudentsBedroom; 
						this.offerPrivateWashroom = offerPrivateWashroom; 
						this.numberPrivateWashroom = numberPrivateWashroom; 
						this.offerInternet = offerInternet; 
						this.haveDogs = haveDogs; 
						this.haveCats = haveCats; 
						this.haveOtherPet = haveOtherPet; 
						this.otherPet = otherPet; 
						this.firstLanguage = firstLanguage; 
						this.background = background; 
						this.othersLanguage = othersLanguage; 
						this.acceptSmokeStudent = acceptSmokeStudent; 
						this.preferAgeStudent = preferAgeStudent; 
						this.preferGenderStudent = preferGenderStudent; 
						this.mealPlan = mealPlan; 
						this.specialDiet = specialDiet; 
						this.dontHostNationality = dontHostNationality; 
						this.acceptSmokeInsideHome = acceptSmokeInsideHome; 
						this.howLongHaveYouBeen = howLongHaveYouBeen;;
						this.description = description;;
						this.uploadContract = uploadContract;
						this.contact = contact; 
						this.address = address; 
						this.payment = payment;
						this.fotos = fotos;
						this.docs = docs;
						this.familyMembers = familyMembers;
						this.rooms = rooms;
						this.notes = notes;
						this.visits = visits;
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
			public String docDate;
			public String docs;

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
					String workPhoneNumber,
					String docDate,
					String docs
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
				this.docDate = docDate;
				this.docs = docs;
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

		public static final class Payment {
			public String financialInstitution;
			public String accountHolder;
			public String bankNumber;
			public String branchNumber;
			public String accountNumber;

			public Payment() {

			}

			@JsonCreator
			public Payment(
					String financialInstitution,
					String accountHolder,
					String bankNumber,
					String branchNumber,
					String accountNumber
			){
				this.financialInstitution = financialInstitution;
				this.accountHolder = accountHolder;
				this.bankNumber = bankNumber;
				this.branchNumber = branchNumber;
				this.accountNumber = accountNumber;
			}

		}

		public static final class Fotos {
			public String photo01;
			public String photo02;
			public String photo03;
			public String photo04;
			public String photo05;
			public String photo06;

			public Fotos() {

			}

			@JsonCreator
			public Fotos(
					String photo01,
					String photo02,
					String photo03,
					String photo04,
					String photo05,
					String photo06
			){
				this.photo01 = photo01;
				this.photo02 = photo02; 
				this.photo03 = photo03; 
				this.photo04 = photo04; 
				this.photo05 = photo05; 
				this.photo06 = photo06; 
			}

		}


		public static final class Docs {
			public String docs0;
			public String docs1;
			public String docs2;
			public String docs3;
			public String docs4;
			public String docs5;
			public String docs6;

			public Docs() {

			}

			@JsonCreator
			public Docs(
					String docs0,
					String docs1,
					String docs2,
					String docs3,
					String docs4,
					String docs5,
					String docs6
			){
				this.docs0 = docs0;
				this.docs1 = docs1;
				this.docs2 = docs2; 
				this.docs3 = docs3; 
				this.docs4 = docs4; 
				this.docs5 = docs5; 
				this.docs6 = docs6; 
			}

		}

		public static final class FamilyMembers {
    		public String name;
    		public String gender;
    		public String relationship;
    		public String birthDate;
    		public String ocuppation ;
    		public String docDate;
    		public String docs;

    		public FamilyMembers() {

			}
   
            @JsonCreator
            public FamilyMembers(
            			String name,
            			String gender,
            			String relationship,
            			String birthDate,
            			String ocuppation ,
            			String docDate,
            			String docs
            		)
            {
	    		this.name = name;
	    		this.gender = gender;
	    		this.relationship = relationship;
	    		this.birthDate = birthDate;
	    		this.ocuppation = ocuppation ;
	    		this.docDate = docDate;
	    		this.docs = docs;
            }

		}

		public static final class Rooms {
    		public String number;
    		public String singleBed;
    		public String coupleBed;
    		public String privateWashroom;
    		public String level;
    		public String photo;
    		public String note;
    		public OccupancySingleBed occupancySingleBed[];
    		public OccupancyCoupleBed occupancyCoupleBed[];
    		public BlockDates blockDates[];

    		public Rooms() {

			}
   
            @JsonCreator
            public Rooms(
            			String number,
            			String singleBed,
            			String coupleBed,
            			String privateWashroom,
            			String level,
            			String photo,
            			String note,
            			OccupancySingleBed[] occupancySingleBed,
            			OccupancyCoupleBed[] occupancyCoupleBed,
            			BlockDates[] blockDates
            		)
            {
	    		this.number = number;
	    		this.singleBed = singleBed;
	    		this.coupleBed = coupleBed;
	    		this.level = level;
	    		this.photo = photo;
	    		this.note = note;
	    		this.privateWashroom = privateWashroom;
	    		this.occupancySingleBed = occupancySingleBed;
	    		this.occupancyCoupleBed = occupancyCoupleBed;
	    		this.blockDates = blockDates;
            };
  
            public static final class OccupancySingleBed {
        		public String emailStudent;
        		public String idStudent;
        		public String actualTrip;
        		public String startOccupancy;
        		public String endOccupancy;

        		public OccupancySingleBed() {

    			}
       
                @JsonCreator
                public OccupancySingleBed(
                			String emailStudent,
                			String idStudent,
                			String actualTrip,
                			String startOccupancy,
                			String endOccupancy
                		)
                {
    	    		this.emailStudent = emailStudent;
    	    		this.idStudent = idStudent;
    	    		this.actualTrip = actualTrip;
    	    		this.startOccupancy = startOccupancy;
    	    		this.endOccupancy = endOccupancy;
                }

    		}
            
            public static final class OccupancyCoupleBed {
        		public String emailStudent;
        		public String idStudent;
        		public String actualTrip;
        		public String startOccupancy;
        		public String endOccupancy;

        		public OccupancyCoupleBed() {

    			}
       
                @JsonCreator
                public OccupancyCoupleBed(
                			String emailStudent,
                			String idStudent,
                			String actualTrip,
                			String startOccupancy,
                			String endOccupancy
                		)
                {
    	    		this.emailStudent = emailStudent;
    	    		this.idStudent = idStudent;
    	    		this.actualTrip = actualTrip;
    	    		this.startOccupancy = startOccupancy;
    	    		this.endOccupancy = endOccupancy;
                }

    		}
            public static final class BlockDates {
        		public String start;
        		public String end;

        		public BlockDates() {

    			}
       
                @JsonCreator
                public BlockDates(
                			String start,
                			String end
                		)
                {
    	    		this.start = start;
    	    		this.end = end;
                }
            }
		}

		public static final class Notes {
    		public String date;
    		public String user;
    		public String note;

    		public Notes() {

			}
   
            @JsonCreator
            public Notes(
            			String date,
            			String user,
            			String note
            			)
            {
	    		this.date = date;
	    		this.user = user;
	    		this.note = note;
            };

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

		}
	};
}; 