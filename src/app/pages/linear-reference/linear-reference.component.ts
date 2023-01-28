import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import { LinearReferenceService } from './linear-reference.service';

@Component({
  selector: 'app-linear-reference',
  templateUrl: './linear-reference.component.html',
  styleUrls: ['./linear-reference.component.scss'],
  providers: [LinearReferenceService]
})
export class LinearReferenceComponent implements OnInit {
  map: Map | undefined;
  bounds$: Observable<any> | undefined;
  sources$: Observable<any> | undefined; // this is actually type Observable<FeatureCollection>
  layers$: MapboxLayer[] = [];

  constructor(private lrs: LinearReferenceService) {}

  ngOnInit(): void {

    this.sources$ = this.lrs.selectFeatureCollection$()
    this.bounds$ = this.lrs.selectFeatureBbox$()
    this.layers$ = this.lrs.baseLayers
  }

  mapLoaded($event: any) {
    this.map = $event as Map;
    this.map.resize();
  }
}
