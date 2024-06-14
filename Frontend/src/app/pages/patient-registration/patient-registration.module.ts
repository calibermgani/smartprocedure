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
import { MaterialManagementModule } from '../material-management/material-management.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { ClinicalHistoryTabComponent } from './clinical-history-tab/clinical-history-tab.component';
import { LabsComponent } from './labs/labs.component';
import { MedicationComponent } from './medication/medication.component';
import { CareTeamComponent } from './care-team/care-team.component';
import { NgxSliderModule } from 'ngx-slider-v2';

@NgModule({
  declarations: [
    RegistrationPageComponent,
    PatientListComponent,
    PatientViewComponent,
    CustomTooltipComponent,
    ClinicalHistoryTabComponent,
    LabsComponent,
    MedicationComponent,
    CareTeamComponent
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
    MaterialManagementModule,
    SharedModule,
    NgxSliderModule
  ]
})
export class PatientRegistrationModule { }
