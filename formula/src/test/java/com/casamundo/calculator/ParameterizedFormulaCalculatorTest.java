package com.casamundo.calculator;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Collections.emptyMap;
import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class ParameterizedFormulaCalculatorTest {
    @Parameterized.Parameters(name = "{0} = {1}")
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][]{
                // Arithmetic operations
                {"1", 1.0, emptyMap()},
                {"-1", -1.0, emptyMap()},
                {"1 + 1", 2.0, emptyMap()},
                {"1 - 1", 0.0, emptyMap()},
                {"1-1", 0.0, emptyMap()},
                {"2 * 3", 6.0, emptyMap()},
                {"4 / 2", 2.0, emptyMap()},
                {"1 + 2 * 2", 5.0, emptyMap()},
                {"(1 + 2) * 2", 6.0, emptyMap()},
                {"2 * 3 * 4", 24.0, emptyMap()},
                {"10 - 4 / 2", 8.0, emptyMap()},
                {"(10 - 4) / 2", 3.0, emptyMap()},

                // Variables
                {"x", 1.0, createVars(var("x", 1.0))},
                {"x + 10", 11.0, createVars(var("x", 1.0))},
                {"x", 0.0, emptyMap()},
                {"x + y", 10.0, createVars(var("x", 1.0), var("y", 9.0))},
                {"x / y", 2.0, createVars(var("x", 6.0), var("y", 3.0))},
                {"-x", -1.0, createVars(var("x", 1.0))},
                {"-x", 1.0, createVars(var("x", -1.0))},

                // Conditionals
                {"if(1 = 1, 10, 1)", 10.0, emptyMap()},
                {"if(1 = 2, 10, 1)", 1.0, emptyMap()},
                {"if(1 = 2, 10)", 0.0, emptyMap()},
                {"if(1 != 1, 10, 1)", 1.0, emptyMap()},
                {"if('yes' = 'yes', 10, 1)", 10.0, emptyMap()},
                {"if('yes' = 'no', 10, 1)", 1.0, emptyMap()},
                {"if(2 * 3 = 6, 10, 1)", 10.0, emptyMap()},
                {"if(2 * 3 = 7, 10, 1)", 1.0, emptyMap()},
                {"if(x = 1, 10, 1)", 10.0, createVars(var("x", 1.0))},
                {"if(x != 1, 10, 1)", 1.0, createVars(var("x", 1.0))},
                {"if(x = 2, x * y, 1)", 6.0, createVars(var("x", 2.0), var("y", 3.0))},
                {"if(x = 'yes', 1, 0)", 1.0, createVars(var("x", "yes"))},
                {"if(x = 'yes' and y = 'yes', 1, 0)", 1.0, createVars(var("x", "yes"), var("y", "yes"))},
                {"if(1 = 1 and 2 = 2, 1, 2)", 1.0, emptyMap()},
                {"if(1 = 1 and 2 = 3, 1, 2)", 2.0, emptyMap()},
                {"if(x = 2 and y = 4, x * y, 1)", 1.0, createVars(var("x", 2.0), var("y", 3.0))},
        });
    }

    @Parameterized.Parameter
    public String formula;

    @Parameterized.Parameter(1)
    public Double expected;

    @Parameterized.Parameter(2)
    public Map<String, Object> variables;

    @Test
    public void parameterizedTest() throws IOException {
        final Double result = new FormulaCalculator(formula, variables).calculate();

        assertEquals(expected, result);
    }

    private static Object[] var(String name, Object value) {
        return new Object[]{name, value};
    }

    private static Map<String, Object> createVars(Object[]... vars) {
        Map<String, Object> result = new HashMap<>();

        Arrays.asList(vars).forEach(var -> {
            result.put((String) var[0], var[1]);
        });

        return result;
    }

}
