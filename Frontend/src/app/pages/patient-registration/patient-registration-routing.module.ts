import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { AgGridModule } from 'ag-grid-angular';

const routes: Routes = [
  {path:'register',component:RegistrationPageComponent},
  {path:'patient_list',component:PatientListComponent},
  {path: 'patient-view', component:PatientViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRegistrationRoutingModule { }
