import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LinearReferenceLegendService } from './linear-reference.service';
import { LinearReferenceMapService } from './linear-reference-map.service';

@Component({
  selector: 'app-linear-reference',
  templateUrl: './linear-reference.component.html',
  styleUrls: ['./linear-reference.component.scss'],
  providers: [LinearReferenceLegendService, LinearReferenceMapService],
})
export class LinearReferenceComponent {
  constructor(
    public legendService: LinearReferenceLegendService,
    public mapService: LinearReferenceMapService
  ) {}
  legend$: Observable<any[]> = this.legendService.selectLegend$();
}
