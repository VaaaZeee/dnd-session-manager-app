import { Nullable } from './nullable';
export interface User {
  uid: string;
  displayName: Nullable<string>;
}
