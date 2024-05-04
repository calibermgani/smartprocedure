import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  standalone:true,
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.scss']
})
export class AddQuantityComponent {

  Qty_Value: number = 0;
  TotalQytValue : number;
  constructor(private toastr : ToastrService,private authService : AuthfakeauthenticationService){}

  agInit(params: ICellRendererParams): void {
    // this.displayValue = new Array(params.value!).fill('#').join('');
    console.log(params);
    this.TotalQytValue = params.data.total_no_of_qty;
  }

  DecreaseQty(){
    if(this.Qty_Value>0){
      this.Qty_Value = this.Qty_Value - 1;
      localStorage.setItem('Quantity',this.Qty_Value.toString());
    }
  }

  IncreaseQty(){
    if(this.Qty_Value < this.TotalQytValue){
      this.Qty_Value = this.Qty_Value + 1;
      localStorage.setItem('Quantity',this.Qty_Value.toString());
    }
    else{
      this.toastr.warning('You cannot add a quantity that exceeds the total available quantity.','Note',{
        positionClass: 'toast-top-center',
        timeOut:2000,
      });
    }
  }

  refresh(params: ICellRendererParams) {
    console.log(params);
  }
}
