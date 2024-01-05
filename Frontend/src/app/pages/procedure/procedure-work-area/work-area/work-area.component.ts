import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface kizintabValues{
  "tabs": string,
  "id": number,
  "template":string,
  "active":boolean,
  "content":string,
  "imgPath":string,
  "activeimg":string,
  "removable":boolean,
  "disabled":boolean,
}

interface ProcedureStageList{
  "id": number,
  "stage":string,
  "status": string,
  "list": Task[]
}

interface Task{
  "id":number,
  "task": string,
  "completed_date_time": string,
  "status": string,
  "role": string,
  "owner": string
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
  taskList:any = [];
  procedureStagelist:any = [];
  isFirstOpen: boolean = true;

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

    this.http.get<ProcedureStageList>('assets/json/procedure-stage-list.json').subscribe((res:any)=>{
      console.log('ressa',res);

      this.procedureStagelist = res;
    });
  }

  toggleTabIcon(index: number) {
    console.log('index',index);
    this.kizintabValues[index].active = !this.kizintabValues[index].active;
    for(let i=0;i<3;i++){
      if(i!=index)
      {
        this.kizintabValues[i].active = false;
      }
    }
  }
}
