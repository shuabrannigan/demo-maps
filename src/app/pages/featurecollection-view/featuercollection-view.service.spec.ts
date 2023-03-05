import { fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing"
import { StoreModule } from "@ngrx/store"
import { BBox, featureCollection, FeatureCollection } from "@turf/turf"
import { FeatureCollectionViewService } from "./featurecollection-view.service"
import { initalGeoFeatureState, geoFeatureCollectionFeature } from '@store/geo-features/geo.reducer'
import { Subscription } from "rxjs"

describe('FeatureCollectionViewServices', () => {
    let featureCollectionViewService: FeatureCollectionViewService
    let subs = new Subscription()

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot({'geo': geoFeatureCollectionFeature.reducer})],
            providers: [FeatureCollectionViewService]
        })
        
        featureCollectionViewService = TestBed.inject(FeatureCollectionViewService)

    })

    afterAll(() => {
        subs.unsubscribe()
    })

    it('returns featureCollection Observable', () => {
        let actualFeatureCollection: FeatureCollection | undefined
        subs.add(
            featureCollectionViewService.getFeatureCollection$().subscribe((fc) => {
                actualFeatureCollection = fc
            }).unsubscribe()
        )

        expect(actualFeatureCollection).toBe(initalGeoFeatureState.featureCollection)
    })

    it('returns featureCollection as a string Observable', () => {
        let actualFeatureCollection: string | undefined
        subs.add(
            featureCollectionViewService.getFeatureCollectionAsJson$().subscribe((str) => {
                actualFeatureCollection = str
            }).unsubscribe()
        )
        expect(actualFeatureCollection).toBe(JSON.stringify(initalGeoFeatureState.featureCollection))
    })

    it('returns mapBounds as Observable', () => {
        let actualMapBounds: BBox | undefined
        subs.add(
            featureCollectionViewService.selectMapBounds$().subscribe((bounds) => {
                actualMapBounds = bounds
            })
        )
        expect(actualMapBounds).toEqual([-71.343283, 42.4175, -71.073283, 42.4175])
    })

    it('set featureCollection to empty FeatureCollection', () => {
        spyOn(featureCollectionViewService, 'setFeatureCollection').and.callThrough()
        let featureCollectionToSet: FeatureCollection = featureCollection([])
        featureCollectionViewService.setFeatureCollection(featureCollectionToSet)

        let actualFeatureCollection: FeatureCollection | undefined

        subs.add(
            featureCollectionViewService.getFeatureCollection$().subscribe((fc) => {
                actualFeatureCollection = fc
            })
        )

        expect(featureCollectionViewService.setFeatureCollection).toHaveBeenCalledWith(featureCollectionToSet)
        expect(actualFeatureCollection).toEqual(featureCollectionToSet)
    })
})