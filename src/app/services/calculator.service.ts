import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private elements: (number | string)[] = [];
  private currentInput: string = '';
  private lastOperation: string = '';

  get display(): string {
    if (this.currentInput !== '') return this.currentInput;
    if (this.elements.length > 0) return this.elements.join(' ');
    return '0';
  }

  get lastFullOperation(): string {
    return this.lastOperation;
  }

  processInput(input: string) {
    if (this.isNumber(input) || input === '.') {
      this.currentInput += input;
    } else if (this.isOperator(input)) {
      if (this.currentInput !== '') {
        this.elements.push(parseFloat(this.currentInput));
        this.currentInput = '';
      }
      if (typeof this.elements[this.elements.length - 1] === 'string') {
        this.elements[this.elements.length - 1] = input;
      } else {
        this.elements.push(input);
      }
    } else if (input === '=') {
      if (this.currentInput !== '') {
        this.elements.push(parseFloat(this.currentInput));
        this.currentInput = '';
      }
      const expr = this.elements.join(' ');
      const result = this.evaluateElements(this.elements);
      this.elements = [result];
      this.currentInput = '';
      this.lastOperation = `${expr} = ${result}`;
    } else if (input === 'AC') {
      this.elements = [];
      this.currentInput = '';
      this.lastOperation = '';
    } else if (input === 'Backspace') {
      if (this.currentInput !== '') {
        this.currentInput = this.currentInput.slice(0, -1);
      } else if (this.elements.length > 0) {
        const last = this.elements.pop();
        if (typeof last === 'number') {
          this.currentInput = last.toString().slice(0, -1);
        }
      }
    }
  }

  private roundResult(value: number, digits: number = 8): number {
    return parseFloat(value.toFixed(digits));
  }

  private evaluateElements(elements: (number | string)[]): number {
    // 1. Çarpma ve bölme işlemlerini sırayla uygula
    let stack: (number | string)[] = [];
    let i = 0;
    while (i < elements.length) {
      if (elements[i] === '*' || elements[i] === '/') {
        const prev = stack.pop() as number;
        const next = elements[i + 1] as number;
        const result = elements[i] === '*' ? prev * next : prev / next;
        stack.push(result);
        i += 2;
      } else {
        stack.push(elements[i]);
        i++;
      }
    }
    // 2. Toplama ve çıkarma işlemlerini sırayla uygula
    let result = stack[0] as number;
    for (let j = 1; j < stack.length; j += 2) {
      const op = stack[j] as string;
      const num = stack[j + 1] as number;
      if (op === '+') result += num;
      if (op === '-') result -= num;
    }
    return this.roundResult(result);
  }

  private isNumber(char: string): boolean {
    return !isNaN(parseFloat(char)) && isFinite(parseFloat(char as any));
  }

  private isOperator(char: string): boolean {
    return ['+', '-', '*', '/'].includes(char);
  }
}
