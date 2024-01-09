import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialManagementRoutingModule } from './material-management-routing.module';
import { AllItemsComponent } from './all-items/all-items.component';
import { DashboardMaterialManagementComponent } from './dashboard-material-management/dashboard-material-management.component';


@NgModule({
  declarations: [
    AllItemsComponent,
    DashboardMaterialManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialManagementRoutingModule
  ]
})
export class MaterialManagementModule { }
