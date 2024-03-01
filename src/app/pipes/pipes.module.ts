import { NgModule } from '@angular/core';
import { OrderPipe } from './order.pipe';
import { DateFormatPipe } from './date-format.pipe';



@NgModule({
  declarations: [ OrderPipe, DateFormatPipe ],
  exports: [
    OrderPipe,
    DateFormatPipe,
  ]
})
export class PipesModule { }
