let displayValue = '';
const ops = ['+', '-', '/', '*', '='];
let array = [null, null, null];
refreshDisplay();
listenButtons();

// populate display
function refreshDisplay() {
    const display = document.querySelector(".display");
    if (displayValue === '') {
        display.textContent = '0';
    }
    else {
        display.textContent = displayValue;
    }
    return;
}
function listenButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.addEventListener('click', modifyDisplayValue));
}

function modifyDisplayValue(e) {
    let length = displayValue.length;
    // clear button
    if (e.target.id === 'c') {
        displayValue = '';
        array = [null, null, null];
        refreshDisplay();
        return;
    }
    // if blank, you cant click an operator
    if (length === 0) {
        if (ops.includes(e.target.id )) {
            return;
        }
    }
    // if the last char is operator, cant click another operator
    if (ops.includes(displayValue[length - 1])) {
        if (ops.includes(e.target.id)) {
            return;
        }
    }
    let i = 0;
    while (i < 3 && array[i] !== null) {i++;}
    // equals button
    if (e.target.id === '=') {
        if (i === 0 || i === 2) {
            console.log("OOPS");
            return;
        }
        if (i === 3) {
            if (array[1] === '/' && array[2] === '0') {
                alert("Cannot divide by 0")
                array[1] = null;
                array[2] = null;
                displayValue = array[0];
            }
            else {
                array[0] = operate(array[1], array[0], array[2]);
                array[1] = null;
                array[2] = null;
                displayValue = array[0];
            }
        }
        refreshDisplay();
        return;
    }
    // any other button
    
    // if array full
    if (i === 3) {
        if (ops.includes(e.target.id)) {
            if (array[1] === '/' && array[2] === '0') {
                alert("Cannot divide by 0")
                array[1] = null;
                array[2] = null;
                displayValue = array[0];
            }
            else {
                array[0] = operate(array[1], array[0], array[2]);
                array[1] = e.target.id;
                array[2] = null;
                displayValue = array[0] + array[1];
            }
        }
        else {
            array[2] += e.target.id;
            displayValue += e.target.id;
        }
        //refreshDisplay? return?
    }
    else if (i === 0) {
        array[0] = e.target.id;
        displayValue += e.target.id;
    }
    else if (i === 1) {
        if (ops.includes(e.target.id)) {
            array[1] = e.target.id;
            displayValue+= e.target.id;
        }
        else {
            array[0] += e.target.id;
            displayValue += e.target.id;
        }
    }
    else if (i === 2) {
        if (ops.includes(e.target.id)) {console.log("OOPS");}
        else {
            array[2] = e.target.id;
            displayValue += e.target.id;
        }
    }
    refreshDisplay();
    return;
}



function add(x,y) {
    result = +x + +y;
    if (!Number.isInteger(result)) {
        result = result.toFixed(4);
    }
    else {
        result = result.toString();
    }
    return result;
}
function subtract(x,y) {
    result = +x - +y;
    if (!Number.isInteger(result)) {
        result = result.toFixed(4);
    }
    else {
        result = result.toString();
    }
    return result;
}
function multiply(x,y) {
    result = +x * +y;
    if (!Number.isInteger(result)) {
        result = result.toFixed(4);
    }
    else {
        result = result.toString();
    }
    return result;
}
function divide(x,y) {
    result = +x / +y;
    if (!Number.isInteger(result)) {
        result = result.toFixed(4);
    }
    else {
        result = result.toString();
    }
    return result;
}

function operate(op, x, y) {
    if (op === '*') {
        return multiply(x,y);
    }
    if (op === '-') {
        return subtract(x,y);
    }
    if (op === '+') {
        return add(x,y);
    }
    if (op === '/') {
        return divide(x,y);
    }
}