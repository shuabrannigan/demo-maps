import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MaterialModule } from './material.module';
import { MapboxLayersService } from './services/map-layers.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [CommonModule, MaterialModule, NgxMapboxGLModule, CodemirrorModule],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    // HttpClient,
    HttpClientModule,
    MaterialModule,
    NgxMapboxGLModule,
    CodemirrorModule,
  ],
  providers: [MapboxLayersService],
})
export class SharedModule {}
