import { Observable } from "rxjs"
import { MapboxLayer } from "src/app/types/mapbox.interface"
import { IBaseMap } from "./basemap.interface"
import { Map } from "mapbox-gl"
import { Store } from "@ngrx/store"
import { fromGeoFeatureCollectionFeature } from "@store/geo-features/geo.selectors"

export abstract class AbstractBaseMapService {
    constructor(public store: Store) {}
    bounds$(): Observable<any> {
        return this.store.select(fromGeoFeatureCollectionFeature.selectMapBoundsFromFeatureCollection)
    }
    sources$(): Observable<any> {
        return this.store.select(fromGeoFeatureCollectionFeature.selectFeatureCollection)
    }
    
    abstract layers(): MapboxLayer[]
}

export abstract class AbstractBaseMapComponent implements IBaseMap {
    map: Map | undefined
    bounds$: Observable<any> = this.basemapService.bounds$()
    sources$: Observable<any> = this.basemapService.sources$()
    layers: MapboxLayer[] = this.basemapService.layers()
    constructor(private basemapService: AbstractBaseMapService) {}

    mapLoaded(event: any) {
        this.map = event as Map
        this.map.resize()
    }

}