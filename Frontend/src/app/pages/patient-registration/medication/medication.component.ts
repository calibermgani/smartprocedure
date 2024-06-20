import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent {
  @ViewChild('addstaff', { static: false }) addstaff?: ModalDirective;


  OpenModal(modalName: string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
  }

  CloseModal(modalName: string){
    if(modalName === 'addstaff') this.addstaff?.hide();
  }

}
