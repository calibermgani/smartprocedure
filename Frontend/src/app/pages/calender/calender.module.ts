import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalenderRoutingModule } from './calender-routing.module';
import { CalenderComponent } from './calender/calender.component';


@NgModule({
  declarations: [
    CalenderComponent
  ],
  imports: [
    CommonModule,
    CalenderRoutingModule
  ]
})
export class CalenderModule { }
