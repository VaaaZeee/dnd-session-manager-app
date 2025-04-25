import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MediaQueryService } from '@core/services/media-query.service';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { tap } from 'rxjs';

@Component({
  selector: 'dnd-dialog-frame',
  templateUrl: './dialog-frame.component.html',
  styleUrls: ['./dialog-frame.component.scss'],
  imports: [IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonContent, NgTemplateOutlet, IonIcon, IonModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFrameComponent {
  @Input({ required: true }) public title: string = '';
  @Output() public cancelClicked = new EventEmitter();
  @Output() public confirmClicked = new EventEmitter();

  private readonly mediaQuery = inject(MediaQueryService);

  protected $isMobile = toSignal(this.mediaQuery.isMobile$.pipe(tap(console.log)));
}
