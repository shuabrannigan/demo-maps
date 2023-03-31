import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { fromGeoFeatureCollectionFeature } from "@store/geo-features/geo.selectors";
import { Observable } from "rxjs";
import { AbstractBaseMapService } from "src/app/shared/components/basemap/abstract-basemap";
import { MapboxLayersService } from "src/app/shared/services/map-layers.service";
import { MapboxLayer } from "src/app/types/mapbox.interface";

@Injectable()
export class FeatureCollectionViewMapService extends AbstractBaseMapService {
    constructor(store: Store, private mapboxLayerService: MapboxLayersService) {
        super(store)
    }
    bounds$(): Observable<any> {
        return this.store.select(fromGeoFeatureCollectionFeature.selectMapBoundsFromFeatureCollection)
    }
    sources$(): Observable<any> {
       return this.store.select(fromGeoFeatureCollectionFeature.selectFeatureCollection)
    }
    layers(): MapboxLayer[] {
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
        ]
    }

}