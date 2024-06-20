import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-care-team',
  templateUrl: './care-team.component.html',
  styleUrls: ['./care-team.component.scss']
})
export class CareTeamComponent {
  @ViewChild('addstaff', { static: false }) addstaff?: ModalDirective;


  OpenModal(modalName: string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
  }

  CloseModal(modalName: string){
    if(modalName === 'addstaff') this.addstaff?.hide();
  }
}
