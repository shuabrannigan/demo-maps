import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureCollection } from '@turf/turf';
import { filter, Observable } from 'rxjs';
import { MapboxLayersService } from 'src/app/shared/services/map-layers.service';
import {
  fromGeoFeatureCollectionFeature
} from 'src/app/store/geo-features/geo.selectors';
import { MapboxLayer } from 'src/app/types/mapbox.interface';

@Injectable()
export class FeatureCollectionViewService extends MapboxLayersService {
  constructor(private store: Store) {
    super();
  }

  getFeatureCollection$(): Observable<FeatureCollection> {
    return this.store.select(fromGeoFeatureCollectionFeature.selectFeatureCollection);
  }

  getFeatureCollectionAsJson$(): Observable<string> {
    return this.store.select(fromGeoFeatureCollectionFeature.selectFeatureCollectionAsJson);
  }

  getLayers(): MapboxLayer[] {
    return [
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
        // sourceLayer: 'point-layer',
      },
    ];
  }
}
