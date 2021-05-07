import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/sv';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: string): unknown {
    dayjs.locale('sv')
    return dayjs(date, 'yyyy-mm-dd').format('dddd');
  }

}
