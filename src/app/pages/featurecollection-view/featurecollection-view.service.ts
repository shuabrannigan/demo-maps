import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BBox, featureCollection, FeatureCollection } from '@turf/turf';
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
      },
      {
        id: 'geo-feature-polygon',
        type: 'line',
        source: 'geo-features',
        layout: this.style.polygon.layout,
        paint: this.style.polygon.paint,
        filter: ['all', ['==', '$type', 'Polygon']],
      },
    ];
  }

  async loadFeatureCollectionFromFile() {
    let input = document.createElement('input')
    input.type = 'file'
    
    input.onchange = async () => {
      let files = Array.from(input.files as any) as any[]
      let file = files[0]
      if (file.type !== 'application/geo+json') {
        alert('file must be of type geojson')
        return
      }
      let data = await readGeoJsonFile(file) as FeatureCollection
      this.setFeatureCollection(data)
    }
    input.click()
  }
}

async function readGeoJsonFile(file: File) {
  return new Promise((resolve,reject) => {
    if (!file) {
      resolve('')
    }
  let fileReader = new FileReader()
  fileReader.onload = (evt) => {
    let result = fileReader.result?.toString() as string
    let data = JSON.parse(result)
    if (data.type !== 'FeatureCollection') reject('not FeatureCollection')
    resolve(data)
  }
  fileReader.readAsText(file)


  })

}
