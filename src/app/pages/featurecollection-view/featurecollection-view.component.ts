import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';
import * as turf from '@turf/turf';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import { FeatureCollectionViewService } from './featurecollection-view.service';
import { Observable } from 'rxjs';
import { BBox } from '@turf/turf';

@Component({
  selector: 'app-featurecollection-view',
  templateUrl: './featurecollection-view.component.html',
  styleUrls: ['./featurecollection-view.component.scss'],
  providers: [FeatureCollectionViewService],
})
export class FeaturecollectionViewComponent implements OnInit {
  constructor(public fcvs: FeatureCollectionViewService) {}

  map: Map | undefined;
  formInput: Observable<string> | undefined;
  bounds$: Observable<any> | undefined
  sources$: Observable<any> | undefined; // this is actually type Observable<FeatureCollection>
  layers$: MapboxLayer[] = [];
  error$: Observable<boolean> | undefined

  codeMirrorOptions: any = {
    theme: 'idea',
    mode: 'application/geo+json',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };

  ngOnInit(): void {
    this.formInput = this.fcvs.getFeatureCollectionAsJson$();
    this.sources$ = this.fcvs.getFeatureCollection$();
    this.layers$ = this.fcvs.getLayers();
    this.bounds$ = this.fcvs.selectMapBounds$()
    this.error$ = this.fcvs.error$
  }

  mapLoaded($event: any) {
    // $event as Map a little hacky, but works.
    this.map = $event as Map;
    this.map.resize();
  }

}
