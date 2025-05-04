import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton } from '@ionic/angular/standalone';
import { Dialog } from '@models/dialog';
import { Store } from '@ngrx/store';
import { DialogFrameComponent } from '@shared/dialog-frame/dialog-frame.component';
import { FormInputComponent } from '@shared/form-input/form-input.component';
import { IconSelectorComponent } from '@shared/icon-selector/icon-selector.component';
import { addIcons } from 'ionicons';
import { peopleOutline } from 'ionicons/icons';

@Component({
  selector: 'dnd-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, IonButton, DialogFrameComponent, FormInputComponent, IconSelectorComponent],
})
export class CreateGroupComponent extends Dialog {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  protected createGroupForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(32)]],
    icon: ['', [Validators.required, Validators.maxLength(32)]],
  });

  constructor() {
    super();
    addIcons({ peopleOutline });
  }

  protected updateForm(formControlName: string, value: string): void {
    this.createGroupForm.patchValue({ [formControlName]: value });
  }

  protected async submitCreateGroupForm(): Promise<void> {
    if (this.createGroupForm.valid) {
      const name = this.createGroupForm.get('name')?.value;
      const icon = this.createGroupForm.get('icon')?.value;

      await this.close({ name, icon });
    }
  }

  protected closeDialog() {
    this.cancel();
  }
}
