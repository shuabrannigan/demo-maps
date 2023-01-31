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
import { FeatureCollection } from "@turf/turf";

interface LinearReferenceServiceModel {
  readonly mockLegend: any[]
  readonly show: BehaviorSubject<boolean>
  show$: Observable<boolean>
  readonly random: BehaviorSubject<boolean>
  random$: Observable<boolean>
  selectFeatureCollection$(): Observable<FeatureCollection>
  selectFeatureBbox$(): Observable<any>
  selectLegend$(): Observable<any[]>
  showPath(): void
  useRandom(): void
}

@Injectable()
export class LinearReferenceService  extends MapboxLayersService implements LinearReferenceServiceModel {
  constructor(private store: Store) {
    super();
  }
  public readonly mockLegend: any[] = [
    { color: '#D2222D', title: 'Not Ready' },
    { color: '#FFBF00', title: 'Almost Ready' },
    { color: '#238823', title: 'Ready' },
  ].reverse();

  public readonly show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public show$: Observable<boolean> = this.show.asObservable();

  public readonly random: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public random$: Observable<boolean> = this.random.asObservable();

  selectFeatureCollection$(): Observable<FeatureCollection> {
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

  showPath() {
    this.show.next(!this.show.value)
  }

  useRandom() {
    this.random.next(!this.random.value)
  }
}