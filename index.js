let firstInput = "";
let secondInput = "";
let operation = null;
let screenReset = false;

// reading in elements and adding event handlers
const resetButton = document.getElementById("reset-button");
const deleteButton = document.getElementById("delete-button");
const decimalButton = document.getElementById("decimal-button");
const equalsButton = document.getElementById("equals-button");
const currentScreen = document.getElementById("current-screen");
const prevScreen = document.getElementById("previous-screen");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-op]");

numbers.forEach((button) =>
  button.addEventListener("click", () => displayNumber(button.textContent))
);

operators.forEach((button) =>
  button.addEventListener("click", () => setOp(button.textContent))
);

resetButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", deleteNumber);
decimalButton.addEventListener("click", useDecimal);
equalsButton.addEventListener("click", calculate);

function displayNumber(number) {
  if (currentScreen.textContent === "0" || screenReset) resetCurrentScreen();
  currentScreen.textContent += number;
}

function setOp(operator) {
  if (operation !== null) calculate();
  firstInput = currentScreen.textContent;
  operation = operator;
  prevScreen.textContent = `${firstInput} ${operation}`;
  screenReset = true;
}

function clearAll() {
  currentScreen.textContent = "0";
  prevScreen.textContent = "";
  firstInput = "";
  secondInput = "";
  operation = null;
}

function deleteNumber() {
  currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
}

function useDecimal() {
  if (screenReset) resetScreen();
  if (currentScreen.textContent === "") currentScreen.textContent = "0";
  if (currentScreen.textContent.includes(".")) return;
  else currentScreen.textContent += ".";
}

function calculate() {
  if (operation === null || screenReset) return;
  if (operation === "/" && currentScreen.textContent === "0") {
    alert("Unable to divide by 0!");
    return;
  }
  secondInput = currentScreen.textContent;
  currentScreen.textContent = roundResult(
    calc(operation, firstInput, secondInput)
  );
  prevScreen.textContent = `${firstInput} ${operation} ${secondInput} =`;
  operation = null;
}

function calc(op, firstIn, secondIn) {
  firstIn = Number(firstIn);
  secondIn = Number(secondIn);
  switch (op) {
    case "+":
      return firstIn + secondIn;
    case "-":
      return firstIn - secondIn;
    case "x":
      return firstIn * secondIn;
    case "/":
      if (secondIn === 0) return null;
      else return firstIn / secondIn;
    case "%":
      return firstIn % secondIn;
    default:
      return null;
  }
}

function roundResult(number) {
  //round to three digits
  return Math.round(number * 1000) / 1000;
}

function resetCurrentScreen() {
  currentScreen.textContent = "";
  screenReset = false;
}
