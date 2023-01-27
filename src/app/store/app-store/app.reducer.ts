import { createFeature, createReducer, on } from '@ngrx/store';
import * as appActions from './app.actions';

export interface AppState {
  appLoaded: boolean;
}

export const initalAppState: AppState = {
  appLoaded: false,
};

export const appFeature = createFeature({
  name: 'app',
  reducer: createReducer(
    initalAppState,
    on(appActions.appLoaded, (state) => ({ ...state, appLoaded: true }))
  )
})
