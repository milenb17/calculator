function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(a, b, op) {
  let res;
  if (op === "+") {
    res = add(a, b);
  }
  if (op === "-") {
    res = subtract(a, b);
  }
  if (op === "*") {
    res = multiply(a, b);
  }
  if (op === "/") {
    res = divide(a, b);
  }
  if (res % 1 != 0) {
    res = (Math.round(res * 100) / 100).toFixed(4);
  }
  return res;
}

let num1 = "";
let num2 = "";
let operator = "";

function populateDisplay() {
  display = document.querySelector(".display");
  let displayString = num1.concat(operator, num2);
  display.textContent = displayString === "" ? "0" : displayString;
}

function handleButtonClick(e) {
  console.log(e.target.id);
  const ops = ["+", "-", "/", "*"];
  if (e.target.id === "c") {
    num1 = "";
    num2 = "";
    operator = "";
  } else if (e.target.id === "=") {
    if (num2 === "0" && operator === "/") {
      alert("Cant divide by 0");
      num1 = "";
      num2 = "";
      operator = "";
    } else if (num1 !== "" && num2 !== "" && operator !== "") {
      const res = operate(Number(num1), Number(num2), operator);
      num1 = res.toString();
      num2 = "";
      operator = "";
    }
  } else if (ops.includes(e.target.id)) {
    if (num2 === "0" && operator === "/") {
      alert("Cant divide by 0");
      num1 = "";
      num2 = "";
      operator = "";
    } else if (num1 !== "" && operator === "") {
      operator = e.target.id;
    } else if (num1 !== "" && operator !== "" && num2 !== "") {
      const res = operate(Number(num1), Number(num2), operator);
      num1 = res.toString();
      num2 = "";
      operator = e.target.id;
    }
  } else {
    if (operator === "") {
      num1 = num1.concat(e.target.id);
    } else {
      num2 = num2.concat(e.target.id);
    }
  }
  populateDisplay();
}

function run() {
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => handleButtonClick(e));
  });
  populateDisplay();
}
run();
