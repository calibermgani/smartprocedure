import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-histroy',
  templateUrl: './histroy.component.html',
  styleUrls: ['./histroy.component.scss']
})
export class HistroyComponent  implements OnInit{

  @Output() GoBackToAllItemsEvent_histroy = new EventEmitter();
  ListViewData:any = [];

  constructor(private http : HttpClient){}
  ngOnInit(): void {
    this.http.get('assets/json/histroy.json').subscribe((res:any)=>{
      this.ListViewData = res;
    });
  }

  GoBackToAllItems(){
    this.GoBackToAllItemsEvent_histroy.next('all');
  }
}
