import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRegistrationRoutingModule } from './patient-registration-routing.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    PatientRegistrationRoutingModule,
    NgStepperModule,
    CdkStepperModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
  ]
})
export class PatientRegistrationModule { }
