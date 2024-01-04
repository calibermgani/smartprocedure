import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface kizintabValues{
  "tabs": string,
  "id": number,
  "template":string,
  "active":string,
  "content":string,
  "imgPath":string,
  "removable":boolean,
  "disabled":boolean,
}

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent implements OnInit{

  miniList_details:any;
  procedureAlertsData: any;
  kizintabValues:any = [];
  constructor(private http: HttpClient){}
  ngOnInit() {
    this.http.get('assets/json/mini-list.json').subscribe((res:any)=>{
        this.miniList_details = res;
    });

    this.http.get('assets/json/procedure-alerts.json').subscribe((res:any)=>{
      this.procedureAlertsData = res;
    });

    this.http.get<kizintabValues>('assets/json/kizin-main-tabs.json').subscribe((res:any)=>{
      this.kizintabValues = res;
    });
  }
}
