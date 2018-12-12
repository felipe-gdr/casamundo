package com.casamundo.rest;

import com.casamundo.commons.Commons;
import com.casamundo.dao.Commons_DB;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/commons")
public class Rest_Commons {
	Commons_DB commons_db = new Commons_DB();
	Commons commons = new Commons();

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/lastDayMonth", produces = "application/json")
	public String lastDayMonth(@RequestParam("date") String date) {

		return commons.lastDayMonth(date);
	};

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/diferenceDate", produces = "application/json")
	public int lastDayMonth(@RequestParam("start") String start, @RequestParam("end") String end ) {

		return commons.difDate(start, end);
	};

    @SuppressWarnings("rawtypes")
    @RequestMapping(value = "/calcNewMonth", produces = "application/json")
    public String calcNewMonth(@RequestParam("date") String date, @RequestParam("months") int months ) {

        return commons.calcNewMonth(date, months);
    };
};
