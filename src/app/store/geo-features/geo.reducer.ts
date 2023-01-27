import { createFeature, createReducer, on } from '@ngrx/store';
import { featureCollection, FeatureCollection } from '@turf/turf';
import * as geoActions from './geo.actions';

export interface GeoFeatureState {
  featureCollection: FeatureCollection;
}

export const initalGeoFeatureState: GeoFeatureState = {
  featureCollection: featureCollection([
    {
      type: 'Feature',
      properties: { capacity: '10', type: 'U-Rack', mount: 'Surface' },
      geometry: { type: 'Point', coordinates: [-71.073283, 42.4175] },
    },
    {
      type: 'Feature',
      properties: { type: 'traffic', color: '#ffa600' },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-71.073283, 42.4175],
          [-71.13283, 42.4175, 45.0485816],
          [-71.23283, 42.4175, 45.0486133],
          [-71.33283, 42.4175, 45.0486066],
          [-71.343283, 42.4175, 45.04859],
        ],
      },
    },
  ]),
};

export const geoFeatureCollectionFeature = createFeature({
  name: 'geo',
  reducer: createReducer(
    initalGeoFeatureState,
    on(
      geoActions.setCurrentFeatureCollection,
      (state, { featureCollection }) => ({
        ...state,
        featureCollection: featureCollection,
      })
    )
  ),
});