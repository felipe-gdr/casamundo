package com.casamundo.calculator;


import org.junit.Test;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class FormulaCalculatorTest {
    @Test
    public void simpleTest() throws IOException {
        final String simpleFormula = "x + y";

        final Map<String, Object> simpleVariables = new HashMap<>();
        simpleVariables.put("x", 1);
        simpleVariables.put("y", 2);

        final Double result = new FormulaCalculator(simpleFormula, simpleVariables).calculate();

        assertEquals(Double.valueOf(3.0), result);
    }
}
