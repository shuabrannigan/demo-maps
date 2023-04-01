import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseMapComponent } from './basemap.component';
import { findComponent } from '../../misc/find_component';
import { Map } from 'mapbox-gl';

describe('BaseMapComponent', () => {
  let component: BaseMapComponent;
  let fixture: ComponentFixture<BaseMapComponent>;
  let container: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [BaseMapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMapComponent);
    component = fixture.componentInstance;
    container = document.createElement('div');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('listens for mgl-map "mapCreate" event', () => {
    spyOn(component, 'mapLoaded');
    const mgl_map = findComponent(fixture, 'mgl-map');
    const map = new Map({ container });
    mgl_map.triggerEventHandler('mapCreate', map);
    expect(component.mapLoaded).toHaveBeenCalledWith(map);
  });
});
