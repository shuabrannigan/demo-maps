import { Feature, LineString, lineString, Point } from '@turf/turf';

/**
 * 
 * @param points @type { Feature<Point>[]}
 * @param item_values @type { number[] }
 * @param weights @type { number[] }
 * @param property_to_check @type { string }
 * @param show_not_snapped @type { boolean }
 * @returns @type { Feature<Point | LineString>[] }
 */
export function createLinearReferenceData(points: Feature<Point>[], item_values: number[], weights: number[], property_to_check: string, show_not_snapped: boolean): Feature<Point | LineString>[] {
  let grouped = groupedPoints(points,item_values,weights,property_to_check)
  let notSnapped = show_not_snapped ? points.filter((p: any) => !p.properties?.['rowid']) : []
  return [...createLinearSegments(grouped,property_to_check), ...notSnapped]
}

/**
 *
 * @param points - array of features which have a @property { rowid }
 * @param item_values @type { number[] }
 * @param weights @type { number[] }
 * @param property_to_check @type { string }
 * @returns @type { Feature<Point>[] }
 */
function groupedPoints(
  points: Feature<Point>[],
  item_values: number[],
  weights: number[],
  property_to_check: string
): { [key: string]: any[] } {
  let hasRow = points.filter((p) => p.properties?.['rowid']);
  let grouped_by_rowid = hasRow.reduce(
    (acc: any, curr: Feature<Point>) => ({
      ...acc,
      [curr.properties?.['rowid']]: [
        ...(acc[curr.properties?.['rowid']] || []),
        {
          ...curr,
          properties: {
            ...curr.properties,
            [property_to_check]: curr.properties?.[property_to_check]
              ? curr.properties?.[property_to_check]
              : weightedRandom(item_values, weights),
          },
        },
      ],
    }),
    {}
  );
  return grouped_by_rowid
}

function createLinearSegments(grouped: {[key: string]: any[]}, property_to_check: string): Feature<Point | LineString>[] {
  let segmentArray = Object.values(grouped) as [Feature<Point>[]]
  let mapped = segmentArray.map((pts: Feature<Point>[]) => {
    let segs = resegment(pts, property_to_check)
    let features = convertToLineString(segs, property_to_check)
    return features.flat()
  }) as Feature<any>[][]
  return mapped.flat()
}

function resegment(pts: Feature<Point>[], property_to_check: string) {
  let segs: [Feature<Point>[]] = [[]]
  let section: number = 0
  let index: number = 0
  pts.forEach((pt: Feature<Point>) => {
    if (segs[section][index - 1]) {
      let previous = segs[section][index - 1]
      if (previous.properties?.[property_to_check] !== pt.properties?.[property_to_check]) {
        segs[section][index] = pt
        section += 1
        index = 0
      }
      if (Array.isArray(segs[section])) {
        segs[section][index] = pt
      } else {
        segs[section] = [pt]
      }
      index += 1
    } else {
      segs[section][index] = pt
      index += 1
    }
  })
  return segs
}

function convertToLineString(segments: [Feature<Point>[]], property_to_check: string ) {
  return segments.map(seg => {
    if (seg.length === 0) return
    let seg_props = seg[0].properties
    let checked_prop = seg_props?.[property_to_check]
    if (seg.length === 1) {
      seg[0] = {...seg[0], properties: {...seg[0].properties, color: `${checked_prop === 1 ? '#D2222D' : checked_prop === 2 ? '#FFBF00' : '#238823'}` }}
      return seg
    } else {
      let coords = seg.map((pt: Feature<Point>) => {
        return [pt.geometry.coordinates]
      }).flat()
      let ls = lineString(coords) as any
      ls.properties = {...seg_props, color: `${checked_prop === 1 ? '#D2222D' : checked_prop === 2 ? '#FFBF00' : '#238823'}`}
      return ls
    }
  })
}

function weightedRandom(items: number[], weights: number[]) {
  let weightedPool = items
    .map((item, i) => {
      return [...Array(weights[i]).fill(item)];
    })
    .flat();
  return weightedPool[Math.floor(Math.random() * weightedPool.length)];
}
