import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ThreadReducer } from '../home-page/thread-page/store/account.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  changeThread: ThreadReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
