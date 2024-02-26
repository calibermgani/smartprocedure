import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialManagementRoutingModule } from './material-management-routing.module';
import { AllItemsComponent } from './all-items/all-items.component';
import { DashboardMaterialManagementComponent } from './dashboard-material-management/dashboard-material-management.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { LowStockComponent } from './low-stock/low-stock.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DailyConsumedComponent } from './daily-consumed/daily-consumed.component';
import { DamagedComponent } from './damaged/damaged.component';
import { BackToCabinetComponent } from './back-to-cabinet/back-to-cabinet.component';
import { NearExpiredComponent } from './near-expired/near-expired.component';
import { RefillToCabinetComponent } from './refill-to-cabinet/refill-to-cabinet.component';
import { RecallComponent } from './recall/recall.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxSliderModule } from 'ngx-slider-v2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WastedComponent } from './wasted/wasted.component';
import { AllItemsTableViewComponent } from './allitems-table-view/allitems-table-view.component';
import { AllitemsGridViewComponent } from './allitems-grid-view/allitems-grid-view.component';
import { AllitemsListViewComponent } from './allitems-list-view/allitems-list-view.component';
import { GridItemsDetailedViewComponent } from './grid-items-detailed-view/grid-items-detailed-view.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AllItemsComponent,
    DashboardMaterialManagementComponent,
    VendorListComponent,
    LowStockComponent,
    DailyConsumedComponent,
    DamagedComponent,
    BackToCabinetComponent,
    NearExpiredComponent,
    RefillToCabinetComponent,
    RecallComponent,
    WastedComponent,
    AllItemsTableViewComponent,
    AllitemsGridViewComponent,
    AllitemsListViewComponent,
    GridItemsDetailedViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialManagementRoutingModule,
    AgGridModule,
    NgSelectModule,
    BsDropdownModule.forRoot(),
    TooltipModule,
    NgxDropzoneModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    NgxSliderModule,
    ToastrModule.forRoot()
  ],
  providers:[

  ]
})
export class MaterialManagementModule { }
