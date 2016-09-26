package com.rcapitol.casamundo;

import java.lang.reflect.Array;

import javax.ws.rs.QueryParam;

import org.codehaus.jackson.annotate.JsonCreator;

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
		public String idFloor;
		public String floorName;
		public String name;
		public String type;
		public String description;
		public String keyDoor;
		public Fotos fotos[];
		public Beds beds[];
		public Visits visits[];
		public Comments comments[];
		public Documento() {

		}

		@JsonCreator
		public Documento(
						String id,
						String idDorm,
						String idFloor,
						String name,
						String type,
						String description,
						String keyDoor,
						Fotos fotos[],						
						Beds beds[],
						Visits visits[],						
						Comments comments[]
								) {
						this.id = id;
						this.idDorm = idDorm;
						this.idFloor = idFloor;
						this.name = name; 
						this.type = type; 
						this.description = description;
						this.keyDoor = keyDoor;
						this.fotos = fotos;
						this.beds = beds;
						this.visits = visits;
						this.comments = comments;
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
			}

		}

		public static final class Beds {
			public String id;
			public String type;
			public String description;
			public String idUser;

			public Beds() {

			}

			@JsonCreator
			public Beds(
					String id,
					String type,
					String description,
					String idUser
			){
				this.id = id;
				this.type = type;
				this.description = description;
				this.idUser = idUser; 
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