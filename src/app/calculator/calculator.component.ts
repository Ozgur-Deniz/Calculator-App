import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  display = '0';
  result = 0;
  prevValue = '';
  currentValue = '0';
  operation: string | null = null;
  clearScreen = false;
  justCleared = false;
  history: string[] = [];

  clearCalculate() {
    this.display = '0';
    this.result = 0;
    this.prevValue = '';
    this.currentValue = '0';
    this.operation = null;
    this.clearScreen = false;
    this.justCleared = true; 
  }

  numberProcess(value: string) {
    if (value === '.' && this.display.includes('.')) return;

    if (this.display === '0' || this.clearScreen) {
      this.display = value === '.' ? '0.' : value;
      this.clearScreen = false;
    } else {
      this.display += value;
    }
  }

  operationProcess(selectedOperation: string) {
    if (this.justCleared) {
      this.justCleared = false;
    } else if (this.prevValue && this.operation && !this.clearScreen) {
      this.calculate(); 
    }

    this.prevValue = this.display;
    this.operation = selectedOperation;
    this.clearScreen = true;
  }

  minusMultipy() {
    this.display = (parseFloat(this.display) * -1).toString();
  }

  calculate() {
    if (!this.prevValue || !this.operation) return;

    this.currentValue = this.display;

    const num1 = parseFloat(this.prevValue);
    const num2 = parseFloat(this.currentValue);

    switch (this.operation) {
      case 'x':
        this.result = num1 * num2;
        break;
      case '/':
        this.result = num2 !== 0 ? num1 / num2 : NaN;
        break;
      case '-':
        this.result = num1 - num2;
        break;
      case '+':
        this.result = num1 + num2;
        break;
      case '%':
        this.result = (num1 * num2) / 100;
        break;
      default:
        return;
    }

    const historyOperation = `${num1} ${this.operation} ${num2} = ${this.result}`;
    this.history.unshift(historyOperation);
    if (this.history.length > 3) {
      this.history.pop();
    }

    this.display = isNaN(this.result) ? 'Error' : this.result.toString();
    this.prevValue = this.display;
    this.clearScreen = true;
    this.justCleared = false;
  }
}
