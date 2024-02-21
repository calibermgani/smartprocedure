import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';


@Component({
  selector: 'app-all-procedures',
  templateUrl: './all-procedures.component.html',
  styleUrls: ['./all-procedures.component.scss']
})
export class AllProceduresComponent implements OnInit {

  stepperData: any;
  VettingCondition:boolean = false;
  BookingCondition:boolean = false;
  PreProcedureCondition:boolean = false;
  IntraProcedureCondition:boolean = false;
  PostProcedureCondition:boolean = false;
  procedureAlertsData:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/json/procedure-stage.json').subscribe((res: any) => {
      this.stepperData = res;
      console.log(this.stepperData);
      this.stepperData.forEach(element => {
        if(element.title == 'Vetting'){
          this.VettingCondition = true;
        }
        else if(element.title == 'Booking'){
          this.BookingCondition = true;
        }
        else if(element.title == 'Pre-procedure'){
          this.PreProcedureCondition = true;
        }
        else if(element.title == 'Intra-procedure'){
          this.IntraProcedureCondition = true;
        }
        else if(element.title == 'Post-procedure'){
          this.PostProcedureCondition = true;
        }
      });
    });
    this.http.get('assets/json/procedure-alerts.json').subscribe((res:any)=>{
      this.procedureAlertsData = res;
    });
  }
}
