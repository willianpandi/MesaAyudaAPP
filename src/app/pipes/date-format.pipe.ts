import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(value, 'dd/MM/yyyy : HH:mm');
      return formattedDate;
    }
    return null;
  }

}
