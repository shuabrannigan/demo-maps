import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MaterialModule } from './material.module';
import { MapboxLayersService } from './services/map-layers.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { HttpClientModule } from '@angular/common/http';
import { BaseMapComponent } from './components/basemap/basemap.component';


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
  ],
})
export class SharedModule {}
