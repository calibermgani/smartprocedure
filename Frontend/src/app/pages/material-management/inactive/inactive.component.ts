import { AllServicesService } from 'src/app/core/services/all-services.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { environment_new } from 'src/environments/environment';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss']
})
export class InactiveComponent  implements OnInit{

  @Output() GoBackToAllItemsEvent_trash = new EventEmitter();
  @ViewChild('activate', { static: false }) activate?: ModalDirective;
  public apiUrl: any = environment_new.imageUrl;
  AllInactiveItems:any = [];
  AllCategoryInactiveItems : any = [];
  AllSubCategoryInactiveItems : any = [];
  AllVendorInactiveItems : any = [];
  enablecheckBox:boolean = false;


  constructor(private allService:AllServicesService,private toastr : ToastrService){}

  ngOnInit(): void {
    this.allService.GetInactiveItems().subscribe({
      next: ((res: any) => {
        if (res.status == 'Success') {
          this.AllInactiveItems = res.data.items;
          this.AllCategoryInactiveItems = res.data.categories;
          this.AllSubCategoryInactiveItems = res.data.sub_categories;
          this.AllVendorInactiveItems = res.data.vendors;
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

  SelectedItems : any = [];
  SelectedVendor : any = [];
  SelectedCategory : any = [];
  SelectedSubCategory : any = [];
  SelectedProcedure : any = [];
  Selected_data :any;

  EnableItemsCheckbox(event:any,data:any,type:any){
    switch(type){
      case 'Items': {
        this.activate?.show();
        this.SelectedItems.push(data.id);
        this.Selected_data = data;
        break;
      }
      case 'Vendor': {
        this.activate?.show();
        this.SelectedVendor.push(data.id);
        this.Selected_data = data;
        break;
      }
      case 'Category': {
        this.activate?.show();
        this.SelectedCategory.push(data.id);
        this.Selected_data = data;
        break;
      }
      case 'SubCategory' : {
        this.activate?.show();
        this.SelectedSubCategory.push(data.id);
        this.Selected_data = data;
        break;
      }
    }
    console.log(event);
    console.log(event.currentTarget.checked);
  }

  CloseActivate(){
    this.activate?.hide();
    this.SelectedItems = [];
    this.SelectedCategory = [];
    this.SelectedSubCategory = [];
    this.SelectedVendor = [];
    const checkboxes = document.querySelectorAll<HTMLInputElement>('.form-check-input');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  ActivateAll(){
    console.log('SelectedItems',this.SelectedItems);
    console.log('SelectedSubCategory',this.SelectedSubCategory);
    console.log('SelectedCategory',this.SelectedCategory);
    console.log('SelectedVendor',this.SelectedVendor);

    this.allService.ActivateAllItems(this.SelectedItems,this.SelectedCategory,this.SelectedSubCategory,this.SelectedVendor,this.SelectedProcedure).subscribe({
      next:((res:any)=>{
        if (res.status == 'Success') {
          this.toastr.success(`${res.message}`, 'Successful', {
            positionClass: 'toast-top-center',
            timeOut: 2000,
          });
          this.activate.hide();
          this.ngOnInit();
        }
      }),
      error:((res:any)=>{
        this.toastr.error(`Something went wrong`, 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
        this.activate?.hide();
      })
    });
    this.SelectedItems = [];
    this.SelectedCategory = [];
    this.SelectedSubCategory = [];
    this.SelectedVendor = [];
  }
  GoBackToAllItems() {
    this.GoBackToAllItemsEvent_trash.next('all');
  }
}
