import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  releaseAppInitializerAction,
  startAppInitializerAction,
} from '@store/actions/initializer.actions';
import { first } from 'rxjs';

export function appInitializer(store: Store, actions$: Actions): () => void {
  return () => {
    store.dispatch(startAppInitializerAction());
    return actions$.pipe(ofType(releaseAppInitializerAction), first());
  };
}
