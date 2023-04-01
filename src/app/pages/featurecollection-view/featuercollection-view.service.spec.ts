import { TestBed } from "@angular/core/testing"
import { StoreModule } from "@ngrx/store"
import { FeatureCollectionViewService } from "./featurecollection-view.service"
import { geoFeatureCollectionFeature } from '@store/geo-features/geo.reducer'

describe('FeatureCollectionViewServices', () => {
    let featureCollectionViewService: FeatureCollectionViewService

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({'geo': geoFeatureCollectionFeature.reducer})],
            providers: [FeatureCollectionViewService]
        })
        
        featureCollectionViewService = TestBed.inject(FeatureCollectionViewService)

    })

    it('service should exist', () => {
        expect(featureCollectionViewService).toBeTruthy()
    })
})