import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialManagementRoutingModule } from './material-management-routing.module';
import { AllItemsComponent } from './all-items/all-items.component';
import { DashboardMaterialManagementComponent } from './dashboard-material-management/dashboard-material-management.component';
import { AgGridModule } from 'ag-grid-angular';
import { ViewFullGridComponent } from './view-full-grid/view-full-grid.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { LowStockComponent } from './low-stock/low-stock.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AllItemsComponent,
    DashboardMaterialManagementComponent,
    ViewFullGridComponent,
    VendorListComponent,
    LowStockComponent
  ],
  imports: [
    CommonModule,
    MaterialManagementRoutingModule,
    AgGridModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    TooltipModule,
    NgxDropzoneModule,
    ModalModule.forRoot()
  ],
  providers:[

  ]
})
export class MaterialManagementModule { }
