import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Group } from '@models/group';
import { User } from '@models/user';
import { collection, getDocs, or, Query, query, where } from 'firebase/firestore';
import { CreateGroupComponent } from '../components/create-group/create-group.component';
import { DialogService } from './../../../../../core/services/dialog.service';

export interface TestData {
  test: string;
}

@Injectable({
  providedIn: 'root',
})
export class GroupManagerService {
  constructor(
    private readonly firestore: Firestore,
    private readonly dialogService: DialogService
  ) {}

  public async getGroups(currentUser: User): Promise<Group[]> {
    return (await getDocs(this.isPartOfGroupQuery(currentUser.uid))).docs.map(group => group.data() as Group);
  }

  public async openCreateGroupDialog(): Promise<any> {
    return this.dialogService.openModal<Group>({ component: CreateGroupComponent, componentProps: { title: 'FUQ' } });
  }

  private isPartOfGroupQuery(userUid: string): Query {
    return query(collection(this.firestore, 'groups'), or(where('owner', '==', userUid), where('userIds', 'array-contains', userUid)));
  }
}
