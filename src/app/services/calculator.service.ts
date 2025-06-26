import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private history: string[] = [];

  calculate(expression: string): { result: string; history: string[] } {
    let rawResult: number;

    try {
      rawResult = eval(expression.replace(/[^-()\d/*+.%]/g, ''));
    } catch {
      return { result: 'Error', history: this.history };
    }

    const resultDisplay = isNaN(rawResult)
      ? 'Error'
      : Number.isInteger(rawResult)
      ? rawResult.toString()
      : rawResult.toFixed(2).toString();

    this.history.unshift(`${expression} = ${resultDisplay}`);
    if (this.history.length > 3) {
      this.history.pop();
    }

    return {
      result: resultDisplay,
      history: [...this.history],
    };
  }
}
