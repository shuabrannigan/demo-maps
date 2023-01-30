import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { MapboxLayersService } from "src/app/shared/services/map-layers.service";
import {fromGeoFeatureCollectionFeature} from '@store/geo-features/geo.selectors'

@Injectable()
export class LinearReferenceService extends MapboxLayersService {
    constructor(private store: Store) {
        super()
    }
    mockLegend: any[] = [{color: '#D2222D', title: 'Not Ready'}, {color: '#FFBF00', title: 'Almost Ready'},{color: '#238823', title: 'Ready'}].reverse()

    selectFeatureCollection$(show: boolean): Observable<any> {
        return this.store.select(fromGeoFeatureCollectionFeature.selectAllGeoFeaturesUsingLinearTool(show))
    }

    selectFeatureBbox$(): Observable<any> {
        return this.store.select(fromGeoFeatureCollectionFeature.selectGpsTrackAsBbox)
    }

    selectLegend$(): Observable<any[]> {
        return of([...this.mockLegend])
    }
 
    
}