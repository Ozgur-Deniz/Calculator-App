import { Component } from '@angular/core';
import { CalculatorService } from '../../services/calculator.service';
import { HistoryService } from '../../services/history.service';
import { HistoryComponent } from '../history/history.component';
import { DoubleDigitPipe } from '../../pipes/double-digit.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, HistoryComponent, DoubleDigitPipe],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [HistoryService],
})
export class CalculatorComponent {
  display: string = '0';
  currentValue: string = '';
  operator: string | null = null;
  firstOperand: number | null = null;
  waitSecondOperand: boolean = false;

  constructor(
    private calculatorService: CalculatorService,
    private historyService: HistoryService
  ) {}

  buttonClick(value: string) {
    if (!isNaN(Number(value))) {
      this.inputDigit(value);
    } else if (['+', '-', '*', '/', '^'].includes(value)) {
      this.handleOperator(value);
    } else if (value === 'AC') {
      this.clear();
    } else if (value === '\u2190') {
      this.backspace();
    } else if (value === '=') {
      this.calculate();
    }
  }

  inputDigit(digit: string) {
    if (this.waitSecondOperand) {
      this.currentValue = digit;
      this.waitSecondOperand = false;
    } else {
      this.currentValue =
        this.currentValue === '0' ? digit : this.currentValue + digit;
    }
    this.display = this.currentValue;
  }

  handleOperator(nextOperator: string) {
    const inputValue = parseFloat(this.currentValue || this.display);
    if (this.operator && this.waitSecondOperand) {
      this.operator = nextOperator;
      return;
    }
    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculatorService.calculate(
        this.operator,
        this.firstOperand,
        inputValue
      );
      this.display = String(result);
    }
    this.operator = nextOperator;
    this.waitSecondOperand = true;
  }

  clear() {
    this.display = '0';
    this.currentValue = '';
    this.firstOperand = null;
    this.operator = null;
    this.waitSecondOperand = false;
  }

  backspace() {
    if (this.currentValue.length > 0) {
      this.currentValue = this.currentValue.slice(0, -1);
      this.display = this.currentValue || '0';
    }
  }

  calculate() {
    if (
      this.operator &&
      this.firstOperand !== null &&
      this.currentValue !== ''
    ) {
      const secondOperand = parseFloat(this.currentValue);
      const result = this.calculatorService.calculate(
        this.operator,
        this.firstOperand,
        secondOperand
      );
      this.display = String(result);
      this.currentValue = String(result);
      //come here history
      const entry = `${this.firstOperand} ${this.operator} ${secondOperand} = ${result}`;
      this.historyService.addHistory(entry)
      this.firstOperand = null;
      this.operator = null;
      this.waitSecondOperand = false;
    }
  }

  get history () {
    return this.historyService.getHistory();
  }
}
