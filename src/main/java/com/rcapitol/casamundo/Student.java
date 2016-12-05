package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

import com.rcapitol.casamundo.Family.Documento.Notes;

public class Student {

	public Documento documento;

	public Student() {

	}

	public Student(Documento documento) {
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

		public String lastDestination;
		public String mail;
		public String celPhone;
		public String phone;
		public String lastName;
		public String firstName;
		public String secondName;
		public String birthDay;
		public String gender;
		public String nationality;
		public String firstLanguage;
		public String profession;
		public String englishLevel;
		public String streetNumber;
		public String streetName;
		public String state;
		public String postalCode;
		public String city;
		public String country;
		public String complement;
		public String latitude;
		public String longitude;
		public String secondaryTelephone;
		public String emergencyContactName;
		public String emergencyContactPhone;
		public String emergencyContactMail;
		public String emergencyContactRelationship;
		public String actualTrip;
		public String photoPassport;
		public Trips trips [];
		public Notes notes[];


		public Documento() {

		}

		@JsonCreator
		public Documento(
						String lastDestination,
						String mail,
						String celPhone,
						String phone,
						String lastName,
						String firstName,
						String secondName,
						String birthDay,
						String gender,
						String nationality,
						String firstLanguage,
						String profession,
						String englishLevel,
						String streetNumber,
						String streetName,
						String state,
						String postalCode,
						String city,
						String country,
						String complement,
						String latitude,
						String longitude,
						String secondaryTelephone,
						String emergencyContactName,
						String emergencyContactPhone,
						String emergencyContactMail,
						String emergencyContactRelationship,
						String actualTrip,
						String photoPassport,
						Trips [] trips,
						Notes notes[]

						) {
						this.lastDestination = lastDestination;  
						this.mail = mail; 
						this.celPhone = celPhone; 
						this.phone = phone; 
						this.lastName = lastName; 
						this.firstName = firstName; 
						this.secondName = secondName; 
						this.birthDay = birthDay; 
						this.gender = gender; 
						this.nationality = nationality; 
						this.firstLanguage = firstLanguage; 
						this.profession = profession; 
						this.englishLevel = englishLevel; 
						this.streetNumber = streetNumber; 
						this.streetName = streetName; 
						this.state = state; 
						this.postalCode = postalCode; 
						this.city = city; 
						this.country = country; 
						this.complement = complement;
						this.latitude = latitude;
						this.longitude = longitude;
						this.secondaryTelephone = secondaryTelephone; 
						this.emergencyContactName = emergencyContactName; 
						this.emergencyContactPhone = emergencyContactPhone; 
						this.emergencyContactMail = emergencyContactMail; 
						this.emergencyContactRelationship = emergencyContactRelationship;
						this.actualTrip = actualTrip; 
						this.photoPassport = photoPassport;
						this.trips = trips;
						this.notes = notes;
		}

		public void setLastDestination(String lastDestination) {
			this.lastDestination = lastDestination;
		}
		public String getLastDestination() {
			return this.lastDestination;
		}
		public void setMail(String mail) {
			this.mail = mail;
		}
		public String getMail() {
			return this.mail;
		}
		public void setCelPhone(String celPhone) {
			this.celPhone = celPhone;
		}
		public String getCelPhone() {
			return this.celPhone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		public String getPhone() {
			return this.celPhone;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public String getLastName() {
			return this.lastName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getFirstName() {
			return this.firstName;
		}
		public void setBirthDay(String birthDay) {
			this.birthDay = birthDay;
		}
		public String getBirthDay() {
			return this.birthDay;
		}
		public void setGender(String gender) {
			this.gender = gender;
		}
		public String getGender() {
			return this.gender;
		}
		public void setNationality(String nationality) {
			this.nationality = nationality;
		}
		public String getNationality() {
			return this.nationality;
		}
		public void setFirstLanguage(String firstLanguage) {
			this.firstLanguage = firstLanguage;
		}
		public String getFirstLanguage() {
			return this.firstLanguage;
		}
		public void setProfession(String profession) {
			this.profession = profession;
		}
		public String getProfession() {
			return this.profession;
		}
		public void setEnglishLevel(String englishLevel) {
			this.englishLevel = englishLevel;
		}
		public String getEnglishLevel() {
			return this.englishLevel;
		}
		public void setStreetNumber(String streetNumber) {
			this.streetNumber = streetNumber;
		}
		public String getStreetNumber() {
			return this.streetNumber;
		}
		public void setStreetName(String streetName) {
			this.streetName = streetName;
		}
		public String getStreetName() {
			return this.streetName;
		}
		public void setState(String state) {
			this.state = state;
		}
		public String getState() {
			return this.state;
		}
		public void setPostalCode(String postalCode) {
			this.postalCode = postalCode;
		}
		public String getPostalCode() {
			return this.postalCode;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public String getCity() {
			return this.city;
		}
		public void setCountry(String country) {
			this.country = country;
		}
		public String getCountry() {
			return this.country;
		}
		public void setSecondaryTelephone(String secondaryTelephone) {
			this.secondaryTelephone = secondaryTelephone;
		}
		public String getSecondaryTelephone() {
			return this.secondaryTelephone;
		}
		public void setEmergencyContactName(String emergencyContactName) {
			this.emergencyContactName = emergencyContactName;
		}
		public String getEmergencyContactName() {
			return this.emergencyContactName;
		}
		public void setEmergencyContactPhone(String emergencyContactPhone) {
			this.emergencyContactPhone = emergencyContactPhone;
		}
		public String getEmergencyContactPhone() {
			return this.emergencyContactPhone;
		}
		public void setEmergencyContactMail(String emergencyContactMail) {
			this.emergencyContactMail = emergencyContactMail;
		}
		public String getEmergencyContactMail() {
			return this.emergencyContactMail;
		}
		public void setActualTrip(String actualTrip) {
			this.actualTrip = actualTrip;
		}
		public String getActualTrip() {
			return this.actualTrip;
		}
		public void setTrips(Trips[] trips) {
			this.trips = trips;
		}
		public Trips[] getTrips() {
			return this.trips;
		}

		@Override
		public String toString() {
			return new StringBuffer(" Email : ").append(this.mail).append(" Last name : ").append(this.lastName).toString();
		}

		public static final class Trips {
    		public String status;          
    		public String destination;     
    		public String familyName;     
    		public String idFamily;
    		public String idRoom;
    		public String idBed;
    		public String dormName;
    		public String unitName;
    		public String roomName;
    		public String bedName;
    		public String start;           
    		public String end;             
    		public String extend;          
    		public String arrivalDate;     
    		public String arrivalTime;    
    		public String arrivalFlightNumber;   
    		public String arrivalAirline;        
    		public String departureDate;     
    		public String departureTime;     
    		public String departureFlightNumber;   
    		public String departureAirline;        
    		public String pickup;         
    		public String dropoff;        
    		public String accommodation;  
    		public String occupancy;      
    		public String guestName;      
    		public String guestEmail;      
    		public String relationship;   
    		public String mealPlan[];       
    		public String specialDiet[];    
    		public String privateWashroom;
    		public String smoke;          
    		public String liveDogs;       
    		public String liveCats;       
    		public String liveWithChildren;
    		public String hobbies;        
    		public String comments;       
    		public String medical;        
    		public String agreeTerm;      
    		public String usuallyStudy[];   
    		public String keepBedroom[];    
    		public String iAmUsually[];     
    		public String creditCardType; 
    		public String creditCardNumber;
    		public String creditCardExpire;
    		public String creditCardCVC;   
    		public String agreeDebit;      
    		public String apartamentType;  
    		public String petsQuantity;    
    		public String petType;         
    		public String parking;         
    		public String wifi;            
    		public String peopleQuantity;  
    		public String guest_01;        
    		public String guest_02;        
    		public String guest_03;        
    		public String guest_04;        
    		public String guest_05;        
    		public String agreeDebitSuite; 
    		public String agreeSuite;
    		public String agencyId;
    		public String agencyName;
    		public String agencyConsultName;
    		public String schoolId;
    		public String schoolName;
    		public String schoolConsultName;

    		public Trips() {

			}
   
            @JsonCreator
            public Trips(
        	    		String status,          
        	    		String destination,     
        	    		String familyName,     
        	    		String idFamily,
        	    		String idRoom,
        	    		String idBed,
        	    		String dormName,
        	    		String unitName,
        	    		String roomName,
        	    		String bedName,
        	    		String start,           
        	    		String end,             
        	    		String extend,          
        	    		String arrivalDate,     
        	    		String arrivalTime,    
        	    		String arrivalFlightNumber,   
        	    		String arrivalAirline,        
        	    		String departureDate,     
        	    		String departureTime,     
        	    		String departureFlightNumber,   
        	    		String departureAirline,        
        	    		String pickup,         
        	    		String dropoff,        
        	    		String accommodation,  
        	    		String occupancy,      
        	    		String guestName,
        	    		String guestEmail,
        	    		String relationship,   
        	    		String [] mealPlan,       
        	    		String [] specialDiet,    
        	    		String privateWashroom,
        	    		String smoke,          
        	    		String liveDogs,       
        	    		String liveCats, 
        	    		String liveWithChildren,
        	    		String hobbies,        
        	    		String comments,       
        	    		String medical,        
        	    		String agreeTerm,      
        	    		String [] usuallyStudy,   
        	    		String [] keepBedroom,    
        	    		String [] iAmUsually,     
        	    		String creditCardType, 
        	    		String creditCardNumber,
        	    		String creditCardExpire,
        	    		String creditCardCVC,   
        	    		String agreeDebit,      
        	    		String apartamentType,  
        	    		String petsQuantity,    
        	    		String petType,         
        	    		String parking,         
        	    		String wifi,            
        	    		String peopleQuantity,  
        	    		String guest_01,        
        	    		String guest_02,        
        	    		String guest_03,        
        	    		String guest_04,        
        	    		String guest_05,        
        	    		String agreeDebitSuite, 
        	    		String agreeSuite,
        	    		String agencyId,
        	    		String agencyName,
        	    		String agencyConsultName,
        	    		String schoolId,
        	    		String schoolName,
        	    		String schoolConsultName
            		)
            {
	    		this.status = status;           
	    		this.destination = destination;      
	    		this.familyName = familyName;      
	    		this.idFamily = idFamily;
	    		this.idRoom = idRoom;
	    		this.idBed = idBed;
	    		this.dormName = dormName;
	    		this.unitName = unitName;
	    		this.roomName = roomName;
	    		this.bedName = bedName;
	    		this.start = start;            
	    		this.end = end;              
	    		this.extend = extend;           
	    		this.arrivalDate = arrivalDate;      
	    		this.arrivalTime = arrivalTime;     
	    		this.arrivalFlightNumber = arrivalFlightNumber;   
	    		this.arrivalAirline = arrivalAirline;        
	    		this.departureDate = departureDate;     
	    		this.departureTime = departureTime;     
	    		this.departureFlightNumber = departureFlightNumber;   
	    		this.departureAirline = departureAirline;        
	    		this.pickup = pickup;          
	    		this.dropoff = dropoff;         
	    		this.accommodation = accommodation;   
	    		this.occupancy = occupancy;       
	    		this.guestName = guestName;
	    		this.guestEmail = guestEmail;
	    		this.relationship = relationship;    
	    		this.mealPlan = mealPlan;        
	    		this.specialDiet = specialDiet;     
	    		this.privateWashroom = privateWashroom; 
	    		this.smoke = smoke;           
	    		this.liveDogs = liveDogs;        
	    		this.liveCats = liveCats; 
	    		this.liveWithChildren = liveWithChildren;
	    		this.hobbies = hobbies;         
	    		this.comments = comments;        
	    		this.medical = medical;         
	    		this.agreeTerm = agreeTerm;       
	    		this.usuallyStudy = usuallyStudy;    
	    		this.keepBedroom = keepBedroom;     
	    		this.iAmUsually = iAmUsually;      
	    		this.creditCardType = creditCardType;  
	    		this.creditCardNumber = creditCardNumber; 
	    		this.creditCardExpire = creditCardExpire; 
	    		this.creditCardCVC = creditCardCVC;    
	    		this.agreeDebit = agreeDebit;       
	    		this.apartamentType = apartamentType;   
	    		this.petsQuantity = petsQuantity;     
	    		this.petType = petType;          
	    		this.parking = parking;          
	    		this.wifi = wifi ;             
	    		this.peopleQuantity = peopleQuantity;   
	    		this.guest_01 = guest_01;         
	    		this.guest_02 = guest_02;         
	    		this.guest_03 = guest_03;         
	    		this.guest_04 = guest_04;         
	    		this.guest_05 = guest_05;         
	    		this.agreeDebitSuite = agreeDebitSuite;  
	    		this.agreeSuite = agreeSuite;
	    		this.agencyId = agencyId;
	    		this.agencyName = agencyName;
	    		this.agencyConsultName = agencyConsultName;
	    		this.schoolId = schoolId;
	    		this.schoolName = schoolName;
	    		this.schoolConsultName = schoolConsultName;
            }

		}
	}
} 