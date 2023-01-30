import { createAction, props } from '@ngrx/store';
import { Feature, FeatureCollection, LineString } from '@turf/turf';

export const setCurrentFeatureCollection = createAction(
  '[Geo Feature] Set FeatureCollection',
  props<{ featureCollection: FeatureCollection }>()
);

export const setGpsLineString = createAction('[Geo Feature] set GpsLineString', props<{ feature: Feature<LineString> }>())

export const setRowFeatureCollection = createAction('[Geo Features] set Rows', props<{ fc: FeatureCollection }>())
