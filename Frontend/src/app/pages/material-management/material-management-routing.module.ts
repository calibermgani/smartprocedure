import { GridItemsDetailedViewComponent } from './grid-items-detailed-view/grid-items-detailed-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllItemsComponent } from './all-items/all-items.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DashboardMaterialManagementComponent } from './dashboard-material-management/dashboard-material-management.component';

const routes: Routes = [
  {path:'all-item',component:AllItemsComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardMaterialManagementComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialManagementRoutingModule { }
