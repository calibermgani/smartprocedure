import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhiteboardRoutingModule } from './whiteboard-routing.module';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';


@NgModule({
  declarations: [
    WhiteboardComponent
  ],
  imports: [
    CommonModule,
    WhiteboardRoutingModule
  ]
})
export class WhiteboardModule { }
