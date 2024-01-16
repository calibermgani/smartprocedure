import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialManagementRoutingModule } from './material-management-routing.module';
import { AllItemsComponent } from './all-items/all-items.component';
import { DashboardMaterialManagementComponent } from './dashboard-material-management/dashboard-material-management.component';
import { AgGridModule } from 'ag-grid-angular';
import { ViewFullGridComponent } from './view-full-grid/view-full-grid.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AllItemsComponent,
    DashboardMaterialManagementComponent,
    ViewFullGridComponent
  ],
  imports: [
    CommonModule,
    MaterialManagementRoutingModule,
    AgGridModule,
    NgSelectModule
  ],
  providers:[

  ]
})
export class MaterialManagementModule { }
