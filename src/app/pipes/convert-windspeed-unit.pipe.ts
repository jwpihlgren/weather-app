import { Pipe, PipeTransform } from '@angular/core';
import { TemperatureUnit } from 'app/enums/degree-units/temperature-unit-enum';

@Pipe({
  name: 'convertWindspeedUnit'
})
export class ConvertWindspeedUnitPipe implements PipeTransform {

  transform(value: number,  unit: TemperatureUnit): string {
    if (unit === TemperatureUnit.mps) {
      return `${Math.floor(value * 0.28)} m/s`
    }
    return `${value} mph`
  }
}
