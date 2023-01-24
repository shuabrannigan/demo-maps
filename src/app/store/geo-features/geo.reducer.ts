import { createReducer, on } from '@ngrx/store';
import { featureCollection, FeatureCollection } from '@turf/turf';
import * as geoActions from './geo.actions';

export const geoFeatureFeatureKey = 'geo';

export interface GeoFeatureState {
  featureCollection: FeatureCollection;
}

export const initalGeoFeatureState: GeoFeatureState = {
  featureCollection: featureCollection([]),
};

export const geoFeatureReducer = createReducer(
  initalGeoFeatureState,
  on(
    geoActions.setCurrentFeatureCollection,
    (state, { featureCollection }) => ({
      ...state,
      featureCollection: featureCollection,
    })
  )
);
