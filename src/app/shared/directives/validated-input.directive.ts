import { Directive, Input, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validatedInput]'
})
export class ValidatedInputDirective implements AfterViewChecked {
  @Input() validatedInput: boolean;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewChecked() {
    const arr: any = {
      name: this.elementRef.nativeElement.name,
      valid:  this.validatedInput
    };
    if (this.validatedInput == null) {
      return;
    }
    if (!this.validatedInput) {
      this.removeClassName('is-invalid');
      this.addClassName('is-valid');
    }
    // tslint:disable-next-line:one-line
    else {
      this.removeClassName('is-valid');
      this.addClassName('is-invalid');
    }
  }
  addClassName(className: string) {
    this.elementRef.nativeElement.classList.add(className);
  }
  removeClassName(className: string) {
    this.elementRef.nativeElement.classList.remove(className);
  }
}
