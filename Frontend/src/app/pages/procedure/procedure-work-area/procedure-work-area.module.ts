import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureWorkAreaRoutingModule } from './procedure-work-area-routing.module';
import { WorkAreaComponent } from './work-area/work-area.component';
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
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSliderModule } from 'ngx-slider-v2';
import { ProcedureDetailsBookingComponent } from './procedure-details-booking/procedure-details-booking.component';
import { ProcedureDetailsPreProcedureComponent } from './procedure-details-pre-procedure/procedure-details-pre-procedure.component';
import { ProcedureDetailsIntraProcedureComponent } from './procedure-details-intra-procedure/procedure-details-intra-procedure.component';
import { ProcedureDetailsPostProcedureComponent } from './procedure-details-post-procedure/procedure-details-post-procedure.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { ViewInfoComponent } from './view-info/view-info.component';

@NgModule({
  declarations: [
    WorkAreaComponent,
    ProcedureDetailsComponent,
    AllProceduresComponent,
    VettingComponent,
    ProcedureDetailsBookingComponent,
    ProcedureDetailsPreProcedureComponent,
    ProcedureDetailsIntraProcedureComponent,
    ProcedureDetailsPostProcedureComponent,
    ViewInfoComponent,
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
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgSelectModule,
    AgGridModule
  ]
})
export class ProcedureWorkAreaModule { }
