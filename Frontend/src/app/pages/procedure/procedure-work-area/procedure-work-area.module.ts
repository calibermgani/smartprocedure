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
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NgStepperModule} from 'angular-ng-stepper';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WorkAreaComponent,
    ProcedureStatusComponent,
    ProcedureDetailsComponent,
    AllProceduresComponent,
    VettingComponent
  ],
  imports: [
    CommonModule,
    ProcedureWorkAreaRoutingModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgStepperModule,
    CdkStepperModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProcedureWorkAreaModule { }
