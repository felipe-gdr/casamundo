// Generated from /Users/felipereis/git/formula/java/src/main/resources/Formula.g4 by ANTLR 4.7
package com.casamundo.parser.antlr;
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class FormulaLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, AND=2, QUOTE=3, EQUAL=4, NOT_EQUAL=5, IF=6, VARIABLE=7, NUMBER=8, 
		LPAREN=9, RPAREN=10, PLUS=11, MINUS=12, TIMES=13, DIV=14, WS=15;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"T__0", "AND", "QUOTE", "EQUAL", "NOT_EQUAL", "IF", "VARIABLE", "VALID_ID_START", 
		"VALID_ID_CHAR", "NUMBER", "SIGN", "LPAREN", "RPAREN", "PLUS", "MINUS", 
		"TIMES", "DIV", "WS"
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


	public FormulaLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "Formula.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\21g\b\1\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\3\2\3\2\3\3\3\3\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\6\3\7\3\7"+
		"\3\7\3\b\3\b\7\b:\n\b\f\b\16\b=\13\b\3\t\5\t@\n\t\3\n\3\n\5\nD\n\n\3\13"+
		"\6\13G\n\13\r\13\16\13H\3\13\3\13\6\13M\n\13\r\13\16\13N\5\13Q\n\13\3"+
		"\f\3\f\3\r\3\r\3\16\3\16\3\17\3\17\3\20\3\20\3\21\3\21\3\22\3\22\3\23"+
		"\6\23b\n\23\r\23\16\23c\3\23\3\23\2\2\24\3\3\5\4\7\5\t\6\13\7\r\b\17\t"+
		"\21\2\23\2\25\n\27\2\31\13\33\f\35\r\37\16!\17#\20%\21\3\2\13\4\2CCcc"+
		"\4\2PPpp\4\2FFff\4\2$$))\4\2KKkk\4\2HHhh\5\2C\\aac|\4\2--//\5\2\13\f\17"+
		"\17\"\"\2i\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2"+
		"\2\2\r\3\2\2\2\2\17\3\2\2\2\2\25\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35"+
		"\3\2\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\3\'\3\2\2\2\5)"+
		"\3\2\2\2\7-\3\2\2\2\t/\3\2\2\2\13\61\3\2\2\2\r\64\3\2\2\2\17\67\3\2\2"+
		"\2\21?\3\2\2\2\23C\3\2\2\2\25F\3\2\2\2\27R\3\2\2\2\31T\3\2\2\2\33V\3\2"+
		"\2\2\35X\3\2\2\2\37Z\3\2\2\2!\\\3\2\2\2#^\3\2\2\2%a\3\2\2\2\'(\7.\2\2"+
		"(\4\3\2\2\2)*\t\2\2\2*+\t\3\2\2+,\t\4\2\2,\6\3\2\2\2-.\t\5\2\2.\b\3\2"+
		"\2\2/\60\7?\2\2\60\n\3\2\2\2\61\62\7#\2\2\62\63\7?\2\2\63\f\3\2\2\2\64"+
		"\65\t\6\2\2\65\66\t\7\2\2\66\16\3\2\2\2\67;\5\21\t\28:\5\23\n\298\3\2"+
		"\2\2:=\3\2\2\2;9\3\2\2\2;<\3\2\2\2<\20\3\2\2\2=;\3\2\2\2>@\t\b\2\2?>\3"+
		"\2\2\2@\22\3\2\2\2AD\5\21\t\2BD\4\62;\2CA\3\2\2\2CB\3\2\2\2D\24\3\2\2"+
		"\2EG\4\62;\2FE\3\2\2\2GH\3\2\2\2HF\3\2\2\2HI\3\2\2\2IP\3\2\2\2JL\7\60"+
		"\2\2KM\4\62;\2LK\3\2\2\2MN\3\2\2\2NL\3\2\2\2NO\3\2\2\2OQ\3\2\2\2PJ\3\2"+
		"\2\2PQ\3\2\2\2Q\26\3\2\2\2RS\t\t\2\2S\30\3\2\2\2TU\7*\2\2U\32\3\2\2\2"+
		"VW\7+\2\2W\34\3\2\2\2XY\7-\2\2Y\36\3\2\2\2Z[\7/\2\2[ \3\2\2\2\\]\7,\2"+
		"\2]\"\3\2\2\2^_\7\61\2\2_$\3\2\2\2`b\t\n\2\2a`\3\2\2\2bc\3\2\2\2ca\3\2"+
		"\2\2cd\3\2\2\2de\3\2\2\2ef\b\23\2\2f&\3\2\2\2\n\2;?CHNPc\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}