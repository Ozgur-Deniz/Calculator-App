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

  constructor(
    private calculatorService: CalculatorService,
    private historyService: HistoryService
  ) {}

  get display() {
    return this.calculatorService.display;
  }

  buttonClick(value: string) {
    let mapped = value;
    if (value === '\u2190') mapped = 'Backspace';
    const prevDisplay = this.display;
    this.calculatorService.processInput(mapped);
    if (value === '=') {
      this.historyService.addHistory(this.calculatorService.lastFullOperation);
    }
  }

  get history () {
    return this.historyService.getHistory();
  }
}
