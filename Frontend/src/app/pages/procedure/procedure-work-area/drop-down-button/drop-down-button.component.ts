import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone:true,
  selector: 'app-drop-down-button',
  templateUrl: './drop-down-button.component.html',
  styleUrls: ['./drop-down-button.component.scss'],
  imports:[FormsModule]
})
export class DropDownButtonComponent {

  SelectedValue : any;
  agInit(params: ICellRendererParams): void {
    console.log(params);

    // this.displayValue = new Array(params.value!).fill('#').join('')
  }

}
