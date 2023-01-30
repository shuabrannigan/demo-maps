import { createSelector } from '@ngrx/store';
import { geoFeatureCollectionFeature } from './geo.reducer';
import {
  bbox,
  Feature,
  featureCollection,
  LineString,
  point,
  Point,
  Position,
} from '@turf/turf';
import { createLinearReferenceData } from 'src/app/shared/misc/linear-ref-tools';
import { createBboxFromFeatureCollection, generateXPointsWithinBbox, snapPointsToNearestRow } from 'src/app/shared/misc/row-snapping';

const { selectFeatureCollection, selectGpsTrack, selectRows } =
  geoFeatureCollectionFeature;

const selectFeatureCollectionAsJson = createSelector(
  selectFeatureCollection,
  (fc) => JSON.stringify(fc)
);

const selectMapBoundsFromFeatureCollection = createSelector(
  selectFeatureCollection,
  (fc) => bbox(fc)
);

const selectGpsTrackAsFeatureCollection = createSelector(
  selectGpsTrack,
  (feature) => (feature ? featureCollection([feature]) : featureCollection([]))
);

const selectGpsTrackAsPointFeatureCollection = createSelector(
  selectGpsTrackAsFeatureCollection,
  (fc) =>
    !fc.features.length
      ? featureCollection([])
      : featureCollection(
          lineStringToPoints(fc.features[0] as Feature<LineString>)
        )
);

const selectGpsTrackAsBbox = createSelector(selectGpsTrackAsFeatureCollection, (fc) => bbox(fc) )

const selectAllGeoFeatures = createSelector(
  [selectGpsTrackAsPointFeatureCollection, selectRows],
  (track, rows) => {
    let snappedPoints = snapPointsToNearestRow(track, rows, 2.5);
    return featureCollection([ ...rows.features,...snappedPoints]);
  }
);

const selectAllGeoFeaturesUsingLinearTool = (show: boolean, random: boolean) => createSelector(
  [selectGpsTrackAsPointFeatureCollection, selectRows], (gps, rows) => {
     let rowBbox = createBboxFromFeatureCollection(rows)
     let randomPoints = generateXPointsWithinBbox(rowBbox, 3000)
     let snappedPoints = snapPointsToNearestRow(random ? randomPoints : gps, rows, 2.5)
     let linearReferenceData = createLinearReferenceData(snappedPoints,[1,2,3],[3,10,30],'ripeness',show)
    return featureCollection([...rows.features, ...linearReferenceData, ])
  }
)

export const fromGeoFeatureCollectionFeature = {
  selectFeatureCollection,
  selectFeatureCollectionAsJson,
  selectMapBoundsFromFeatureCollection,
  selectGpsTrackAsFeatureCollection,
  selectGpsTrackAsBbox,
  selectAllGeoFeatures,
  selectGpsTrackAsPointFeatureCollection,
  selectAllGeoFeaturesUsingLinearTool
};

function lineStringToPoints(lineString: Feature<LineString>): Feature<Point>[] {
  let points: Feature<Point>[] = lineString.geometry.coordinates.map(
    (position: Position) => {
      return point(position, { color: '#f2f' });
    }
  );
  return points;
}


