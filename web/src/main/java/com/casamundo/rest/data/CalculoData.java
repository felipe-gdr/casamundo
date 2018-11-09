package com.casamundo.rest.data;

import java.util.Map;

public class CalculoData {
    private String formula;
    private Map<String, Object> variaveis;

    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    public Map<String, Object> getVariaveis() {
        return variaveis;
    }

    public void setVariaveis(Map<String, Object> variaveis) {
        this.variaveis = variaveis;
    }
}
