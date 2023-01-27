import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MaterialModule } from './material.module';
import { MapboxLayersService } from './services/map-layers.service';

@NgModule({
  imports: [CommonModule, MaterialModule, NgxMapboxGLModule],
  declarations: [],
  exports: [CommonModule, FormsModule, MaterialModule, NgxMapboxGLModule],
  providers: [MapboxLayersService],
})
export class SharedModule {}
