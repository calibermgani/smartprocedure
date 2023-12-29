import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-procedures',
  templateUrl: './all-procedures.component.html',
  styleUrls: ['./all-procedures.component.scss']
})
export class AllProceduresComponent implements OnInit {

  stepperData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/json/procedure-stage.json').subscribe((res: any) => {
      console.log('response',res.length);
      this.stepperData = res;
    })
  }
}
