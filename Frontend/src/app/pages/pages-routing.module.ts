import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';

const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: DefaultComponent
  },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'whiteboard', loadChildren: () => import('./whiteboard/whiteboard.module').then(m => m.WhiteboardModule) },
  { path: 'procedure', loadChildren: () => import('./procedure/procedure.module').then(m => m.ProcedureModule) },
  { path: 'calender', loadChildren: () => import('./calender/calender.module').then(m => m.CalenderModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'checklist', loadChildren: () => import('./checklist/checklist.module').then(m => m.ChecklistModule) },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'workarea', loadChildren: () => import('./procedure/procedure-work-area/procedure-work-area.module').then(m => m.ProcedureWorkAreaModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
