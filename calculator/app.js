// Select all HTML elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousCalcDisplay = document.querySelector("[data-previous-calc]");
const currentCalcDisplay = document.querySelector("[data-current-calc]");

// Create calculator class to manage calculator function
class Calculator {
  constructor(previousCalcDisplay, currentCalcDisplay) {
    this.previousCalcDisplay = previousCalcDisplay;
    this.currentCalcDisplay = currentCalcDisplay;
    this.clear();
  }

  clear() {
    this.currentCalc = "";
    this.previousCalc = "";
    this.operation = undefined;
  }
  delete() {
    this.currentCalc = String(this.currentCalc).slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentCalc.includes(".")) return;
    this.currentCalc = String(this.currentCalc) + String(number);
  }
  chooseOperation(operation) {
    if (this.currentCalc === "") return;
    if (this.previousCalc !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousCalc = this.currentCalc;
    this.currentCalc = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousCalc);
    const current = parseFloat(this.currentCalc);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
    }
    this.currentCalc = computation;
    this.operation = undefined;
    this.previousCalc = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentCalcDisplay.innerText = this.getDisplayNumber(this.currentCalc);
    if (this.operation != null) {
      this.previousCalcDisplay.innerText = `${this.getDisplayNumber(
        this.previousCalc
      )} ${this.operation}`;
    } else {
      this.previousCalcDisplay.innerText = "";
    }
  }
}

// Create calculator from class
const calculator = new Calculator(previousCalcDisplay, currentCalcDisplay);

// Add eventlisteners to number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Add eventlisteners to operation buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// Add eventlistener to equals button
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

// Add eventlistener to all clear button
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

// Add eventlistener to all delete button
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
