import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Nullable } from '@models/nullable';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { Circle } from 'konva/lib/shapes/Circle';

const WIDTH = 3000;
const HEIGHT = 3000;
const NUMBER = 200;
const SCALE_BY = 1.1;
const TEST_IMG_SRC = 'assets/images/test-map.jpg';

@Component({
  selector: 'dnd-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss'],
})
export class MapEditorComponent implements AfterViewInit {
  @ViewChild('container') container: Nullable<ElementRef>;

  private stage: Nullable<Stage>;
  private layer: Nullable<Layer>;

  public ngAfterViewInit(): void {
    this.stage = this.createStage();
    this.layer = new Layer();
    this.stage.add(this.layer);

    this.loadImageOnLayer(this.layer);
    this.registerZoomOnWheelEvent();
  }

  private createStage(): Stage {
    const container = this.container?.nativeElement;
    return new Stage({
      container: 'playground',
      width: container.offsetWidth,
      height: container.offsetHeight,
      draggable: true,
    });
  }

  private loadImageOnLayer(layer: Nullable<Layer>): void {
    if (layer) {
      const img = new Image();
      img.src = TEST_IMG_SRC;
      img.addEventListener('load', () => {
        const image = this.scaleImage(img);
        layer.add(image);
      });
    }
  }

  private scaleImage(img: HTMLImageElement): Konva.Image {
    const container = this.container?.nativeElement;
    const hRatio = container.offsetWidth / img.width;
    const vRatio = container.offsetHeight / img.height;
    const ratio = Math.min(hRatio, vRatio);
    const centerShift_x = (container.offsetWidth - img.width * ratio) / 2;
    const centerShift_y = (container.offsetHeight - img.height * ratio) / 2;
    return new Konva.Image({
      x: centerShift_x,
      y: centerShift_y,
      image: img,
      width: img.width * ratio,
      height: img.height * ratio,
    });
  }

  private registerZoomOnWheelEvent(): void {
    if (this.stage) {
      this.stage.on('wheel', (e) => {
        if (this.stage) {
          e.evt.preventDefault();

          const oldScale = this.stage.scaleX();
          const pointer = this.stage.getPointerPosition();
          if (pointer) {
            const mousePointTo = {
              x: (pointer.x - this.stage.x()) / oldScale,
              y: (pointer.y - this.stage.y()) / oldScale,
            };

            let direction = e.evt.deltaY > 0 ? -1 : 1;

            // when we zoom on trackpad, e.evt.ctrlKey is true
            // in that case lets revert direction
            if (e.evt.ctrlKey) {
              direction = -direction;
            }

            const newScale =
              direction > 0 ? oldScale * SCALE_BY : oldScale / SCALE_BY;

            this.stage.scale({ x: newScale, y: newScale });

            const newPos = {
              x: pointer.x - mousePointTo.x * newScale,
              y: pointer.y - mousePointTo.y * newScale,
            };
            this.stage.position(newPos);
          }
        }
      });
    }
  }

  private fillTestData(layer: Layer): void {
    for (let i = 0; i < NUMBER; i++) {
      layer.add(this.generateNode());
    }
  }

  private generateNode(): Circle {
    return new Circle({
      x: WIDTH * Math.random(),
      y: HEIGHT * Math.random(),
      radius: 50,
      fill: 'red',
      stroke: 'black',
    });
  }
}
