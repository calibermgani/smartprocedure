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
  ItemsData: any = [];
  CategoriesData : any = [];
  SubCategoryData : any = [];
  VendorData : any = [];
  ShowRestoreHeader: boolean = false;
  apiUrl = environment_new.imageUrl
  SelectAllItems: boolean = false;
  SelectindividualItems: boolean;
  SelectedItems: any = [];
  SelectedVendor: any = [];
  SelectedCategory: any = [];
  SelectedSubCategory: any = [];
  TotalSelectedItems : any = [];
  TashVisibleCdtn : boolean = false;

  constructor(private http: HttpClient, private allService: AllServicesService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.allService.getTrashItems().subscribe({
      next: ((res: any) => {
        if (res.status == 'Success') {
          this.ItemsData = res.data.items;
          this.CategoriesData = res.data.categories;
          this.SubCategoryData = res.data.sub_categories;
          this.VendorData = res.data.vendors;
          this.TashVisibleCdtn = true;
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

  SelectItem(selectedindex: any) {
    console.log('Selected Items', selectedindex);
    let count = false;
    if (this.SelectedItems.length == 0) {
      this.SelectedItems.push(selectedindex);
      this.TotalSelectedItems.push(selectedindex);
    }
    else {
      this.SelectedItems.forEach((element, index) => {
        if (element == selectedindex) {
          this.SelectedItems.splice(index, 1);
          this.TotalSelectedItems.push(index,1);
          count = true;
        }
      });
      if (!count) {
        this.SelectedItems.push(selectedindex);
        this.TotalSelectedItems.push(selectedindex);
      }
    }
    console.log('Selected Items', this.SelectedItems);
    if (this.SelectedItems.length > 0) {
      this.ShowRestoreHeader = true;
      this.SelectAllItems = true;
    }
    else {
      this.ShowRestoreHeader = false;
      this.SelectAllItems = false;
    }
  }

  SelectVendor(selectedindex:any) {
    console.log('Selected Vendors', selectedindex);
    let count = false;
    if (this.SelectedVendor.length == 0) {
      this.SelectedVendor.push(selectedindex);
      this.TotalSelectedItems.push(selectedindex);
    }
    else {
      this.SelectedVendor.forEach((element, index) => {
        if (element == selectedindex) {
          this.SelectedVendor.splice(index, 1);
          this.TotalSelectedItems.push(index,1);
          count = true;
        }
      });
      if (!count) {
        this.SelectedVendor.push(selectedindex);
        this.TotalSelectedItems.push(selectedindex);
      }
    }
    console.log('Selected Vendors', this.SelectedVendor);
    if (this.SelectedVendor.length > 0) {
      this.ShowRestoreHeader = true;
      this.SelectAllItems = true;
    }
    else {
      this.ShowRestoreHeader = false;
      this.SelectAllItems = false;
    }
  }

  SelectCategory(selectedindex:any) {
    console.log('Selected Category', selectedindex);
    let count = false;
    if (this.SelectedCategory.length == 0) {
      this.SelectedCategory.push(selectedindex);
      this.TotalSelectedItems.push(selectedindex);
    }
    else {
      this.SelectedCategory.forEach((element, index) => {
        if (element == selectedindex) {
          this.SelectedCategory.splice(index, 1);
          this.TotalSelectedItems.push(index,1);
          count = true;
        }
      });
      if (!count) {
        this.SelectedCategory.push(selectedindex);
        this.TotalSelectedItems.push(selectedindex);
      }
    }
    console.log('Selected Category', this.SelectedCategory);
    if (this.SelectedCategory.length > 0) {
      this.ShowRestoreHeader = true;
      this.SelectAllItems = true;
    }
    else {
      this.ShowRestoreHeader = false;
      this.SelectAllItems = false;
    }
  }

  SelectSubCategory(selectedindex:any) {
    console.log('Selected SubCategory', selectedindex);
    let count = false;
    if (this.SelectedSubCategory.length == 0) {
      this.SelectedSubCategory.push(selectedindex);
      this.TotalSelectedItems.push(selectedindex);
    }
    else {
      this.SelectedSubCategory.forEach((element, index) => {
        if (element == selectedindex) {
          this.SelectedSubCategory.splice(index, 1);
          this.TotalSelectedItems.push(index,1);
          count = true;
        }
      });
      if (!count) {
        this.SelectedSubCategory.push(selectedindex);
        this.TotalSelectedItems.push(selectedindex);
      }
    }
    console.log('Selected SubCategory', this.SelectedSubCategory);
    if (this.SelectedSubCategory.length > 0) {
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
    this.SelectedVendor = [];
    this.SelectedCategory = [];
    this.SelectedSubCategory = [];
    this.TotalSelectedItems = [];
    console.log('SelectedItems', this.SelectedItems);
    console.log('SelectedVendor', this.SelectedVendor);
    console.log('SelectedCategory', this.SelectedCategory);
    console.log('SelectedSubCategory', this.SelectedSubCategory);
    this.ShowRestoreHeader = false;
    console.log(event.currentTarget.checked);
    if (event.currentTarget.checked == false) {
      const checkboxes = document.querySelectorAll<HTMLInputElement>('#customCheck1');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  }
  DisSelectAllItems_h1() {
    this.SelectAllItems = false;
    this.SelectedItems = [];
    this.SelectedVendor = [];
    this.SelectedCategory = [];
    this.SelectedSubCategory = [];
    this.TotalSelectedItems = [];
    console.log('SelectedItems', this.SelectedItems);
    console.log('SelectedVendor', this.SelectedVendor);
    console.log('SelectedCategory', this.SelectedCategory);
    console.log('SelectedSubCategory', this.SelectedSubCategory);
    console.log('TotalSelectedItems', this.TotalSelectedItems);
    this.ShowRestoreHeader = false;
    const checkboxes = document.querySelectorAll<HTMLInputElement>('#customCheck1');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  RestoreIndividualItems(id:any){
    this.SelectedItems.push(id);
    this.restore?.show();
  }

  RestoreIndividualVendor(id:any){
    this.SelectedVendor.push(id);
    this.restore?.show();
  }

  RestoreIndividualCategory(id:any){
    this.SelectedCategory.push(id);
    this.restore?.show();
  }

  RestoreIndividualSubCategory(id:any){
    this.SelectedSubCategory.push(id);
    this.restore?.show();
  }

  RestoreItems(){
    this.allService.RestoreItems(this.SelectedItems,this.SelectedVendor,this.SelectedCategory,this.SelectedSubCategory).subscribe({
      next: ((res: any) => {
        if (res.status == 'Success') {
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
          this.restore.hide();
          this.ngOnInit();
          this.DisSelectAllItems_h1();
        }
      }),
      error: ((error: any) => {
        this.toastr.error(`Something went wrong`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
        this.restore.hide();
        this.DisSelectAllItems_h1();
      })
    })
  }
}
