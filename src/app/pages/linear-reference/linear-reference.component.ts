import { Component } from '@angular/core';
import { BBox } from '@turf/turf';
import { Map } from 'mapbox-gl';
import { Observable} from 'rxjs';
import { MapboxLayer } from 'src/app/types/mapbox.interface';
import { LinearReferenceLegendService } from './linear-reference.service';
import { LinearReferenceMapService } from './linear-reference-map.service';
import { AbstractBaseMapService } from 'src/app/shared/components/basemap/abstract-basemap';

@Component({
  selector: 'app-linear-reference',
  templateUrl: './linear-reference.component.html',
  styleUrls: ['./linear-reference.component.scss'],
  providers: [LinearReferenceLegendService, LinearReferenceMapService],
})
export class LinearReferenceComponent {
  constructor(
    public legendService: LinearReferenceLegendService,
    public lrms: LinearReferenceMapService
  ) {}
  legend$: Observable<any[]> = this.legendService.selectLegend$();
}
