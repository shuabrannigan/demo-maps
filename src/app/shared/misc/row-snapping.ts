import { FeatureCollection, Feature, Point, pointToLineDistance, LineString, nearestPointOnLine, BBox, bbox, featureCollection, randomPoint, bboxPolygon, pointsWithinPolygon } from "@turf/turf";

/**
 * 
 * @param points  @type { FeatureCollection<Feature<Point>>}
 * @param rows @type { FeatureCollection<Feature<LineString>>}
 * @param radius @type { number }
 * @returns 
 */
export function snapPointsToNearestRow(points: FeatureCollection<any>, rows: FeatureCollection<any>, radius: number): Feature<Point>[] {
    let snappedPoints = points.features.map((point: Feature<Point>) => {
        let minDistance = Infinity
        let closestLine: Feature<LineString> | undefined

        rows.features.forEach((row: Feature<LineString>) => {
            const distance = pointToLineDistance(point,row,{units: 'meters'})
            if (distance < minDistance && distance <= radius) {
                minDistance = distance
                closestLine = row
            }
        })
        if (closestLine) {
            let newPoint = nearestPointOnLine(closestLine.geometry, point)
            newPoint.properties = {...newPoint.properties, color: '#f99', rowid: closestLine.id}
            return newPoint
        } else {
            return point
        }
    })
    return snappedPoints
}

export function createBboxFromFeatureCollection(fc: FeatureCollection<any>): BBox {
    return bbox(fc)
}

export function generateXPointsWithinBbox(bbox: any, number_of_points: any) {
    let polygon = bboxPolygon(bbox)
    let points = randomPoint(number_of_points, {bbox: bbox})
    let within = pointsWithinPolygon(points,polygon)
    return within
}