import { Observable } from "rxjs"
import { MapboxLayer } from "src/app/types/mapbox.interface"
import { IBaseMap } from "./basemap.interface"
import { Map } from "mapbox-gl"
import { Store } from "@ngrx/store"
import { fromGeoFeatureCollectionFeature } from "@store/geo-features/geo.selectors"
import { Directive, Inject, Input } from '@angular/core';

export abstract class AbstractBaseMapService {
  constructor(public store: Store) {}
  abstract bounds$(): Observable<any>;
  abstract sources$(): Observable<any>;
  abstract layers(): MapboxLayer[];
}


@Directive()
export abstract class AbstractBaseMapComponent implements IBaseMap {
  map: Map | undefined;
  abstract bounds$: Observable<any> | undefined
  abstract sources$: Observable<any> | undefined
  abstract layers: MapboxLayer[] | undefined
  constructor() {}

  mapLoaded(event: any) {
    this.map = event as Map;
    this.map.resize();
  }
}