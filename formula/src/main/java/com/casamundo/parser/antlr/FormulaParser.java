// Generated from /Users/felipereis/git/formula/java/src/main/resources/Formula.g4 by ANTLR 4.7
package com.casamundo.parser.antlr;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class FormulaParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, AND=2, QUOTE=3, EQUAL=4, NOT_EQUAL=5, IF=6, VARIABLE=7, NUMBER=8, 
		LPAREN=9, RPAREN=10, PLUS=11, MINUS=12, TIMES=13, DIV=14, WS=15;
	public static final int
		RULE_formula = 0, RULE_ifStatement = 1, RULE_booleanChecks = 2, RULE_booleanCheck = 3, 
		RULE_booleanCheckExpression = 4, RULE_stringExpression = 5, RULE_expression = 6, 
		RULE_number = 7, RULE_variable = 8;
	public static final String[] ruleNames = {
		"formula", "ifStatement", "booleanChecks", "booleanCheck", "booleanCheckExpression", 
		"stringExpression", "expression", "number", "variable"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "','", null, null, "'='", "'!='", null, null, null, "'('", "')'", 
		"'+'", "'-'", "'*'", "'/'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, "AND", "QUOTE", "EQUAL", "NOT_EQUAL", "IF", "VARIABLE", "NUMBER", 
		"LPAREN", "RPAREN", "PLUS", "MINUS", "TIMES", "DIV", "WS"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Formula.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public FormulaParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class FormulaContext extends ParserRuleContext {
		public IfStatementContext ifStatement() {
			return getRuleContext(IfStatementContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public FormulaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_formula; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterFormula(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitFormula(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitFormula(this);
			else return visitor.visitChildren(this);
		}
	}

	public final FormulaContext formula() throws RecognitionException {
		FormulaContext _localctx = new FormulaContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_formula);
		try {
			setState(20);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IF:
				enterOuterAlt(_localctx, 1);
				{
				setState(18);
				ifStatement();
				}
				break;
			case VARIABLE:
			case NUMBER:
			case LPAREN:
			case MINUS:
				enterOuterAlt(_localctx, 2);
				{
				setState(19);
				expression(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IfStatementContext extends ParserRuleContext {
		public ExpressionContext ifResult;
		public ExpressionContext elseResult;
		public TerminalNode IF() { return getToken(FormulaParser.IF, 0); }
		public BooleanChecksContext booleanChecks() {
			return getRuleContext(BooleanChecksContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public IfStatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ifStatement; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterIfStatement(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitIfStatement(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitIfStatement(this);
			else return visitor.visitChildren(this);
		}
	}

	public final IfStatementContext ifStatement() throws RecognitionException {
		IfStatementContext _localctx = new IfStatementContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_ifStatement);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(22);
			match(IF);
			setState(23);
			match(LPAREN);
			setState(24);
			booleanChecks();
			setState(25);
			match(T__0);
			setState(26);
			((IfStatementContext)_localctx).ifResult = expression(0);
			setState(29);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==T__0) {
				{
				setState(27);
				match(T__0);
				setState(28);
				((IfStatementContext)_localctx).elseResult = expression(0);
				}
			}

			setState(31);
			match(RPAREN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BooleanChecksContext extends ParserRuleContext {
		public List<BooleanCheckContext> booleanCheck() {
			return getRuleContexts(BooleanCheckContext.class);
		}
		public BooleanCheckContext booleanCheck(int i) {
			return getRuleContext(BooleanCheckContext.class,i);
		}
		public List<TerminalNode> AND() { return getTokens(FormulaParser.AND); }
		public TerminalNode AND(int i) {
			return getToken(FormulaParser.AND, i);
		}
		public BooleanChecksContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_booleanChecks; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterBooleanChecks(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitBooleanChecks(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitBooleanChecks(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BooleanChecksContext booleanChecks() throws RecognitionException {
		BooleanChecksContext _localctx = new BooleanChecksContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_booleanChecks);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(33);
			booleanCheck();
			setState(38);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==AND) {
				{
				{
				setState(34);
				match(AND);
				setState(35);
				booleanCheck();
				}
				}
				setState(40);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BooleanCheckContext extends ParserRuleContext {
		public Token comparison;
		public List<BooleanCheckExpressionContext> booleanCheckExpression() {
			return getRuleContexts(BooleanCheckExpressionContext.class);
		}
		public BooleanCheckExpressionContext booleanCheckExpression(int i) {
			return getRuleContext(BooleanCheckExpressionContext.class,i);
		}
		public TerminalNode EQUAL() { return getToken(FormulaParser.EQUAL, 0); }
		public TerminalNode NOT_EQUAL() { return getToken(FormulaParser.NOT_EQUAL, 0); }
		public BooleanCheckContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_booleanCheck; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterBooleanCheck(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitBooleanCheck(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitBooleanCheck(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BooleanCheckContext booleanCheck() throws RecognitionException {
		BooleanCheckContext _localctx = new BooleanCheckContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_booleanCheck);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(41);
			booleanCheckExpression();
			setState(42);
			((BooleanCheckContext)_localctx).comparison = _input.LT(1);
			_la = _input.LA(1);
			if ( !(_la==EQUAL || _la==NOT_EQUAL) ) {
				((BooleanCheckContext)_localctx).comparison = (Token)_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(43);
			booleanCheckExpression();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BooleanCheckExpressionContext extends ParserRuleContext {
		public StringExpressionContext stringExpression() {
			return getRuleContext(StringExpressionContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public BooleanCheckExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_booleanCheckExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterBooleanCheckExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitBooleanCheckExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitBooleanCheckExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final BooleanCheckExpressionContext booleanCheckExpression() throws RecognitionException {
		BooleanCheckExpressionContext _localctx = new BooleanCheckExpressionContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_booleanCheckExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(47);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case QUOTE:
				{
				setState(45);
				stringExpression();
				}
				break;
			case VARIABLE:
			case NUMBER:
			case LPAREN:
			case MINUS:
				{
				setState(46);
				expression(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StringExpressionContext extends ParserRuleContext {
		public Token value;
		public List<TerminalNode> QUOTE() { return getTokens(FormulaParser.QUOTE); }
		public TerminalNode QUOTE(int i) {
			return getToken(FormulaParser.QUOTE, i);
		}
		public StringExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_stringExpression; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterStringExpression(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitStringExpression(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitStringExpression(this);
			else return visitor.visitChildren(this);
		}
	}

	public final StringExpressionContext stringExpression() throws RecognitionException {
		StringExpressionContext _localctx = new StringExpressionContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_stringExpression);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(49);
			match(QUOTE);
			setState(51); 
			_errHandler.sync(this);
			_alt = 1+1;
			do {
				switch (_alt) {
				case 1+1:
					{
					{
					setState(50);
					((StringExpressionContext)_localctx).value = matchWildcard();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(53); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			} while ( _alt!=1 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			setState(55);
			match(QUOTE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionContext extends ParserRuleContext {
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	 
		public ExpressionContext() { }
		public void copyFrom(ExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class MulDivContext extends ExpressionContext {
		public Token op;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode TIMES() { return getToken(FormulaParser.TIMES, 0); }
		public TerminalNode DIV() { return getToken(FormulaParser.DIV, 0); }
		public MulDivContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterMulDiv(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitMulDiv(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitMulDiv(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class AddSubContext extends ExpressionContext {
		public Token op;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode PLUS() { return getToken(FormulaParser.PLUS, 0); }
		public TerminalNode MINUS() { return getToken(FormulaParser.MINUS, 0); }
		public AddSubContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterAddSub(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitAddSub(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitAddSub(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class VarContext extends ExpressionContext {
		public VariableContext variable() {
			return getRuleContext(VariableContext.class,0);
		}
		public VarContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterVar(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitVar(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitVar(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class ParensContext extends ExpressionContext {
		public TerminalNode LPAREN() { return getToken(FormulaParser.LPAREN, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode RPAREN() { return getToken(FormulaParser.RPAREN, 0); }
		public ParensContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterParens(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitParens(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitParens(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NumContext extends ExpressionContext {
		public NumberContext number() {
			return getRuleContext(NumberContext.class,0);
		}
		public NumContext(ExpressionContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterNum(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitNum(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitNum(this);
			else return visitor.visitChildren(this);
		}
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 12;
		enterRecursionRule(_localctx, 12, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(64);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
			case 1:
				{
				_localctx = new NumContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(58);
				number();
				}
				break;
			case 2:
				{
				_localctx = new VarContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(59);
				variable();
				}
				break;
			case 3:
				{
				_localctx = new ParensContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(60);
				match(LPAREN);
				setState(61);
				expression(0);
				setState(62);
				match(RPAREN);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(74);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(72);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
					case 1:
						{
						_localctx = new MulDivContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(66);
						if (!(precpred(_ctx, 5))) throw new FailedPredicateException(this, "precpred(_ctx, 5)");
						setState(67);
						((MulDivContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==TIMES || _la==DIV) ) {
							((MulDivContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(68);
						expression(6);
						}
						break;
					case 2:
						{
						_localctx = new AddSubContext(new ExpressionContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(69);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(70);
						((AddSubContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==PLUS || _la==MINUS) ) {
							((AddSubContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(71);
						expression(5);
						}
						break;
					}
					} 
				}
				setState(76);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class NumberContext extends ParserRuleContext {
		public NumberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_number; }
	 
		public NumberContext() { }
		public void copyFrom(NumberContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class PosNumberContext extends NumberContext {
		public TerminalNode NUMBER() { return getToken(FormulaParser.NUMBER, 0); }
		public PosNumberContext(NumberContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterPosNumber(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitPosNumber(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitPosNumber(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NegNumberContext extends NumberContext {
		public TerminalNode MINUS() { return getToken(FormulaParser.MINUS, 0); }
		public TerminalNode NUMBER() { return getToken(FormulaParser.NUMBER, 0); }
		public NegNumberContext(NumberContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterNegNumber(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitNegNumber(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitNegNumber(this);
			else return visitor.visitChildren(this);
		}
	}

	public final NumberContext number() throws RecognitionException {
		NumberContext _localctx = new NumberContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_number);
		try {
			setState(80);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUMBER:
				_localctx = new PosNumberContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(77);
				match(NUMBER);
				}
				break;
			case MINUS:
				_localctx = new NegNumberContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(78);
				match(MINUS);
				setState(79);
				match(NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class VariableContext extends ParserRuleContext {
		public VariableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_variable; }
	 
		public VariableContext() { }
		public void copyFrom(VariableContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class PosVarContext extends VariableContext {
		public Token name;
		public TerminalNode VARIABLE() { return getToken(FormulaParser.VARIABLE, 0); }
		public PosVarContext(VariableContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterPosVar(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitPosVar(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitPosVar(this);
			else return visitor.visitChildren(this);
		}
	}
	public static class NegVarContext extends VariableContext {
		public Token name;
		public TerminalNode MINUS() { return getToken(FormulaParser.MINUS, 0); }
		public TerminalNode VARIABLE() { return getToken(FormulaParser.VARIABLE, 0); }
		public NegVarContext(VariableContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).enterNegVar(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof FormulaListener ) ((FormulaListener)listener).exitNegVar(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof FormulaVisitor ) return ((FormulaVisitor<? extends T>)visitor).visitNegVar(this);
			else return visitor.visitChildren(this);
		}
	}

	public final VariableContext variable() throws RecognitionException {
		VariableContext _localctx = new VariableContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_variable);
		try {
			setState(85);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case VARIABLE:
				_localctx = new PosVarContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(82);
				((PosVarContext)_localctx).name = match(VARIABLE);
				}
				break;
			case MINUS:
				_localctx = new NegVarContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(83);
				match(MINUS);
				setState(84);
				((NegVarContext)_localctx).name = match(VARIABLE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 6:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 5);
		case 1:
			return precpred(_ctx, 4);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\21Z\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\3\2\3\2\5\2"+
		"\27\n\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\5\3 \n\3\3\3\3\3\3\4\3\4\3\4\7\4\'"+
		"\n\4\f\4\16\4*\13\4\3\5\3\5\3\5\3\5\3\6\3\6\5\6\62\n\6\3\7\3\7\6\7\66"+
		"\n\7\r\7\16\7\67\3\7\3\7\3\b\3\b\3\b\3\b\3\b\3\b\3\b\5\bC\n\b\3\b\3\b"+
		"\3\b\3\b\3\b\3\b\7\bK\n\b\f\b\16\bN\13\b\3\t\3\t\3\t\5\tS\n\t\3\n\3\n"+
		"\3\n\5\nX\n\n\3\n\3\67\3\16\13\2\4\6\b\n\f\16\20\22\2\5\3\2\6\7\3\2\17"+
		"\20\3\2\r\16\2[\2\26\3\2\2\2\4\30\3\2\2\2\6#\3\2\2\2\b+\3\2\2\2\n\61\3"+
		"\2\2\2\f\63\3\2\2\2\16B\3\2\2\2\20R\3\2\2\2\22W\3\2\2\2\24\27\5\4\3\2"+
		"\25\27\5\16\b\2\26\24\3\2\2\2\26\25\3\2\2\2\27\3\3\2\2\2\30\31\7\b\2\2"+
		"\31\32\7\13\2\2\32\33\5\6\4\2\33\34\7\3\2\2\34\37\5\16\b\2\35\36\7\3\2"+
		"\2\36 \5\16\b\2\37\35\3\2\2\2\37 \3\2\2\2 !\3\2\2\2!\"\7\f\2\2\"\5\3\2"+
		"\2\2#(\5\b\5\2$%\7\4\2\2%\'\5\b\5\2&$\3\2\2\2\'*\3\2\2\2(&\3\2\2\2()\3"+
		"\2\2\2)\7\3\2\2\2*(\3\2\2\2+,\5\n\6\2,-\t\2\2\2-.\5\n\6\2.\t\3\2\2\2/"+
		"\62\5\f\7\2\60\62\5\16\b\2\61/\3\2\2\2\61\60\3\2\2\2\62\13\3\2\2\2\63"+
		"\65\7\5\2\2\64\66\13\2\2\2\65\64\3\2\2\2\66\67\3\2\2\2\678\3\2\2\2\67"+
		"\65\3\2\2\289\3\2\2\29:\7\5\2\2:\r\3\2\2\2;<\b\b\1\2<C\5\20\t\2=C\5\22"+
		"\n\2>?\7\13\2\2?@\5\16\b\2@A\7\f\2\2AC\3\2\2\2B;\3\2\2\2B=\3\2\2\2B>\3"+
		"\2\2\2CL\3\2\2\2DE\f\7\2\2EF\t\3\2\2FK\5\16\b\bGH\f\6\2\2HI\t\4\2\2IK"+
		"\5\16\b\7JD\3\2\2\2JG\3\2\2\2KN\3\2\2\2LJ\3\2\2\2LM\3\2\2\2M\17\3\2\2"+
		"\2NL\3\2\2\2OS\7\n\2\2PQ\7\16\2\2QS\7\n\2\2RO\3\2\2\2RP\3\2\2\2S\21\3"+
		"\2\2\2TX\7\t\2\2UV\7\16\2\2VX\7\t\2\2WT\3\2\2\2WU\3\2\2\2X\23\3\2\2\2"+
		"\f\26\37(\61\67BJLRW";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}