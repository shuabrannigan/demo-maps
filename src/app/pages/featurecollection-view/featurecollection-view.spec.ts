import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MaterialModule } from 'src/app/shared/material.module';
import { findComponent } from 'src/app/shared/misc/find_component';
import { FeaturecollectionViewComponent } from './featurecollection-view.component';
import { MapboxLayersService } from 'src/app/shared/services/map-layers.service';

describe('FeatureCollectionViewComponent', () => {
  let component: FeaturecollectionViewComponent;
  let fixture: ComponentFixture<FeaturecollectionViewComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxMapboxGLModule.withConfig({ accessToken: 'test' }),
        // CodemirrorModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders app-basemap-component', () => {
    const app_basemap_component = findComponent(fixture, 'app-basemap-component');
    expect(app_basemap_component).toBeTruthy();
  });

  it('renders app-geojson-input', () => {
    const app_geojson_input = findComponent(fixture, 'app-geojson-input');
    expect(app_geojson_input).toBeTruthy();
  });

  it('renders mat-toolbar', () => {
    const mat_toolbar = findComponent(fixture, 'mat-toolbar');
    expect(mat_toolbar).toBeTruthy();
  });
});
