import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { provideMockStore } from '@ngrx/store/testing';
import { Map } from 'mapbox-gl';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MaterialModule } from 'src/app/shared/material.module';
import { findComponent } from 'src/app/shared/misc/find_component';
import { FeaturecollectionViewComponent } from './featurecollection-view.component';
import { MapboxLayersService } from 'src/app/shared/services/map-layers.service';

describe('FeatureCollectionViewComponent', () => {
  let component: FeaturecollectionViewComponent;
  let fixture: ComponentFixture<FeaturecollectionViewComponent>;
  let de: DebugElement;
  let container: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxMapboxGLModule.withConfig({ accessToken: 'test' }),
        CodemirrorModule,
        MaterialModule,
      ],
      declarations: [FeaturecollectionViewComponent],
      providers: [provideMockStore({}), MapboxLayersService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturecollectionViewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    container = document.createElement('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders app-basemap-component', () => {
    const mgl_map = findComponent(fixture, 'app-basemap-component');
    expect(mgl_map).toBeTruthy();
  });

  it('renders app-geojson-input', () => {
    const ngx_codemirror = findComponent(fixture, 'app-geojson-input');
    expect(ngx_codemirror).toBeTruthy();
  });

  it('renders mat-toolbar', () => {
    const mat_toolbar = findComponent(fixture, 'mat-toolbar');
    expect(mat_toolbar).toBeTruthy();
  });

  // it('listens for mgl-map (mapCreate) event', () => {
  //   spyOn(component, 'mapLoaded');
  //   const mgl_map = findComponent(fixture, 'mgl-map');
  //   const map = new Map({ container });
  //   mgl_map.triggerEventHandler('mapCreate', map);
  //   expect(component.mapLoaded).toHaveBeenCalledWith(map);
  // });
});
