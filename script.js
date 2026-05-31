const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const equalsButton = document.querySelector('[data-action="equals"]');

let currentInput = "0";
let previousInput = "";
let operator = "";
let shouldResetInput = false;

function updateDisplay() {
  display.value = currentInput;
}

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) {
    return;
  }

  if (shouldResetInput) {
    currentInput = number === "." ? "0." : number;
    shouldResetInput = false;
    return;
  }

  if (currentInput === "0" && number !== ".") {
    currentInput = number;
    return;
  }

  currentInput += number;
}

function chooseOperator(nextOperator) {
  if (operator && !shouldResetInput) {
    compute();
  }

  previousInput = currentInput;
  operator = nextOperator;
  shouldResetInput = true;
}

function compute() {
  const previous = Number(previousInput);
  const current = Number(currentInput);

  if (Number.isNaN(previous) || Number.isNaN(current) || !operator) {
    return;
  }

  let result;

  switch (operator) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = previous * current;
      break;
    case "/":
      result = current === 0 ? "Error" : previous / current;
      break;
    default:
      return;
  }

  currentInput = String(result);
  previousInput = "";
  operator = "";
  shouldResetInput = true;
}

function clearAll() {
  currentInput = "0";
  previousInput = "";
  operator = "";
  shouldResetInput = false;
}

function deleteLast() {
  if (shouldResetInput || currentInput === "Error") {
    currentInput = "0";
    shouldResetInput = false;
    return;
  }

  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.dataset.number);
    updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.dataset.operator);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  compute();
  updateDisplay();
});

clearButton.addEventListener("click", () => {
  clearAll();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  deleteLast();
  updateDisplay();
});
