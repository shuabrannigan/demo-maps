import { createAction, props } from '@ngrx/store';
import { FeatureCollection } from '@turf/turf';

export const setCurrentFeatureCollection = createAction(
  '[Geo Feature] Set FeatureCollection',
  props<{ featureCollection: FeatureCollection }>()
);
