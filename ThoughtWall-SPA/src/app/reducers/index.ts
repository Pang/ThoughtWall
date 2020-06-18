import {
  ActionReducerMap,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { ThreadReducer } from '../home-page/thread-page/store/thread.reducer';
import { environment } from '../../environments/environment';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  currentThread: ThreadReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
