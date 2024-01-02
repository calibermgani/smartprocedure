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
  header_viewOnlymode:any[] = [];
  isFirstOpen:boolean = true;
  constructor(private http : HttpClient){}

  ngOnInit() {
    this.http.get('assets/json/main-tabs.json').subscribe((res:any)=>{
      this.mainTabsValue = res;
    });

    this.http.get('assets/json/viewOnlyMode.json').subscribe((res:any)=>{
      console.log('a',res);
      this.header_viewOnlymode = res;
    })
  }

  CloseViewOnlyMode(){
    document.body.classList.toggle('selva');
  }
  open(){
    window.alert('Hi You ahve opened the testing modal')
  }
}
