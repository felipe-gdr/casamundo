package com.rcapitol.casamundo;

import org.codehaus.jackson.annotate.JsonCreator;

import com.rcapitol.casamundo.Family.Documento.Rooms.BlockDates;

public class Room {

	public Documento documento;

	public Room() {

	}

	public Room(Documento documento) {
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
		public String idDorm;
		public String dormName;
		public String idUnit;
		public String unitName;
		public String name;
		public String type;
		public String description;
		public String destination;
		public String keyDoor;
		public Fotos fotos[];
		public Beds beds[];
		public Visits visits[];
		public Comments comments[];
		public BlockDates blockDates[];
		public Documento() {

		};

		@JsonCreator
		public Documento(
						String id,
						String idDorm,
						String dormName,
						String idUnit,
						String unitName,
						String name,
						String type,
						String description,
						String destination,
						String keyDoor,
						Fotos fotos[],						
						Beds beds[],
						Visits visits[],						
						Comments comments[],
            			BlockDates[] blockDates
								) {
						this.id = id;
						this.idDorm = idDorm;
						this.dormName = dormName;
						this.idUnit = idUnit;
						this.unitName = unitName;
						this.name = name; 
						this.type = type; 
						this.description = description;
						this.destination = destination;
						this.keyDoor = keyDoor;
						this.fotos = fotos;
						this.beds = beds;
						this.visits = visits;
						this.comments = comments;
			    		this.blockDates = blockDates;
		}


		@Override
		public String toString() {
			return new StringBuffer(" Name : ").append(this.name).append(" Type : ").append(this.type).toString();
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
			};
		};

		public static final class Beds {
			public String id;
			public String name;
			public String type;
			public String description;
    		public Occupancies occupancies[];

			public Beds() {

			}

			@JsonCreator
			public Beds(
					String id,
					String name,
					String type,
					String description,
        			Occupancies[] occupancies
			){
				this.id = id;
				this.name = name;
				this.type = type;
				this.description = description;
	    		this.occupancies = occupancies;
			};
		};

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

			};
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
		  
        public static final class Occupancies {
    		public String idStudent;
    		public String startOccupancy;
    		public String endOccupancy;
    		public String actualTrip;

    		public Occupancies() {

			}
   
            @JsonCreator
            public Occupancies(
            			String idStudent,
            			String startOccupancy,
            			String endOccupancy,
            			String actualTrip
            		)
            {
	    		this.idStudent = idStudent;
	    		this.startOccupancy = startOccupancy;
	    		this.endOccupancy = endOccupancy;
	    		this.actualTrip = actualTrip;
            };
		};
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
        };
	};
}; 