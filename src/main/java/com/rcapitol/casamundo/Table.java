package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

public class Table {

	public Documento documento;

	public Table() {

	}

	public Table(Documento documento) {
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

        public String nationality[];                  
        public String mainPurposeTrip[];              
        public String englishLevel[];                 
        public String state[];                        
        public String city[];                         
        public String country[];                      
        public String firstLanguage[];                
        public String status[];                       
        public String destination[];                  
        public String accommodation[];                
        public String occupancy[];                    
        public String relationship[];                 
        public String mealPlan[];                     
        public String usuallyStudy[];                 
        public String keepBedroom[];                  
        public String iAmUsually[];                   
        public String creditCardType[];               
        public String apartamentType[];               
        public String peopleQuantity[];               
        public String specialDiet[];                  
        public String type[];                  

		public Documento() {

		}

		@JsonCreator
		public Documento(
				        String[] nationality,                  
				        String[] mainPurposeTrip,              
				        String[] englishLevel,                 
				        String[] state,                        
				        String[] city,                         
				        String[] country,                      
				        String[] firstLanguage,                
				        String[] status,                       
				        String[] destination,                  
				        String[] accommodation,                
				        String[] occupancy,                    
				        String[] relationship,                 
				        String[] mealPlan,                     
				        String[] usuallyStudy,                 
				        String[] keepBedroom,                  
				        String[] iAmUsually,                   
				        String[] creditCardType,               
				        String[] apartamentType,               
				        String[] peopleQuantity,               
				        String[] specialDiet,
				        String[] type
						) {
				        this.nationality = nationality;                  
				        this.mainPurposeTrip = mainPurposeTrip;              
				        this.englishLevel = englishLevel;                 
				        this.state = state;                        
				        this.city = city;                         
				        this.country = country;                      
				        this.firstLanguage = firstLanguage;                
				        this.status = status;                       
				        this.destination = destination;                  
				        this.accommodation = accommodation;                
				        this.occupancy = occupancy;                    
				        this.relationship = relationship;                 
				        this.mealPlan = mealPlan;                     
				        this.usuallyStudy = usuallyStudy;
				        this.keepBedroom = keepBedroom;                  
				        this.iAmUsually = iAmUsually;                   
				        this.creditCardType = creditCardType;
				        this.apartamentType = apartamentType;
				        this.peopleQuantity = peopleQuantity;
				        this.specialDiet = specialDiet;
				        this.type = type;
		}

		@Override
		public String toString() {
			return new StringBuffer(" Nationality : ").append(this.nationality).toString();
		}
	}
} 