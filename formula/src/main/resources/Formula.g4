grammar Formula;

import Arithmetic;

formula
    : ifStatement
    | expression
    ;

ifStatement
    : IF '(' booleanChecks ',' ifResult=expression (',' elseResult=expression)?')'
    ;

booleanChecks
    : booleanCheck (combinator=AND booleanCheck)*
    ;

booleanCheck
    : booleanCheckExpression comparison=(EQUAL|NOT_EQUAL) booleanCheckExpression
    ;

booleanCheckExpression
    : (stringExpression | expression)
    ;

stringExpression
    : QUOTE value=.+? QUOTE
    ;

AND: [aA][nN][dD];

OR: [oO][rR];

QUOTE: '\'' | '"';

EQUAL: '=';

NOT_EQUAL: '!=';

IF: [iI][fF];
