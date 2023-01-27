import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BBox, FeatureCollection } from '@turf/turf';
import { Observable } from 'rxjs';
import { MapboxLayersService } from 'src/app/shared/services/map-layers.service';
import {
  fromGeoFeatureCollectionFeature
} from 'src/app/store/geo-features/geo.selectors';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import * as geoActions from '@store/geo-features/geo.actions'

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

  selectMapBounds$(): Observable<BBox> {
    return this.store.select(fromGeoFeatureCollectionFeature.selectMapBoundsFromFeatureCollection)
  }

  setFeatureCollection(featureCollection: FeatureCollection): void {
    this.store.dispatch(geoActions.setCurrentFeatureCollection({featureCollection}))
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
