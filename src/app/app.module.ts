import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { HistoryComponent } from './components/history/history.component';
import { DoubleDigitPipe } from './pipes/double-digit.pipe';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CalculatorComponent,
    DoubleDigitPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
