import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.scss']
})
export class LabsComponent {
  @ViewChild('addstaff', { static: false }) addstaff?: ModalDirective;


  OpenModal(modalName: string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
  }

  CloseModal(modalName: string){
    if(modalName === 'addstaff') this.addstaff?.hide();
  }

}
