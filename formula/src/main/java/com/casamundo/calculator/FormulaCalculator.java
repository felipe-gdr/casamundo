package com.casamundo.calculator;

import com.casamundo.parser.antlr.FormulaBaseVisitor;
import com.casamundo.parser.antlr.FormulaLexer;
import com.casamundo.parser.antlr.FormulaParser;
import com.casamundo.parser.antlr.FormulaParser.FormulaContext;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.CommonTokenStream;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;

/**
 * Executa o cálculo de uma fórmula levando em conta um mapa de variáveis.
 * <p>
 * Exemplo:
 * <p>
 * data a fórmula "x + y" e um mapa de variáveis especificando que o valor de "x"
 * é "1" e o valor de "y" é 2, o resultado do cálculo seria "3".
 *
 * <pre>
 *
 * final String simpleFormula = "x + y";
 *
 * final Map<String, Object> simpleVariables = new HashMap<>();
 * simpleVariables.put("x", 1);
 * simpleVariables.put("y", 2);
 *
 * final Double result = new FormulaCalculator(simpleFormula, simpleVariables).calculate();
 *
 * // valor de "result" é "3.0"
 * </pre>
 * <p>
 * Sintaxes suportadas:
 *
 * <p>
 * <b>operações básicas (adição, multiplicação, divisão, subtração)</b>
 * <li>"1 + 1" = 2.0</li>
 * <li>"4 / 2" = 2.0</li>
 * <li>"2 * 2" = 4.0</li>
 * <li>"5 - 2" = 3.0</li>
 * </p>
 * <p>
 * <b>ordem de operações, incluindo parentêses</b>
 * <li>"1 + 2 * 2" = 5.0</li>
 * <li>"(1 + 2) * 2" = 6.0</li>
 * </p>
 * <p>
 * <b>variáveis</b>
 * Sempre que variáveis forem utilizadas, é obrigatório passar um {@link Map}
 * contendo todas as variáveis como chave e seus respectivos valores
 * <li>"x + y" = 5.0 (dado que o valor de x é 2 e o de y é 3)</li>
 * </p>
 * <p>
 * <b>condicionais</b>
 * A sintaxe para condicionais é similar à usada no Microsoft Excel:
 * <pre>
 *  "if({teste}, {valor-se-verdadeiro}, {valor-se-falso})"
 *  </pre>
 * <p>
 * Também é possível usar "and" em {teste} resultando em regras mais complexas:
 *
 * <pre>
 *  "if(<teste1> and <teste2>, {valor-se-verdadeiro}, {valor-se-falso})"
 *  </pre>
 * <p>
 * Exemplos:
 * <li>"if(1 = 1, 10, 20)" = 10.0</li>
 * <li>"if(1 != 1, 10, 20)" = 20.0</li>
 * <li>"if(x = 1, 10, 20)" = 10.0 (dado que o valor de x é 1)</li>
 * <li>"if(x = 1, 10, 20)" = 20.0 (dado que o valor de x é diferente de 1)</li>
 * <li>"if('yes' = 'yes', 10, 20)" = 10.0</li>
 * <li>"if(yesOrNo = 'yes', 10, 20)" = 10.0 (dado que o valor de yesOrNo é 'yes')</li>
 * <li>"if(yesOrNo = 'yes', 10, 20)" = 20.0 (dado que o valor de yesOrNo é 'no')</li>
 * <li>"if(yesOrNo = 'yes' and x = 1, 10, 20)" = 10.0 (dado que o valor de yesOrNo é 'yes' E o valor de x é 1)</li>
 * <li>"if(yesOrNo = 'yes' and x = 1, 10, 20)" = 10.0 (dado que o valor de yesOrNo é 'yes' OU o valor de x não é 1)</li>
 * </p>
 */
public class FormulaCalculator extends FormulaBaseVisitor<Value> {
    private final String formula;
    private final Map<String, Object> variables;

    /**
     * Inicia {@link FormulaCalculator}.
     * <p>
     * Após criar uma instância de {@link FormulaCalculator}, execute o método
     * {@link #calculate()} para executar o cálculo e obter um {@link Double}
     * como resultado.
     *
     * @param formula   uma String representando a fórmula a ser calculada
     *                  ex.: "x + y"
     * @param variables um mapa contendo os valores das variáveis usadas na fórmula
     */
    public FormulaCalculator(String formula, Map<String, Object> variables) {
        super();
        this.formula = formula;
        this.variables = variables;
    }

    /**
     * Executa o cálculo
     *
     * @return um {@link Double} contendo o resultado do cálculo.
     * @throws IOException
     */
    public Double calculate() throws IOException {
        ByteArrayInputStream byteInputStream = new ByteArrayInputStream(formula.getBytes());

        CharStream antlrInputStream = CharStreams.fromStream(byteInputStream);

        FormulaLexer lexer = new FormulaLexer(antlrInputStream);

        CommonTokenStream tokens = new CommonTokenStream(lexer);

        FormulaParser parser = new FormulaParser(tokens);

        FormulaContext formulaContext = parser.formula();

        return ((DoubleValue) this.visitFormula(formulaContext)).value;
    }

    @Override
    public Value visitPosVar(FormulaParser.PosVarContext ctx) {
        final String variableName = ctx.name.getText();

        if (variables.containsKey(variableName)) {
            String value = variables.get(variableName).toString();

            try {
                return DoubleValue.of(value);
            } catch (NumberFormatException e) {
                return StringValue.of(value);
            }
        }

        return DoubleValue.of(0.0);
    }

    @Override
    public Value visitNegVar(FormulaParser.NegVarContext ctx) {
        final String variableName = ctx.name.getText();

        if (variables.containsKey(variableName)) {
            String value = variables.get(variableName).toString();

            try {
                return DoubleValue.of(value).negative();
            } catch (NumberFormatException e) {
                return StringValue.of(value);
            }
        }

        return DoubleValue.of(0.0);
    }

    @Override
    public Value visitMulDiv(FormulaParser.MulDivContext ctx) {
        Double left = ((DoubleValue) visit(ctx.expression(0))).value;
        Double right = ((DoubleValue) visit(ctx.expression(1))).value;

        if (ctx.op.getType() == FormulaParser.TIMES) {
            return DoubleValue.of(left * right);
        } else {
            return DoubleValue.of(left / right);
        }
    }

    @Override
    public Value visitAddSub(FormulaParser.AddSubContext ctx) {
        Double left = ((DoubleValue) visit(ctx.expression(0))).value;
        Double right = ((DoubleValue) visit(ctx.expression(1))).value;

        if (ctx.op.getType() == FormulaParser.PLUS) {
            return DoubleValue.of(left + right);
        } else {
            return DoubleValue.of(left - right);
        }
    }

    @Override
    public Value visitParens(FormulaParser.ParensContext ctx) {
        return visit(ctx.expression());
    }

    @Override
    public Value visitPosNumber(FormulaParser.PosNumberContext ctx) {
        return DoubleValue.of(ctx.NUMBER().getText());
    }

    @Override
    public Value visitNegNumber(FormulaParser.NegNumberContext ctx) {
        return DoubleValue.of(ctx.NUMBER().getText()).negative();
    }

    @Override
    public Value visitIfStatement(FormulaParser.IfStatementContext ctx) {
        BooleanValue booleanChecksResult = (BooleanValue) this.visit(ctx.booleanChecks());

        if (booleanChecksResult.value) {
            return visit(ctx.ifResult);
        } else {
            return ctx.elseResult != null ? visit(ctx.elseResult) : DoubleValue.of(0.0);
        }
    }

    @Override
    public Value visitBooleanChecks(FormulaParser.BooleanChecksContext ctx) {
        boolean allTrue = ctx.booleanCheck().stream()
                .map(this::visit)
                .allMatch(visitResult -> ((BooleanValue) visitResult).value);

        return BooleanValue.of(allTrue);
    }

    @Override
    public Value visitBooleanCheck(FormulaParser.BooleanCheckContext ctx) {
        Value leftValue = this.visit(ctx.booleanCheckExpression(0));
        Value rightValue = this.visit(ctx.booleanCheckExpression(1));

        if (ctx.comparison.getType() == FormulaParser.EQUAL) {
            return BooleanValue.of(leftValue.equals(rightValue));
        } else {
            return BooleanValue.of(!leftValue.equals(rightValue));
        }
    }

    @Override
    public Value visitStringExpression(FormulaParser.StringExpressionContext ctx) {
        return StringValue.of(ctx.value.getText());
    }
}

abstract class Value<T> {
    final T value;

    Value(T value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Value<?> value1 = (Value<?>) o;
        return Objects.equals(value, value1.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}

class StringValue extends Value<String> {
    private StringValue(String value) {
        super(value);
    }

    static StringValue of(String value) {
        return new StringValue(value);
    }
}

class DoubleValue extends Value<Double> {
    private DoubleValue(Double value) {
        super(value);
    }

    DoubleValue negative() {
        return new DoubleValue(-this.value);
    }

    static DoubleValue of(String value) {
        return new DoubleValue(Double.valueOf(value));
    }

    static DoubleValue of(Double value) {
        return new DoubleValue(value);
    }
}

class BooleanValue extends Value<Boolean> {
    private BooleanValue(Boolean value) {
        super(value);
    }

    static BooleanValue of(Boolean value) {
        return new BooleanValue(value);
    }
}
