import { Component } from '@angular/core';
import { FeatureCollectionViewService } from './featurecollection-view.service';
import { Observable } from 'rxjs';
import { FeatureCollectionViewMapService } from './featurecollection-view-map.service';

@Component({
  selector: 'app-featurecollection-view',
  templateUrl: './featurecollection-view.component.html',
  styleUrls: ['./featurecollection-view.component.scss'],
  providers: [FeatureCollectionViewService, FeatureCollectionViewMapService],
})
export class FeaturecollectionViewComponent {
  constructor(public fcvs: FeatureCollectionViewService, public mapService: FeatureCollectionViewMapService) {}

  formInput: Observable<string> =  this.fcvs.getFeatureCollectionAsJson$();
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

}
