import { Component } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  expression: string = '';
  history: string[] = [];

  constructor(private calculatorService: CalculatorService) {}

  appendValue(value: string) {
    this.expression += value;
  }

  appendOperator(operator: string) {
    const lastChar = this.expression.slice(-1);
    if ('+-*/%'.includes(lastChar)) {
      this.expression = this.expression.slice(0, -1) + operator;
    } else {
      this.expression += operator;
    }
  }

  appendDot() {
    const parts = this.expression.split(/[\+\-\*\/%]/);
    const last = parts[parts.length - 1];
    if (!last.includes('.')) {
      this.expression += '.';
    }
  }

  toggleSign() {
    const match = this.expression.match(/(-?\\d*\\.?\\d+)(?!.*\\d)/);
    if (!match) return;

    const number = match[0];
    const startIndex = this.expression.lastIndexOf(number);
    const toggled = number.startsWith('-') ? number.slice(1) : '-' + number;

    this.expression =
      this.expression.slice(0, startIndex) +
      toggled +
      this.expression.slice(startIndex + number.length);
  }

  clearCalculate() {
    this.expression = '';
  }

  calculate() {
    const { result, history } = this.calculatorService.calculate(this.expression);
    this.expression = result;
    this.history = history;
  }
}
