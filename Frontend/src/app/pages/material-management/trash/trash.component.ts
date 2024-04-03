import { AllServicesService } from 'src/app/core/services/all-services.service';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment_new } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent {

  @Output() GoBackToAllItemsEvent_trash = new EventEmitter();
  @ViewChild('restore', { static: false }) restore?: ModalDirective;
  ListViewData: any = [];
  ShowRestoreHeader: boolean = false;
  apiUrl = environment_new.imageUrl
  SelectAllItems: boolean = false;
  SelectindividualItems: boolean;

  constructor(private http: HttpClient, private allService: AllServicesService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.allService.getTrashItems().subscribe({
      next: ((res: any) => {
        if (res.status == 'Success') {
          this.ListViewData = res.items
        }
      }),
      error: ((error: any) => {
        this.toastr.error(`Something went wrong`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      })
    })
  }

  GoBackToAllItems() {
    this.GoBackToAllItemsEvent_trash.next('all');
  }

  SelectedItems: any = [];
  SelectItem(selectedindex: any) {
    console.log('Selected Items', selectedindex);
    let count = false;
    if (this.SelectedItems.length == 0) {
      this.SelectedItems.push(selectedindex);
    }
    else {
      this.SelectedItems.forEach((element, index) => {
        if (element == selectedindex) {
          this.SelectedItems.splice(index, 1)
          count = true;
        }
      });
      if (!count) {
        this.SelectedItems.push(selectedindex);
      }
    }
    console.log('SelectedItems', this.SelectedItems);
    if (this.SelectedItems.length > 0) {
      this.ShowRestoreHeader = true;
      this.SelectAllItems = true;
    }
    else {
      this.ShowRestoreHeader = false;
      this.SelectAllItems = false;
    }
  }

  DisSelectAllItems(event) {
    this.SelectAllItems = false;
    this.SelectedItems = [];
    console.log('SelectedItems', this.SelectedItems);
    this.ShowRestoreHeader = false;
    console.log(event.currentTarget.checked);
    if (event.currentTarget.checked == false) {
      const checkboxes = document.querySelectorAll<HTMLInputElement>('#customCheck1');
      console.log(checkboxes);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  }
  DisSelectAllItems_h1() {
    this.SelectAllItems = false;
    this.SelectedItems = [];
    console.log('SelectedItems', this.SelectedItems);
    this.ShowRestoreHeader = false;
    const checkboxes = document.querySelectorAll<HTMLInputElement>('#customCheck1');
    console.log(checkboxes);
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  RestoreIndividualItems(id:any){
    this.SelectedItems.push(id);
    this.restore?.show();
  }

  RestoreItems(){
    this.allService.RestoreItems(this.SelectedItems).subscribe({
      next: ((res: any) => {
        if (res.status == 'Success') {
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
          this.restore.hide();
          this.ngOnInit();
          this.DisSelectAllItems_h1()
          this.SelectedItems = [];
        }
      }),
      error: ((error: any) => {
        this.toastr.error(`Something went wrong`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
        this.restore.hide();
      })
    })
  }
}
