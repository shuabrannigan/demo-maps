import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MaterialModule } from './material.module';
import { MapboxLayersService } from './services/map-layers.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseMapComponent } from './components/basemap/basemap.component';
import { AbstractBaseMapService } from './components/basemap/abstract-basemap';
import { BaseMapService } from './components/basemap/basemap.service';


@NgModule({
  imports: [CommonModule, MaterialModule, NgxMapboxGLModule, CodemirrorModule],
  declarations: [BaseMapComponent],
  exports: [
    CommonModule,
    FormsModule,
    // HttpClient,
    HttpClientModule,
    MaterialModule,
    NgxMapboxGLModule,
    CodemirrorModule,
    BaseMapComponent,
  ],
  providers: [
    MapboxLayersService,
    { provide: AbstractBaseMapService, useClass: BaseMapService },
  ],
})
export class SharedModule {}
