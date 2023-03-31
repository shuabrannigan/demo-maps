import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { provideMockStore } from "@ngrx/store/testing"
import { findComponent } from "src/app/shared/misc/find_component"
import { LinearReferenceComponent } from "./linear-reference.component"
import { MapboxLayersService } from "src/app/shared/services/map-layers.service"



describe('LinearReferenceComponent', () => {
    let component: LinearReferenceComponent
    let fixture: ComponentFixture<LinearReferenceComponent>
    let de: DebugElement
    let container: HTMLElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LinearReferenceComponent],
            providers: [provideMockStore({}), MapboxLayersService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(LinearReferenceComponent)
        component = fixture.componentInstance
        container = document.createElement('div')
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('renders children', () => {
        const basemap = findComponent(fixture, 'app-basemap-component');
        const mat_toolbar = findComponent(fixture, 'mat-toolbar')
        expect(basemap).withContext('mgl-mapbox').toBeTruthy();
        expect(mat_toolbar).withContext('mat-toolbar').toBeTruthy()

    })

    // it('renders overlay component correctly', () => {
    //     const overlay_container = findComponent(fixture, '.overlay')
    //     const overlay_item = fixture.nativeElement.querySelectorAll('.overlay-item')
    //     const gps_button = findComponent(fixture, '[data-test="gps"]')
    //     const random_button = findComponent(fixture, '[data-test="random"]')

    //     expect(overlay_container).withContext('.overlay').toBeTruthy()
    //     expect(overlay_item.length).withContext('.overlay-item').toBeGreaterThan(0)
    //     expect(gps_button).withContext('GPS Button').toBeTruthy()
    //     expect(random_button).withContext('Random Button').toBeTruthy()
    // })
})