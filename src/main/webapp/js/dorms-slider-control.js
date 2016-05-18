/**
 * 
 */

	// setup time slider
	var current_time = (new Date()).getTime() + ((new Date()).getTimezoneOffset() * 60 * 1000 * -1);
	$("#build_1").click(function(){
		$('#slider123').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-1').TimeSlider('remove', "c5");
				$('#slider123-2').TimeSlider('remove', "c5");
				$('#slider123-3').TimeSlider('remove', "c5");
				$('#slider123-4').TimeSlider('remove', "c5");
				$('#slider123').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 240 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   }
			]
		});
		$('#slider123-1').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123').TimeSlider('remove', "c5");
				$('#slider123-2').TimeSlider('remove', "c5");
				$('#slider123-3').TimeSlider('remove', "c5");
				$('#slider123-4').TimeSlider('remove', "c5");
				$('#slider123-1').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 120 * 1000)),
                       'stop': current_time + 3600 * 264  * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 264 * 1000)),
                       'stop': current_time + 3600 * 960 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 96 * 1000)),
                       'stop': current_time + 3600 * 96 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});
		$('#slider123-2').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123').TimeSlider('remove', "c5");
				$('#slider123-1').TimeSlider('remove', "c5");
				$('#slider123-3').TimeSlider('remove', "c5");
				$('#slider123-4').TimeSlider('remove', "c5");
				$('#slider123-2').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 144 * 1000)),
                       'stop': current_time + 3600 * 24 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});
		$('#slider123-3').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123').TimeSlider('remove', "c5");
				$('#slider123-1').TimeSlider('remove', "c5");
				$('#slider123-2').TimeSlider('remove', "c5");
				$('#slider123-4').TimeSlider('remove', "c5");
				$('#slider123-3').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   }
			]
		});
		$('#slider123-4').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123').TimeSlider('remove', "c5");
				$('#slider123-1').TimeSlider('remove', "c5");
				$('#slider123-2').TimeSlider('remove', "c5");
				$('#slider123-3').TimeSlider('remove', "c5");
				$('#slider123-4').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});
	});
	$("#build_3").click(function(){
		$('#slider123-21').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				var new_diagrama = 
					'{' +
						'"_id":"c25",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-22').TimeSlider('remove', "c25");
				$('#slider123-23').TimeSlider('remove', "c25");
				$('#slider123-21').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c21',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c22',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c23',
                       'start': (current_time - (3600 * 240 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   }
			]
		});
		$('#slider123-22').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c25",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-21').TimeSlider('remove', "c25");
				$('#slider123-23').TimeSlider('remove', "c25");
				$('#slider123-22').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c21',
                       'start': (current_time + (3600 * 120 * 1000)),
                       'stop': current_time + 3600 * 264  * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c22',
                       'start': (current_time + (3600 * 264 * 1000)),
                       'stop': current_time + 3600 * 960 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c23',
                       'start': (current_time - (3600 * 96 * 1000)),
                       'stop': current_time + 3600 * 96 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});
		$('#slider123-23').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c25",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-21').TimeSlider('remove', "c25");
				$('#slider123-22').TimeSlider('remove', "c25");
				$('#slider123-23').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c21',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c22',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c23',
                       'start': (current_time - (3600 * 144 * 1000)),
                       'stop': current_time + 3600 * 24 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});
	});
	$("#build_2").click(function(){
		$('#slider123-31').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-32').TimeSlider('remove', "c5");
				$('#slider123-33').TimeSlider('remove', "c5");
				$('#slider123-34').TimeSlider('remove', "c5");
				$('#slider123-35').TimeSlider('remove', "c5");
				$('#slider123-36').TimeSlider('remove', "c5");
				$('#slider123-37').TimeSlider('remove', "c5");
				$('#slider123-31').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   }
			]
		});
		$('#slider123-32').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-31').TimeSlider('remove', "c5");
				$('#slider123-33').TimeSlider('remove', "c5");
				$('#slider123-34').TimeSlider('remove', "c5");
				$('#slider123-35').TimeSlider('remove', "c5");
				$('#slider123-36').TimeSlider('remove', "c5");
				$('#slider123-37').TimeSlider('remove', "c5");
				$('#slider123-32').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});
		$('#slider123-33').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-31').TimeSlider('remove', "c5");
				$('#slider123-32').TimeSlider('remove', "c5");
				$('#slider123-34').TimeSlider('remove', "c5");
				$('#slider123-35').TimeSlider('remove', "c5");
				$('#slider123-36').TimeSlider('remove', "c5");
				$('#slider123-37').TimeSlider('remove', "c5");
				$('#slider123-33').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 120 * 1000)),
                       'stop': current_time + 3600 * 264  * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 264 * 1000)),
                       'stop': current_time + 3600 * 960 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 96 * 1000)),
                       'stop': current_time + 3600 * 96 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});
		$('#slider123-34').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-31').TimeSlider('remove', "c5");
				$('#slider123-32').TimeSlider('remove', "c5");
				$('#slider123-33').TimeSlider('remove', "c5");
				$('#slider123-35').TimeSlider('remove', "c5");
				$('#slider123-36').TimeSlider('remove', "c5");
				$('#slider123-37').TimeSlider('remove', "c5");
				$('#slider123-34').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 144 * 1000)),
                       'stop': current_time + 3600 * 24 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});
		$('#slider123-35').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-31').TimeSlider('remove', "c5");
				$('#slider123-32').TimeSlider('remove', "c5");
				$('#slider123-33').TimeSlider('remove', "c5");
				$('#slider123-34').TimeSlider('remove', "c5");
				$('#slider123-36').TimeSlider('remove', "c5");
				$('#slider123-37').TimeSlider('remove', "c5");
				$('#slider123-35').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   }
			]
		});
		$('#slider123-36').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
		        console.log ("double vlick cell" );
		        $("#student-consult").dialog({autoOpen : false, modal : true, show : "blind", hide : "blind"});
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				console.log ("double vlick rule" );
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-31').TimeSlider('remove', "c5");
				$('#slider123-32').TimeSlider('remove', "c5");
				$('#slider123-33').TimeSlider('remove', "c5");
				$('#slider123-34').TimeSlider('remove', "c5");
				$('#slider123-35').TimeSlider('remove', "c5");
				$('#slider123-37').TimeSlider('remove', "c5");
				$('#slider123-36').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   }
			]
		});

		$('#slider123-37').TimeSlider({
			start_timestamp: current_time - 3600 * 120 * 1000,
			hours_per_ruler: 720,
			on_dblclick_timecell_callback:function(ui) {
				$('#student-consult').dialog("open");
			},
			on_dblclick_ruler_callback:function(ui) {
				var new_diagrama = 
					'{' +
						'"_id":"c5",' +
						'"start":"' + (current_time + (3600 * 504 * 1000)) + '",' +
						'"stop":"' + (current_time + (3600 * 960 * 1000)) + '",' +
                        '"style": {"background-color": "#FF0000"}' +
					'}';
				objJson = JSON.parse(new_diagrama);
				$('#slider123-31').TimeSlider('remove', "c5");
				$('#slider123-32').TimeSlider('remove', "c5");
				$('#slider123-33').TimeSlider('remove', "c5");
				$('#slider123-34').TimeSlider('remove', "c5");
				$('#slider123-35').TimeSlider('remove', "c5");
				$('#slider123-36').TimeSlider('remove', "c5");
				$('#slider123-37').TimeSlider('add', objJson);
			},
			init_cells: [
				{
                       '_id': 'c1',
                       'start': (current_time + (3600 * 48 * 1000)),
                       'stop': current_time + 3600 * 240  * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c2',
                       'start': (current_time + (3600 * 288 * 1000)),
                       'stop': current_time + 3600 * 480 * 1000,
                       'style': {
                           'background-color': '#66c2ff'
                       }
                   },
				{
                       '_id': 'c3',
                       'start': (current_time - (3600 * 240 * 1000)),
                       'stop': current_time + 3600 * 48 * 1000,
                       'style': {
                           'background-color': '#ffe6f2'
                       }
                   }
			]
		});
	});				