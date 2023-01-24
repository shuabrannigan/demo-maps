import { Component, OnInit } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  styleUrls: ['./root-page.component.scss']
})
export class RootPageComponent implements OnInit {

  map: Map | undefined

  constructor() { }

  ngOnInit(): void {
  }
  
  mapLoaded($event: any) {
    // $event as Map a little hacky, but works.
    this.map = $event as Map
    this.map.resize()
  }

}
