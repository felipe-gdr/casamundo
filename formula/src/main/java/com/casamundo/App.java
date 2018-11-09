package com.casamundo;


import com.casamundo.calculator.FormulaCalculator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class App {
    private static final String formula = "if (occHome = 'single' and highSeason = 'yes' and treeMeals = 'yes' and creditCard = 'yes', daysWeek * value * 1.04)";

    private static final String variablesJson = "{" +
            "            \"highSeason\" : \"yes\",\n" +
            "            \"lowSeason\" : \"yes\",\n" +
            "            \"creditCard\" : \"yes\",\n" +
            "            \"occHome\" : \"single\",\n" +
            "            \"coupleHome\" : \"no\",\n" +
            "            \"treeMeals\" : \"yes\",\n" +
            "            \"specialDiet\" : \"vegetarian\",\n" +
            "            \"petAllergic\" : \"false\",\n" +
            "            \"liveDogs\" : \"false\",\n" +
            "            \"liveCats\" : \"false\",\n" +
            "            \"liveChildren\" : \"false\",\n" +
            "            \"smoke\" : \"false\",\n" +
            "            \"pvBath\" : \"false\",\n" +
            "            \"sharedBedLinen\" : \"no\",\n" +
            "            \"sharedTowells\" : \"no\",\n" +
            "            \"sharedGym\" : \"no\",\n" +
            "            \"suiteOcc\" : \"bachelor\",\n" +
            "            \"suitePark\" : \"no\",\n" +
            "            \"suiteInternet\" : \"no\",\n" +
            "            \"suiteAdults\" : \"1\",\n" +
            "            \"suiteChildrens\" : \"0\",\n" +
            "            \"suitePets\" : \"no\",\n" +
            "            \"ccHolder\" : \"\",\n" +
            "            \"daysWeek\" : 2,\n" +
            "            \"daysExtraNIght\" : \"2\",\n" +
            "            \"value\" : 1200.00" +
            "}";

    public static void main(String[] args) throws IOException {
        Map<String, Object> variablesMap = deserializeJson(variablesJson);

        Double result = new FormulaCalculator(formula, variablesMap).calculate();

        System.out.println("Result is " + result);
    }

    private static Map<String, Object> deserializeJson(String jsonInput) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<HashMap<String, Object>> typeRef = new TypeReference<HashMap<String, Object>>() {
        };

        return mapper.readValue(jsonInput, typeRef);
    }
}

