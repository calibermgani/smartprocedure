import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.scss']
})
export class ProcedureDetailsComponent implements OnInit{

  @Input() StageValue:any;
  constructor(){}

  ngOnInit(): void {
  }

  CloseViewOnlyMode(){
    console.log('Yes');
    document.body.classList.toggle('selva');
  }
}
