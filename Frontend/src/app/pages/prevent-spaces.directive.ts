import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventSpaces]'
})
export class PreventSpacesDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const newValue = value.replace(/\s/g, ''); // Remove spaces
    if (newValue !== value) {
      (event.target as HTMLInputElement).value = newValue;
      (event.target as HTMLInputElement).dispatchEvent(new Event('input')); // Emit input event to ensure Angular binds the updated value
    }
  }
}
