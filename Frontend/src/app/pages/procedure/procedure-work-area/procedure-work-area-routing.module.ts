import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkAreaComponent } from './work-area/work-area.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: WorkAreaComponent,canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureWorkAreaRoutingModule { }
