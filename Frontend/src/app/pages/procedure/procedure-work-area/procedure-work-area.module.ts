import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureWorkAreaRoutingModule } from './procedure-work-area-routing.module';
import { WorkAreaComponent } from './work-area/work-area.component';
import { ProcedureStatusComponent } from './procedure-status/procedure-status.component';
import { ProcedureDetailsComponent } from './procedure-details/procedure-details.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AllProceduresComponent } from './all-procedures/all-procedures.component';
import { VettingComponent } from './vetting/vetting.component';
import { BookingComponent } from './booking/booking.component';
import { PreProcedureComponent } from './pre-procedure/pre-procedure.component';
import { IntraProcedureComponent } from './intra-procedure/intra-procedure.component';
import { PostProcedureComponent } from './post-procedure/post-procedure.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NgStepperModule} from 'angular-ng-stepper';
@NgModule({
  declarations: [
    WorkAreaComponent,
    ProcedureStatusComponent,
    ProcedureDetailsComponent,
    AllProceduresComponent,
    VettingComponent,
    BookingComponent,
    PreProcedureComponent,
    IntraProcedureComponent,
    PostProcedureComponent
  ],
  imports: [
    CommonModule,
    ProcedureWorkAreaRoutingModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgStepperModule,
    CdkStepperModule
  ]
})
export class ProcedureWorkAreaModule { }
