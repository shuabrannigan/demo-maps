import { Injectable } from "@angular/core"
import { MapboxLayer } from 'src/app/types/mapbox.interface';

export interface MapboxMapStyles {
    circle: {
        layout?: any
        paint?: any
    },
    line: {
        layout?: any
        paint?: any
    },
    polygon: {
        layout?: any
        paint?: any
    }
    symbol: {
        layout?: any
        paint?: any
    }
}

@Injectable()
export class MapboxLayersService {
  style: MapboxMapStyles = {
    circle: {
      layout: { visibility: 'visible' },
      paint: {
        'circle-color': ['case', ['has', 'color'], ['get', 'color'], '#fff'],
        'circle-radius': 3,
      },
    },
    line: {
      layout: {
        visibility: 'visible',
      },
      paint: {
        'line-color': ['case', ['has', 'color'], ['get', 'color'], '#f00'],
        'line-width': 3,
      },
    },
    polygon: {
      layout: {
        visibility: 'visible',
      },
      paint: {
        'line-color': '#f2f',
        'line-width': 2,
      },
    },
    symbol: {
      layout: {},
      paint: {},
    },
  };

  baseLayers: MapboxLayer[] = [
    {
      id: 'geo-feature-circle',
      type: 'circle',
      source: 'geo-features',
      layout: this.style.circle.layout,
      paint: this.style.circle.paint,
      filter: ['all', ['==', '$type', 'Point']],
    },
    {
      id: 'geo-feature-line',
      type: 'line',
      source: 'geo-features',
      layout: this.style.line.layout,
      paint: this.style.line.paint,
      filter: ['all', ['==', '$type', 'LineString']],
      before: 'geo-feature-circle'
    },
  ];
}