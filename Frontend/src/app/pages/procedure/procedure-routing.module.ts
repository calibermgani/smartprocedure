import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedureComponent } from './procedure/procedure.component';

const routes: Routes = [
  { path: '', component: ProcedureComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureRoutingModule { }
