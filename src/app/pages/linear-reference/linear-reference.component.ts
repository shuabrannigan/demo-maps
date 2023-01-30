import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';
import { BehaviorSubject, map, Observable, Subject, switchMap } from 'rxjs';
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
  show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  show$: Observable<boolean> = this.show.asObservable()

  constructor(private lrs: LinearReferenceService) {}

  ngOnInit(): void {
    this.sources$ = this.show$.pipe(switchMap((show) => this.lrs.selectFeatureCollection$(show)))
    this.bounds$ = this.lrs.selectFeatureBbox$()
    this.layers$ = this.lrs.baseLayers
  }

  mapLoaded($event: any) {
    this.map = $event as Map;
    this.map.resize();
  }

  showPath() {
    this.show.next(!this.show.value)
  }
}
