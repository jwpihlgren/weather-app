import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asFahrenheit'
})

export class AsFahrenheitPipe implements PipeTransform {
  fahrenheit = "\u2109";
  celcius = "\u2103"
 transform(value: number, doConvert: boolean): string {
   if(doConvert) {
    return `${Math.floor((value * 0.28) * 1.8 + 32)} ${this.fahrenheit}`;
   }
   return `${Math.floor(value)} ${this.celcius}`;
    
  }

}