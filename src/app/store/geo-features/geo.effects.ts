import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as geoActions from './geo.actions';
import * as appActions from '@store/app-store/app.actions';
import { switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { distance, FeatureCollection, featureCollection, lineString, point } from '@turf/turf';
import { GPSCapture } from 'src/app/types/gps.interface';

@Injectable()
export class GeoFeatureEffects {
  loadMockGpsLine$ = createEffect(() =>
    this.actions.pipe(
      ofType(appActions.appLoaded),
      switchMap(() =>
        this.http.get('./assets/mock-geo-data/madgetts_block_gps.json')
      ),
      switchMap(async (data) => {
        const captures = data as GPSCapture[];
        const line = filterJumpedCoordinates(captures, 5, true)
        return geoActions.setGpsLineString({feature: line})
      })
    )
  );

  loadRows$ = createEffect(() => 
  this.actions.pipe(
    ofType(appActions.appLoaded),
    switchMap(() => this.http.get('./assets/mock-geo-data/madgetts_block_rows.json')),
    switchMap(async (data) => {
      let featureCollection = data as FeatureCollection
      debugger
      return geoActions.setRowFeatureCollection({fc: featureCollection})
    })
  ))

  constructor(private actions: Actions, private http: HttpClient) {}
}



/**
 * 
 * @param coordinates 
 * @param threshold 
 * @param enable 
 * @returns linestring of filtered coordinates
 */
function filterJumpedCoordinates(coordinates: GPSCapture[], threshold: number, enable: boolean) {
  var captureCoords = coordinates.map((capture) => ([capture.coords.longitude, capture.coords.latitude]))
  var filteredCoords = [captureCoords[0]]
  captureCoords.forEach((coord, i, arr) => {
    if (i === 0) return
    var currentPoint = point(coord)
    var previous = point(arr[i - 1])
    var dist  = distance(currentPoint,previous, {units: 'meters'})
    if (dist <= threshold) {
      filteredCoords.push(coord)
    }
  })
  return lineString(enable ? filteredCoords : captureCoords)
  
}