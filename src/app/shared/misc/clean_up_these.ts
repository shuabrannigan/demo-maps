// these are experimental algos to match points to rows

import { FeatureCollection, Feature, Point, LineString, pointToLineDistance, nearestPointOnLine, distance, midpoint, feature } from "@turf/turf";

const WINDOW_SIZE = 8;
let previousPoints: any = [];
let radius: number = 2; // meters

function snapPointsToRows2(
    points: FeatureCollection,
    rows: FeatureCollection,
    radius: number
  ) {
    var snappedPoints = points.features.map((pt) => {
      let dists: { line: any; distance: number }[] = [];
      rows.features.forEach((row) => {
        const distance = pointToLineDistance(
          pt as Feature<Point>,
          row as Feature<LineString>,
          { units: 'meters' }
        );
        if (distance <= radius) {
          dists.push({ line: row, distance: distance });
        }
      });
      dists.sort((a, b) => a.distance - b.distance);
  
      if (dists.length >= 2) {
        let closestLine1 = dists[0].line.geometry;
        let closestLine2 = dists[1].line.geometry;
        let id1 = dists[0].line.id;
        let id2 = dists[0].line.id;
        let np1 = nearestPointOnLine(closestLine1 as any, pt as Feature<Point>);
        np1.properties = { ...np1.properties, color: '#fff', rowid: id1 };
        let np2 = nearestPointOnLine(closestLine2 as any, pt as Feature<Point>);
        np2.properties = { ...np2.properties, color: '#f00', rowid: id2 };
        // you can return an array of the two closest point or merge them
        return [np1, np2];
      } else if (dists.length === 1) {
        let id1 = dists[0].line.id;
        let closestLine1 = dists[0].line.geometry;
        let np1 = nearestPointOnLine(closestLine1 as any, pt as Feature<Point>);
        np1.properties = { ...np1.properties, color: '#f99', rowod: id1 };
        return np1;
      } else {
        return pt;
      }
    });
    return snappedPoints.flat();
  }

  function snapPathBetweenRows(
    path: Feature<Point>[],
    rows: Feature<LineString>[]
  ) {
    const snappedPath: Feature<Point>[] = [];
    path.forEach((point) => {
      let closestRow1: any = null;
      let closestRow2 = null;
      let closestPoint1: any = null;
      let closestPoint2: any = null;
      let closestDistance1 = Infinity;
      let closestDistance2 = Infinity;
      rows.forEach((row) => {
        const closestPointOnRow = nearestPointOnLine(row, point);
        const d = distance(point, closestPointOnRow, { units: 'meters' });
        if (d < closestDistance1) {
          closestDistance2 = closestDistance1;
          closestRow2 = closestRow1;
          closestPoint2 = closestPoint1;
          closestDistance1 = d;
          closestRow1 = row;
          closestPoint1 = closestPointOnRow.geometry.coordinates;
        } else if (d < closestDistance2) {
          closestDistance2 = d;
          closestRow2 = row;
          closestPoint2 = closestPointOnRow.geometry.coordinates;
        }
      });
      if (closestDistance1 <= radius) {
        const snappedPoint = midpoint(closestPoint1, closestPoint2);
        snappedPoint.properties = { ...snappedPoint.properties, color: '#f99' };
        snappedPath.push(snappedPoint);
      } else {
        snappedPath.push(point);
      }
    });
    return snappedPath;
  }

  function snapPathBetweenRows2(
    path: Feature<Point>[],
    rows: Feature<LineString>[]
  ) {
    const snappedPath: Feature<Point>[] = [];
    path.forEach((point) => {
      let closestRow1: any = null;
      let closestRow2 = null;
      let closestPoint1: any = null;
      let closestPoint2: any = null;
      let closestDistance1 = Infinity;
      let closestDistance2 = Infinity;
  
      rows.forEach((row) => {
        const closestPointOnRow = nearestPointOnLine(row, point);
        const d = distance(point, closestPointOnRow, { units: 'meters' });
        if (d < closestDistance1) {
          closestDistance2 = closestDistance1;
          closestRow2 = closestRow1;
          closestPoint2 = closestPoint1;
          closestDistance1 = d;
          closestRow1 = row;
          closestPoint1 = closestPointOnRow.geometry.coordinates;
        } else if (d < closestDistance2) {
          closestDistance2 = d;
          closestRow2 = row;
          closestPoint2 = closestPointOnRow.geometry.coordinates;
        }
      });
  
      if (closestDistance1 <= radius) {
        let snappedPoint = midpoint(closestPoint1, closestPoint2);
        if (previousPoints.length === WINDOW_SIZE) {
          previousPoints.shift();
        }
        previousPoints.push(snappedPoint);
        let weight = 1 / previousPoints.length;
        let weightedSum = previousPoints.reduce(
          (acc: any, curr: any) => {
            return [
              acc[0] + curr.geometry.coordinates[0] * weight,
              acc[1] + curr.geometry.coordinates[1] * weight,
            ];
          },
          [0, 0]
        );
        snappedPoint = feature({ type: 'Point', coordinates: weightedSum });
        snappedPoint.properties = { ...snappedPoint.properties, color: '#f99' };
        // snappedPath.push(point)
        snappedPath.push(snappedPoint);
      } else {
        snappedPath.push(point);
      }
    });
    return snappedPath;
  }

