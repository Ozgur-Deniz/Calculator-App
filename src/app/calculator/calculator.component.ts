import { Component } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  display = '0';
  prevValue = '';
  currentValue = '0';
  operation: string | null = null;
  clearScreen = false;
  justCleared = false;
  history: string[] = [];

  constructor(private calculatorService: CalculatorService) {}

  clearCalculate() {
    this.display = '0';
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

    const { result, history } = this.calculatorService.calculate(
      this.prevValue,
      this.currentValue,
      this.operation
    );

    this.display = result;
    this.prevValue = result;
    this.history = history;

    this.clearScreen = true;
    this.justCleared = false;
  }
}
