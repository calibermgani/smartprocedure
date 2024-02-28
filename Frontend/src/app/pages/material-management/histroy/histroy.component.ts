import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-histroy',
  templateUrl: './histroy.component.html',
  styleUrls: ['./histroy.component.scss']
})
export class HistroyComponent {

  @Output() GoBackToAllItemsEvent_histroy = new EventEmitter();

  GoBackToAllItems(){
    this.GoBackToAllItemsEvent_histroy.next('all');
  }
}
