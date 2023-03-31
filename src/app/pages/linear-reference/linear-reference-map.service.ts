import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { fromGeoFeatureCollectionFeature } from "@store/geo-features/geo.selectors";
import { BehaviorSubject, Observable, combineLatest, switchMap } from "rxjs";
import { AbstractBaseMapService } from "src/app/shared/components/basemap/abstract-basemap";
import { MapboxLayersService } from "src/app/shared/services/map-layers.service";
import { MapboxLayer } from "src/app/types/mapbox.interface";

@Injectable()
export class LinearReferenceMapService extends AbstractBaseMapService {
    constructor(store: Store, private mapboxLayerService: MapboxLayersService) {
        super(store)
    }

    public readonly show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public show$: Observable<boolean> = this.show.asObservable();
    
    public readonly random: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public random$: Observable<boolean> = this.random.asObservable();
    
    override bounds$(): Observable<any> {
        return this.store.select(
            fromGeoFeatureCollectionFeature.selectGpsTrackAsBbox
          );
    }
    override sources$(): Observable<any> {
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
    override layers(): MapboxLayer[] {
        return [
            ...this.mapboxLayerService.baseLayers,
            {
              id: 'geo-feature-polygon',
              type: 'line',
              source: 'geo-features',
              layout: this.mapboxLayerService.style.polygon.layout,
              paint: this.mapboxLayerService.style.polygon.paint,
              filter: ['all', ['==', '$type', 'Polygon']],
            },
          ];
    }

    showPath() {
      this.show.next(!this.show.value)
    }
  
    useRandom() {
      this.random.next(!this.random.value)
    }

}
