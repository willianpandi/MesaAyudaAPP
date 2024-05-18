import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): any {
    if (value) {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(value, 'dd/MM/yyyy - HH:mm:ss');
      return formattedDate;
    }
    return null;
  }

  // transform(value: any): any {
  //   if (value) {
  //     const date = new Date(value);
  //     const day = this.padZero(date.getDate());
  //     const month = this.padZero(date.getMonth() + 1);
  //     const year = date.getFullYear();
  //     const hours = this.padZero(date.getHours());
  //     const minutes = this.padZero(date.getMinutes());
  //     // const seconds = this.padZero(date.getSeconds());

  //     return `${day}/${month}/${year} - ${hours}:${minutes}`;
  //   }
  //   return null;
  // }

  // private padZero(value: number): string {
  //   return value < 10 ? `0${value}` : `${value}`;
  // }

}
