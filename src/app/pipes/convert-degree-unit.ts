import { Pipe, PipeTransform } from '@angular/core';
import { DegreeUnit } from 'app/enums/degree-units/degree-units.enum';

@Pipe({
  name: 'convertDegreeUnit'
})

export class ConvertDegreeUnitPipe implements PipeTransform {
  fahrenheit = "\xB0F";
  celcius = "\xB0C";

 transform(value: number, unit: DegreeUnit): string {
   if(unit === DegreeUnit.fahrenheit) {
    return `${Math.floor((value * 0.28) * 1.8 + 32)} ${this.fahrenheit}`;
   }
   return `${Math.floor(value)} ${this.celcius}`;
    
  }

}

