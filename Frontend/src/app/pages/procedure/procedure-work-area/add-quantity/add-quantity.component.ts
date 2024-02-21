import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone:true,
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.component.html',
  styleUrls: ['./add-quantity.component.scss']
})
export class AddQuantityComponent {

  Qty_Value:number=0;
  constructor(){}

  agInit(params: ICellRendererParams): void {
    // this.displayValue = new Array(params.value!).fill('#').join('');
  }

  DecreaseQty(){
    if(this.Qty_Value>0){
      this.Qty_Value = this.Qty_Value - 1;
    }
  }

  IncreaseQty(){
    this.Qty_Value = this.Qty_Value + 1;
  }
}
