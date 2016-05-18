	/*
	 * FULL CALENDAR JS
	 */

	if ($("#calendar").length) {
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		var calendar = $('#calendar').fullCalendar({

			editable : true,
			draggable : true,
			selectable : false,
			selectHelper : true,
			unselectAuto : false,
			disableResizing : false,

			header : {
				left : 'title', //,today
				center : 'prev, next, today',
				right : 'month, agendaWeek, agenDay' //month, agendaDay,
			},

			select : function(start, end, allDay) {
				var title = prompt('Event Title:');
				if (title) {
					calendar.fullCalendar('renderEvent', {
						title : title,
						start : start,
						end : end,
						allDay : allDay
					}, true // make the event "stick"
					);
				}
				calendar.fullCalendar('unselect');
			},

			events : [{
				title : 'All Day Event',
				start : new Date(y, m, 1),
				description : 'long description',
				className : ["event", "bg-color-greenLight"],
				icon : 'fa-check'
			}, {
				title : 'Long Event',
				start : new Date(y, m, d - 5),
				end : new Date(y, m, d - 2),
				className : ["event", "bg-color-red"],
				icon : 'fa-lock'
			}, {
				id : 999,
				title : 'Repeating Event',
				start : new Date(y, m, d - 3, 16, 0),
				allDay : false,
				className : ["event", "bg-color-blue"],
				icon : 'fa-clock-o'
			}, {
				id : 999,
				title : 'Repeating Event',
				start : new Date(y, m, d + 4, 16, 0),
				allDay : false,
				className : ["event", "bg-color-blue"],
				icon : 'fa-clock-o'
			}, {
				title : 'Meeting',
				start : new Date(y, m, d, 10, 30),
				allDay : false,
				className : ["event", "bg-color-darken"]
			}, {
				title : 'Lunch',
				start : new Date(y, m, d, 12, 0),
				end : new Date(y, m, d, 14, 0),
				allDay : false,
				className : ["event", "bg-color-darken"]
			}, {
				title : 'Birthday Party',
				start : new Date(y, m, d + 1, 19, 0),
				end : new Date(y, m, d + 1, 22, 30),
				allDay : false,
				className : ["event", "bg-color-darken"]
			}, {
				title : 'Smartadmin Open Day',
				start : new Date(y, m, 28),
				end : new Date(y, m, 29),
				className : ["event", "bg-color-darken"]
			}],

			eventRender : function(event, element, icon) {
				if (!event.description == "") {
					element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
				}
				if (!event.icon == "") {
					element.find('.fc-event-title').append("<i class='air air-top-right fa " + event.icon + " '></i>");
				}
			}
		});

	};

	// calendar prev
	$('#calendar-buttons #btn-prev').click(function() {
		$('.fc-button-prev').click();
		return false;
	});

	// calendar next
	$('#calendar-buttons #btn-next').click(function() {
		$('.fc-button-next').click();
		return false;
	});

	// calendar today
	$('#calendar-buttons #btn-today').click(function() {
		$('.fc-button-today').click();
		return false;
	});

	// calendar month
	$('#mt').click(function() {
		$('#calendar').fullCalendar('changeView', 'month');
	});

	// calendar agenda week
	$('#ag').click(function() {
		$('#calendar').fullCalendar('changeView', 'agendaWeek');
	});

	// calendar agenda day
	$('#td').click(function() {
		$('#calendar').fullCalendar('changeView', 'agendaDay');
	});
