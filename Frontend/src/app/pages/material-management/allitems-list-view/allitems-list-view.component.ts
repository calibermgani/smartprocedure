import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allitems-list-view',
  templateUrl: './allitems-list-view.component.html',
  styleUrls: ['./allitems-list-view.component.scss']
})
export class AllitemsListViewComponent implements OnInit{

  ListViewData:any=[];
  showNestedList:boolean = false;
  showEditablefields:boolean = false;
  selectedListItems:any[]= [];
  constructor(private http : HttpClient){}

  ngOnInit(): void {
    this.http.get('assets/json/allItems-listView.json').subscribe((res:any)=>{
      this.ListViewData = res;
    })
  }

  selectedItemIndex: number;
  OpenNestedList(data: number,) {
    console.log('Current Array Value',this.selectedListItems);
    console.log('Current Array length',this.selectedListItems.length);
    console.log('Data', data);
    this.selectedItemIndex = data;
    if (this.selectedListItems.length>=1) {
      console.log('Enter if not empty');
      this.selectedListItems.forEach((element,index) => {
        if (element == data) {
          this.showNestedList = false;
          this.selectedListItems = this.selectedListItems.splice(index,0);
        }
        else{
          this.showNestedList = true;
          this.selectedListItems.push(data);
        }
      });
    }
    else {
      console.log('Enter if array empty');
      this.selectedListItems.push(data);
      this.showNestedList = true;
    }
    console.log('Updated Array',this.selectedListItems);
    console.log('----------------------------');
  }

  selectgrid(){
    this.showEditablefields =! this.showEditablefields;
  }
}
