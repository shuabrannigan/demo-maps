import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { MapboxLayersService } from "src/app/shared/services/map-layers.service";
import {fromGeoFeatureCollectionFeature} from '@store/geo-features/geo.selectors'

@Injectable()
export class LinearReferenceService extends MapboxLayersService {
  constructor(private store: Store) {
    super();
  }
  mockLegend: any[] = [
    { color: '#D2222D', title: 'Not Ready' },
    { color: '#FFBF00', title: 'Almost Ready' },
    { color: '#238823', title: 'Ready' },
  ].reverse();

  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  show$: Observable<boolean> = this.show.asObservable();

  random: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  random$: Observable<boolean> = this.random.asObservable();

  selectFeatureCollection$(): Observable<any> {
    return combineLatest([this.show$, this.random$], (show, random) => ({
      show,
      random,
    })).pipe(
      switchMap(({ show, random }) =>
        this.store.select(
          fromGeoFeatureCollectionFeature.selectAllGeoFeaturesUsingLinearTool(
            show,
            random
          )
        )
      )
    );
  }

  selectFeatureBbox$(): Observable<any> {
    return this.store.select(
      fromGeoFeatureCollectionFeature.selectGpsTrackAsBbox
    );
  }

  selectLegend$(): Observable<any[]> {
    return of([...this.mockLegend]);
  }
}