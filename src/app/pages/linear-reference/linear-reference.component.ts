import { Component } from '@angular/core';
import { BBox } from '@turf/turf';
import { Map } from 'mapbox-gl';
import { Observable} from 'rxjs';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import { LinearReferenceService } from './linear-reference.service';

@Component({
  selector: 'app-linear-reference',
  templateUrl: './linear-reference.component.html',
  styleUrls: ['./linear-reference.component.scss'],
  providers: [LinearReferenceService]
})
export class LinearReferenceComponent {
  constructor(public lrs: LinearReferenceService) {}

  map: Map | undefined;
  bounds$: Observable<any> = this.lrs.selectFeatureBbox$()
  sources$: Observable<any> = this.lrs.selectFeatureCollection$()
  layers$: MapboxLayer[] = this.lrs.baseLayers;
  legend$: Observable<any[]> = this.lrs.selectLegend$()

  mapLoaded($event: any) {
    this.map = $event as Map;
    this.map.resize();
  }


}
