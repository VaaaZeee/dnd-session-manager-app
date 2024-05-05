import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Nullable } from '@models/nullable';
import { Store } from '@ngrx/store';
import { CoordinateGeometryUtils } from '@utils/coordinate-geometry.utils';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { selectIsGrabSelected } from '../../store/selectors/right-toolbar.selector';
import { selectIsMoveSelected } from '../../store/selectors/top-toolbar.selector';

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
  private layer = new Layer();
  private map: Nullable<Konva.Image>;
  private fogGroup = new Konva.Group({});
  private cutGroup = new Konva.Group({});

  protected isGrabSelected$ = this.store.select(selectIsGrabSelected);
  protected isMoveSelected$ = this.store.select(selectIsMoveSelected);

  constructor(private readonly store: Store) {}

  public ngAfterViewInit(): void {
    this.layer.add(this.fogGroup, this.cutGroup);
    this.stage = this.createStage(this.layer);

    this.loadImageOnLayer(this.layer);
    this.registerZoomOnWheelEvent();
  }

  private createStage(layer: Layer): Stage {
    const container = this.container?.nativeElement;
    const stage = new Stage({
      container: 'playground',
      width: container.offsetWidth,
      height: container.offsetHeight,
      draggable: true,
    });
    stage.add(layer);
    return stage;
  }

  private loadImageOnLayer(layer: Nullable<Layer>): void {
    if (layer) {
      const img = new Image();
      img.src = TEST_IMG_SRC;
      img.addEventListener('load', () => {
        this.map = this.scaleImage(img);
        layer.add(this.map);
        this.map.moveToBottom();
        this.addFogOfWar(this.map);
        this.cutTheFog(this.map);
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

  private cutTheFog(map: Konva.Image) {
    const poly = new Konva.Line({
      points: CoordinateGeometryUtils.convertToSortedPointsArray([
        300, 600, 300, 200, 600, 200, 600, 600,
      ]),
      stroke: 'white',
      draggable: true,
      closed: true,
    });
    const poly2 = new Konva.Line({
      points: CoordinateGeometryUtils.convertToSortedPointsArray([
        500, 600, 500, 200, 700, 200, 700, 600,
      ]),
      stroke: 'white',
      draggable: true,
      closed: true,
    });
    this.cutGroup.add(poly);
    this.cutGroup.add(poly2);
    this.fogGroup.clipFunc(this.cutFogClipFunction(map));
  }

  private addFogOfWar(map: Konva.Image): void {
    const attrs = map.getAttrs();
    let fogOfWar = new Konva.Rect({
      x: attrs.x,
      y: attrs.y,
      width: attrs.width,
      height: attrs.height,
      fill: 'black',
      opacity: 0.6,
      name: 'fog-of-war',
    });

    this.fogGroup.add(fogOfWar);
  }

  private cutFogClipFunction(map: Konva.Image) {
    const polygons = this.cutGroup.getChildren();
    return function (ctx: any) {
      const attrs = map.getAttrs();
      ctx.beginPath();
      ctx.moveTo(attrs.x, attrs.y);
      ctx.lineTo(attrs.width! * 2, attrs.y);
      ctx.lineTo(attrs.width! * 2, attrs.height);
      ctx.lineTo(attrs.y, attrs.height);

      polygons.forEach((polygon) => {
        const cutAttrs = polygon.getAttrs();
        const x = cutAttrs.x ?? 0;
        const y = cutAttrs.y ?? 0;
        const points = cutAttrs['points'];

        ctx.moveTo(points[0] + x, points[1] + y);
        for (let i = 2; i <= points.length; i += 2) {
          ctx.lineTo(points[i - 2] + x, points[i - 1] + y);
        }
      });
    };
  }
}
