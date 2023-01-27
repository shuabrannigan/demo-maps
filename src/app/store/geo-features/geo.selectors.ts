import { createFeatureSelector, createSelector } from '@ngrx/store';
import { geoFeatureCollectionFeature } from './geo.reducer';


const {selectFeatureCollection } = geoFeatureCollectionFeature

const selectFeatureCollectionAsJson = createSelector(selectFeatureCollection, (fc) => JSON.stringify(fc))


export const fromGeoFeatureCollectionFeature = {
  selectFeatureCollection,
  selectFeatureCollectionAsJson
}