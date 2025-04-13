import { User as FirebaseUser } from '@angular/fire/auth';
import { User } from '@models/user';

export class UserUtil {
  public static mapFirebaseUser(user: FirebaseUser): User {
    const { uid, displayName } = user;
    return { uid, displayName };
  }
}
