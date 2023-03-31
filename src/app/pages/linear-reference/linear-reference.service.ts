import { Injectable } from "@angular/core";
import {
  Observable,
  of,
} from 'rxjs';
interface ILinearReferenceLegendService {
  readonly mockLegend: any[];
  selectLegend$(): Observable<any[]>;
}

@Injectable()
export class LinearReferenceLegendService
  implements ILinearReferenceLegendService
{
  constructor() {}

  public readonly mockLegend: any[] = [
    { color: '#D2222D', title: 'Not Ready' },
    { color: '#FFBF00', title: 'Almost Ready' },
    { color: '#238823', title: 'Ready' },
  ].reverse();

  selectLegend$(): Observable<any[]> {
    return of([...this.mockLegend]);
  }
}