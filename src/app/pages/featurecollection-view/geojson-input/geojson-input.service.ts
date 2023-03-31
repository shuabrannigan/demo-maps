import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { fromGeoFeatureCollectionFeature } from "@store/geo-features/geo.selectors";
import { FeatureCollection, Geometry, GeometryCollection, Properties, featureCollection } from "@turf/turf";
import { BehaviorSubject, Observable } from "rxjs";
import * as geoActions from '@store/geo-features/geo.actions'


interface IGeoJSONInputSercice {
    getData$(): Observable<string>
    setData(featureCollection: FeatureCollection): void
    setDataFromInput(featureCollectionString: string): void
    loadDataFromFile(): void
}

export interface IError {
    readonly error: BehaviorSubject<boolean>
    error$: Observable<boolean>
}

@Injectable()
export class GeoJSONInputService implements IGeoJSONInputSercice, IError {
    constructor(public store: Store) {}


    getData$(): Observable<string> {
        return this.store.select(fromGeoFeatureCollectionFeature.selectFeatureCollectionAsJson)
    }

    setData(featureCollection: FeatureCollection<Geometry | GeometryCollection, Properties>): void {
       this.store.dispatch(geoActions.setCurrentFeatureCollection({featureCollection}))

    }

    loadDataFromFile(): void {
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
          this.setData(data)
        }
        input.click()
    }
    readonly error: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    error$: Observable<boolean> = this.error.asObservable()

    setDataFromInput(featureCollectionString: string): void {
      try {
        let fc = JSON.parse(featureCollectionString)
        fc = featureCollection([...fc.features])
        this.setData(fc)
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