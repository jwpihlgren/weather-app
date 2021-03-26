import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asMilesPerHour'
})
export class AsMilesPerHourPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    return `${Math.floor(value * 2.2369)} mph/s`
  }

}
