import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AllServicesService } from 'src/app/core/services/all-services.service';

@Component({
  selector: 'app-histroy',
  templateUrl: './histroy.component.html',
  styleUrls: ['./histroy.component.scss']
})
export class HistroyComponent  implements OnInit{

  @Output() GoBackToAllItemsEvent_histroy = new EventEmitter();
  ItemHistoryData : any = [];
  CategoryHistoryData : any = [];
  SubCategoryHistoryData : any = [];
  VendorHistoryData : any = [];
  historyVisibleCdtn : boolean = false;

  constructor(private http : HttpClient,private allService : AllServicesService,private toastr : ToastrService){}
  ngOnInit(): void {
    this.allService.GetAllHistroyItems().subscribe({
      next:(res:any)=>{
        if(res.status == 'Success'){
          this.ItemHistoryData = res.item_history.item;
          this.CategoryHistoryData = res.item_history.category;
          this.SubCategoryHistoryData = res.item_history.sub_category;
          this.VendorHistoryData = res.item_history.vendor;
          this.historyVisibleCdtn = true;
        }
      },
      error:(res:any)=>{
        this.toastr.error('Something went wrong', 'UnSuccessful', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
      }
    })
  }

  GoBackToAllItems(){
    this.GoBackToAllItemsEvent_histroy.next('all');
  }

  RestoreIndividualItems(){

  }
}
