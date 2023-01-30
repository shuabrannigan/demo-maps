import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { MapboxLayersService } from "src/app/shared/services/map-layers.service";
import {fromGeoFeatureCollectionFeature} from '@store/geo-features/geo.selectors'

@Injectable()
export class LinearReferenceService extends MapboxLayersService {
    constructor(private store: Store) {
        super()
    }

    selectFeatureCollection$(show: boolean): Observable<any> {
        return this.store.select(fromGeoFeatureCollectionFeature.selectAllGeoFeaturesUsingLinearTool(show))
    }

    selectFeatureBbox$(): Observable<any> {
        return this.store.select(fromGeoFeatureCollectionFeature.selectGpsTrackAsBbox)
    }
 
    
}