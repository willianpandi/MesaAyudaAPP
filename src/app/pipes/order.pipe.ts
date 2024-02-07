import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(array: any[], field: string): any[] {
    if (!array || !field) {
      return array;
    }

    return array.slice().sort((a, b) => {
      const nameA = a[field].toLowerCase();
      const nameB = b[field].toLowerCase();

      return nameA.localeCompare(nameB);
    });
  }

}
