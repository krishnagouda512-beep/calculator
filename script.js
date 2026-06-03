let display = document.getElementById('display');
let expression = '';

// Append number to display
function appendNumber(number) {
    expression += number;
    updateDisplay();
}

// Append operator to display
function appendOperator(operator) {
    if (expression === '') return;
    if (isOperator(expression[expression.length - 1])) {
        expression = expression.slice(0, -1);
    }
    expression += operator;
    updateDisplay();
}
display.addEventListener('input', function() {
    // Allow only digits, operators, and decimal
    expression = display.value.replace(/[^0-9+\-*/.]/g, '');
    display.value = expression;
});


// Check if character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// Calculate the result
function calculate() {
    try {
        if (expression === '') return;
        let result = eval(expression);
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Clear the display
function clearDisplay() {
    expression = '';
    updateDisplay();
}
// Delete last character
function deleteLast(){
    let cursorposition = display.selectionStart;

    if (cursorposition > 0) {
        // take later value from input
        expression = display.value;
        expression =
         expression.slice(0, cursorposition - 1)
          + expression.slice(cursorposition);
        updateDisplay();

        display.value = expression;
        // put corsor back
        display.focus();
        display.selectionRange(cursorposition - 1, cursorposition - 1);
    }
}
function deleteMiddle() {
    let cursorposition = display.selectionStart;

    if (cursorposition > 0 && cursorposition <= expression.length) {
        expression = expression.slice(0, cursorposition - 1) + expression.slice(cursorposition);
        updateDisplay();

        // put cursor back at correct position
        setTimeout(() => {
            display.selectionStart = cursorposition - 1;
            display.selectionEnd = cursorposition - 1;
        }, 0);
    }

}

// Update display value
function updateDisplay() {
    display.value = expression;
} 


// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' & key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    } else if (key === '.' || key === ',') {
        event.preventDefault();
        appendNumber('.');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }   else if (key === 'Backspace'|| key === 'Delete') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        event.preventDefault();
        clearDisplay();
    }
});