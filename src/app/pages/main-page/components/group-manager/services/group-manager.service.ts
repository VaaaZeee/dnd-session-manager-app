import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { DialogResult } from '@models/dialog-result';
import { Group } from '@models/group';
import { Nullable } from '@models/nullable';
import { User } from '@models/user';
import { collection, doc, getDocs, or, Query, query, setDoc, where } from 'firebase/firestore';
import { CreateGroupComponent } from '../components/create-group/create-group.component';
import { CreateGroupDialogResult } from '../models/create-group-dialog-result';
import { DialogService } from './../../../../../core/services/dialog.service';

export interface TestData {
  test: string;
}

@Injectable({
  providedIn: 'root',
})
export class GroupManagerService {
  private readonly groupsCollection = collection(this.firestore, 'groups');

  constructor(
    private readonly firestore: Firestore,
    private readonly dialogService: DialogService
  ) {}

  public async openCreateGroupDialog(): Promise<DialogResult<CreateGroupDialogResult>> {
    return this.dialogService.openModal<CreateGroupDialogResult>({
      component: CreateGroupComponent,
      componentProps: { title: 'Create Group' },
    });
  }

  public async getGroups(currentUser: User): Promise<Group[]> {
    return (await getDocs(this.isPartOfGroupQuery(currentUser.uid))).docs.map(group => group.data() as Group);
  }

  public async saveGroup(name: string, icon: string, owner: Nullable<string>): Promise<void> {
    if (!owner) {
      return;
    }

    const newGroupRef = doc(this.groupsCollection);
    await setDoc(newGroupRef, { name, icon, owner, id: newGroupRef.id });
  }

  private isPartOfGroupQuery(userUid: string): Query {
    return query(this.groupsCollection, or(where('owner', '==', userUid), where('userIds', 'array-contains', userUid)));
  }
}
