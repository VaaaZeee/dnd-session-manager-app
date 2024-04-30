import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Nullable } from '@models/nullable';
import { isStrictDefined } from '@utils/is-strict-defined';
import { Observable, concatMap, filter, fromEvent, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'dnd-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss'],
})
export class MapEditorComponent implements AfterViewInit {
  @ViewChild('playground') playgroundCanvas: Nullable<ElementRef>;
  @ViewChild('mapEditor') mapEditor: Nullable<ElementRef>;

  private context: Nullable<CanvasRenderingContext2D>;

  ngAfterViewInit(): void {
    const playgroundCanvasEl = this.mapEditor?.nativeElement;
    this.context = playgroundCanvasEl?.getContext('2d');
    if (playgroundCanvasEl && this.context) {
      this.drawImageScaled(playgroundCanvasEl);
      const mouseDown$: Observable<MouseEvent> = fromEvent(
        playgroundCanvasEl,
        'mousedown'
      );
      const mouseMove$: Observable<MouseEvent> = fromEvent(
        playgroundCanvasEl,
        'mousemove'
      );
      const mouseUp$: Observable<MouseEvent> = fromEvent(
        playgroundCanvasEl,
        'mouseup'
      );

      mouseDown$.pipe(
        concatMap(() => mouseMove$.pipe(tap(console.log), takeUntil(mouseUp$)))
      );

      const mouseDraw$ = mouseDown$.pipe(
        tap(console.log),
        filter(isStrictDefined),
        tap((e: MouseEvent) => {
          if (this.context) {
            this.context.moveTo(e.offsetX, e.offsetY);
          }
        }),
        concatMap(() => mouseMove$.pipe(takeUntil(mouseUp$)))
      );

      mouseDraw$.subscribe((e: MouseEvent) => this.draw(e.offsetX, e.offsetY));
    }
  }

  private draw(offsetX: number, offsetY: number) {
    if (this.context) {
      this.context.lineTo(offsetX, offsetY);
      this.context.stroke();
    }
  }

  private drawImageScaled(canvas: HTMLElement): void {
    const img = new Image();
    img.src = 'assets/images/test-map.jpg';
    img.addEventListener('load', () => {
      if (this.context) {
        const hRatio = canvas.offsetWidth / img.width;
        const vRatio = canvas.offsetHeight / img.height;
        const ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (canvas.offsetWidth - img.width * ratio) / 2;
        var centerShift_y = (canvas.offsetHeight - img.height * ratio) / 2;
        this.context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    });
  }
}
