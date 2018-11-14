package com.casamundo.rest;

import com.casamundo.calculator.FormulaCalculator;
import com.casamundo.rest.data.CalculoData;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/calcular")
public class Formula {
    @PostMapping(produces = "application/json")
    public Double calcular(@RequestBody CalculoData calculoData) throws IOException {
        final String formula = calculoData.getFormula();
        final Map<String, Object> variaveis = calculoData.getVariaveis();

        final Double value = new FormulaCalculator(formula, variaveis).calculate();
        return value;
    }
}
