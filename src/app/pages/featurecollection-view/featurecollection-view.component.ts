import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';
import * as turf from '@turf/turf';

@Component({
  selector: 'app-featurecollection-view',
  templateUrl: './featurecollection-view.component.html',
  styleUrls: ['./featurecollection-view.component.scss'],
})
export class FeaturecollectionViewComponent implements OnInit {
  constructor() {}

  map: Map | undefined;
  placeholder: string = JSON.stringify(turf.featureCollection([]));
  error: boolean = false;

  ngOnInit(): void {}

  mapLoaded($event: any) {
    // $event as Map a little hacky, but works.
    this.map = $event as Map;
    this.map.resize();
  }

  setFeatureCollection(featureCollection: string) {
    try {
      const fc = JSON.parse(featureCollection);
      console.log(fc);
      this.error = false;
    } catch (e) {
      console.log('erroring');
      console.log(e);
      this.error = true;
    }
  }
}
