package com.casamundo;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.casamundo.calculator.FormulaCalculator;
import com.casamundo.model.Request;
import com.casamundo.model.Response;

import java.io.IOException;
import java.util.Map;

@SuppressWarnings("unused")
public class Main implements RequestHandler<Request, Response> {
    public Response handleRequest(Request request, Context context) {
        final String formulaText = request.getFormulaText();
        final Map<String, Object> variables = request.getVariables();

        try {
            Double result = new FormulaCalculator(formulaText, variables).calculate();

            return new Response(result);
        } catch (IOException e) {
            throw new IllegalStateException("Error while parsing formula text", e);
        }
    }
}
