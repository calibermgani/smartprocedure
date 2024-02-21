import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone:true,
  selector: 'app-drop-down-button',
  templateUrl: './drop-down-button.component.html',
  styleUrls: ['./drop-down-button.component.scss']
})
export class DropDownButtonComponent {

  agInit(params: ICellRendererParams): void {
    // this.displayValue = new Array(params.value!).fill('#').join('');
  }

}
