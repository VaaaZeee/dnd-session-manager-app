import { User } from '@models/user';
import { createFeatureSelector } from '@ngrx/store';

export const currentUser = createFeatureSelector<User>('user');
