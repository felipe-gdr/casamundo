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
	

