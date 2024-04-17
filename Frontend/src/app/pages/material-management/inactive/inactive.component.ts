import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.scss']
})
export class InactiveComponent  implements OnInit{

  @Output() GoBackToAllItemsEvent_trash = new EventEmitter();

  ngOnInit(): void {

  }

  GoBackToAllItems() {
    this.GoBackToAllItemsEvent_trash.next('all');
  }
}
