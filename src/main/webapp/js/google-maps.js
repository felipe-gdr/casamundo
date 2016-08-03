/**
 * 
 */
    /*jslint smarttabs:true */
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

	// Metro Style
	function generate_map_7(latitude, longitude, locations) {
	
/*		var locations = [
		                 ['First Shoppe', -37.808204, 144.855579],
		                 ['Second Shoppe', -37.675648, 145.026125],
		                 ['Third Shoppe', -37.816935, 144.966877],
		                 ['Fourth Shoppe', -37.818714, 145.036494],
		                 ['Fifth Shoppe', -37.793834, 144.987018],
		                 ['Sixth Shoppe', -37.737116, 144.998581],
		                 ['Seventh Shoppe', -37.765528, 144.922624]
		               ];
*/
		var myCenter=new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
	        center: new google.maps.LatLng(latitude, longitude),
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
        if (locations){
			for (i = 0; i < locations.length; i++) {  
	        	marker = new google.maps.Marker({
	            	position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	            	title: locations[i][0],
	            	map: map
	        	});
	         };
        };		
	    // Setup skin for the map
	    map.mapTypes.set('metro_style', metroStyleMap);
	    map.setMapTypeId('metro_style');
	
	};

	// Metro Style
	function generate_map_6(latitude, longitude, locations) {
	
/*		var locations = [
		                 ['First Shoppe', -37.808204, 144.855579],
		                 ['Second Shoppe', -37.675648, 145.026125],
		                 ['Third Shoppe', -37.816935, 144.966877],
		                 ['Fourth Shoppe', -37.818714, 145.036494],
		                 ['Fifth Shoppe', -37.793834, 144.987018],
		                 ['Sixth Shoppe', -37.737116, 144.998581],
		                 ['Seventh Shoppe', -37.765528, 144.922624]
		               ];
*/
		var myCenter=new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
	        center: new google.maps.LatLng(latitude, longitude),
	        zoom: 18,
	    };
		var mapProp = {
				  center:myCenter,
				  zoom:12,
				  mapTypeId:google.maps.MapTypeId.ROADMAP
				  };
	    map = new google.maps.Map(document.getElementById('map_canvas6'), mapProp);
	    var marker=new google.maps.Marker({
	    	  position:myCenter,
	    	  });
		marker.setMap(map);
        if (locations){
			for (i = 0; i < locations.length; i++) {  
	        	marker = new google.maps.Marker({
	            	position: new google.maps.LatLng(locations[i][1], locations[i][2]),
	            	title: locations[i][0],
	            	map: map
	        	});
	         };
        };		
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

	function getMapDistance (latOrigin, longOrigin, LatDestination, logDestination, key, action_ok, no_action_ok, par01, par02){

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
		  function(response, status) {
		        if (status == google.maps.DistanceMatrixStatus.OK) {
		        	action_ok(response, par01, par02);
		        } else {
		        	action_ok(false, par01, par02);
		        }
		  });
	};
	
	function callback(response, status) {
		  // See Parsing the Results for
		  // the basics of a callback function.
		}
	function callBackDistance (results, status, par01, par02){
		
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