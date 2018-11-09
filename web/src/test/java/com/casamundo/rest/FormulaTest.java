package com.casamundo.rest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class FormulaTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCalcularRetornaSucessoQuandoPayloadEValido() throws Exception {
        final String data = "{\"formula\":\"x + y\", \"variaveis\":{\"x\": 1, \"y\": 2}}";
        final String esperado = "3.0";

        mockMvc.perform(post("/calcular")
                .contentType(MediaType.APPLICATION_JSON)
                .content(data))
                .andExpect(status().isOk())
                .andExpect(content().json(esperado));
    }
}
