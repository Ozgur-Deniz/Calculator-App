import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private history: string[] = [];
  private maxHistory = 4;
  
  addHistory (entry: string) {
    this.history.unshift(entry);
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }
  }

  getHistory (): string[] {
    return this.history;
  }
}
