function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(str) {
    let regex = /([\/\*\+\-\(\)])/ig;
    let strWithSpaces = str.replace(regex, ' $1 ').trim();
    let expression = strWithSpaces.split(" ").filter(symbol => symbol != "");
    let numberStack = [];
    let operationStack = [];
    for (let i = 0; i < expression.length; i++) {
        if(isOperation(expression[i])) {
            if(operationStack.length > 0 && operationPriority(expression[i]) <= operationPriority(operationStack[operationStack.length-1])){
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

function isBrackets(str) {
    if(str == "(" || str == ")") {
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
            numberStack.push(numberL/numberR);

    } 
}

module.exports = {
    expressionCalculator
}

console.log(expressionCalculator(" 49 * 63 / 58 * 36 "));