import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  // {
  //   path: "",
  //   component: DefaultComponent
  // },
  // { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule),canActivate:[AuthGuard] },
  { path: 'whiteboard', loadChildren: () => import('./whiteboard/whiteboard.module').then(m => m.WhiteboardModule),canActivate:[AuthGuard] },
  { path: 'procedure', loadChildren: () => import('./procedure/procedure.module').then(m => m.ProcedureModule),canActivate:[AuthGuard]},
  { path: 'calender', loadChildren: () => import('./calender/calender.module').then(m => m.CalenderModule),canActivate:[AuthGuard] },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),canActivate:[AuthGuard] },
  { path: 'checklist', loadChildren: () => import('./checklist/checklist.module').then(m => m.ChecklistModule),canActivate:[AuthGuard] },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),canActivate:[AuthGuard] },
  { path: 'workarea', loadChildren: () => import('./procedure/procedure-work-area/procedure-work-area.module').then(m => m.ProcedureWorkAreaModule),canActivate:[AuthGuard] },
  { path: 'staff-management', loadChildren: () => import('./staff-management/staff-management.module').then(m => m.StaffManagementModule),canActivate:[AuthGuard] },
  { path: 'material-management', loadChildren: () => import('./material-management/material-management.module').then(m => m.MaterialManagementModule),canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
