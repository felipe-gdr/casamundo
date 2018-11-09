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

public class FormulaCalculator extends FormulaBaseVisitor<Value> {
    private final String formula;
    private final Map<String, Object> variables;

    public FormulaCalculator(String formula, Map<String, Object> variables) {
        super();
        this.formula = formula;
        this.variables = variables;
    }

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
