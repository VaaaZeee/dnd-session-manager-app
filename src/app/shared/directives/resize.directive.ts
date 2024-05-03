import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[dndResize]',
})
export class ResizeDirective implements AfterViewInit, OnDestroy {
  @Output() public dndResize = new EventEmitter<number>();

  private resizeObserver: ResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === this.el.nativeElement) {
        this.dndResize.emit(this.el.nativeElement.offsetWidth);
      }
    }
  });

  constructor(private readonly el: ElementRef) {}

  public ngAfterViewInit(): void {
    this.resizeObserver.observe(this.el.nativeElement);
  }

  public ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }
}
