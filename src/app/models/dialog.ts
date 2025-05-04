import { inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

export abstract class Dialog {
  public title: string = '';
  protected readonly modalController = inject(ModalController);

  public cancel() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public close(result: any) {
    return this.modalController.dismiss(result, 'close');
  }

  public confirm(result: any) {
    return this.modalController.dismiss(result, 'confirm');
  }
}
