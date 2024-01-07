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
  "accord_open":boolean,
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

interface timeline{
  "id":number,
  "data":string,
  "time":string,
  "procedure_status":string,
  "description":string,
  "owner":string,
  "role":string
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
  timeline_data:any= [];
  isFirstOpen: boolean = true;
  show_patient_details:boolean = true;
  alert_condition:boolean = true;

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
      for(let i=0;i<res.length;i++)
      {
        if(res[i].list)
        {
          this.taskList.push(res[i].list);
        }
      }
    });

    this.http.get<timeline>('assets/json/timeline.json').subscribe((res:any)=>{
      this.timeline_data = res;
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

  onPatientDetailsButtonClicked() {
    this.show_patient_details = false;
  }
  go_back_to_Kizin(){
    this.show_patient_details = true;
  }

  changeAlerts(data:any){
    switch(data){
      case 'fall':{
        this.alert_condition =! this.alert_condition;
      }
      case 'allergies':{
        this.alert_condition =! this.alert_condition;
      }
      case 'pregnant':{
        this.alert_condition =! this.alert_condition;
      }
      case 'covid':{
        this.alert_condition =! this.alert_condition;
      }
    }
  }
}
