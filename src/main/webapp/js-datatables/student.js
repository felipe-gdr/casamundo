			    /**
			     * 			adendo a lista trip
			     */


				/* BASIC datatables*/

				var responsiveHelper_trip_list = undefined;
				
				var breakpointDefinition = {
					tablet : 1024,
					phone : 480
				};
			     
				/* trip list  */
			    var trip_table = $('#trip_list').DataTable({
			    	//"bFilter": false,
			    	//"bInfo": false,
			    	//"bLengthChange": true,
			    	//"bAutoWidth": true,
			    	//"bPaginate": false,
			    	//"bStateSave": true // saves sort state using localStorage
					"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>"+
							"t"+
							"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
					"preDrawCallback" : function() {
						// Initialize the responsive datatables helper once.
						if (!responsiveHelper_trip_list) {
							responsiveHelper_trip_list = new ResponsiveDatatablesHelper($('#trip_list'), breakpointDefinition);
						}
					},
					"rowCallback" : function(nRow) {
						responsiveHelper_trip_list.createExpandIcon(nRow);
					},
					"drawCallback" : function(oSettings) {
						responsiveHelper_trip_list.respond();
					},		
					"columns": [
					            {
					                "class":          'details-control',
					                "orderable":      false,
					                "data":           null,
					                "defaultContent": ''
					            },
					            { "data": "status" },
					            { "data": "destination" },
					            { "data": "start" },
					            { "data": "end" },
					            { "data": "arrival" },
					            { "data": "accommodation" },
					        ],
			        "responsive": true,
			        "charset" : "UTF-8",
			        "bDestroy": true,
			        "iDisplayLength": 15,
			        "order": [[3, 'desc']],
			        "fnDrawCallback": function( oSettings ) {
				       runAllCharts()
				    }
				
			    });
		        var objJson = JSON.parse(localStorage.getItem("student"));
			    $.each(objJson.documento.trip, function (i, trip) {
				    trip_table.row.add( {
			            'status':'<span class="label label-avaliable">' + trip.status + '</span>',
			            'destination':'<small class="text-muted">' + trip.destination + '</small>',
			            'start':'<small class="hide">' + converteAnoMesDia(trip.start) + '</small><small class="text-muted">' + separaData(trip.start, "/") + '</small>',
			            'end':'<small class="hide">' + converteAnoMesDia(trip.end) + '</small><small class="text-muted">' + separaData(trip.end,"/") + '</small>',
			            'arrival':'<small class="text-muted">Date : ' + separaData(trip.arrivalDate, "/") + '</small><br>' +
			            			'<small class="text-muted">Time : ' + separaHora(trip.arrivalTime, ":") + '</small>',
			            'accommodation':'<small class="text-muted">' + trip.accommodation + '</small>',
			            'flight':'Number : ' + trip.flightNumber + '<br>' +
			            			'<small class="text-muted">Date : ' + separaData(trip.flightDate, "/") + '</small><br>' +
			            			'<small class="text-muted">Time : ' + separaHora(trip.flightTime,":") + '</small><br>' +
			            			'<small class="text-muted">Airline : ' + trip.flightAirline + '</small><br>',
            			'pickup': '<small class="text-muted">Pickup : ' + trip.pickup + '</small><br>' +
            						'<small class="text-muted">Dropoff : ' + trip.dropoff + '</small>',
   			            'extend':'<small class="text-muted">' + trip.extend + '</small>',
			            'actions': '<div class="btn-group"><button class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" >Action <span class="caret"></span></button><ul class="dropdown-menu"><li><a  data-toggle="modal" data-target="#accommodation">Change</a></li></ul></div>'
				    }).draw( false );
			    });
				// Add event listener for opening and closing details
			    $('#trip_list tbody').on('click', 'td.details-control', function () {
			        var tr = $(this).closest('tr');
			        var row = trip_table.row( tr );
			 
			        if ( row.child.isShown() ) {
			            // This row is already open - close it
			            row.child.hide();
			            tr.removeClass('shown');
			        }
			        else {
			            // Open this row
			            row.child( formatTrip(row.data()) ).show();
			            tr.addClass('shown');
			        }
			    });
			    
			    // Apply the filter
			    $("#trip_list thead th input[type=text]").on( 'keyup change', function () {
			    	
			        trip_table
			            .column( $(this).parent().index()+':visible' )
			            .search( this.value )
			            .draw();
			            
			    } );
			    /* end trip list */   
				/* Formatting function for row details - modify as you need */
				function formatTrip ( d ) {
				    // `d` is the original data object for the row
				    return '<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-condensed">'+
			        	'<tr>'+
			        		'<td>Flight:</td>'+
			        		'<td>'+d.flight+'</td>'+
			        	'</tr>'+
			        	'<tr>'+
			        		'<td>Pickup:</td>'+
			        		'<td>'+d.pickup+'</td>'+
		        		'</tr>'+
			        	'<tr>'+
			        		'<td>Extend:</td>'+
			        		'<td>'+d.extend+'</td>'+
			        		'</tr>'+
				        '<tr>'+
				            '<td>Actions:</td>'+
				            '<td>'+d.actions+'</td>'+
				        '</tr>'+
				    '</table>';
				};
				