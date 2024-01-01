import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.scss']
})
export class ProcedureDetailsComponent implements OnInit{

  @Input() StageValue:any;
  mainTabsValue:any;
  constructor(private http : HttpClient){}

  ngOnInit(): void {
    this.http.get('assets/json/main-tabs.json').subscribe((res:any)=>{
      this.mainTabsValue = res;
    })
  }

  CloseViewOnlyMode(){
    document.body.classList.toggle('selva');
  }
}
