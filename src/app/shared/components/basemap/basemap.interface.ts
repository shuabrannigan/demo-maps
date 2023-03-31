import { Map } from "mapbox-gl";
import { Observable } from "rxjs";
import { MapboxLayer } from "src/app/types/mapbox.interface";

export interface IBaseMap {
    map: Map | undefined
    bounds$: Observable<any> | undefined
    sources$: Observable<any> | undefined
    layers: MapboxLayer[] | undefined
    
    mapLoaded(event: Map): void
}



