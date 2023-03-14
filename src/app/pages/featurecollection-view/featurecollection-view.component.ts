import { Component } from '@angular/core';
import { Map } from 'mapbox-gl';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import { FeatureCollectionViewService } from './featurecollection-view.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-featurecollection-view',
  templateUrl: './featurecollection-view.component.html',
  styleUrls: ['./featurecollection-view.component.scss'],
  providers: [FeatureCollectionViewService],
})
export class FeaturecollectionViewComponent {
  constructor(public fcvs: FeatureCollectionViewService) {}

  map: Map | undefined;
  formInput: Observable<string> =  this.fcvs.getFeatureCollectionAsJson$();
  bounds$: Observable<any> = this.fcvs.selectMapBounds$()
  sources$: Observable<any> = this.fcvs.getFeatureCollection$(); // this is actually type Observable<FeatureCollection>
  layers$: MapboxLayer[] = this.fcvs.getLayers();
  error$: Observable<boolean> = this.fcvs.error$

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

  mapLoaded($event: any) {
    // $event as Map a little hacky, but works.
    this.map = $event as Map;
    this.map.resize();
  }

}
