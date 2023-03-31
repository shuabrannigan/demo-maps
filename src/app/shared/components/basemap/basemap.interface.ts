import { Map } from "mapbox-gl";
import { Observable } from "rxjs";
import { MapboxLayer } from "src/app/types/mapbox.interface";

export interface IBaseMap {
    map: Map | undefined
    bounds$: Observable<any>
    sources$: Observable<any>
    layers: MapboxLayer[]
    
    mapLoaded(event: Map): void
}



