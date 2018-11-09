// Generated from /Users/felipereis/git/formula/java/src/main/resources/Formula.g4 by ANTLR 4.7
package com.casamundo.parser.antlr;
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link FormulaParser}.
 */
public interface FormulaListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link FormulaParser#formula}.
	 * @param ctx the parse tree
	 */
	void enterFormula(FormulaParser.FormulaContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormulaParser#formula}.
	 * @param ctx the parse tree
	 */
	void exitFormula(FormulaParser.FormulaContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormulaParser#ifStatement}.
	 * @param ctx the parse tree
	 */
	void enterIfStatement(FormulaParser.IfStatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormulaParser#ifStatement}.
	 * @param ctx the parse tree
	 */
	void exitIfStatement(FormulaParser.IfStatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormulaParser#booleanChecks}.
	 * @param ctx the parse tree
	 */
	void enterBooleanChecks(FormulaParser.BooleanChecksContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormulaParser#booleanChecks}.
	 * @param ctx the parse tree
	 */
	void exitBooleanChecks(FormulaParser.BooleanChecksContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormulaParser#booleanCheck}.
	 * @param ctx the parse tree
	 */
	void enterBooleanCheck(FormulaParser.BooleanCheckContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormulaParser#booleanCheck}.
	 * @param ctx the parse tree
	 */
	void exitBooleanCheck(FormulaParser.BooleanCheckContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormulaParser#booleanCheckExpression}.
	 * @param ctx the parse tree
	 */
	void enterBooleanCheckExpression(FormulaParser.BooleanCheckExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormulaParser#booleanCheckExpression}.
	 * @param ctx the parse tree
	 */
	void exitBooleanCheckExpression(FormulaParser.BooleanCheckExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link FormulaParser#stringExpression}.
	 * @param ctx the parse tree
	 */
	void enterStringExpression(FormulaParser.StringExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link FormulaParser#stringExpression}.
	 * @param ctx the parse tree
	 */
	void exitStringExpression(FormulaParser.StringExpressionContext ctx);
	/**
	 * Enter a parse tree produced by the {@code MulDiv}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterMulDiv(FormulaParser.MulDivContext ctx);
	/**
	 * Exit a parse tree produced by the {@code MulDiv}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitMulDiv(FormulaParser.MulDivContext ctx);
	/**
	 * Enter a parse tree produced by the {@code AddSub}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterAddSub(FormulaParser.AddSubContext ctx);
	/**
	 * Exit a parse tree produced by the {@code AddSub}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitAddSub(FormulaParser.AddSubContext ctx);
	/**
	 * Enter a parse tree produced by the {@code Var}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterVar(FormulaParser.VarContext ctx);
	/**
	 * Exit a parse tree produced by the {@code Var}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitVar(FormulaParser.VarContext ctx);
	/**
	 * Enter a parse tree produced by the {@code Parens}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterParens(FormulaParser.ParensContext ctx);
	/**
	 * Exit a parse tree produced by the {@code Parens}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitParens(FormulaParser.ParensContext ctx);
	/**
	 * Enter a parse tree produced by the {@code Num}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterNum(FormulaParser.NumContext ctx);
	/**
	 * Exit a parse tree produced by the {@code Num}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitNum(FormulaParser.NumContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PosNumber}
	 * labeled alternative in {@link FormulaParser#number}.
	 * @param ctx the parse tree
	 */
	void enterPosNumber(FormulaParser.PosNumberContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PosNumber}
	 * labeled alternative in {@link FormulaParser#number}.
	 * @param ctx the parse tree
	 */
	void exitPosNumber(FormulaParser.PosNumberContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NegNumber}
	 * labeled alternative in {@link FormulaParser#number}.
	 * @param ctx the parse tree
	 */
	void enterNegNumber(FormulaParser.NegNumberContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NegNumber}
	 * labeled alternative in {@link FormulaParser#number}.
	 * @param ctx the parse tree
	 */
	void exitNegNumber(FormulaParser.NegNumberContext ctx);
	/**
	 * Enter a parse tree produced by the {@code PosVar}
	 * labeled alternative in {@link FormulaParser#variable}.
	 * @param ctx the parse tree
	 */
	void enterPosVar(FormulaParser.PosVarContext ctx);
	/**
	 * Exit a parse tree produced by the {@code PosVar}
	 * labeled alternative in {@link FormulaParser#variable}.
	 * @param ctx the parse tree
	 */
	void exitPosVar(FormulaParser.PosVarContext ctx);
	/**
	 * Enter a parse tree produced by the {@code NegVar}
	 * labeled alternative in {@link FormulaParser#variable}.
	 * @param ctx the parse tree
	 */
	void enterNegVar(FormulaParser.NegVarContext ctx);
	/**
	 * Exit a parse tree produced by the {@code NegVar}
	 * labeled alternative in {@link FormulaParser#variable}.
	 * @param ctx the parse tree
	 */
	void exitNegVar(FormulaParser.NegVarContext ctx);
}