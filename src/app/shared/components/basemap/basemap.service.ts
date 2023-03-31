import { Injectable } from '@angular/core';
import { AbstractBaseMapService } from './abstract-basemap';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import { Store } from '@ngrx/store';
import { MapboxLayersService } from '../../services/map-layers.service';
import { Observable } from 'rxjs';
import { fromGeoFeatureCollectionFeature } from '@store/geo-features/geo.selectors';

@Injectable()
export class BaseMapService extends AbstractBaseMapService {

  constructor(
    public override store: Store,
    private mapboxLayerService: MapboxLayersService
  ) {
    super(store);
  }

  override bounds$(): Observable<any> {
    return this.store.select(fromGeoFeatureCollectionFeature.selectMapBoundsFromFeatureCollection)
  }
  override sources$(): Observable<any> {
    return this.store.select(fromGeoFeatureCollectionFeature.selectFeatureCollection)
  }

  layers(): MapboxLayer[] {
    return [
      ...this.mapboxLayerService.baseLayers,
      {
        id: 'geo-feature-polygon',
        type: 'line',
        source: 'geo-features',
        layout: this.mapboxLayerService.style.polygon.layout,
        paint: this.mapboxLayerService.style.polygon.paint,
        filter: ['all', ['==', '$type', 'Polygon']],
      },
    ];
  }
}
