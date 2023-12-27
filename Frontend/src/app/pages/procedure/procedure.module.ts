import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureRoutingModule } from './procedure-routing.module';
import { ProcedureComponent } from './procedure/procedure.component';


@NgModule({
  declarations: [
    ProcedureComponent
  ],
  imports: [
    CommonModule,
    ProcedureRoutingModule
  ]
})
export class ProcedureModule { }
