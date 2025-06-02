window.onload = function() {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    function CheckResult(expressionResult) {
        if (expressionResult.toString().includes('e')) {
            return parseFloat(expressionResult).toExponential(10);
        }
        return expressionResult;
    }

    const outputElement = document.getElementById('result');

    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (a.length >= 17) return;
            if ((digit !== '.') || (digit === '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a;
        } else {
            if (b.length >= 17) return;
            if ((digit !== '.') || (digit === '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b;
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    document.getElementById('btn_op_mult').onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    };
    document.getElementById('btn_op_plus').onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    };
    // document.getElementById('btn_op_minus').onclick = function() {
       // if (a === '') return;
        // selectedOperation = '-';
    //};
    document.getElementById('btn_op_div').onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    };

    document.getElementById('btn_op_clear').onclick = function() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

    document.getElementById('btn_op_equal').onclick = function() {
        if (a === '' || b === '' || !selectedOperation) return;

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            //case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
        }

        expressionResult = CheckResult(expressionResult);
        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    };

    document.getElementById('btn_op_sign').onclick = function() {
        if (!selectedOperation) {
            a = (-a).toString();
            a = CheckResult(a);
            outputElement.innerHTML = a;
        } else {
            b = (-b).toString();
            b = CheckResult(b);
            outputElement.innerHTML = b;
        }
    };

    document.getElementById('btn_op_percent').onclick = function() {
        if (!selectedOperation) {
            a = (a / 100).toString();
            a = CheckResult(a);
            outputElement.innerHTML = a;
        } else {
            b = (b / 100).toString();
            b = CheckResult(b);
            outputElement.innerHTML = b;
        }
    };
 
    document.getElementById('btn_op_backspace').onclick = function() {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || '0';
        }
    };
    
    document.getElementById('btn_op_square').onclick = function() {
        if (!selectedOperation) {
            a = Math.pow(+a, 2).toString();
            a = CheckResult(a);
            outputElement.innerHTML = a;
        } else {
            b = Math.pow(+b, 2).toString();
            b = CheckResult(b);
            outputElement.innerHTML = b;
        }
    };

    document.getElementById('btn_op_factorial').onclick = function() {
        function factorial(n) {
            if (n <= 1) {
                return 1;
            } else {
                return n * factorial(n - 1);
            }
        }
        if (!selectedOperation) {
            a = factorial(+a).toString();
            a = CheckResult(a);
            outputElement.innerHTML = a;
        } else {
            b = factorial(+b).toString();
            b = CheckResult(b);
            outputElement.innerHTML = b;
        }
    };
  
    document.getElementById('btn_op_sqrt').onclick = function() {
        if (!selectedOperation) {
            a = Math.sqrt(+a).toString();
            a = CheckResult(a);
            outputElement.innerHTML = a;
        } else {
            b = Math.sqrt(+b).toString();
            b = CheckResult(b);
            outputElement.innerHTML = b;
        }
    };

document.getElementById('theme-toggle').onclick = function() { 
    const calculator = document.querySelector('.calculator'); 
    const result = document.querySelector('.result'); 
    const theme = document.querySelector('.theme-btn');
    calculator.classList.toggle('dark-theme');
    result.classList.toggle('dark-theme');
    theme.classList.toggle('dark-theme');
    };

document.getElementById('btn_op_accumulate_add').onclick = function() {
    if (a !== '') {
        a = (+a + +b).toString();
        a = CheckResult(a);
        b = '';
        selectedOperation = '+';
        outputElement.innerHTML = a;
        }
    };
};