/**
 * 
 */
    /*jslint smarttabs:true */
	var colorful_style = [{

		"featureType" : "landscape",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "transit",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#d3d3d3"
		}, {
			"visibility" : "on"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "landscape",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#b1bc39"
		}]
	}, {
		"featureType" : "landscape.man_made",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#ebad02"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#416d9f"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#000000"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "off"
		}, {
			"color" : "#ffffff"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#000000"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#ffffff"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.icon",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#ebad02"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#8ca83c"
		}]
	}];

	// Grey Scale
	var greyscale_style = [{
		"featureType" : "road.highway",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "landscape",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "transit",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"stylers" : [{
			"visibility" : "on"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#d3d3d3"
		}, {
			"visibility" : "on"
		}]
	}, {
		"featureType" : "poi.medical",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.medical",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"color" : "#cccccc"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#cecece"
		}]
	}, {
		"featureType" : "road.local",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#808080"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#808080"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#fdfdfd"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.icon",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#d2d2d2"
		}]
	}];

	// Black & White
	var monochrome_style = [{
		"featureType" : "road.highway",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "landscape",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "transit",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#d3d3d3"
		}, {
			"visibility" : "on"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "landscape",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#ffffff"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#cecece"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#000000"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#ffffff"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#000000"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#000000"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.icon",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "off"
		}]
	}];

	// Retro
	var metro_style = [{
		"featureType" : "transit",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#d3d3d3"
		}, {
			"visibility" : "on"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "landscape",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#eee8ce"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#b8cec9"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#000000"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "off"
		}, {
			"color" : "#ffffff"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#000000"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#ffffff"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.icon",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#d3cdab"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#ced09d"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}];

	// Night
	var nightvision_style = [{
		"featureType" : "landscape",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "transit",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#d3d3d3"
		}, {
			"visibility" : "on"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "landscape",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"hue" : "#0008ff"
		}, {
			"lightness" : -75
		}, {
			"saturation" : 10
		}]
	}, {
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"color" : "#1f1d45"
		}]
	}, {
		"featureType" : "landscape.natural",
		"stylers" : [{
			"color" : "#1f1d45"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#01001f"
		}]
	}, {
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#e7e8ec"
		}]
	}, {
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#151348"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#f7fdd9"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#01001f"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#316694"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.icon",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#1a153d"
		}]

	}];

	// Night Light
	var nightvision_highlight_style = [{
		"elementType" : "geometry",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"hue" : "#232a57"
		}]
	}, {
		"featureType" : "road.highway",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "landscape",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"hue" : "#0033ff"
		}, {
			"saturation" : 13
		}, {
			"lightness" : -77
		}]
	}, {
		"featureType" : "landscape",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"color" : "#4657ab"
		}]
	}, {
		"featureType" : "transit",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#0d0a1f"
		}]
	}, {
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#d2cfe3"
		}]
	}, {
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#0d0a1f"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#ffffff"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#0d0a1f"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#ff9910"
		}]
	}, {
		"featureType" : "road.local",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#4657ab"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.icon",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#232a57"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#232a57"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}];

	// Papiro
	var old_paper_style = [{
		"elementType" : "geometry",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#f2e48c"
		}]
	}, {
		"featureType" : "road.highway",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "transit",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi.park",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"color" : "#d3d3d3"
		}, {
			"visibility" : "on"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "landscape",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#f2e48c"
		}]
	}, {
		"featureType" : "landscape",
		"elementType" : "geometry.stroke",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#592c00"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#a77637"
		}]
	}, {
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#592c00"
		}]
	}, {
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#f2e48c"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#592c00"
		}]
	}, {
		"featureType" : "administrative",
		"elementType" : "labels.text.stroke",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#f2e48c"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#a5630f"
		}]
	}, {
		"featureType" : "road.highway",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "on"
		}, {
			"color" : "#592c00"
		}]
	}, {
		"featureType" : "road",
		"elementType" : "labels.icon",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "water",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "geometry.fill",
		"stylers" : [{
			"visibility" : "off"
		}]
	}, {
		"featureType" : "poi",
		"elementType" : "labels",
		"stylers" : [{
			"visibility" : "off"
		}]
	}];

	// One color - Change the hue value for your desired color
	var mono_color_style = [{
		"stylers" : [{
			"hue" : "#ff00aa"
		}, {
			"saturation" : 1
		}, {
			"lightness" : 1
		}]
	}];

	/*
	 * Google Maps Initialize
	 */


	
    $this = $("#map_canvas");
    $zoom_level = ($this.data("gmap-zoom") || 5);
    $data_lat = ($this.data("gmap-lat") || 29.895883);
    $data_lng = ($this.data("gmap-lng") || -80.650635);
    $xml_src = ($this.data("gmap-src") || "xml/gmap/pins.xml");

    metroStyleMap = new google.maps.StyledMapType(metro_style, {
        name: "Metro"
    });

    var latitude = 43.766437;
    var longitude = -79.400039;
    generate_map_7(latitude, longitude);

	// Metro Style
	function generate_map_7(latitude, longitude) {
	
		var myCenter=new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
	        center: new google.maps.LatLng(latitude, -79.400039),
	        zoom: 18,
	    };
		var mapProp = {
				  center:myCenter,
				  zoom:12,
				  mapTypeId:google.maps.MapTypeId.ROADMAP
				  };
	    map = new google.maps.Map(document.getElementById('map_canvas7'), mapProp);
	    var marker=new google.maps.Marker({
	    	  position:myCenter,
	    	  });
	
		marker.setMap(map);
		
	    // Setup skin for the map
	    map.mapTypes.set('metro_style', metroStyleMap);
	    map.setMapTypeId('metro_style');
	
	};
	function getMapCoordinate(address, key, action_ok, no_action_ok){
		var geocoder = new google.maps.Geocoder();
	    geocoder.geocode( { 'address': address}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	    	  action_ok (results);
	      } else {
	    	  no_action_ok(status);
	      }
	    });
	};

	function getMapDistance (latOrigin, longOrigin, LatDestination, logDestination, key, action_ok, no_action_ok){
		var origin1 = new google.maps.LatLng(latOrigin, longOrigin);
		var origin2 = "";
		var destinationA = "";
		var destinationB = new google.maps.LatLng(LatDestination, logDestination);
	
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		  {
		    origins: [origin1],
		    destinations: [destinationB],
		    travelMode: google.maps.TravelMode.TRANSIT,
		  },
		  action_ok (results));
	};
	
	function callback(response, status) {
	  // See Parsing the Results for
	  // 
	};
	
	
	//
	// *****   formato dos results
	//
	/* 
	{
	   "results" : [
	      {
	         "address_components" : [
	            {
	               "long_name" : "327",
	               "short_name" : "327",
	               "types" : [ "street_number" ]
	            },
	            {
	               "long_name" : "Rua da Granja Julieta",
	               "short_name" : "Rua da Granja Julieta",
	               "types" : [ "route" ]
	            },
	            {
	               "long_name" : "Granja Julieta",
	               "short_name" : "Granja Julieta",
	               "types" : [ "sublocality_level_1", "sublocality", "political" ]
	            },
	            {
	               "long_name" : "São Paulo",
	               "short_name" : "São Paulo",
	               "types" : [ "locality", "political" ]
	            },
	            {
	               "long_name" : "São Paulo",
	               "short_name" : "São Paulo",
	               "types" : [ "administrative_area_level_2", "political" ]
	            },
	            {
	               "long_name" : "São Paulo",
	               "short_name" : "SP",
	               "types" : [ "administrative_area_level_1", "political" ]
	            },
	            {
	               "long_name" : "Brasil",
	               "short_name" : "BR",
	               "types" : [ "country", "political" ]
	            },
	            {
	               "long_name" : "04721-060",
	               "short_name" : "04721-060",
	               "types" : [ "postal_code" ]
	            }
	         ],
	         "formatted_address" : "Rua da Granja Julieta, 327 - Granja Julieta, São Paulo - SP, 04721-060, Brasil",
	         "geometry" : {
	            "location" : {
	               "lat" : -23.6403347,
	               "lng" : -46.70176
	            },
	            "location_type" : "ROOFTOP",
	            "viewport" : {
	               "northeast" : {
	                  "lat" : -23.6389857197085,
	                  "lng" : -46.7004110197085
	               },
	               "southwest" : {
	                  "lat" : -23.6416836802915,
	                  "lng" : -46.7031089802915
	               }
	            }
	         },
	         "partial_match" : true,
	         "place_id" : "ChIJGXSG_vpQzpQR4j9PlpvlaAY",
	         "types" : [ "street_address" ]
	      }
	   ],
	   "status" : "OK"
	}
	*/