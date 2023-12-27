import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureWorkAreaRoutingModule } from './procedure-work-area-routing.module';
import { WorkAreaComponent } from './work-area/work-area.component';
import { ProcedureStatusComponent } from './procedure-status/procedure-status.component';
import { ProcedureDetailsComponent } from './procedure-details/procedure-details.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    WorkAreaComponent,
    ProcedureStatusComponent,
    ProcedureDetailsComponent
  ],
  imports: [
    CommonModule,
    ProcedureWorkAreaRoutingModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
  ]
})
export class ProcedureWorkAreaModule { }
