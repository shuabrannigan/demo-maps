import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as geoActions from './geo.actions';
import * as appActions from '@store/app-store/app.actions';
import { switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { featureCollection, lineString } from '@turf/turf';
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
        const line = lineString(
          captures.map((capture) => {
            return [capture.coords.longitude, capture.coords.latitude];
          })
        );
        return geoActions.setGpsLineString({feature: line})
      })
    )
  );

  constructor(private actions: Actions, private http: HttpClient) {}
}
