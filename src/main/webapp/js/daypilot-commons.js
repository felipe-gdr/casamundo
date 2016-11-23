/**
 * 
 */

// **** exemplo parameters startDate=2016-01-01, size=366 (numero de dias), scale=Day

function setupDayPilot (startDate, size, scale){

	var dp = new DayPilot.Scheduler("dp");

    // behavior and appearance
    dp.theme = "scheduler_traditional";

    dp.startDate = startDate;
    dp.days = size;
    dp.scale = scale;
    dp.timeHeaders = [
        { groupBy: "Month", format: "MMM yyyy" },
        { groupBy: "Cell", format: "d" }
    ];

    dp.bubble = new DayPilot.Bubble();
    dp.resourceBubble = new DayPilot.Bubble();

    dp.contextMenu = new DayPilot.Menu({items: [
        {text:"Edit", onclick: function() { dp.events.edit(this.source); } },
        {text:"Delete", onclick: function() { dp.events.remove(this.source); } },
        {text:"-"},
        {text:"Select", onclick: function() { dp.multiselect.add(this.source); } },
    ]});

    dp.treeEnabled = true;
    
    return dp;
};