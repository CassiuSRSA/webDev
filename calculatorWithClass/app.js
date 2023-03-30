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
    this.computed = false;
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
    if (this.computed === true) {
      this.clear();
      this.computed = false;
    }
    if (this.currentCalc === Infinity) this.clear();
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
    const limitDigits = (number) => {
      //////////////////////////////
      // added this
      /////////////////////////////
      if (isNaN(number)) return (computation = 0);
      /////////////////////////////
      if (number === Infinity) return Infinity;
      if (number % 1 != 0) {
        const absolute = String(number).split(".")[0];
        const decimal = String(number).split(".")[1];
        computation = Number(`${absolute}.${decimal.slice(0, 15)}`);
        return computation;
      } else {
        computation = number;
        return computation;
      }
    };
    const prev = parseFloat(this.previousCalc);
    const current = parseFloat(this.currentCalc);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        limitDigits(prev + current);
        break;
      case "-":
        limitDigits(prev - current);
        break;
      case "*":
        limitDigits(prev * current);
        break;
      case "÷":
        limitDigits(prev / current);
        break;
      default:
    }
    console.log(computation);
    this.currentCalc = computation;
    this.operation = undefined;
    this.previousCalc = "";
    this.computed = true;
  }

  getDisplayNumber(number) {
    if (number === undefined) return "∞";
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
