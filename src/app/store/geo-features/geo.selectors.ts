import { createSelector } from '@ngrx/store';
import { geoFeatureCollectionFeature } from './geo.reducer';
import { bbox } from '@turf/turf'

const {selectFeatureCollection } = geoFeatureCollectionFeature

const selectFeatureCollectionAsJson = createSelector(selectFeatureCollection, (fc) => JSON.stringify(fc))

const selectMapBoundsFromFeatureCollection = createSelector(selectFeatureCollection, (fc) => bbox(fc) )


export const fromGeoFeatureCollectionFeature = {
  selectFeatureCollection,
  selectFeatureCollectionAsJson,
  selectMapBoundsFromFeatureCollection
}