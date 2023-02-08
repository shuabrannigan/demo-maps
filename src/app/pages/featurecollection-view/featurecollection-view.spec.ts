import { DebugElement } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { StoreModule } from "@ngrx/store"
import { provideMockStore } from "@ngrx/store/testing"
import { FeaturecollectionViewComponent } from "./featurecollection-view.component"




describe('FeatureCollectionViewComponent', () => {
    let component: FeaturecollectionViewComponent
    let fixture: ComponentFixture<FeaturecollectionViewComponent>
    let de: DebugElement

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [StoreModule],
            declarations: [FeaturecollectionViewComponent],
            providers: [provideMockStore({})]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(FeaturecollectionViewComponent)
        component = fixture.componentInstance
        de = fixture.debugElement

        fixture.detectChanges()
    })

    it ('should create component', () => {
        expect(component).toBeTruthy()
    })
})