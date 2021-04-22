import { Pipe, PipeTransform } from '@angular/core'
import { WindspeedUnit } from 'app/enums/windspeed-units.enum'

@Pipe({
    name: 'convertWindspeedUnit',
})
export class ConvertWindspeedUnitPipe implements PipeTransform {
    transform(value: number, unit: WindspeedUnit): string {
        if (unit === WindspeedUnit.mps) {
            return `${Math.floor(value * 0.28)} m/s`
        }
        return `${value} mph`
    }
}
