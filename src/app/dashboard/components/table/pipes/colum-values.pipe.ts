import { Pipe, type PipeTransform } from '@angular/core';
import { TableColumn } from '../interfaces/table-colum.interface';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'columValue',
})
export class ColumValuePipe implements PipeTransform {
  constructor(){}

  transform(row: any, column: TableColumn): string {
    let displayValue = row[column.dataKey];

    switch (column.dataType) {
      case 'date':
        if (column.formatt !== undefined) {
          displayValue = new DatePipe('en').transform(
            displayValue,
            column.formatt
          );
        }
        break;
      case 'object':
        const arrayKeys = column.dataKey.split('.')
        let currentValue: any;
        arrayKeys.forEach((key) => {
          if(currentValue === undefined ){
            currentValue = row[key];
            return;
          }
          currentValue = currentValue[key];
        });
        displayValue = currentValue;
        break;

        case 'boolean':
          const display = row[column.dataKey] ? 'ACTIVO' : 'INACTIVO';
          displayValue = display;
        break;

      default:
        break;
    }
    return displayValue;
  }
}
