import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BBox, featureCollection, FeatureCollection } from '@turf/turf';
import { BehaviorSubject, Observable } from 'rxjs';
import { MapboxLayersService } from 'src/app/shared/services/map-layers.service';
import {
  fromGeoFeatureCollectionFeature
} from 'src/app/store/geo-features/geo.selectors';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import * as geoActions from '@store/geo-features/geo.actions'

export interface FeatureCollectionViewerServiceModel {
  getFeatureCollection$(): Observable<FeatureCollection>
  getFeatureCollectionAsJson$(): Observable<string>
  selectMapBounds$(): Observable<BBox>
  setFeatureCollection(featureCollection: FeatureCollection): void
  getLayers(): MapboxLayer[]
  loadFeatureCollectionFromFile(): void
  readonly error: BehaviorSubject<boolean>
  error$: Observable<boolean> 
}

@Injectable()
export class FeatureCollectionViewService extends MapboxLayersService implements FeatureCollectionViewerServiceModel {
  constructor(private store: Store) {
    super();
  }

  public readonly error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  error$: Observable<boolean> = this.error.asObservable()

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
      ...this.baseLayers,
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

  handleSetFeatureCollection(featureCollectionString: string) {
    try {
      let fc = JSON.parse(featureCollectionString)
      fc = featureCollection([...fc.features])
      this.setFeatureCollection(fc)
      this.error.next(false)
    } catch (e) {
      console.log(e)
      this.error.next(true)
    }
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
