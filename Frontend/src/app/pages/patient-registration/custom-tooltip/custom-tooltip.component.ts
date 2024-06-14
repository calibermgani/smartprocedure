import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';
import { AllServicesService } from 'src/app/core/services/all-services.service';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.scss']
})
export class CustomTooltipComponent implements ITooltipAngularComp {

  constructor(private allService: AllServicesService){}

  public params: any = [];
  public age: number;
  agInit(params: ITooltipParams<any, any, any>): void {
    this.params = params.data;
    this.age = this.allService.calculateAge(this.params.dob);
  }



}
