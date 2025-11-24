let result = document.getElementById('result');
let buttons = document.querySelectorAll('.keys button');
let justCalculated = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === 'C') {
            clearScreen();
        } else if (buttonText === '=') {
            calculate();
        } else if (buttonText === '←') {
            backspace();
        } else {
            display(buttonText);
        }
    });
});

function display(val) {
    if (justCalculated) {
        if (!['+', '-', '*', '/'].includes(val)) {
            result.value = '';
        }
        justCalculated = false;
    }

    if (val === '.') {
        const parts = result.value.split(/[+\-*/()]/);
        const lastPart = parts[parts.length - 1];
        if (lastPart.includes('.')) {
            return;
        }
    }

    result.value += val;
}

function clearScreen() {
    result.value = '';
    justCalculated = false;
}

function backspace() {
    result.value = result.value.slice(0, -1);
    justCalculated = false;
}

function calculate() {
    try {
        const expression = result.value;
        if (expression) {
            const calculatedResult = parseExpression(expression);
            if (calculatedResult === Infinity || isNaN(calculatedResult)) {
                result.value = 'Error';
            } else {
                result.value = calculatedResult;
            }
            justCalculated = true;
        }
    } catch (e) {
        result.value = 'Error';
        justCalculated = false;
    }
}

function parseExpression(expression) {
    // Add explicit multiplication for implicit cases like 5(2+1) and (2)(3)
    expression = expression.replace(/(\d)\(/g, '$1*(').replace(/\)\(/g, ')*(');
    const tokens = expression.replace(/\s/g, '').match(/(-?\d*\.?\d+)|([+\-*/()])/g);
    if (!tokens) return 'Error';

    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, 'u': 3 }; // 'u' for unary
    const rpn = [];
    const operators = [];
    let lastTokenWasOperator = true;

    for (const token of tokens) {
        if (!isNaN(token) || (token === '.' && !lastTokenWasOperator)) {
            rpn.push(parseFloat(token));
            lastTokenWasOperator = false;
        } else if (token === '(') {
            operators.push(token);
            lastTokenWasOperator = true;
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                rpn.push(operators.pop());
            }
            if (operators.length === 0 || operators[operators.length - 1] !== '(') {
                throw new Error('Mismatched parentheses');
            }
            operators.pop(); // Pop '('
            lastTokenWasOperator = false;
        } else { // Operator
            if (token === '-' && lastTokenWasOperator) {
                operators.push('u');
            } else {
                while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                    rpn.push(operators.pop());
                }
                operators.push(token);
            }
            lastTokenWasOperator = true;
        }
    }

    while (operators.length) {
        const op = operators.pop();
        if (op === '(') {
            throw new Error('Mismatched parentheses');
        }
        rpn.push(op);
    }

    const stack = [];
    for (const token of rpn) {
        if (typeof token === 'number') {
            stack.push(token);
        } else if (token === 'u') {
            stack.push(-stack.pop());
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+': stack.push(a + b); break;
                case '-': stack.push(a - b); break;
                case '*': stack.push(a * b); break;
                case '/':
                    if (b === 0) {
                        return Infinity;
                    }
                    stack.push(a / b);
                    break;
            }
        }
    }

    return stack[0];
}
