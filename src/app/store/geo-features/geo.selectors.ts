import { createFeatureSelector, createSelector } from '@ngrx/store';
import { geoFeatureFeatureKey, GeoFeatureState } from './geo.reducer';

export const getGeoFeatureState =
  createFeatureSelector<GeoFeatureState>(geoFeatureFeatureKey);

export const currentFeatureCollection = () =>
  createSelector(getGeoFeatureState, (state) => state.featureCollection);
