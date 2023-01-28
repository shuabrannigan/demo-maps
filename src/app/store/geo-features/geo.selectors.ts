import { createSelector } from '@ngrx/store';
import { geoFeatureCollectionFeature } from './geo.reducer';
import { bbox, featureCollection, } from '@turf/turf'

const {selectFeatureCollection, selectGpsTrack, selectRows } = geoFeatureCollectionFeature

const selectFeatureCollectionAsJson = createSelector(selectFeatureCollection, (fc) => JSON.stringify(fc))

const selectMapBoundsFromFeatureCollection = createSelector(selectFeatureCollection, (fc) => bbox(fc) )

const selectGpsTrackAsFeatureCollection = createSelector(selectGpsTrack, (feature) => feature ? featureCollection([feature]) : featureCollection([]))

const selectAllGeoFeatures = createSelector([selectGpsTrackAsFeatureCollection, selectRows], (track, rows) => {
  return featureCollection([...track.features, ...rows.features])
})

const selectGpsTrackAsBbox = createSelector(selectGpsTrackAsFeatureCollection, (fc) => bbox(fc) )


export const fromGeoFeatureCollectionFeature = {
  selectFeatureCollection,
  selectFeatureCollectionAsJson,
  selectMapBoundsFromFeatureCollection,
  selectGpsTrackAsFeatureCollection,
  selectGpsTrackAsBbox,
  selectAllGeoFeatures
}