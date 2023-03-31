import { Component } from '@angular/core';
import {
  AbstractBaseMapComponent,
  AbstractBaseMapService,
} from './abstract-basemap';
import { MapboxLayersService } from '../../services/map-layers.service';
import { MapboxLayer } from 'src/app/types/mapbox.interface';

@Component({
  selector: 'app-basemap-component',
  template: ` <div class="map-wrapper">
    <mgl-map
      data-test="mgl-map"
      [style]="'mapbox://styles/mapbox/streets-v9'"
      [zoom]="[9]"
      [center]="[-71.073283, 42.4175]"
      [projection]="{ name: 'globe' }"
      [fitBounds]="bounds$ | async"
      (mapCreate)="mapLoaded($event)"
    >
      <mgl-geojson-source
        data-test="mgl-geojson"
        id="geo-features"
        [data]="sources$ | async"
      >
      </mgl-geojson-source>

      <ng-container *ngFor="let layer of layers">
        <mgl-layer
          [id]="layer.id"
          [type]="layer.type"
          [source]="layer.source"
          [layout]="layer.layout"
          [paint]="layer.paint"
          [filter]="layer.filter"
          [before]="layer.before"
          [sourceLayer]="layer.sourceLayer"
        >
        </mgl-layer>
      </ng-container>
    </mgl-map>
  </div>`,
  styles: [
    `
      .map-wrapper {
        width: 75vw;
        height: 100vh;
        position: relative;

        mgl-map {
          height: 100%;
          width: 100%;
          position: relative;
        }
      }
    `,
  ],
})
export class BaseMapComponent extends AbstractBaseMapComponent {
  constructor(private baseMapService: AbstractBaseMapService) {
    super(baseMapService);
  }
}
