import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements ITooltipAngularComp {

  public params: any = [];
  public age: number;
  agInit(params: ITooltipParams<any, any, any>): void {
    this.params = params.data;
    this.age = this.calculateAge(this.params.dob);
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}
