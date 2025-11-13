import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutosizeDirective]'
})
export class AutosizeDirective implements AfterViewInit {
  private textarea: HTMLTextAreaElement;

  constructor(private el: ElementRef) {
    this.textarea = this.el.nativeElement;
  }

  ngAfterViewInit() {
    this.adjustHeight();
  }

  @HostListener('input')
  onInput() {
    this.adjustHeight();
  }

  private adjustHeight(): void {
    this.textarea.style.overflow = 'hidden'; // hide scrollbar
    this.textarea.style.height = 'auto'; // reset height
    this.textarea.style.height = this.textarea.scrollHeight + 'px'; // set to actual content height
  }
}
