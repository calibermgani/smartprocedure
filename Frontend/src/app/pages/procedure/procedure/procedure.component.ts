import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class ProcedureComponent {

  constructor(private router : Router){}

  go(){
    this.router.navigate(['/workarea'])
  }
}
