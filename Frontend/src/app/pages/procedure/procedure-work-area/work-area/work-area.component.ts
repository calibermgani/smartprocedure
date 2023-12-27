import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent implements OnInit{

  miniList_details:any;
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get('assets/json/mini-list.json').subscribe((res:any)=>{
        this.miniList_details = res;
    })
  }
}
