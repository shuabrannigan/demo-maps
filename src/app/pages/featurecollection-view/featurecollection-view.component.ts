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





}
