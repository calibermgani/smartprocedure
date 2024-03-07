import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent {

  @Output() GoBackToAllItemsEvent_trash = new EventEmitter();
  ListViewData:any = [];
  ShowRestoreHeader:boolean = false;

  constructor(private http : HttpClient){}
  ngOnInit(): void {
    this.http.get('assets/json/histroy.json').subscribe((res:any)=>{
      this.ListViewData = res;
    });
  }

  GoBackToAllItems(){
    this.GoBackToAllItemsEvent_trash.next('all');
  }

  SelectItem(){
    this.ShowRestoreHeader =! this.ShowRestoreHeader;
  }
}
