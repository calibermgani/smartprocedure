import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent {

  @Output() GoBackToAllItemsEvent_trash = new EventEmitter();

  GoBackToAllItems(){
    this.GoBackToAllItemsEvent_trash.next('all');
  }
}
