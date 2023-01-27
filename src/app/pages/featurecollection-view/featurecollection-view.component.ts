import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';
import * as turf from '@turf/turf';
import * as mapboxgl from 'mapbox-gl';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import { FeatureCollectionViewService } from './featurecollection-view.service';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-featurecollection-view',
  templateUrl: './featurecollection-view.component.html',
  styleUrls: ['./featurecollection-view.component.scss'],
  providers: [FeatureCollectionViewService],
})
export class FeaturecollectionViewComponent implements OnInit {
  constructor(private fcvs: FeatureCollectionViewService) {}

  map: Map | undefined;
  formInput: Observable<string> | undefined;
  sources$: Observable<any> | undefined; // this is actually type Observable<FeatureCollection>
  layers$: MapboxLayer[] = [];
  error: boolean = false;

  ngOnInit(): void {
    this.formInput = this.fcvs.getFeatureCollectionAsJson$();
    this.sources$ = this.fcvs.getFeatureCollection$();
    this.layers$ = this.fcvs.getLayers();
  }

  mapLoaded($event: any) {
    // $event as Map a little hacky, but works.
    this.map = $event as Map;
    this.map.resize();
  }

  setFeatureCollection(featureCollection: string) {
    try {
      let fc = JSON.parse(featureCollection);
      fc = turf.featureCollection([...fc.features]);
      console.log(fc);
      this.error = false;
    } catch (e) {
      console.log(e);
      this.error = true;
    }
  }
}
