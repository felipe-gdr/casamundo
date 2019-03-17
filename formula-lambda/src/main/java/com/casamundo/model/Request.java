package com.casamundo.model;

import java.util.Map;

public class Request {
    private String formulaText;
    private Map<String, Object> variables;

    public String getFormulaText() {
        return formulaText;
    }

    @SuppressWarnings("unused")
    public void setFormulaText(String formulaText) {
        this.formulaText = formulaText;
    }

    public Map<String, Object> getVariables() {
        return variables;
    }

    @SuppressWarnings("unused")
    public void setVariables(Map<String, Object> variables) {
        this.variables = variables;
    }
}
