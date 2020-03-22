function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    let regex = /([\/\*\+\-\(\)])/ig;
    let strWithSpaces = str.replace(regex, ' $1 ').trim();
    let expression = strWithSpaces.split(" ").filter(symbol => symbol != "");
    let strBrackets = expression.filter(symbol => symbol == "(" || symbol == ")").join("");
    if(!check(strBrackets, [["(",")"]])) {
        throw Error("ExpressionError: Brackets must be paired");
    }
    let numberStack = [];
    let operationStack = [];
    for (let i = 0; i < expression.length; i++) {
        if(isOperation(expression[i])) {
            while (operationStack.length > 0 
                && operationPriority(expression[i]) <= operationPriority(operationStack[operationStack.length-1])){
                executeOperation(numberStack,operationStack);
            }
            operationStack.push(expression[i]);
        }
        else {
            switch(expression[i]) {
                case '(':
                    operationStack.push(expression[i]);
                    break
                case ')':
                    while (operationStack[operationStack.length-1] != "(") {
                        executeOperation(numberStack,operationStack);
                    }
                    operationStack.pop();
                    break
                default:
                    numberStack.push(parseInt(expression[i]));  
            }
        }
    }
    let numberSize = numberStack.length - 1;
    for(let i = 0; i < numberSize; i++) {
        executeOperation(numberStack,operationStack);
    }
    return numberStack[0];
}

function operationPriority(operation) {
    if(operation == "+" || operation == "-") {
        return 1;
    }
    if(operation == "*" || operation == "/") {
        return 2;
    }
    return 0;
}

function isOperation(str) {
    if(str == "+" || str== "-") {
        return true;
    }
    if(str == "*" || str == "/") {
        return true;
    }
    return false;
}

function executeOperation (numberStack, operationStack) {
    let numberR = numberStack.pop();
    let numberL = numberStack.pop();
    let operation = operationStack.pop();
    switch(operation) {
        case '+':
            numberStack.push(numberL + numberR);
            break
        case '-':
            numberStack.push(numberL - numberR);
            break
        case '*':
            numberStack.push(numberL*numberR);
            break
        case '/':
            if (numberR == 0) {
                throw Error("TypeError: Division by zero.")
            }
            numberStack.push(numberL/numberR);

    } 
}

// from previous task
function check(str, bracketsConfig) {
    let map = new Map();
    let stack = [];
    for (let i = 0; i < bracketsConfig.length; i++) {
        map.set(bracketsConfig[i][0],bracketsConfig[i][1]);
    }

    for (let i = 0; i < str.length; i++) {
        if(map.has(str[i])) {
            // | -> |
            if(map.get(str[i]) == str[i]) {
                // can we close?
                if (str[i] == stack[stack.length - 1]) {
                    stack.pop();
                }
                else {
                    stack.push(str[i]);
                }
            }
            else {
                stack.push(str[i]);
            }
        }
        if(!map.has(str[i])) {
            if (stack.length == 0) {
                return false;
            }
            if (str[i] == map.get(stack[stack.length - 1])) {
                stack.pop();
            }
            else {
                return false;
            }
        
        }
    }
    if(stack.length == 0) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = {
    expressionCalculator
}

console.log(expressionCalculator("100 - 60 / 38 + 1 * 92"));