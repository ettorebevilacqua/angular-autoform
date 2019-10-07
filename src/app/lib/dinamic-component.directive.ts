
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class DinamicComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}