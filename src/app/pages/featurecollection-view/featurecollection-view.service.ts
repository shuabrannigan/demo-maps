import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { featureCollection, FeatureCollection } from '@turf/turf';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MapboxLayersService } from 'src/app/shared/services/map-layers.service';
import {
  fromGeoFeatureCollectionFeature
} from 'src/app/store/geo-features/geo.selectors';
import * as geoActions from '@store/geo-features/geo.actions'

export interface FeatureCollectionViewerServiceModel {
  getFeatureCollectionAsJson$(): Observable<string>
  setFeatureCollection(featureCollection: FeatureCollection): void
  loadFeatureCollectionFromFile(): void
  readonly error: BehaviorSubject<boolean>
  error$: Observable<boolean> 
}

@Injectable()
export class FeatureCollectionViewService extends MapboxLayersService implements FeatureCollectionViewerServiceModel {
  constructor(public store: Store) {
    super()
  }

  public readonly error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  error$: Observable<boolean> = this.error.asObservable()

  getFeatureCollectionAsJson$(): Observable<string> {
    return this.store.select(fromGeoFeatureCollectionFeature.selectFeatureCollectionAsJson);
  }

  setFeatureCollection(featureCollection: FeatureCollection): void {
    this.store.dispatch(geoActions.setCurrentFeatureCollection({featureCollection}))
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
