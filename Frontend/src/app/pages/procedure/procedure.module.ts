import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedureRoutingModule } from './procedure-routing.module';
import { ProcedureComponent } from './procedure/procedure.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    ProcedureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProcedureRoutingModule,
    TooltipModule,
    NgSelectModule,
    AgGridModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ]
})
export class ProcedureModule { }
