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
interface MapConfig {
  scaleRatio: number;
  centerShiftX: number;
  centerShiftY: number;
}
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
  private mapConfig: Nullable<MapConfig>;
  private fogGroup = new Konva.Group({});
  private cutGroup = new Konva.Group({});
  private newPolygonGroup = new Konva.Group({});

  private newPolygon: Nullable<Konva.Line>;

  protected isGrabSelected$ = this.store.select(selectIsGrabSelected);
  protected isMoveSelected$ = this.store.select(selectIsMoveSelected);

  constructor(private readonly store: Store) {}

  public ngAfterViewInit(): void {
    this.layer.add(this.fogGroup, this.cutGroup, this.newPolygonGroup);
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
        //this.cutTheFog();
      });
    }
  }

  private scaleImage(img: HTMLImageElement): Konva.Image {
    const container = this.container?.nativeElement;
    const hRatio = container.offsetWidth / img.width;
    const vRatio = container.offsetHeight / img.height;
    const ratio = Math.min(hRatio, vRatio);
    this.mapConfig = {
      scaleRatio: Math.min(hRatio, vRatio),
      centerShiftX: (container.offsetWidth - img.width * ratio) / 2,
      centerShiftY: (container.offsetHeight - img.height * ratio) / 2,
    };

    return new Konva.Image({
      x: this.mapConfig.centerShiftX,
      y: this.mapConfig.centerShiftY,
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
    fogOfWar.on('pointerdown', ({ evt }) => {
      if (!this.newPolygon) {
        this.startPolygonDrawing(evt);
      } else {
        const points = this.newPolygon.points();
        const lastXDif = Math.abs(evt.offsetX - points[0]);
        const lastYDif = Math.abs(evt.offsetY - points[1]);
        console.log(lastXDif, lastYDif);
        if (points.length >= 6 && lastXDif < 5 && lastYDif < 5) {
          this.createPolygon();
        } else {
          this.updatePolygonDrawing(evt);
        }
      }
    });
    fogOfWar.on('pointermove', (event) => {
      if (this.newPolygon) {
        this.updatePolygonPreview(event.evt);
      }
    });
    this.fogGroup.add(fogOfWar);
  }

  private startPolygonDrawing(event: PointerEvent) {
    console.log(event);
    this.newPolygon = new Konva.Line({
      points: [
        event.offsetX,
        event.offsetY,
        event.offsetX + 1,
        event.offsetY + 1,
      ],
      stroke: 'gray',
      closed: false,
    });
    this.newPolygonGroup.add(this.newPolygon);
  }

  private updatePolygonDrawing(event: PointerEvent) {
    console.log(event);
    if (this.newPolygon) {
      this.newPolygon.points([
        ...this.newPolygon.points(),
        event.offsetX,
        event.offsetY,
      ]);
    }
  }

  private updatePolygonPreview(event: PointerEvent) {
    if (this.newPolygon) {
      const points = this.newPolygon.points();
      this.newPolygon.points([
        ...points.splice(0, points.length - 2),
        event.offsetX,
        event.offsetY,
      ]);
    }
  }

  private createPolygon() {
    console.log('createPolygon');
    this.cutGroup.getChildren();
    this.newPolygonGroup.removeChildren();
    const points = this.newPolygon?.points() ?? [];
    const newPolygon = new Konva.Line({
      points: CoordinateGeometryUtils.convertToSortedPointsArray([
        ...(points.splice(0, points.length - 2) ?? []),
      ]),
      fillPatternImage: this.map?.getAttrs().image as HTMLImageElement,
      fillPatternScaleX: this.mapConfig?.scaleRatio,
      fillPatternScaleY: this.mapConfig?.scaleRatio,
      fillPatternX: this.mapConfig?.centerShiftX,
      fillPatternRepeat: 'no-repeat',
      stroke: 'gray',
      draggable: true,
      closed: true,
    });
    newPolygon.on('dragmove', ({ target }) => {
      const attrs = target.getAttrs();
      const newX = (this.mapConfig?.centerShiftX ?? 0) - (attrs.x ?? 0);
      const newY = (this.mapConfig?.centerShiftY ?? 0) - (attrs.y ?? 0);
      newPolygon.fillPatternX(newX);
      newPolygon.fillPatternY(newY);
    });
    this.newPolygon = undefined;
    this.cutGroup.add(newPolygon);
  }
}
