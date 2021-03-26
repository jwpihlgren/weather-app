import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asMetersPerSecond'
})
export class AsMetersPerSecondPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    return `${Math.floor(value * 0.28)} m/s`
  }
}
