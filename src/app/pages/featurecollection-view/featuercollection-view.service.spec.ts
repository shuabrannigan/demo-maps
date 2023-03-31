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

    it('service should exist', () => {
        expect(featureCollectionViewService).toBeTruthy()
    })

    // it('returns featureCollection Observable', done => {
    //     subs.add(
    //         featureCollectionViewService.getFeatureCollection$().subscribe((fc) => {
    //             expect(fc).toBe(initalGeoFeatureState.featureCollection)
    //             done()
    //         })
    //     )
    // })

    // it('returns featureCollection as a string Observable', done => {
    //     subs.add(
    //         featureCollectionViewService.getFeatureCollectionAsJson$().subscribe((str) => {
    //             expect(str).toBe(JSON.stringify(initalGeoFeatureState.featureCollection))
    //             done()
    //         })
    //     )
    // })

    // it('returns mapBounds as Observable', done => {
    //     subs.add(
    //         featureCollectionViewService.selectMapBounds$().subscribe((bounds) => {
    //             expect(bounds).toEqual([-71.343283, 42.4175, -71.073283, 42.4175])
    //             done()
    //         })
    //     )
    // })

    // it('set featureCollection to empty FeatureCollection', done => {
    //     spyOn(featureCollectionViewService, 'setFeatureCollection').and.callThrough()
    //     let featureCollectionToSet: FeatureCollection = featureCollection([])
    //     featureCollectionViewService.setFeatureCollection(featureCollectionToSet)
    //     subs.add(
    //         featureCollectionViewService.getFeatureCollection$().subscribe((fc) => {
    //             expect(featureCollectionViewService.setFeatureCollection).toHaveBeenCalledWith(featureCollectionToSet)
    //             expect(fc).withContext('getFeatureCollection$ return').toEqual(featureCollectionToSet)
    //             done()
    //         })
    //     )
    // })
})