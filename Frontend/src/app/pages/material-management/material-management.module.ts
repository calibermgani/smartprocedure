import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialManagementRoutingModule } from './material-management-routing.module';
import { AllItemsComponent } from './all-items/all-items.component';


@NgModule({
  declarations: [
    AllItemsComponent
  ],
  imports: [
    CommonModule,
    MaterialManagementRoutingModule
  ]
})
export class MaterialManagementModule { }
