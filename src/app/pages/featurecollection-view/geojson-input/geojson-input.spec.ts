import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { GeoJSONInputComponent } from './geojson-input.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { provideMockStore } from '@ngrx/store/testing';
import { DebugElement, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { findComponent } from 'src/app/shared/misc/find_component';
import { GeoJSONInputService } from './geojson-input.service';
import { By } from "@angular/platform-browser";


describe('GeoJSONInputComponent', () => {
  let component: GeoJSONInputComponent;
  let fixture: ComponentFixture<GeoJSONInputComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodemirrorModule],
      declarations: [GeoJSONInputComponent],
      providers: [provideMockStore({}), GeoJSONInputService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoJSONInputComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ngx-codemirror', () => {
    const ngx_codemirror = findComponent(fixture, 'ngx-codemirror');
    expect(ngx_codemirror).toBeTruthy();
  });

  it('should render button for "Load"', () => {
    const loadButton = findComponent(fixture, '[data-test="loadFileButton"]');
    expect(loadButton).toBeTruthy();
  });

  it('clicking "Load" button should call "loadDataFromFile()" method', () => {
    let inputSpy = spyOn(component.inputService, 'loadDataFromFile');
    const loadButton = de.query(By.css('[data-test="loadFileButton"]')).nativeElement;
    loadButton.click();
    fixture.detectChanges()
    expect(inputSpy).toHaveBeenCalled();
  })
  
});
