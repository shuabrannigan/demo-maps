import { createSelector } from '@ngrx/store';
import { geoFeatureCollectionFeature } from './geo.reducer';
import { bbox, featureCollection } from '@turf/turf'

const {selectFeatureCollection, selectGpsTrack } = geoFeatureCollectionFeature

const selectFeatureCollectionAsJson = createSelector(selectFeatureCollection, (fc) => JSON.stringify(fc))

const selectMapBoundsFromFeatureCollection = createSelector(selectFeatureCollection, (fc) => bbox(fc) )

const selectGpsTrackAsFeatureCollection = createSelector(selectGpsTrack, (feature) => feature ? featureCollection([feature]) : featureCollection([]))


export const fromGeoFeatureCollectionFeature = {
  selectFeatureCollection,
  selectFeatureCollectionAsJson,
  selectMapBoundsFromFeatureCollection,
  selectGpsTrackAsFeatureCollection
}