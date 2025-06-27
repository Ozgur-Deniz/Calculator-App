import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'doubleDigit', standalone: true })
export class DoubleDigitPipe implements PipeTransform {
  transform(value: number | string): string {
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return num < 10 && num > -10 ? (num < 0 ? '-0' + Math.abs(num) : '0' + num) : String(num);
  }
} 