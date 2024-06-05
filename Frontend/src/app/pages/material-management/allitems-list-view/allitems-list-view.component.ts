import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

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
  folder_structure_value:any = [];
  OverAllCheckboxValue : boolean = false;
  SelectedItems : number[] = [];
  constructor(private http : HttpClient,private allServices : AllServicesService,private toastr : ToastrService){}

  ngOnInit(): void {
    // this.http.get('assets/json/allItems-listView.json').subscribe((res:any)=>{
    //   this.ListViewData = res;
    // });

    // this.http.get('assets/json/folder_name.json').subscribe((res:any)=>{
    //   this.folder_structure_value = res;
    //   console.log('response',this.folder_structure_value);
    // });

    this.allServices.GetAllItemsGrid().subscribe({
      next:((res:any)=>{
        console.log(res.data);
        this.ListViewData = res.data
        return;
      }),
      error:((res:any)=>{
        this.toastr.error('Something went wrong', 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    });

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

  selectgrid(Item_ID: number) {
    if (this.SelectedItems.length == 0) {
      this.SelectedItems.push(Item_ID);
    }
    else {
      let flag = true;
      this.SelectedItems.forEach((IDs, index) => {
        if (Item_ID == IDs) {
          this.SelectedItems.splice(index, 1);
          flag = false;
        }
      });
      if (flag == true) {
        this.SelectedItems.push(Item_ID);
      }
    }

    // console.log('Updated Selected Item', this.SelectedItems);

    if (this.SelectedItems.length > 0){this.showEditablefields = true;this.OverAllCheckboxValue=true;}
    else {this.showEditablefields = false;this.OverAllCheckboxValue = false;}
  }

  UncheckAllItems(){
    const checkboxes = document.querySelectorAll<HTMLInputElement>('#customCheck_items');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      this.showEditablefields = false;
      this.SelectedItems = [];
  }
}
