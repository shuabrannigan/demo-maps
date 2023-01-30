import { createFeature, createReducer, on } from '@ngrx/store';
import { Feature, featureCollection, FeatureCollection, LineString } from '@turf/turf';
import * as geoActions from './geo.actions';

export interface GeoFeatureState {
  featureCollection: FeatureCollection;
  gpsTrack: Feature<LineString> | null
  rows: FeatureCollection
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
  gpsTrack: null,
  rows: featureCollection([])
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
    ),
    on(geoActions.setGpsLineString, (state, {feature}) => ({...state, gpsTrack: feature}) ),
    on(geoActions.setRowFeatureCollection, (state, {fc}) => ({...state, rows: fc}) ),

  ),
});
