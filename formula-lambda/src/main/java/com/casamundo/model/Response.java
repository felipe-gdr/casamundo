package com.casamundo.model;

public class Response {
    private final Double result;

    public Response(Double result) {
        this.result = result;
    }

    @SuppressWarnings("unused")
    public Double getResult() {
        return result;
    }
}
