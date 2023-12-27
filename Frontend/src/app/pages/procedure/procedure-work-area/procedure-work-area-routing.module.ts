import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkAreaComponent } from './work-area/work-area.component';

const routes: Routes = [
  { path: '', component: WorkAreaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureWorkAreaRoutingModule { }
