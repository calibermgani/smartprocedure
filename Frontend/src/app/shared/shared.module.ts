import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';

import { WidgetModule } from './widget/widget.module';
import { PreventSpacesDirective } from '../pages/prevent-spaces.directive';

@NgModule({
  declarations: [
    PreventSpacesDirective
  ],
  imports: [
    CommonModule,
    UIModule,
    WidgetModule
  ],
  exports:[
    PreventSpacesDirective
  ]
})

export class SharedModule { }
