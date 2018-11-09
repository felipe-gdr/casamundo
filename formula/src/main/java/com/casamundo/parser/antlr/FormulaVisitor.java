// Generated from /Users/felipereis/git/formula/java/src/main/resources/Formula.g4 by ANTLR 4.7
package com.casamundo.parser.antlr;
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link FormulaParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface FormulaVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link FormulaParser#formula}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFormula(FormulaParser.FormulaContext ctx);
	/**
	 * Visit a parse tree produced by {@link FormulaParser#ifStatement}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIfStatement(FormulaParser.IfStatementContext ctx);
	/**
	 * Visit a parse tree produced by {@link FormulaParser#booleanChecks}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBooleanChecks(FormulaParser.BooleanChecksContext ctx);
	/**
	 * Visit a parse tree produced by {@link FormulaParser#booleanCheck}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBooleanCheck(FormulaParser.BooleanCheckContext ctx);
	/**
	 * Visit a parse tree produced by {@link FormulaParser#booleanCheckExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBooleanCheckExpression(FormulaParser.BooleanCheckExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link FormulaParser#stringExpression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStringExpression(FormulaParser.StringExpressionContext ctx);
	/**
	 * Visit a parse tree produced by the {@code MulDiv}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitMulDiv(FormulaParser.MulDivContext ctx);
	/**
	 * Visit a parse tree produced by the {@code AddSub}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAddSub(FormulaParser.AddSubContext ctx);
	/**
	 * Visit a parse tree produced by the {@code Var}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitVar(FormulaParser.VarContext ctx);
	/**
	 * Visit a parse tree produced by the {@code Parens}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitParens(FormulaParser.ParensContext ctx);
	/**
	 * Visit a parse tree produced by the {@code Num}
	 * labeled alternative in {@link FormulaParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNum(FormulaParser.NumContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PosNumber}
	 * labeled alternative in {@link FormulaParser#number}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPosNumber(FormulaParser.PosNumberContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NegNumber}
	 * labeled alternative in {@link FormulaParser#number}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNegNumber(FormulaParser.NegNumberContext ctx);
	/**
	 * Visit a parse tree produced by the {@code PosVar}
	 * labeled alternative in {@link FormulaParser#variable}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPosVar(FormulaParser.PosVarContext ctx);
	/**
	 * Visit a parse tree produced by the {@code NegVar}
	 * labeled alternative in {@link FormulaParser#variable}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitNegVar(FormulaParser.NegVarContext ctx);
}