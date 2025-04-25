import { inject, Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular/standalone';
import { DialogResult } from '@models/dialog-result';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private readonly modalController = inject(ModalController);

  /** modal.onWillDismiss can be chained in order to get the result of the dialog */
  async openModal<R>(options: ModalOptions): Promise<DialogResult<R>> {
    const modal = await this.modalController.create({
      ...options,
    });
    modal.present();

    const { data } = await modal.onWillDismiss<R>();

    return { ...(data && { result: data }) };
  }
}
