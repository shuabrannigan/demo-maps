import { createReducer, on } from '@ngrx/store';
import * as appActions from './app.actions';

export const appFeatureKey = 'app';

export interface AppState {
  appLoaded: boolean;
}

export const initalAppState: AppState = {
  appLoaded: false,
};

export const appReducer = createReducer(
  initalAppState,
  on(appActions.appLoaded, (state) => ({ ...state, appLoaded: true }))
);
