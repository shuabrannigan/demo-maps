import { DebugElement } from "@angular/core"
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Map } from 'mapbox-gl';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { FeaturecollectionViewComponent } from "./featurecollection-view.component"




describe('FeatureCollectionViewComponent', () => {
    let component: FeaturecollectionViewComponent
    let fixture: ComponentFixture<FeaturecollectionViewComponent>
    let de: DebugElement
    let map: Map

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          StoreModule,
          SharedModule,
          NgxMapboxGLModule.withConfig({
            accessToken: environment.MAPBOX_API_KEY,
          }),
        ],
        declarations: [FeaturecollectionViewComponent],
        providers: [provideMockStore({})],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(FeaturecollectionViewComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement;
      fixture.detectChanges();
    });

    beforeEach(() => {
      let el = document.createElement('div')
      el.id = 'map'
      map = new Map({container: el})
    })


    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('call mapLoaded(), load check map is loaded', async () => {
      component.mapLoaded(map)
      expect(component.map?.loaded).toBeTruthy()
    });

})