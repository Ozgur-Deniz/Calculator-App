import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private result = 0;
  private history: string[] = [];

  calculate(prevValue: string, currentValue: string, operation: string): { result: string, history: string[] } {
    const num1 = parseFloat(prevValue);
    const num2 = parseFloat(currentValue);

    switch (operation) {
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
        this.result = NaN;
    }

    const resultDisplay = isNaN(this.result) ? 'Error' : this.result.toString();

    const historyEntry = `${num1} ${operation} ${num2} = ${resultDisplay}`;
    this.history.unshift(historyEntry);
    if (this.history.length > 3) {
      this.history.pop();
    }

    return {
      result: resultDisplay,
      history: [...this.history]
    };
  }
}
