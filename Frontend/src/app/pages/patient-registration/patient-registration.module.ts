import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegistrationRoutingModule } from './patient-registration-routing.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientListComponent } from './patient-list/patient-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    RegistrationPageComponent,
    
    PatientListComponent
  ],
  imports: [
    CommonModule,
    PatientRegistrationRoutingModule,
    NgStepperModule,
    CdkStepperModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    ModalModule.forRoot(),
  ]
})
export class PatientRegistrationModule { }
