import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  calculate(operator: string, first: number, second: number): number {
    switch (operator) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return second !== 0 ? first / second : NaN;
      default:
        return second;
    }
  }
}
